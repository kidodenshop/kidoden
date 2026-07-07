import React from "react";
import Image from "next/image";

const paymentLogos = [
  { src: "/payments/footer-bank-visa.png", alt: "Visa", width: 65 },
  { src: "/payments/footer-bank-mc.png", alt: "Mastercard", width: 52 },
  { src: "/payments/footer-bank-rupay.png", alt: "RuPay", width: 78 },
  { src: "/payments/footer-bank-nb.png", alt: "Net Banking", width: 58 },
  { src: "/payments/footer-bank-cod.png", alt: "Cash on Delivery", width: 58 },
  { src: "/payments/footer-bank-paypal.png", alt: "PayPal", width: 78 },
  { src: "/payments/footer-bank-bhim.png", alt: "BHIM UPI", width: 65 },
];

export default function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3.5 py-2 select-none">
      {paymentLogos.map((logo) => (
        <div 
          key={logo.src}
          className="relative h-9 flex items-center justify-center" 
          style={{ width: `${logo.width}px` }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain"
            sizes="120px"
            priority
          />
        </div>
      ))}
    </div>
  );
}
