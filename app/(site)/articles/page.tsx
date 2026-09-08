import type { Metadata } from "next";
import Link from "next/link";
import {
  featuredArticle as staticFeatured,
  articleCards as staticCards,
  type ArticleCard,
} from "@/lib/data/articles";
import { FeaturedThumb } from "@/components/articles/ArticleThumb";
import { ArticleCollection } from "@/components/articles/ArticleCollection";
import { getPublishedArticles, getFeaturedArticle } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Dental Lab Articles",
  description:
    "Practical digital dentistry, CAD design and dental laboratory workflow insights for dentists and laboratory teams.",
};

// Content is DB-driven, so render at request time.
export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  let cards: ArticleCard[] = staticCards;
  let featured = {
    slug: staticFeatured.slug,
    meta: staticFeatured.meta as string[],
    title: staticFeatured.title,
    excerpt: staticFeatured.description,
    imageUrl: "",
  };

  try {
    const [articles, featuredDoc] = await Promise.all([
      getPublishedArticles(),
      getFeaturedArticle(),
    ]);

    if (articles.length > 0) {
      cards = articles.map((a) => ({
        slug: a.slug,
        category: a.category,
        readDuration: a.readDuration,
        title: a.title,
        description: a.description,
        imageUrl: a.imageUrl,
      }));
    }

    if (featuredDoc) {
      featured = {
        slug: featuredDoc.slug,
        meta: [featuredDoc.category, featuredDoc.readDuration].filter(Boolean),
        title: featuredDoc.title,
        excerpt: featuredDoc.description,
        imageUrl: featuredDoc.imageUrl || "",
      };
    }
  } catch {
    // DB unavailable — fall back to the built-in static content.
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-teal py-[70px] text-paper md:py-[86px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <span className="eyebrow text-aqua">Iconic Learnings</span>
          <h1 className="my-[18px] max-w-[13ch] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.08] tracking-tight">
            Ideas for better digital dentistry.
          </h1>
          <p className="max-w-[650px] text-[1.06rem] text-white/80">
            Practical guidance for dentists and dental laboratories—from cleaner scan records and
            predictable CAD approvals to full-arch planning and efficient production workflows.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-paper pb-[38px] pt-[70px] md:pt-[78px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <Link
            href={`/articles/${featured.slug}`}
            className="group grid min-h-[470px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#10977f,#00534c)] text-paper shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover md:grid-cols-[1.08fr_.92fr]"
          >
            <div className="relative grid place-items-center overflow-hidden bg-[linear-gradient(145deg,#d8f0ec,#74c1b4)]">
              {featured.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="h-full min-h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:min-h-full"
                />
              ) : (
                <div className="grid place-items-center p-[42px]">
                  <FeaturedThumb className="h-auto w-[min(440px,90%)] transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-[34px] md:p-[58px]">
              <div className="flex flex-wrap gap-3.5 text-[.7rem] uppercase tracking-[0.1em] text-[#c9eee8]">
                {featured.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <h2 className="my-[18px] text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-tight">
                {featured.title}
              </h2>
              <p className="text-white/80">{featured.excerpt}</p>
              <span className="mt-[18px] inline-flex w-fit items-center gap-2 rounded-full bg-aqua px-5 py-3 font-semibold text-teal transition-all group-hover:brightness-105">
                Read the article →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Collection */}
      <section className="bg-paper pb-24 pt-[52px]">
        <div className="mx-auto max-w-[1200px] px-6">
          <ArticleCollection cards={cards} />
        </div>
      </section>
    </>
  );
}
