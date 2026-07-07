"use client";

import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import SearchInput from "@/components/SearchInput";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-pink text-white text-center py-2.5 px-4 text-xs sm:text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 select-none shadow-xs">
        ✨ We are live now! ✨
      </div>
      
      <header className="sticky top-0 z-50 bg-white md:bg-white/80 md:backdrop-blur-md border-b border-brand-mint/20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Left: Hamburger */}
          <div className="flex-1 md:hidden flex items-center justify-start">
            <MobileMenu />
          </div>

          {/* Logo & Desktop Nav Links (Left Group) */}
          <div className="flex items-center justify-start md:flex-1">
            <Link href="/" className="flex items-center group">
              <div className="relative w-36 h-16 sm:w-44 sm:h-20 md:-ml-2 group-hover:scale-105 transition-transform">
                <Image src="/brand_logo-new.png" alt="Kidoden Logo" fill className="object-contain object-center md:object-left" priority />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex gap-8 items-center ml-8 lg:ml-12">
              {/* All Categories Mega Menu */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-brand-navy hover:text-brand-pink font-bold transition-colors py-4">
                  All Categories
                  <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                
                {/* Mega Menu Dropdown Container */}
                <div className="absolute top-full -left-24 mt-2 w-[720px] bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-3 group-hover:translate-y-0 grid grid-cols-4 gap-6">
                  
                  {/* Column 1: Shop by Age */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1 select-none">
                      Shop by Age
                    </h4>
                    <div className="flex flex-col gap-2">
                      <Link href="/shop?category=clothing&age=0-1" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">0–1 Year</Link>
                      <Link href="/shop?category=clothing&age=1-3" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">1–3 Years</Link>
                      <Link href="/shop?category=clothing&age=3-5" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">3–5 Years</Link>
                      <Link href="/shop?category=clothing&age=5-7" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">5–7 Years</Link>
                      <Link href="/shop?category=clothing&age=7-12" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">7–12 Years</Link>
                    </div>
                  </div>

                  {/* Column 2: Collections */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1 select-none">
                      Collections
                    </h4>
                    <div className="flex flex-col gap-2">
                      <Link href="/shop?collection=new-arrivals" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">New Arrivals</Link>
                      <Link href="/shop?collection=best-sellers" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Best Sellers</Link>
                      <Link href="/shop?collection=premium-picks" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Premium Picks</Link>
                    </div>
                  </div>

                  {/* Column 3: Gifting */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1 select-none">
                      Gifting
                    </h4>
                    <div className="flex flex-col gap-2">
                      <Link href="/shop?category=gifting&giftType=gift-boxes" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Gift Boxes</Link>
                      <Link href="/shop?category=gifting&giftType=birthday-gifts" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Birthday Gifts</Link>
                      <Link href="/shop?category=gifting&giftType=baby-shower-gifts" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Baby Shower Gifts</Link>
                    </div>
                  </div>

                  {/* Column 4: Featured */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1 select-none">
                      Featured
                    </h4>
                    <div className="flex flex-col gap-2">
                      <Link href="/shop?category=clothing&collection=summer-collection" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Summer Collection</Link>
                      <Link href="/shop?category=clothing&collection=matching-outfits" className="text-sm font-bold text-brand-navy hover:text-brand-pink transition-colors">Matching Outfits</Link>
                    </div>
                  </div>

                </div>
              </div>
              <Link href="/shop?category=clothing" className="text-brand-navy hover:text-brand-mint font-bold transition-colors">Clothing</Link>
              <Link href="/shop?category=gifting" className="text-brand-navy hover:text-brand-pink font-bold transition-colors">Gifting</Link>
              <Link href="/contact" className="text-brand-navy hover:text-brand-pink font-bold transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Mobile Right: Cart & Search */}
          <div className="flex-1 md:hidden flex items-center justify-end">
            <SearchInput />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-navy"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2" /><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z" /></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-brand-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Right Actions: Search & Cart */}
          <div className="hidden md:flex items-center gap-4">
            <SearchInput />

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-navy hover:text-brand-pink transition-colors group"
              aria-label="Open cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2" /><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z" /></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-brand-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
