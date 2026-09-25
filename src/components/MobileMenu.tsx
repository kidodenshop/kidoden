"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface ActiveParams {
  isShop: boolean;
  category: string | null;
  gender: string | null;
  age: string | null;
  collection: string | null;
  giftType: string | null;
}

function MobileNavItems({
  params,
  onClose,
}: {
  params: ActiveParams;
  onClose: () => void;
}) {
  const isInfantsActive = params.isShop && params.category === "infants";
  const isBoysActive = params.isShop && params.category === "clothing" && params.gender === "boy";
  const isGirlsActive = params.isShop && params.category === "clothing" && params.gender === "girl";
  const isGiftingActive = params.isShop && params.category === "gifting";

  const getCategoryClass = (isActive: boolean) =>
    isActive
      ? "text-center py-2.5 px-2 rounded-xl bg-pink-50/90 text-xs font-bold text-brand-pink border border-pink-200/70 shadow-xs transition-colors"
      : "text-center py-2.5 px-2 rounded-xl bg-gray-50 text-xs font-bold text-brand-navy hover:bg-brand-pink/10 hover:text-brand-pink transition-colors";

  const getItemClass = (isActive: boolean) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold bg-pink-50/80 text-brand-pink border border-pink-200/50 transition-colors"
      : "flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-brand-navy hover:bg-brand-pink/5 hover:text-brand-pink transition-colors";

  return (
    <>
      {/* Section: Shop by Category */}
      <div className="pb-4 border-b border-gray-100">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-1 mb-2.5 select-none">
          Shop by Category
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/shop?category=infants"
            onClick={onClose}
            className={getCategoryClass(isInfantsActive)}
          >
            Infants
          </Link>
          <Link
            href="/shop?category=clothing&gender=boy"
            onClick={onClose}
            className={getCategoryClass(isBoysActive)}
          >
            Boys
          </Link>
          <Link
            href="/shop?category=clothing&gender=girl"
            onClick={onClose}
            className={getCategoryClass(isGirlsActive)}
          >
            Girls
          </Link>
          <Link
            href="/shop?category=gifting"
            onClick={onClose}
            className={getCategoryClass(isGiftingActive)}
          >
            Gifting
          </Link>
        </div>
      </div>

      {/* Section 1: Shop by Age */}
      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
          Shop by Age
        </p>
        <div className="flex flex-col gap-1">
          <Link
            href="/shop?category=infants"
            onClick={onClose}
            className={getItemClass(params.isShop && params.category === "infants")}
          >
            0–1 Year (Infants)
          </Link>
          <Link
            href="/shop?category=clothing&age=1-3"
            onClick={onClose}
            className={getItemClass(params.isShop && params.age === "1-3")}
          >
            1–3 Years
          </Link>
          <Link
            href="/shop?category=clothing&age=3-5"
            onClick={onClose}
            className={getItemClass(params.isShop && params.age === "3-5")}
          >
            3–5 Years
          </Link>
          <Link
            href="/shop?category=clothing&age=5-7"
            onClick={onClose}
            className={getItemClass(params.isShop && params.age === "5-7")}
          >
            5–7 Years
          </Link>
          <Link
            href="/shop?category=clothing&age=7-12"
            onClick={onClose}
            className={getItemClass(params.isShop && params.age === "7-12")}
          >
            7–12 Years
          </Link>
        </div>
      </div>

      {/* Section 2: Collections */}
      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
          Collections
        </p>
        <div className="flex flex-col gap-1">
          <Link
            href="/shop?collection=new-arrivals"
            onClick={onClose}
            className={getItemClass(params.isShop && params.collection === "new-arrivals")}
          >
            New Arrivals
          </Link>
          <Link
            href="/shop?collection=best-sellers"
            onClick={onClose}
            className={getItemClass(params.isShop && params.collection === "best-sellers")}
          >
            Best Sellers
          </Link>
          <Link
            href="/shop?collection=premium-picks"
            onClick={onClose}
            className={getItemClass(params.isShop && params.collection === "premium-picks")}
          >
            Premium Picks
          </Link>
        </div>
      </div>

      {/* Section 3: Gifting */}
      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
          Gifting
        </p>
        <div className="flex flex-col gap-1">
          <Link
            href="/shop?category=gifting&giftType=gift-boxes"
            onClick={onClose}
            className={getItemClass(params.isShop && params.giftType === "gift-boxes")}
          >
            Gift Boxes
          </Link>
          <Link
            href="/shop?category=gifting&giftType=birthday-gifts"
            onClick={onClose}
            className={getItemClass(params.isShop && params.giftType === "birthday-gifts")}
          >
            Birthday Gifts
          </Link>
          <Link
            href="/shop?category=gifting&giftType=baby-shower-gifts"
            onClick={onClose}
            className={getItemClass(params.isShop && params.giftType === "baby-shower-gifts")}
          >
            Baby Shower Gifts
          </Link>
        </div>
      </div>

      {/* Section 4: Featured */}
      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-2 select-none">
          Featured
        </p>
        <div className="flex flex-col gap-1">
          <Link
            href="/shop?category=clothing&collection=summer-collection"
            onClick={onClose}
            className={getItemClass(params.isShop && params.collection === "summer-collection")}
          >
            Summer Collection
          </Link>
          <Link
            href="/shop?category=clothing&collection=matching-outfits"
            onClick={onClose}
            className={getItemClass(params.isShop && params.collection === "matching-outfits")}
          >
            Matching Outfits
          </Link>
        </div>
      </div>
    </>
  );
}

function MobileNavContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isShop = pathname === "/shop";
  const category = searchParams?.get("category") || null;
  const gender = searchParams?.get("gender") || null;
  const age = searchParams?.get("age") || null;
  const collection = searchParams?.get("collection") || null;
  const giftType = searchParams?.get("giftType") || null;

  return (
    <MobileNavItems
      params={{ isShop, category, gender, age, collection, giftType }}
      onClose={onClose}
    />
  );
}

function MobileNavContentFallback({ onClose }: { onClose: () => void }) {
  return (
    <MobileNavItems
      params={{
        isShop: false,
        category: null,
        gender: null,
        age: null,
        collection: null,
        giftType: null,
      }}
      onClose={onClose}
    />
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <Suspense fallback={<MobileNavContentFallback onClose={() => setOpen(false)} />}>
            <MobileNavContent onClose={() => setOpen(false)} />
          </Suspense>
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
