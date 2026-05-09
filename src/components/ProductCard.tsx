"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 flex flex-col h-full relative">
      <Link href={`/product/${product.id}`} className="relative h-64 w-full overflow-hidden bg-gray-50 block">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
      </Link>
      
      {/* Quick Add Overlay */}
      <div className="absolute top-64 -mt-12 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10 flex justify-center">
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="bg-brand-navy hover:bg-brand-pink text-white font-bold py-2 px-6 rounded-full shadow-lg transition-colors text-sm flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
          Add to Cart
        </button>
      </div>

      <Link href={`/product/${product.id}`} className="p-6 flex flex-col flex-1">
        <p className="text-xs font-bold text-brand-pink uppercase tracking-wider mb-2">{product.category}</p>
        <h3 className="text-lg font-bold text-brand-navy mb-2 flex-grow">{product.name}</h3>
        <p className="text-xs font-semibold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-full">
          {product.category === 'clothing' && product.ageRange ? `Age: ${product.ageRange}` : 'All ages'}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <p className="text-2xl font-black text-brand-orange">₹{product.price}</p>
          <span className="bg-brand-mint/20 text-brand-navy font-bold px-4 py-2 rounded-full group-hover:bg-brand-mint transition-colors text-sm">View</span>
        </div>
      </Link>
    </div>
  );
}
