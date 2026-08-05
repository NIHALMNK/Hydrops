import { defineField, defineType } from 'sanity';
import { SparklesIcon } from '@sanity/icons/Sparkles';

export const productHighlightsSection = defineType({
  name: 'productHighlightsSection',
  title: 'Highlights Section',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'The Key Pillars of Hydrops Purity',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Cards',
      type: 'array',
      of: [{ type: 'productHighlight' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
