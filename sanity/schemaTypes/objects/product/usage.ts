import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons/Heart';

export const productUsage = defineType({
  name: 'productUsage',
  title: 'Usage & Application',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Application Title',
      type: 'string',
      description: 'e.g. "Culinary & Sautéing", "Oil Pulling (Gandusha)", "Hair & Scalp Elixir"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'How to Use',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name / Emoji',
      type: 'string',
    }),
    defineField({
      name: 'suitabilityTags',
      title: 'Suitable For Badges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Badges like "Vegan", "100% Edible", "Skin Safe", "Raw & Unrefined"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
