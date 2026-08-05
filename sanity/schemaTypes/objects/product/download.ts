import { defineField, defineType } from 'sanity';
import { DownloadIcon } from '@sanity/icons/Download';

export const productDownload = defineType({
  name: 'productDownload',
  title: 'Downloadable Document',
  type: 'object',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'e.g. "Hydrops Product Brochure 2026", "Third-Party Laboratory Purity Analysis"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brochure', value: 'brochure' },
          { title: 'Lab Report', value: 'lab-report' },
          { title: 'Certificate', value: 'certificate' },
          { title: 'Specification Sheet', value: 'spec-sheet' },
        ],
      },
      initialValue: 'brochure',
    }),
    defineField({
      name: 'url',
      title: 'File URL / External Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'File Format',
      type: 'string',
      initialValue: 'PDF',
    }),
    defineField({
      name: 'version',
      title: 'Document Version',
      type: 'string',
      description: 'e.g. "v2.1"',
    }),
    defineField({
      name: 'updatedDate',
      title: 'Last Updated Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
