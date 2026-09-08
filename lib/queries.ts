import { connectToDatabase } from "./db";
import Article from "@/models/Article";
import CustomerReview from "@/models/CustomerReview";
import { buildYouTubeInfo, type YouTubeInfo } from "./youtube";
import type { TocEntry } from "./content";

/** Plain, serializable article shape returned to the frontend. */
export interface ArticleView {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readDuration: string;
  category: string;
  imageUrl: string;
  /** Authored HTML body (sanitized, with h2 ids). */
  content: string;
  toc: TocEntry[];
  featured: boolean;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewView {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarImage: string;
  title: string;
  quote: string;
  youtubeId: string;
  youtube: YouTubeInfo | null;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const VALID_CATEGORIES = new Set(["clinical", "materials", "technology", "business"]);

function formatDisplayDate(value: unknown): string {
  if (!value) return "";
  const d = new Date(value as string);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeArticle(doc: any): ArticleView {
  const category = VALID_CATEGORIES.has(doc.category) ? doc.category : "clinical";
  // Legacy rows stored the cover under `thumb`; only reuse it if it's a URL.
  const legacyImage = typeof doc.thumb === "string" && /^https?:\/\//.test(doc.thumb) ? doc.thumb : "";
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? doc.excerpt ?? "",
    date: doc.date ?? formatDisplayDate(doc.createdAt),
    readDuration: doc.readDuration ?? doc.readTime ?? "",
    category,
    imageUrl: doc.imageUrl ?? legacyImage,
    content: doc.content ?? "",
    toc: (doc.toc ?? []).map((t: TocEntry) => ({ id: t.id, label: t.label })),
    featured: !!doc.featured,
    published: !!doc.published,
    views: doc.views ?? 0,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeReview(doc: any): ReviewView {
  const initials = doc.initials || deriveInitials(doc.name || "");
  return {
    id: doc._id.toString(),
    name: doc.name,
    role: doc.role ?? "",
    initials,
    avatarImage: doc.avatarImage ?? "",
    title: doc.title ?? "",
    quote: doc.quote,
    youtubeId: doc.youtubeId ?? "",
    youtube: buildYouTubeInfo(doc.youtubeId),
    featured: !!doc.featured,
    published: doc.published !== false,
    order: doc.order ?? 0,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : "",
  };
}

/* ------------------------- Public read helpers ------------------------- */

export async function getPublishedArticles(): Promise<ArticleView[]> {
  await connectToDatabase();
  const docs = await Article.find({ published: true }).sort({ createdAt: -1 }).lean();
  return docs.map(serializeArticle);
}

export async function getFeaturedArticle(): Promise<ArticleView | null> {
  await connectToDatabase();
  const doc =
    (await Article.findOne({ published: true, featured: true }).sort({ createdAt: -1 }).lean()) ||
    (await Article.findOne({ published: true }).sort({ createdAt: -1 }).lean());
  return doc ? serializeArticle(doc) : null;
}

export async function getArticleBySlug(slug: string): Promise<ArticleView | null> {
  await connectToDatabase();
  const doc = await Article.findOne({ slug, published: true }).lean();
  return doc ? serializeArticle(doc) : null;
}

export async function incrementArticleViews(slug: string): Promise<void> {
  try {
    await connectToDatabase();
    await Article.updateOne({ slug, published: true }, { $inc: { views: 1 } });
  } catch {
    // Non-critical — never block the page render on a view count.
  }
}

export async function getPublishedReviews(): Promise<ReviewView[]> {
  await connectToDatabase();
  const docs = await CustomerReview.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return docs.map(serializeReview);
}
