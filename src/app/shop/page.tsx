import type { Metadata } from "next";
import { Category } from "@/data/products";
import { getProducts } from "@/lib/products";
import ShopPageClient from "@/components/ShopPageClient";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; gender?: string; collection?: string; giftType?: string }>;
}): Promise<Metadata> {
  const { category, search, gender, collection, giftType } = await searchParams;
  let title = "Shop";
  let description = "Explore Kidoden's premium collections of baby clothing, accessories, and curated gift boxes.";

  if (search) {
    title = `Search results for "${search}"`;
    description = `Browse items matching "${search}" at Kidoden.`;
  } else if (category === "clothing") {
    if (gender === "boy") {
      title = "Little Gentlemen - Boys Clothing";
      description = "Shop stylish, comfortable and breathable clothing for boys at Kidoden.";
    } else if (gender === "girl") {
      title = "Little Princess - Girls Clothing";
      description = "Shop adorable, soft and elegant dresses & sets for girls at Kidoden.";
    } else {
      title = "Kids Clothing";
      description = "Shop premium, skin-friendly outfits made for little adventures.";
    }
  } else if (category === "gifting") {
    if (giftType === "gift-boxes") {
      title = "Gift Boxes";
      description = "Curated gift boxes packed with love for newborns and toddlers.";
    } else if (giftType === "birthday-gifts") {
      title = "Birthday Gifts";
      description = "Delightful birthday gifts and milestone sets for little ones.";
    } else if (giftType === "baby-shower-gifts") {
      title = "Baby Shower Gifts";
      description = "Thoughtful baby shower gift hampers for welcoming newborns.";
    } else {
      title = "Curated Gift Sets";
      description = "Premium curated gift boxes and hampers for special milestones.";
    }
  } else if (collection) {
    if (collection === "new-arrivals") {
      title = "New Arrivals";
      description = "Discover the newest additions to Kidoden's clothing and gifting collections.";
    } else if (collection === "best-sellers") {
      title = "Best Sellers";
      description = "Explore our most loved and popular kidswear and gift hampers.";
    } else if (collection === "premium-picks") {
      title = "Premium Picks";
      description = "Our finest, high-quality selections for special occasions.";
    }
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Kidoden`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} | Kidoden`,
      description,
    },
  };
}

function parseAgeRange(rangeStr: string): [number, number] | null {
  const s = rangeStr.toLowerCase();
  if (s.includes("newborn")) {
    if (s.includes("6")) return [0, 0.5];
    if (s.includes("12")) return [0, 1];
    return [0, 0.5];
  }
  const matches = s.match(/(\d+)\s*-\s*(\d+)/);
  if (matches) {
    return [parseInt(matches[1]), parseInt(matches[2])];
  }
  return null;
}

const filterRanges: Record<string, [number, number]> = {
  "newborn-6": [0, 0.5],
  "newborn-12": [0, 1],
  "0-1": [0, 1],
  "1-3": [1, 3],
  "3-5": [3, 5],
  "5-7": [5, 7],
  "7-12": [7, 12]
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; gender?: string; age?: string; collection?: string; giftType?: string }>;
}) {
  const { category, search, gender, age, collection, giftType } = await searchParams;

  const validCategories: Category[] = ["clothing", "gifting"];
  const isValidCategory = category && validCategories.includes(category as Category);

  const products = await getProducts();
  let displayedProducts = products;

  if (search) {
    const s = search.toLowerCase();
    displayedProducts = displayedProducts.filter(
      p => p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  } else if (isValidCategory) {
    displayedProducts = displayedProducts.filter((p) => p.category === category);
  }

  // Gender filter
  if (gender) {
    displayedProducts = displayedProducts.filter(
      (p) => p.gender === gender || p.gender === "unisex"
    );
  }

  // Age group filter
  if (age) {
    const selectedRange = filterRanges[age];
    if (selectedRange) {
      displayedProducts = displayedProducts.filter((p) => {
        if (!p.ageRange) return false;
        const pRange = parseAgeRange(p.ageRange);
        if (!pRange) return false;
        return pRange[0] <= selectedRange[1] && selectedRange[0] <= pRange[1];
      });
    }
  }

  // Collection filter
  if (collection) {
    if (collection === "new-arrivals") {
      displayedProducts = displayedProducts.filter((p) => p.isFeatured === true);
    } else if (collection === "best-sellers") {
      const bestSellerIds = ["c-1", "c-2", "g-1", "g-3"];
      displayedProducts = displayedProducts.filter((p) => bestSellerIds.includes(p.id));
    } else if (collection === "premium-picks") {
      // Premium Picks: price >= 1000 INR
      displayedProducts = displayedProducts.filter((p) => p.price >= 1000);
    } else if (collection === "summer-collection") {
      displayedProducts = displayedProducts.filter(
        (p) => p.category === "clothing" && (p.description.toLowerCase().includes("summer") || p.description.toLowerCase().includes("sunshine") || p.description.toLowerCase().includes("sunny"))
      );
    } else if (collection === "matching-outfits") {
      displayedProducts = displayedProducts.filter(
        (p) => p.category === "clothing" && p.description.toLowerCase().includes("set")
      );
    }
  }

  // Gift type filter
  if (giftType) {
    displayedProducts = displayedProducts.filter((p) => p.category === "gifting");
    if (giftType === "gift-boxes") {
      displayedProducts = displayedProducts.filter((p) => p.id === "g-2" || p.id === "g-3");
    } else if (giftType === "birthday-gifts") {
      displayedProducts = displayedProducts.filter((p) => p.id === "g-2" || p.id === "g-3");
    } else if (giftType === "baby-shower-gifts") {
      displayedProducts = displayedProducts.filter((p) => p.id === "g-1" || p.id === "g-2");
    }
  }

  return (
    <ShopPageClient
      products={products}
      displayedProducts={displayedProducts}
      category={category}
      gender={gender}
      age={age}
      collection={collection}
      giftType={giftType}
      search={search}
    />
  );
}
