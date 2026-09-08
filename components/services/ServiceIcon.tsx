import type { ReactElement } from "react";

/** Line-art dental icons ported from the original design-services page. */
const paths: Record<string, ReactElement> = {
  "fixed-prosthesis": (
    <path d="M5 7c2-3 4-3 7-1 3-2 5-2 7 1-1 7-3 12-5 12-1 0-1-4-2-4s-1 4-2 4C8 19 6 14 5 7z" />
  ),
  "digital-dentures": (
    <>
      <path d="M4 10c4-5 12-5 16 0v7c-5 3-11 3-16 0z" />
      <path d="M6 12h12M8 15h8" />
    </>
  ),
  "night-guards-and-splints": (
    <>
      <path d="M4 11c4-5 12-5 16 0l-2 7H6z" />
      <path d="M8 12v3M12 11v4M16 12v3" />
    </>
  ),
  implants: (
    <>
      <path d="M8 4h8l2 5-3 3v8H9v-8L6 9z" />
      <path d="M9 8h6M10 15h4" />
    </>
  ),
  "cosmetic-dentistry": (
    <>
      <path d="M5 8c3-4 11-4 14 0-1 7-4 11-7 11S6 15 5 8z" />
      <path d="M8 10c2 2 6 2 8 0M12 5v3" />
    </>
  ),
  models: <path d="M4 7l8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10" />,
};

export function ServiceIcon({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className={className}
      aria-hidden
    >
      {paths[slug] ?? null}
    </svg>
  );
}
