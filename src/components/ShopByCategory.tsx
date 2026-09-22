import Image from "next/image";
import Link from "next/link";
import TitleDivider from "@/components/TitleDivider";

const categories = [
  {
    title: "Infants",
    subtitle: "Comfort for their first little years",
    image: "/clothe/Homepage/shop-for-infants-new.png",
    link: "/shop?category=infants",
    position: "object-[center_22%]",
    bgColor: "#FAF4E8",
    badgeBorder: "border-[#F2E5D0]",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="#9E7B54"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      >
        {/* Baby head */}
        <circle cx="20" cy="22" r="11.5" />
        {/* Ears */}
        <path d="M8.5 21C7.5 21 7.5 23.5 8.5 24" />
        <path d="M31.5 21C32.5 21 32.5 23.5 31.5 24" />
        {/* Hair curl on top */}
        <path d="M20 10.5C18.8 8.8 21.2 7.5 22.2 9C22.8 10 20.8 10.5 20 10.5" />
        {/* Smiling eyes */}
        <path d="M15 20C15.8 19 17.2 19 18 20" />
        <path d="M22 20C22.8 19 24.2 19 25 20" />
        {/* Cute smile */}
        <path d="M17.5 24.5C18.5 26 21.5 26 22.5 24.5" />
        {/* Rosy blush dots */}
        <circle cx="14" cy="22.5" r="0.8" fill="#9E7B54" />
        <circle cx="26" cy="22.5" r="0.8" fill="#9E7B54" />
      </svg>
    ),
  },
  {
    title: "Boys",
    subtitle: "Everyday styles for little explorers",
    image: "/clothe/Homepage/shop-for-boy.png",
    link: "/shop?category=clothing&gender=boy",
    position: "object-[center_15%]",
    bgColor: "#EAF1F7",
    badgeBorder: "border-[#D8E6F0]",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="#507694"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      >
        {/* Face */}
        <path d="M11 20V23C11 28 15 31.5 20 31.5C25 31.5 29 28 29 23V20" />
        {/* Ears */}
        <path d="M11 22.5C9.8 22.5 9.8 24.8 11 25" />
        <path d="M29 22.5C30.2 22.5 30.2 24.8 29 25" />
        {/* Cap visor */}
        <path d="M7 19.5C13 17 27 17 33 19.5" />
        {/* Cap crown */}
        <path d="M12 18.5C12 12.5 15.5 9.5 20 9.5C24.5 9.5 28 12.5 28 18.5" />
        {/* Cap top button */}
        <path d="M18.8 9.5C18.8 8.5 21.2 8.5 21.2 9.5" />
        {/* Eyes */}
        <path d="M15.5 23C16.2 22.2 17.2 22.2 18 23" />
        <path d="M22 23C22.8 22.2 23.8 22.2 24.5 23" />
        {/* Smile */}
        <path d="M17.5 26.5C18.5 27.8 21.5 27.8 22.5 26.5" />
      </svg>
    ),
  },
  {
    title: "Girls",
    subtitle: "Playful looks for every adventure",
    image: "/clothe/Homepage/shop-for-girl-new.png",
    link: "/shop?category=clothing&gender=girl",
    position: "object-[center_20%]",
    bgColor: "#FCEEF0",
    badgeBorder: "border-[#FADDE2]",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="#D87A8D"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      >
        {/* Face */}
        <circle cx="20" cy="22" r="9.5" />
        {/* Hair bangs */}
        <path d="M11.5 18.5C14 16 17 16 20 17.5C23 16 26 16 28.5 18.5" />
        {/* Left pigtail */}
        <path d="M11 17C8.5 15.5 8 12 10.5 10.5C12.5 9.5 14 11 13.5 14" />
        {/* Right pigtail */}
        <path d="M29 17C31.5 15.5 32 12 29.5 10.5C27.5 9.5 26 11 26.5 14" />
        {/* Left hair tie */}
        <circle cx="12" cy="16" r="1.5" fill="#D87A8D" />
        {/* Right hair tie */}
        <circle cx="28" cy="16" r="1.5" fill="#D87A8D" />
        {/* Eyes */}
        <path d="M16 22C16.6 21.2 17.6 21.2 18.2 22" />
        <path d="M21.8 22C22.4 21.2 23.4 21.2 24 22" />
        {/* Smile */}
        <path d="M17.8 25.5C18.8 26.8 21.2 26.8 22.2 25.5" />
      </svg>
    ),
  },
  {
    title: "Gifts",
    subtitle: "Thoughtful outfits for little ones",
    image: "/clothe/Homepage/gifting.png",
    link: "/shop?category=gifting",
    position: "object-center",
    bgColor: "#EBF3EC",
    badgeBorder: "border-[#DCE8DE]",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="#5C966E"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      >
        {/* Box body */}
        <path d="M11 18V30C11 31 12 32 13 32H27C28 32 29 31 29 30V18" />
        {/* Box lid */}
        <rect x="9" y="14" width="22" height="4.5" rx="1.5" />
        {/* Center vertical ribbon */}
        <line x1="20" y1="14" x2="20" y2="32" />
        {/* Ribbon bow */}
        <path d="M20 14C17.5 14 14.5 12 14.5 9.5C14.5 7.5 17 7.5 19 10L20 14Z" />
        <path d="M20 14C22.5 14 25.5 12 25.5 9.5C25.5 7.5 23 7.5 21 10L20 14Z" />
      </svg>
    ),
  },
];

