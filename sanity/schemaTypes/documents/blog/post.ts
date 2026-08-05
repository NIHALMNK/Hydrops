import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { calculateReadingTime, countWordsFn } from '@/lib/markdown/readingTime';

/**
 * Blog Post (Journal Article) Schema
 *
 * Design principles:
 *   - Editors fill only essential fields; all presentation is automatic.
 *   - Reading time, TOC, anchor IDs, and related articles are application-generated.
 *   - Status uses a 4-state editorial workflow: draft → review → published → archived.
 *   - isFeatured / isPinned give editors two levels of prominence control.
 *   - Visibility toggles (hideToc, hideVideo, hideRelated) avoid dev intervention for edge cases.
 *
 * Field order mirrors a natural writing workflow:
 *   1. Content identity  (title, slug, author, category, status)
 *   2. Visual           (featured image)
 *   3. Content          (excerpt, featured quote, markdown body)
 *   4. Discovery        (tags, series)
 *   5. Publishing       (publish date, featured, pinned, YouTube)
 *   6. Display options  (hide toggles)
 *   7. SEO
 */
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  description: 'A Journal article. Reading time, TOC, and related articles are generated automatically.',
  fields: [
    // ── Identity ────────────────────────────────────────────────────────────

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The article headline displayed on the landing page and article page.',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path (auto-generated). Example: /blog/how-coconut-oil-helps-hair',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      description: 'Who wrote this article? Create authors in Journal → Authors.',
      to: [{ type: 'blogAuthor' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      description: 'Primary category for this article.',
      to: [{ type: 'blogCategory' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'editorialStatus',
      title: 'Editorial Status',
      type: 'string',
      description: 'Workflow status. Use "Review" when the article is ready for editorial review before publishing.',
      options: {
        list: [
          { title: '✏️  Draft', value: 'draft' },
          { title: '🔍  Review', value: 'review' },
          { title: '✅  Published', value: 'published' },
          { title: '📦  Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    // ── Visual ──────────────────────────────────────────────────────────────

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'cloudinaryImage',
      description: 'Hero image used on the landing page card and article header. Include descriptive alt text.',
      validation: (Rule) => Rule.required(),
    }),

    // ── Content ─────────────────────────────────────────────────────────────

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Two or three sentences summarising the article. Shown on landing page cards and in SEO descriptions.',
      validation: (Rule) => Rule.required().min(40).max(300),
    }),

    defineField({
      name: 'featuredQuote',
      title: 'Featured Quote',
      type: 'text',
      rows: 2,
      description: 'Optional pull quote displayed beautifully inside the article (e.g. "Purity is never an accident.").',
    }),

    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'text',
      description: 'Full article in Markdown format. Supports headings (##, ###), bold, italic, lists, tables, blockquotes, images, and code blocks.',
      rows: 40,
      validation: (Rule) => Rule.required().min(100),
    }),

    defineField({
      name: 'estimatedReadTimeOverride',
      title: 'Estimated Read Time Override (minutes)',
      type: 'number',
      description: 'Optional manual override for reading time in minutes. Leave blank to auto-calculate from content.',
      validation: (Rule) => Rule.integer().min(1).max(60),
    }),

    // ── Discovery ───────────────────────────────────────────────────────────

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Topic tags for search and filtering. Create new tags in Journal → Tags.',
      of: [{ type: 'reference', to: [{ type: 'blogTag' }] }],
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      description: 'Optional: link this article to a series (e.g. "Production Diaries"). Create series in Journal → Series.',
      to: [{ type: 'blogSeries' }],
    }),

    defineField({
      name: 'partNumber',
      title: 'Part Number',
      type: 'number',
      description: 'If part of a series, specify the part number (e.g. 1 for "Part 1").',
      hidden: ({ document }) => !document?.series,
      validation: (Rule) => Rule.integer().min(1),
    }),

    // ── Publishing ──────────────────────────────────────────────────────────

    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      description: 'The date this article was (or will be) published.',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15 },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Mark as the featured hero article on the Journal landing page. Only one article should be featured at a time.',
      initialValue: false,
    }),

    defineField({
      name: 'isPinned',
      title: 'Pinned',
      type: 'boolean',
      description: 'Pin this article to always appear near the top of the article grid regardless of publish date.',
      initialValue: false,
    }),

    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video (optional)',
      type: 'url',
      description: 'Paste any YouTube URL (youtu.be, watch?v=, or shorts). A premium video section is automatically added below the article. Leave empty to hide.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https', 'http'] }).custom((val) => {
          if (!val) return true;
          const isYoutube =
            typeof val === 'string' &&
            (val.includes('youtube.com') || val.includes('youtu.be'));
          return isYoutube || 'Please enter a valid YouTube URL.';
        }),
    }),

    // ── Display Options ──────────────────────────────────────────────────────

    defineField({
      name: 'hideToc',
      title: 'Hide Table of Contents',
      type: 'boolean',
      description: 'Hide the auto-generated Table of Contents sidebar for this article.',
      initialValue: false,
    }),

    defineField({
      name: 'hideVideo',
      title: 'Hide Video Section',
      type: 'boolean',
      description: 'Hide the YouTube video section even if a YouTube URL is set.',
      initialValue: false,
    }),

    defineField({
      name: 'hideRelated',
      title: 'Hide Related Articles',
      type: 'boolean',
      description: 'Hide the "You may also like" related articles section for this article.',
      initialValue: false,
    }),

    // ── SEO ─────────────────────────────────────────────────────────────────

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Search engine optimisation settings. Leave empty to auto-generate from title and excerpt.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Override the page <title>. Defaults to article title if left empty.',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Override the meta description. Defaults to excerpt if left empty.',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'socialImage',
          title: 'Social Image',
          type: 'cloudinaryImage',
          description: 'Image used when the article is shared on social media. Defaults to featured image.',
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Set only if this article was originally published elsewhere.',
        }),
        defineField({
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Prevent search engines from indexing this article.',
          initialValue: false,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
      publishDate: 'publishDate',
      content: 'content',
      editorialStatus: 'editorialStatus',
    },
    prepare({
      title,
      categoryTitle,
      publishDate,
      content,
      editorialStatus,
    }: {
      title?: string;
      categoryTitle?: string;
      publishDate?: string;
      content?: string;
      editorialStatus?: string;
    }) {
      const readingTime = content ? calculateReadingTime(content) : 0;
      const wordCount = content ? countWordsFn(content) : 0;

      const statusEmoji: Record<string, string> = {
        draft: '✏️',
        review: '🔍',
        published: '✅',
        archived: '📦',
      };

      const formattedDate = publishDate
        ? new Date(publishDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'No date';

      return {
        title: title ?? 'Untitled Article',
        subtitle: [
          editorialStatus ? statusEmoji[editorialStatus] : null,
          categoryTitle,
          readingTime > 0 ? `${readingTime} min read` : null,
          wordCount > 0 ? `${wordCount.toLocaleString()} words` : null,
          formattedDate,
        ]
          .filter(Boolean)
          .join('  ·  '),
      };
    },
  },
});
