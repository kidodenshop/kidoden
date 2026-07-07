"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import PaymentBadges from "./PaymentBadges";

export default function ProductPurchaseSection({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 1. Get inventory lists. Fallback to mock sizes if database is missing
  const inventoryItems = product.inventory || (
    product.category === "clothing"
      ? [
          { size: "2-3 Years", stockQuantity: 5 },
          { size: "3-4 Years", stockQuantity: 2 },
          { size: "5-6 Years", stockQuantity: 0 },
          { size: "7-8 Years", stockQuantity: 8 }
        ]
      : [{ size: "Standard", stockQuantity: 10 }]
  );

  // If there's only one size (e.g., gifting items), pre-select it
  useState(() => {
    if (inventoryItems.length === 1) {
      setSelectedSize(inventoryItems[0].size);
    }
  });

  const activeInventoryItem = inventoryItems.find(item => item.size === selectedSize);
  const currentStock = activeInventoryItem ? activeInventoryItem.stockQuantity : 0;
  const isOutOfStock = selectedSize ? currentStock === 0 : false;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    addToCart(product, 1, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize || isOutOfStock) {
      setError("Please select a size");
      return;
    }
    
    const params = new URLSearchParams({
      buyNow: "true",
      productId: product.id,
      name: product.name,
      price: product.price.toString(),
      size: selectedSize,
      imageUrl: product.imageUrl,
      category: product.category
    });

    window.location.href = `/checkout?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Size Selection Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-extrabold text-brand-navy tracking-wide uppercase">
            Select Size
          </span>
          {error && (
            <span className="text-red-500 text-xs font-bold" role="alert">
              {error}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {inventoryItems.map((item) => {
            const isSelected = selectedSize === item.size;
            const hasNoStock = item.stockQuantity === 0;

            return (
              <button
                key={item.size}
                disabled={hasNoStock}
                onClick={() => {
                  setSelectedSize(item.size);
                  setError("");
                }}
                className={`relative px-5 py-3 rounded-2xl text-sm font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand-pink border-brand-pink text-white shadow-md shadow-pink-100"
                    : hasNoStock
                    ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed line-through"
                    : "bg-white border-gray-200 text-brand-navy hover:border-brand-pink hover:text-brand-pink"
                }`}
              >
                {item.size}
                {hasNoStock && (
                  <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-gray-400 text-white rounded-full text-[8px] font-black uppercase leading-tight tracking-wider">
                    Out
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Levels Status Indicators */}
      {selectedSize && (
        <div className="inline-flex items-center">
          {isOutOfStock ? (
            <span className="text-red-500 bg-red-50 border border-red-200/60 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Out of stock
            </span>
          ) : currentStock <= 3 ? (
            <span className="text-amber-600 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Only {currentStock} Left!
            </span>
          ) : (
            <span className="text-brand-navy bg-brand-navy/5 border border-brand-navy/15 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink"></span>
              In stock ({currentStock} available)
            </span>
          )}
        </div>
      )}

      {/* Add To Cart & Buy Now Buttons */}
      <div>
        {!selectedSize ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-2xl bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none text-base sm:text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2 2L6 8Z"/></svg>
            Choose Size to Add to Cart
          </button>
        ) : isOutOfStock ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-2xl bg-gray-200 text-gray-400 cursor-not-allowed shadow-none text-base sm:text-lg"
          >
            Out of Stock
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5 transition-all text-sm sm:text-base cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
              Add to Cart
            </button>
            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl bg-brand-pink text-white hover:bg-brand-navy shadow-md shadow-pink-100/50 transition-all text-sm sm:text-base cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Buy Now
            </button>
          </div>
        )}
      </div>

      {/* Payment trust badges */}
      <div className="pt-5 border-t border-gray-100">
        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2 text-center sm:text-left">
          Guaranteed Safe & Secure Checkout
        </span>
        <PaymentBadges />
      </div>
    </div>
  );
}
