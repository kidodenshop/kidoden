"use client";

import { useState, useEffect, Suspense } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // States to hold the active items being checked out
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize checkout items: use URL params if direct "Buy Now", else fall back to cartItems
  useEffect(() => {
    const buyNowActive = searchParams.get("buyNow") === "true";
    if (buyNowActive) {
      const prodId = searchParams.get("productId");
      const prodName = searchParams.get("name");
      const prodPrice = Number(searchParams.get("price") || "0");
      const prodSize = searchParams.get("size") || "Standard";
      const prodImg = searchParams.get("imageUrl") || "";
      const prodCat = searchParams.get("category") || "";

      if (prodId && prodName) {
        setIsBuyNow(true);
        setCheckoutItems([
          {
            id: prodId,
            name: prodName,
            price: prodPrice,
            selectedSize: prodSize,
            imageUrl: prodImg,
            category: prodCat as any,
            quantity: 1
          } as any
        ]);
      } else {
        setIsBuyNow(false);
        setCheckoutItems(cartItems);
      }
    } else {
      setIsBuyNow(false);
      setCheckoutItems(cartItems);
    }
    setIsInitialized(true);
  }, [cartItems, searchParams]);

  // Compute Prices: Free above ₹1000, else ₹99 shipping
  const checkoutTotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = checkoutTotal >= 1000 ? 0 : 99;
  const grandTotal = checkoutTotal + shippingFee;

  // Track if Razorpay checkout script is loaded
  useEffect(() => {
    if ((window as any).Razorpay) {
      setScriptLoaded(true);
    }
  }, []);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!name.trim()) {
      tempErrors.name = "Please enter your full name.";
    }
    if (!phone.trim() || phone.trim().length < 10) {
      tempErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!address.trim()) {
      tempErrors.address = "Please enter your delivery address.";
    }
    if (!city.trim()) {
      tempErrors.city = "Please enter your city.";
    }
    if (!pincode.trim() || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      tempErrors.pincode = "Please enter a valid 6-digit pincode.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          address,
          city,
          pincode,
          paymentMethod,
          cartItems: checkoutItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            selectedSize: item.selectedSize || "Standard"
          }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Failed to create order. Please try again.");
        setSubmitting(false);
        return;
      }

      // Handle COD flow
      if (paymentMethod === "COD") {
        if (!isBuyNow) clearCart();
        window.location.href = `/checkout/success?orderNumber=${data.orderNumber}`;
        return;
      }

      // Handle Razorpay payment gateway popup
      if (paymentMethod === "RAZORPAY") {
        if (data.mock) {
          // If mock database in dev/build phase, directly succeed
          if (!isBuyNow) clearCart();
          window.location.href = `/checkout/success?orderNumber=${data.orderNumber}&mock=true`;
          return;
        }

        if (!(window as any).Razorpay) {
          setSubmitError("Payment gateway script is still loading. Please wait a second and try again.");
          setSubmitting(false);
          return;
        }

        const options = {
          key: data.keyId,
          amount: data.amount, // in paise
          currency: "INR",
          name: "Kidoden",
          description: `Order ${data.orderNumber}`,
          order_id: data.razorpayOrderId,
          handler: async function (response: any) {
            const preventRefresh = (e: BeforeUnloadEvent) => {
              e.preventDefault();
              e.returnValue = "Please do not refresh the page while confirming your order.";
              return e.returnValue;
            };

            try {
              setVerifying(true);
              window.addEventListener("beforeunload", preventRefresh);

              const verifyRes = await fetch("/api/checkout/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: data.orderId
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok) {
                if (!isBuyNow) clearCart();
                window.removeEventListener("beforeunload", preventRefresh);
                window.location.href = `/checkout/success?orderNumber=${data.orderNumber}`;
              } else {
                window.removeEventListener("beforeunload", preventRefresh);
                setSubmitError(verifyData.error || "Payment signature verification failed.");
                setSubmitting(false);
                setVerifying(false);
              }
            } catch (err) {
              window.removeEventListener("beforeunload", preventRefresh);
              console.error("Signature verification error:", err);
              setSubmitError("Verification failed. Please contact support with order number " + data.orderNumber);
              setSubmitting(false);
              setVerifying(false);
            }
          },
          prefill: {
            name: name,
            email: email,
            contact: phone
          },
          theme: {
            color: "#FF6B8B" // Kidoden brand pink
          },
          modal: {
            ondismiss: function () {
              setSubmitting(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("Checkout submit error:", err);
      setSubmitError("Something went wrong. Please check your network and try again.");
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-2xl border ${
      errors[field] ? "border-red-400" : "border-gray-200"
    } focus:outline-hidden focus:border-brand-pink font-semibold text-brand-navy bg-white placeholder-gray-400 transition-colors`;

  if (!isInitialized) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink"></div>
        <p className="text-gray-500 font-semibold mt-4">Loading checkout details...</p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 mb-6 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 font-medium">Add some premium clothing or gift sets before checking out.</p>
        <Link href="/shop" className="inline-block px-8 py-4 bg-brand-navy hover:bg-brand-pink text-white font-bold rounded-full transition-all text-center">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => setScriptLoaded(true)}
        onError={() => console.error("Razorpay SDK script load failure.")}
      />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/shop" className="text-brand-pink hover:text-brand-navy font-bold mb-4 inline-flex items-center gap-2 transition-colors">
          &larr; Continue Shopping
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-gray-100 p-6 sm:p-8 rounded-[2rem] shadow-xs">
            
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-3 shadow-xs">
                <span className="text-base sm:text-lg">⚠️</span>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold mb-0.5">Order Process Alert</p>
                  <p className="text-xs text-red-600 font-semibold break-words leading-relaxed">{submitError}</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSubmitError(null)} 
                  className="text-red-400 hover:text-red-700 font-black cursor-pointer text-xs focus:outline-hidden"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-gray-100 pb-3">
                <span>📧</span> Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-2">Email Address</label>
                  <input
                    id="checkout-email"
                    type="email"
                    placeholder="parent@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
                    className={inputClass("email")}
                    disabled={submitting}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-2">Phone Number</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: "" })); }}
                    className={inputClass("phone")}
                    disabled={submitting}
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-gray-100 pb-3">
                <span>📦</span> Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-2">Recipient Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    placeholder="Durga Prasad Hota"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })); }}
                    className={inputClass("name")}
                    disabled={submitting}
                  />
                  {errors.name && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-2">Street Address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    placeholder="Flat 101, Little Angels Enclave, Outer Ring Road"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setErrors(prev => ({ ...prev, address: "" })); }}
                    className={inputClass("address")}
                    disabled={submitting}
                  />
                  {errors.address && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-city" className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-2">City</label>
                    <input
                      id="checkout-city"
                      type="text"
                      placeholder="Bengaluru"
                      value={city}
                      onChange={(e) => { setCity(e.target.value); setErrors(prev => ({ ...prev, city: "" })); }}
                      className={inputClass("city")}
                      disabled={submitting}
                    />
                    {errors.city && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-pincode" className="block text-xs font-extrabold uppercase text-gray-400 tracking-wider mb-2">Pincode</label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      maxLength={6}
                      placeholder="560103"
                      value={pincode}
                      onChange={(e) => { setPincode(e.target.value); setErrors(prev => ({ ...prev, pincode: "" })); }}
                      className={inputClass("pincode")}
                      disabled={submitting}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-gray-100 pb-3">
                <span>💳</span> Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Razorpay Option */}
                <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "RAZORPAY" 
                    ? "border-brand-pink bg-pink-50/20" 
                    : "border-gray-100 hover:border-gray-200"
                }`}>
                  <input
                    type="radio"
                    name="payment-method"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={() => setPaymentMethod("RAZORPAY")}
                    className="mt-1 accent-brand-pink"
                    disabled={submitting}
                  />
                  <div>
                    <span className="block font-bold text-brand-navy text-sm sm:text-base">Online Payment</span>
                    <span className="block text-xs text-gray-400 mt-1 font-medium">Pay securely via Cards, UPI, Netbanking or Wallets (Razorpay)</span>
                  </div>
                </label>

                {/* COD Option */}
                <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "COD" 
                    ? "border-brand-pink bg-pink-50/20" 
                    : "border-gray-100 hover:border-gray-200"
                }`}>
                  <input
                    type="radio"
                    name="payment-method"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-1 accent-brand-pink"
                    disabled={submitting}
                  />
                  <div>
                    <span className="block font-bold text-brand-navy text-sm sm:text-base">Cash on Delivery (COD)</span>
                    <span className="block text-xs text-gray-400 mt-1 font-medium">Pay in cash when our delivery executive arrives at your doorstep</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Complete Purchase Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 px-6 rounded-2xl text-lg font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed shadow-none"
                  : "bg-brand-pink hover:bg-brand-navy"
              }`}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                  Processing Order...
                </>
              ) : paymentMethod === "RAZORPAY" ? (
                <>Pay & Place Order (₹{grandTotal})</>
              ) : (
                <>Place COD Order (₹{grandTotal})</>
              )}
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-xs space-y-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold text-brand-navy border-b border-gray-100 pb-3 flex items-center gap-2">
              <span>🛒</span> Order Summary
            </h2>

            {/* Items List */}
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
              {checkoutItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-brand-navy text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.category}</p>
                    {item.selectedSize && (
                      <span className="inline-block text-[10px] text-brand-pink font-extrabold bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100/50 mt-1">
                        Size: {item.selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                    <p className="font-bold text-brand-navy text-sm mt-1">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Prices Calculation */}
            <div className="border-t border-gray-100 pt-4 space-y-3 font-semibold text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{checkoutTotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-brand-navy font-extrabold text-lg border-t border-gray-100 pt-4">
                <span>Total Amount</span>
                <span className="text-brand-pink">₹{grandTotal}</span>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-[#fffbf9] border border-[#f5ece1] rounded-2xl p-4 flex gap-3 text-xs text-gray-500 font-medium select-none">
              <span className="text-lg">🛡️</span>
              <p>Your transaction is encrypted. We support safe payment options across UPI, Debit/Credit Cards, and net banking via Razorpay.</p>
            </div>
          </div>
        </form>
      </div>

      {verifying && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-navy/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#fffbf9] max-w-md w-full mx-4 p-8 rounded-[2.5rem] shadow-2xl text-center space-y-6 border border-pink-100/50 flex flex-col items-center animate-scale-up">
            {/* Spinning/pulsing animation container */}
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-4 border-brand-pink/20 animate-ping opacity-75"></div>
              {/* Inner spinning gradient ring */}
              <div className="absolute inset-0 rounded-full border-4 border-t-brand-pink border-r-transparent border-b-brand-pink border-l-transparent animate-spin"></div>
              {/* Center icon */}
              <div className="relative w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-bounce">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-brand-navy tracking-tight">Confirming Your Order</h2>
              <p className="text-gray-500 font-semibold text-sm">Please wait while we verify your payment details.</p>
            </div>

            {/* Warning card */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-left">
              <span className="text-xl">⚠️</span>
              <div className="space-y-1">
                <p className="text-amber-800 font-bold text-xs uppercase tracking-wide">Do Not Refresh or Close</p>
                <p className="text-amber-700 text-xs font-semibold leading-relaxed">
                  Please do not refresh the page, click the back button, or close this window while the order is confirming.
                </p>
              </div>
            </div>
            
            {/* Custom glowing progress bar */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden relative">
              <div className="bg-brand-pink h-full w-full absolute left-0 top-0 origin-left animate-loading-bar rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink"></div>
        <p className="text-gray-500 font-semibold mt-4">Loading checkout...</p>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}
