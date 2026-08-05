import { defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons/Star';

export const productHighlight = defineType({
  name: 'productHighlight',
  title: 'Product Highlight',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Highlight title (e.g. "Crystal Clear", "100% Pure")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short explanation of this highlight',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name / Emoji',
      type: 'string',
      description: 'Icon identifier or emoji (e.g. "sparkles", "droplet", "shield", "leaf", "✨")',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Optional accent color (e.g. "gold", "amber", "emerald", "stone")',
      options: {
        list: [
          { title: 'Gold', value: 'gold' },
          { title: 'Amber', value: 'amber' },
          { title: 'Emerald', value: 'emerald' },
          { title: 'Stone', value: 'stone' },
        ],
      },
      initialValue: 'amber',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
