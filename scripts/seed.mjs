/**
 * Idempotent seed script. Populates the DB from the site's original static
 * content so the DB-driven pages have real data to render.
 *
 *   node --env-file=.env scripts/seed.mjs
 */
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || "iconic-web";
if (!MONGO_URL) {
  console.error("MONGO_URL missing. Run with: node --env-file=.env scripts/seed.mjs");
  process.exit(1);
}

/* ---- inline copy of lib/content parser (keep in sync) ---- */
function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
function parseArticleContent(content) {
  const body = [];
  const toc = [];
  const used = new Set();
  const lines = (content || "").replace(/\r\n/g, "\n").split("\n");
  let list = [];
  const flush = () => {
    if (list.length) {
      body.push({ type: "ul", items: [...list] });
      list = [];
    }
  };
  const uid = (base) => {
    let id = base || "section";
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("- ")) {
      list.push(line.slice(2).trim());
      continue;
    }
    flush();
    if (!line) continue;
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      const id = uid(slugify(text));
      body.push({ type: "h2", id, text });
      toc.push({ id, label: text });
    } else if (line.startsWith("> ")) {
      body.push({ type: "pullquote", text: line.slice(2).trim() });
    } else {
      body.push({ type: "p", text: line });
    }
  }
  flush();
  return { body, toc };
}

const ArticleSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const ReviewSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const articleContent = `A predictable digital workflow starts before the file reaches the laboratory. The quality of the scan matters, but completeness, bite stability, prescription clarity and communication are equally important. When those records agree, designers can spend less time resolving uncertainty and more time building the restoration around the intended clinical result.

> The fastest case is not simply the fastest scan—it is the case with complete, consistent and clinically useful records.

## Capture the complete restorative record

For a routine restorative case, submit the prepared arch, the opposing arch and an accurate bite. The preparation margin, adjacent contacts and enough surrounding anatomy for articulation should be clearly recorded. If an area is missing or distorted, rescanning it before submission is usually more efficient than resolving the uncertainty after design begins.

- Confirm that every margin is readable.
- Include complete adjacent contact surfaces.
- Scan enough soft tissue and anatomy for orientation.
- Review the file for stitching errors and voids.

## Verify the bite before upload

A visually clean scan can still produce an unreliable design if the bite is unstable. Check that the arches seat correctly, that the buccal bite contains sufficient anatomy and that the relationship matches the clinical record. For complex or full-arch cases, additional bite records or verification steps may be appropriate.

## Write a prescription that answers design questions

The prescription should state the restoration, material, shade, contacts, occlusal preferences and any case-specific priorities. For implant cases, include the manufacturer, platform, connection, scan body and restorative component details. Photographs are valuable when aesthetic position, tissue contours or tooth character cannot be communicated with text alone.

## Use approvals where they add value

Not every case needs a separate design approval. Approval checkpoints are most useful when the restoration changes tooth position, affects the smile design, involves limited restorative space or requires coordination across several implants.

## Create a clean handoff to production

Before approval, review margins, contacts, occlusion, emergence, screw access and overall contour. Consolidated feedback is easier to interpret than several fragmented messages. Once the design is approved, the record should be clear enough that production can proceed without reopening unresolved clinical decisions.

## A concise submission checklist

- Prepared arch or treatment arch
- Opposing arch
- Verified bite record
- Complete prescription
- Shade and photographs where relevant
- Implant component details where applicable
- Requested approval or delivery requirements`;

async function run() {
  await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
  const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);
  const CustomerReview =
    mongoose.models.CustomerReview || mongoose.model("CustomerReview", ReviewSchema);

  const { body, toc } = parseArticleContent(articleContent);

  await Article.updateOne(
    { slug: "from-scan-to-approval" },
    {
      $set: {
        slug: "from-scan-to-approval",
        title: "From scan to approval: a cleaner digital case workflow.",
        category: "Digital workflow",
        filter: "digital-workflow",
        readTime: "8 min",
        excerpt:
          "A practical framework for submitting complete records, reducing clarification cycles and reaching production-ready approval with fewer delays.",
        dek: "A practical framework for submitting complete records, reducing clarification cycles and reaching production-ready approval with fewer delays.",
        meta: "Iconic Dental Editorial Team · 8 minute read · Updated August 2026",
        thumb: "1",
        content: articleContent,
        body,
        toc,
        featured: true,
        published: true,
      },
      $setOnInsert: { views: 0 },
    },
    { upsert: true }
  );

  const reviews = [
    {
      name: "Jane Copper",
      role: "Lab Owner",
      initials: "JC",
      title: "Clear communication, every case",
      quote:
        "They pay close attention to detail and keep communication clear, which makes working with Iconic great for our projects.",
      youtubeId: "",
      featured: false,
      published: true,
      order: 1,
    },
    {
      name: "Maria Shaun",
      role: "Ceramist",
      initials: "MS",
      title: "Designs that fit our needs",
      quote:
        "Iconic Dental always gives us designs that fit our needs perfectly. It makes our work easier and more accurate.",
      youtubeId: "",
      featured: false,
      published: true,
      order: 2,
    },
    {
      name: "Jason Bishop",
      role: "Lab Manager",
      initials: "JB",
      title: "Reliable and spot on",
      quote:
        "Working with Iconic helps us deliver top-quality results to our clients because their designs are reliable and spot on.",
      youtubeId: "",
      featured: false,
      published: true,
      order: 3,
    },
  ];

  for (const r of reviews) {
    await CustomerReview.updateOne({ name: r.name, quote: r.quote }, { $set: r }, { upsert: true });
  }

  const articleCount = await Article.countDocuments();
  const reviewCount = await CustomerReview.countDocuments();
  console.log(`Seed complete. Articles: ${articleCount}, Reviews: ${reviewCount}`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error("Seed failed:", err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
