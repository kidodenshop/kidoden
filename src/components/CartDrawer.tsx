"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-navy">Shopping Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-brand-pink transition-colors rounded-full hover:bg-gray-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <div className="w-24 h-24 mb-6 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-8 py-3 bg-brand-navy text-white font-bold rounded-full hover:bg-brand-pink transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-brand-navy text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{item.category}</p>
                      {item.selectedSize && (
                        <p className="text-xs text-brand-pink font-bold mt-1 bg-pink-50 px-2 py-0.5 rounded-md inline-block border border-pink-100/50">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      aria-label="Delete item"
                      title="Delete item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-full bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                        className="w-8 h-8 flex items-center justify-center text-brand-navy hover:text-brand-pink transition-colors font-medium text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-brand-navy">{item.quantity}</span>
                      {(() => {
                        const sizeInventory = item.inventory?.find(inv => inv.size === item.selectedSize);
                        const maxStock = sizeInventory ? sizeInventory.stockQuantity : 99;
                        const isPlusDisabled = item.quantity >= maxStock;

                        return (
                          <button 
                            disabled={isPlusDisabled}
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                            className={`w-8 h-8 flex items-center justify-center text-brand-navy hover:text-brand-pink transition-colors font-medium text-lg cursor-pointer ${
                              isPlusDisabled ? "opacity-30 cursor-not-allowed hover:text-brand-navy" : ""
                            }`}
                            title={isPlusDisabled ? `Only ${maxStock} items in stock` : "Add one"}
                          >
                            +
                          </button>
                        );
                      })()}
                    </div>
                    <p className="font-bold text-brand-pink">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-xl font-extrabold text-brand-navy">₹{cartTotal}</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-4 bg-brand-pink text-white font-bold rounded-xl hover:bg-brand-navy transition-colors text-lg flex justify-center items-center gap-2 text-center justify-items-center"
            >
              Proceed to Checkout <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
