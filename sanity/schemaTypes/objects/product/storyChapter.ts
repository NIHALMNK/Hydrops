import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';

export const productStoryChapter = defineType({
  name: 'productStoryChapter',
  title: 'Story Chapter',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      description: 'e.g. "Coastal Kerala Heritage", "The Cold Expulsion Discipline"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Chapter Narrative',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Chapter Image',
      type: 'cloudinaryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Featured Quote (Optional)',
      type: 'string',
      description: 'e.g. "Heat destroys what nature took months to synthesize."',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image.secureUrl',
    },
  },
});
