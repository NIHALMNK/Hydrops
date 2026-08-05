import { defineField, defineType } from 'sanity';
import { MasterDetailIcon } from '@sanity/icons/MasterDetail';

export const productTechnicalProfileSection = defineType({
  name: 'productTechnicalProfileSection',
  title: 'Technical Profile Section',
  type: 'object',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Technical Profile & Storage Guidelines',
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications List',
      type: 'array',
      of: [{ type: 'productSpecification' }],
    }),
    defineField({
      name: 'storageCare',
      title: 'Storage & Care Guidelines',
      type: 'productStorageCare',
    }),
  ],
});
