"use client";

import { useState } from "react";

interface ProductAccordionsProps {
  features: string[];
  category: string;
  ageRange?: string;
}

export default function ProductAccordions({
  features,
  category,
  ageRange,
}: ProductAccordionsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    features: true, // Default open the features list
    shipping: false,
    returns: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const headerClass =
    "flex justify-between items-center w-full py-4 text-left font-black text-brand-navy uppercase tracking-wider text-xs md:text-sm cursor-pointer select-none group transition-colors hover:text-brand-pink border-t border-gray-200/60";

  return (
    <div className="w-full flex flex-col mt-4 border-b border-gray-200/60">
      {/* 1. Why You'll Love It (Features) */}
      {features && features.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection("features")}
            className={headerClass}
            aria-expanded={openSections.features}
          >
            <span>Why you'll love it</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                openSections.features ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openSections.features ? "max-h-96 opacity-100 mb-5" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-brand-yellow/10 p-5 rounded-2xl border border-brand-yellow/20">
              <ul className="space-y-2.5">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-medium text-xs md:text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                    {feature}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-gray-700 font-medium text-xs md:text-sm pt-1.5">
                  <span className="font-bold text-brand-navy">Age Range:</span>{" "}
                  {category === "clothing" && ageRange ? ageRange : "All ages"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}


      {/* 3. Shipping & COD Policy */}
      <div>
        <button
          onClick={() => toggleSection("shipping")}
          className={headerClass}
          aria-expanded={openSections.shipping}
        >
          <span>Shipping & COD Policy</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              openSections.shipping ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections.shipping ? "max-h-96 opacity-100 mb-5" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { icon: "⚡", title: "Fast Reply", sub: "We're always a message away" },
              { icon: "🚚", title: "Ships Across India", sub: "Delivered to your door" },
              { icon: "🛡️", title: "100% Genuine", sub: "Carefully chosen for little ones" },
              { icon: "💵", title: "No Advance Payment", sub: "Pay cash only on delivery" },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                className="flex items-start gap-2.5 bg-white border border-gray-100 rounded-xl p-3 shadow-xs"
              >
                <span className="text-base leading-none mt-0.5">{icon}</span>
                <div>
                  <p className="text-xs font-extrabold text-brand-navy leading-tight">{title}</p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Returns & Exchange Policy */}
      <div>
        <button
          onClick={() => toggleSection("returns")}
          className={headerClass}
          aria-expanded={openSections.returns}
        >
          <span>Easy Returns & Exchange</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              openSections.returns ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections.returns ? "max-h-96 opacity-100 mb-5" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 bg-brand-pink/10 border border-brand-pink/25 rounded-2xl p-4">
            <span className="text-2xl flex-shrink-0">↩️</span>
            <div>
              <p className="font-extrabold text-brand-navy text-xs md:text-sm">2-Day Easy Returns</p>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5 leading-relaxed">
                Not happy? Contact us within 2 days of delivery and we&apos;ll make it right — no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
