import prisma from "@/lib/db";
import { Product as UIProduct, Category as UICategory, products as mockProducts } from "@/data/products";

// For mock mode in-memory persistence of reviews
declare global {
  var mockReviewsGlobal: Record<string, any[]> | undefined;
}

const initialMockReviews: Record<string, any[]> = {
  "c-1": [
    {
      id: "mock-rev-1",
      productId: "c-1",
      rating: 5,
      comment: "Super cute and comfy! My son loves the Mickey design.",
      authorName: "Sarah M.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "mock-rev-2",
      productId: "c-1",
      rating: 4,
      comment: "Good quality cotton, but the size runs slightly large. Highly recommend though!",
      authorName: "Amit K.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  "c-2": [
    {
      id: "mock-rev-3",
      productId: "c-2",
      rating: 5,
      comment: "Beautiful colors, perfect fit for my daughter! Fabric is super soft.",
      authorName: "Priya R.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

if (!globalThis.mockReviewsGlobal) {
  globalThis.mockReviewsGlobal = initialMockReviews;
}

export function getMockReviews(productId: string) {
  return globalThis.mockReviewsGlobal?.[productId] || [];
}

export function addMockReview(productId: string, review: { rating: number; comment: string | null; authorName: string }) {
  if (!globalThis.mockReviewsGlobal) {
    globalThis.mockReviewsGlobal = {};
  }
  if (!globalThis.mockReviewsGlobal[productId]) {
    globalThis.mockReviewsGlobal[productId] = [];
  }
  
  const newReview = {
    id: `mock-rev-${Date.now()}`,
    productId,
    rating: review.rating,
    comment: review.comment,
    authorName: review.authorName,
    createdAt: new Date().toISOString()
  };
  
  globalThis.mockReviewsGlobal[productId].unshift(newReview);
  
  // Recalculate average rating & reviewsCount for the mock product
  const product = mockProducts.find(p => p.id === productId);
  if (product) {
    const list = globalThis.mockReviewsGlobal[productId];
    product.reviewsCount = list.length;
    product.rating = parseFloat((list.reduce((sum, r) => sum + r.rating, 0) / list.length).toFixed(1));
  }
  
  return newReview;
}

export function mapDbProductToUI(p: any): UIProduct {
  const dbReviews = p.reviews || [];
  // Use actual reviews array if populated, otherwise fallback to database column values
  const reviewsCount = dbReviews.length > 0 ? dbReviews.length : (p.reviewsCount || 0);
  const rating = dbReviews.length > 0
    ? parseFloat((dbReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / dbReviews.length).toFixed(1))
    : (p.rating || 0);

  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price / 100, // paise to rupees
    discount: p.discount || undefined,
    category: p.category.slug as UICategory,
    imageUrl: p.imageUrl,
    images: p.images || [],
    ageRange: p.ageRange || undefined,
    gender: p.gender as "boy" | "girl" | "unisex" | undefined,
    features: p.features || [],
    isFeatured: p.isFeatured,
    rating: rating !== undefined ? rating : undefined,
    reviewsCount: reviewsCount !== undefined ? reviewsCount : undefined,
    inventory: p.inventory ? p.inventory.map((inv: any) => ({
      size: inv.size,
      stockQuantity: inv.stockQuantity,
    })) : undefined,
    reviews: p.reviews ? p.reviews.map((rev: any) => ({
      id: rev.id,
      productId: rev.productId,
      rating: rev.rating,
      comment: rev.comment,
      authorName: rev.authorName,
      createdAt: rev.createdAt.toISOString(),
    })) : undefined,
  };
}

export async function getProducts(): Promise<UIProduct[]> {
  const hasValidDbUrl = process.env.DATABASE_URL && 
    !process.env.DATABASE_URL.includes("localhost:51213") && 
    !process.env.DATABASE_URL.includes("localhost:5432") && 
    process.env.DATABASE_URL !== "";

  if (!hasValidDbUrl) {
    // Populate simple rating and review counts on mock listings if available
    return mockProducts.map(p => ({
      ...p,
      reviewsCount: getMockReviews(p.id).length || p.reviewsCount,
      rating: getMockReviews(p.id).length 
        ? parseFloat((getMockReviews(p.id).reduce((sum, r) => sum + r.rating, 0) / getMockReviews(p.id).length).toFixed(1)) 
        : p.rating,
    }));
  }

  try {
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
        inventory: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    if (dbProducts.length === 0) {
      return mockProducts;
    }
    
    return dbProducts.map(mapDbProductToUI);
  } catch (error) {
    console.error("Database fetch failed, using static mock data fallback. Error details:", error);
    return mockProducts;
  }
}

export async function getProductById(id: string): Promise<UIProduct | null> {
  const hasValidDbUrl = process.env.DATABASE_URL && 
    !process.env.DATABASE_URL.includes("localhost:51213") && 
    !process.env.DATABASE_URL.includes("localhost:5432") && 
    process.env.DATABASE_URL !== "";

  if (!hasValidDbUrl) {
    const prod = mockProducts.find((p) => p.id === id) || null;
    if (prod) {
      return {
        ...prod,
        reviewsCount: getMockReviews(id).length || prod.reviewsCount,
        rating: getMockReviews(id).length 
          ? parseFloat((getMockReviews(id).reduce((sum, r) => sum + r.rating, 0) / getMockReviews(id).length).toFixed(1)) 
          : prod.rating,
        reviews: getMockReviews(id),
      };
    }
    return null;
  }

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        inventory: true,
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    
    if (!dbProduct) {
      const prod = mockProducts.find((p) => p.id === id) || null;
      if (prod) {
        return {
          ...prod,
          reviewsCount: getMockReviews(id).length || prod.reviewsCount,
          rating: getMockReviews(id).length 
            ? parseFloat((getMockReviews(id).reduce((sum, r) => sum + r.rating, 0) / getMockReviews(id).length).toFixed(1)) 
            : prod.rating,
          reviews: getMockReviews(id),
        };
      }
      return null;
    }
    
    return mapDbProductToUI(dbProduct);
  } catch (error) {
    console.error(`Database product lookup for ID "${id}" failed. Error details:`, error);
    throw error;
  }
}
