"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReviewView } from "@/lib/queries";
import { extractYouTubeId } from "@/lib/youtube";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal";
const labelClass = "mb-1 block text-xs font-semibold text-slate-700";

type FormState = {
  name: string;
  role: string;
  initials: string;
  avatarImage: string;
  title: string;
  quote: string;
  youtube: string;
  featured: boolean;
  published: boolean;
  order: number;
};

function fromReview(r?: ReviewView): FormState {
  return {
    name: r?.name ?? "",
    role: r?.role ?? "",
    initials: r?.initials ?? "",
    avatarImage: r?.avatarImage ?? "",
    title: r?.title ?? "",
    quote: r?.quote ?? "",
    youtube: r?.youtube?.watchUrl ?? "",
    featured: r?.featured ?? false,
    published: r?.published ?? true,
    order: r?.order ?? 0,
  };
}

export function ReviewForm({ review }: { review?: ReviewView }) {
  const router = useRouter();
  const editing = !!review;
  const [form, setForm] = useState<FormState>(fromReview(review));
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const previewId = extractYouTubeId(form.youtube);
  const youtubeInvalid = form.youtube.trim() !== "" && !previewId;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFields({});
    setSaving(true);
    try {
      const url = editing ? `/api/admin/reviews/${review!.id}` : "/api/admin/reviews";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        if (data.fields) setFields(data.fields);
        return;
      }
      router.push("/admin/reviews");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{editing ? "Edit Review" : "New Review"}</h2>
        <button
          type="button"
          onClick={() => router.push("/admin/reviews")}
          className="text-xs font-medium text-slate-500 hover:text-slate-900"
        >
          ← Back
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Customer name *</label>
          <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} required />
          {fields.name && <p className="mt-1 text-xs text-red-600">{fields.name}</p>}
        </div>
        <div>
          <label className={labelClass}>Role / context</label>
          <input
            className={inputClass}
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            placeholder="Lab owner · Crown and bridge workflow"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Initials (auto if blank)</label>
          <input className={inputClass} maxLength={4} value={form.initials} onChange={(e) => set("initials", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Avatar image URL</label>
          <input className={inputClass} value={form.avatarImage} onChange={(e) => set("avatarImage", e.target.value)} placeholder="/images/…" />
        </div>
        <div>
          <label className={labelClass}>Sort order</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Card headline</label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Accuracy that supports production"
        />
      </div>

      <div>
        <label className={labelClass}>Review text *</label>
        <textarea className={inputClass} rows={4} value={form.quote} onChange={(e) => set("quote", e.target.value)} required />
        {fields.quote && <p className="mt-1 text-xs text-red-600">{fields.quote}</p>}
      </div>

      <div>
        <label className={labelClass}>YouTube video (URL, embed code, or ID — optional)</label>
        <textarea
          className={inputClass}
          rows={2}
          value={form.youtube}
          onChange={(e) => set("youtube", e.target.value)}
          placeholder="https://www.youtube.com/watch?v=…  or  <iframe …>  or  dQw4w9WgXcQ"
        />
        {youtubeInvalid && (
          <p className="mt-1 text-xs text-red-600">
            Could not detect a YouTube video ID. Paste a valid link/embed or leave blank.
          </p>
        )}
        {fields.youtube && <p className="mt-1 text-xs text-red-600">{fields.youtube}</p>}
        {previewId && (
          <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${previewId}`}
              title="YouTube preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" className="accent-teal h-4 w-4 rounded border-slate-300" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          Published (visible on site)
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" className="accent-teal h-4 w-4 rounded border-slate-300" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          Featured review (main video on the reviews page)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || youtubeInvalid}
          className="rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : editing ? "Save Changes" : "Create Review"}
        </button>
      </div>
    </form>
  );
}
