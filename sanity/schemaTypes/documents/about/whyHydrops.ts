import { defineField, defineType } from 'sanity';
import { ThumbsUpIcon } from '@sanity/icons/ThumbsUp';

export const aboutWhyHydrops = defineType({
  name: 'aboutWhyHydrops',
  title: 'About - Why Hydrops',
  type: 'document',
  icon: ThumbsUpIcon,
  description: 'Why choose Hydrops section',
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'items', title: 'Reasons' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'header' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, group: 'header' }),
    defineField({
      name: 'items',
      title: 'Reasons',
      type: 'array',
      group: 'items',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. 01' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'body', title: 'Description', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
            prepare: (value: Record<string, any>) => ({ title: value.title || 'Untitled', subtitle: `Reason ${value.subtitle}` })
          }
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return { title: title || 'Why Hydrops', subtitle: subtitle || 'Why Hydrops Section' };
    }
  }
});
