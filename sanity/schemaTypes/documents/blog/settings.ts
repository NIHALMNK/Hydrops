import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

/**
 * Journal Settings Schema (Singleton)
 *
 * A single global settings document for the Journal / Blog feature.
 * Editors can adjust behaviour without any code changes.
 *
 * All values have safe defaults so the Journal works out of the box.
 */
export const blogSettings = defineType({
  name: 'blogSettings',
  title: 'Journal Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Global settings for the Hydrops Journal. Only one settings document should exist.',
  fields: [
    // ── Pagination & Volume ──────────────────────────────────────────────────

    defineField({
      name: 'articlesPerPage',
      title: 'Articles Per Page',
      type: 'number',
      description: 'Number of articles shown per page on the Journal landing page.',
      initialValue: 9,
      validation: (Rule) => Rule.required().integer().min(3).max(30),
    }),

    defineField({
      name: 'latestArticlesCount',
      title: 'Latest Articles Count',
      type: 'number',
      description: 'How many latest articles to load on the landing page grid.',
      initialValue: 12,
      validation: (Rule) => Rule.required().integer().min(3).max(50),
    }),

    defineField({
      name: 'relatedArticlesCount',
      title: 'Related Articles Count',
      type: 'number',
      description: 'Number of related articles shown at the bottom of each article.',
      initialValue: 3,
      validation: (Rule) => Rule.required().integer().min(1).max(6),
    }),

    defineField({
      name: 'defaultSorting',
      title: 'Default Sorting',
      type: 'string',
      description: 'Default sort order for articles on the landing page.',
      options: {
        list: [
          { title: '✨ Pinned & Featured First', value: 'pinnedFirst' },
          { title: '📅 Latest First', value: 'publishedDesc' },
          { title: '⏳ Oldest First', value: 'publishedAsc' },
        ],
        layout: 'radio',
      },
      initialValue: 'pinnedFirst',
      validation: (Rule) => Rule.required(),
    }),

    // ── Feature Flags ────────────────────────────────────────────────────────

    defineField({
      name: 'enableSearch',
      title: 'Enable Search',
      type: 'boolean',
      description: 'Show the search bar on the Journal landing page.',
      initialValue: true,
    }),

    defineField({
      name: 'enableCategories',
      title: 'Enable Category Filter',
      type: 'boolean',
      description: 'Show the category filter chips on the Journal landing page.',
      initialValue: true,
    }),

    defineField({
      name: 'enableTags',
      title: 'Enable Tag Display',
      type: 'boolean',
      description: 'Show article tags on landing page cards and article pages.',
      initialValue: true,
    }),

    defineField({
      name: 'enableNewsletter',
      title: 'Enable Newsletter Section',
      type: 'boolean',
      description: 'Show the newsletter sign-up section on the Journal landing page.',
      initialValue: false,
    }),

    defineField({
      name: 'showYoutubeSection',
      title: 'Show YouTube Section',
      type: 'boolean',
      description: 'Globally enable or disable the YouTube video section on article pages.',
      initialValue: true,
    }),

    // ── Newsletter ───────────────────────────────────────────────────────────

    defineField({
      name: 'newsletterHeadline',
      title: 'Newsletter Headline',
      type: 'string',
      description: 'Headline for the newsletter section (visible when newsletter is enabled).',
      hidden: ({ document }) => !document?.enableNewsletter,
    }),

    defineField({
      name: 'newsletterSubtext',
      title: 'Newsletter Subtext',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the newsletter headline.',
      hidden: ({ document }) => !document?.enableNewsletter,
    }),

    // ── Journal Identity ─────────────────────────────────────────────────────

    defineField({
      name: 'journalTitle',
      title: 'Journal Title',
      type: 'string',
      description: 'Display name of the Journal section (e.g. "Journal", "Blog", "Stories").',
      initialValue: 'Journal',
    }),

    defineField({
      name: 'journalEyebrow',
      title: 'Journal Eyebrow',
      type: 'string',
      description: 'Eyebrow text above the Journal hero heading (e.g. "HYDROPS JOURNAL").',
      initialValue: 'HYDROPS JOURNAL',
    }),

    defineField({
      name: 'journalTagline',
      title: 'Journal Tagline',
      type: 'string',
      description: 'Hero heading on the Journal landing page.',
      initialValue: 'Stories of purity, health, and craft.',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Journal Settings',
        subtitle: 'Global configuration for the Hydrops Journal',
      };
    },
  },
});
