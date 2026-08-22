import prisma from "@/lib/db";
import ProductFormClient from "../ProductFormClient";

export const revalidate = 0;

export default async function NewProductPage() {
  // Query categories for selector dropdown
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
  }).catch(() => []);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-2">
          Add New Product
        </h1>
        <p className="text-sm font-semibold text-brand-navy/60">
          Publish a new toy or clothing item to the online catalog.
        </p>
      </div>

      {/* Form client component */}
      <ProductFormClient categories={categories} />
    </div>
  );
}
