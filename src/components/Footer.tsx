import Link from "next/link";
import Image from "next/image";
import PaymentBadges from "@/components/PaymentBadges";

export default function Footer() {
  return (
    <footer className="relative bg-[#FAF8F5] text-gray-700 pt-6 sm:pt-8 md:pt-10 pb-14 sm:pb-16 mt-auto overflow-hidden">
      {/* Decorative Organic Blob - Top Left (Sage Green - desktop only to avoid crowding mobile top) */}
      <div className="hidden sm:block absolute top-0 left-0 w-36 sm:w-52 md:w-64 lg:w-72 h-auto pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0H260C260 0 240 60 195 95C150 130 110 120 70 165C35 200 0 220 0 220V0Z"
            fill="#DFEAE2"
          />
        </svg>
      </div>

      {/* Decorative Organic Blob - Top Right (Soft Sky Blue - visible on mobile & desktop) */}
      <div className="absolute top-0 right-0 w-36 sm:w-52 md:w-64 lg:w-72 h-auto pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M320 0H60C60 0 80 60 125 95C170 130 210 120 250 165C285 200 320 220 320 220V0Z"
            fill="#DCE8F2"
          />
        </svg>
      </div>

      {/* Decorative Organic Blob - Bottom Right (Sage Green - visible on mobile & desktop) */}
      <div className="absolute bottom-0 right-0 w-36 sm:w-52 md:w-64 lg:w-72 h-auto pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M320 220H60C60 220 80 160 125 125C170 90 210 100 250 55C285 20 320 0 320 0V220Z"
            fill="#DFEAE2"
          />
        </svg>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
          {/* Brand & About Column (Spans 5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block relative w-44 h-16 sm:w-48 sm:h-18">
              <Image
                src="/brand_logo-new.png"
                alt="Kidoden Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
            <p className="text-sm sm:text-[15px] text-[#637d90] max-w-sm leading-relaxed font-medium">
              Thoughtfully designed, ultra-soft clothing and gentle essentials crafted for your child&apos;s comfort and everyday adventures.
            </p>

            {/* Social Follow */}
            <div className="pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#69859A] mb-3">
                Connect with us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/kidoden.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kidoden on Instagram"
                  className="w-10 h-10 rounded-full bg-white border border-[#EADFD0] text-brand-navy flex items-center justify-center hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-all duration-300 shadow-xs hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/kidoden.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kidoden on Facebook"
                  className="w-10 h-10 rounded-full bg-white border border-[#EADFD0] text-brand-navy flex items-center justify-center hover:bg-brand-pink hover:text-white hover:border-brand-pink transition-all duration-300 shadow-xs hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-4 text-[#1a4263] tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li>
                <Link href="/shop" className="hover:text-brand-pink transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/shop?category=clothing" className="hover:text-brand-pink transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/shop?category=infants" className="hover:text-brand-pink transition-colors">
                  Infants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gifting" className="hover:text-brand-pink transition-colors">
                  Gifting
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-pink transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-4 text-[#1a4263] tracking-tight">
              Customer Care
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li>
                <Link href="/contact-us" className="hover:text-brand-pink transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns-policy" className="hover:text-brand-pink transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-brand-pink transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-pink transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (Spans 3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold mb-4 text-[#1a4263] tracking-tight">
              Get in Touch
            </h3>
            <div className="space-y-3.5 text-sm text-gray-600 font-medium">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Based in India</span>
              </div>

              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:kidoden.shop@gmail.com" className="hover:text-brand-pink transition-colors">
                  kidoden.shop@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919606969128" className="hover:text-brand-pink transition-colors">
                  +91 9606969128
                </a>
              </div>

              <div className="pt-2">
                <span className="inline-block text-[11px] font-semibold tracking-wider text-[#69859A] uppercase mb-1.5">
                  GSTIN
                </span>
                <p className="font-mono text-xs bg-white border border-[#EADFD0] px-3 py-1 rounded-md text-gray-700 inline-block shadow-2xs">
                  29GIGPK7449F1ZR
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Soft Trust & Payment Badges Container - Card Style (No harsh divider lines) */}
        <div className="mt-14 sm:mt-16 bg-white/70 backdrop-blur-xs rounded-2xl px-6 py-4 sm:py-5 border border-[#EAE3D9]/70 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#637d90]">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Safe & Secure Payments</span>
          </div>
          <div className="w-full max-w-sm md:max-w-md">
            <PaymentBadges />
          </div>
        </div>

        {/* Footer Bottom Bar - Clean Spacing & Room for WhatsApp Floating Icon */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#69859A] font-medium pr-0 sm:pr-20">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Kidoden. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#D87A8D]">
              Made with <span className="text-sm">♥</span> for little ones
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-brand-pink transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#C8BEB0] text-xs select-none">•</span>
            <Link href="/terms-and-conditions" className="hover:text-brand-pink transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-[#C8BEB0] text-xs select-none">•</span>
            <Link href="/shipping-returns-policy" className="hover:text-brand-pink transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
