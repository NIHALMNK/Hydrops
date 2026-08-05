import { defineField, defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';

export const productQuickFact = defineType({
  name: 'productQuickFact',
  title: 'Quick Fact (Frequently Asked Fact)',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question / Characteristic',
      type: 'string',
      description: 'e.g. "Suitable for High Heat Cooking?", "Contains Artificial Fragrance?", "100% Edible?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer / Badge Value',
      type: 'string',
      description: 'e.g. "YES (up to 177°C)", "NO (Zero Additives)", "YES (Food Grade)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPositive',
      title: 'Is Positive / Verified Flag?',
      type: 'boolean',
      description: 'Green checkmark for YES / Positive traits',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
});
