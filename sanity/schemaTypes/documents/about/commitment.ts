import { defineField, defineType } from 'sanity';
import { CheckmarkCircleIcon } from '@sanity/icons/CheckmarkCircle';

export const aboutCommitment = defineType({
  name: 'aboutCommitment',
  title: 'About - Commitment',
  type: 'document',
  icon: CheckmarkCircleIcon,
  description: 'Quality commitment and brand pillars',
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'pillars', title: 'Pillars' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'header' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, group: 'header' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, group: 'header' }),
    defineField({ name: 'seal', title: 'Seal Text', type: 'string', description: 'Short text inside the quality seal', group: 'header' }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      group: 'pillars',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. PURITY' }),
            defineField({ name: 'headline', title: 'Headline', type: 'string' }),
            defineField({ name: 'body', title: 'Description', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'headline', subtitle: 'label' },
            prepare: (value: Record<string, any>) => ({ title: value.title || 'Untitled Pillar', subtitle: value.subtitle })
          }
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return { title: title || 'About Commitment', subtitle: subtitle || 'Commitment Section' };
    }
  }
});
