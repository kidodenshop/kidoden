import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import OrderDetailClient from "./OrderDetailClient";

export const revalidate = 0;

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  // Fetch the order with all detailed connections
  const order = await prisma.order.findUnique({
    where: { id },
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
      payment: true,
      shippingDetails: true,
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },
  }).catch(() => null);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <OrderDetailClient order={order} />
    </div>
  );
}
