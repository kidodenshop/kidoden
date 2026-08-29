"use client";

import { useState, useEffect } from "react";
import { useAdminLoader } from "@/context/AdminLoaderContext";

interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string | null;
  authorName: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">("all");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { setIsPending, setPendingMessage } = useAdminLoader();

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        setError(data.error || "Failed to fetch reviews");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    setError(null);
    setSuccess(null);
    setPendingMessage(currentStatus ? "Unapproving review..." : "Approving review...");
    setIsPending(true);

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setReviews(
          reviews.map((r) => (r.id === id ? { ...r, isApproved: !currentStatus } : r))
        );
        setSuccess(currentStatus ? "Review marked as pending approval." : "Review approved successfully!");
      } else {
        setError(data.error || "Failed to update review status.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      return;
    }
    setError(null);
    setSuccess(null);
    setPendingMessage("Deleting review...");
    setIsPending(true);

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setReviews(reviews.filter((r) => r.id !== id));
        setSuccess("Review deleted successfully.");
      } else {
        setError(data.error || "Failed to delete review.");
      }
    } catch (err) {
      setError("An unexpected error occurred while deleting.");
    } finally {
      setIsPending(false);
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment && r.comment.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = selectedRating === "all" || r.rating.toString() === selectedRating;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && !r.isApproved) ||
      (activeTab === "approved" && r.isApproved);

    return matchesSearch && matchesRating && matchesTab;
  });

  const getPendingCount = () => reviews.filter((r) => !r.isApproved).length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-brand-yellow shrink-0">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-current" : "stroke-current fill-none"}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499c.195-.595 1.04-.595 1.235 0l2.332 7.098a1 1 0 00.95.69h7.458c.625 0 .884.8.377 1.189l-6.033 4.385a1 1 0 00-.363 1.118l2.332 7.098c.195.595-.477 1.08-1.012.724L12 18.913l-6.033 4.385c-.535.356-1.207-.129-1.012-.724l2.332-7.098a1 1 0 00-.363-1.118L.854 12.476c-.507-.389-.248-1.189.377-1.189h7.458a1 1 0 00.95-.69L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-2">
            Product Reviews
          </h1>
          <p className="text-sm font-semibold text-brand-navy/60">
            Moderate, approve, and delete product reviews submitted by customers.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-mint/10 gap-8">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === "all" ? "text-brand-pink" : "text-brand-navy/40 hover:text-brand-navy/60"
          }`}
        >
          All Reviews ({reviews.length})
          {activeTab === "all" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-pink rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-2 ${
            activeTab === "pending" ? "text-brand-pink" : "text-brand-navy/40 hover:text-brand-navy/60"
          }`}
        >
          Pending Approval ({getPendingCount()})
          {getPendingCount() > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-black bg-brand-orange text-white rounded-md shrink-0">
              {getPendingCount()}
            </span>
          )}
          {activeTab === "pending" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-pink rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === "approved" ? "text-brand-pink" : "text-brand-navy/40 hover:text-brand-navy/60"
          }`}
        >
          Approved ({reviews.filter((r) => r.isApproved).length})
          {activeTab === "approved" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-brand-pink rounded-t-full" />
          )}
        </button>
      </div>

      {/* Alerts */}
      {success && (
        <div className="p-4 bg-brand-mint/10 border border-brand-mint/30 rounded-2xl text-xs font-bold text-brand-mint animate-scale-up">
          🎉 {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-brand-red/10 border border-brand-red/30 rounded-2xl text-xs font-bold text-brand-red animate-scale-up">
          ⚠️ {error}
        </div>
      )}

      {/* Control Bar: Search & Rating Filter */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by customer, comment, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-brand-mint/20 rounded-2xl text-sm font-semibold text-brand-navy focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/15 transition-all placeholder-brand-navy/35"
          />
          <span className="absolute left-4 top-3.5 text-brand-navy/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
            </svg>
          </span>
        </div>

        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="px-4 py-3 bg-white border border-brand-mint/20 rounded-2xl text-sm font-bold text-brand-navy focus:outline-none focus:border-brand-pink transition-all shrink-0"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {/* Reviews Table */}
      <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-navy/2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-8 h-8 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-brand-navy/60">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="p-4 bg-brand-yellow/10 text-brand-orange rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </span>
            <p className="text-sm font-bold text-brand-navy/60">No reviews found</p>
            <p className="text-xs text-brand-navy/40 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-mint/5 border-b border-brand-mint/10 text-[10px] font-black text-brand-navy/50 uppercase tracking-widest">
                  <th className="py-4 px-6 w-1/4">Reviewer</th>
                  <th className="py-4 px-4 w-1/5">Product</th>
                  <th className="py-4 px-4 w-1/3">Comment</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-mint/5">
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-brand-mint/2 transition-colors">
                    {/* Reviewer Info */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-black text-brand-navy">{review.authorName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-[10px] text-brand-navy/40 font-bold">
                            {new Date(review.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="py-4 px-4">
                      <p className="text-sm font-bold text-brand-navy/80 line-clamp-2">
                        {review.productName}
                      </p>
                    </td>

                    {/* Comment */}
                    <td className="py-4 px-4">
                      <p className="text-sm font-semibold text-brand-navy/70 whitespace-pre-wrap">
                        {review.comment || (
                          <span className="text-brand-navy/30 italic">No comment provided</span>
                        )}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {review.isApproved ? (
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-brand-mint bg-brand-mint/5 border border-brand-mint/15 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-brand-orange bg-brand-orange/5 border border-brand-orange/15 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleApproval(review.id, review.isApproved)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 select-none ${
                            review.isApproved
                              ? "bg-brand-navy/5 text-brand-navy/70 hover:bg-brand-navy/10"
                              : "bg-brand-pink text-white hover:bg-brand-pink/90"
                          }`}
                        >
                          {review.isApproved ? "Unapprove" : "Approve"}
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-1.5 text-brand-navy/40 hover:text-brand-red rounded-xl hover:bg-brand-red/5 transition-colors active:scale-95"
                          title="Delete Review"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
