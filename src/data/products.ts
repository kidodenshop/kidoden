export type Category = 'clothing' | 'jewellery' | 'nails';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  ageRange?: string;
  features: string[];
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "c-1",
    name: "Mickey Friends Cartoon Vest",
    description: "A fun and breezy sleeveless vest featuring Mickey, Donald & Pluto. Perfect for casual summer days.",
    price: 599,
    category: "clothing",
    imageUrl: "/clothe/clo-1.jpeg",
    ageRange: "2-8 years",
    features: ["100% Breathable Cotton", "Machine Washable", "Skin-friendly dyes"],
    isFeatured: true
  },
  {
    id: "c-2",
    name: "Princess Sequin Party Dress",
    description: "A stunning white sequin dress with layered organza skirt and butterfly wings. Made for little princesses.",
    price: 1499,
    category: "clothing",
    imageUrl: "/clothe/clo-2.jpeg",
    ageRange: "3-10 years",
    features: ["Premium Organza", "Comfortable fit", "Includes butterfly wings"],
    isFeatured: true
  },
  {
    id: "c-3",
    name: "Mini Style Plaid Skirt Set",
    description: "A trendy navy top with layered plaid skirt — your little one will be the most stylish at any party.",
    price: 899,
    category: "clothing",
    imageUrl: "/clothe/clo-3.jpeg",
    ageRange: "4-10 years",
    features: ["Soft Cotton Blend", "Tag-less design", "Relaxed fit"]
  },
  {
    id: "c-4",
    name: "Blue Bow Lace Skirt Set",
    description: "A sweet blue ribbon top paired with a delicate lace layered skirt. Effortlessly cute for any occasion.",
    price: 799,
    category: "clothing",
    imageUrl: "/clothe/clo-4.jpeg",
    ageRange: "2-8 years",
    features: ["Soft Cotton", "Machine washable", "Comfortable fit"]
  },
  {
    id: "c-5",
    name: "Yellow Sunshine Lace Set",
    description: "A cheerful yellow ribbon top with a beautiful lace layered skirt. Perfect for sunny outings.",
    price: 849,
    category: "clothing",
    imageUrl: "/clothe/clo-5.jpeg",
    ageRange: "2-8 years",
    features: ["Breathable fabric", "Machine washable", "Comfortable fit"]
  },
  {
    id: "j-1",
    name: "Sparkle Butterfly Pendant",
    description: "A delicate, child-safe silver-plated butterfly pendant with soft enamel coloring.",
    price: 399,
    category: "jewellery",
    imageUrl: "/jewellery/jew-1.jpeg",
    ageRange: "5-15 years",
    features: ["Hypoallergenic", "Adjustable chain length", "Nickel-free"],
    isFeatured: true
  },
  {
    id: "j-2",
    name: "Unicorn Charm Bracelet",
    description: "A magical charm bracelet featuring unicorns, stars, and rainbow colored beads.",
    price: 449,
    category: "jewellery",
    imageUrl: "/jewellery/jew-2.jpeg",
    ageRange: "4-12 years",
    features: ["Stretchable string", "Child-safe beads", "Choking hazard: Not for under 3 yrs"]
  },
  {
    id: "j-3",
    name: "Princess Tiara Headband",
    description: "A sparkling tiara headband adorned with crystals and pearls. Perfect for little princesses.",
    price: 599,
    category: "jewellery",
    imageUrl: "/jewellery/jew-3.jpeg",
    ageRange: "3-10 years",
    features: ["Comfortable fit", "Non-slip", "Durable materials"]
  },
  {
    id: "n-1",
    name: "Rainbow Magic Stick-on Nails",
    description: "A set of 24 cute, non-toxic stick-on nails for kids. No glue required, safe and easy to remove.",
    price: 249,
    category: "nails",
    imageUrl: "/nails/nails-1.jpeg",
    ageRange: "6-15 years",
    features: ["Non-toxic adhesive", "Peel-off removal", "Water resistant"]
  },
  {
    id: "n-2",
    name: "Glitter Glam Press-On Nails",
    description: "Sparkling press-on nails for a dazzling look. Easy to apply and remove, perfect for parties.",
    price: 299,
    category: "nails",
    imageUrl: "/nails/nails-2.jpeg",
    ageRange: "7-16 years",
    features: ["Pre-glued", "Reusable", "Variety of sizes"]
  },
  {
    id: "n-3",
    name: "Magical Unicorn Nail Wraps",
    description: "Fun and whimsical unicorn-themed nail wraps. A quick and creative way to decorate nails.",
    price: 199,
    category: "nails",
    imageUrl: "/nails/nails-3.jpeg",
    ageRange: "5-14 years",
    features: ["Easy application", "No drying time", "Gentle on nails"]
  },
  {
    id: "n-4",
    name: "Ocean Breeze Nail Polish Set",
    description: "A set of vibrant, water-based nail polishes in ocean-inspired colors. Non-toxic and peelable.",
    price: 349,
    category: "nails",
    imageUrl: "/nails/nail-4.jpeg",
    ageRange: "3-12 years",
    features: ["Water-based formula", "Non-toxic", "Peel-off removal"]
  },
  {
    id: "n-5",
    name: "Princess Crown Nail Stickers",
    description: "Adorable crown and princess-themed nail stickers. Perfect for little princesses everywhere.",
    price: 179,
    category: "nails",
    imageUrl: "/nails/nails-5.jpeg",
    ageRange: "4-12 years",
    features: ["Self-adhesive", "Waterproof", "Easy to remove"]
  },
  {
    id: "n-6",
    name: "Starlight Sparkle Nail Kit",
    description: "Complete nail kit with star and moon designs. Includes everything needed for a magical manicure.",
    price: 399,
    category: "nails",
    imageUrl: "/nails/nails-6.jpeg",
    ageRange: "6-14 years",
    features: ["Complete kit", "Child-safe", "Multi-use"]
  },
  {
    id: "n-7",
    name: "Floral Fantasy Nail Art",
    description: "Beautiful flower and butterfly nail art designs. Perfect for spring and summer fun.",
    price: 279,
    category: "nails",
    imageUrl: "/nails/nails-7.jpeg",
    ageRange: "5-15 years",
    features: ["Hand-painted designs", "Durable", "Gentle adhesive"]
  },
];
