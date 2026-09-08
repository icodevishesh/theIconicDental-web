import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CustomerReview from "@/models/CustomerReview";
import { requireAdmin } from "@/lib/auth";
import { reviewSchema, formatZodError } from "@/lib/validation";
import { extractYouTubeId } from "@/lib/youtube";
import { deriveInitials, serializeReview } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const docs = await CustomerReview.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(docs.map(serializeReview));
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

  const parsed = reviewSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: formatZodError(parsed.error) },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const { youtube, ...rest } = parsed.data;
    const youtubeId = extractYouTubeId(youtube) ?? "";

    // Only one review can be the big featured video at a time.
    if (rest.featured) {
      await CustomerReview.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const doc = await CustomerReview.create({
      ...rest,
      initials: rest.initials || deriveInitials(rest.name),
      youtubeId,
    });

    return NextResponse.json(serializeReview(doc.toObject()), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
