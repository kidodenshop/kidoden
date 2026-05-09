"use client";

import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import SearchInput from "@/components/SearchInput";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white md:bg-white/80 md:backdrop-blur-md border-b border-brand-mint/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pl-0 lg:pl-0">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Left: Hamburger */}
          <div className="flex-1 md:hidden flex items-center justify-start">
            <MobileMenu />
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="flex items-center group">
              <div className="relative w-36 h-16 sm:w-44 sm:h-20 md:-ml-2 group-hover:scale-105 transition-transform">
                <Image src="/brand_logo-new.png" alt="Kidoden Logo" fill className="object-contain object-center md:object-left" priority />
              </div>
            </Link>
          </div>

          {/* Mobile Right: Cart & Search */}
          <div className="flex-1 md:hidden flex items-center justify-end">
            <SearchInput />
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-navy"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-brand-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            {/* All Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-brand-navy hover:text-brand-pink font-bold transition-colors">
                All Categories
                <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/shop?category=jewellery" className="block px-4 py-3 text-sm font-bold text-brand-navy hover:bg-gray-50 transition-colors border-b border-gray-100">Shop for Moms</Link>
                <Link href="/shop?category=clothing" className="block px-4 py-3 text-sm font-bold text-brand-navy hover:bg-gray-50 transition-colors">Shop for Babies</Link>
              </div>
            </div>
            <Link href="/shop?category=clothing" className="text-brand-navy hover:text-brand-mint font-bold transition-colors">Clothing</Link>
            <Link href="/shop?category=jewellery" className="text-brand-navy hover:text-brand-yellow font-bold transition-colors">Jewellery</Link>
            <Link href="/shop?category=nails" className="text-brand-navy hover:text-brand-purple font-bold transition-colors">Nails</Link>
            <Link href="/contact" className="text-brand-navy hover:text-brand-pink font-bold transition-colors">Contact Us</Link>
            
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            
            <SearchInput />
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-navy hover:text-brand-pink transition-colors group"
              aria-label="Open cart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-brand-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
