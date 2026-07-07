import React from "react";
import Image from "next/image";

const paymentLogos = [
  { src: "/payments/footer-bank-visa.png", alt: "Visa", width: 50 },
  { src: "/payments/footer-bank-mc.png", alt: "Mastercard", width: 40 },
  { src: "/payments/footer-bank-rupay.png", alt: "RuPay", width: 60 },
  { src: "/payments/footer-bank-nb.png", alt: "Net Banking", width: 45 },
  { src: "/payments/footer-bank-cod.png", alt: "Cash on Delivery", width: 45 },
  { src: "/payments/footer-bank-paypal.png", alt: "PayPal", width: 60 },
  { src: "/payments/footer-bank-bhim.png", alt: "BHIM UPI", width: 50 },
];

export default function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 py-2 select-none">
      {paymentLogos.map((logo) => (
        <div 
          key={logo.src}
          className="relative h-7 flex items-center justify-center" 
          style={{ width: `${logo.width}px` }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain"
            sizes="100px"
            priority
          />
        </div>
      ))}
    </div>
  );
}
