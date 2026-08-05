/**
 * Table-of-Contents extractor.
 *
 * Parses H2 (##) and H3 (###) headings from Markdown and returns a
 * clean, structured list of { id, text, level } items.
 *
 * The id is generated with the same algorithm used by rehype-slug
 * (lowercase, non-alphanumeric → hyphen) so that the in-page anchors
 * inserted by the parser match the TOC links exactly.
 */

import GithubSlugger from 'github-slugger';

export interface TableOfContentsItem {
  /** Unique anchor id — matches the id injected on the heading element. */
  id: string;
  /** Raw heading text without Markdown syntax. */
  text: string;
  /** 2 for H2 (##), 3 for H3 (###). */
  level: 2 | 3;
}

/**
 * Extract a structured Table of Contents from Markdown source.
 *
 * Only H2 and H3 headings are extracted; H1 is the article title and
 * H4–H6 are too granular for navigation.
 *
 * @param markdown  Raw Markdown content.
 * @returns         Ordered list of TOC items.
 */
export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  const slugger = new GithubSlugger();
  const items: TableOfContentsItem[] = [];

  // Match ## and ### headings, capturing the level and raw text.
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const hashes = match[1];
    const rawText = match[2].trim();

    // Strip any inline Markdown inside the heading (bold, italic, code, links).
    const plainText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → label
      .replace(/[`*_~]/g, '')                    // bold, italic, code
      .trim();

    const level = hashes.length as 2 | 3;
    const id = slugger.slug(plainText);

    items.push({ id, text: plainText, level });
  }

  return items;
}
