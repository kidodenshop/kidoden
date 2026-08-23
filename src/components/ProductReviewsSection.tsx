"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Product, Review } from "@/data/products";

interface ProductReviewsSectionProps {
  product: Product;
}

export default function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(product.reviews || []);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Star Distribution calculation
  const COMMENTS_PER_PAGE = 4;
  const reviewsWithComments = reviews.filter((r) => r.comment && r.comment.trim() !== "");
  const totalPages = Math.ceil(reviewsWithComments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const paginatedComments = reviewsWithComments.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

  const totalCount = reviews.length > 0 ? reviews.length : (product.reviewsCount || 0);
  const averageRating = reviews.length > 0
    ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
    : (product.rating || 0);

  const distribution = [0, 0, 0, 0, 0]; // Index 0 is 5-stars, Index 4 is 1-star
  if (reviews.length > 0) {
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        distribution[5 - r.rating]++;
      }
    });
  } else if (totalCount > 0 && averageRating > 0) {
    // Distribute all ratings to the closest star bucket
    const roundedRating = Math.round(averageRating);
    if (roundedRating >= 1 && roundedRating <= 5) {
      distribution[5 - roundedRating] = totalCount;
    }
  }

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!authorName.trim()) {
      setError("Please enter your name.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/products/${product.id}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating,
            authorName: authorName.trim(),
            comment: comment.trim() || null,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setReviews((prev) => [data.review, ...prev]);
          setSuccessMessage("Thank you! Your review has been submitted successfully.");
          // Reset form fields
          setRating(0);
          setAuthorName("");
          setComment("");
          setCurrentPage(1);
          router.refresh();
        } else {
          setError(data.error || "Failed to submit review.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Avatar generation helper
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-6xl mx-auto px-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Side: Summary & Chart */}
        <div className="lg:col-span-5">
          <h3 className="text-xl font-extrabold text-brand-navy mb-4 tracking-tight">Customer Reviews</h3>

          {/* Average Rating Block */}
          <div className="flex items-center gap-4 mb-6 bg-[#fffbf9]/80 border border-brand-pink/15 p-4 rounded-2xl shadow-xs">
            <div className="text-center">
              <span className="text-4xl font-black text-brand-navy block leading-none mb-1">
                {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
              </span>
              <span className="text-[10px] font-bold text-gray-400">out of 5.0</span>
            </div>
            
            <div className="flex-1">
              <div className="flex text-amber-400 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? "fill-current" : "text-gray-200 fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs font-bold text-brand-navy/60">
                Based on {totalCount} {totalCount === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            {distribution.map((count, index) => {
              const stars = 5 - index;
              const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3.5 text-xs">
                  <button 
                    type="button" 
                    className="w-12 font-bold text-gray-500 text-left hover:text-brand-pink transition-colors"
                  >
                    {stars} Star
                  </button>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/40">
                    <div
                      className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-black text-brand-navy/50">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Add Review Form */}
        <div className="lg:col-span-7 bg-white border border-gray-100 p-5 sm:p-6 rounded-3xl shadow-sm">
          <h4 className="text-lg font-extrabold text-brand-navy mb-0.5 tracking-tight">Write a Review</h4>
          <p className="text-[10px] font-medium text-gray-400 mb-4">Share your experience with our clothing!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Stars Input */}
            <div>
              <label className="block text-xs font-black text-brand-navy uppercase tracking-wider mb-2">
                Overall Rating <span className="text-brand-pink">*</span>
              </label>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starVal = i + 1;
                  const active = starVal <= (hoverRating || rating);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleStarClick(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-gray-200 hover:scale-110 transition-transform focus:outline-none"
                      aria-label={`Rate ${starVal} out of 5 stars`}
                    >
                      <svg
                        className={`w-8 h-8 ${active ? "text-amber-400 fill-current" : "text-gray-200 fill-current"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  );
                })}
                {rating > 0 && (
                  <span className="text-xs font-extrabold text-amber-500 ml-2">
                    {rating} Star{rating > 1 && "s"} selected
                  </span>
                )}
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label htmlFor="authorName" className="block text-xs font-black text-brand-navy uppercase tracking-wider mb-2">
                Your Name <span className="text-brand-pink">*</span>
              </label>
              <input
                type="text"
                id="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full text-sm font-medium border border-gray-200/80 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/35 placeholder:text-gray-300 transition-colors"
                disabled={isPending}
              />
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-xs font-black text-brand-navy uppercase tracking-wider mb-2">
                Review Comments
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what you like or dislike about the fit, quality, or colors..."
                rows={3}
                className="w-full text-sm font-medium border border-gray-200/80 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/35 placeholder:text-gray-300 transition-colors resize-none"
                disabled={isPending}
              />
            </div>

            {/* Messages */}
            {error && (
              <div className="text-xs font-bold text-red-500 bg-red-50/70 border border-red-100 p-3 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50/70 border border-emerald-100 p-3 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-pink hover:bg-brand-navy text-white text-sm font-extrabold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-brand-pink/15 hover:shadow-brand-navy/15 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-12 border-t border-gray-100 pt-8">
        <h4 className="text-lg font-extrabold text-brand-navy mb-6 tracking-tight">
          Review Comments ({reviewsWithComments.length})
        </h4>

        {reviewsWithComments.length === 0 ? (
          <div className="text-center py-10 bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl">
            <svg className="w-10 h-10 mx-auto text-gray-300 mb-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-xs font-bold text-gray-400">No review comments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedComments.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-gray-100/60 p-5 rounded-2xl shadow-xs hover:shadow-sm transition-all duration-300 flex gap-4 text-left"
              >
                {/* Author Avatar */}
                <div className="w-10 h-10 rounded-full bg-brand-pink/10 text-brand-pink flex items-center justify-center text-xs font-black shrink-0">
                  {getInitials(rev.authorName)}
                </div>

                {/* Review Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2.5">
                    <span className="font-extrabold text-brand-navy text-sm">{rev.authorName}</span>
                    <span className="text-[10px] font-bold text-gray-400">{formatDate(rev.createdAt)}</span>
                  </div>

                  {/* Stars Badge */}
                  <div className="flex text-amber-400 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? "fill-current" : "text-gray-200 fill-current"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Comment */}
                  {rev.comment && (
                    <p className="text-sm font-medium text-gray-600 leading-relaxed break-words">
                      {rev.comment}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {/* Previous Page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-brand-pink hover:border-brand-pink/40 disabled:opacity-40 disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed bg-white"
                  aria-label="Previous Page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-extrabold text-sm flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? "bg-brand-pink text-white shadow-md shadow-brand-pink/15"
                          : "border border-gray-200 text-gray-600 hover:text-brand-pink hover:border-brand-pink/40 bg-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-brand-pink hover:border-brand-pink/40 disabled:opacity-40 disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed bg-white"
                  aria-label="Next Page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
