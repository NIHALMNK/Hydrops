import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

/**
 * Blog Series Schema
 *
 * A series groups related articles into a coherent narrative arc.
 * Examples: "Purity Explained", "Production Diaries", "Healthy Living"
 *
 * Posts reference a series optionally and specify their part number.
 * This makes multi-part content effortless to manage.
 */
export const blogSeries = defineType({
  name: 'blogSeries',
  title: 'Series',
  type: 'document',
  icon: BookIcon,
  description: 'A named series that groups related Journal articles (e.g. "Production Diaries").',
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
      type: 'string',
      description: 'Display name for the series (e.g. "Purity Explained").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier. Auto-generated from title.',
      options: { source: 'title', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description of what this series covers. Shown on article pages.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'cloudinaryImage',
      description: 'Cover image used when listing all articles in this series.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage',
    },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? 'Untitled Series',
        subtitle: subtitle ?? '',
      };
    },
  },
});
