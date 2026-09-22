"use client";

import { useState, useEffect } from "react";

const announcements = [
  { icon: "🚚", text: "Pan-India Express Shipping" },
  { icon: "💵", text: "Cash on Delivery (COD) Available" },
  { icon: "🔄", text: "Hassle-Free 7-Day Easy Returns" },
  { icon: "🛡️", text: "100% Safe & Secure Checkout" },
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % announcements.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [current, isPaused]);

  // Clean up outgoing item after transition completes (550ms)
  useEffect(() => {
    if (prev !== null) {
      const clearTimer = setTimeout(() => {
        setPrev(null);
      }, 550);
      return () => clearTimeout(clearTimer);
    }
  }, [prev]);

  const currentItem = announcements[current];
  const prevItem = prev !== null ? announcements[prev] : null;

  return (
    <div
      className="bg-brand-pink text-white h-[34px] overflow-hidden relative select-none flex items-center justify-center shadow-2xs z-40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Announcements"
    >
      {/* Outgoing item: slides up and fades out */}
      {prevItem && (
        <div
          key={`prev-${prev}`}
          className="absolute inset-0 flex items-center justify-center px-4 gap-2 text-center pointer-events-none animate-announcement-out"
        >
          <span className="text-xs sm:text-[13px] select-none" aria-hidden="true">
            {prevItem.icon}
          </span>
          <span className="text-xs sm:text-[13px] font-bold tracking-wide text-white whitespace-nowrap">
            {prevItem.text}
          </span>
        </div>
      )}

      {/* Incoming / active item: slides in from bottom to center */}
      <div
        key={`curr-${current}`}
        className={`absolute inset-0 flex items-center justify-center px-4 gap-2 text-center ${
          prev !== null ? "animate-announcement-in" : ""
        }`}
      >
        <span className="text-xs sm:text-[13px] select-none" aria-hidden="true">
          {currentItem.icon}
        </span>
        <span className="text-xs sm:text-[13px] font-bold tracking-wide text-white whitespace-nowrap">
          {currentItem.text}
        </span>
      </div>
    </div>
  );
}

