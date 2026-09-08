import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Article from "@/models/Article";
import { serializeArticle } from "@/lib/queries";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { isValidObjectId } from "mongoose";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await connectToDatabase();
  const doc = await Article.findById(id).lean();
  if (!doc) notFound();

  return <ArticleForm article={serializeArticle(doc)} />;
}
