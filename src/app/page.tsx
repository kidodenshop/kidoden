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

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy mb-6 tracking-tight leading-tight">
              Soft, skin-friendly outfits<br/>
              <span className="text-brand-pink">made for your little ones</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              Crafted with soft fabrics, safe materials, and love — perfect for your child’s comfort.
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
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight mb-2">
            Why Parents Trust Kidoden 💛
          </h2>
          <p className="text-brand-pink font-bold text-sm mb-10">Trusted by 100+ happy parents</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { emoji: "👶", title: "Skin-safe & baby-friendly materials" },
              { emoji: "🚚", title: "Fast delivery across India" },
              { emoji: "💰", title: "Cash on Delivery available" },
              { emoji: "🔄", title: "Easy 7-day returns" },
              { emoji: "⭐", title: "Loved by growing families" },
            ].map(({ emoji, title }, i) => (
              <div
                key={title}
                className={`flex flex-col items-center gap-3 p-5 bg-[#fffbf9] rounded-3xl border border-brand-mint/10 text-center ${
                  i === 4 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center text-3xl">
                  {emoji}
                </div>
                <h4 className="font-extrabold text-brand-navy text-sm leading-snug">{title}</h4>
              </div>
            ))}
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
