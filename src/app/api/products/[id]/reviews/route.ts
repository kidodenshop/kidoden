import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { addMockReview } from "@/lib/products";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { rating, comment, authorName } = body;

    // Validate inputs
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5." },
        { status: 400 }
      );
    }

    if (!authorName || typeof authorName !== "string" || authorName.trim() === "") {
      return NextResponse.json(
        { error: "Reviewer name is required." },
        { status: 400 }
      );
    }

    const cleanAuthorName = authorName.trim();
    const cleanComment = comment ? comment.trim() : null;

    // Check if database URL is valid
    const hasValidDbUrl = process.env.DATABASE_URL && 
      !process.env.DATABASE_URL.includes("localhost:51213") && 
      !process.env.DATABASE_URL.includes("localhost:5432") && 
      process.env.DATABASE_URL !== "";

    if (!hasValidDbUrl) {
      // In-memory mock fallback
      const mockRev = addMockReview(id, {
        rating,
        comment: cleanComment,
        authorName: cleanAuthorName,
      });
      return NextResponse.json({ success: true, review: mockRev });
    }

    // Save to PostgreSQL
    const review = await prisma.$transaction(async (tx) => {
      // 1. Create the review record
      const createdReview = await tx.review.create({
        data: {
          productId: id,
          rating,
          comment: cleanComment,
          authorName: cleanAuthorName,
        },
      });

      // 2. Fetch all reviews for this product to recalculate rating metrics (only approved ones)
      const productReviews = await tx.review.findMany({
        where: { productId: id, isApproved: true },
        select: { rating: true },
      });

      const count = productReviews.length;
      const averageRating = count > 0 
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / count
        : 0;

      // 3. Update the Product model with the pre-calculated aggregates
      await tx.product.update({
        where: { id },
        data: {
          rating: parseFloat(averageRating.toFixed(1)),
          reviewsCount: count,
        },
      });

      return createdReview;
    });

    return NextResponse.json({
      success: true,
      review: {
        id: review.id,
        productId: review.productId,
        rating: review.rating,
        comment: review.comment,
        authorName: review.authorName,
        createdAt: review.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Failed to submit product review:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
