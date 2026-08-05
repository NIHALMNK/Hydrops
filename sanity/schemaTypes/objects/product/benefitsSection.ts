import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons/Heart';

export const productBenefitsSection = defineType({
  name: 'productBenefitsSection',
  title: 'Benefits & Everyday Uses Section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Benefits & Everyday Uses',
    }),
    defineField({
      name: 'benefits',
      title: 'Physiological Health Benefits',
      type: 'array',
      of: [{ type: 'productFeature' }],
    }),
    defineField({
      name: 'uses',
      title: 'Daily Application Rituals & Uses',
      type: 'array',
      of: [{ type: 'productUsage' }],
    }),
  ],
});
