import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

export const homeSoulStatement = defineType({
  name: 'homeSoulStatement',
  title: 'Home - Soul Statement',
  type: 'document',
  icon: ImageIcon,
  description: 'Full-screen pinned background statement section',
  fields: [
    defineField({
      name: 'background',
      title: 'Background Image',
      type: 'cloudinaryImage',
      description: 'The stationary background layer image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label / Watermark',
      type: 'string',
      description: 'Large subtle watermark text (e.g., "HYDROPS")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'First part of the statement',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentHeadline',
      title: 'Accent Headline',
      type: 'string',
      description: 'Highlighted second part of the statement',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'accentHeadline' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Soul Statement',
        subtitle: subtitle || '',
        icon: ImageIcon,
      };
    },
  },
});
