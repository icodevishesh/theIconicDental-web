import type { ReactElement } from "react";

const thumbs: Record<string, ReactElement> = {
  "1": (
    <svg viewBox="0 0 120 120">
      <path d="M20 30h80v60H20z" fill="none" stroke="#00534c" strokeWidth="5" />
      <path d="M34 74c13-34 39-34 52 0" fill="none" stroke="#74c1b4" strokeWidth="7" />
    </svg>
  ),
  "2": (
    <svg viewBox="0 0 120 120">
      <path d="M30 25h60v70H30z" fill="none" stroke="#00534c" strokeWidth="5" />
      <path d="M44 60h32M60 44v32" stroke="#74c1b4" strokeWidth="7" />
    </svg>
  ),
  "3": (
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="37" fill="none" stroke="#00534c" strokeWidth="5" />
      <path d="M60 30v60M40 46h40M40 74h40" stroke="#74c1b4" strokeWidth="6" />
    </svg>
  ),
  "4": (
    <svg viewBox="0 0 120 120">
      <path d="M24 70c18-40 54-40 72 0" fill="none" stroke="#00534c" strokeWidth="7" />
      <circle cx="40" cy="57" r="8" fill="#74c1b4" />
      <circle cx="60" cy="47" r="8" fill="#74c1b4" />
      <circle cx="80" cy="57" r="8" fill="#74c1b4" />
    </svg>
  ),
  "5": (
    <svg viewBox="0 0 120 120">
      <path d="M26 34h68v52H26z" fill="none" stroke="#00534c" strokeWidth="5" />
      <path d="M38 48h44M38 61h32M38 74h38" stroke="#74c1b4" strokeWidth="5" />
    </svg>
  ),
  "6": (
    <svg viewBox="0 0 120 120">
      <path d="M60 20l34 20v40L60 100 26 80V40z" fill="none" stroke="#00534c" strokeWidth="5" />
      <path d="M26 40l34 20 34-20M60 60v40" stroke="#74c1b4" strokeWidth="5" />
    </svg>
  ),
};

export function ArticleThumb({ variant, className = "" }: { variant: string; className?: string }) {
  return <span className={className}>{thumbs[variant] ?? null}</span>;
}

export function FeaturedThumb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 280" fill="none" className={className}>
      <path d="M55 65h310v150H55z" fill="#f7fdfd" />
      <path d="M95 175c38-98 192-98 230 0" stroke="#00534c" strokeWidth="9" strokeLinecap="round" />
      <circle cx="120" cy="145" r="14" fill="#74c1b4" />
      <circle cx="210" cy="104" r="14" fill="#74c1b4" />
      <circle cx="300" cy="145" r="14" fill="#74c1b4" />
      <path d="M88 202h244" stroke="#00534c" strokeWidth="3" strokeDasharray="9 9" />
    </svg>
  );
}
