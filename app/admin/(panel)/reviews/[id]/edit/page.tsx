import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import CustomerReview from "@/models/CustomerReview";
import { serializeReview } from "@/lib/queries";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { isValidObjectId } from "mongoose";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await connectToDatabase();
  const doc = await CustomerReview.findById(id).lean();
  if (!doc) notFound();

  return <ReviewForm review={serializeReview(doc)} />;
}
