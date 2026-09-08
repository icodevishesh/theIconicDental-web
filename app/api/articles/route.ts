import { NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

/** Public: published articles. */
export async function GET() {
  try {
    const articles = await getPublishedArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
