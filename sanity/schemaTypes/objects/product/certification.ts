import { defineField, defineType } from 'sanity';
import { CheckmarkCircleIcon } from '@sanity/icons/CheckmarkCircle';

export const productCertification = defineType({
  name: 'productCertification',
  title: 'Certification',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      description: 'e.g. "FSSAI Food Safety Certified", "100% Organic Certified", "ISO 22000"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Certification Logo',
      type: 'cloudinaryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Body',
      type: 'string',
      description: 'e.g. "Food Safety and Standards Authority of India"',
    }),
    defineField({
      name: 'verificationUrl',
      title: 'External Verification URL',
      type: 'url',
      description: 'Optional link to official government/agency verification portal',
    }),
    defineField({
      name: 'supportingDocuments',
      title: 'Supporting Documents & PDFs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Document Title', type: 'string' }),
            defineField({ name: 'url', title: 'Document URL / Download Link', type: 'url' }),
            defineField({ name: 'format', title: 'Format', type: 'string', initialValue: 'PDF' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'issuer',
      media: 'logo.secureUrl',
    },
  },
});
