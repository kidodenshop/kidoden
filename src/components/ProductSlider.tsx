"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductSlider({ products }: { products: Product[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const slide = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Buttons - visible on hover on desktop */}
      <button 
        onClick={() => slide('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-navy opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-brand-pink hover:text-white"
        aria-label="Previous products"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <button 
        onClick={() => slide('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-navy opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-brand-pink hover:text-white"
        aria-label="Next products"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 px-4 -mx-4 sm:px-0 sm:mx-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[300px] snap-start shrink-0">
            <div className="group flex flex-col h-full block relative">
              <Link href={`/product/${product.id}`} className="relative h-80 w-full overflow-hidden bg-[#fafafa] rounded-2xl mb-4 block">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out mix-blend-multiply" />
              </Link>
              <div className="absolute bottom-24 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                {product.category === 'clothing' ? (
                  <Link 
                    href={`/product/${product.id}`}
                    className="block w-full text-center bg-white hover:bg-brand-navy hover:text-white text-brand-navy font-bold py-3 rounded-xl shadow-lg transition-colors text-sm"
                  >
                    Select Size
                  </Link>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product, 1, "Standard");
                    }}
                    className="w-full text-center bg-white hover:bg-brand-navy hover:text-white text-brand-navy font-bold py-3 rounded-xl shadow-lg transition-colors text-sm cursor-pointer"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
              <Link href={`/product/${product.id}`} className="text-left px-2 flex flex-col flex-grow">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-brand-navy mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-lg font-semibold text-brand-pink mt-auto">₹{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
