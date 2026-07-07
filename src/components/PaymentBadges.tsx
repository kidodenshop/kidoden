import React from "react";
import Image from "next/image";

const paymentLogos = [
  { src: "/payments/footer-bank-visa.png", alt: "Visa", maxWidth: 52 },
  { src: "/payments/footer-bank-mc.png", alt: "Mastercard", maxWidth: 42 },
  { src: "/payments/footer-bank-rupay.png", alt: "RuPay", maxWidth: 62 },
  { src: "/payments/footer-bank-nb.png", alt: "Net Banking", maxWidth: 48 },
  { src: "/payments/footer-bank-cod.png", alt: "Cash on Delivery", maxWidth: 48 },
  { src: "/payments/footer-bank-paypal.png", alt: "PayPal", maxWidth: 62 },
  { src: "/payments/footer-bank-bhim.png", alt: "BHIM UPI", maxWidth: 52 },
];

export default function PaymentBadges() {
  return (
    <div className="flex items-center justify-between w-full gap-2 py-1 select-none">
      {paymentLogos.map((logo) => (
        <div 
          key={logo.src}
          className="relative h-7 sm:h-8 flex-1 flex items-center justify-center" 
          style={{ maxWidth: `${logo.maxWidth}px` }}
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
