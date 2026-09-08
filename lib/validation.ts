import { z } from "zod";
import { isValidYouTubeInput } from "./youtube";

/** Article categories used by the admin form and listing filter chips. */
export const ARTICLE_CATEGORIES = [
  "clinical",
  "materials",
  "technology",
  "business",
] as const;

/** Article create/update payload (from the admin forms). */
export const articleSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(160),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(400),
  date: z.string().trim().min(1, "Date is required").max(40),
  readDuration: z.string().trim().max(30).optional().default("6 min read"),
  category: z.enum(ARTICLE_CATEGORIES).default("clinical"),
  // Cover image URL (Cloudinary).
  imageUrl: z.string().trim().max(500).optional().default(""),
  // Authored HTML body.
  content: z.string().trim().min(20, "Content must be at least 20 characters"),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
});

export type ArticleInput = z.infer<typeof articleSchema>;

/** Customer review create/update payload. */
export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  role: z.string().trim().max(160).optional().default(""),
  initials: z.string().trim().max(4).optional().default(""),
  avatarImage: z.string().trim().max(500).optional().default(""),
  title: z.string().trim().max(160).optional().default(""),
  quote: z.string().trim().min(5, "Review text must be at least 5 characters").max(1200),
  // Accept URL / embed / id / empty; validated by the YouTube helper.
  youtube: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .default("")
    .refine(isValidYouTubeInput, {
      message: "Enter a valid YouTube URL, embed code, or video ID (or leave blank).",
    }),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  order: z.coerce.number().int().min(0).optional().default(0),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export const loginSchema = z.object({
  // Accepts an email or a plain username, matched against ADMIN_EMAIL.
  email: z.string().trim().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

/** Flatten a ZodError into a { field: message } map for the frontend. */
export function formatZodError(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
