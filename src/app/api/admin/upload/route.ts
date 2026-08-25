import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // Validate file type (only allow common image types)
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, GIF, WebP, and SVG are allowed." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Initialize Supabase client
    const supabase = getSupabaseClient();
    const bucketName = process.env.SUPABASE_BUCKET || "product-images";

    // Generate unique name components
    const timestamp = Date.now();
    const lastDotIndex = file.name.lastIndexOf(".");
    const rawBaseName = lastDotIndex !== -1 
      ? file.name.substring(0, lastDotIndex) 
      : file.name;
    const cleanBaseName = rawBaseName.toLowerCase().replace(/[^a-z0-9]/g, "-") || "upload";
    const ext = lastDotIndex !== -1 ? file.name.substring(lastDotIndex).toLowerCase() : "";
    const finalFilename = `uploaded-${timestamp}-${cleanBaseName}${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(finalFilename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return NextResponse.json(
        { error: `Supabase upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Get the public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(finalFilename);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Image upload API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload image. Please try again." },
      { status: 500 }
    );
  }
}