export default function ShopByCategory() {
  return (
    <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] overflow-hidden">
      {/* Decorative Organic Blob - Top Left (Sage Green) */}
      <div className="absolute top-0 left-0 w-36 sm:w-56 md:w-72 lg:w-80 h-auto pointer-events-none select-none z-0">
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

      {/* Decorative Organic Blob - Top Right (Soft Sky Blue) */}
      <div className="absolute top-0 right-0 w-36 sm:w-56 md:w-72 lg:w-80 h-auto pointer-events-none select-none z-0">
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14 reveal-on-scroll">
          <p className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] text-[#69859A] uppercase mb-2">
            LITTLE OUTFITS. BIG ADVENTURES.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4263] tracking-tight">
            Shop by Category
          </h2>

          {/* Centered Dash-Heart-Dash Divider */}
          <TitleDivider />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7">
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              style={{ transitionDelay: `${(idx + 1) * 90}ms` }}
              className="reveal-on-scroll flex"
            >
              <Link
                href={cat.link}
                className="group flex flex-col w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(26,66,99,0.1)] transition-all duration-500 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
              >
                {/* Top Image Container */}
                <div className="relative w-full aspect-[4/4.6] overflow-hidden bg-[#f0eee9]">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover ${cat.position} group-hover:scale-105 transition-transform duration-700 ease-out`}
                  />
                </div>

                {/* Bottom Pastel Container */}
                <div
                  className="flex-1 flex flex-col items-center text-center pt-7 sm:pt-8 md:pt-9 pb-5 sm:pb-7 px-2.5 sm:px-4 relative transition-colors"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {/* Floating Seam Circular Badge */}
                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-white flex items-center justify-center absolute -top-5.5 sm:-top-7 md:-top-7.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${cat.badgeBorder} border transition-transform duration-300 group-hover:scale-110`}
                  >
                    {cat.icon}
                  </div>

                  {/* Category Title */}
                  <h3 className="text-lg sm:text-2xl md:text-[25px] font-extrabold text-[#1a4263] tracking-tight mb-1">
                    {cat.title}
                  </h3>

                  {/* Category Subtitle */}
                  <p className="text-[11px] sm:text-[13px] md:text-sm text-[#637d90] font-medium leading-snug sm:leading-relaxed max-w-[200px] min-h-[32px] sm:min-h-[38px] flex items-center justify-center">
                    {cat.subtitle}
                  </p>

                  {/* Shop Now CTA */}
                  <div className="mt-2.5 sm:mt-4 flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#1a4263] group-hover:text-brand-pink transition-colors">
                    <span>Shop Now</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
