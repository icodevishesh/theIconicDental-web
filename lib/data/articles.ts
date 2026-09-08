import type { TocEntry } from "@/lib/content";

export interface ArticleCard {
  slug: string;
  /** Category (also the listing filter value). */
  category: string;
  readDuration: string;
  title: string;
  description: string;
  /** Cover image URL (Cloudinary). Empty falls back to a placeholder. */
  imageUrl: string;
}

export const ARTICLE_SLUG = "from-scan-to-approval";

export const featuredArticle = {
  slug: ARTICLE_SLUG,
  meta: ["Technology", "8 min read"],
  title: "From scan to approval: a cleaner digital case workflow.",
  description:
    "A practical framework for submitting complete records, reducing clarification cycles and reaching production-ready approval with fewer delays.",
};

export const articleCards: ArticleCard[] = [
  {
    slug: ARTICLE_SLUG,
    category: "technology",
    readDuration: "8 min read",
    title: "How to submit a production-ready digital case",
    description: "The records, file checks and communication details that help prevent avoidable delays.",
    imageUrl: "",
  },
  {
    slug: ARTICLE_SLUG,
    category: "clinical",
    readDuration: "6 min read",
    title: "Choosing records for predictable crown contacts",
    description: "Why complete adjacent anatomy and a stable bite matter before CAD design begins.",
    imageUrl: "",
  },
  {
    slug: ARTICLE_SLUG,
    category: "clinical",
    readDuration: "9 min read",
    title: "What your lab needs before a full-arch design",
    description: "A checklist for implant components, restorative space, bite records and verification.",
    imageUrl: "",
  },
  {
    slug: ARTICLE_SLUG,
    category: "technology",
    readDuration: "7 min read",
    title: "When to request a design preview",
    description:
      "Cases where approval checkpoints can improve communication and reduce chairside adjustment.",
    imageUrl: "",
  },
  {
    slug: ARTICLE_SLUG,
    category: "business",
    readDuration: "5 min read",
    title: "A practical prescription checklist",
    description: "The small details that give designers clearer direction from the beginning.",
    imageUrl: "",
  },
  {
    slug: ARTICLE_SLUG,
    category: "materials",
    readDuration: "6 min read",
    title: "When a printed model adds value",
    description: "How model-based verification can support complex restorative and appliance cases.",
    imageUrl: "",
  },
];

export const articleFilters = [
  { label: "All", value: "all" },
  { label: "Clinical", value: "clinical" },
  { label: "Materials", value: "materials" },
  { label: "Technology", value: "technology" },
  { label: "Business", value: "business" },
] as const;

export interface ArticlePost {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readDuration: string;
  /** Authored HTML body (with h2 ids). */
  content: string;
  toc: TocEntry[];
}

export const articlePosts: ArticlePost[] = [
  {
    slug: ARTICLE_SLUG,
    category: "technology",
    title: "From scan to approval: a cleaner digital case workflow.",
    description:
      "A practical framework for submitting complete records, reducing clarification cycles and reaching production-ready approval with fewer delays.",
    date: "Aug 12, 2026",
    readDuration: "8 min read",
    toc: [
      { id: "records", label: "Complete records" },
      { id: "bite", label: "Verify the bite" },
      { id: "prescription", label: "Clear prescription" },
      { id: "approval", label: "Design approvals" },
      { id: "handoff", label: "Production handoff" },
      { id: "checklist", label: "Submission checklist" },
    ],
    content: `<p>A predictable digital workflow starts before the file reaches the laboratory. The quality of the scan matters, but completeness, bite stability, prescription clarity and communication are equally important. When those records agree, designers can spend less time resolving uncertainty and more time building the restoration around the intended clinical result.</p>

<blockquote>The fastest case is not simply the fastest scan—it is the case with complete, consistent and clinically useful records.</blockquote>

<h2 id="records">1. Capture the complete restorative record</h2>
<p>For a routine restorative case, submit the prepared arch, the opposing arch and an accurate bite. The preparation margin, adjacent contacts and enough surrounding anatomy for articulation should be clearly recorded. If an area is missing or distorted, rescanning it before submission is usually more efficient than resolving the uncertainty after design begins.</p>
<ul>
  <li>Confirm that every margin is readable.</li>
  <li>Include complete adjacent contact surfaces.</li>
  <li>Scan enough soft tissue and anatomy for orientation.</li>
  <li>Review the file for stitching errors and voids.</li>
</ul>

<h2 id="bite">2. Verify the bite before upload</h2>
<p>A visually clean scan can still produce an unreliable design if the bite is unstable. Check that the arches seat correctly, that the buccal bite contains sufficient anatomy and that the relationship matches the clinical record. For complex or full-arch cases, additional bite records or verification steps may be appropriate.</p>

<h2 id="prescription">3. Write a prescription that answers design questions</h2>
<p>The prescription should state the restoration, material, shade, contacts, occlusal preferences and any case-specific priorities. For implant cases, include the manufacturer, platform, connection, scan body and restorative component details. Photographs are valuable when aesthetic position, tissue contours or tooth character cannot be communicated with text alone.</p>

<h2 id="approval">4. Use approvals where they add value</h2>
<p>Not every case needs a separate design approval. Approval checkpoints are most useful when the restoration changes tooth position, affects the smile design, involves limited restorative space or requires coordination across several implants. A focused approval process should identify the decisions the clinician actually needs to make.</p>

<h2 id="handoff">5. Create a clean handoff to production</h2>
<p>Before approval, review margins, contacts, occlusion, emergence, screw access and overall contour. Consolidated feedback is easier to interpret than several fragmented messages. Once the design is approved, the record should be clear enough that production can proceed without reopening unresolved clinical decisions.</p>

<h2 id="checklist">A concise submission checklist</h2>
<ul>
  <li>Prepared arch or treatment arch</li>
  <li>Opposing arch</li>
  <li>Verified bite record</li>
  <li>Complete prescription</li>
  <li>Shade and photographs where relevant</li>
  <li>Implant component details where applicable</li>
  <li>Requested approval or delivery requirements</li>
</ul>

<p>Digital tools improve speed, but consistency comes from a repeatable clinical and laboratory handoff. A short record review before submission can prevent larger delays later in the workflow.</p>`,
  },
];

export function getArticlePost(slug: string): ArticlePost | undefined {
  return articlePosts.find((a) => a.slug === slug);
}
