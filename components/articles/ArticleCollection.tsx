"use client";

import { useState } from "react";
import Link from "next/link";
import { articleCards, articleFilters, type ArticleCard } from "@/lib/data/articles";
import { ArticleThumb } from "./ArticleThumb";

export function ArticleCollection({ cards = articleCards }: { cards?: ArticleCard[] }) {
  const [filter, setFilter] = useState<string>("all");
  const visible =
    filter === "all" ? cards : cards.filter((c) => c.category === filter);

  return (
    <>
      <div className="mb-[34px] flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow text-aqua">Article collection</span>
          <h2 className="mt-2.5 text-[clamp(2rem,4vw,3.3rem)] font-medium leading-[1.1] tracking-tight text-teal">
            Explore the latest insights.
          </h2>
        </div>
        <div className="flex w-full overflow-x-auto pb-2 pt-1 gap-2 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:pb-0 sm:pt-0">
          {articleFilters.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-[9px] text-[.75rem] font-semibold transition-colors ${
                  active
                    ? "border-teal bg-teal text-paper"
                    : "border-line bg-transparent text-teal hover:bg-teal hover:text-paper"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={
          visible.length > 3
            ? "flex gap-[22px] overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid-cols-3"
            : "grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {visible.map((card, i) => (
          <Link
            key={`${card.title}-${i}`}
            href={`/articles/${card.slug}`}
            className={`group grad-card-teal overflow-hidden rounded-[21px] text-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] ${
              visible.length > 3
                ? "w-[82%] min-w-[270px] max-w-[320px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
                : ""
            }`}
          >
            <div className="grid h-[205px] place-items-center overflow-hidden bg-[linear-gradient(145deg,#f7fdfd,#b8ded8)]">
              {card.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ArticleThumb variant="1" className="opacity-70 [&_svg]:h-24 [&_svg]:w-24" />
              )}
            </div>
            <div className="p-[25px]">
              <div className="text-[.72rem] capitalize text-paper/80">
                {card.category} · {card.readDuration}
              </div>
              <h3 className="my-3 text-[1.35rem] font-medium">{card.title}</h3>
              <p className="text-[.9rem] text-paper/80">{card.description}</p>
              <span className="mt-3 inline-block text-[.72rem] font-semibold uppercase tracking-[0.08em]">
                Read article →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
