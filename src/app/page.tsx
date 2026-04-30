import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[100dvh] flex flex-col md:min-h-0 md:block pt-28 pb-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-mint-50">

        {/* Cloud decorations - hidden on mobile */}
        <svg className="absolute top-8 left-4 md:left-8 w-16 md:w-20 h-10 md:h-12 text-brand-mint opacity-40" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
        <svg className="absolute top-16 right-4 md:right-24 w-16 md:w-24 h-10 md:h-14 text-brand-pink opacity-30" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>
        <svg className="absolute bottom-32 md:bottom-24 left-8 md:left-1/3 w-12 md:w-16 h-8 md:h-10 text-brand-yellow opacity-30" viewBox="0 0 100 60" fill="currentColor"><ellipse cx="50" cy="45" rx="45" ry="18"/><ellipse cx="30" cy="38" rx="22" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="20"/></svg>

        {/* Star decorations - reduced on mobile */}
        <svg className="absolute top-10 left-1/3 w-5 h-5 text-brand-yellow animate-pulse hidden md:block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-1/3 left-6 w-4 h-4 text-brand-pink animate-pulse" style={{ animationDelay: '0.5s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-20 right-1/3 w-6 h-6 text-brand-mint animate-pulse hidden md:block" style={{ animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute bottom-20 right-10 w-5 h-5 text-brand-yellow animate-pulse hidden md:block" style={{ animationDelay: '1.5s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute bottom-16 left-16 w-4 h-4 text-brand-purple animate-pulse hidden md:block" style={{ animationDelay: '2s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

        {/* Additional decorative shapes - hidden on mobile */}
        <svg className="absolute top-1/4 right-10 w-8 h-8 text-brand-pink opacity-20 animate-pulse hidden md:block" style={{ animationDelay: '2.5s' }} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="absolute bottom-1/4 left-1/4 w-6 h-6 text-brand-mint opacity-25 animate-pulse hidden md:block" style={{ animationDelay: '3s' }} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="absolute top-1/2 right-1/4 w-5 h-5 text-brand-yellow opacity-30 animate-pulse hidden md:block" style={{ animationDelay: '1.8s' }} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="absolute bottom-1/4 right-8 md:right-1/3 w-4 h-4 text-brand-purple opacity-30 animate-pulse" style={{ animationDelay: '2.2s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="absolute top-1/4 md:top-1/3 right-8 md:right-1/2 w-4 md:w-3 h-4 md:h-3 text-brand-pink opacity-30 animate-pulse" style={{ animationDelay: '2.8s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="absolute bottom-1/3 left-8 md:left-1/2 w-4 md:w-3 h-4 md:h-3 text-brand-mint opacity-30 animate-pulse" style={{ animationDelay: '3.2s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text Content */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0959f"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span className="text-brand-pink font-bold tracking-widest text-sm uppercase">Hello Little One!</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy mb-6 tracking-tight leading-tight">
              Soft, skin-friendly outfits<br/>
              <span className="text-brand-pink">made for your little ones</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              Crafted with soft fabrics, safe materials, and love — perfect for your child’s comfort.
            </p>

            <Link href="/shop" className="bg-brand-pink hover:bg-pink-400 text-white font-bold py-3 px-6 md:py-4 md:px-10 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-base md:text-lg flex items-center gap-2 md:gap-3">
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

      {/* Why Parents Love Kidoden */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white text-center relative overflow-hidden">
        {/* Decorative elements */}
        <svg className="absolute top-8 left-12 w-4 h-4 text-brand-mint" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-16 left-24 w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-12 right-16 w-4 h-4 text-brand-pink" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg className="absolute top-20 right-32 w-3 h-3 text-brand-mint" fill="currentColor" viewBox="0 0 24 24" style={{ fontFamily: 'var(--font-quicksand)' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        {/* Heart decorations */}
        <span className="absolute top-24 left-16 text-brand-pink/30 text-2xl hidden md:block"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
        <span className="absolute top-32 right-20 text-brand-yellow/40 text-xl hidden md:block"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with heart */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#f0959f">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">
            Why Parents Trust Kidoden <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbcd6a" className="inline-block align-middle ml-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </h2>
          <p className="text-gray-500 mb-1">Loved by 100+ families across India</p>
          <p className="text-gray-500 mb-8"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fbcd6a" className="inline-block align-middle mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> 4.8/5 from our lovely parents</p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {/* Card 1 - Gentle on delicate skin */}
            <div className="bg-pink-50 rounded-3xl p-6 text-center relative border border-pink-100">
              <span className="absolute top-4 right-4 text-brand-pink text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                <img src="/baby_face.png" alt="Baby face" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Gentle on<br/>delicate skin</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Made with ultra-soft, skin-friendly fabrics perfect for your little one.</p>
            </div>

            {/* Card 2 - Safe & quick delivery */}
            <div className="bg-emerald-50 rounded-3xl p-6 text-center relative border border-emerald-100">
              <span className="absolute top-4 right-4 text-emerald-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <img src="/truck.png" alt="Truck" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Safe & quick<br/>delivery</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Carefully packed and delivered safely to your doorstep across India.</p>
            </div>

            {/* Card 3 - Pay easily with COD */}
            <div className="bg-amber-50 rounded-3xl p-6 text-center relative border border-amber-100">
              <span className="absolute top-4 right-4 text-amber-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <img src="/cash_on_delivery.png" alt="Cash on delivery" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Pay easily<br/>with COD</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Cash on Delivery available for your peace of mind.</p>
            </div>

            {/* Card 4 - Hassle-free returns */}
            <div className="bg-violet-50 rounded-3xl p-6 text-center relative border border-violet-100">
              <span className="absolute top-4 right-4 text-violet-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <img src="/return.png" alt="Return" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Hassle-free<br/>returns</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Easy 5-day returns because we care about your happiness.</p>
            </div>

            {/* Card 5 - Made with love */}
            <div className="bg-rose-50 rounded-3xl p-6 text-center relative border border-rose-100">
              <span className="absolute top-4 right-4 text-rose-400 text-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
              <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
                <img src="/make_love.png" alt="Made with love" className="w-[75px] h-[75px] object-contain" />
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Made with love,<br/>for little ones</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Thoughtfully designed products made with love and care in every stitch.</p>
            </div>
          </div>

          {/* Banner with teddy bear */}
          <div className="bg-pink-50 rounded-3xl p-6 mb-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-0 max-w-4xl mx-auto border border-pink-100 border-dashed text-center md:text-left">
            <div className="flex items-center justify-center gap-4">
              <img src="/teddy_logo.png?v=2" alt="Teddy" className="w-16 h-16 md:w-[70px] md:h-[70px] object-contain" />
              <span className="text-brand-pink text-lg hidden md:inline"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
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

      {/* Shop By Category */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#fffbf9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0959f"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">Shop by Category</h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0959f"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-brand-yellow text-lg">✦</span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight text-center">Most Loved by Little Ones</h2>
            <span className="text-brand-yellow text-lg">✦</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
                <div className="relative h-80 w-full overflow-hidden bg-gray-50">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="p-8 text-left">
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#fffbf9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#8bcbc8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight text-center">Shop by Your Little World</h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#8bcbc8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
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

      {/* Value Proposition Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbcd6a"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Made with Love, Designed for Comfort <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbcd6a" className="inline-block align-middle ml-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbcd6a"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            At Kidoden, we believe every child deserves the best. From soft fabrics to safe accessories, every product is carefully selected to keep your little ones happy, comfortable, and stylish.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-brand-pink/10 px-5 py-3 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0959f"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span className="font-bold text-brand-navy text-sm">Soft Fabrics</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-mint/10 px-5 py-3 rounded-full">
              <span className="text-brand-mint text-xl">✓</span>
              <span className="font-bold text-brand-navy text-sm">Safe Materials</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-yellow/10 px-5 py-3 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbcd6a"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <span className="font-bold text-brand-navy text-sm">Premium Quality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
