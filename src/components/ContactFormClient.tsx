"use client";

import { useState } from "react";

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp message
    const text = `Hi Kidoden! 👋\n\nMy name is ${formData.name}.\n\n*Message:*\n${formData.message}\n\n*Contact Info:*\nEmail: ${formData.email}${formData.phone ? `\nPhone: ${formData.phone}` : ''}`;

    // Redirect to WhatsApp
    window.open(`https://wa.me/919606969128?text=${encodeURIComponent(text)}`, "_blank");

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-brand-navy/5 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-brand-pink">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow outline-none transition-all"
            placeholder="Jane Doe"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-brand-pink">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition-all"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Your Message <span className="text-brand-pink">*</span></label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none transition-all resize-none"
            placeholder="How can we help you today?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-navy hover:bg-brand-pink text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-pink/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          Send Message
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
        <p className="text-xs text-center text-gray-500 mt-4">
          Clicking submit will securely open a WhatsApp chat with our team.
        </p>
      </form>
    </div>
  );
}
