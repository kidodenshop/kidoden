import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      reviews: reviews.map((r) => ({
        id: r.id,
        productId: r.productId,
        productName: r.product?.name || "Unknown Product",
        rating: r.rating,
        comment: r.comment,
        authorName: r.authorName,
        isApproved: r.isApproved,
        createdAt: r.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch reviews for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews." },
      { status: 500 }
    );
  }
}
