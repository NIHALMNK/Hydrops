import { defineField, defineType } from 'sanity';
import { CheckmarkCircleIcon } from '@sanity/icons/CheckmarkCircle';

export const productTrustSection = defineType({
  name: 'productTrustSection',
  title: 'Trust & Quality Section',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Verified Quality & Certifications',
    }),
    defineField({
      name: 'certifications',
      title: 'Official Quality Certifications',
      type: 'array',
      of: [{ type: 'productCertification' }],
    }),
    defineField({
      name: 'downloads',
      title: 'Downloadable Verification Reports',
      type: 'array',
      of: [{ type: 'productDownload' }],
    }),
  ],
});
