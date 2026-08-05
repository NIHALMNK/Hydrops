import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';

/**
 * Blog Author Schema
 *
 * Separate document so any post can reference an author without
 * duplicating contact details.
 *
 * Fields:
 *   - designation  : editorial title (e.g. "Nutrition Researcher")
 *   - experience   : e.g. "8 years in food science"
 *   - shortBio     : one-liner used in article bylines
 *   - bio          : full bio used on a dedicated author section
 *   - avatar       : profile photo
 *   - linkedin     : LinkedIn profile URL
 *   - website      : personal / company website
 *   - socialLinks  : additional social handles
 */
export const blogAuthor = defineType({
  name: 'blogAuthor',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  description: 'A person who contributes articles to the Hydrops Journal.',
  fields: [
    // ── Identity ────────────────────────────────────────────────────────────

    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Author\'s display name (e.g. "Hydrops Editorial Team").',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier. Auto-generated from name.',
      options: { source: 'name', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'Author\'s editorial title (e.g. "Nutrition Researcher", "Founder", "Food Technologist").',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'string',
      description: 'Brief experience summary shown under the byline (e.g. "8 years in food science").',
    }),

    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'cloudinaryImage',
      description: 'Author\'s profile photo. Used in article bylines and the author section.',
    }),

    // ── Bio ─────────────────────────────────────────────────────────────────

    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 2,
      description: 'One-liner or two-sentence bio used in article byline cards.',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'bio',
      title: 'Full Bio',
      type: 'text',
      rows: 5,
      description: 'Longer author biography displayed in the article footer author section.',
    }),

    // ── Contact & Social ─────────────────────────────────────────────────────

    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      description: 'LinkedIn profile URL.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).custom((val) => {
          if (!val) return true;
          return val.includes('linkedin.com') || 'Please enter a valid LinkedIn URL.';
        }),
    }),

    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'Personal or company website.',
      validation: (Rule) => Rule.uri({ scheme: ['https', 'http'] }),
    }),

    defineField({
      name: 'socialLinks',
      title: 'Other Social Links',
      type: 'array',
      description: 'Additional social media links displayed in the byline.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X / Twitter', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http'] }),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? 'Unnamed Author',
        subtitle: subtitle ?? '',
      };
    },
  },
});
