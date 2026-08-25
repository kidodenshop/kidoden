import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price, // in standard Rupees
      discount,
      categoryId,
      imageUrl,
      images,
      ageRange,
      gender,
      features,
      isFeatured,
      inventory, // array of { size: string, stockQuantity: number }
    } = body;

    // Validate required fields
    if (!name || !description || price === undefined || !categoryId || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, price, categoryId, and imageUrl are mandatory." },
        { status: 400 }
      );
    }

    // Convert price to paise (Math.round to prevent float inaccuracy)
    const priceInPaise = Math.round(parseFloat(price) * 100);
    if (isNaN(priceInPaise) || priceInPaise <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 }
      );
    }

    // Resolve categoryId to a database UUID if it is a slug
    let dbCategoryId = categoryId;
    if (categoryId === "clothing" || categoryId === "gifting") {
      const category = await prisma.category.upsert({
        where: { slug: categoryId },
        update: {},
        create: {
          name: categoryId === "clothing" ? "Clothing" : "Gifting",
          slug: categoryId,
        },
      });
      dbCategoryId = category.id;
    }

    // Create product and inventory in a transaction
    const newProduct = await prisma.$transaction(async (tx) => {
      const parsedDiscount = discount !== undefined && discount !== null && discount !== "" ? parseInt(discount) : null;

      const product = await tx.product.create({
        data: {
          name,
          description,
          price: priceInPaise,
          discount: parsedDiscount,
          categoryId: dbCategoryId,
          imageUrl,
          images: images || [imageUrl],
          ageRange: ageRange || null,
          gender: gender || null,
          features: features || [],
          isFeatured: !!isFeatured,
        },
      });

      if (inventory && inventory.length > 0) {
        await tx.inventory.createMany({
          data: inventory.map((inv: any) => ({
            productId: product.id,
            size: inv.size,
            stockQuantity: parseInt(inv.stockQuantity) || 0,
          })),
        });
      }

      return product;
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Product creation API error:", error);
    return NextResponse.json(
      { error: "Failed to create product. Please try again." },
      { status: 500 }
    );
  }
}
