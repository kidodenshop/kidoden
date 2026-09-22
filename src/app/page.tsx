import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import HeroSlider from "@/components/HeroSlider";
import ProductSlider from "@/components/ProductSlider";
import ProductCard from "@/components/ProductCard";
import MobileTrustSection from "@/components/MobileTrustSection";
import ShopByCategory from "@/components/ShopByCategory";
import TitleDivider from "@/components/TitleDivider";
import ValueProposition from "@/components/ValueProposition";
import HomeScrollReveal from "@/components/HomeScrollReveal";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  // New Arrivals: The latest 8 uploaded products
  const newArrivals = products.slice(0, 8);
  // Best Sellers: Products marked as featured in the admin panel
  const bestSellers = products.filter((p) => p.isFeatured);

  return (
    <HomeScrollReveal>
      {/* Modern Hero Slider (Above the fold - instant visibility) */}
      <HeroSlider />

      {/* Shop by Category Section */}
      <ShopByCategory />

      {/* Mobile-only Trust Section: Compact with auto horizontal scroll */}
      <div className="reveal-on-scroll md:hidden">
        <MobileTrustSection />
      </div>

      {/* Desktop-only Trust Section: Original full design preserved */}
      <section className="hidden md:block py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white text-center relative overflow-hidden">
        <div className="max-w-8xl mx-auto relative z-10">
          <div className="reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">
              Why Parents Trust Kidoden
            </h2>
            <TitleDivider className="mt-2 mb-3" />
            <p className="text-gray-500 mb-8">Loved by 100+ families across India</p>
          </div>

          {/* Feature Cards with Staggered Upward Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {/* Card 1 - Gentle on delicate skin */}
            <div className="bg-pink-50 rounded-3xl p-6 text-center relative border border-pink-100 reveal-on-scroll delay-100">
              <span className="absolute top-4 right-4 text-brand-pink text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                <img src="/baby_face.png" alt="Baby face" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Gentle on<br />delicate skin</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Made with ultra-soft, skin-friendly fabrics perfect for your little one.</p>
            </div>

            {/* Card 2 - Safe & quick delivery */}
            <div className="bg-emerald-50 rounded-3xl p-6 text-center relative border border-emerald-100 reveal-on-scroll delay-150">
              <span className="absolute top-4 right-4 text-emerald-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <img src="/truck.png" alt="Truck" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Safe & quick<br />delivery</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Carefully packed and delivered safely to your doorstep across India.</p>
            </div>

            {/* Card 3 - Pay easily with COD */}
            <div className="bg-amber-50 rounded-3xl p-6 text-center relative border border-amber-100 reveal-on-scroll delay-200">
              <span className="absolute top-4 right-4 text-amber-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <img src="/cash_on_delivery.png" alt="Cash on delivery" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Pay easily<br />with COD</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Cash on Delivery available for your peace of mind.</p>
            </div>

            {/* Card 4 - Hassle-free returns */}
            <div className="bg-violet-50 rounded-3xl p-6 text-center relative border border-violet-100 reveal-on-scroll delay-250">
              <span className="absolute top-4 right-4 text-violet-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <img src="/return.png" alt="Return" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Hassle-free<br />returns</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Easy 7-day returns because we care about your happiness.</p>
            </div>

            {/* Card 5 - Made with love */}
            <div className="bg-rose-50 rounded-3xl p-6 text-center relative border border-rose-100 reveal-on-scroll delay-300">
              <span className="absolute top-4 right-4 text-rose-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <img src="/make_love.png" alt="Made with love" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Made with love,<br />for little ones</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Thoughtfully designed products made with love and care in every stitch.</p>
            </div>
          </div>

          {/* Banner with teddy bear */}
          <div className="bg-pink-50 rounded-3xl p-6 mb-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-0 max-w-4xl mx-auto border border-pink-100 border-dashed text-center md:text-left reveal-on-scroll delay-200">
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
          <div className="reveal-on-scroll delay-300">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-pink hover:bg-pink-400 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Explore Collection <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modernized Featured Products */}
      <section className="pt-10 md:pt-14 pb-4 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-5 md:mb-7 relative flex flex-col items-center reveal-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">New Arrivals</h2>
            <TitleDivider className="mt-2" />
            <Link href="/shop" className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-2 text-brand-navy font-bold hover:text-brand-pink transition-colors">
              View All <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="reveal-on-scroll delay-150">
            <ProductSlider products={newArrivals} />
          </div>

          <div className="mt-6 text-center md:hidden reveal-on-scroll delay-200">
            <Link href="/shop" className="inline-block border-2 border-brand-navy text-brand-navy font-bold py-3 px-8 rounded-full">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Modern UX: For the Whole Family */}
      {/* Best Sellers Section */}
      <section className="pt-6 pb-10 md:pb-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-5 md:mb-7 relative flex flex-col items-center reveal-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">Best Sellers</h2>
            <TitleDivider className="mt-2" />
          </div>

          <div className="reveal-on-scroll delay-150">
            <ProductSlider products={bestSellers} />
          </div>
        </div>
      </section>

      {/* Launch Offer Banner Section */}
      <section className="w-full relative h-[350px] md:h-[450px] overflow-hidden bg-[#faf6f0] border-t border-b border-gray-100 reveal-on-scroll">
        <Image
          src="/Banner/new-launch-offer.png"
          alt="Launching Offer Sale"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-start max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
          <div className="w-full md:w-[60%] flex flex-col justify-center items-start text-left">
            <span 
              className="text-2xl md:text-4.5xl font-bold text-brand-pink mb-3 block"
              style={{ fontFamily: 'var(--font-dancing-script), cursive' }}
            >
              Launching Offer Sale!
            </span>
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-navy tracking-tight mb-8 leading-none uppercase"
              style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}
            >
              UP TO <span className="bg-gradient-to-r from-brand-orange via-brand-orange to-[#b58c54] bg-clip-text text-transparent">20% OFF</span>
            </h2>
            <Link
              href="/shop"
              className="bg-white hover:bg-white/95 text-brand-navy font-black py-4 px-10 rounded-full text-xs md:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-gray-200/50 hover:scale-105 active:scale-95 border border-gray-100"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Quality without compromise section with mobile auto-scroll */}
      <div className="reveal-on-scroll">
        <ValueProposition />
      </div>
    </HomeScrollReveal>
  );
}

