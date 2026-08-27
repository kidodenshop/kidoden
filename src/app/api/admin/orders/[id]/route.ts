import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { status, paymentStatus, shippingDetails } = body;

    // Validate order status if provided
    if (status && !Object.values(OrderStatus).includes(status as OrderStatus)) {
      return NextResponse.json(
        { error: `Invalid order status. Allowed values: ${Object.values(OrderStatus).join(", ")}` },
        { status: 400 }
      );
    }

    // Validate payment status if provided
    if (paymentStatus && !Object.values(PaymentStatus).includes(paymentStatus as PaymentStatus)) {
      return NextResponse.json(
        { error: `Invalid payment status. Allowed values: ${Object.values(PaymentStatus).join(", ")}` },
        { status: 400 }
      );
    }

    // Verify order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    // Execute transactional update
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update Order main fields
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          ...(status && { status: status as OrderStatus }),
          ...(paymentStatus && { paymentStatus: paymentStatus as PaymentStatus }),
        },
      });

      // 2. Update/Upsert Shipping Details if provided
      let updatedShipping = null;
      if (shippingDetails) {
        // Clean undefined fields to prevent accidental overwriting with null
        const courierName = shippingDetails.courierName !== undefined ? shippingDetails.courierName : null;
        const awbNumber = shippingDetails.awbNumber !== undefined ? shippingDetails.awbNumber : null;
        const shiprocketOrderId = shippingDetails.shiprocketOrderId !== undefined ? shippingDetails.shiprocketOrderId : null;
        const shipmentId = shippingDetails.shipmentId !== undefined ? shippingDetails.shipmentId : null;
        const shippingStatus = shippingDetails.status !== undefined ? shippingDetails.status : null;

        updatedShipping = await tx.shippingDetail.upsert({
          where: { orderId: id },
          create: {
            orderId: id,
            courierName,
            awbNumber,
            shiprocketOrderId,
            shipmentId,
            status: shippingStatus,
          },
          update: {
            // Only update fields that were passed
            ...(shippingDetails.courierName !== undefined && { courierName }),
            ...(shippingDetails.awbNumber !== undefined && { awbNumber }),
            ...(shippingDetails.shiprocketOrderId !== undefined && { shiprocketOrderId }),
            ...(shippingDetails.shipmentId !== undefined && { shipmentId }),
            ...(shippingDetails.status !== undefined && { status: shippingStatus }),
          },
        });
      }

      return { updatedOrder, updatedShipping };
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",
      data: result,
    });
  } catch (error: any) {
    console.error("[API ORDER UPDATE] Failed:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while updating the order." },
      { status: 500 }
    );
  }
}
