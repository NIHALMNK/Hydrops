import { defineField, defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';

export const productFaq = defineType({
  name: 'productFaq',
  title: 'Product FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
});
