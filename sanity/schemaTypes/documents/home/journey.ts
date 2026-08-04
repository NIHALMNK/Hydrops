import { defineField, defineType } from 'sanity';
import { RocketIcon } from '@sanity/icons/Rocket';

export const homeJourney = defineType({
  name: 'homeJourney',
  title: 'Home - Journey',
  type: 'document',
  icon: RocketIcon,
  description: 'The narrative timeline of the product creation process',
  fields: [
    defineField({
      name: 'ambientImage',
      title: 'Ambient Background Image',
      type: 'cloudinaryImage',
      description: 'The background image for the journey section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stages',
      title: 'Journey Stages',
      type: 'array',
      description: 'The individual steps in the journey narrative',
      validation: (Rule) =>
        Rule.required().min(4).error('The UI expects at least 4 journey stages.'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'chapter',
              title: 'Chapter Number',
              type: 'string',
              description: 'e.g., "01", "02"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Stage Title',
              type: 'string',
              description: 'e.g., "Morning."',
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
              title: 'Stage Image',
              type: 'cloudinaryImage',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mood',
              title: 'Mood / Aesthetic Note',
              type: 'string',
              description: 'Short emotive text accompanying the stage',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'chapter' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return {
                title: title ?? 'Unnamed Stage',
                subtitle: subtitle ? `Chapter ${subtitle}` : '',
                icon: RocketIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { stages: 'stages' },
    prepare({ stages }) {
      return {
        title: 'Journey Section',
        subtitle: stages ? `${stages.length} stages` : '0 stages',
        icon: RocketIcon,
      };
    },
  },
});
