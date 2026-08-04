import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

export const homePhilosophy = defineType({
  name: 'homePhilosophy',
  title: 'Home - Philosophy',
  type: 'document',
  icon: BookIcon,
  description: 'Three-chapter scroll-pinned typography sequence',
  fields: [
    defineField({
      name: 'persistentPhrase',
      title: 'Persistent Phrase',
      type: 'string',
      description: 'The text that stays on screen (e.g., "Every Drop")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      description: 'Exactly 3 chapters for the GSAP scroll sequence',
      validation: (Rule) =>
        Rule.required().length(3).error('The animation requires exactly 3 chapters.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'lines',
              title: 'Lines of Text',
              type: 'array',
              description: 'Standard text lines in this chapter',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'accentLine',
              title: 'Accent Line',
              type: 'string',
              description: 'Optional highlighted text on the last line',
            }),
          ],
          preview: {
            select: { lines: 'lines', accent: 'accentLine' },
            prepare(value: Record<string, any>) {
              const firstLine =
                value.lines && value.lines.length > 0 ? value.lines[0] : 'Untitled Chapter';
              return {
                title: firstLine,
                subtitle: value.accent ? `+ ${value.accent}` : '',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'button',
      description: 'Button appearing in the final chapter',
    }),
  ],
  preview: {
    select: { title: 'persistentPhrase' },
    prepare({ title }) {
      return {
        title: title ? `Philosophy: ${title}` : 'Philosophy Section',
        icon: BookIcon,
      };
    },
  },
});
