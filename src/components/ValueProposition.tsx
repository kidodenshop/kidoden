"use client";

import { useEffect, useRef } from "react";
import TitleDivider from "@/components/TitleDivider";

interface ValueItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const valueItems: ValueItem[] = [
  {
    id: "quality",
    title: "Premium Quality",
    desc: "Finest materials for lasting comfort.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a4263"
        strokeWidth="2"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: "safe",
    title: "Child Safe",
    desc: "Non-toxic, gentle on delicate skin.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a4263"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Modern Design",
    desc: "Thoughtfully crafted styles they'll love.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a4263"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

// Duplicate items for infinite seamless scroll on mobile
const duplicatedItems = [
  ...valueItems,
  ...valueItems,
  ...valueItems,
  ...valueItems,
];

export default function ValueProposition() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start with offset into the second set so backward touch swipes work seamlessly
    const oneSetWidth = el.scrollWidth / 4;
    el.scrollLeft = oneSetWidth;

    let rafId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPausedRef.current && el) {
        // Smooth continuous scroll (~26px per sec)
        el.scrollLeft += (26 * delta) / 1000;

        const setWidth = el.scrollWidth / 4;
        if (setWidth > 0) {
          if (el.scrollLeft >= setWidth * 2) {
            el.scrollLeft -= setWidth;
          } else if (el.scrollLeft <= 5) {
            el.scrollLeft += setWidth;
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleTouchStart = () => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">
          Quality without compromise.
        </h2>
        <TitleDivider className="mb-4 md:mb-6" />
        <p className="text-sm sm:text-base md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-medium mb-8 md:mb-16 px-2">
          At Kidoden, we believe every child deserves the best. From soft,
          breathable fabrics to thoughtful designs, every piece is carefully
          selected.
        </p>

        {/* Desktop 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {valueItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#fafafa] rounded-full flex items-center justify-center mb-6 shadow-xs border border-gray-100">
                {item.icon}
              </div>
              <h4 className="font-bold text-xl text-brand-navy mb-2">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile Auto-Scrolling Horizontal Carousel */}
        <div className="block md:hidden relative w-full overflow-hidden -mx-4 px-2">
          {/* Edge gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={scrollRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-3.5 overflow-x-auto hide-scrollbar px-4 py-2 cursor-grab active:cursor-grabbing select-none"
          >
            {duplicatedItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[210px] shrink-0 bg-[#fffdfa] rounded-2xl p-4 text-center border border-gray-100/90 shadow-xs flex flex-col items-center justify-center transition-transform active:scale-95"
              >
                <div className="w-12 h-12 rounded-full bg-[#fafafa] flex items-center justify-center mb-2.5 shadow-xs border border-gray-100/80">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm text-brand-navy mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
