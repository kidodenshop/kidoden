import React from "react";
import Image from "next/image";

const paymentLogos = [
  { src: "/payments/footer-bank-visa.png", alt: "Visa", width: 40 },
  { src: "/payments/footer-bank-mc.png", alt: "Mastercard", width: 35 },
  { src: "/payments/footer-bank-rupay.png", alt: "RuPay", width: 45 },
  { src: "/payments/footer-bank-nb.png", alt: "Net Banking", width: 35 },
  { src: "/payments/footer-bank-cod.png", alt: "Cash on Delivery", width: 35 },
  { src: "/payments/footer-bank-paypal.png", alt: "PayPal", width: 45 },
  { src: "/payments/footer-bank-bhim.png", alt: "BHIM UPI", width: 40 },
];

export default function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-2 select-none">
      {paymentLogos.map((logo) => (
        <div
          key={logo.src}
          className="h-10 px-3 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center shadow-3xs hover:shadow-2xs transition-all duration-200"
        >
          <div 
            className="relative h-6 flex items-center justify-center" 
            style={{ width: `${logo.width}px` }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
              sizes="80px"
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
}
