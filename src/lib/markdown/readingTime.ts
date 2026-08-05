/**
 * Reusable reading-time calculator.
 * Returns a pure number of minutes so the UI can format it however it likes.
 *
 * Examples:
 *   `${readingTime} min read`
 *   `⏱ ${readingTime} min`
 */

const WORDS_PER_MINUTE = 200;

/**
 * Count the number of words in a string after stripping Markdown syntax.
 */
function countWords(text: string): number {
  // Strip common Markdown symbols so they don't inflate word count.
  const plain = text
    .replace(/```[\s\S]*?```/g, '')   // fenced code blocks
    .replace(/`[^`]+`/g, '')          // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')  // images
    .replace(/\[.*?\]\(.*?\)/g, '')   // links — keep the label text
    .replace(/[#*_~|>]/g, '')         // headings, bold/italic, tables, blockquotes
    .replace(/\s+/g, ' ')
    .trim();

  return plain ? plain.split(' ').length : 0;
}

/**
 * Calculate estimated reading time from any plain or Markdown text.
 *
 * @param text  Raw Markdown or plain-text content.
 * @returns     Estimated minutes to read (minimum 1).
 */
export function calculateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Count the exact number of words in a piece of Markdown content.
 * Useful for editorial metadata (word count display in Sanity Studio).
 */
export function countWordsFn(text: string): number {
  return countWords(text);
}
