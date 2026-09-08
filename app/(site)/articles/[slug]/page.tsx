import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getArticlePost, articleCards, type ArticleCard } from "@/lib/data/articles";
import { sanitizeArticleHtml } from "@/lib/content";
import { getArticleBySlug, incrementArticleViews, getPublishedArticles } from "@/lib/queries";
import { ArticleCarousel } from "@/components/articles/ArticleCarousel";

export const dynamic = "force-dynamic";

interface ResolvedPost {
  category: string;
  title: string;
  dek: string;
  meta: string;
  toc: { id: string; label: string }[];
  contentHtml: string;
  imageUrl?: string;
}

function byline(date: string, readDuration: string): string {
  return [date, readDuration].filter(Boolean).join(" · ");
}

async function resolvePost(slug: string): Promise<ResolvedPost | null> {
  // Prefer DB content; fall back to the built-in static article.
  try {
    const doc = await getArticleBySlug(slug);
    if (doc) {
      incrementArticleViews(slug);
      return {
        category: doc.category,
        title: doc.title,
        dek: doc.description,
        meta: byline(doc.date, doc.readDuration),
        toc: doc.toc,
        contentHtml: doc.content,
        imageUrl: doc.imageUrl || undefined,
      };
    }
  } catch {
    // fall through to static
  }

  const staticPost = getArticlePost(slug);
  if (staticPost) {
    const staticCard = articleCards.find((c) => c.slug === slug);
    return {
      category: staticPost.category,
      title: staticPost.title,
      dek: staticPost.description,
      meta: byline(staticPost.date, staticPost.readDuration),
      toc: staticPost.toc,
      contentHtml: staticPost.content,
      imageUrl: staticCard?.imageUrl || undefined,
    };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return {};
  return { title: post.title, description: post.dek };
}

/** Tailwind styling for the admin-authored HTML body — mirrors the previous typed-block look. */
const proseClass =
  "max-w-none text-[1.03rem] text-[#234f4b] " +
  "[&_p]:mb-5 " +
  "[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-[2rem] [&_h2]:font-medium [&_h2]:leading-tight [&_h2]:text-teal " +
  "[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[1.45rem] [&_h3]:font-medium [&_h3]:text-teal " +
  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-[22px] [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-[22px] [&_li]:mb-2 " +
  "[&_blockquote]:my-[38px] [&_blockquote]:rounded-[18px] [&_blockquote]:bg-[linear-gradient(145deg,#f7fdfd,#b8ded8)] [&_blockquote]:p-[30px] [&_blockquote]:text-[1.25rem] [&_blockquote]:text-teal " +
  "[&_a]:text-teal [&_a]:underline [&_strong]:font-semibold " +
  "[&_img]:my-6 [&_img]:rounded-[18px] [&_img]:w-full";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) notFound();

  // Load more articles for the carousel at the bottom
  let moreArticles: ArticleCard[] = [];
  try {
    const published = await getPublishedArticles();
    if (published.length > 0) {
      moreArticles = published
        .filter((a) => a.slug !== slug)
        .map((a) => ({
          slug: a.slug,
          category: a.category,
          readDuration: a.readDuration,
          title: a.title,
          description: a.description,
          imageUrl: a.imageUrl,
        }));
    }
  } catch {
    // fallback to static cards
  }

  // Ensure there are always enough cards to explore in the carousel
  if (moreArticles.length < 4) {
    const existingTitles = new Set([post.title, ...moreArticles.map((m) => m.title)]);
    const fallback = articleCards.filter((c) => !existingTitles.has(c.title));
    moreArticles = [...moreArticles, ...fallback];
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-teal pb-[86px] pt-[72px] text-paper">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="eyebrow capitalize text-aqua">{post.category}</span>
          <h1 className="my-5 max-w-[16ch] text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[1.08] tracking-tight">
            {post.title}
          </h1>
          <p className="max-w-[760px] text-[1.12rem] text-white/82">{post.dek}</p>
          {post.meta && <div className="mt-7 text-[.82rem] text-aqua">{post.meta}</div>}
        </div>
      </section>

      {/* Body + TOC */}
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-[70px] lg:grid-cols-[minmax(0,760px)_280px] lg:gap-[80px] lg:py-[76px]">
        <div className="min-w-0">
          {/* Uploaded cover image inside the article at top, above the introduction */}
          {post.imageUrl && (
            <div className="mb-10 overflow-hidden rounded-[24px] border border-line bg-slate-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="aspect-[16/9] max-h-[480px] w-full object-cover"
              />
            </div>
          )}

          <article
            className={proseClass}
            dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(post.contentHtml) }}
          />
        </div>

        {post.toc.length > 0 && (
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <nav className="rounded-[18px] border border-line bg-paper p-6">
              <b className="mb-3.5 block text-teal">In this article</b>
              {post.toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="block py-2 text-[.88rem] text-[#315f5a] transition-colors hover:text-teal"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>

      {/* Blog Carousel to see more articles */}
      {moreArticles.length > 0 && (
        <ArticleCarousel articles={moreArticles} />
      )}

      {/* CTA */}
      <section className="bg-deep py-[68px] text-paper">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
          <h2 className="max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-tight">
            Ready to submit a cleaner digital case?
          </h2>
          <Button href="/#contact" variant="aqua">
            Start a case →
          </Button>
        </div>
      </section>
    </>
  );
}
