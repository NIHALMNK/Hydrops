import { defineField, defineType } from 'sanity';
import { SparklesIcon } from '@sanity/icons/Sparkles';

export const homeEveryday = defineType({
  name: 'homeEveryday',
  title: 'Home - Everyday',
  type: 'document',
  icon: SparklesIcon,
  description: 'A 2x2 grid highlighting lifestyle moments',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'headingBlock',
      description: 'The title configuration for the section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineAccent',
      title: 'Headline Accent Text',
      type: 'string',
      description: 'The accented part of the main headline',
    }),
    defineField({
      name: 'moments',
      title: 'Moments Grid',
      type: 'array',
      description: 'The individual cards in the grid',
      validation: (Rule) =>
        Rule.required().length(4).error('The UI requires exactly 4 lifestyle moments.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Moment ID',
              type: 'string',
              description: 'Unique internal ID (e.g., "morning", "kitchen")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Small text on the card (e.g., "Morning")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headline',
              title: 'Card Headline',
              type: 'string',
              description: 'Main text inside the card',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Card Image',
              type: 'cloudinaryImage',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'accent',
              title: 'Accent Note',
              type: 'string',
              description: 'Small highlighted text at the bottom',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'headline' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return {
                title: title ?? 'Unnamed Moment',
                subtitle: subtitle ?? 'No headline',
                icon: SparklesIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading.title' },
    prepare({ title }) {
      return {
        title: title || 'Everyday Section',
        subtitle: 'Everyday Life',
        icon: SparklesIcon,
      };
    },
  },
});
