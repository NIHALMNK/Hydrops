import { defineField, defineType } from 'sanity';
import { MasterDetailIcon } from '@sanity/icons/MasterDetail';

export const productComparisonItem = defineType({
  name: 'productComparisonItem',
  title: 'Comparison Item',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Comparison Parameter',
      type: 'string',
      description: 'e.g. "Color & Clarity", "Extraction Method", "Lauric Acid Content", "Sediment"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftValue',
      title: 'Left Column Value (e.g. Ordinary Coconut Oil)',
      type: 'string',
      description: 'e.g. "Yellowish / Cloudy", "High Heat Expelled", "Suspended Fibers"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rightValue',
      title: 'Right Column Value (e.g. Hydrops Pure Oil)',
      type: 'string',
      description: 'e.g. "Crystal Clear", "Ambient Cold Pressed < 45°C", "Zero Sediment (Double Filtered)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHighlight',
      title: 'Is Major Differentiator?',
      type: 'boolean',
      description: 'Highlight this parameter row in amber',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'rightValue',
    },
  },
});
