"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/shop?category=clothing", label: "Clothing", emoji: "👗", hover: "hover:bg-brand-mint/10 hover:text-brand-mint" },
  { href: "/shop?category=jewellery", label: "Jewellery", emoji: "💎", hover: "hover:bg-brand-yellow/10 hover:text-brand-yellow" },
  { href: "/shop?category=nails", label: "Nails", emoji: "💅", hover: "hover:bg-brand-purple/10 hover:text-brand-purple" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 -mr-1 text-brand-navy hover:text-brand-pink transition-colors"
        aria-label="Open navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <span className="font-extrabold text-brand-navy text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 -mr-1 text-brand-navy hover:text-brand-pink transition-colors"
            aria-label="Close navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2">
            Shop by Category
          </p>
          {links.map(({ href, label, emoji, hover }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-brand-navy transition-colors ${hover}`}
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div className="px-6 pb-8">
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="block text-center bg-brand-navy text-white font-extrabold py-3.5 px-6 rounded-full hover:bg-brand-pink transition-colors"
          >
            Shop All
          </Link>
        </div>
      </div>
    </>
  );
}
