import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons/Tag';

/**
 * Blog Tag Schema
 *
 * Unlike categories, tags are freely editable. Editors can create as many
 * tags as needed. Each tag is a full document so it can later carry a slug,
 * description, or icon without touching any post documents.
 */
export const blogTag = defineType({
  name: 'blogTag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  description: 'A topic tag that can be applied to Journal articles.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Tag display name (e.g. "Healthy Living", "Double Filtration").',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description of what this tag represents.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title ?? 'Untitled Tag',
        subtitle: subtitle ? `/${subtitle}` : '',
      };
    },
  },
});
