import { defineField, defineType } from 'sanity';
import { SparklesIcon } from '@sanity/icons/Sparkles';

export const aboutValues = defineType({
  name: 'aboutValues',
  title: 'About - Values',
  type: 'document',
  icon: SparklesIcon,
  description: 'Core values of the brand',
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'items', title: 'Values' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'header' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, group: 'header' }),
    defineField({
      name: 'items',
      title: 'Values',
      type: 'array',
      group: 'items',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. 01' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Description', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
              title: title ?? 'Untitled',
              subtitle: `Value ${subtitle ?? ''}`,
            })
          }
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return { title: title || 'About Values', subtitle: subtitle || 'Values Section' };
    }
  }
});
