import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

export const productSettings = defineType({
  name: 'productSettings',
  title: 'Product Settings',
  type: 'document',
  icon: CogIcon,
  description: 'Global settings and feature toggles for the Hydrops Product Showcase.',
  fields: [
    defineField({
      name: 'showcaseTitle',
      title: 'Showcase Title',
      type: 'string',
      initialValue: 'Hydrops Flagship Collection',
    }),
    defineField({
      name: 'showcaseEyebrow',
      title: 'Showcase Eyebrow',
      type: 'string',
      initialValue: 'THE PURITY OF EXTRACTION',
    }),
    defineField({
      name: 'showcaseTagline',
      title: 'Showcase Tagline',
      type: 'string',
      initialValue: 'Crafted without heat, chemistry, or compromise.',
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'Contact CTA Headline',
      type: 'string',
      initialValue: 'Experience Authentic Hydrops Purity',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'Contact CTA Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Connect with our team to enquire about bulk orders, institutional supply, or brand partnerships.',
    }),
    defineField({
      name: 'enableSectionNav',
      title: 'Enable Floating Section Navigation',
      type: 'boolean',
      description: 'Show sticky section navigation bar on product pages',
      initialValue: true,
    }),
    defineField({
      name: 'enableAnimation',
      title: 'Enable GSAP Scroll Animations',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showRelatedArticles',
      title: 'Show Related Journal Articles Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'emptyStateText',
      title: 'Empty State Message',
      type: 'string',
      initialValue: 'Our flagship product is currently undergoing seasonal cold pressing. Please check back soon.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Product Settings',
        subtitle: 'Global configuration for Hydrops Product Showcase',
      };
    },
  },
});
