"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Show for at least 1.2s to make transition feel smooth and premium
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Completely unmount after fade-out transition finishes (300ms)
    const renderTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(renderTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fffbf9] transition-opacity duration-300 ease-out select-none ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Bouncing Baby Image */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 animate-bounce">
          <Image
            src="/loader/DODO_Baby.png"
            alt="Loading Baby"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Brand progress bar */}
        <div className="w-28 sm:w-32 bg-pink-100/50 h-1.5 rounded-full overflow-hidden relative mt-6">
          <div className="bg-brand-pink h-full w-full absolute left-0 top-0 origin-left animate-loading-bar rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
