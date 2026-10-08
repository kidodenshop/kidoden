export type Category = 'clothing' | 'gifting' | 'infants';

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string | null;
  authorName: string;
  createdAt: string; // ISO String representation
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
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
  reviews?: Review[];
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
    features: ["Kidoden Top Wear", "Top Wear", "100% Breathable Cotton", "Machine Washable", "Skin-friendly dyes"],
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
    features: ["Top & Bottom Sets", "Co-ord Set", "Kidoden Bottom Wear", "Bottom Wear", "Soft Cotton Blend", "Tag-less design", "Relaxed fit"],
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
    features: ["Top & Bottom Sets", "Co-ord Set", "Kidoden Bottom Wear", "Bottom Wear", "Soft Cotton", "Machine washable", "Comfortable fit"],
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
    features: ["Top & Bottom Sets", "Co-ord Set", "Kidoden Bottom Wear", "Bottom Wear", "Breathable fabric", "Machine washable", "Comfortable fit"],
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
    features: ["Winter Collection", "100% Organic Cotton Bodysuit", "Safe hand-crafted wooden rattle", "Premium hardboard gift box packaging"],
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
  },
  {
    id: "inf-1",
    name: "Cozy Bear Infant Romper",
    description: "Ultra-soft, breathable organic cotton romper crafted especially for delicate infant skin with easy-snap buttons.",
    price: 699,
    category: "infants",
    imageUrl: "/clothe/Homepage/shop-for-infants-new.png",
    images: ["/clothe/Homepage/shop-for-infants-new.png"],
    ageRange: "0-1 year",
    gender: "unisex",
    features: ["Winter Collection", "100% Organic Soft Cotton", "Easy Snap Buttons", "Hypoallergenic Dyes"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: "inf-2",
    name: "Pure Comfort Newborn Sleepsuit",
    description: "Gentle pastel sleepsuit designed to keep infants cozy and peaceful through sleep and play.",
    price: 749,
    category: "infants",
    imageUrl: "/clothe/Homepage/shop-for-infants-new.png",
    images: ["/clothe/Homepage/shop-for-infants-new.png"],
    ageRange: "0-6 months",
    gender: "unisex",
    features: ["Kidoden Night Suits", "Night Suit", "Fold-over mitten cuffs", "Two-way zipper for easy diaper changes", "Super breathable"],
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 11
  },
  {
    id: "c-6",
    name: "Starry Night Organic Night Suit Set",
    description: "Ultra-soft cotton two-piece night suit set with playful star prints and gentle elastic waistband for peaceful bedtime sleep.",
    price: 899,
    discount: 15,
    category: "clothing",
    imageUrl: "/clothe/clo-1.jpeg",
    images: ["/clothe/clo-1.jpeg"],
    ageRange: "2-8 years",
    gender: "unisex",
    features: ["Top & Bottom Sets", "Co-ord Set", "Kidoden Night Suits", "Night Suit", "100% Breathable Organic Cotton", "Comfort Stretch Waistband", "Snug Bedtime Fit"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 22
  },
  {
    id: "c-7",
    name: "Cozy Cloud Organic Cotton Joggers",
    description: "Ultra-soft brushed organic cotton joggers featuring an elasticated drawstring waistband and ribbed ankle cuffs. Built for all-day play and everyday ease.",
    price: 699,
    discount: 15,
    category: "clothing",
    imageUrl: "/clothe/clo-1.jpeg",
    images: ["/clothe/clo-1.jpeg", "/clothe/placeholder.png"],
    ageRange: "1-7 years",
    gender: "unisex",
    features: ["Kidoden Bottom Wear", "Bottom Wear", "100% Breathable Organic Cotton", "Gentle Elastic Ribbed Waistband", "Deep Pockets & Durable Stitching"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: "c-8",
    name: "Playful Explorer Chino Shorts",
    description: "Lightweight, soft cotton stretch shorts featuring a snug waistband and relaxed fit for breezy warm-weather outdoor adventures.",
    price: 649,
    discount: 10,
    category: "clothing",
    imageUrl: "/clothe/clo-4.jpeg",
    images: ["/clothe/clo-4.jpeg", "/clothe/placeholder.png"],
    ageRange: "2-8 years",
    gender: "unisex",
    features: ["Kidoden Bottom Wear", "Bottom Wear", "100% Soft Stretch Cotton", "Comfort Elasticated Waist", "Tag-free Breathable Fabric"],
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: "c-9",
    name: "Dino Adventure Organic Cotton Graphic Tee",
    description: "Playful organic cotton short-sleeve t-shirt with whimsical dino prints and gentle stretch crew neck for breezy everyday fun.",
    price: 549,
    discount: 10,
    category: "clothing",
    imageUrl: "/clothe/clo-1.jpeg",
    images: ["/clothe/clo-1.jpeg", "/clothe/placeholder.png"],
    ageRange: "1-6 years",
    gender: "unisex",
    features: ["Kidoden Top Wear", "Top Wear", "100% Breathable Organic Cotton", "Ribbed Stretch Crew Neck", "Fade-resistant Non-toxic Prints"],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 17
  },
  {
    id: "c-10",
    name: "Playful Dino Organic Top & Shorts Set",
    description: "Cute two-piece coordinated summer outfit featuring a soft short-sleeve graphic tee and matching pull-on cotton shorts with gentle elastic waistband.",
    price: 849,
    discount: 15,
    category: "clothing",
    imageUrl: "/clothe/clo-1.jpeg",
    images: ["/clothe/clo-1.jpeg", "/clothe/placeholder.png"],
    ageRange: "1-6 years",
    gender: "unisex",
    features: ["Top & Bottom Sets", "Co-ord Set", "Kidoden Top Wear", "Kidoden Bottom Wear", "100% Breathable Organic Cotton", "Comfort Stretch Waistband", "Snug Playtime Fit"],
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 16
  }
];
