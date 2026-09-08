import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  /** Heading content — wrap the emphasized part in <span className="accent">. */
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** Colour scheme of the surrounding section. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`max-w-[66ch] ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      <span className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2
        className={`mt-4 mb-4 text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.08] tracking-tight ${
          tone === "dark" ? "text-paper" : "text-teal"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`text-[1.08rem] ${
            tone === "dark" ? "text-paper/85" : "text-slate"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
