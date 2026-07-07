import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex-grow min-h-[60vh] flex flex-col items-center justify-center bg-[#fffbf9]">
      <div className="flex flex-col items-center space-y-6">
        {/* Elegant pulsing logo-like outline or spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-brand-pink/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-brand-pink border-r-transparent border-b-brand-pink border-l-transparent animate-spin"></div>
          <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink text-sm font-black select-none">
            K
          </div>
        </div>
        <p className="text-gray-400 font-bold tracking-wider text-[10px] sm:text-xs uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
