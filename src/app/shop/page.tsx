import Image from "next/image";
import Link from "next/link";
import { products, Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";

// Next.js 15 requires searchParams to be treated as a Promise
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const validCategories: Category[] = ["clothing", "jewellery", "nails"];
  const isValidCategory = category && validCategories.includes(category as Category);

  let displayedProducts = products;

  if (search) {
    const s = search.toLowerCase();
    displayedProducts = displayedProducts.filter(
      p => p.name.toLowerCase().includes(s) || 
           p.description.toLowerCase().includes(s) || 
           p.category.toLowerCase().includes(s)
    );
  } else if (isValidCategory) {
    displayedProducts = displayedProducts.filter((p) => p.category === category);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section with Category-specific Background */}
      <div className={`relative overflow-hidden flex flex-col justify-center ${
        category === 'clothing' ? 'min-h-[250px] sm:min-h-[350px]' : 'py-16'
      } ${
        !isValidCategory ? 'bg-gradient-to-br from-brand-mint/30 via-brand-pink/20 to-brand-yellow/30' :
        category === 'clothing' ? 'bg-[#e4dfd1]' :
        category === 'jewellery' ? 'bg-gradient-to-br from-brand-yellow/40 to-brand-pink/20' :
        'bg-gradient-to-br from-brand-purple/40 to-brand-pink/20'
      }`}>
        {category === 'clothing' && (
          <Image
            src="/Banner/clothing_banner.jpg"
            alt="Clothing Collection Banner"
            fill
            className="object-cover object-center"
            priority
          />
        )}
        
        {/* Decorative Elements */}
        {!isValidCategory && (
          <>
            <svg className="absolute top-8 left-8 w-16 h-10 text-brand-mint opacity-30" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
            <svg className="absolute top-12 right-12 w-20 h-12 text-brand-pink opacity-25" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
            <svg className="absolute bottom-8 left-1/4 w-14 h-8 text-brand-yellow opacity-20" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
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

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full ${category === 'clothing' ? 'py-12' : ''}`}>
          <div className={`${category === 'clothing' ? 'inline-block bg-white/60 backdrop-blur-md px-8 py-6 rounded-[2rem] shadow-sm border border-white/50' : ''}`}>
            <h1 
              className={`text-4xl sm:text-5xl font-extrabold mb-4 ${category === 'clothing' ? 'text-gray-900 tracking-tight capitalize' : 'text-brand-navy'}`}
              style={category === 'clothing' ? { fontFamily: 'var(--font-quicksand), sans-serif' } : undefined}
            >
              {search ? `Search Results for "${search}"` : category === 'clothing' ? 'Our Little Wardrobe' : isValidCategory ? `${category} Collection` : "All Treasures"}
            </h1>
            <p 
              className={`max-w-2xl mx-auto ${category === 'clothing' ? 'text-gray-800 text-lg font-medium' : 'text-gray-600'}`}
              style={category === 'clothing' ? { fontFamily: 'var(--font-nunito), sans-serif' } : undefined}
            >
              {search 
                ? `Found ${displayedProducts.length} items matching your search.`
                : isValidCategory
                  ? category === 'clothing' ? `Explore our lovely ${category} for your little ones.` : `Explore our lovely ${category} for you and your little ones.`
                  : "Discover joy in every piece of our collection."}
            </p>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row gap-8 lg:gap-12 ${
        !isValidCategory ? 'bg-[#fffbf9]' :
        category === 'clothing' ? 'bg-gradient-to-b from-brand-mint/10 to-white' :
        category === 'jewellery' ? 'bg-gradient-to-b from-brand-yellow/10 to-white' :
        'bg-gradient-to-b from-brand-purple/10 to-white'
      }`}>
        
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <Link href="/" className="text-brand-pink hover:text-brand-navy font-bold mb-8 inline-flex items-center gap-2 transition-colors">
            &larr; Back to Home
          </Link>
          
          <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm sticky top-28">
            <h3 className="font-extrabold text-brand-navy text-lg mb-6 tracking-tight">Categories</h3>
            <div className="flex flex-col gap-4">
              <Link href="/shop" className="group flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${!isValidCategory ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink'}`}>
                  {!isValidCategory && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                </div>
                <span className={`font-bold transition-colors ${!isValidCategory ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>All Products</span>
              </Link>
              
              <Link href="/shop?category=clothing" className="group flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${category === 'clothing' ? 'bg-brand-mint border-brand-mint' : 'border-gray-300 group-hover:border-brand-mint'}`}>
                  {category === 'clothing' && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                </div>
                <span className={`font-bold transition-colors ${category === 'clothing' ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>Clothing</span>
              </Link>
              
              <Link href="/shop?category=jewellery" className="group flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${category === 'jewellery' ? 'bg-brand-yellow border-brand-yellow' : 'border-gray-300 group-hover:border-brand-yellow'}`}>
                  {category === 'jewellery' && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                </div>
                <span className={`font-bold transition-colors ${category === 'jewellery' ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>Jewellery</span>
              </Link>

              <Link href="/shop?category=nails" className="group flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${category === 'nails' ? 'bg-brand-purple border-brand-purple' : 'border-gray-300 group-hover:border-brand-purple'}`}>
                  {category === 'nails' && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                </div>
                <span className={`font-bold transition-colors ${category === 'nails' ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>Nails</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
