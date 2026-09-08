"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, CTA } from "@/lib/data/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import logo from "@/public/logo.png";

const Chevron = () => (
  <span
    aria-hidden
    className="ml-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rotate-45 border-r-2 border-b-2 border-current"
  />
);

const CaretRight = () => (
  <span aria-hidden className="ml-4 text-current">
    ›
  </span>
);

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* backdrop-filter lives on this inner bar, not on <header>, so the fixed
          mobile menu below is contained by the viewport (not the 74px header). */}
      <div className="border-b border-line bg-paper/95 backdrop-blur-[14px]">
      <div className="mx-auto flex min-h-[74px] max-w-[1200px] items-center justify-between gap-5 px-6">
        <Link href="/" aria-label="Iconic Dental home" className="shrink-0">
          <Image
            src={logo}
            alt="Iconic Dental"
            priority
            className="h-auto w-[114px] mix-blend-multiply"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[30px] lg:flex">
          {navItems.map((item) => {
            const hasMenu = item.menu || item.groups;
            const target = item.target ?? (item.openInNewTab || item.href.startsWith("http") ? "_blank" : undefined);
            const rel = item.rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

            if (!hasMenu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={target}
                  rel={rel}
                  className="text-[.94rem] font-medium text-teal transition-colors hover:text-teal2"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.label} className="group relative py-6">
                <Link
                  href={item.href}
                  target={target}
                  rel={rel}
                  className="inline-flex items-center text-[.94rem] font-medium text-teal transition-colors hover:text-teal2"
                >
                  {item.label}
                  <Chevron />
                </Link>

                {/* Flat menu */}
                {item.menu && (
                  <div className="invisible absolute left-0 top-full grid min-w-[210px] translate-y-2 gap-0.5 rounded-2xl border border-line bg-paper p-2.5 opacity-0 shadow-[var(--shadow-card)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.menu.map((link) => {
                      const linkTarget = link.target ?? (link.openInNewTab || link.href.startsWith("http") ? "_blank" : undefined);
                      const linkRel = link.rel ?? (linkTarget === "_blank" ? "noopener noreferrer" : undefined);
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          target={linkTarget}
                          rel={linkRel}
                          className="block whitespace-nowrap rounded-lg px-3 py-2.5 text-[.94rem] text-teal transition-colors hover:bg-aqua hover:text-teal"
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Nested group menu (Services) */}
                {item.groups && (
                  <div className="invisible absolute left-0 top-full grid min-w-[215px] translate-y-2 gap-0.5 rounded-2xl border border-line bg-paper p-2.5 opacity-0 shadow-[var(--shadow-card)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.groups.map((grp) => (
                      <div key={grp.label} className="group/sub relative">
                        <Link
                          href={grp.href}
                          className="flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-[.94rem] text-teal transition-colors hover:bg-aqua hover:text-teal"
                        >
                          {grp.label}
                          <CaretRight />
                        </Link>
                        <div className="invisible absolute left-[calc(100%+8px)] top-[-10px] grid min-w-[235px] translate-x-2 gap-0.5 rounded-2xl border border-line bg-paper p-2.5 opacity-0 shadow-[var(--shadow-card)] transition-all duration-200 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:translate-x-0 group-focus-within/sub:opacity-100">
                          {grp.children.map((link) => {
                            const linkTarget = link.target ?? (link.openInNewTab || link.href.startsWith("http") ? "_blank" : undefined);
                            const linkRel = link.rel ?? (linkTarget === "_blank" ? "noopener noreferrer" : undefined);
                            return (
                              <Link
                                key={link.label}
                                href={link.href}
                                target={linkTarget}
                                rel={linkRel}
                                className="block whitespace-nowrap rounded-lg px-3 py-2.5 text-[.94rem] text-teal transition-colors hover:bg-aqua hover:text-teal"
                              >
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button href={CTA.href} size="sm">
              {CTA.label} <span aria-hidden>→</span>
            </Button>
          </div>
          <button
            type="button"
            aria-label="Open menu"
            className="flex flex-col gap-[5px] p-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <span className="block h-0.5 w-6 rounded bg-teal" />
            <span className="block h-0.5 w-6 rounded bg-teal" />
            <span className="block h-0.5 w-6 rounded bg-teal" />
          </button>
        </div>
      </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
