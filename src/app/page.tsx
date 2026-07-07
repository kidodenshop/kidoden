import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import HeroSlider from "@/components/HeroSlider";
import ProductSlider from "@/components/ProductSlider";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => ["c-1", "c-2", "c-5", "g-1", "g-2"].includes(p.id));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Modern Hero Slider */}
      <HeroSlider />

      {/* Why Parents Trust Kidoden - Kept exactly as requested */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white text-center relative overflow-hidden">

        <div className="max-w-8xl mx-auto relative z-10">
          {/* Header with heart */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#f0959f">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">
            Why Parents Trust Kidoden <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbcd6a" className="inline-block align-middle ml-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          </h2>
          <p className="text-gray-500 mb-8">Loved by 100+ families across India</p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {/* Card 1 - Gentle on delicate skin */}
            <div className="bg-pink-50 rounded-3xl p-6 text-center relative border border-pink-100">
              <span className="absolute top-4 right-4 text-brand-pink text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                <img src="/baby_face.png" alt="Baby face" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Gentle on<br />delicate skin</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Made with ultra-soft, skin-friendly fabrics perfect for your little one.</p>
            </div>

            {/* Card 2 - Safe & quick delivery */}
            <div className="bg-emerald-50 rounded-3xl p-6 text-center relative border border-emerald-100">
              <span className="absolute top-4 right-4 text-emerald-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <img src="/truck.png" alt="Truck" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Safe & quick<br />delivery</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Carefully packed and delivered safely to your doorstep across India.</p>
            </div>

            {/* Card 3 - Pay easily with COD */}
            <div className="bg-amber-50 rounded-3xl p-6 text-center relative border border-amber-100">
              <span className="absolute top-4 right-4 text-amber-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <img src="/cash_on_delivery.png" alt="Cash on delivery" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Pay easily<br />with COD</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Cash on Delivery available for your peace of mind.</p>
            </div>

            {/* Card 4 - Hassle-free returns */}
            <div className="bg-violet-50 rounded-3xl p-6 text-center relative border border-violet-100">
              <span className="absolute top-4 right-4 text-violet-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <img src="/return.png" alt="Return" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Hassle-free<br />returns</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Easy 7-day returns because we care about your happiness.</p>
            </div>

            {/* Card 5 - Made with love */}
            <div className="bg-rose-50 rounded-3xl p-6 text-center relative border border-rose-100">
              <span className="absolute top-4 right-4 text-rose-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <img src="/make_love.png" alt="Made with love" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Made with love,<br />for little ones</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Thoughtfully designed products made with love and care in every stitch.</p>
            </div>
          </div>

          {/* Banner with teddy bear */}
          <div className="bg-pink-50 rounded-3xl p-6 mb-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-0 max-w-4xl mx-auto border border-pink-100 border-dashed text-center md:text-left">
            <div className="flex items-center justify-center gap-4">
              <img src="/teddy_logo.png?v=2" alt="Teddy" className="w-16 h-16 md:w-[70px] md:h-[70px] object-contain" />
              <span className="text-brand-pink text-lg hidden md:inline"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
            </div>
            <p className="text-lg md:text-xl text-brand-navy font-medium">
              Shop with confidence – your little one <br className="block md:hidden" /><span className="text-brand-pink font-bold">deserves the best!</span>
            </p>
            <div className="flex items-center hidden md:block">
              <img src="/foot.png?v=2" alt="Footprints" className="w-10 h-10 object-contain" />
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-pink hover:bg-pink-400 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Explore Collection <span>→</span>
          </Link>
        </div>
      </section>

      {/* Modernized Shop by Category */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">Shop by Category</h2>
            <div className="w-16 h-1 bg-brand-pink mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Little Gentlemen",
                image: "/clothe/Homepage/shop-for-boy.png",
                link: "/shop?category=clothing",
                position: "object-[center_15%]",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a4263" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 12l5.5 4.5v-9L14.5 12z" />
                    <path d="M9.5 12L4 7.5v9L9.5 12z" />
                    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
                  </svg>
                )
              },
              {
                title: "Little Princess",
                image: "/clothe/Homepage/shop-for-baby-girl.png",
                link: "/shop?category=clothing",
                position: "object-[center_15%]",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e88fa2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19h16" />
                    <path d="M4 15l2-8 4 4 2-6 2 6 4-4 2 8" />
                    <path d="M4 15v4" />
                    <path d="M20 15v4" />
                  </svg>
                )
              },
              {
                title: "Gifting",
                image: "/clothe/Homepage/gifting.png",
                link: "/shop?category=gifting",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f4a28c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12v10H4V12" />
                    <rect x="2" y="7" width="20" height="5" rx="1" />
                    <path d="M12 22V7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                )
              }
            ].map((cat) => (
              <Link key={cat.title} href={cat.link} className="group flex flex-col items-center bg-[#fffdfa] rounded-[2rem] p-3 pb-8 shadow-sm border border-[#f5ece1] hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-100">
                  <Image src={cat.image} alt={cat.title} fill className={`object-cover ${cat.position || "object-center"} group-hover:scale-105 transition-transform duration-700 ease-out`} />
                </div>
                <div className="w-[72px] h-[72px] rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center -mt-9 relative z-10 border border-gray-50">
                  {cat.icon}
                </div>
                <div className="mt-5 text-center flex flex-col items-center w-full px-2">
                  <div className="flex items-center justify-center gap-3 w-full">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbb5a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform scale-x-[-1] flex-shrink-0">
                      <path d="M4 22S4 13 10 8" />
                      <path d="M10 8c0 0 3-4 7-4 0 0-1 4-4 6" />
                      <path d="M8 12c0 0 3-3 6-2 0 0-1 3-3 4" />
                      <path d="M6 16c0 0 3-2 5-1 0 0-1 2-3 2" />
                    </svg>
                    <h3 className="text-xl md:text-[22px] font-bold text-brand-navy tracking-wide truncate">{cat.title}</h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbb5a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M4 22S4 13 10 8" />
                      <path d="M10 8c0 0 3-4 7-4 0 0-1 4-4 6" />
                      <path d="M8 12c0 0 3-3 6-2 0 0-1 3-3 4" />
                      <path d="M6 16c0 0 3-2 5-1 0 0-1 2-3 2" />
                    </svg>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f0959f" className="my-3">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-[#1a4263] font-bold uppercase tracking-[0.15em]">
                    Shop Collection
                  </span>
                  <div className="w-8 h-[2px] bg-[#f0959f] mt-1.5 group-hover:w-16 transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modernized Featured Products */}
      <section className="pt-12 md:pt-16 pb-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12 relative flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">New Arrivals</h2>
            <div className="w-16 h-1 bg-brand-pink mx-auto rounded-full"></div>
            <Link href="/shop" className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-2 text-brand-navy font-bold hover:text-brand-pink transition-colors">
              View All <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <ProductSlider products={featuredProducts} />

          <div className="mt-12 text-center md:hidden">
            <Link href="/shop" className="inline-block border-2 border-brand-navy text-brand-navy font-bold py-3 px-8 rounded-full">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Modern UX: For the Whole Family */}
      {/* Best Sellers Section */}
      <section className="pt-6 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12 relative flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">Best Sellers</h2>
            <div className="w-16 h-1 bg-brand-pink mx-auto rounded-full"></div>
          </div>

          <ProductSlider products={bestSellers} />
        </div>
      </section>

      {/* Bundles of Love Banner Section */}
      <section className="w-full relative h-[350px] md:h-[450px] overflow-hidden bg-[#f0959f] border-t border-b border-gray-100">
        <Image
          src="/Banner/baby-gift.png"
          alt="Hampers of Joy"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-y-0 left-0 w-full md:w-[50%] bg-gradient-to-r from-brand-navy/85 via-brand-navy/55 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-start max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
          <div className="w-full md:w-[45%] flex flex-col justify-center items-start text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide mb-3 leading-tight" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
              Hampers of <span className="text-[#fbcd6a]">Joy</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white font-semibold mb-8 max-w-sm">
              Thoughtfully curated newborn boxes & milestone gift hampers.
            </p>
            <Link
              href="/shop?category=gifting"
              className="bg-white hover:bg-[#fafafa] text-brand-navy font-bold py-3.5 px-8 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors shadow-lg"
            >
              Explore Gifts
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Banner Section - Hidden for now
      <section className="w-full relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/banner/summer_banner.png"
          alt="Hello Summer"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="bg-black/20 w-full md:w-[55%] h-[60%] md:h-[45%] flex flex-col justify-center items-center text-center px-4 py-8 backdrop-blur-[1px]">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-wider mb-2 drop-shadow-md" style={{ fontFamily: 'var(--font-quicksand)' }}>
              HELLO SUMMER!
            </h2>
            <p className="text-xl md:text-3xl text-white font-medium mb-8 drop-shadow-md">
              A collection that smiles.
            </p>
            <Link
              href="/shop"
              className="bg-[#f4a28c] hover:bg-[#e3917b] text-white font-bold py-3 px-10 text-sm md:text-base tracking-widest uppercase transition-colors shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* Modernized Value Proposition */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-8">
            Quality without compromise.
          </h2>
          <p className="text-lg md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-medium mb-16">
            At Kidoden, we believe every child deserves the best. From soft fabrics to safe accessories, every product is carefully selected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#fafafa] rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a4263" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
              </div>
              <h4 className="font-bold text-xl text-brand-navy mb-2">Premium Quality</h4>
              <p className="text-gray-500 text-sm">Finest materials for lasting comfort.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#fafafa] rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a4263" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <h4 className="font-bold text-xl text-brand-navy mb-2">Child Safe</h4>
              <p className="text-gray-500 text-sm">Non-toxic, gentle on delicate skin.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#fafafa] rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a4263" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h4 className="font-bold text-xl text-brand-navy mb-2">Modern Design</h4>
              <p className="text-gray-500 text-sm">Thoughtfully crafted styles they'll love.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
