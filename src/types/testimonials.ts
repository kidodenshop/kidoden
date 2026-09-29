export interface TestimonialItem {
  id: string;
  name: string;
  location?: string;
  context?: string;
  rating: number;
  quote: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
}

export const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "asha",
    name: "Asha Sharma",
    location: "Bengaluru",
    context: "Mom of 2-year-old Kabir",
    rating: 5,
    quote:
      "The fabric is impossibly soft! I was hesitant to order kidswear online because my little one has sensitive skin, but Kidoden's organic cotton is a game changer. Survived multiple washes without losing its shape or softness.",
    initials: "AS",
    avatarBg: "bg-pink-100",
    avatarColor: "text-brand-pink",
  },
  {
    id: "anisha",
    name: "Anisha Verma",
    location: "Mumbai",
    context: "Mom of 6-month-old Aanya",
    rating: 5,
    quote:
      "I ordered the newborn gift hamper for my sister's baby shower, and everyone was raving about it. The packaging was so luxurious and the clothes inside were pure perfection. Kidoden is now my go-to brand for baby gifting!",
    initials: "AV",
    avatarBg: "bg-emerald-100",
    avatarColor: "text-emerald-700",
  },
  {
    id: "neha",
    name: "Neha Kapoor",
    location: "Delhi NCR",
    context: "Mom of 3-year-old Reyansh",
    rating: 5,
    quote:
      "Finding outfits that look this adorable while being 100% comfortable for everyday play is rare. The fit was true to size, delivery was quick, and Cash on Delivery made the whole shopping experience stress-free.",
    initials: "NK",
    avatarBg: "bg-blue-100",
    avatarColor: "text-[#1a4263]",
  },
];
