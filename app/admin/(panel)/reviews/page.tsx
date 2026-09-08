"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ReviewView } from "@/lib/queries";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<ReviewView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/reviews");
        if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
        const data = await res.json();
        if (active) setItems(data);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Failed to load reviews");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function remove(item: ReviewView) {
    if (!confirm(`Delete review from "${item.name}"?`)) return;
    setBusyId(item.id);
    try {
      const res = await fetch(`/api/admin/reviews/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Customer Reviews</h2>
          <p className="text-sm text-slate-500">{items.length} review(s)</p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal/90"
        >
          + New Review
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="py-10 text-center text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-12 text-center text-slate-500">
          No reviews yet. Add your first customer review.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start gap-3">
                {item.youtube ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.youtube.thumbnailUrl}
                    alt=""
                    className="h-14 w-24 flex-none rounded-md border border-slate-200 object-cover"
                  />
                ) : (
                  <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-teal/10 text-sm font-semibold text-teal">
                    {item.initials}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <b className="truncate text-sm text-slate-900">{item.name}</b>
                    {item.featured && <span className="text-xs font-medium text-amber-600">★ Featured</span>}
                    {!item.published && (
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-slate-500">{item.role}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-700">{item.quote}</p>
                  {item.youtube && (
                    <span className="mt-1 inline-block text-[11px] font-medium text-teal">▶ Video review</span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Link
                  href={`/admin/reviews/${item.id}/edit`}
                  className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => remove(item)}
                  disabled={busyId === item.id}
                  className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
