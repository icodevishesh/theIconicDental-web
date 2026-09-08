"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Articles", href: "/admin/articles" },
  { name: "Customer Reviews", href: "/admin/reviews" },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-white py-6 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">
              Admin Panel
            </span>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Iconic Dental</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:inline">{email}</span>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
            >
              View Website
            </Link>
            <button
              onClick={logout}
              disabled={loggingOut}
              className="cursor-pointer rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition-all hover:bg-red-100 disabled:opacity-50"
            >
              {loggingOut ? "Logging out…" : "Log Out"}
            </button>
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-slate-200 pb-4">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "bg-teal text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
