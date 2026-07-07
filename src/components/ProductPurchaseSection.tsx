"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import WhatsAppOrderForm from "./WhatsAppOrderForm";

const WHATSAPP_NUMBER = "919606969128";

export default function ProductPurchaseSection({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderCity, setOrderCity] = useState("");
  const [orderPincode, setOrderPincode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!selectedSize) return;
    addToCart(product, 1, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize || isOutOfStock) return;
    
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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!selectedSize) e.size = "Please select a size";
    if (!orderName.trim()) e.name = "Please enter your name";
    if (!orderPhone.trim()) e.phone = "Please enter your phone number";
    if (!orderAddress.trim()) e.address = "Please enter your delivery address";
    if (!orderCity.trim()) e.city = "Please enter your city";
    if (!orderPincode.trim()) e.pincode = "Please enter your pincode";
    return e;
  };

  const isFormValid = selectedSize && orderName.trim() && orderPhone.trim() && orderAddress.trim() && orderCity.trim() && orderPincode.trim();

  const handleWhatsAppOrder = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const message = [
      `Hi Kidoden! 👋`,
      ``,
      `I'd like to place an order:`,
      ``,
      `🛍️ *Product:* ${product.name}`,
      `📏 *Size:* ${selectedSize}`,
      `🏷️ *Category:* ${product.category}`,
      `💰 *Price:* ₹${product.price}`,
      ``,
      `📦 *Delivery Details:*`,
      `Name: ${orderName}`,
      `Phone: ${orderPhone}`,
      `Address: ${orderAddress}, ${orderCity} - ${orderPincode}`,
      ``,
      `Please confirm my order. Thank you! 🙏`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-2xl border ${errors[field] ? "border-red-400" : "border-gray-200"
    } focus:outline-none focus:border-brand-pink font-medium text-gray-700 bg-white placeholder-gray-400 transition-colors`;

  const clearError = (field: string) =>
    setErrors((prev) => ({ ...prev, [field]: "" }));

  return (
    <div className="space-y-6">
      {/* Size Selection Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-extrabold text-brand-navy tracking-wide uppercase">
            Select Size
          </span>
          {errors.size && (
            <span className="text-red-500 text-xs font-bold" role="alert">
              {errors.size}
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
                  clearError("size");
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M6 8h12l1.5 12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L6 8Z"/></svg>
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

      {/* WhatsApp Order Form */}
      <div>
        <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-3xl p-6 mb-5">
          <h3 className="font-extrabold text-brand-navy text-lg mb-1">
            📦 Your Delivery Details
          </h3>
          <p className="text-sm text-gray-500 mb-4 font-medium">
            Fill in your details to place a direct order.
          </p>

          <div className="space-y-3">
            <div>
              <label htmlFor="purchase-name" className="sr-only">Your Name</label>
              <input
                id="purchase-name"
                type="text"
                placeholder="Your Name *"
                value={orderName}
                onChange={(e) => { setOrderName(e.target.value); clearError("name"); }}
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="purchase-phone" className="sr-only">Phone Number</label>
              <input
                id="purchase-phone"
                type="tel"
                placeholder="Phone Number *"
                value={orderPhone}
                onChange={(e) => { setOrderPhone(e.target.value); clearError("phone"); }}
                className={inputClass("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="purchase-address" className="sr-only">Full Delivery Address</label>
              <textarea
                id="purchase-address"
                placeholder="Full Delivery Address *"
                value={orderAddress}
                onChange={(e) => { setOrderAddress(e.target.value); clearError("address"); }}
                rows={2}
                className={`${inputClass("address")} resize-none`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="purchase-city" className="sr-only">City</label>
                <input
                  id="purchase-city"
                  type="text"
                  placeholder="City *"
                  value={orderCity}
                  onChange={(e) => { setOrderCity(e.target.value); clearError("city"); }}
                  className={inputClass("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.city}</p>
                )}
              </div>
              <div>
                <label htmlFor="purchase-pincode" className="sr-only">Pincode</label>
                <input
                  id="purchase-pincode"
                  type="text"
                  placeholder="Pincode *"
                  value={orderPincode}
                  onChange={(e) => { setOrderPincode(e.target.value); clearError("pincode"); }}
                  className={inputClass("pincode")}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.pincode}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleWhatsAppOrder}
          disabled={!isFormValid || isOutOfStock}
          className={`w-full text-sm md:text-xl font-bold py-4 md:py-5 px-4 md:px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-4 cursor-pointer whitespace-nowrap ${
            isFormValid && !isOutOfStock
              ? "bg-[#25D366] hover:bg-[#1DA851] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-7 md:h-7 fill-current flex-shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>
            {!selectedSize
              ? "Choose Size First"
              : isOutOfStock
              ? "Out of Stock"
              : "Order via WhatsApp"}
          </span>
        </button>
      </div>
    </div>
  );
}
