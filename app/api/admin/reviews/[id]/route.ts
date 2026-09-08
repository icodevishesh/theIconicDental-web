import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CustomerReview from "@/models/CustomerReview";
import { requireAdmin } from "@/lib/auth";
import { reviewSchema, formatZodError } from "@/lib/validation";
import { extractYouTubeId } from "@/lib/youtube";
import { deriveInitials, serializeReview } from "@/lib/queries";
import { isValidObjectId } from "mongoose";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
  }
  try {
    await connectToDatabase();
    const doc = await CustomerReview.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Review not found" }, { status: 404 });
    return NextResponse.json(serializeReview(doc));
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
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
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

    if (rest.featured) {
      await CustomerReview.updateMany(
        { featured: true, _id: { $ne: id } },
        { $set: { featured: false } }
      );
    }

    const updated = await CustomerReview.findByIdAndUpdate(
      id,
      {
        ...rest,
        initials: rest.initials || deriveInitials(rest.name),
        youtubeId,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: "Review not found" }, { status: 404 });
    return NextResponse.json(serializeReview(updated));
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
    return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
  }
  try {
    await connectToDatabase();
    const deleted = await CustomerReview.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Review not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Review deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
