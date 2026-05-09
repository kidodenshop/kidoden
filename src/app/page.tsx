import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import HeroSlider from "@/components/HeroSlider";
import ProductSlider from "@/components/ProductSlider";

export default function Home() {
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Modern Hero Slider */}
      <HeroSlider />

      {/* Why Parents Trust Kidoden - Kept exactly as requested */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white text-center relative overflow-hidden">
        {/* Decorative elements */}
        <svg className="absolute top-8 left-12 w-4 h-4 text-brand-mint" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        <svg className="absolute top-16 left-24 w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        <svg className="absolute top-12 right-16 w-4 h-4 text-brand-pink" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        <svg className="absolute top-20 right-32 w-3 h-3 text-brand-mint" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        {/* Heart decorations */}
        <span className="absolute top-24 left-16 text-brand-pink/30 text-2xl hidden md:block"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
        <span className="absolute top-32 right-20 text-brand-yellow/40 text-xl hidden md:block"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with heart */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#f0959f">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">
            Why Parents Trust Kidoden <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbcd6a" className="inline-block align-middle ml-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          </h2>
          <p className="text-gray-500 mb-1">Loved by 100+ families across India</p>
          <p className="text-gray-500 mb-8"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fbcd6a" className="inline-block align-middle mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> 4.8/5 from our lovely parents</p>

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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">Shop by Category</h2>
            <div className="w-16 h-1 bg-brand-pink mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
            {[
              { title: "Shop for Boy", image: "/clothe/Homepage/shop-for-boy.png", link: "/shop?category=clothing" },
              { title: "Shop for Girl", image: "/clothe/Homepage/shop-for-girl.png", link: "/shop?category=clothing" },
              { title: "Jewellery", image: "/jewellery/shop-by-jewellery.png", link: "/shop?category=jewellery" }
            ].map((cat) => (
              <Link key={cat.title} href={cat.link} className="group flex flex-col">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-gray-100">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-1 group-hover:text-brand-pink transition-colors">{cat.title}</h3>
                  <span className="text-xs md:text-sm text-gray-500 uppercase tracking-widest font-semibold group-hover:text-brand-navy transition-colors">
                    Shop Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modernized Featured Products */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
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
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">For the Whole Family</h2>
            <div className="w-16 h-1 bg-brand-yellow rounded-full mb-6"></div>
            <p className="text-lg text-gray-500 max-w-2xl">Everything you and your little ones need, crafted with love and care.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
            {/* Left: Shop for Babies (Large horizontal card) */}
            <Link href="/shop?category=clothing" className="group w-full lg:w-3/5 flex flex-col sm:flex-row bg-[#fafafa] rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-full sm:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 sm:order-1">
                <span className="text-brand-mint font-bold tracking-widest text-xs md:text-sm uppercase mb-4 block">For the Little Ones</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4 leading-tight">Shop for Babies</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">Discover soft, safe, and adorable outfits designed for everyday comfort and play.</p>
                <div className="flex items-center gap-2 text-brand-navy font-bold group-hover:text-brand-mint transition-colors mt-auto">
                  Explore Collection <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
              <div className="w-full sm:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] order-1 sm:order-2">
                <Image src="/shop_by/shop_for_baby.png" alt="Shop for Babies" fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
            </Link>

            {/* Right: Shop for Moms (Vertical card) */}
            <Link href="/shop?category=jewellery" className="group w-full lg:w-2/5 flex flex-col bg-[#fffbf9] rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-500 border border-pink-50">
              <div className="w-full relative min-h-[300px] sm:min-h-[350px] lg:flex-1">
                <Image src="/shop_by/shop_for_mom.png" alt="Shop for Moms" fill className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-in-out" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center flex-none">
                <span className="text-brand-pink font-bold tracking-widest text-xs md:text-sm uppercase mb-3 block">For You</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-3">Shop for Moms</h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base">Elegant jewellery and beautiful accessories to treat yourself, because you deserve it.</p>
                <div className="flex items-center gap-2 text-brand-navy font-bold group-hover:text-brand-pink transition-colors mt-auto">
                  Explore <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Summer Banner Section */}
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
