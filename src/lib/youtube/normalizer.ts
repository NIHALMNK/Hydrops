/**
 * YouTube URL Normalizer
 *
 * Converts any publicly-shared YouTube URL into a clean video ID.
 * Editors can paste any variant and the application handles it correctly.
 *
 * Supported URL formats:
 *   - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *   - https://youtube.com/watch?v=dQw4w9WgXcQ
 *   - https://youtu.be/dQw4w9WgXcQ
 *   - https://www.youtube.com/shorts/dQw4w9WgXcQ
 *   - https://www.youtube.com/embed/dQw4w9WgXcQ
 *
 * Returns null for invalid / unsupported URLs.
 */

const YOUTUBE_PATTERNS: RegExp[] = [
  // Standard watch URL:  youtube.com/watch?v=VIDEO_ID
  /(?:youtube\.com\/watch\?(?:[^&]*&)*v=)([A-Za-z0-9_-]{11})/,
  // Short URL:           youtu.be/VIDEO_ID
  /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
  // Shorts URL:          youtube.com/shorts/VIDEO_ID
  /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  // Embed URL:           youtube.com/embed/VIDEO_ID
  /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
];

/**
 * Extract the YouTube video ID from any supported URL.
 *
 * @param url  Raw URL pasted by an editor.
 * @returns    11-character video ID, or null if the URL is not a valid YouTube URL.
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  for (const pattern of YOUTUBE_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

/**
 * Build a standard YouTube embed URL from any YouTube video URL.
 *
 * @param url  Raw URL pasted by an editor.
 * @returns    YouTube embed URL, or null if the input is invalid.
 */
export function buildYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

/**
 * Build a YouTube thumbnail URL for a given video URL.
 * Tries maxresdefault first; falls back to hqdefault.
 *
 * @param url     Raw YouTube URL.
 * @param quality 'maxres' (1280×720) | 'hq' (480×360). Defaults to 'maxres'.
 */
export function buildYouTubeThumbnailUrl(
  url: string,
  quality: 'maxres' | 'hq' = 'maxres',
): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  const filename = quality === 'maxres' ? 'maxresdefault' : 'hqdefault';
  return `https://i.ytimg.com/vi/${videoId}/${filename}.jpg`;
}
