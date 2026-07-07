"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface ShopFilterGridProps {
  products: Product[];
  category?: string;
}

function parseAgeRange(rangeStr: string): [number, number] | null {
  const s = rangeStr.toLowerCase();
  if (s.includes("newborn")) {
    if (s.includes("6")) return [0, 0.5];
    if (s.includes("12")) return [0, 1];
    return [0, 0.5];
  }
  const matches = s.match(/(\d+)\s*-\s*(\d+)/);
  if (matches) {
    return [parseInt(matches[1]), parseInt(matches[2])];
  }
  return null;
}

const filterRanges: Record<string, [number, number]> = {
  "newborn-6": [0, 0.5],
  "newborn-12": [0, 1],
  "0-1": [0, 1],
  "1-3": [1, 3],
  "3-5": [3, 5],
  "5-7": [5, 7],
  "7-12": [7, 12]
};

const sizeLabels: Record<string, string> = {
  "newborn-6": "Newborn - 6 Months",
  "newborn-12": "Newborn - 12 Months",
  "0-1": "0–1 Year",
  "1-3": "1–3 Years",
  "3-5": "3–5 Years",
  "5-7": "5–7 Years",
  "7-12": "7–12 Years"
};

export default function ShopFilterGrid({ products, category }: ShopFilterGridProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"price" | "size" | "gender" | "sort" | null>(null);
  const [colsCount, setColsCount] = useState<4 | 5>(4);

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    gender: true,
  });

  const sortRef = useRef<HTMLDivElement>(null);
  const desktopFiltersRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        if (activeDropdown === "sort") {
          setActiveDropdown(null);
        }
      }
      if (desktopFiltersRef.current && !desktopFiltersRef.current.contains(event.target as Node)) {
        if (
          activeDropdown === "price" ||
          activeDropdown === "size" ||
          activeDropdown === "gender"
        ) {
          setActiveDropdown(null);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Auto-close mobile drawer when window size transitions to desktop (>= 768px)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsDrawerOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute dynamic highest price
  const highestPrice = products.reduce((max, p) => (p.price > max ? p.price : max), 0);

  // Dynamically collect unique sizes
  const availableSizes = (() => {
    const giftingGroups = ["newborn-6", "newborn-12"];
    const clothingGroups = ["0-1", "1-3", "3-5", "5-7", "7-12"];

    if (category === "gifting") {
      return giftingGroups;
    }
    if (category === "clothing") {
      return clothingGroups;
    }
    return [...giftingGroups, ...clothingGroups];
  })();

  const availableGenders = ["boy", "girl"];

  // Toggle size selections
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Toggle gender selections
  const handleGenderToggle = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  // Toggle accordion sections in mobile drawer
  const toggleSection = (section: "price" | "size" | "gender") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Check if any filters are active
  const hasActiveFilters = minPrice !== "" || maxPrice !== "" || selectedSizes.length > 0 || selectedGenders.length > 0;

  // Active filters count
  let count = 0;
  if (minPrice !== "" || maxPrice !== "") count += 1;
  if (selectedSizes.length > 0) count += selectedSizes.length;
  if (selectedGenders.length > 0) count += selectedGenders.length;
  const activeFiltersCount = count;

  // Clear all filters
  const handleClearAll = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedSizes([]);
    setSelectedGenders([]);
    setSortBy("featured");
    setIsDrawerOpen(false);
  };

  // 1. Filter products list
  const filteredProducts = products.filter((product) => {
    const min = minPrice !== "" ? parseFloat(minPrice) : 0;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = product.price >= min && product.price <= max;

    const matchesSize =
      selectedSizes.length === 0 ||
      (product.ageRange && selectedSizes.some((sizeKey) => {
        const selectedRange = filterRanges[sizeKey];
        const pRange = parseAgeRange(product.ageRange || "");
        if (!selectedRange || !pRange) return false;
        return pRange[0] <= selectedRange[1] && selectedRange[0] <= pRange[1];
      }));

    const matchesGender =
      selectedGenders.length === 0 ||
      (product.gender && (
        selectedGenders.includes(product.gender) ||
        product.gender === "unisex"
      ));

    return matchesPrice && matchesSize && matchesGender;
  });

  // 2. Sort filtered products list
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price;
    }
    if (sortBy === "price-high-low") {
      return b.price - a.price;
    }
    return 0; // Featured
  });

  // Size Label formatting
  const formatSizeLabel = (size: string) => {
    if (sizeLabels[size]) return sizeLabels[size];
    return size
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <style>{`
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in-backdrop {
          animation: fadeInBackdrop 0.2s ease-out forwards;
        }
        .animate-slide-in-drawer {
          animation: slideInFromLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Filter and Sort Action Bar */}
      <div className="flex flex-row justify-between items-center gap-2 py-4 border-b border-gray-100 relative w-full select-none">

        {/* Left Side: Filter Options */}
        <div className="flex items-center gap-2.5 sm:gap-6">

          {/* Mobile-Only Trigger Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex md:hidden items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-navy hover:text-brand-pink transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="2" y1="14" x2="6" y2="14" />
              <line x1="10" y1="8" x2="14" y2="8" />
              <line x1="18" y1="16" x2="22" y2="16" />
            </svg>
            Filter
            {activeFiltersCount > 0 && (
              <span className="bg-brand-pink text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Desktop-Only Inline Dropdowns */}
          <div ref={desktopFiltersRef} className="hidden md:flex items-center gap-6">

            {/* Price Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "price" ? null : "price")}
                className={`flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wider transition-colors cursor-pointer select-none ${minPrice !== "" || maxPrice !== "" ? "text-brand-pink" : "text-brand-navy hover:text-brand-pink"
                  }`}
              >
                Price
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "price" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === "price" && (
                <div className="absolute left-0 mt-3 w-72 bg-white rounded-3xl border border-gray-100 shadow-xl p-5 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-grow">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-2xl focus:border-brand-pink focus:outline-hidden text-sm font-medium text-brand-navy bg-gray-50/50"
                      />
                    </div>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">to</span>
                    <div className="relative flex-grow">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                      <input
                        type="number"
                        placeholder={highestPrice.toString()}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-2xl focus:border-brand-pink focus:outline-hidden text-sm font-medium text-brand-navy bg-gray-50/50"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                    The highest price is ₹{highestPrice}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Clear All Separator & Action */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-xs sm:text-sm font-bold text-gray-400 hover:text-brand-pink transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Right Side: Product Count, Sort & Grid Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-6 shrink-0" ref={sortRef}>
          <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest hidden sm:inline">
            {filteredProducts.length === 1 ? "1 product found" : `Showing ${filteredProducts.length} products`}
          </span>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "sort" ? null : "sort")}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${sortBy !== "featured" ? "text-brand-pink" : "text-brand-navy hover:text-brand-pink"
                  }`}
              >
                <span className="hidden sm:inline">
                  Sort: {sortBy === "featured" ? "Featured" : sortBy === "price-low-high" ? "Price: Low to High" : "Price: High to Low"}
                </span>
                <span className="sm:hidden">
                  {sortBy === "featured" ? "Featured" : sortBy === "price-low-high" ? "Low-High" : "High-Low"}
                </span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "sort" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === "sort" && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-3xl border border-gray-100 shadow-xl py-3.5 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                  {[
                    { value: "featured", label: "Featured" },
                    { value: "price-low-high", label: "Price: Low to High" },
                    { value: "price-high-low", label: "Price: High to Low" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer hover:bg-gray-50 ${sortBy === opt.value ? "text-brand-pink" : "text-brand-navy hover:text-brand-pink"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid Layout Toggle */}
            <div className="hidden md:flex items-center gap-1.5 border-l border-gray-100 pl-4">
              <button
                onClick={() => setColsCount(4)}
                className={`p-1 transition-colors cursor-pointer ${colsCount === 4 ? "text-brand-navy" : "text-gray-300 hover:text-brand-navy/60"
                  }`}
                aria-label="4 in a row grid"
                title="4 in a row"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 4h4v4H2zm5 0h4v4H7zm5 0h4v4h-4zm5 0h4v4h-4zM2 10h4v4H2zm5 0h4v4H7zm5 0h4v4h-4zm5 0h4v4h-4zM2 16h4v4H2zm5 0h4v4H7zm5 0h4v4h-4zm5 0h4v4h-4z" />
                </svg>
              </button>
              <button
                onClick={() => setColsCount(5)}
                className={`p-1 transition-colors cursor-pointer ${colsCount === 5 ? "text-brand-navy" : "text-gray-300 hover:text-brand-navy/60"
                  }`}
                aria-label="5 in a row grid"
                title="5 in a row"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 4h2.8v4H2zm3.8 0h2.8v4H5.8zm3.8 0h2.8v4H9.6zm3.8 0h2.8v4h-2.8zm3.8 0H22v4h-2.8zM2 10h2.8v4H2zm3.8 0h2.8v4H5.8zm3.8 0h2.8v4H9.6zm3.8 0h2.8v4h-2.8zm3.8 0H22v4h-2.8zM2 16h2.8v4H2zm3.8 0h2.8v4H5.8zm3.8 0h2.8v4H9.6zm3.8 0h2.8v4h-2.8zm3.8 0H22v4h-2.8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-6 bg-[#fffbf9] rounded-[2rem] border border-[#f5ece1] text-center select-none mb-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-navy">
          <img src="/icons/1.svg" alt="Skin-friendly fabrics" className="w-15 h-15 flex-shrink-0" />
          <span>Skin-friendly fabrics</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-navy">
          <img src="/icons/2.svg" alt="Fast delivery" className="w-15 h-15 flex-shrink-0" />
          <span>Fast delivery</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-navy">
          <img src="/icons/3.svg" alt="Cash on Delivery" className="w-15 h-15 flex-shrink-0" />
          <span>Cash on Delivery</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-navy">
          <img src="/icons/4.svg" alt="Easy returns" className="w-15 h-15 flex-shrink-0" />
          <span>Easy returns</span>
        </div>
      </div>

      {/* FILTER DRAWER SLIDE-OUT PANEL (Mobile only) */}
      {isDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 animate-fade-in-backdrop cursor-pointer md:hidden"
          />

          {/* Drawer Element */}
          <div className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-50 shadow-2xl flex flex-col animate-slide-in-drawer md:hidden">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-brand-navy uppercase tracking-widest">Filter</h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-brand-pink text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-brand-pink transition-colors p-1 cursor-pointer"
                aria-label="Close filters"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable Filter Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 hide-scrollbar">

              {/* Active Filters List (Tags) */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 pb-5 border-b border-gray-100">
                  {/* Price Tag */}
                  {(minPrice !== "" || maxPrice !== "") && (
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs font-bold text-brand-navy px-3 py-1.5 rounded-full select-none">
                      ₹{minPrice || 0} - ₹{maxPrice || highestPrice}
                      <button
                        onClick={() => { setMinPrice(""); setMaxPrice(""); }}
                        className="text-gray-400 hover:text-brand-pink cursor-pointer font-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {/* Size Tags */}
                  {selectedSizes.map((size) => (
                    <span key={size} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs font-bold text-brand-navy px-3 py-1.5 rounded-full select-none">
                      {formatSizeLabel(size)}
                      <button
                        onClick={() => handleSizeToggle(size)}
                        className="text-gray-400 hover:text-brand-pink cursor-pointer font-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {/* Gender Tags */}
                  {selectedGenders.map((gender) => (
                    <span key={gender} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-xs font-bold text-brand-navy px-3 py-1.5 rounded-full select-none">
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      <button
                        onClick={() => handleGenderToggle(gender)}
                        className="text-gray-400 hover:text-brand-pink cursor-pointer font-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Price Collapsible Section */}
              <div className="border-b border-gray-100 pb-5">
                <button
                  onClick={() => toggleSection("price")}
                  className="flex justify-between items-center w-full text-left font-extrabold text-brand-navy uppercase tracking-wider text-sm select-none cursor-pointer"
                >
                  Price
                  <svg className={`w-4 h-4 transition-transform duration-250 ${expandedSections.price ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.price && (
                  <div className="mt-4 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-grow">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                        <input
                          type="number"
                          placeholder="0"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-2xl focus:border-brand-pink focus:outline-hidden text-sm font-medium text-brand-navy bg-gray-50/50"
                        />
                      </div>
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">to</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                        <input
                          type="number"
                          placeholder={highestPrice.toString()}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-2xl focus:border-brand-pink focus:outline-hidden text-sm font-medium text-brand-navy bg-gray-50/50"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                      The highest price is ₹{highestPrice}
                    </p>
                  </div>
                )}
              </div>

              {/* Size Collapsible Section */}
              {availableSizes.length > 0 && (
                <div className="border-b border-gray-100 pb-5">
                  <button
                    onClick={() => toggleSection("size")}
                    className="flex justify-between items-center w-full text-left font-extrabold text-brand-navy uppercase tracking-wider text-sm select-none cursor-pointer"
                  >
                    Size
                    <svg className={`w-4 h-4 transition-transform duration-250 ${expandedSections.size ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedSections.size && (
                    <div className="mt-4 flex flex-col gap-3.5 animate-in fade-in duration-200">
                      {availableSizes.map((size) => {
                        const isChecked = selectedSizes.includes(size);
                        return (
                          <label
                            key={size}
                            className="flex items-center gap-3 text-sm text-brand-navy font-bold hover:text-brand-pink cursor-pointer select-none transition-colors group animate-in fade-in duration-200"
                          >
                            <input type="checkbox" checked={isChecked} onChange={() => handleSizeToggle(size)} className="sr-only" />
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-brand-pink border-brand-pink text-white shadow-xs' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                              {isChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            {formatSizeLabel(size)}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Gender Collapsible Section */}
              {category !== "gifting" && (
                <div className="border-b border-gray-100 pb-5">
                  <button
                    onClick={() => toggleSection("gender")}
                    className="flex justify-between items-center w-full text-left font-extrabold text-brand-navy uppercase tracking-wider text-sm select-none cursor-pointer"
                  >
                    Gender
                    <svg className={`w-4 h-4 transition-transform duration-250 ${expandedSections.gender ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedSections.gender && (
                    <div className="mt-4 flex flex-col gap-3.5 animate-in fade-in duration-200">
                      {availableGenders.map((gender) => {
                        const isChecked = selectedGenders.includes(gender);
                        return (
                          <label
                            key={gender}
                            className="flex items-center gap-3 text-sm text-brand-navy font-bold hover:text-brand-pink cursor-pointer select-none transition-colors group animate-in fade-in duration-200"
                          >
                            <input type="checkbox" checked={isChecked} onChange={() => handleGenderToggle(gender)} className="sr-only" />
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-brand-pink border-brand-pink text-white shadow-xs' : 'border-gray-300 group-hover:border-brand-pink bg-white'}`}>
                              {isChecked && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-gray-100 bg-white grid grid-cols-2 gap-3 shrink-0">
              <button
                onClick={handleClearAll}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-extrabold py-3.5 px-4 rounded-2xl hover:bg-gray-100 transition-colors text-xs tracking-wider cursor-pointer text-center select-none"
              >
                CLEAR ALL
              </button>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-full bg-brand-navy hover:bg-brand-pink text-white font-extrabold py-3.5 px-4 rounded-2xl transition-all text-xs tracking-wider cursor-pointer text-center select-none shadow-sm hover:shadow-md"
              >
                VIEW {filteredProducts.length} PRODUCTS
              </button>
            </div>

          </div>
        </>
      )}

      {sortedProducts.length > 0 ? (
        colsCount === 4 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-300">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 animate-in fade-in duration-300">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        )
      ) : (
        <div className="w-full text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-xs flex flex-col items-center justify-center p-8">
          <span className="text-5xl mb-4">🔍</span>
          <h3 className="text-xl font-bold text-brand-navy mb-2">No matching products found</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            We couldn't find any products matching your current price or size filters. Try widening your criteria.
          </p>
          <button
            onClick={handleClearAll}
            className="bg-brand-navy hover:bg-brand-pink text-white font-bold py-2.5 px-6 rounded-full shadow-md transition-all text-sm cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
