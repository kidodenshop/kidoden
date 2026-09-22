"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TitleDivider from "@/components/TitleDivider";

interface TrustItem {
  id: string;
  title: string;
  icon: string;
  alt: string;
  bgColor: string;
  borderColor: string;
  circleBg: string;
}

const trustItems: TrustItem[] = [
  {
    id: "skin",
    title: "Gentle on delicate skin",
    icon: "/baby_face.png",
    alt: "Baby face",
    bgColor: "bg-pink-50/90",
    borderColor: "border-pink-100",
    circleBg: "bg-pink-100",
  },
  {
    id: "delivery",
    title: "Safe & quick delivery",
    icon: "/truck.png",
    alt: "Delivery truck",
    bgColor: "bg-emerald-50/90",
    borderColor: "border-emerald-100",
    circleBg: "bg-blue-50",
  },
  {
    id: "cod",
    title: "Pay easily with COD",
    icon: "/cash_on_delivery.png",
    alt: "Cash on delivery",
    bgColor: "bg-amber-50/90",
    borderColor: "border-amber-100",
    circleBg: "bg-amber-100",
  },
  {
    id: "returns",
    title: "Hassle-free returns",
    icon: "/return.png",
    alt: "Easy returns",
    bgColor: "bg-violet-50/90",
    borderColor: "border-violet-100",
    circleBg: "bg-purple-100",
  },
  {
    id: "love",
    title: "Made with love",
    icon: "/make_love.png",
    alt: "Made with love",
    bgColor: "bg-rose-50/90",
    borderColor: "border-rose-100",
    circleBg: "bg-rose-100",
  },
];

// Duplicate items for infinite seamless scroll
const duplicatedItems = [
  ...trustItems,
  ...trustItems,
  ...trustItems,
  ...trustItems,
];

export default function MobileTrustSection() {
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
        // ~28px per second smooth scroll
        el.scrollLeft += (28 * delta) / 1000;

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
    <section className="block md:hidden py-6 px-4 bg-white text-center relative overflow-hidden">
      <h2 className="text-2xl font-extrabold text-brand-navy tracking-tight mb-1">
        Why Parents Trust Kidoden
      </h2>
      <TitleDivider className="mt-1.5 mb-2" />
      <p className="text-xs text-gray-500 mb-4">
        Loved by 100+ families across India
      </p>

      {/* Auto Horizontal Scroll Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-3 overflow-x-auto hide-scrollbar px-3 py-1 cursor-grab active:cursor-grabbing select-none"
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`w-[136px] shrink-0 ${item.bgColor} rounded-2xl p-3.5 text-center border ${item.borderColor} flex flex-col items-center justify-center transition-transform active:scale-95`}
            >
              <div
                className={`w-12 h-12 rounded-full ${item.circleBg} flex items-center justify-center mb-2 shadow-xs`}
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={36}
                  height={36}
                  className="w-7 h-7 object-contain"
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-xs text-brand-navy leading-snug line-clamp-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
