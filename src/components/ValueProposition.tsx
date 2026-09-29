"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TitleDivider from "@/components/TitleDivider";

interface ValueItem {
  id: string;
  title: string;
  desc: string;
  badgeBg: string;
  badgeBorder: string;
  iconColor: string;
  icon: React.ReactNode;
}

const valueItems: ValueItem[] = [
  {
    id: "quality",
    title: "Premium Quality",
    desc: "100% gentle organic cotton for lasting all-day comfort.",
    badgeBg: "bg-amber-50",
    badgeBorder: "border-amber-200/70",
    iconColor: "text-amber-700",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        {/* Soft cotton boll / delicate fabric */}
        <path d="M12 2a4 4 0 0 0-4 4c0 .4.06.78.17 1.14A4 4 0 0 0 5 11a4 4 0 0 0 2.5 3.71A4 4 0 0 0 11 18h2a4 4 0 0 0 3.5-3.29A4 4 0 0 0 19 11a4 4 0 0 0-3.17-3.86c.11-.36.17-.74.17-1.14a4 4 0 0 0-4-4z" />
        <path d="M12 18v4" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    id: "safe",
    title: "Child Safe & Pure",
    desc: "Non-toxic, hypoallergenic dyes gentle on delicate skin.",
    badgeBg: "bg-rose-50",
    badgeBorder: "border-pink-200/70",
    iconColor: "text-brand-pink",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        {/* Shield with heart */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path
          d="M12 8.5c-.8-1-2.2-1-3 0a2.2 2.2 0 0 0 0 3.1l3 3.1 3-3.1a2.2 2.2 0 0 0 0-3.1c-.8-1-2.2-1-3 0z"
          fill="currentColor"
          fillOpacity="0.25"
        />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Playful Modern Design",
    desc: "Thoughtfully crafted styles your little explorer will adore.",
    badgeBg: "bg-sky-50",
    badgeBorder: "border-sky-200/70",
    iconColor: "text-[#1a4263]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        {/* Twinkling magic stars */}
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
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
  const isInteractingRef = useRef(false);
  const currentPosRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start with offset into the second set so backward touch swipes work seamlessly
    const initPosition = () => {
      if (!el) return;
      const setWidth =
        el.scrollWidth > 0 ? el.scrollWidth / 4 : valueItems.length * 240;
      if (setWidth > 0 && currentPosRef.current === 0) {
        currentPosRef.current = setWidth;
        el.scrollLeft = setWidth;
      }
    };

    initPosition();
    const t = setTimeout(initPosition, 150);

    let rafId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 100);
      lastTime = time;

      if (!isPausedRef.current && !isInteractingRef.current && el) {
        // Continuous auto-sliding at ~30px per sec
        currentPosRef.current += (30 * delta) / 1000;

        const setWidth =
          el.scrollWidth > 0 ? el.scrollWidth / 4 : valueItems.length * 240;
        if (setWidth > 0) {
          if (currentPosRef.current >= setWidth * 2) {
            currentPosRef.current -= setWidth;
          } else if (currentPosRef.current <= 5) {
            currentPosRef.current += setWidth;
          }
        }

        el.scrollLeft = currentPosRef.current;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleInteractionStart = () => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (scrollRef.current) {
        currentPosRef.current = scrollRef.current.scrollLeft;
      }
      isInteractingRef.current = false;
    }, 1800);
  };

  const handleScroll = () => {
    if (isInteractingRef.current && scrollRef.current) {
      currentPosRef.current = scrollRef.current.scrollLeft;
    }
  };

  return (
    <section className="relative py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FDFBF7] via-[#FAF5EE] to-[#FBF6F0] border-t border-b border-[#EFE5D8]/70 overflow-hidden">
      {/* Decorative Pastel Background Cloud - Top Left */}
      <div className="absolute -top-10 -left-10 w-48 sm:w-72 md:w-96 h-auto pointer-events-none select-none z-0 opacity-45">
        <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 140c-25 0-45-20-45-45s20-45 45-45c5-25 28-44 55-44 24 0 45 15 53 36 8-5 18-8 29-8 28 0 50 22 50 50 22 4 38 23 38 46 0 26-21 47-47 47H50z"
            fill="#F6E7DC"
          />
        </svg>
      </div>

      {/* Decorative Pastel Background Cloud - Bottom Right */}
      <div className="absolute -bottom-10 -right-10 w-48 sm:w-72 md:w-96 h-auto pointer-events-none select-none z-0 opacity-40">
        <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 140c-25 0-45-20-45-45s20-45 45-45c5-25 28-44 55-44 24 0 45 15 53 36 8-5 18-8 29-8 28 0 50 22 50 50 22 4 38 23 38 46 0 26-21 47-47 47H60z"
            fill="#E5ECE7"
          />
        </svg>
      </div>

      {/* Playful Floating Pastel Stars/Sparkles in Margins */}
      <div className="hidden lg:block absolute left-12 top-1/3 pointer-events-none select-none opacity-40">
        <svg className="w-6 h-6 text-[#EAA9B8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 0 2.5 7.5L22 10l-6 5 2 8-6-4.5L6 23l2-8-6-5 7.5-2.5L12 0z" />
        </svg>
      </div>
      <div className="hidden lg:block absolute right-14 top-1/4 pointer-events-none select-none opacity-35">
        <svg className="w-5 h-5 text-[#F2C58A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 0 2.5 7.5L22 10l-6 5 2 8-6-4.5L6 23l2-8-6-5 7.5-2.5L12 0z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Playful Category Tag */}
        <p className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] text-[#69859A] uppercase mb-2">
          CRAFTED WITH CARE FOR LITTLE ONES
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-2">
          Quality without compromise.
        </h2>
        <TitleDivider className="mb-4 md:mb-5" />
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-normal mb-3 px-2">
          At Kidoden, we believe every child deserves the best. From soft,
          breathable fabrics to thoughtful designs, every piece is carefully
          selected for comfort, safety, and pure joy.
        </p>
        <div className="mb-10 md:mb-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-pink hover:text-brand-navy transition-colors bg-white/70 hover:bg-white px-4 py-1.5 rounded-full border border-pink-100 shadow-2xs"
          >
            <span>Learn more about the Kidoden story</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Desktop 3-Card Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {valueItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 rounded-[2rem] p-7 lg:p-8 border border-[#EFE7DE] shadow-[0_4px_24px_rgba(26,66,99,0.03)] hover:shadow-[0_16px_36px_rgba(26,66,99,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.badgeBg} ${item.badgeBorder} border ${item.iconColor} flex items-center justify-center mb-5 shadow-2xs transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>
              <h4 className="font-extrabold text-lg text-[#1a4263] mb-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Auto-Scrolling Horizontal Carousel */}
        <div className="block md:hidden relative w-full overflow-hidden -mx-4 px-2">
          {/* Edge gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#FDFBF7] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#FBF6F0] to-transparent" />

          <div
            ref={scrollRef}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onPointerDown={handleInteractionStart}
            onPointerUp={handleInteractionEnd}
            onPointerCancel={handleInteractionEnd}
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
            }}
            onScroll={handleScroll}
            style={{ scrollBehavior: "auto" }}
            className="flex gap-3.5 overflow-x-auto hide-scrollbar px-4 py-2 cursor-grab active:cursor-grabbing select-none"
          >
            {duplicatedItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[230px] shrink-0 bg-white/95 rounded-2xl p-5 text-center border border-[#EFE7DE] shadow-xs flex flex-col items-center justify-center transition-transform active:scale-95"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.badgeBg} ${item.badgeBorder} border ${item.iconColor} flex items-center justify-center mb-3 shadow-2xs`}
                >
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm text-[#1a4263] mb-1.5 leading-snug">
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
