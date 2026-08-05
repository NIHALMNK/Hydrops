/**
 * Markdown → HTML parser for the Hydrops Journal.
 *
 * Built on the industry-standard remark / rehype pipeline:
 *
 *   remark-parse    — Markdown AST parser (CRITICAL: registered first so processor has parser)
 *   remark-gfm      — GitHub-Flavoured Markdown (tables, task lists, strikethrough)
 *   remark-rehype   — Converts Markdown AST → HTML AST
 *   rehype-slug     — Injects id attributes onto headings
 *   rehype-autolink-headings — Adds anchor links inside headings
 *   rehype-sanitize — Removes dangerous HTML (XSS safe)
 *   rehype-stringify — Serialises HTML AST → HTML string
 *
 * Custom features layered on top:
 *   - Drop-cap on the first lead paragraph
 *   - Cloudinary image replacement (cld:// → res.cloudinary.com)
 *   - Custom :::tip / :::product / :::callout block support
 *   - Plain-text extraction for search indexing
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// ── Cloudinary ────────────────────────────────────────────────────────────────

/**
 * Pre-process Markdown before parsing to:
 *   1. Resolve cld:// image shorthand.
 *   2. Transform custom block directives (:::tip, :::callout, :::product)
 *      into raw HTML divs so rehype-sanitize can allow them via the schema.
 */
function preprocess(markdown: string): string {
  // 1. Resolve Cloudinary shorthand inside image syntax  ![alt](cld://public-id)
  let result = markdown.replace(
    /!\[([^\]]*)\]\(cld:\/\/([^)]+)\)/g,
    (_, alt: string, publicId: string) => {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
      const url = `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${publicId}`;
      return `![${alt}](${url})`;
    },
  );

  // 2. Custom block directives → HTML divs
  result = result.replace(
    /:::(tip|callout|product)\s*\n([\s\S]*?):::/g,
    (_, type: string, content: string) =>
      `<div class="article-block article-block--${type}">\n\n${content.trim()}\n\n</div>`,
  );

  return result;
}

// ── Sanitisation Schema ───────────────────────────────────────────────────────

/**
 * Extend the default rehype-sanitize schema to allow:
 *   - id, class attributes on headings (for anchor links)
 *   - class on <div> (for custom blocks and drop-cap)
 *   - <a> with aria-hidden and aria-label
 */
const sanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: '',
  attributes: {
    ...defaultSchema.attributes,
    // Allow heading ids (injected by rehype-slug)
    h2: ['id', 'className'],
    h3: ['id', 'className'],
    h4: ['id', 'className'],
    // Allow anchor link attributes
    a: [...(defaultSchema.attributes?.a ?? []), 'aria-hidden', 'aria-label', 'tabIndex'],
    // Allow class on div for custom blocks
    div: ['className'],
    // Allow class on span (used for drop-cap)
    span: ['className'],
    // Allow class on code, pre
    code: ['className'],
    pre: ['className'],
  },
};

// ── Parser ────────────────────────────────────────────────────────────────────

/**
 * Build the remark → rehype processing pipeline.
 * Registered in strict order: parser (remarkParse) → GFM → AST conversion → HTML transforms → stringify.
 */
function buildProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-anchor'],
        'aria-label': 'Anchor link',
      },
    })
    .use(rehypeSanitize, sanitizeSchema as Parameters<typeof rehypeSanitize>[0])
    .use(rehypeStringify, { allowDangerousHtml: true });
}

/**
 * Convert a Markdown string to sanitised HTML.
 *
 * @param markdown  Raw Markdown content (may include cld:// shorthand).
 * @returns         Safe HTML string ready for `dangerouslySetInnerHTML`.
 */
export async function parseMarkdownToHtml(markdown: string): Promise<string> {
  const processed = preprocess(markdown);
  const file = await buildProcessor().process(processed);
  return String(file);
}

/**
 * Strip all Markdown syntax and return plain text.
 * Used for building a search index so users can search article content.
 *
 * @param markdown  Raw Markdown content.
 * @returns         Cleaned plain-text string.
 */
export function stripMarkdownToPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')        // fenced code blocks
    .replace(/`[^`]+`/g, '')               // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')       // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → label only
    .replace(/^#{1,6}\s+/gm, '')           // heading markers
    .replace(/[*_~|>]/g, '')               // bold, italic, strikethrough, tables, blockquotes
    .replace(/^[-*+]\s+/gm, '')            // unordered lists
    .replace(/^\d+\.\s+/gm, '')            // ordered lists
    .replace(/\s+/g, ' ')
    .trim();
}
