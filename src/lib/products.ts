import prisma from "@/lib/db";
import { Product as UIProduct, Category as UICategory, products as mockProducts } from "@/data/products";

export function mapDbProductToUI(p: any): UIProduct {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price / 100, // paise to rupees
    category: p.category.slug as UICategory,
    imageUrl: p.imageUrl,
    images: p.images || [],
    ageRange: p.ageRange || undefined,
    gender: p.gender as "boy" | "girl" | "unisex" | undefined,
    features: p.features || [],
    isFeatured: p.isFeatured,
    rating: p.rating || undefined,
    reviewsCount: p.reviewsCount || undefined,
    inventory: p.inventory ? p.inventory.map((inv: any) => ({
      size: inv.size,
      stockQuantity: inv.stockQuantity,
    })) : undefined,
  };
}

export async function getProducts(): Promise<UIProduct[]> {
  const hasValidDbUrl = process.env.DATABASE_URL && 
    !process.env.DATABASE_URL.includes("localhost:51213") && 
    !process.env.DATABASE_URL.includes("localhost:5432") && 
    process.env.DATABASE_URL !== "";

  if (!hasValidDbUrl) {
    return mockProducts;
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
    return mockProducts.find((p) => p.id === id) || null;
  }

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        inventory: true,
      },
    });
    
    if (!dbProduct) {
      return mockProducts.find((p) => p.id === id) || null;
    }
    
    return mapDbProductToUI(dbProduct);
  } catch (error) {
    console.error(`Database product lookup for ID "${id}" failed, using static mock data. Error details:`, error);
    return mockProducts.find((p) => p.id === id) || null;
  }
}
