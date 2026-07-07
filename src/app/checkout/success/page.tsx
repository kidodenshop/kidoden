"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useCart } from "@/context/CartContext";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "KD-XXXX";
  const isMock = searchParams.get("mock") === "true";
  const { clearCart } = useCart();

  // Clear cart one more time as a fail-safe measure
  useEffect(() => {
    clearCart();
  }, []);

  const handleWhatsAppClick = () => {
    const message = [
      `Hello Kidoden! 👋`,
      ``,
      `I just placed order *${orderNumber}* on your website.`,
      `Please register my number for shipping updates and tracking alerts.`,
      ``,
      `Thank you! 🧸✨`
    ].join("\n");

    window.open(
      `https://wa.me/919606969128?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
      {/* Success Animation Container */}
      <div className="w-24 h-24 mb-8 bg-green-50 border border-green-200/50 rounded-full flex items-center justify-center text-green-500 shadow-md shadow-green-50 animate-bounce">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">
        Thank You for Your Order!
      </h1>
      
      <p className="text-gray-500 font-semibold mb-6 text-base sm:text-lg max-w-md">
        Your order has been placed successfully. Our team is already preparing to bundle it with love.
      </p>

      {/* Order Detail Badge */}
      <div className="bg-brand-navy/5 border border-brand-navy/10 px-6 py-4 rounded-3xl mb-6 w-full max-w-sm">
        <span className="block text-xs font-extrabold uppercase text-gray-400 tracking-widest mb-1.5">
          Order Number
        </span>
        <span className="text-2xl font-black text-brand-navy tracking-tight">
          {orderNumber}
        </span>
      </div>

      {/* WhatsApp Subscription Card */}
      <div className="bg-[#e8fbf0] border border-[#c1ebd1] rounded-3xl p-6 mb-8 w-full max-w-sm flex flex-col items-center select-none shadow-xs">
        <span className="text-2xl mb-2">💬</span>
        <h3 className="font-bold text-brand-navy text-sm sm:text-base mb-1">Get Updates on WhatsApp</h3>
        <p className="text-[11px] sm:text-xs text-gray-500 text-center mb-4 leading-normal max-w-[280px]">
          Want real-time shipping notifications and tracking alerts? Connect with us on WhatsApp!
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-extrabold px-5 py-3 rounded-full transition-all text-xs uppercase tracking-wider shadow-md shadow-green-100 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.536 0 10.04-4.5 10.04-10.04 0-2.682-1.045-5.203-2.94-7.098C16.425 1.62 13.913.58 11.23.58c-5.54 0-10.043 4.502-10.043 10.043 0 1.845.5 3.641 1.457 5.167L1.622 22.22l6.59-1.706zM17.18 14.12c-.29-.145-1.72-.848-1.986-.944-.267-.096-.46-.145-.654.145-.194.29-.75.944-.92 1.134-.17.19-.34.21-.63.07-.29-.145-1.226-.452-2.336-1.442-.864-.77-1.448-1.72-1.618-2.01-.17-.29-.018-.448.127-.59.13-.13.29-.34.437-.51.145-.17.194-.29.29-.48.097-.19.048-.36-.024-.51-.07-.145-.654-1.577-.897-2.155-.236-.57-.478-.49-.654-.5H7.72c-.194 0-.51.07-.777.36-.267.29-1.02 1.002-1.02 2.443 0 1.44 1.047 2.839 1.192 3.03.146.19 2.06 3.145 4.99 4.41.698.302 1.243.483 1.668.618.7.223 1.34.19 1.843.116.56-.084 1.72-.702 1.962-1.38.243-.678.243-1.26.17-1.38-.072-.12-.267-.19-.557-.335z"/></svg>
          Get Updates
        </button>
      </div>

      {isMock && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-bold max-w-sm">
          ⚠️ Notice: This is a demo transaction. Database writes were skipped because a valid DATABASE_URL is not set.
        </div>
      )}

      {/* Guidance info */}
      <p className="text-xs text-gray-400 font-medium mb-8 max-w-xs leading-relaxed">
        A confirmation receipt has been generated. For returns, status updates, or inquiries, please mention your order ID.
      </p>

      {/* Button Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link 
          href="/shop" 
          className="px-8 py-4 bg-brand-navy hover:bg-brand-pink text-white font-bold rounded-full transition-all text-sm tracking-wider uppercase shadow-md shadow-brand-navy/10"
        >
          Continue Shopping
        </Link>
        <Link 
          href="/contact" 
          className="px-8 py-4 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold rounded-full transition-all text-sm tracking-wider uppercase"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink"></div>
        <p className="text-gray-500 font-semibold mt-4">Loading confirmation...</p>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
