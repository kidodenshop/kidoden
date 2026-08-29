import { NextResponse } from "next/server";
import prisma from "@/lib/db";

async function updateProductRating(productId: string, tx: any) {
  const productReviews = await tx.review.findMany({
    where: { productId, isApproved: true },
    select: { rating: true },
  });

  const count = productReviews.length;
  const averageRating = count > 0
    ? productReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / count
    : 0;

  await tx.product.update({
    where: { id: productId },
    data: {
      rating: parseFloat(averageRating.toFixed(1)),
      reviewsCount: count,
    },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isApproved } = body;

    if (typeof isApproved !== "boolean") {
      return NextResponse.json(
        { error: "isApproved must be a boolean value" },
        { status: 400 }
      );
    }

    const updatedReview = await prisma.$transaction(async (tx) => {
      // 1. Update approval status
      const review = await tx.review.update({
        where: { id },
        data: { isApproved },
      });

      // 2. Recalculate rating metrics for the product
      await updateProductRating(review.productId, tx);

      return review;
    });

    return NextResponse.json({ success: true, review: updatedReview });
  } catch (error) {
    console.error("Failed to update review status:", error);
    return NextResponse.json(
      { error: "Failed to update review status." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deletedReview = await prisma.$transaction(async (tx) => {
      // 1. Delete review
      const review = await tx.review.delete({
        where: { id },
      });

      // 2. Recalculate rating metrics for the product
      await updateProductRating(review.productId, tx);

      return review;
    });

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Failed to delete review:", error);
    return NextResponse.json(
      { error: "Failed to delete review." },
      { status: 500 }
    );
  }
}
