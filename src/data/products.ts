export type Category = 'clothing' | 'gifting';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  images?: string[];
  ageRange?: string;
  gender?: 'boy' | 'girl' | 'unisex';
  features: string[];
  isFeatured?: boolean;
  rating?: number;
  reviewsCount?: number;
  inventory?: { size: string; stockQuantity: number }[];
}

export const products: Product[] = [
  {
    id: "c-1",
    name: "Mickey Friends Cartoon Vest",
    description: "A fun and breezy sleeveless vest featuring Mickey, Donald & Pluto. Perfect for casual summer days.",
    price: 599,
    category: "clothing",
    imageUrl: "/clothe/clo-1.jpeg",
    images: ["/clothe/clo-1.jpeg", "/clothe/placeholder.png"],
    ageRange: "2-8 years",
    gender: "boy",
    features: ["100% Breathable Cotton", "Machine Washable", "Skin-friendly dyes"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 24
  },
  {
    id: "c-2",
    name: "Princess Sequin Party Dress",
    description: "A stunning white sequin dress with layered organza skirt and butterfly wings. Made for little princesses.",
    price: 1499,
    category: "clothing",
    imageUrl: "/clothe/clo-2.jpeg",
    images: ["/clothe/clo-2.jpeg", "/clothe/placeholder.png"],
    ageRange: "3-10 years",
    gender: "girl",
    features: ["Premium Organza", "Comfortable fit", "Includes butterfly wings"],
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 15
  },
  {
    id: "c-3",
    name: "Mini Style Plaid Skirt Set",
    description: "A trendy navy top with layered plaid skirt — your little one will be the most stylish at any party.",
    price: 899,
    category: "clothing",
    imageUrl: "/clothe/clo-3.jpeg",
    images: ["/clothe/clo-3.jpeg", "/clothe/placeholder.png"],
    ageRange: "4-10 years",
    gender: "girl",
    features: ["Soft Cotton Blend", "Tag-less design", "Relaxed fit"],
    rating: 4.7,
    reviewsCount: 9
  },
  {
    id: "c-4",
    name: "Blue Bow Lace Skirt Set",
    description: "A sweet blue ribbon top paired with a delicate lace layered skirt. Effortlessly cute for any occasion.",
    price: 799,
    category: "clothing",
    imageUrl: "/clothe/clo-4.jpeg",
    images: ["/clothe/clo-4.jpeg", "/clothe/placeholder.png"],
    ageRange: "2-8 years",
    gender: "girl",
    features: ["Soft Cotton", "Machine washable", "Comfortable fit"],
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 12
  },
  {
    id: "c-5",
    name: "Yellow Sunshine Lace Set",
    description: "A cheerful yellow ribbon top with a beautiful lace layered skirt. Perfect for sunny outings.",
    price: 849,
    category: "clothing",
    imageUrl: "/clothe/clo-5.jpeg",
    images: ["/clothe/clo-5.jpeg", "/clothe/placeholder.png"],
    ageRange: "2-8 years",
    gender: "girl",
    features: ["Breathable fabric", "Machine washable", "Comfortable fit"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 16
  },
  {
    id: "g-1",
    name: "Premium Newborn Gift Set",
    description: "A thoughtfully curated gift set with organic cotton bodysuit, cozy booties, bib, and a hand-crafted wooden bunny rattle. Packed with love.",
    price: 1899,
    category: "gifting",
    imageUrl: "/clothe/gift-set-1.png",
    images: ["/clothe/gift-set-1.png", "/clothe/placeholder.png"],
    ageRange: "Newborn - 6 months",
    features: ["100% Organic Cotton Bodysuit", "Safe hand-crafted wooden rattle", "Premium hardboard gift box packaging"],
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 32
  },
  {
    id: "g-2",
    name: "Little Explorer Milestone Box",
    description: "The ultimate milestone set with organic swaddle blankets, wooden milestone cards, and a soft knitted dinosaur cuddle toy.",
    price: 2199,
    category: "gifting",
    imageUrl: "/clothe/gift-set-2.png",
    images: ["/clothe/gift-set-2.png", "/clothe/placeholder.png"],
    ageRange: "Newborn - 12 months",
    features: ["Breathable cotton swaddles", "12 Wooden double-sided milestone cards", "Soft hypoallergenic knitted toy"],
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: "g-3",
    name: "Little Prince Welcome Box",
    description: "Premium blue-themed gift box with an organic cotton romper, crown booties, matching bib, and a plush bunny toy.",
    price: 1999,
    category: "gifting",
    imageUrl: "/clothe/gift-set-3.png",
    images: ["/clothe/gift-set-3.png", "/clothe/placeholder.png"],
    ageRange: "Newborn - 6 months",
    features: ["100% Organic Cotton Romper", "Comfortable crown pattern booties", "Includes soft matching bib and plush toy"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 21
  }
];
