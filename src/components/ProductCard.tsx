"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({
  product,
  viewMode = "grid"
}: {
  product: Product;
  viewMode?: "grid" | "list";
}) {
  const { addToCart } = useCart();

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-none sm:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 flex flex-row h-full relative p-4 gap-4 sm:gap-6">
        {/* Left Image */}
        <div className="relative aspect-[4/5] w-24 sm:w-44 shrink-0 overflow-hidden bg-gray-50 rounded-2xl">
          <Link href={`/product/${product.id}`} className="w-full h-full block">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-w-768px) 100px, 200px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </Link>
        </div>

        {/* Right Details */}
        <div className="flex flex-col flex-grow py-1 sm:py-2">
          <div className="flex-grow">
            <p className="text-[10px] sm:text-xs font-bold text-brand-pink uppercase tracking-wider mb-0.5 sm:mb-1">{product.category}</p>
            <Link href={`/product/${product.id}`} className="block">
              <h3 className="text-xs sm:text-lg md:text-xl font-bold text-brand-navy mb-1 sm:mb-2 hover:text-brand-pink transition-colors line-clamp-1 sm:line-clamp-2 leading-tight">{product.name}</h3>
            </Link>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-2 bg-gray-50 inline-block px-2.5 py-0.5 rounded-full">
              {product.category === 'clothing' && product.ageRange ? `Age: ${product.ageRange}` : 'All ages'}
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2 sm:pt-4 border-t border-gray-100">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base sm:text-2xl font-extrabold text-brand-navy">₹{product.price}</span>
              {product.discount !== undefined && product.discount !== null && product.discount > 0 && (
                <>
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{Math.round(product.price / (1 - product.discount / 100))}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-brand-orange">({product.discount}% OFF)</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (product.category === 'clothing') {
                    window.location.href = `/product/${product.id}`;
                  } else {
                    addToCart(product, 1, "Standard");
                  }
                }}
                className="bg-brand-navy hover:bg-brand-pink text-white font-bold p-2 rounded-full shadow-md transition-colors cursor-pointer"
                title={product.category === 'clothing' ? "Select Size" : "Add to Cart"}
              >
                {product.category === 'clothing' ? (
                  <span className="text-xs px-1 font-bold">Size</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
                )}
              </button>
              <Link
                href={`/product/${product.id}`}
                className="bg-brand-mint/20 text-brand-navy font-bold px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-brand-mint transition-colors text-[10px] sm:text-sm"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 flex flex-col h-full relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 block">
        <Link href={`/product/${product.id}`} className="w-full h-full block">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-w-768px) 50vw, 30vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </Link>
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-3 left-0 right-0 px-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10 flex justify-center">
          {product.category === 'clothing' ? (
            <Link 
              href={`/product/${product.id}`}
              className="bg-brand-navy hover:bg-brand-pink text-white font-bold py-1.5 px-4 rounded-full shadow-md transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              Select Size
            </Link>
          ) : (
            <button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1, "Standard");
              }}
              className="bg-brand-navy hover:bg-brand-pink text-white font-bold py-1.5 px-4 rounded-full shadow-md transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
              Add
            </button>
          )}
        </div>
      </div>

      <Link href={`/product/${product.id}`} className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-xs sm:text-base md:text-lg font-bold text-brand-navy mb-1.5 flex-grow line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-snug">{product.name}</h3>
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-2 sm:mb-3 bg-gray-50 inline-block px-2.5 py-0.5 rounded-full self-start">
          {product.category === 'clothing' && product.ageRange ? `Age: ${product.ageRange}` : 'All ages'}
        </p>
        <div className="flex justify-between items-center mt-auto pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base sm:text-2xl font-extrabold text-brand-navy">₹{product.price}</span>
            {product.discount !== undefined && product.discount !== null && product.discount > 0 && (
              <>
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{Math.round(product.price / (1 - product.discount / 100))}</span>
                <span className="text-[10px] sm:text-xs font-bold text-brand-orange">({product.discount}% OFF)</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
