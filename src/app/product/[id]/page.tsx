import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import WhatsAppOrderForm from "@/components/WhatsAppOrderForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

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

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }


  return (
    <div className="bg-[#fffbf9] py-12 px-4 sm:px-6 lg:px-8 flex-grow">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="text-brand-pink hover:text-brand-navy font-bold mb-8 inline-flex items-center gap-2 transition-colors">
          &larr; Back to Shop
        </Link>

        <div className="flex flex-col md:flex-row md:gap-10 md:items-start">
          {/* Image — fixed aspect ratio, sticky on desktop */}
          <div className="md:w-2/5 flex-shrink-0 md:sticky md:top-8 md:self-start">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="md:w-3/5 bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col mt-4 md:mt-0">
            <p className="text-sm font-black text-brand-pink uppercase tracking-widest mb-4">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-6 tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-4xl font-black text-brand-orange mb-4">
              ₹{product.price}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full border border-green-200">
                ✅ Cash on Delivery
              </span>
              <span className="text-sm text-gray-500 font-medium">
                Pay only after you verify your product
              </span>
            </div>

            <p className="text-lg text-gray-600 mb-8 font-medium leading-relaxed">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="mb-10 bg-brand-yellow/10 p-6 rounded-3xl">
                <h3 className="font-bold text-brand-navy mb-4 text-xl">Why you'll love it:</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {product.ageRange && (
                    <li className="flex items-center gap-3 text-gray-700 font-medium pt-2">
                      <span className="font-bold text-brand-navy">Age Range:</span> {product.ageRange}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Trust section */}
            <div className="mb-6 space-y-4">

              {/* How it works */}
              <div className="bg-brand-mint/10 border border-brand-mint/25 rounded-3xl p-5">
                <p className="font-extrabold text-brand-navy text-sm mb-3">
                  💬 How ordering works
                </p>
                <ol className="space-y-2.5">
                  {[
                    "Fill in your delivery details below",
                    "We confirm your order on WhatsApp — usually within the hour",
                    "Receive your order, verify the product, then pay cash. No advance. Ever.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                      <span className="bg-brand-mint text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-brand-purple font-semibold mt-4 pt-3 border-t border-brand-mint/30">
                  ✨ More checkout options coming very soon — we&apos;re working on it!
                </p>
              </div>

              {/* Return policy banner */}
              <div className="flex items-center gap-4 bg-brand-pink/10 border border-brand-pink/25 rounded-3xl p-4">
                <span className="text-3xl flex-shrink-0">↩️</span>
                <div>
                  <p className="font-extrabold text-brand-navy text-sm">2-Day Easy Returns</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Not happy? Contact us within 2 days of delivery and we&apos;ll make it right — no questions asked.
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "⚡", title: "Fast Reply", sub: "We're always a message away" },
                  { icon: "🚚", title: "Ships Across India", sub: "Delivered to your door" },
                  { icon: "🛡️", title: "100% Genuine", sub: "Carefully chosen for little ones" },
                  { icon: "💵", title: "No Advance Payment", sub: "Pay cash only on delivery" },
                ].map(({ icon, title, sub }) => (
                  <div key={title} className="flex items-start gap-2.5 bg-[#fffbf9] border border-gray-100 rounded-2xl p-3">
                    <span className="text-xl leading-none mt-0.5">{icon}</span>
                    <div>
                      <p className="text-xs font-extrabold text-brand-navy leading-tight">{title}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <WhatsAppOrderForm
              productName={product.name}
              productCategory={product.category}
              productPrice={product.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
