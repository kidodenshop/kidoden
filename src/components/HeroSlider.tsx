"use client";

import Image from "next/image";
import Link from "next/link";

const heroData = {
  title: "Soft on skin, gentle on smiles",
  subtitle: "made for your little ones",
  description: "Crafted with soft fabrics, safe materials, and love — perfect for your child's comfort.",
  image: "/hero_slider/hero-banner.png",
  cta: "Shop Now",
  link: "/shop",
};

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[75vh] overflow-hidden bg-[#fffbf9]">
      {/* Full Background Image */}
      <Image
        src={heroData.image}
        alt={heroData.title}
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark gradient overlay for mobile view to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:hidden z-10" />

      <div className="relative z-20 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start text-left">
        {/* Text Content */}
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] py-8">
          <span className="text-brand-yellow md:text-brand-navy font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">
            Kidoden Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white md:text-brand-navy mb-4 tracking-tight leading-[1.1]">
            <span className="text-brand-pink">Soft</span> on skin, gentle on smiles
            <span className="block text-white md:text-brand-navy font-bold text-2xl md:text-3xl mt-2">
              {heroData.subtitle}
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 md:text-brand-navy/80 mb-8 leading-relaxed font-semibold max-w-xs sm:max-w-sm md:max-w-md">
            {heroData.description}
          </p>
          <Link
            href={heroData.link}
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white transition-all bg-brand-pink hover:bg-brand-navy rounded-full tracking-wide shadow-lg"
          >
            {heroData.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

