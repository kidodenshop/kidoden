import type { Metadata } from "next";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have questions about your order, sizing, or collections? Get in touch with the Kidoden team via email, phone, or WhatsApp.",
  openGraph: {
    title: "Contact Us | Kidoden",
    description:
      "Have questions about your order, sizing, or collections? Get in touch with the Kidoden team via email, phone, or WhatsApp.",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Kidoden",
    description:
      "Have questions about your order, sizing, or collections? Get in touch with the Kidoden team via email, phone, or WhatsApp.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-brand-mint/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-72 h-72 bg-brand-yellow/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-72 h-72 bg-brand-pink/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Contact Information Section */}
        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[3rem] shadow-sm border border-white/50 h-full flex flex-col justify-center transform transition-all hover:scale-[1.01]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4 tracking-tight" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
            Get in Touch!
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            We'd love to hear from you. Whether you have a question about our collections, sizing, order details or just want to say hi, drop us a message below!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-mint/20 text-brand-mint rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email Us</p>
                <p className="text-brand-navy font-bold text-lg">kidoden.shop@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-yellow/20 text-brand-yellow rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Call or WhatsApp</p>
                <p className="text-brand-navy font-bold text-lg">+91 9606969128</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Location</p>
                <p className="text-brand-navy font-bold text-lg">Based in India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <ContactFormClient />
      </div>
    </div>
  );
}
