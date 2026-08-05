import { defineField, defineType } from 'sanity';
import { BulbOutlineIcon } from '@sanity/icons/BulbOutline';

export const productFeature = defineType({
  name: 'productFeature',
  title: 'Product Feature / Benefit',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name / Emoji',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
