import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons/Component';

export const productManufacturingSection = defineType({
  name: 'productManufacturingSection',
  title: 'Manufacturing Journey Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'The Art of Cold Extraction',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading',
      type: 'string',
      initialValue: 'From Harvest to Pure Essence',
    }),
    defineField({
      name: 'timeline',
      title: 'Manufacturing Process Timeline Steps',
      type: 'array',
      of: [{ type: 'productProcessStep' }],
    }),
    defineField({
      name: 'closingNote',
      title: 'Closing Note (Optional)',
      type: 'text',
      rows: 2,
    }),
  ],
});
