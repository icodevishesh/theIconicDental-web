/**
 * YouTube helpers.
 *
 * Admins may paste any of: a watch URL, a short youtu.be URL, an /embed URL,
 * a Shorts URL, a raw 11-char video id, or a full <iframe> embed snippet. We
 * extract ONLY the video id and derive safe URLs from it — we never store the
 * raw HTML the admin pasted, which avoids XSS from an injected <iframe>.
 */

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export function extractYouTubeId(input: string | undefined | null): string | null {
  if (!input) return null;
  const value = input.trim();
  if (!value) return null;

  // Already a bare video id.
  if (VIDEO_ID_RE.test(value)) return value;

  // Match the id inside any known YouTube URL shape (also works when the URL is
  // embedded inside an <iframe src="..."> snippet).
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const re of patterns) {
    const match = value.match(re);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function isValidYouTubeInput(input: string | undefined | null): boolean {
  if (input === undefined || input === null || input.trim() === "") return true; // optional
  return extractYouTubeId(input) !== null;
}

export interface YouTubeInfo {
  youtubeId: string;
  embedUrl: string;
  watchUrl: string;
  thumbnailUrl: string;
}

export function buildYouTubeInfo(youtubeId: string | undefined | null): YouTubeInfo | null {
  if (!youtubeId || !VIDEO_ID_RE.test(youtubeId)) return null;
  return {
    youtubeId,
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
  };
}
