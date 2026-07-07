import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import ProductPurchaseSection from "@/components/ProductPurchaseSection";
import ProductSlider from "@/components/ProductSlider";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductAccordions from "@/components/ProductAccordions";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Kidoden`,
      description: product.description,
      images: [{ url: product.imageUrl, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Kidoden`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

// Next.js 15 requires params to be treated as a Promise
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }


  return (
    <div className="bg-[#fffbf9] py-12 px-4 sm:px-6 lg:px-8 flex-grow">
      <div className="max-w-8xl mx-auto">
        <Link href="/shop" className="text-brand-pink hover:text-brand-navy font-bold mb-8 inline-flex items-center gap-2 transition-colors">
          &larr; Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 md:items-start">
          {/* Image Gallery — sticky on desktop */}
          <div className="md:col-span-6 lg:col-span-7 md:sticky md:top-8 md:self-start h-fit">
            <ProductImageGallery
              images={product.images && product.images.length > 0 ? product.images : [product.imageUrl]}
              name={product.name}
            />
          </div>

          {/* Details */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col mt-4 md:mt-0 md:pl-2">
            <p className="text-xs font-black text-brand-pink uppercase tracking-widest mb-3">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-brand-orange mb-4">
              ₹{product.price}
            </p>

            <p className="text-base text-gray-600 mb-8 font-medium leading-relaxed">
              {product.description}
            </p>

            {/* Call to Actions with Size & Stock Inventory */}
            <div className="mb-6">
              <ProductPurchaseSection product={product} />
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200/60" />

            <ProductAccordions
              features={product.features || []}
              category={product.category}
              ageRange={product.ageRange}
            />
          </div>
        </div>

        {/* Most Popular Finds */}
        <div className="mt-24 mb-12">
          <div className="text-center mb-10 relative flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">Most Popular Finds</h2>
            <div className="w-16 h-1 bg-brand-pink mx-auto rounded-full"></div>
          </div>
          <ProductSlider products={(await getProducts()).filter((p) => p.isFeatured && p.id !== id)} />
        </div>
      </div>
    </div>
  );
}
