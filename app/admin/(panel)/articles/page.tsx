"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ArticleView } from "@/lib/queries";

export default function AdminArticlesPage() {
  const [items, setItems] = useState<ArticleView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/articles");
        if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
        const data = await res.json();
        if (active) setItems(data);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Failed to load articles");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function togglePublish(item: ArticleView) {
    setBusyId(item.id);
    try {
      const res = await fetch(`/api/admin/articles/${item.id}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(item: ArticleView) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setBusyId(item.id);
    try {
      const res = await fetch(`/api/admin/articles/${item.id}`, { method: "DELETE" });
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
          <h2 className="text-lg font-semibold text-slate-900">Articles</h2>
          <p className="text-sm text-slate-500">{items.length} article(s)</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-teal px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal/90"
        >
          + New Article
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
          No articles yet. Create your first article.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Featured</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/60">
                  <td className="py-3 pr-4">
                    <div className="font-medium text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-400">/{item.slug}</div>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{item.category}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        item.published
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-amber-600">{item.featured ? "★" : "—"}</td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => togglePublish(item)}
                        disabled={busyId === item.id}
                        className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
                      >
                        {item.published ? "Unpublish" : "Publish"}
                      </button>
                      <Link
                        href={`/admin/articles/${item.id}/edit`}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
