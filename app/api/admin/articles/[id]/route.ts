import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Article from "@/models/Article";
import { requireAdmin } from "@/lib/auth";
import { articleSchema, formatZodError } from "@/lib/validation";
import { processArticleHtml, slugify } from "@/lib/content";
import { serializeArticle } from "@/lib/queries";
import { isValidObjectId } from "mongoose";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }
  try {
    await connectToDatabase();
    const doc = await Article.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(serializeArticle(doc));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = articleSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: formatZodError(parsed.error) },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const data = parsed.data;
    const slug = slugify(data.title);

    const clash = await Article.findOne({ slug, _id: { $ne: id } });
    if (clash) {
      return NextResponse.json(
        { error: "An article with a similar title already exists.", fields: { title: "Title already in use" } },
        { status: 409 }
      );
    }

    const { html, toc } = processArticleHtml(data.content);

    const updated = await Article.findByIdAndUpdate(
      id,
      { ...data, slug, content: html, toc },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(serializeArticle(updated));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }
  try {
    await connectToDatabase();
    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
