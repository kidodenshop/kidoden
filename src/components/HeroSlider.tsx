"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const slides = [
  {
    type: "classic",
    image: "/hero_slider/hero-banner.png",
    mobileImage: "/hero_slider/mobile-1st-slider.png",
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
                      className={`object-cover md:hidden ${slide.type === "classic" ? "object-bottom" : "object-center"}`}
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
              </div>

              {/* Decorative hand-drawn styled hearts for Slide 1 only */}
              {slide.type === "classic" && (
                <>
                  {/* Heart 1: Top Left empty area */}
                  <div className="absolute top-[18%] left-[8%] z-20 text-brand-pink/60 animate-pulse select-none pointer-events-none">
                    <HeartIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  {/* Heart 2: Middle Right empty area */}
                  <div className="absolute top-[28%] right-[12%] z-20 text-brand-pink/50 animate-pulse select-none pointer-events-none">
                    <HeartIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  {/* Heart 3: Soft small heart near top right */}
                  <div className="absolute top-[12%] right-[25%] z-20 text-brand-pink/40 animate-pulse select-none pointer-events-none">
                    <HeartIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                </>
              )}

              {/* Text Content Overlay (Slide-specific vertical alignment on mobile) */}
              <div className={`relative z-20 w-full md:max-w-8xl md:mx-auto px-6 h-full flex flex-col items-start text-left ${
                slide.type === "classic" 
                  ? "justify-end pb-14 md:justify-center md:pb-0" 
                  : "justify-start pt-10 md:justify-center md:pt-0"
              }`}>
                <div
                  className={`w-[85%] sm:w-[80%] md:w-[60%] lg:w-[50%] transition-all duration-1000 ease-out delay-150 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {slide.type === "classic" ? (
                    // Slide 1 Layout (Original style, original colors, no overlay)
                    <>
                      <span className="text-brand-pink md:text-brand-navy/60 font-bold tracking-[0.2em] text-[11px] sm:text-xs md:text-sm uppercase mb-2 md:mb-3 block">
                        {slide.tagline}
                      </span>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans text-brand-navy mb-3 md:mb-4 tracking-tight leading-[1.15] md:leading-[1.1]">
                        <span className="text-brand-pink">{slide.titlePrefix}</span>
                        {slide.titleRest}
                        <span className="block text-brand-navy/80 font-bold text-base sm:text-xl md:text-2xl mt-2 md:mt-2">
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
              idx === currentSlide ? "bg-white w-6 shadow-sm" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
