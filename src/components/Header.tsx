import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white md:bg-white/80 md:backdrop-blur-md border-b border-brand-mint/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            <div className="relative w-36 h-16 sm:w-44 sm:h-20 -ml-2 group-hover:scale-105 transition-transform">
              <Image src="/brand_logo-new.png" alt="Kidoden Logo" fill className="object-contain object-left" priority />
            </div>
          </Link>
          <MobileMenu />
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
          </nav>
        </div>
      </div>
    </header>
  );
}
