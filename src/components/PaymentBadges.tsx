import React from "react";

export default function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4 select-none">
      {/* 256-bit SSL */}
      <div className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center gap-2 shadow-2xs hover:shadow-xs transition-shadow">
        <svg width="14" height="16" viewBox="0 0 448 512" fill="#9ca3af">
          <path d="M400 224h-24v-72C376 68.4 307.6 0 224 0S72 68.4 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
        </svg>
        <div className="flex flex-col leading-none text-left">
          <span className="text-[10px] font-black text-red-500 tracking-wider">256-bit</span>
          <span className="text-[9px] font-black text-gray-400">SSL SECURITY</span>
        </div>
      </div>

      {/* VISA */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <svg width="45" height="15" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.4 0.1L5.3 7.9H3.3L1.2 1.4C1.0 0.8 0.8 0.6 0.4 0.3C0.2 0.2 0 0.1 0 0.1H2.4L3.4 5.2L4.6 0.1H7.4ZM11.1 5.3C11.1 3.8 9.5 3.7 9.5 3.0C9.5 2.7 9.8 2.5 10.4 2.5C10.7 2.5 11.4 2.6 11.9 2.9L12.3 0.9C11.8 0.7 11.1 0.6 10.3 0.6C8.5 0.6 7.4 1.7 7.4 3.4C7.4 5.3 9.4 5.4 9.4 6.2C9.4 6.5 9.1 6.7 8.5 6.7C7.9 6.7 7.2 6.5 6.7 6.1L6.3 8.1C6.9 8.4 7.7 8.5 8.5 8.5C10.3 8.5 11.1 7.3 11.1 5.3ZM16.3 7.9L17.5 0.1H15.6C15.1 0.1 14.8 0.4 14.6 0.8L12.2 7.9H14.2C14.2 7.9 14.5 7.0 14.6 6.8H15.9C15.9 7.0 16.0 7.9 16.0 7.9H16.3ZM14.9 5.2L15.3 2.9L15.6 5.2H14.9ZM23.4 0.1L21.3 7.9H19.5L18.4 1.9C18.2 1.0 17.6 0.4 16.8 0.1H19.7L20.3 4.5L21.4 0.1H23.4Z" fill="#1A1F71"/>
        </svg>
      </div>

      {/* MasterCard */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="10" r="9" fill="#EB001B"/>
          <circle cx="21" cy="10" r="9" fill="#F79E1B" fillOpacity="0.85"/>
          <path d="M15 16.5C17.3 15.1 18.7 12.7 18.7 10C18.7 7.3 17.3 4.9 15 3.5C12.7 4.9 11.3 7.3 11.3 10C11.3 12.7 12.7 15.1 15 16.5Z" fill="#FF5F00"/>
        </svg>
      </div>

      {/* AMEX */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <div className="w-9 h-6 bg-[#0070CD] rounded flex items-center justify-center text-[7px] font-black text-white tracking-tighter leading-none select-none">
          AMEX
        </div>
      </div>

      {/* Diners Club */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <svg width="35" height="15" viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z" fill="#004A97"/>
          <path d="M7 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0-11c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" fill="#004A97"/>
          <text x="15" y="11" fill="#004A97" className="text-[7.5px] font-black tracking-tighter">Diners Club</text>
        </svg>
      </div>

      {/* Net Banking */}
      <div className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-shadow">
        <svg width="12" height="14" viewBox="0 0 320 512" fill="#2563eb">
          <path d="M224 96V24c0-13.3-10.7-24-24-24h-80c-13.3 0-24 10.7-24 24v72h128zm-128 32v72h128v-72H96zm128 104v72H96v-72h128zm0 104v72H96v-72h128zm24 128H72c-13.3 0-24-10.7-24-24v-40h224v40c0 13.3-10.7 24-24 24z"/>
        </svg>
        <div className="flex flex-col leading-none text-left">
          <span className="text-[10px] font-black text-blue-600 tracking-wider">NET</span>
          <span className="text-[8px] font-black text-gray-500">BANKING</span>
        </div>
      </div>

      {/* Cash on Delivery */}
      <div className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-shadow">
        <span className="text-xs font-black text-indigo-700">₹</span>
        <div className="flex flex-col leading-none text-left">
          <span className="text-[9px] font-black text-indigo-700 tracking-wide">CASH</span>
          <span className="text-[8px] font-black text-gray-500">ON DELIVERY</span>
        </div>
      </div>

      {/* RuPay */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <span className="text-xs font-black italic tracking-tighter text-blue-800">
          Ru<span className="text-orange-500">Pay</span>
        </span>
      </div>

      {/* PayPal */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <svg width="40" height="15" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.6 2.3h5.9c3.2 0 4.9 1.5 4.5 4.3-.4 3.1-2.4 4.8-5.3 4.8H5.9l-1.5 9.3H0L3.1.2c.2-.2.5-.2.7-.2H4.6zm5.1 6.5c1.4 0 2.2-.7 2.4-1.8.2-1-.3-1.8-1.5-1.8H7.2l-.7 4.2h1.8v-.6z" fill="#003087"/>
          <path d="M22.6.2h6.1c3.1 0 4.7 1.5 4.3 4.2-.4 3-2.3 4.7-5.1 4.7h-3.9l-1.4 9.1h-4.3L21.4.9c.2-.3.5-.7.9-.7h.3zm5.2 6.3c1.3 0 2.1-.7 2.3-1.8.2-1-.3-1.7-1.4-1.7h-3.1l-.6 4.1h2.8v-.6z" fill="#0079C1"/>
          <text x="36" y="14" fill="#0079C1" className="text-[8.5px] font-black tracking-tighter">PayPal</text>
        </svg>
      </div>

      {/* BHIM / UPI */}
      <div className="h-10 px-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-2xs hover:shadow-xs transition-shadow">
        <span className="text-xs font-black tracking-tighter text-gray-800">
          BHIM <span className="text-blue-600 font-extrabold">UPI</span>
        </span>
      </div>
    </div>
  );
}
