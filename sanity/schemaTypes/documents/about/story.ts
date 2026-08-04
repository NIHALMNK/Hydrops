import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons/Book';

export const aboutStory = defineType({
  name: 'aboutStory',
  title: 'About - Story',
  type: 'document',
  icon: BookIcon,
  description: 'The journey and history of the brand',
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'media', title: 'Media' },
    { name: 'chapters', title: 'Chapters' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'header' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text', rows: 3, group: 'header' }),
    defineField({ name: 'image', title: 'Featured Image', type: 'cloudinaryImage', group: 'media' }),
    defineField({ name: 'imageCaption', title: 'Image Caption', type: 'string', group: 'media' }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      group: 'chapters',
      of: [
        defineField({
          name: 'chapter',
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year or Label', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Story',
        subtitle: subtitle || 'Story Section',
        icon: BookIcon
      };
    }
  }
});
