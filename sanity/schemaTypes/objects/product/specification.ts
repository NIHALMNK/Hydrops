import { defineField, defineType } from 'sanity';
import { OlistIcon } from '@sanity/icons/Olist';

export const productSpecification = defineType({
  name: 'productSpecification',
  title: 'Specification',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Specification Name',
      type: 'string',
      description: 'Name of specification (e.g. "Volume", "Extraction Method", "Smoke Point")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Specification value (e.g. "500 ml", "Cold Expelled < 45°C", "177°C / 350°F")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit (Optional)',
      type: 'string',
      description: 'Optional unit of measurement (e.g. "ml", "g", "°C")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'value',
    },
  },
});
