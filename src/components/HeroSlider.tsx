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
    <div className="flex flex-col md:relative w-full md:h-[60vh] lg:h-[65vh] xl:h-[75vh] overflow-hidden bg-[#fffbf9]">
      {/* Image Wrapper */}
      <div className="relative w-full h-[40vh] md:absolute md:inset-0 md:h-full">
        <Image
          src={heroData.image}
          alt={heroData.title}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Text Container */}
      <div className="relative z-20 w-full md:max-w-8xl md:mx-auto px-6 py-8 md:px-8 md:py-0 h-auto md:h-full flex flex-col justify-center items-center md:items-start text-center md:text-left bg-[#fffbf9] md:bg-transparent">
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%]">
          <span className="text-brand-pink md:text-brand-navy/60 font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase mb-2 sm:mb-4 block">
            Kidoden Collection
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mb-2 sm:mb-4 tracking-tight leading-[1.1]">
            <span className="text-brand-pink">Soft</span> on skin, gentle on smiles
            <span className="block text-brand-navy/80 font-bold text-lg sm:text-2xl md:text-3xl mt-1 sm:mt-2">
              {heroData.subtitle}
            </span>
          </h1>
          <p className="hidden sm:block text-base md:text-lg text-brand-navy/80 mb-6 sm:mb-8 leading-relaxed font-semibold max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
            {heroData.description}
          </p>
          <Link
            href={heroData.link}
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-base font-bold text-white transition-all bg-brand-pink hover:bg-brand-navy rounded-full tracking-wide shadow-md hover:shadow-lg mt-2"
          >
            {heroData.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

