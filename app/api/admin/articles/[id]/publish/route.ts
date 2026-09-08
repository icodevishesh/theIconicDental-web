import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Article from "@/models/Article";
import { requireAdmin } from "@/lib/auth";
import { serializeArticle } from "@/lib/queries";
import { isValidObjectId } from "mongoose";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Toggle published state (or set explicitly via { published: boolean }). */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  let desired: boolean | undefined;
  try {
    const body = await req.json();
    if (typeof body?.published === "boolean") desired = body.published;
  } catch {
    // No body — treat as a toggle.
  }

  try {
    await connectToDatabase();
    const article = await Article.findById(id);
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    article.published = desired ?? !article.published;
    await article.save();

    return NextResponse.json(serializeArticle(article.toObject()));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
