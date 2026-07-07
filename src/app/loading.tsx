import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex-grow min-h-[60vh] flex flex-col items-center justify-center bg-transparent select-none">
      <div className="flex flex-col items-center justify-center">
        {/* Bouncing Baby Image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 animate-bounce">
          <Image
            src="/loader/DODO_Baby.png"
            alt="Loading Baby"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Brand progress bar */}
        <div className="w-20 sm:w-24 bg-pink-100/50 h-1.5 rounded-full overflow-hidden relative mt-4">
          <div className="bg-brand-pink h-full w-full absolute left-0 top-0 origin-left animate-loading-bar rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
