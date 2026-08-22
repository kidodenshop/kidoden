import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      description,
      price, // in Rupees
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

    // Convert price to paise
    const priceInPaise = Math.round(parseFloat(price) * 100);
    if (isNaN(priceInPaise) || priceInPaise <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 }
      );
    }

    // Verify product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // Update in transaction
    const updatedProduct = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          name,
          description,
          price: priceInPaise,
          categoryId,
          imageUrl,
          images: images || [imageUrl],
          ageRange: ageRange || null,
          gender: gender || null,
          features: features || [],
          isFeatured: !!isFeatured,
        },
      });

      // Remove previous size stocks
      await tx.inventory.deleteMany({
        where: { productId: id },
      });

      // Insert updated size stocks
      if (inventory && inventory.length > 0) {
        await tx.inventory.createMany({
          data: inventory.map((inv: any) => ({
            productId: id,
            size: inv.size,
            stockQuantity: parseInt(inv.stockQuantity) || 0,
          })),
        });
      }

      return product;
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Product update API error:", error);
    return NextResponse.json(
      { error: "Failed to update product. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if the product was ever ordered to prevent database constraint violations
    const ordersCount = await prisma.orderItem.count({
      where: { productId: id },
    });

    if (ordersCount > 0) {
      return NextResponse.json(
        {
          error:
            "This product cannot be deleted because it is associated with past orders. To hide it from the storefront, set its inventory stocks to 0 or disable 'Featured'.",
        },
        { status: 400 }
      );
    }

    // Delete product (cascade deletes inventory stock rows as defined in schema)
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product deletion API error:", error);
    return NextResponse.json(
      { error: "Failed to delete product. Please try again." },
      { status: 500 }
    );
  }
}
