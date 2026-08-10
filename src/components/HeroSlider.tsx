"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    type: "classic",
    image: "/hero_slider/hero-banner.png",
    mobileImage: "/hero_slider/mobile-hero-banner.png",
    tagline: "Kidoden Collection",
    titlePrefix: "Soft",
    titleRest: " on skin, gentle on smiles",
    subtitle: "made for your little ones",
    description: "Crafted with soft fabrics, safe materials, and love — perfect for your child's comfort.",
    cta: "Shop Now",
    link: "/shop",
  },
  {
    type: "kids-collection",
    image: "/hero_slider/2nd-slider.png",
    mobileImage: "/hero_slider/mobile-2nd-slider.png",
    tagline: "TREND ON",
    titlePrefix: "style",
    titleRest: " for kids",
    badge: "2 to 12 years",
    bullets: [
      { text: "Trendy Looks", colorClass: "text-[#1a4263]", dotClass: "bg-[#1a4263]" },
      { text: "Every Age", colorClass: "text-[#f0959f]", dotClass: "bg-[#f0959f]" },
      { text: "Every Occasion", colorClass: "text-[#4E9F8E]", dotClass: "bg-[#4E9F8E]" },
    ],
    description: "From playful everyday outfits to picture-perfect moments — we've got styles they'll love to wear.",
    cta: "Explore Styles",
    link: "/shop?category=clothing",
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[72vh] sm:h-[75vh] md:h-[60vh] lg:h-[65vh] xl:h-[75vh] overflow-hidden bg-[#fffbf9] select-none group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image (Absolute across all screen sizes) */}
              <div className="absolute inset-0 w-full h-full">
                {slide.mobileImage ? (
                  <>
                    {/* Mobile image */}
                    <Image
                      src={slide.mobileImage}
                      alt={slide.type === "classic" ? slide.titlePrefix + slide.titleRest : "Kidoden Kids Collection"}
                      fill
                      className="object-cover object-center md:hidden"
                      priority={index === 0}
                    />
                    {/* Desktop image */}
                    <Image
                      src={slide.image}
                      alt={slide.type === "classic" ? slide.titlePrefix + slide.titleRest : "Kidoden Kids Collection"}
                      fill
                      className="object-cover object-right md:object-center hidden md:block"
                      priority={index === 0}
                    />
                  </>
                ) : (
                  <Image
                    src={slide.image}
                    alt={slide.type === "classic" ? slide.titlePrefix + slide.titleRest : "Kidoden Kids Collection"}
                    fill
                    className="object-cover object-right md:object-center"
                    priority={index === 0}
                  />
                )}
                {/* Soft top-to-bottom gradient overlay on mobile to enhance text readability on the top section only */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#fffbf9]/90 via-[#fffbf9]/30 to-transparent md:hidden" />
              </div>

              {/* Text Content Overlay (Aligned to top on mobile to avoid overlapping with kids) */}
              <div className="relative z-20 w-full md:max-w-8xl md:mx-auto px-6 h-full flex flex-col justify-start pt-10 md:justify-center md:pt-0 items-start text-left">
                <div
                  className={`w-[75%] sm:w-[80%] md:w-[60%] lg:w-[50%] transition-all duration-1000 ease-out delay-150 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {slide.type === "classic" ? (
                    // Slide 1 Layout (Original style, original colors, no overlay)
                    <>
                      <span className="text-brand-pink md:text-brand-navy/60 font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase mb-2 md:mb-4 block">
                        {slide.tagline}
                      </span>
                      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans text-brand-navy mb-2 md:mb-4 tracking-tight leading-[1.15] md:leading-[1.1]">
                        <span className="text-brand-pink">{slide.titlePrefix}</span>
                        {slide.titleRest}
                        <span className="block text-brand-navy/80 font-bold text-sm sm:text-2xl md:text-3xl mt-1 md:mt-2">
                          {slide.subtitle}
                        </span>
                      </h1>
                      <p className="hidden sm:block text-base md:text-lg text-brand-navy/80 mb-6 md:mb-8 leading-relaxed font-semibold max-w-xs sm:max-w-sm md:max-w-md mx-0">
                        {slide.description}
                      </p>
                    </>
                  ) : (
                    // Slide 2 Layout (Style For Kids custom layout, original colors, no overlay)
                    <>
                      <span className="text-brand-pink font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase mb-2 md:mb-3 block">
                        {slide.tagline}
                      </span>
                      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-sans text-brand-navy mb-3 md:mb-4 tracking-tight leading-[1.15] md:leading-[1.1] flex flex-wrap items-center justify-start gap-x-1.5 md:gap-x-2">
                        <span className="text-brand-pink font-dancing font-medium normal-case text-4xl sm:text-6xl md:text-7xl lg:text-8xl pr-0.5">
                          {slide.titlePrefix}
                        </span>
                        <span>{slide.titleRest}</span>
                      </h1>
                      
                      {/* Age group badge (original colors) */}
                      <div className="mb-3 md:mb-5">
                        <span className="inline-block bg-brand-pink/15 text-brand-pink border border-brand-pink/20 font-extrabold text-[10px] sm:text-xs md:text-sm px-4 py-1.5 md:px-5 md:py-2 rounded-full uppercase tracking-wider shadow-xs">
                          {slide.badge}
                        </span>
                      </div>

                      {/* Colored Bullets (hidden on mobile to keep layout clean) */}
                      <div className="hidden md:flex flex-wrap justify-start gap-x-4 gap-y-1.5 text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider mb-5 md:mb-7 select-none">
                        {slide.bullets?.map((bullet, idx) => (
                          <span
                            key={idx}
                            className={`flex items-center gap-1.5 ${bullet.colorClass}`}
                          >
                            <span
                              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${bullet.dotClass}`}
                            />
                            {bullet.text}
                          </span>
                        ))}
                      </div>

                      <p className="hidden sm:block text-base md:text-lg text-brand-navy/80 mb-6 md:mb-8 leading-relaxed font-semibold max-w-xs sm:max-w-sm md:max-w-md mx-0">
                        {slide.description}
                      </p>
                    </>
                  )}

                  <Link
                    href={slide.link}
                    className="inline-flex items-center justify-center px-5 py-2.5 sm:px-8 sm:py-4 text-[11px] sm:text-base font-bold text-white transition-all bg-brand-pink hover:bg-brand-navy rounded-full tracking-wide shadow-md hover:shadow-lg mt-1 md:mt-2"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide ? "bg-brand-pink w-6 shadow-sm" : "bg-brand-navy/20 hover:bg-brand-navy/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
