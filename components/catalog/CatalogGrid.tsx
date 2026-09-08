"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { labProducts, productCategories } from "@/lib/data/products";
import type { ProductCategory } from "@/lib/types";

type Filter = "all" | ProductCategory;

export function CatalogGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? labProducts : labProducts.filter((p) => p.cat === filter)),
    [filter],
  );

  return (
    <>
      <div className="mb-[34px] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow text-teal2">Product range</span>
          <h2 className="mt-2.5 text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-tight text-teal">
            Designed for every case.
          </h2>
        </div>
        <div className="text-[.7rem] uppercase tracking-[0.12em] text-teal">
          {visible.length} products
        </div>
      </div>

      <div className="mb-9 flex w-full overflow-x-auto pb-2 pt-1 gap-2.5 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:pb-0 sm:pt-0">
        {productCategories.map((c) => {
          const active = filter === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              aria-pressed={active}
              className={`shrink-0 whitespace-nowrap rounded-full border px-[18px] py-2.5 text-[.78rem] font-semibold transition-colors ${
                active
                  ? "border-teal bg-teal text-paper"
                  : "border-line bg-transparent text-teal hover:bg-teal hover:text-paper"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        className={
          visible.length > 3
            ? "flex gap-[18px] overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:pt-0 lg:grid-cols-3 xl:grid-cols-4"
            : "grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {visible.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            className={
              visible.length > 3
                ? "w-[80%] min-w-[250px] max-w-[280px] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
                : ""
            }
          />
        ))}
      </div>
    </>
  );
}
