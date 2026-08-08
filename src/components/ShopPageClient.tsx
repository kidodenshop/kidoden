"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, Category } from "@/data/products";
import ShopFilterGrid from "@/components/ShopFilterGrid";

interface ShopPageClientProps {
  products: Product[];
  displayedProducts: Product[];
  category?: string;
  gender?: string;
  age?: string;
  collection?: string;
  giftType?: string;
  search?: string;
}

export default function ShopPageClient({
  products,
  displayedProducts,
  category,
  gender,
  age,
  collection,
  giftType,
  search,
}: ShopPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isValidCategory = category && ["clothing", "gifting"].includes(category);

  // Helper to build URL query strings preservation
  const getFilterLink = (params: { 
    category?: string | null; 
    gender?: string | null; 
    age?: string | null; 
    collection?: string | null;
    giftType?: string | null;
  }) => {
    const newParams = new URLSearchParams();
    
    // Category
    if (params.category !== null) {
      const cat = params.category !== undefined ? params.category : category;
      if (cat) newParams.set('category', cat);
    }
    
    // Gender
    if (params.gender !== null) {
      const gen = params.gender !== undefined ? params.gender : gender;
      if (gen) newParams.set('gender', gen);
    }
    
    // Age
    if (params.age !== null) {
      const a = params.age !== undefined ? params.age : age;
      if (a) newParams.set('age', a);
    }
    
    // Collection
    if (params.collection !== null) {
      const col = params.collection !== undefined ? params.collection : collection;
      if (col) newParams.set('collection', col);
    }

    // GiftType
    if (params.giftType !== null) {
      const gt = params.giftType !== undefined ? params.giftType : giftType;
      if (gt) newParams.set('giftType', gt);
    }
    
    const query = newParams.toString();
    return query ? `/shop?${query}` : '/shop';
  };

  const handleFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey) return; // Allow opening in new tab
    e.preventDefault();
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  const ageGroupOptions = (() => {
    const giftingGroups = [
      { id: 'newborn-6', label: 'Newborn - 6 months', href: age === 'newborn-6' ? getFilterLink({ age: null }) : getFilterLink({ age: 'newborn-6' }), active: age === 'newborn-6' },
      { id: 'newborn-12', label: 'Newborn - 12 months', href: age === 'newborn-12' ? getFilterLink({ age: null }) : getFilterLink({ age: 'newborn-12' }), active: age === 'newborn-12' }
    ];
    
    const clothingGroups = [
      { id: '0-1', label: '0–1 Year', href: age === '0-1' ? getFilterLink({ age: null }) : getFilterLink({ age: '0-1' }), active: age === '0-1' },
      { id: '1-3', label: '1–3 Years', href: age === '1-3' ? getFilterLink({ age: null }) : getFilterLink({ age: '1-3' }), active: age === '1-3' },
      { id: '3-5', label: '3–5 Years', href: age === '3-5' ? getFilterLink({ age: null }) : getFilterLink({ age: '3-5' }), active: age === '3-5' },
      { id: '5-7', label: '5–7 Years', href: age === '5-7' ? getFilterLink({ age: null }) : getFilterLink({ age: '5-7' }), active: age === '5-7' },
      { id: '7-12', label: '7–12 Years', href: age === '7-12' ? getFilterLink({ age: null }) : getFilterLink({ age: '7-12' }), active: age === '7-12' }
    ];

    if (category === 'gifting') {
      return giftingGroups;
    }
    if (category === 'clothing') {
      return clothingGroups;
    }
    return [...giftingGroups, ...clothingGroups];
  })();

  // Determine dynamic banner text based on collection and giftType
  let bannerTitle = "Shop All Collections";
  let bannerDesc = "Soft, playful & premium essentials crafted for little explorers.";

  if (search) {
    bannerTitle = `Search Results for "${search}"`;
    bannerDesc = `Found ${displayedProducts.length} items matching your search.`;
  } else if (collection) {
    if (collection === "new-arrivals") {
      bannerTitle = "New Arrivals";
      bannerDesc = "Fresh additions to dress your little explorer in comfort.";
    } else if (collection === "best-sellers") {
      bannerTitle = "Best Sellers";
      bannerDesc = "The most loved and highly rated styles for kids.";
    } else if (collection === "premium-picks") {
      bannerTitle = "Premium Picks";
      bannerDesc = "Our finest, high-quality selections for special occasions.";
    } else if (collection === "summer-collection") {
      bannerTitle = "Summer Collection";
      bannerDesc = "Breezy and bright outfits perfect for sunny days.";
    } else if (collection === "matching-outfits") {
      bannerTitle = "Matching Outfits";
      bannerDesc = "Coordinate cute outfits and matching sets easily.";
    }
  } else if (giftType) {
    if (giftType === "gift-boxes") {
      bannerTitle = "Gift Boxes";
      bannerDesc = "Beautifully curated gift boxes packed with love.";
    } else if (giftType === "birthday-gifts") {
      bannerTitle = "Birthday Gifts";
      bannerDesc = "Delightful gift sets perfect for celebrating birthdays.";
    } else if (giftType === "baby-shower-gifts") {
      bannerTitle = "Baby Shower Gifts";
      bannerDesc = "Soft, comforting essentials for welcoming newborns.";
    }
  } else if (isValidCategory) {
    if (category === "clothing") {
      bannerTitle = "Our Little Wardrobe";
      bannerDesc = "Soft, skin-friendly outfits made for little adventures.";
    } else {
      bannerTitle = "Curated Gift Sets";
      bannerDesc = "Curated comfort and milestone moments your little one will love.";
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section with Category-specific Background */}
      <div className={`relative overflow-hidden flex flex-col justify-center min-h-[220px] sm:min-h-[300px] bg-[#e4dfd1]`}>
        {category === 'clothing' && (
          <Image
            src="/Banner/clothing_banner.jpg"
            alt="Clothing Collection Banner"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
        )}
        {category === 'gifting' && (
          <Image
            src="/Banner/baby-gift.png"
            alt="Gifting Collection Banner"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
        )}
        {!isValidCategory && (
          <Image
            src="/Banner/all-categories.png"
            alt="All Categories Banner"
            fill
            className="w-full h-full object-cover object-center"
            priority
          />
        )}

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full py-8">
          <div className="inline-block bg-white/60 backdrop-blur-md px-8 py-6 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
            <h1
              className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight capitalize"
              style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}
            >
              {bannerTitle}
            </h1>
            <p
              className="max-w-2xl mx-auto text-gray-800 text-lg font-medium"
              style={{ fontFamily: 'var(--font-nunito), sans-serif' }}
            >
              {bannerDesc}
            </p>
          </div>
        </div>
      </div>

      <div className={`w-full ${!isValidCategory ? 'bg-[#fffbf9]' :
        category === 'clothing' ? 'bg-gradient-to-b from-brand-mint/10 to-white' :
          category === 'gifting' ? 'bg-gradient-to-b from-brand-pink/10 to-white' :
            'bg-gradient-to-b from-brand-purple/10 to-white'
      }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row gap-8 lg:gap-12">

          {/* Sidebar */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <a
              href="/"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                router.push("/");
              }}
              className="text-brand-pink hover:text-brand-navy font-bold mb-8 inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              &larr; Back to Home
            </a>

            <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm sticky top-28 space-y-6">
              <div>
                <h3 className="font-extrabold text-brand-navy text-sm mb-4 tracking-tight">Categories</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'all', label: 'All Products', href: getFilterLink({ category: null, gender: null, age: null, collection: null, giftType: null }), count: products.length, active: !isValidCategory },
                    { id: 'clothing', label: 'Clothing', href: getFilterLink({ category: 'clothing' }), count: products.filter(p => p.category === 'clothing').length, active: category === 'clothing' },
                    { id: 'gifting', label: 'Gifting', href: getFilterLink({ category: 'gifting' }), count: products.filter(p => p.category === 'gifting').length, active: category === 'gifting' }
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleFilterClick(e, item.href)}
                      className="group flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.active ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                          {item.active && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${item.active ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${item.active ? 'bg-brand-pink/10 text-brand-pink' : 'bg-gray-100 text-gray-400'}`}>
                        {item.count}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Gender Section */}
              {category !== 'gifting' && (
                <div>
                  <h3 className="font-extrabold text-brand-navy text-sm mb-4 tracking-tight">Shop For</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'boy', label: 'Boys', href: gender === 'boy' ? getFilterLink({ gender: null }) : getFilterLink({ gender: 'boy' }), active: gender === 'boy' },
                      { id: 'girl', label: 'Girls', href: gender === 'girl' ? getFilterLink({ gender: null }) : getFilterLink({ gender: 'girl' }), active: gender === 'girl' }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleFilterClick(e, item.href)}
                        className="group flex items-center gap-3 cursor-pointer select-none"
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.active ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                          {item.active && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${item.active ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Age Groups Section */}
              <div>
                <h3 className="font-extrabold text-brand-navy text-sm mb-4 tracking-tight">Age Groups</h3>
                <div className="flex flex-col gap-3">
                  {ageGroupOptions.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleFilterClick(e, item.href)}
                      className="group flex items-center gap-3 cursor-pointer select-none"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.active ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                        {item.active && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${item.active ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Collections Section */}
              <div>
                <h3 className="font-extrabold text-brand-navy text-sm mb-4 tracking-tight">Collections</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'new-arrivals', label: 'New Arrivals', href: collection === 'new-arrivals' ? getFilterLink({ collection: null }) : getFilterLink({ collection: 'new-arrivals' }), active: collection === 'new-arrivals' },
                    { id: 'best-sellers', label: 'Best Sellers', href: collection === 'best-sellers' ? getFilterLink({ collection: null }) : getFilterLink({ collection: 'best-sellers' }), active: collection === 'best-sellers' },
                    { id: 'premium-picks', label: 'Premium Picks', href: collection === 'premium-picks' ? getFilterLink({ collection: null }) : getFilterLink({ collection: 'premium-picks' }), active: collection === 'premium-picks' }
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleFilterClick(e, item.href)}
                      className="group flex items-center gap-3 cursor-pointer select-none"
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.active ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                        {item.active && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${item.active ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Gifting Section */}
              {category === 'gifting' && (
                <div>
                  <h3 className="font-extrabold text-brand-navy text-sm mb-4 tracking-tight">Gift Occasions</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'gift-boxes', label: 'Gift Boxes', href: giftType === 'gift-boxes' ? getFilterLink({ giftType: null }) : getFilterLink({ giftType: 'gift-boxes' }), active: giftType === 'gift-boxes' },
                      { id: 'birthday-gifts', label: 'Birthday Gifts', href: giftType === 'birthday-gifts' ? getFilterLink({ giftType: null }) : getFilterLink({ giftType: 'birthday-gifts' }), active: giftType === 'birthday-gifts' },
                      { id: 'baby-shower-gifts', label: 'Baby Shower Gifts', href: giftType === 'baby-shower-gifts' ? getFilterLink({ giftType: null }) : getFilterLink({ giftType: 'baby-shower-gifts' }), active: giftType === 'baby-shower-gifts' }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleFilterClick(e, item.href)}
                        className="group flex items-center gap-3 cursor-pointer select-none"
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.active ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                          {item.active && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${item.active ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Section */}
              {category === 'clothing' && (
                <div>
                  <h3 className="font-extrabold text-brand-navy text-sm mb-4 tracking-tight">Featured</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'summer-collection', label: 'Summer Collection', href: collection === 'summer-collection' ? getFilterLink({ collection: null }) : getFilterLink({ collection: 'summer-collection' }), active: collection === 'summer-collection' },
                      { id: 'matching-outfits', label: 'Matching Outfits', href: collection === 'matching-outfits' ? getFilterLink({ collection: null }) : getFilterLink({ collection: 'matching-outfits' }), active: collection === 'matching-outfits' }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleFilterClick(e, item.href)}
                        className="group flex items-center gap-3 cursor-pointer select-none"
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.active ? 'bg-brand-pink border-brand-pink' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                          {item.active && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${item.active ? 'text-brand-navy' : 'text-gray-500 group-hover:text-brand-navy'}`}>
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear All Filters */}
              {(gender || age || collection || giftType || isValidCategory) && (
                <a
                  href="/shop"
                  onClick={(e) => handleFilterClick(e, "/shop")}
                  className="block text-center text-xs font-black text-gray-400 hover:text-brand-pink pt-4 border-t border-gray-100 transition-colors cursor-pointer select-none"
                >
                  CLEAR ALL FILTERS
                </a>
              )}
            </div>
          </div>

          {/* Product Grid Area with Filter Logic */}
          <div className="flex-1">
            <ShopFilterGrid
              products={displayedProducts}
              category={category}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
