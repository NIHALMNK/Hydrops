import { defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons/Star';

export const productHeroSection = defineType({
  name: 'productHeroSection',
  title: 'Hero Section',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'FLAGSHIP BOTANICAL EXTRACTION',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main product showcase headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Primary Hero Bottle Image',
      type: 'cloudinaryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary Showcase Image (Optional)',
      type: 'cloudinaryImage',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Explore Purity',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Secondary Button Label',
      type: 'string',
      initialValue: 'Discover the Process',
    }),
  ],
});
