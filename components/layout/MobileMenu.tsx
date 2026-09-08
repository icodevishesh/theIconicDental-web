"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, CTA } from "@/lib/data/navigation";
import logo from "@/public/logo.png";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`h-4 w-4 shrink-0 text-teal/70 transition-transform duration-200 ${
      open ? "rotate-180 text-teal2" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
  </svg>
);

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset dropdowns when menu closes so it's clean next time
  useEffect(() => {
    if (!open) {
      setOpenSections({});
    }
  }, [open]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`fixed inset-0 z-[120] flex flex-col overflow-auto bg-paper p-6 transition-transform duration-300 lg:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
    >
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <Image src={logo} alt="Iconic Dental" className="h-auto w-[114px] mix-blend-multiply" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-teal hover:bg-teal/5"
        >
          ×
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col">
        {navItems.map((item) => {
          const isServices = item.groups && item.groups.length > 0;
          const isMenu = item.menu && item.menu.length > 0;
          const target =
            item.target ??
            (item.openInNewTab || item.href.startsWith("http") ? "_blank" : undefined);
          const rel = item.rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

          // 1. SERVICES (Nested groups with sub-dropdowns)
          if (isServices && item.groups) {
            const isServicesOpen = !!openSections[item.label];

            return (
              <div key={item.label} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[1.25rem] font-medium text-teal transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronIcon open={isServicesOpen} />
                </button>

                {isServicesOpen && (
                  <div className="mb-3 flex flex-col gap-2 pl-3">
                    {item.groups.map((grp) => {
                      const isSubOpen = !!openSections[grp.label];

                      return (
                        <div
                          key={grp.label}
                          className="overflow-hidden rounded-xl border border-line/60 bg-teal/[0.02]"
                        >
                          <button
                            type="button"
                            onClick={() => toggleSection(grp.label)}
                            className="flex w-full items-center justify-between px-3.5 py-3 text-left text-[1rem] font-medium text-teal transition-colors hover:bg-teal/[0.04]"
                          >
                            <span>{grp.label}</span>
                            <ChevronIcon open={isSubOpen} />
                          </button>

                          {isSubOpen && (
                            <div className="flex flex-col border-t border-line/40 bg-white/50 px-3.5 py-1.5">
                              {/* Overview link for the category */}
                              <Link
                                href={grp.href}
                                onClick={onClose}
                                className="border-b border-line/30 py-2.5 text-[0.88rem] font-semibold text-teal2 transition-colors hover:text-teal"
                              >
                                View all {grp.label} →
                              </Link>

                              {/* Children links */}
                              {grp.children.map((child) => {
                                const childTarget =
                                  child.target ??
                                  (child.openInNewTab || child.href.startsWith("http")
                                    ? "_blank"
                                    : undefined);
                                const childRel =
                                  child.rel ??
                                  (childTarget === "_blank" ? "noopener noreferrer" : undefined);

                                return (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    target={childTarget}
                                    rel={childRel}
                                    onClick={onClose}
                                    className="border-b border-line/20 py-2.5 text-[0.88rem] text-slate transition-colors hover:text-teal last:border-0"
                                  >
                                    {child.label}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // 2. FLAT DROPDOWNS (Learnings, Quick Links)
          if (isMenu && item.menu) {
            const isDropdownOpen = !!openSections[item.label];

            return (
              <div key={item.label} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[1.25rem] font-medium text-teal transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronIcon open={isDropdownOpen} />
                </button>

                {isDropdownOpen && (
                  <div className="mb-3 flex flex-col rounded-xl border border-line/50 bg-teal/[0.02] px-3.5 py-1">
                    {item.menu.map((sub) => {
                      const subTarget =
                        sub.target ??
                        (sub.openInNewTab || sub.href.startsWith("http") ? "_blank" : undefined);
                      const subRel =
                        sub.rel ?? (subTarget === "_blank" ? "noopener noreferrer" : undefined);

                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          target={subTarget}
                          rel={subRel}
                          onClick={onClose}
                          className="border-b border-line/25 py-2.5 text-[0.92rem] text-slate transition-colors hover:text-teal last:border-0"
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // 3. DIRECT LINKS (About Us, Iconic Connect)
          return (
            <Link
              key={item.label}
              href={item.href}
              target={target}
              rel={rel}
              onClick={onClose}
              className="flex items-center justify-between border-b border-line py-3.5 text-[1.25rem] font-medium text-teal transition-colors hover:text-teal2"
            >
              <span>{item.label}</span>
              {item.openInNewTab && (
                <span className="text-[0.8rem] text-teal/60">↗</span>
              )}
            </Link>
          );
        })}

        {/* Start a case CTA */}
        <Link
          href={CTA.href}
          onClick={onClose}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-paper shadow-md transition-colors hover:bg-ink"
        >
          {CTA.label} →
        </Link>
      </nav>
    </div>
  );
}
