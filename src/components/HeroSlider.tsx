"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Soft, skin-friendly outfits",
    subtitle: "made for your little ones",
    description: "Crafted with soft fabrics, safe materials, and love — perfect for your child's comfort.",
    image: "/hero_slider/first-slider.png",
    cta: "Shop Now",
    link: "/shop",
    bgClass: "bg-[#fffbf9]" // Soft pinkish/warm white
  },
  {
    id: 2,
    title: "Magical Moments",
    subtitle: "Premium dresses & outfits",
    description: "Discover our new collection of beautifully crafted clothing for every special occasion.",
    image: "/hero_slider/second-slider.png",
    cta: "Explore Clothing",
    link: "/shop?category=clothing",
    bgClass: "bg-[#f8f9fa]" // Soft gray/white
  },
  {
    id: 3,
    title: "Sparkle & Shine",
    subtitle: "Safe, beautiful accessories",
    description: "From delicate jewellery to fun nail art, find the perfect accessories to complete their look.",
    image: "/toddlers/jewellery-v2.png",
    cta: "Shop Accessories",
    link: "/shop?category=jewellery",
    bgClass: "bg-[#fdf8f5]" // Soft peach
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[calc(100dvh-5rem)] overflow-hidden bg-white">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Full Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />

          {/* Smooth Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start text-left pt-20 md:pt-0">
            {/* Text Content directly on the gradient */}
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] py-8">
              <span className="text-brand-pink font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block drop-shadow-sm">
                Kidoden Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mb-4 tracking-tight leading-[1.1]">
                {slide.title}
                <span className="block text-brand-pink/90 font-medium text-2xl md:text-3xl mt-2">
                  {slide.subtitle}
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                {slide.description}
              </p>
              <Link
                href={slide.link}
                className="inline-flex items-center justify-center px-8 py-4 text-sm md:text-base font-bold text-white transition-all bg-brand-navy hover:bg-brand-pink rounded-full tracking-wide shadow-md"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
              ? "w-8 h-2 bg-brand-navy"
              : "w-2 h-2 bg-brand-navy/30 hover:bg-brand-navy/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
