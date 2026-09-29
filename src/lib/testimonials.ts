import prisma from "@/lib/db";
import { TestimonialItem, fallbackTestimonials } from "@/types/testimonials";

export type { TestimonialItem };
export { fallbackTestimonials };

const AVATAR_PALETTES = [
  { bg: "bg-pink-100", text: "text-brand-pink" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-blue-100", text: "text-[#1a4263]" },
  { bg: "bg-amber-100", text: "text-amber-800" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "KD";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColors(index: number) {
  return AVATAR_PALETTES[index % AVATAR_PALETTES.length];
}

/**
 * Fetch approved 5-star reviews from the database (managed via admin/reviews).
 * Falls back to curated testimonials if the database is unreachable or has fewer reviews.
 */
export async function getApprovedTestimonials(limit = 6): Promise<TestimonialItem[]> {
  try {
    const dbReviews = await prisma.review.findMany({
      where: {
        isApproved: true,
        rating: 5,
        comment: {
          not: null,
        },
      },
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
      take: limit,
    });

    // Filter out empty or whitespace-only comments
    const validReviews = dbReviews.filter(
      (r) => r.comment && r.comment.trim().length > 0
    );

    if (validReviews.length === 0) {
      return fallbackTestimonials;
    }

    const mappedTestimonials: TestimonialItem[] = validReviews.map((r, index) => {
      const palette = getAvatarColors(index);
      return {
        id: r.id,
        name: r.authorName,
        location: "Verified Buyer",
        context: r.product?.name ? `Purchased: ${r.product.name}` : "Verified Parent",
        rating: r.rating,
        quote: r.comment!.trim(),
        initials: getInitials(r.authorName),
        avatarBg: palette.bg,
        avatarColor: palette.text,
      };
    });

    // If fewer than 3 reviews are present in DB, append from fallback to maintain layout balance
    if (mappedTestimonials.length < 3) {
      const needed = 3 - mappedTestimonials.length;
      mappedTestimonials.push(...fallbackTestimonials.slice(0, needed));
    }

    return mappedTestimonials;
  } catch (error) {
    console.error("Failed to fetch approved testimonials from database:", error);
    return fallbackTestimonials;
  }
}
