import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const productCtaSection = defineType({
  name: 'productCtaSection',
  title: 'Contact CTA Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'CTA Headline',
      type: 'string',
      initialValue: 'Experience Authentic Hydrops Purity',
    }),
    defineField({
      name: 'description',
      title: 'CTA Description Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        'Connect with our team to enquire about bulk orders, institutional supply, or brand partnerships.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Enquire Now / Contact Us',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Primary Button Target URL',
      type: 'string',
      initialValue: '/contact',
    }),
  ],
});
