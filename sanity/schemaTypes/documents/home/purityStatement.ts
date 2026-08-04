import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons/Text';

export const homePurityStatement = defineType({
  name: 'homePurityStatement',
  title: 'Home - Purity Statement',
  type: 'document',
  icon: TextIcon,
  description: 'Dark contrast beat with staggered text reveal',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small text at the top',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statements',
      title: 'Statements',
      type: 'array',
      description: 'The large lines of text that stagger in',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'line',
              title: 'Text Line',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'delay',
              title: 'Animation Delay (Seconds)',
              type: 'number',
              description: 'e.g., 0, 0.15, 0.3',
              initialValue: 0,
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'accent',
              title: 'Is Accent Color?',
              type: 'boolean',
              description: 'If true, renders the line in the accent color',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'line', subtitle: 'delay' },
            prepare(value: Record<string, any>) {
              return {
                title: value.title || 'Empty Line',
                subtitle: `Delay: ${value.subtitle}s`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'supportingText',
      title: 'Supporting Text',
      type: 'text',
      description: 'Small text underneath the big statements',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label' },
    prepare({ title }) {
      return {
        title: 'Purity Statement',
        subtitle: title || 'No label',
        icon: TextIcon,
      };
    },
  },
});
