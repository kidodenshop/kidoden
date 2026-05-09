"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addToCart(product);
      }}
      className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-pink text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-colors text-lg mb-4"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
      Add to Cart
    </button>
  );
}
