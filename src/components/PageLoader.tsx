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
      <div className="flex flex-col items-center space-y-8 animate-float">
        {/* Logo Container */}
        <div className="relative w-48 h-16 md:w-56 md:h-20 flex items-center justify-center">
          <Image
            src="/logo/Kidoden-logo.png"
            alt="Kidoden Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Playful Brand Loader Animation */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-brand-pink animate-bounce [animation-delay:-0.3s]" />
          <div className="w-4 h-4 rounded-full bg-brand-yellow animate-bounce [animation-delay:-0.15s]" />
          <div className="w-4 h-4 rounded-full bg-brand-mint animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-brand-navy animate-bounce [animation-delay:0.15s]" />
        </div>

        <p className="text-brand-navy font-bold tracking-widest text-[10px] sm:text-xs uppercase animate-pulse">
          Made with love...
        </p>
      </div>
    </div>
  );
}
