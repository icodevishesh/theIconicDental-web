"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { ArticleCard } from "@/lib/data/articles";
import { ArticleThumb } from "./ArticleThumb";

interface ArticleCarouselProps {
  articles: ArticleCard[];
  title?: string;
  eyebrow?: string;
  lead?: string;
}

export function ArticleCarousel({
  articles,
  title = "More articles to explore",
  eyebrow = "Iconic Learnings",
  lead = "Explore practical guides, CAD insights, and digital dental laboratory workflow strategies.",
}: ArticleCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = Math.min(el.clientWidth * 0.85, 420);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t border-line bg-paper py-[70px] md:py-[88px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow text-aqua">{eyebrow}</span>
            <h2 className="mt-2.5 text-[clamp(2rem,3.8vw,3.2rem)] font-medium leading-[1.12] tracking-tight text-teal">
              {title}
            </h2>
            {lead && <p className="mt-2 max-w-[620px] text-[1.02rem] text-slate">{lead}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous articles"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-teal shadow-sm transition-all hover:border-teal hover:bg-teal hover:text-paper disabled:pointer-events-none disabled:opacity-35"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next articles"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-teal shadow-sm transition-all hover:border-teal hover:bg-teal hover:text-paper disabled:pointer-events-none disabled:opacity-35"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((article, i) => (
            <Link
              key={`${article.slug}-${article.title}-${i}`}
              href={`/articles/${article.slug}`}
              className="group flex w-[290px] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] grad-card-teal text-paper shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover sm:w-[340px] md:w-[370px]"
            >
              <div className="relative grid h-[200px] place-items-center overflow-hidden bg-[linear-gradient(145deg,#f7fdfd,#b8ded8)]">
                {article.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ArticleThumb
                    variant={String((i % 6) + 1)}
                    className="opacity-70 [&_svg]:h-24 [&_svg]:w-24 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute left-3.5 top-3.5 rounded-full border border-aqua/30 bg-teal/85 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-aqua backdrop-blur-md">
                  {article.category}
                </span>
                {article.readDuration && (
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-ink/70 px-2.5 py-1 text-[0.7rem] text-paper/90 backdrop-blur-md">
                    {article.readDuration}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-[1.24rem] font-medium leading-snug tracking-tight text-paper transition-colors group-hover:text-aqua">
                  {article.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 text-[0.88rem] leading-relaxed text-paper/80">
                  {article.description}
                </p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aqua">
                    <span>Read article</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
