"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  tone?: "light" | "dark";
  /** Index open on first render (default: none). */
  defaultOpen?: number;
  className?: string;
}

export function FaqAccordion({
  items,
  tone = "light",
  defaultOpen,
  className = "",
}: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(
    defaultOpen === undefined ? null : defaultOpen,
  );

  const dark = tone === "dark";
  const border = dark ? "border-white/15" : "border-line";
  const qColor = dark ? "text-paper" : "text-teal";
  const aColor = dark ? "text-white/80" : "text-slate";
  const sign = dark ? "text-aqua" : "text-teal2";

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`border-b ${border}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-5 py-6 text-left text-[1.2rem] font-medium ${qColor}`}
            >
              {item.q}
              <span
                className={`flex-none text-[1.4rem] leading-none transition-transform duration-300 ${sign} ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className={`max-w-[70ch] pb-6 text-[.98rem] ${aColor}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
