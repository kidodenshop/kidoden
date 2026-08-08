import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (limit IP to 30 requests per minute on webhook endpoint)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const limitResponse = await rateLimit(ip, "checkout-webhook", 30, 60);
    if (limitResponse) return limitResponse;

    console.log("[WEBHOOK API] Webhook event received from Razorpay.");

    // 2. Read signature and raw body
    const signature = req.headers.get("x-razorpay-signature") || "";
    const rawBody = await req.text();

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("[WEBHOOK API] RAZORPAY_WEBHOOK_SECRET is not configured on the server.");
      return NextResponse.json(
        { error: "Webhook secret key is not configured on the server." },
        { status: 500 }
      );
    }

    // 3. Cryptographically secure constant-time signature comparison to prevent timing attacks
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");

    let isSignatureValid = false;
    if (expectedBuffer.length === receivedBuffer.length && expectedBuffer.length > 0) {
      isSignatureValid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
    }

    if (!isSignatureValid) {
      console.warn("[WEBHOOK API] Webhook signature verification failed. Untrusted request blocked.");
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    // 4. Parse payload
    const body = JSON.parse(rawBody);
    console.log(`[WEBHOOK API] Signature verified. Event: ${body.event}`);

    // We only process the official 'order.paid' event
    if (body.event !== "order.paid") {
      console.log(`[WEBHOOK API] Event '${body.event}' skipped. Only 'order.paid' is processed.`);
      return NextResponse.json({ success: true, message: `Event '${body.event}' ignored.` });
    }

    const payload = body.payload;
    const razorpayOrderId = payload.order?.entity?.id;
    
    // In order.paid, the payment list is in payload.payment.entity, or if there are multiple payments,
    // we fetch the primary captured one.
    const razorpayPaymentId = payload.payment?.entity?.id;

    if (!razorpayOrderId) {
      console.error("[WEBHOOK API] Missing order details in payload.");
      return NextResponse.json({ error: "Missing razorpay_order_id in payload." }, { status: 400 });
    }

    // 5. Look up matching Payment record
    const paymentRecord = await prisma.payment.findUnique({
      where: { razorpayOrderId },
    });

    if (!paymentRecord) {
      console.warn(`[WEBHOOK API] Payment record not found in database for Razorpay Order ID: ${razorpayOrderId}`);
      // Return 200 to acknowledge receipt of webhook from Razorpay, even if order wasn't created in our DB (e.g. mock or manual order)
      return NextResponse.json({ success: true, message: "Order not tracked in this system database." });
    }

    const orderId = paymentRecord.orderId;
    let orderData: any = null;
    let isAlreadyPaid = false;

    // 6. Execute atomic transaction to confirm order
    await prisma.$transaction(async (tx) => {
      // Row-level lock on the Order record to prevent concurrency conflicts with /verify API
      const order = await tx.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date() },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          customer: true,
          shippingAddress: true,
        },
      });

      if (!order) {
        throw new Error(`Order record missing for ID: ${orderId}`);
      }

      orderData = order;

      // If already paid, avoid duplicate stock deductions and status changes (Idempotency)
      if (order.paymentStatus === "PAID") {
        console.log(`[WEBHOOK API] Order ${order.orderNumber} is already PAID. Skipping stock deduction.`);
        isAlreadyPaid = true;
        return;
      }

      // Deduct stock safely
      for (const item of order.items) {
        const inventoryItem = await tx.inventory.findUnique({
          where: {
            productId_size: {
              productId: item.productId,
              size: item.size,
            },
          },
        });

        if (inventoryItem) {
          // Atomic stock decrement with check
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
            // Stock is insufficient, but payment has succeeded.
            // Log critical alert for merchant manual intervention, but DO NOT fail webhook transaction.
            console.error(`[CRITICAL WEBHOOK ERROR] Stock depletion detected. Order ${order.orderNumber} paid, but product ID ${item.productId} (Size: ${item.size}) has insufficient stock. Manual merchant intervention / refund required.`);
          }
        } else {
          console.error(`[CRITICAL WEBHOOK ERROR] Inventory record missing for product ID ${item.productId} (Size: ${item.size}) in paid order ${order.orderNumber}.`);
        }
      }

      // Confirm order status
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
        },
      });

      // Confirm payment record details
      await tx.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: "captured",
          razorpayPaymentId: razorpayPaymentId || null,
          razorpaySignature: signature || null,
        },
      });

      console.log(`[WEBHOOK API] Order ${order.orderNumber} successfully finalized via webhook.`);
    });

    // 7. Send order confirmation email asynchronously only if order was NOT already paid
    if (orderData && !isAlreadyPaid) {
      const formattedItems = orderData.items.map((item: any) => ({
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price / 100, // paise to rupees
      }));

      const formattedAddress = `<strong>${orderData.customer.name}</strong>, ${[
        orderData.shippingAddress.line1,
        orderData.shippingAddress.line2,
        orderData.shippingAddress.city,
        orderData.shippingAddress.postalCode
      ].filter(Boolean).join(", ")}`;

      sendOrderConfirmationEmail({
        toEmail: orderData.customer.email,
        customerName: orderData.customer.name || "Customer",
        orderNumber: orderData.orderNumber,
        totalAmount: orderData.totalAmount / 100, // paise to rupees
        items: formattedItems,
        shippingAddress: formattedAddress,
      }).catch((err) => console.error("[WEBHOOK API] Email sending error:", err));
    }

    return NextResponse.json({ success: true, message: "Webhook successfully processed." });
  } catch (error: any) {
    console.error("[WEBHOOK API] Webhook processing failed with error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error during webhook processing." },
      { status: 500 }
    );
  }
}
