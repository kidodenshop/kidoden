"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverable, setIsHoverable] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  // Check if device supports hover interactions AND is desktop size to restrict zoom robustly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkHover = () => {
        const hasHover = window.matchMedia("(hover: hover)").matches;
        const isDesktop = window.innerWidth >= 768;
        setIsHoverable(hasHover && isDesktop);
      };
      
      checkHover();
      window.addEventListener("resize", checkHover);
      return () => window.removeEventListener("resize", checkHover);
    }
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  const showNavigation = images.length > 1;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full items-start">
      <style>{`
        @keyframes galleryFadeIn {
          from {
            opacity: 0.5;
            transform: scale(0.99);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .gallery-fade-in {
          animation: galleryFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Thumbnails list */}
      {showNavigation && (
        <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto hide-scrollbar py-1 md:w-20 shrink-0 scroll-smooth snap-x">
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative aspect-[4/5] w-16 md:w-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 transform hover:scale-105 bg-gray-50 shadow-xs cursor-pointer snap-start ${
                  isActive
                    ? "border-brand-pink shadow-md scale-102"
                    : "border-transparent hover:border-brand-pink/40"
                }`}
                aria-label={`View image ${index + 1} of ${images.length}`}
              >
                <Image
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  sizes="(max-w-768px) 64px, 80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Viewport */}
      <div 
        onMouseMove={isHoverable ? handleMouseMove : undefined}
        onMouseLeave={isHoverable ? handleMouseLeave : undefined}
        className={`relative w-full md:w-[calc(100%-6rem)] aspect-[4/5] rounded-[3rem] overflow-hidden bg-gray-50 shadow-sm border border-gray-100 group ${
          isHoverable ? "cursor-zoom-in" : ""
        }`}
      >
        {/* Magnifying Glass Indicator (Desktop only) */}
        {isHoverable && (
          <div className="absolute top-12 right-12 z-10 bg-white text-brand-navy p-3 rounded-full shadow-lg pointer-events-none opacity-100 group-hover:opacity-0 transition-all duration-300 border border-gray-100/80 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        )}

        <div key={activeIndex} className="w-full h-full relative gallery-fade-in overflow-hidden">
          <Image
            src={images[activeIndex]}
            alt={name}
            fill
            sizes="(max-w-768px) 100vw, 40vw"
            priority={activeIndex === 0}
            className="object-cover transition-transform duration-75 ease-out"
            style={isHoverable ? zoomStyle : undefined}
          />
        </div>

        {/* Navigation arrows */}
        {showNavigation && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-brand-pink hover:text-white rounded-full shadow-lg flex items-center justify-center text-brand-navy transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 hover:scale-110 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-brand-pink hover:text-white rounded-full shadow-lg flex items-center justify-center text-brand-navy transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 hover:scale-110 cursor-pointer z-10"
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Counter indicator */}
        {showNavigation && (
          <div className="absolute bottom-12 right-12 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full select-none z-10">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}
