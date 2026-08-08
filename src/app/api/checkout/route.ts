import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { checkoutSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import crypto from "crypto";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (limit IP to 5 requests per minute on checkout)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const limitResponse = await rateLimit(ip, "checkout", 5, 60);
    if (limitResponse) return limitResponse;

    const body = await req.json();

    // 2. Validate input using Zod schema
    const validationResult = checkoutSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map(issue => issue.message).join(", ");
      return NextResponse.json(
        { error: `Validation failed: ${errorMessage}` },
        { status: 400 }
      );
    }

    const {
      email,
      name,
      phone,
      address,
      city,
      pincode,
      paymentMethod,
      cartItems,
    } = validationResult.data;

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

    // 3. Start database transaction
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

        // If Cash on Delivery (COD), deduct stock immediately in transaction.
        // We use updateMany with condition to prevent race conditions (optimistic lock / atomic decrement constraint)
        if (paymentMethod === "COD") {
          const updated = await tx.inventory.updateMany({
            where: {
              id: inventoryItem.id,
              stockQuantity: {
                gte: item.quantity
              }
            },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });

          if (updated.count === 0) {
            throw new Error(`Concurrency check failed: Insufficient stock for "${dbProduct.name}" (Size: ${sizeKey}).`);
          }
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

      // Generate order number: collision-free unique format (KD-YYMMDD-XXXX)
      const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const randomHex = crypto.randomBytes(2).toString("hex").toUpperCase();
      const orderNumber = `KD-${dateStr}-${randomHex}`;

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

      // Query the fully populated order details (items, products, customer) for receipt email
      const fullOrder = await tx.order.findUnique({
        where: { id: order.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          customer: true,
        },
      });

      return {
        order: fullOrder || order,
        payment,
        amount: totalAmountInPaise,
      };
    });

    // 4. For COD, return success immediately and trigger confirmation email
    if (paymentMethod === "COD") {
      const formattedItems = (result.order as any).items.map((item: any) => ({
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price / 100, // paise to rupees
      }));

      sendOrderConfirmationEmail({
        toEmail: (result.order as any).customer.email,
        customerName: (result.order as any).customer.name || "Customer",
        orderNumber: result.order.orderNumber,
        totalAmount: result.order.totalAmount / 100, // paise to rupees
        items: formattedItems,
      }).catch((err) => console.error("[CHECKOUT API] COD email sending error:", err));

      return NextResponse.json({
        success: true,
        orderNumber: result.order.orderNumber,
        orderId: result.order.id,
        amount: result.amount,
        paymentMethod: "COD",
      });
    }

    // 5. For Razorpay, call Razorpay API to create an order
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
