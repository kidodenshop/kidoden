"use client";

import { useState } from "react";

interface WhatsAppOrderFormProps {
  productName: string;
  productCategory: string;
  productPrice: number;
}

const WHATSAPP_NUMBER = "918397970941";

export default function WhatsAppOrderForm({
  productName,
  productCategory,
  productPrice,
}: WhatsAppOrderFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim()) e.phone = "Please enter your phone number";
    if (!address.trim()) e.address = "Please enter your delivery address";
    if (!city.trim()) e.city = "Please enter your city";
    if (!pincode.trim()) e.pincode = "Please enter your pincode";
    return e;
  };

  const isFormValid = name.trim() && phone.trim() && address.trim() && city.trim() && pincode.trim();

  const handleOrder = () => {
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
      `🛍️ *Product:* ${productName}`,
      `🏷️ *Category:* ${productCategory}`,
      `💰 *Price:* ₹${productPrice}`,
      ``,
      `📦 *Delivery Details:*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}, ${city} - ${pincode}`,
      ``,
      `Please confirm my order. Thank you! 🙏`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-2xl border ${
      errors[field] ? "border-red-400" : "border-gray-200"
    } focus:outline-none focus:border-brand-pink font-medium text-gray-700 bg-white placeholder-gray-400 transition-colors`;

  const clearError = (field: string) =>
    setErrors((prev) => ({ ...prev, [field]: "" }));

  return (
    <div>
      <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-3xl p-6 mb-5">
        <h3 className="font-extrabold text-brand-navy text-lg mb-1">
          📦 Your Delivery Details
        </h3>
        <p className="text-sm text-gray-500 mb-4 font-medium">
          Fill in your details so we can process your order right away.
        </p>

        <div className="space-y-3">
          <div>
            <label htmlFor="order-name" className="sr-only">Your Name</label>
            <input
              id="order-name"
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError("name"); }}
              className={inputClass("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="order-phone" className="sr-only">Phone Number</label>
            <input
              id="order-phone"
              type="tel"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
              className={inputClass("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="order-address" className="sr-only">Full Delivery Address</label>
            <textarea
              id="order-address"
              placeholder="Full Delivery Address *"
              value={address}
              onChange={(e) => { setAddress(e.target.value); clearError("address"); }}
              rows={2}
              className={`${inputClass("address")} resize-none`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="order-city" className="sr-only">City</label>
              <input
                id="order-city"
                type="text"
                placeholder="City *"
                value={city}
                onChange={(e) => { setCity(e.target.value); clearError("city"); }}
                className={inputClass("city")}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium" role="alert">{errors.city}</p>
              )}
            </div>
            <div>
              <label htmlFor="order-pincode" className="sr-only">Pincode</label>
              <input
                id="order-pincode"
                type="text"
                placeholder="Pincode *"
                value={pincode}
                onChange={(e) => { setPincode(e.target.value); clearError("pincode"); }}
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
        onClick={handleOrder}
        disabled={!isFormValid}
        className={`w-full text-sm md:text-xl font-bold py-4 md:py-5 px-4 md:px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-4 cursor-pointer whitespace-nowrap ${
          isFormValid
            ? "bg-[#25D366] hover:bg-[#1DA851] text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-7 md:h-7 fill-current flex-shrink-0" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="truncate">{isFormValid ? "Order via WhatsApp" : "Fill details to order"}</span>
      </button>
    </div>
  );
}
