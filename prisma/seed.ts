import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { products } from "../src/data/products";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding started...");

  // 1. Create categories
  const clothingCategory = await prisma.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: { name: "Clothing", slug: "clothing" },
  });

  const giftingCategory = await prisma.category.upsert({
    where: { slug: "gifting" },
    update: {},
    create: { name: "Gifting", slug: "gifting" },
  });

  console.log("Categories created/upserted.");

  // 2. Create products and inventory
  for (const product of products) {
    const categoryId = product.category === "clothing" ? clothingCategory.id : giftingCategory.id;

    // Convert price to paise (multiply by 100)
    const priceInPaise = Math.round(product.price * 100);

    // Upsert product
    const createdProduct = await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        description: product.description,
        price: priceInPaise,
        imageUrl: product.imageUrl,
        images: product.images || [],
        ageRange: product.ageRange || null,
        gender: product.gender || null,
        features: product.features || [],
        isFeatured: product.isFeatured || false,
        rating: product.rating || 0,
        reviewsCount: product.reviewsCount || 0,
        categoryId: categoryId,
      },
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: priceInPaise,
        imageUrl: product.imageUrl,
        images: product.images || [],
        ageRange: product.ageRange || null,
        gender: product.gender || null,
        features: product.features || [],
        isFeatured: product.isFeatured || false,
        rating: product.rating || 0,
        reviewsCount: product.reviewsCount || 0,
        categoryId: categoryId,
      },
    });

    console.log(`Product upserted: ${createdProduct.name}`);

    // 2b. Seed review records matching the seeded rating/count stats
    if (product.rating && product.reviewsCount) {
      const count = product.reviewsCount;
      const ratingsDistribution = [5, 5, 5, 4, 5, 4, 5]; 
      const authorNames = ["Anjali S.", "Rohan M.", "Sneha P.", "Karan J.", "Vikram Y.", "Nisha T.", "Deepak C.", "Pooja V.", "Rahul D.", "Aishwarya G."];
      const comments = [
        "Absolutely beautiful product! Highly recommend the quality.",
        "Good quality fabric and very comfortable for the little one.",
        "Perfect size and super cute design. Will purchase again.",
        "Pretty good quality, though delivery was delayed by a day.",
        "Excellent quality, matches the description completely!",
        "My children loved the comfort, very soft material.",
        "Very nice fit, exactly as shown in the picture catalog."
      ];

      for (let i = 0; i < count; i++) {
        const reviewRating = ratingsDistribution[i % ratingsDistribution.length];
        const comment = comments[i % comments.length];
        const authorName = authorNames[i % authorNames.length];
        const dateOffset = i * 6 * 60 * 60 * 1000; 

        await prisma.review.upsert({
          where: {
            id: `seed-rev-${product.id}-${i}`
          },
          update: {
            rating: reviewRating,
            comment,
            authorName,
            isApproved: true,
            createdAt: new Date(Date.now() - dateOffset)
          },
          create: {
            id: `seed-rev-${product.id}-${i}`,
            productId: createdProduct.id,
            rating: reviewRating,
            comment,
            authorName,
            isApproved: true,
            createdAt: new Date(Date.now() - dateOffset)
          }
        });
      }
    }

    // 3. Seed sizes and stock quantities
    let sizes: string[] = [];
    if (product.category === "clothing") {
      if (product.ageRange && product.ageRange.includes("2-8")) {
        sizes = ["2-3 Years", "3-4 Years", "5-6 Years", "7-8 Years"];
      } else if (product.ageRange && product.ageRange.includes("3-10")) {
        sizes = ["3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years"];
      } else if (product.ageRange && product.ageRange.includes("4-10")) {
        sizes = ["4-5 Years", "6-7 Years", "8-9 Years", "9-10 Years"];
      } else {
        sizes = ["2-4 Years", "4-6 Years", "6-8 Years"];
      }
    } else {
      sizes = ["Standard"];
    }

    for (const size of sizes) {
      const stockQuantity = Math.floor(Math.random() * 14) + 2; // Stock from 2 to 15

      await prisma.inventory.upsert({
        where: {
          productId_size: {
            productId: createdProduct.id,
            size: size,
          },
        },
        update: {
          stockQuantity: stockQuantity,
        },
        create: {
          productId: createdProduct.id,
          size: size,
          stockQuantity: stockQuantity,
        },
      });
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
