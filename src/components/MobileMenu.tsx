"use client";

import { useState } from "react";
import Link from "next/link";

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
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
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
        <nav className="flex-1 px-4 py-6 flex flex-col gap-6 overflow-y-auto">
          {/* Section 1: Shop by Age */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
              Shop by Age
            </p>
            <div className="flex flex-col gap-1">
              <Link href="/shop?category=clothing&age=0-1" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">0–1 Year</Link>
              <Link href="/shop?category=clothing&age=1-3" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">1–3 Years</Link>
              <Link href="/shop?category=clothing&age=3-5" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">3–5 Years</Link>
              <Link href="/shop?category=clothing&age=5-7" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">5–7 Years</Link>
              <Link href="/shop?category=clothing&age=7-12" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">7–12 Years</Link>
            </div>
          </div>

          {/* Section 2: Collections */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
              Collections
            </p>
            <div className="flex flex-col gap-1">
              <Link href="/shop?collection=new-arrivals" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">New Arrivals</Link>
              <Link href="/shop?collection=best-sellers" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Best Sellers</Link>
              <Link href="/shop?collection=premium-picks" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Premium Picks</Link>
            </div>
          </div>

          {/* Section 3: Gifting */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
              Gifting
            </p>
            <div className="flex flex-col gap-1">
              <Link href="/shop?category=gifting&giftType=gift-boxes" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Gift Boxes</Link>
              <Link href="/shop?category=gifting&giftType=birthday-gifts" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Birthday Gifts</Link>
              <Link href="/shop?category=gifting&giftType=baby-shower-gifts" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Baby Shower Gifts</Link>
            </div>
          </div>

          {/* Section 4: Featured */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
              Featured
            </p>
            <div className="flex flex-col gap-1">
              <Link href="/shop?category=clothing&collection=summer-collection" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Summer Collection</Link>
              <Link href="/shop?category=clothing&collection=matching-outfits" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors">Matching Outfits</Link>
            </div>
          </div>
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
