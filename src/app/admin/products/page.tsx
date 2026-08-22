import prisma from "@/lib/db";
import ProductsListClient from "./ProductsListClient";

export const revalidate = 0;

export default async function AdminProductsPage() {
  // Query all products with their categories and inventories
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
      inventory: {
        select: { size: true, stockQuantity: true },
      },
    },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  // Query categories for filtering
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
  }).catch(() => []);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-2">
            Manage Products
          </h1>
          <p className="text-sm font-semibold text-brand-navy/60">
            View, search, edit, and delete products in your storefront catalog.
          </p>
        </div>
      </div>

      {/* Interactive Products Table Container */}
      <ProductsListClient initialProducts={products} categories={categories} />
    </div>
  );
}
