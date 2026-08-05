/**
 * src/lib/markdown — Public API
 *
 * Clean barrel export for the Hydrops Markdown engine.
 * Import from '@/lib/markdown' everywhere in the codebase.
 *
 * Usage:
 *   import { parseMarkdownToHtml, extractTableOfContents, calculateReadingTime } from '@/lib/markdown';
 */

export { parseMarkdownToHtml, stripMarkdownToPlainText } from './parser';
export { extractTableOfContents } from './toc';
export type { TableOfContentsItem } from './toc';
export { calculateReadingTime, countWordsFn } from './readingTime';
