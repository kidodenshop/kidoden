import Image from "next/image";
import Link from "next/link";
import { products, Category } from "@/data/products";

// Next.js 15 requires searchParams to be treated as a Promise
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const validCategories: Category[] = ["clothing", "jewellery", "nails"];
  const isValidCategory = category && validCategories.includes(category as Category);

  const displayedProducts = isValidCategory
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section with Category-specific Background */}
      <div className={`relative py-16 overflow-hidden ${
        !isValidCategory ? 'bg-gradient-to-br from-brand-mint/30 via-brand-pink/20 to-brand-yellow/30' :
        category === 'clothing' ? 'bg-gradient-to-br from-brand-mint/40 to-brand-mint/10' :
        category === 'jewellery' ? 'bg-gradient-to-br from-brand-yellow/40 to-brand-pink/20' :
        'bg-gradient-to-br from-brand-purple/40 to-brand-pink/20'
      }`}>
        {/* Decorative Elements */}
        {!isValidCategory && (
          <>
            <svg className="absolute top-8 left-8 w-16 h-10 text-brand-mint opacity-30" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
            <svg className="absolute top-12 right-12 w-20 h-12 text-brand-pink opacity-25" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
            <svg className="absolute bottom-8 left-1/4 w-14 h-8 text-brand-yellow opacity-20" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
          </>
        )}
        {category === 'clothing' && (
          <>
            <svg className="absolute top-6 left-10 w-12 h-12 text-brand-mint opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute top-10 right-16 w-10 h-10 text-brand-mint opacity-15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute bottom-6 right-1/3 w-8 h-8 text-brand-mint opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </>
        )}
        {category === 'jewellery' && (
          <>
            <svg className="absolute top-8 left-12 w-14 h-14 text-brand-yellow opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <svg className="absolute top-12 right-10 w-10 h-10 text-brand-pink opacity-15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <svg className="absolute bottom-8 left-1/4 w-12 h-12 text-brand-yellow opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </>
        )}
        {category === 'nails' && (
          <>
            <svg className="absolute top-6 left-8 w-12 h-12 text-brand-purple opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute top-10 right-14 w-10 h-10 text-brand-pink opacity-15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg className="absolute bottom-10 right-1/3 w-8 h-8 text-brand-purple opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-brand-navy mb-4 capitalize">
            {isValidCategory ? `${category} Collection` : "All Treasures"}
          </h1>
          <p className="text-gray-600">
            {isValidCategory
              ? category === 'clothing' ? `Explore our lovely ${category} for your little ones.` : `Explore our lovely ${category} for you and your little ones.`
              : "Discover joy in every piece of our collection."}
          </p>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full ${
        !isValidCategory ? 'bg-[#fffbf9]' :
        category === 'clothing' ? 'bg-gradient-to-b from-brand-mint/10 to-white' :
        category === 'jewellery' ? 'bg-gradient-to-b from-brand-yellow/10 to-white' :
        'bg-gradient-to-b from-brand-purple/10 to-white'
      }`}>
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <Link
            href="/shop"
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              !isValidCategory ? "bg-brand-navy text-white" : "bg-white text-brand-navy border border-gray-200 hover:bg-gray-50"
            }`}
          >
            All
          </Link>
          <Link
            href="/shop?category=clothing"
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              category === "clothing" ? "bg-brand-mint text-brand-navy" : "bg-white text-brand-navy border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Clothing
          </Link>
          <Link
            href="/shop?category=jewellery"
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              category === "jewellery" ? "bg-brand-yellow text-brand-navy" : "bg-white text-brand-navy border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Jewellery
          </Link>
          <Link
            href="/shop?category=nails"
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              category === "nails" ? "bg-brand-purple text-white" : "bg-white text-brand-navy border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Nails
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-bold text-brand-pink uppercase tracking-wider mb-2">{product.category}</p>
                <h3 className="text-lg font-bold text-brand-navy mb-2 flex-grow">{product.name}</h3>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <p className="text-2xl font-black text-brand-orange">₹{product.price}</p>
                  <span className="bg-brand-mint/20 text-brand-navy font-bold px-4 py-2 rounded-full group-hover:bg-brand-mint transition-colors text-sm">View</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
