import { NextResponse } from "next/server";
import { getPublishedReviews } from "@/lib/queries";

export const dynamic = "force-dynamic";

/** Public: published customer reviews (with derived YouTube embed info). */
export async function GET() {
  try {
    const reviews = await getPublishedReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
