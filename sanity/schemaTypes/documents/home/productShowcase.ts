import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons/Package';

export const homeProductShowcase = defineType({
  name: 'homeProductShowcase',
  title: 'Home - Product Showcase',
  type: 'document',
  icon: PackageIcon,
  description: 'A section highlighting a specific product',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small eyebrow text (e.g., "OUR PRODUCT")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productImage',
      title: 'Product Image',
      type: 'cloudinaryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'floatingAsset',
      title: 'Floating Asset (Optional)',
      type: 'cloudinaryImage',
      description: 'Small decorative element floating nearby',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'button',
    }),
    defineField({
      name: 'productReference',
      title: 'Linked Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'The actual product document being showcased',
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return {
        title: title || 'Product Showcase',
        subtitle: 'Product Section',
        icon: PackageIcon,
      };
    },
  },
});
