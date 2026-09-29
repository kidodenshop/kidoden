import { NextResponse } from "next/server";
import { getApprovedTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await getApprovedTestimonials(6);
    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.error("Failed to fetch testimonials via API:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
