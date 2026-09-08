import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";

/**
 * Article model — derived from the public /articles listing and
 * /articles/[slug] detail pages.
 *
 * Editing UX: the admin authors `content` (markdown-lite). On save we derive
 * `body` (block array) + `toc` from it via lib/content.ts so the frontend
 * renders exactly as before.
 */

const TocEntrySchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const ArticleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    // Short summary shown on cards and the detail hero.
    description: { type: String, required: true, trim: true },
    // Human display date, e.g. "Sep 8, 2026".
    date: { type: String, trim: true },
    readDuration: { type: String, default: "6 min read" },
    // Listing filter category.
    category: {
      type: String,
      enum: ["clinical", "materials", "technology", "business"],
      default: "clinical",
    },
    // Cover image URL (Cloudinary) shown on the listing cards and detail hero.
    imageUrl: { type: String, default: "" },
    // Authored HTML body (sanitized, with h2 ids injected on save).
    content: { type: String, default: "" },
    // Table of contents derived from the h2 headings.
    toc: { type: [TocEntrySchema], default: [] },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ArticleDoc = InferSchemaType<typeof ArticleSchema> & { _id: mongoose.Types.ObjectId };

const Article = models.Article || model("Article", ArticleSchema);
export default Article;
