"use client";

import { useState, useRef } from "react";
import TitleDivider from "@/components/TitleDivider";
import { TestimonialItem, fallbackTestimonials } from "@/types/testimonials";

// Reusable 5-star rating SVG component
const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-200 fill-current"}`}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Quote mark icon
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
  </svg>
);

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export default function TestimonialsSection({
  testimonials: initialTestimonials,
}: TestimonialsSectionProps = {}) {
  // Mobile slider state
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Desktop slider state
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [desktopIndex, setDesktopIndex] = useState(0);

  const testimonials =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : fallbackTestimonials;

  const totalDesktopPages = Math.ceil(testimonials.length / 3);

  // Mobile scroll tracking
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      setMobileIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
    }
  };

  const scrollToMobileSlide = (index: number) => {
    if (!mobileScrollRef.current) return;
    const clientWidth = mobileScrollRef.current.clientWidth;
    mobileScrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
    setMobileIndex(index);
  };

  // Desktop scroll tracking
  const handleDesktopScroll = () => {
    if (!desktopScrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = desktopScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 5) {
      setDesktopIndex(0);
      return;
    }
    const page = Math.round((scrollLeft / maxScroll) * (totalDesktopPages - 1));
    setDesktopIndex(Math.min(Math.max(page, 0), totalDesktopPages - 1));
  };

  const scrollToDesktopSlide = (pageIndex: number) => {
    if (!desktopScrollRef.current) return;
    const clientWidth = desktopScrollRef.current.clientWidth;
    desktopScrollRef.current.scrollTo({
      left: pageIndex * clientWidth,
      behavior: "smooth",
    });
    setDesktopIndex(pageIndex);
  };

  const slideDesktop = (direction: "left" | "right") => {
    if (!desktopScrollRef.current) return;
    const clientWidth = desktopScrollRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    desktopScrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] text-[#69859A] uppercase mb-2">
            LOVED BY 100+ HAPPY FAMILIES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4263] tracking-tight">
            What Parents Say About Kidoden
          </h2>
          <TitleDivider />
        </div>

        {/* Desktop View: 3 cards visible, smooth carousel slider if > 3 */}
        <div className="hidden md:block relative group">
          {totalDesktopPages > 1 && (
            <>
              {/* Previous Arrow Button */}
              <button
                onClick={() => slideDesktop("left")}
                disabled={desktopIndex === 0}
                aria-label="Previous testimonials"
                className={`absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#EFE7DE] flex items-center justify-center text-brand-navy hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-all duration-200 cursor-pointer ${
                  desktopIndex === 0
                    ? "opacity-0 pointer-events-none"
                    : "opacity-90 hover:opacity-100"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Next Arrow Button */}
              <button
                onClick={() => slideDesktop("right")}
                disabled={desktopIndex >= totalDesktopPages - 1}
                aria-label="Next testimonials"
                className={`absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#EFE7DE] flex items-center justify-center text-brand-navy hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-all duration-200 cursor-pointer ${
                  desktopIndex >= totalDesktopPages - 1
                    ? "opacity-0 pointer-events-none"
                    : "opacity-90 hover:opacity-100"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Cards Track */}
          <div
            ref={desktopScrollRef}
            onScroll={handleDesktopScroll}
            className="flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4rem)/3)] shrink-0 snap-start bg-[#FAF8F5] rounded-[2rem] p-7 lg:p-8 border border-[#EFE7DE] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(26,66,99,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between self-stretch"
              >
                <div>
                  {/* Header: Quote Icon & 5 Stars */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-2xs border border-pink-100/60">
                      <QuoteIcon className="w-4 h-4" />
                    </span>
                    <StarRating rating={item.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-sm lg:text-[15px] leading-relaxed mb-6 font-normal">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Author Section */}
                <div className="pt-5 border-t border-[#EAE1D5]/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full ${item.avatarBg} ${item.avatarColor} font-black text-xs flex items-center justify-center shadow-2xs`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm text-[#1a4263] leading-snug truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium truncate">
                        {item.context && item.location
                          ? `${item.context} • ${item.location}`
                          : item.context || item.location || "Verified Parent"}
                      </p>
                    </div>
                  </div>

                  {/* Verified Parent Badge */}
                  <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/80">
                    <svg
                      className="w-3 h-3 text-emerald-500 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Pagination Dots (if more than 3 cards) */}
          {totalDesktopPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalDesktopPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToDesktopSlide(idx)}
                  aria-label={`Go to slide group ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === desktopIndex
                      ? "w-7 bg-brand-pink"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Horizontal Swipeable Carousel */}
        <div className="block md:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-4 px-4 pb-2"
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-[88vw] max-w-[340px] shrink-0 snap-center bg-[#FAF8F5] rounded-3xl p-6 border border-[#EFE7DE] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between"
              >
                <div>
                  {/* Quote Icon & 5 Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-2xs border border-pink-100/60">
                      <QuoteIcon className="w-3.5 h-3.5" />
                    </span>
                    <StarRating rating={item.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#EAE1D5]/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 shrink-0 rounded-full ${item.avatarBg} ${item.avatarColor} font-black text-xs flex items-center justify-center shadow-2xs`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#1a4263] leading-tight truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium truncate">
                        {item.context && item.location
                          ? `${item.context} • ${item.location}`
                          : item.context || item.location || "Verified Parent"}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/80">
                    <svg
                      className="w-2.5 h-2.5 text-emerald-500 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileSlide(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === mobileIndex
                    ? "w-6 bg-brand-pink"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
