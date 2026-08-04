import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  description: 'The structure and content of the home page',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'story', title: 'Story' },
    { name: 'product', title: 'Product' },
    { name: 'lifestyle', title: 'Lifestyle' },
    { name: 'cta', title: 'CTA' },
  ],
  fieldsets: [
    {
      name: 'storyElements',
      title: 'Story Sections',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'productElements',
      title: 'Product Sections',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'soulStatement',
      title: 'Soul Statement',
      type: 'soulStatement',
      group: 'story',
      fieldset: 'storyElements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'philosophy',
      group: 'story',
      fieldset: 'storyElements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'journey',
      title: 'Coconut Journey',
      type: 'journey',
      group: 'story',
      fieldset: 'storyElements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productShowcase',
      title: 'Product Showcase',
      type: 'productShowcase',
      description: 'Highlighting a specific product',
      group: 'product',
      fieldset: 'productElements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productReference',
      title: 'Linked Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'The actual product document being showcased',
      group: 'product',
      fieldset: 'productElements',
    }),
    defineField({
      name: 'purityStatement',
      title: 'Purity Statement',
      type: 'purityStatement',
      group: 'product',
      fieldset: 'productElements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'craftsmanship',
      title: 'Craftsmanship',
      type: 'craftsmanship',
      group: 'product',
      fieldset: 'productElements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'everyday',
      title: 'Everyday Life',
      type: 'everyday',
      group: 'lifestyle',
      options: { collapsible: true, collapsed: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactCta',
      title: 'Contact CTA',
      type: 'contactCta',
      group: 'cta',
      options: { collapsible: true, collapsed: false },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        icon: HomeIcon,
      };
    },
  },
});
