import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

export const productStorySection = defineType({
  name: 'productStorySection',
  title: 'Craftsmanship Story Section',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Story Heading',
      type: 'string',
      initialValue: 'Crafted with Uncompromising Botanical Heritage',
    }),
    defineField({
      name: 'description',
      title: 'Full Craftsmanship Narrative (Markdown)',
      type: 'text',
      rows: 10,
      description: 'Supports markdown paragraphs, quotes, and bold text.',
    }),
    defineField({
      name: 'storyChapters',
      title: 'Story Chapters / Visual Journey',
      type: 'array',
      of: [{ type: 'productStoryChapter' }],
    }),
    defineField({
      name: 'quote',
      title: 'Featured Botanical Quote (Optional)',
      type: 'string',
    }),
  ],
});
