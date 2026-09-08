"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ArticleView } from "@/lib/queries";
import ImageUploader from "@/components/ImageUploader";
import { ARTICLE_TEMPLATES } from "@/lib/article-templates";

const CATEGORIES = [
  { value: "clinical", label: "Clinical" },
  { value: "materials", label: "Materials" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
];

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal";
const labelClass = "mb-1 block text-xs font-semibold text-slate-700";

type FormState = {
  title: string;
  description: string;
  date: string;
  readDuration: string;
  category: string;
  imageUrl: string;
  content: string;
  featured: boolean;
  published: boolean;
};

function todayLabel(): string {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fromArticle(a?: ArticleView): FormState {
  return {
    title: a?.title ?? "",
    description: a?.description ?? "",
    date: a?.date || todayLabel(),
    readDuration: a?.readDuration || "6 min read",
    category: a?.category ?? "clinical",
    imageUrl: a?.imageUrl ?? "",
    content: a?.content ?? "",
    featured: a?.featured ?? false,
    published: a?.published ?? false,
  };
}

export function ArticleForm({ article }: { article?: ArticleView }) {
  const router = useRouter();
  const editing = !!article;
  const [form, setForm] = useState<FormState>(fromArticle(article));
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  // New articles start on the template picker; editing goes straight to the form.
  const [step, setStep] = useState<"pick-template" | "edit">(editing ? "edit" : "pick-template");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function selectTemplate(html: string) {
    set("content", html);
    setStep("edit");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setFields({});
    setSaving(true);
    try {
      const url = editing ? `/api/admin/articles/${article!.id}` : "/api/admin/articles";
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
      router.push("/admin/articles");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Step 1: template picker ── */
  if (step === "pick-template") {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Choose a template</h2>
            <p className="text-xs text-slate-500">Every article starts from a predefined structure — you can edit the HTML afterwards.</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin/articles")}
            className="text-xs font-medium text-slate-500 hover:text-slate-900"
          >
            ← Back
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {ARTICLE_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => selectTemplate(tpl.html)}
              className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-teal/60 hover:shadow-md"
            >
              <span className="text-3xl">{tpl.icon}</span>
              <div>
                <div className="text-sm font-semibold text-slate-900 group-hover:text-teal">{tpl.name}</div>
                <div className="mt-1 text-xs leading-relaxed text-slate-500">{tpl.tagline}</div>
              </div>
              <div className="mt-auto border-t border-slate-100 pt-3 font-mono text-[10px] leading-relaxed text-slate-400">
                {tpl.preview}
              </div>
              <span className="text-xs font-semibold text-teal">Use this template →</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ── Step 2: article form ── */
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!editing && (
            <button
              type="button"
              onClick={() => setStep("pick-template")}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              aria-label="Back to templates"
            >
              ←
            </button>
          )}
          <h2 className="text-lg font-semibold text-slate-900">{editing ? "Edit Article" : "New Article"}</h2>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="text-xs font-medium text-slate-500 hover:text-slate-900"
        >
          ← All articles
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className={labelClass}>Title *</label>
        <input className={inputClass} value={form.title} onChange={(e) => set("title", e.target.value)} required />
        {fields.title && <p className="mt-1 text-xs text-red-600">{fields.title}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="bg-white text-slate-900">
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date *</label>
          <input className={inputClass} value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="Sep 8, 2026" required />
          {fields.date && <p className="mt-1 text-xs text-red-600">{fields.date}</p>}
        </div>
        <div>
          <label className={labelClass}>Read duration</label>
          <input className={inputClass} value={form.readDuration} onChange={(e) => set("readDuration", e.target.value)} placeholder="6 min read" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description * (shown on cards and the detail hero)</label>
        <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} required />
        {fields.description && <p className="mt-1 text-xs text-red-600">{fields.description}</p>}
      </div>

      <div>
        <label className={labelClass}>Cover image</label>
        <ImageUploader value={form.imageUrl} onChange={(url) => set("imageUrl", url)} />
      </div>

      <div>
        <label className={labelClass}>Content * (HTML supported)</label>
        <textarea
          className={`${inputClass} font-mono text-xs`}
          rows={18}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          Write in HTML. Use <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-800">&lt;h2&gt;</code> for sections (auto table of contents),{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-800">&lt;blockquote&gt;</code> for a pull quote,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-800">&lt;ul&gt;&lt;li&gt;</code> for lists,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-800">&lt;p&gt;</code> for paragraphs.
        </p>
        {fields.content && <p className="mt-1 text-xs text-red-600">{fields.content}</p>}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" className="accent-teal h-4 w-4 rounded border-slate-300" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" className="accent-teal h-4 w-4 rounded border-slate-300" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          Featured (highlighted on the articles page)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : editing ? "Save Changes" : "Create Article"}
        </button>
      </div>
    </form>
  );
}
