import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      phone,
      address,
      city,
      pincode,
      paymentMethod,
      cartItems,
    } = body;

    // 1. Basic validation
    if (!email || !name || !phone || !address || !city || !pincode || !paymentMethod || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload. All fields are required." },
        { status: 400 }
      );
    }

    if (paymentMethod !== "COD" && paymentMethod !== "RAZORPAY") {
      return NextResponse.json(
        { error: "Invalid payment method." },
        { status: 400 }
      );
    }

    // Check if database URL is valid
    const hasValidDbUrl = process.env.DATABASE_URL && 
      !process.env.DATABASE_URL.includes("localhost:5432") && 
      process.env.DATABASE_URL !== "";

    if (!hasValidDbUrl) {
      // In mock-only environment, simulate order creation success
      const orderNumber = `KD-${Math.floor(1000 + Math.random() * 9000)}`;
      return NextResponse.json({
        mock: true,
        orderNumber,
        orderId: `mock-order-id-${Date.now()}`,
        amount: 0,
        paymentMethod,
      });
    }

    // 2. Start database transaction
    const result = await prisma.$transaction(async (tx) => {
      // Fetch products in cart
      const productIds = cartItems.map((item) => item.id);
      const dbProducts = await tx.product.findMany({
        where: { id: { in: productIds } },
        include: { inventory: true },
      });

      const productsMap = new Map(dbProducts.map((p) => [p.id, p]));

      // Verify stock quantities for all items
      for (const item of cartItems) {
        const dbProduct = productsMap.get(item.id);
        if (!dbProduct) {
          throw new Error(`Product not found: ${item.id}`);
        }

        const sizeKey = item.selectedSize || "Standard";
        const inventoryItem = dbProduct.inventory.find((inv) => inv.size === sizeKey);

        if (!inventoryItem || inventoryItem.stockQuantity < item.quantity) {
          throw new Error(
            `Insufficient stock for "${dbProduct.name}" (Size: ${sizeKey}). Only ${
              inventoryItem ? inventoryItem.stockQuantity : 0
            } left.`
          );
        }

        // If Cash on Delivery (COD), deduct stock immediately in transaction
        if (paymentMethod === "COD") {
          await tx.inventory.update({
            where: { id: inventoryItem.id },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });
        }
      }

      // Calculate total amount in paise (Rupees * 100)
      let subtotalInPaise = 0;
      for (const item of cartItems) {
        const dbProduct = productsMap.get(item.id)!;
        subtotalInPaise += dbProduct.price * item.quantity;
      }

      // Flat shipping fee: free for orders >= ₹1000 (100000 paise), else ₹99 (9900 paise)
      const shippingFeeInPaise = subtotalInPaise >= 100000 ? 0 : 9900;
      const totalAmountInPaise = subtotalInPaise + shippingFeeInPaise;

      // Upsert customer by email
      const customer = await tx.customer.upsert({
        where: { email: email.toLowerCase().trim() },
        update: { name, phone },
        create: { email: email.toLowerCase().trim(), name, phone },
      });

      // Create address
      const shippingAddress = await tx.address.create({
        data: {
          customerId: customer.id,
          line1: address,
          city,
          state: "", // Collected city covers state default in simple checkout
          postalCode: pincode,
          phone,
        },
      });

      // Generate order number
      const orderCount = await tx.order.count();
      const orderNumber = `KD-${1001 + orderCount}`;

      // Create Order
      const order = await tx.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          shippingAddressId: shippingAddress.id,
          totalAmount: totalAmountInPaise,
          status: paymentMethod === "COD" ? "CONFIRMED" : "PENDING",
          paymentStatus: "PENDING",
          paymentMethod,
        },
      });

      // Create OrderItems
      for (const item of cartItems) {
        const dbProduct = productsMap.get(item.id)!;
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.id,
            size: item.selectedSize || "Standard",
            quantity: item.quantity,
            price: dbProduct.price,
          },
        });
      }

      // Create initial Payment entry
      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          amount: totalAmountInPaise,
          status: "pending",
        },
      });

      return {
        order,
        payment,
        amount: totalAmountInPaise,
      };
    });

    // 3. For COD, return success immediately
    if (paymentMethod === "COD") {
      return NextResponse.json({
        success: true,
        orderNumber: result.order.orderNumber,
        orderId: result.order.id,
        amount: result.amount,
        paymentMethod: "COD",
      });
    }

    // 4. For Razorpay, call Razorpay API to create an order
    try {
      const razorpayOrder = await razorpay.orders.create({
        amount: result.amount, // in paise
        currency: "INR",
        receipt: result.order.id,
      });

      // Update the database Payment record with Razorpay Order ID
      await prisma.payment.update({
        where: { id: result.payment.id },
        data: {
          razorpayOrderId: razorpayOrder.id,
        },
      });

      return NextResponse.json({
        success: true,
        orderNumber: result.order.orderNumber,
        orderId: result.order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: result.amount,
        paymentMethod: "RAZORPAY",
        keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
      });
    } catch (razorpayError) {
      console.error("Razorpay order creation failed:", razorpayError);
      
      // Update Order and Payment to failed
      await prisma.order.update({
        where: { id: result.order.id },
        data: { status: "CANCELLED" },
      });
      await prisma.payment.update({
        where: { id: result.payment.id },
        data: { status: "failed" },
      });

      return NextResponse.json(
        { error: "Failed to initialize payment gateway order." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Checkout process failed:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during checkout." },
      { status: 400 }
    );
  }
}
