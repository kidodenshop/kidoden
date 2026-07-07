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
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-2 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Review Section */}
            <div className="flex items-center gap-1.5 mb-5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4.5 h-4.5 ${i < Math.round(product.rating || 5) ? 'fill-current' : 'text-gray-300 fill-current'}`} 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 font-bold mt-0.5">
                {product.rating ? product.rating.toFixed(1) : "5.0"} ({product.reviewsCount || 1})
              </span>
            </div>

            {/* Price with Taxes info */}
            <div className="mb-6">
              <span className="text-3xl font-black text-brand-orange block leading-none mb-1">
                ₹{product.price}
              </span>
              <span className="text-[11px] text-gray-400 font-bold tracking-wide">
                MRP (Inclusive of all Taxes)
              </span>
            </div>

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
