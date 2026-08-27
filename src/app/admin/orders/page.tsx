import prisma from "@/lib/db";
import OrdersListClient from "./OrdersListClient";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  // Query all orders with customer, payment, shipping details and items
  const orders = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      shippingAddress: {
        select: {
          id: true,
          line1: true,
          line2: true,
          city: true,
          state: true,
          postalCode: true,
          country: true,
          phone: true,
        },
      },
      payment: {
        select: {
          id: true,
          razorpayOrderId: true,
          razorpayPaymentId: true,
          status: true,
          amount: true,
        },
      },
      shippingDetails: {
        select: {
          id: true,
          shiprocketOrderId: true,
          awbNumber: true,
          courierName: true,
          status: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-2">
          Manage Orders
        </h1>
        <p className="text-sm font-semibold text-brand-navy/60">
          Track customer purchases, update fulfillment/payment statuses, and log delivery shipment tracking codes.
        </p>
      </div>

      {/* Interactive Orders List Table */}
      <OrdersListClient initialOrders={orders} />
    </div>
  );
}
