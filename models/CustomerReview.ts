import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";

/**
 * Customer review / testimonial — derived from the /customer-reviews page
 * (featured video + video grid) and the home Testimonials section.
 *
 * A review may be text-only (quote), video (YouTube) or both. We store only the
 * sanitized `youtubeId`; embed URLs are derived at read time (lib/youtube.ts),
 * never raw HTML pasted by the admin.
 */

const CustomerReviewSchema = new Schema(
  {
    // Customer identity.
    name: { type: String, required: true, trim: true },
    // Role / context line, e.g. "Lab owner · Crown and bridge workflow".
    role: { type: String, trim: true, default: "" },
    // Avatar initials (auto-derived from name when blank).
    initials: { type: String, trim: true, default: "" },
    // Optional avatar image URL/path.
    avatarImage: { type: String, trim: true, default: "" },

    // Short card headline, e.g. "Accuracy that supports production".
    title: { type: String, trim: true, default: "" },
    // The review body / quote.
    quote: { type: String, required: true, trim: true },

    // Sanitized YouTube video id (empty string when text-only).
    youtubeId: { type: String, trim: true, default: "" },

    // The single large "featured video review" on the reviews page.
    featured: { type: Boolean, default: false },
    // Whether it is visible on the public site.
    published: { type: Boolean, default: true },
    // Manual ordering (ascending) for the grid.
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type CustomerReviewDoc = InferSchemaType<typeof CustomerReviewSchema> & {
  _id: mongoose.Types.ObjectId;
};

const CustomerReview =
  models.CustomerReview || model("CustomerReview", CustomerReviewSchema);
export default CustomerReview;
