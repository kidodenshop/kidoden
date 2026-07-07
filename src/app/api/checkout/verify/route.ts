import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  console.log("[VERIFY API] Payment verification request received.");
  try {
    const body = await req.json();
    console.log("[VERIFY API] Payload body:", JSON.stringify(body));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = body;

    // 1. Basic validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      console.warn("[VERIFY API] Missing parameters in payload.");
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

    // 2. Verify signature
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

    const isSignatureValid = expectedSignature === razorpay_signature;
    console.log("[VERIFY API] Signature comparison:", {
      received: razorpay_signature,
      expected: expectedSignature,
      isValid: isSignatureValid
    });

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

    // 3. Execute transaction to deduct stock and update order state
    console.log("[VERIFY API] Executing database transaction for order confirmation...");
    await prisma.$transaction(async (tx) => {
      console.log("[VERIFY API] Tx: Finding order in database...");
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) {
        throw new Error(`Order not found: ${orderId}`);
      }

      console.log("[VERIFY API] Tx: Order found. Status:", order.status, "PaymentStatus:", order.paymentStatus);

      // If already paid, avoid duplicate stock deductions
      if (order.paymentStatus === "PAID") {
        console.log("[VERIFY API] Tx: Order is already paid. Skipping stock deduction.");
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
          await tx.inventory.update({
            where: { id: inventoryItem.id },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });
          console.log("[VERIFY API] Tx: Stock decremented successfully.");
        } else {
          console.warn(`[VERIFY API] Tx: No inventory item found for product ${item.productId} size ${item.size}`);
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
