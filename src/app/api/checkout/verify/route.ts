import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Custom sanitization helper to strip dangerous elements
const cleanInputString = (val: any): string => {
  if (typeof val !== "string") return "";
  return val.replace(/<[^>]*>/g, "").trim();
};

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (limit IP to 10 requests per minute on verification endpoint)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const limitResponse = await rateLimit(ip, "checkout-verify", 10, 60);
    if (limitResponse) return limitResponse;

    console.log("[VERIFY API] Payment verification request received.");
    const body = await req.json();
    
    // Sanitize input properties to prevent malicious injections (XSS / SQL parameters)
    const razorpay_order_id = cleanInputString(body.razorpay_order_id);
    const razorpay_payment_id = cleanInputString(body.razorpay_payment_id);
    const razorpay_signature = cleanInputString(body.razorpay_signature);
    const orderId = cleanInputString(body.orderId);

    // 2. Basic validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      console.warn("[VERIFY API] Missing or malformed parameters in payload.");
      return NextResponse.json(
        { error: "Missing required verification parameters." },
        { status: 400 }
      );
    }

    const hasValidDbUrl = process.env.DATABASE_URL && 
      !process.env.DATABASE_URL.includes("localhost:5432") && 
      process.env.DATABASE_URL !== "";

    if (!hasValidDbUrl) {
      console.log("[VERIFY API] No database URL set, simulating verification success.");
      return NextResponse.json({ success: true, mock: true });
    }

    // 3. Verify signature
    let secret = process.env.RAZORPAY_KEY_SECRET;
    if (secret) {
      // Strip any quotes that might exist in .env
      secret = secret.replace(/['"]/g, "").trim();
    }

    if (!secret) {
      console.error("[VERIFY API] Razorpay key secret is empty on the server.");
      return NextResponse.json(
        { error: "Razorpay secret key is not configured on the server." },
        { status: 500 }
      );
    }

    const hmacSource = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(hmacSource)
      .digest("hex");

    // Cryptographically secure constant-time signature comparison to prevent timing attacks
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(razorpay_signature, "hex");

    let isSignatureValid = false;
    if (expectedBuffer.length === receivedBuffer.length) {
      isSignatureValid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
    }

    console.log("[VERIFY API] Signature comparison result:", isSignatureValid);

    if (!isSignatureValid) {
      console.warn(`[VERIFY API] Payment signature mismatch for order ${orderId}`);
      
      console.log("[VERIFY API] Updating database order status to CANCELLED...");
      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: { status: "CANCELLED" },
        }),
        prisma.payment.update({
          where: { orderId: orderId },
          data: { status: "failed" },
        }),
      ]);
      console.log("[VERIFY API] Mismatch status updated successfully.");

      return NextResponse.json(
        { error: "Payment signature verification failed. Fraud attempt detected." },
        { status: 400 }
      );
    }

    let orderData: any = null;

    // 4. Execute transaction to deduct stock and update order state
    console.log("[VERIFY API] Executing database transaction for order confirmation...");
    await prisma.$transaction(async (tx) => {
      console.log("[VERIFY API] Tx: Finding order in database...");
      
      // Acquire a row lock by updating the status/updatedAt of the Order record,
      // which acts as a database-level concurrency barrier for this specific orderId.
      const order = await tx.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date() }, // Forces write-lock on row
        include: {
          items: {
            include: {
              product: true,
            },
          },
          customer: true,
        },
      });

      if (!order) {
        throw new Error(`Order not found: ${orderId}`);
      }

      orderData = order;

      console.log("[VERIFY API] Tx: Order found. Status:", order.status, "PaymentStatus:", order.paymentStatus);

      // If already paid, avoid duplicate stock deductions and status updates
      if (order.paymentStatus === "PAID") {
        console.log("[VERIFY API] Tx: Order is already paid. Skipping duplicate processing.");
        return;
      }

      // Deduct inventory stock for each purchased item
      console.log("[VERIFY API] Tx: Deducting stock for items...", order.items.length);
      for (const item of order.items) {
        console.log(`[VERIFY API] Tx: Checking inventory for product ${item.productId} (Size: ${item.size})...`);
        const inventoryItem = await tx.inventory.findUnique({
          where: {
            productId_size: {
              productId: item.productId,
              size: item.size,
            },
          },
        });

        if (inventoryItem) {
          console.log(`[VERIFY API] Tx: Found inventory item. Current stock: ${inventoryItem.stockQuantity}. Decrementing by ${item.quantity}...`);
          
          // Secure atomic update with conditional count verify
          const updated = await tx.inventory.updateMany({
            where: {
              id: inventoryItem.id,
              stockQuantity: {
                gte: item.quantity,
              },
            },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });

          if (updated.count === 0) {
            throw new Error(`Insufficient stock for product ID ${item.productId} (Size: ${item.size}). Stock has changed during check.`);
          }
          console.log("[VERIFY API] Tx: Stock decremented successfully.");
        } else {
          console.warn(`[VERIFY API] Tx: No inventory item found for product ${item.productId} size ${item.size}`);
          throw new Error(`Inventory record not found for product ID ${item.productId} (Size: ${item.size}).`);
        }
      }

      // Update Order and Payment states
      console.log("[VERIFY API] Tx: Updating Order and Payment records in database...");
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
        },
      });

      await tx.payment.update({
        where: { orderId: orderId },
        data: {
          status: "captured",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
      });
      console.log("[VERIFY API] Tx: Database records updated.");
    });

    // 5. Asynchronously send order confirmation email using Resend
    if (orderData && orderData.paymentStatus !== "PAID") {
      const formattedItems = orderData.items.map((item: any) => ({
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price / 100, // paise to rupees
      }));

      sendOrderConfirmationEmail({
        toEmail: orderData.customer.email,
        customerName: orderData.customer.name || "Customer",
        orderNumber: orderData.orderNumber,
        totalAmount: orderData.totalAmount / 100, // paise to rupees
        items: formattedItems,
      }).catch((err) => console.error("[VERIFY API] Email sending error:", err));
    }

    console.log("[VERIFY API] Verification complete. Returning success.");
    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and order confirmed.",
    });
  } catch (error: any) {
    console.error("[VERIFY API] Signature verification process failed with error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during payment verification." },
      { status: 500 }
    );
  }
}
