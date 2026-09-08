import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Article from "@/models/Article";
import { requireAdmin } from "@/lib/auth";
import { articleSchema, formatZodError } from "@/lib/validation";
import { processArticleHtml, slugify } from "@/lib/content";
import { serializeArticle } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const docs = await Article.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(docs.map(serializeArticle));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const existing = await Article.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: "An article with a similar title already exists.", fields: { title: "Title already in use" } },
        { status: 409 }
      );
    }

    const { html, toc } = processArticleHtml(data.content);

    const doc = await Article.create({
      ...data,
      slug,
      content: html,
      toc,
      views: 0,
    });

    return NextResponse.json(serializeArticle(doc.toObject()), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
