/**
 * Article content helpers.
 *
 * Admins author article bodies as HTML (optionally seeded from a template).
 * On save we:
 *   1. sanitize the HTML (strip scripts, event handlers and dangerous URIs), and
 *   2. inject stable `id`s onto every `<h2>` and derive the table of contents
 *      from them, so the detail page can render the HTML directly and still show
 *      an "In this article" sidebar.
 */

export interface TocEntry {
  id: string;
  label: string;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Minimal allowlist-ish sanitizer for admin-authored HTML.
 *
 * Content is only ever written by an authenticated admin, so this is defence in
 * depth rather than an untrusted-input boundary. It removes the common XSS
 * vectors: script/style/iframe/object/embed/form elements, inline event
 * handlers, and `javascript:` / `vbscript:` URIs. It is intentionally simple and
 * regex-based — if we ever accept HTML from untrusted users, swap this for a
 * DOM-based sanitizer.
 */
export function sanitizeArticleHtml(html: string): string {
  if (!html) return "";
  let out = html;

  // Drop dangerous elements together with their contents.
  out = out.replace(
    /<(script|style|iframe|object|embed|form|noscript)\b[\s\S]*?<\/\1>/gi,
    ""
  );
  // Drop dangerous / metadata tags that may not have a closing tag.
  out = out.replace(
    /<\/?(script|style|iframe|object|embed|form|noscript|link|meta|base)\b[^>]*>/gi,
    ""
  );
  // Strip inline event handlers: onClick="…", onerror='…', onload=… .
  out = out.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "");
  out = out.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "");
  // Neutralize script URIs in href/src.
  out = out.replace(
    /\b(href|src)\s*=\s*"(?:\s*(?:javascript|vbscript):[^"]*)"/gi,
    '$1="#"'
  );
  out = out.replace(
    /\b(href|src)\s*=\s*'(?:\s*(?:javascript|vbscript):[^']*)'/gi,
    "$1='#'"
  );

  return out.trim();
}

/**
 * Sanitize authored HTML, ensure every `<h2>` carries a unique id, and build the
 * table of contents from those headings.
 */
export function processArticleHtml(rawHtml: string): { html: string; toc: TocEntry[] } {
  const clean = sanitizeArticleHtml(rawHtml);
  const toc: TocEntry[] = [];
  const usedIds = new Set<string>();

  const uniqueId = (base: string): string => {
    let id = base || "section";
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  };

  const html = clean.replace(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string, inner: string) => {
      const label = inner
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/\s+/g, " ")
        .trim();
      const id = uniqueId(slugify(label));
      // Remove any pre-existing id, then set ours.
      const cleanedAttrs = attrs.replace(/\sid\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
      toc.push({ id, label });
      return `<h2${cleanedAttrs} id="${id}">${inner}</h2>`;
    }
  );

  return { html, toc };
}
