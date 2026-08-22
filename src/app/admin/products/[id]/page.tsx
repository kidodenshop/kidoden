import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import ProductFormClient from "../ProductFormClient";

export const revalidate = 0;

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  // Query product details with inventory
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
      inventory: {
        select: { size: true, stockQuantity: true },
      },
    },
  }).catch(() => null);

  if (!product) {
    notFound();
  }

  // Query all categories for selector dropdown
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
  }).catch(() => []);

  // Format initial product fields to match input form structure
  const formattedProduct = {
    ...product,
    price: product.price / 100, // convert paise to Rupees
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-2">
          Edit Product: {product.name}
        </h1>
        <p className="text-sm font-semibold text-brand-navy/60">
          Modify product details, categories, imagery, and size stock levels.
        </p>
      </div>

      {/* Form client component preloaded with product info */}
      <ProductFormClient categories={categories} product={formattedProduct} />
    </div>
  );
}
