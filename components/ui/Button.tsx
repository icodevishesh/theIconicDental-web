import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "aqua" | "light" | "ghost" | "ghost-light";
type Size = "xs" | "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const variants: Record<Variant, string> = {
  // Solid teal (default CTA)
  primary: "bg-teal text-paper hover:bg-ink hover:-translate-y-0.5 hover:shadow-[0_14px_26px_-16px_rgba(8,38,35,.8)]",
  // Aqua fill, dark text (used on dark sections)
  aqua: "bg-aqua text-teal hover:bg-paper hover:-translate-y-0.5",
  // Paper fill, dark text (alt button on dark sections)
  light: "bg-paper text-teal hover:bg-aqua hover:-translate-y-0.5",
  // Transparent, dark outline (light backgrounds)
  ghost: "bg-transparent text-teal border border-line hover:border-teal",
  // Transparent, light outline (dark backgrounds)
  "ghost-light":
    "bg-transparent text-paper border border-white/40 hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  xs: "text-[11px] px-3.5 py-1.5",
  sm: "text-[12px] px-5 py-2.5",
  md: "text-sm px-6 py-3.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    const isHash = href.startsWith("#") || href.startsWith("/#");
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") || isHash) {
      return (
        <a
          href={href}
          className={classes}
          {...(external || href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars -- strip non-DOM props from rest */
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
