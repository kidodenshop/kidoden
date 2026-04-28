import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">

        {/* Cloud decorations */}
        <svg className="absolute top-8 left-8 w-20 h-12 text-brand-mint opacity-40" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
        <svg className="absolute top-16 right-24 w-24 h-14 text-brand-pink opacity-30" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
        <svg className="absolute bottom-24 left-1/3 w-16 h-10 text-brand-yellow opacity-30" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>

        {/* Star decorations */}
        <svg className="absolute top-10 left-1/3 w-5 h-5 text-brand-yellow animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-1/3 left-6 w-4 h-4 text-brand-pink animate-pulse" style={{ animationDelay: '0.5s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-20 right-1/3 w-6 h-6 text-brand-mint animate-pulse" style={{ animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute bottom-20 right-10 w-5 h-5 text-brand-yellow animate-pulse" style={{ animationDelay: '1.5s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute bottom-16 left-16 w-4 h-4 text-brand-purple animate-pulse" style={{ animationDelay: '2s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text Content */}
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-brand-pink text-xl">♥</span>
              <span className="text-brand-pink font-bold tracking-widest text-sm uppercase">Hello Little One!</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mb-6 tracking-tight leading-tight">
              Every little one deserves<br/>
              to <span className="text-brand-pink">sparkle</span> <span className="text-brand-yellow">✨</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              Discover adorable outfits, precious jewellery and more, made just for your little stars.
            </p>

            <Link href="/shop" className="bg-brand-pink hover:bg-pink-400 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg flex items-center gap-3">
              SHOP NOW <span>→</span>
            </Link>
          </div>

          {/* Right Image Content */}
          <div className="md:w-1/2 relative w-full max-w-lg mx-auto md:mr-0 z-10">
            {/* Soft circular glow behind image */}
            <div className="absolute inset-0 bg-brand-pink/10 rounded-full blur-3xl scale-90" />
            <div className="relative w-full aspect-square animate-float" style={{ animationDuration: '6s' }}>
              <Image src="/hero-image.png" alt="Kidoden Featured Items" fill className="object-contain mix-blend-multiply drop-shadow-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-brand-pink text-lg">♥</span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">Why Choose Kidoden?</h2>
            <span className="text-brand-pink text-lg">♥</span>
          </div>
        <div className="bg-[#fffbf9] rounded-3xl border border-brand-mint/10 p-6 lg:p-8 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-brand-mint/10">
          
          {/* Feature 1 */}
          <div className="flex items-center gap-4 px-2 lg:px-6 w-full md:w-1/4">
            <div className="w-14 h-14 rounded-full bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-brand-red fill-brand-red transform scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-brand-navy text-sm md:text-base">Made with Love</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-medium">Carefully crafted for your little ones</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 px-2 lg:px-6 w-full md:w-1/4 pt-6 md:pt-0">
            <div className="w-14 h-14 rounded-full bg-brand-mint/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-brand-mint transform -rotate-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 22 12 12"/>
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-brand-navy text-sm md:text-base">Safe & Gentle</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-medium">Skin-friendly materials for delicate skin</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4 px-2 lg:px-6 w-full md:w-1/4 pt-6 md:pt-0">
            <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-brand-yellow" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" fill="#fbcd6a" stroke="none"/><path d="m9 12 2 2 4-4" stroke="white" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-brand-navy text-sm md:text-base">Premium Quality</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-medium">Best quality fabrics and jewellery</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-4 px-2 lg:px-6 w-full md:w-1/4 pt-6 md:pt-0">
            <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-brand-purple" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/>
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-brand-navy text-sm md:text-base">Fast Delivery</h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-medium">Quick and reliable delivery pan India</p>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#fffbf9] text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-brand-pink text-lg">♥</span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">Shop by Category</h2>
            <span className="text-brand-pink text-lg">♥</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/shop?category=clothing" className="group rounded-[2rem] overflow-hidden relative h-96 shadow-md hover:shadow-2xl transition-all">
              <Image src="/clothe/clo-3.jpeg" alt="Clothing" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-mint/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-extrabold text-white">Clothing</h3>
                <span className="bg-white text-brand-navy text-sm font-bold px-4 py-2 rounded-full group-hover:bg-brand-mint transition-colors">Shop →</span>
              </div>
            </Link>
            <Link href="/shop?category=jewellery" className="group rounded-[2rem] overflow-hidden relative h-96 shadow-md hover:shadow-2xl transition-all">
              <Image src="/jewellery/jew-3.jpeg" alt="Jewellery" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-yellow/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-extrabold text-white">Jewellery</h3>
                <span className="bg-white text-brand-navy text-sm font-bold px-4 py-2 rounded-full group-hover:bg-brand-yellow transition-colors">Shop →</span>
              </div>
            </Link>
            <Link href="/shop?category=nails" className="group rounded-[2rem] overflow-hidden relative h-96 shadow-md hover:shadow-2xl transition-all">
              <Image src="/nails/nails-5.jpeg" alt="Nails" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-extrabold text-white">Nails</h3>
                <span className="bg-white text-brand-navy text-sm font-bold px-4 py-2 rounded-full group-hover:bg-brand-purple group-hover:text-white transition-colors">Shop →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-brand-yellow text-lg">✦</span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">Featured Treasures</h2>
            <span className="text-brand-yellow text-lg">✦</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
                <div className="relative h-80 w-full overflow-hidden bg-gray-50">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="p-8">
                  <p className="text-sm font-bold text-brand-pink uppercase tracking-wider mb-3">{product.category}</p>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-3xl font-black text-brand-orange">₹{product.price}</p>
                    <span className="bg-brand-mint/20 text-brand-navy font-bold px-6 py-3 rounded-full group-hover:bg-brand-mint transition-colors">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/shop" className="inline-flex items-center gap-2 border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white font-bold py-4 px-10 rounded-full transition-all">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Shop for Moms & Babies */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#fffbf9] text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-brand-mint text-lg">♥</span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">Shop by Your Little World</h2>
            <span className="text-brand-mint text-lg">♥</span>
          </div>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Everything your little family needs, all in one place</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shop for Moms */}
            <Link href="/shop?category=jewellery" className="group relative rounded-[2rem] overflow-hidden h-[28rem] shadow-md hover:shadow-2xl transition-all">
              <Image src="/jewellery/jew-2.jpeg" alt="Shop for Moms" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <p className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-2">Jewellery & Nails</p>
                <h3 className="text-4xl font-extrabold text-white mb-4">Shop for Moms</h3>
                <span className="inline-flex items-center gap-2 bg-white text-brand-navy font-bold px-6 py-3 rounded-full group-hover:bg-brand-pink group-hover:text-white transition-colors">
                  Explore →
                </span>
              </div>
            </Link>

            {/* Shop for Babies */}
            <Link href="/shop?category=clothing" className="group relative rounded-[2rem] overflow-hidden h-[28rem] shadow-md hover:shadow-2xl transition-all">
              <Image src="/clothe/clo-4.jpeg" alt="Shop for Babies" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/70 via-brand-pink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <p className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-2">Clothing & Accessories</p>
                <h3 className="text-4xl font-extrabold text-white mb-4">Shop for Babies</h3>
                <span className="inline-flex items-center gap-2 bg-white text-brand-navy font-bold px-6 py-3 rounded-full group-hover:bg-brand-mint transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
