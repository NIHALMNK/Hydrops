import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

export const aboutManufacturing = defineType({
  name: 'aboutManufacturing',
  title: 'About - Manufacturing',
  type: 'document',
  icon: CogIcon,
  description: 'Manufacturing philosophy and process stages',
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'stages', title: 'Stages' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'header' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, group: 'header' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3, group: 'header' }),
    defineField({
      name: 'stages',
      title: 'Stages',
      type: 'array',
      group: 'stages',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string', description: 'e.g. 01' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'body', title: 'Description', type: 'text', rows: 4 }),
            defineField({ name: 'image', title: 'Image', type: 'cloudinaryImage' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'step' },
            prepare: (value: Record<string, any>) => ({ title: value.title || 'Untitled Stage', subtitle: `Step ${value.subtitle}` })
          }
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return { title: title || 'About Manufacturing', subtitle: subtitle || 'Manufacturing Section' };
    }
  }
});
