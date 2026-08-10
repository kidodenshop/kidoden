"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    type: "classic",
    image: "/hero_slider/hero-banner.png",
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
    tagline: "TREND ON",
    titlePrefix: "style",
    titleRest: " for kids",
    badge: "2 to 12 years",
    bullets: [
      { text: "Trendy Looks", color: "#1a4263", dotColor: "#1a4263" },
      { text: "Every Age", color: "#f0959f", dotColor: "#f0959f" },
      { text: "Every Occasion", color: "#4E9F8E", dotColor: "#4E9F8E" },
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

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[60vh] lg:h-[65vh] xl:h-[75vh] overflow-hidden bg-[#fffbf9] select-none group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0 scale-100 z-10"
                  : "opacity-0 translate-x-4 scale-98 z-0 pointer-events-none"
              }`}
            >
              {/* Responsive Image Wrapper */}
              <div className="relative w-full h-[40vh] md:absolute md:inset-0 md:h-full">
                <Image
                  src={slide.image}
                  alt={slide.type === "classic" ? slide.titlePrefix + slide.titleRest : "Kidoden Kids Collection"}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
                {/* Subtle overlay to enhance text readability on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent md:hidden" />
              </div>

              {/* Text Content Container */}
              <div className="relative z-20 w-full md:max-w-8xl md:mx-auto px-6 py-8 md:px-8 md:py-0 h-auto md:h-full flex flex-col justify-center items-center md:items-start text-center md:text-left bg-[#fffbf9] md:bg-transparent">
                <div className="w-full sm:w-[85%] md:w-[60%] lg:w-[50%] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                  {slide.type === "classic" ? (
                    // Slide 1 Layout (Original style)
                    <>
                      <span className="text-brand-pink md:text-brand-navy/60 font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase mb-2 sm:mb-4 block">
                        {slide.tagline}
                      </span>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mb-2 sm:mb-4 tracking-tight leading-[1.1]">
                        <span className="text-brand-pink">{slide.titlePrefix}</span>
                        {slide.titleRest}
                        <span className="block text-brand-navy/80 font-bold text-lg sm:text-2xl md:text-3xl mt-1 sm:mt-2">
                          {slide.subtitle}
                        </span>
                      </h1>
                      <p className="hidden sm:block text-base md:text-lg text-brand-navy/80 mb-6 sm:mb-8 leading-relaxed font-semibold max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
                        {slide.description}
                      </p>
                    </>
                  ) : (
                    // Slide 2 Layout (Style For Kids custom layout)
                    <>
                      <span className="text-brand-pink font-bold tracking-[0.2em] text-xs sm:text-sm uppercase mb-2 sm:mb-3 block">
                        {slide.tagline}
                      </span>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-navy mb-4 tracking-tight leading-[1.1]">
                        <span className="text-brand-pink italic font-serif lowercase pr-1">{slide.titlePrefix}</span>
                        {slide.titleRest}
                      </h1>
                      
                      {/* Age group badge */}
                      <div className="mb-4 sm:mb-5">
                        <span className="inline-block bg-brand-pink/15 text-brand-pink border border-brand-pink/20 font-extrabold text-xs sm:text-sm px-5 py-2 rounded-full uppercase tracking-wider shadow-xs">
                          {slide.badge}
                        </span>
                      </div>

                      {/* Colored Bullets */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6 sm:mb-7 select-none">
                        {slide.bullets?.map((bullet, idx) => (
                          <span
                            key={idx}
                            style={{ color: bullet.color }}
                            className="flex items-center gap-2"
                          >
                            <span
                              style={{ backgroundColor: bullet.dotColor }}
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                            />
                            {bullet.text}
                          </span>
                        ))}
                      </div>

                      <p className="hidden sm:block text-base md:text-lg text-brand-navy/80 mb-6 sm:mb-8 leading-relaxed font-semibold max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
                        {slide.description}
                      </p>
                    </>
                  )}

                  <Link
                    href={slide.link}
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-base font-bold text-white transition-all bg-brand-pink hover:bg-brand-navy rounded-full tracking-wide shadow-md hover:shadow-lg mt-2"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Visible on hover on desktop, hidden on mobile) */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/70 backdrop-blur-xs border border-gray-100 hover:bg-brand-pink hover:text-white items-center justify-center text-brand-navy shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/70 backdrop-blur-xs border border-gray-100 hover:bg-brand-pink hover:text-white items-center justify-center text-brand-navy shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

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
