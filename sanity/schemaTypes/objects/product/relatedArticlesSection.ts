import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';

export const productRelatedArticlesSection = defineType({
  name: 'productRelatedArticlesSection',
  title: 'Related Articles Section Settings',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show Related Articles Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Related Insights & Botanical Science',
    }),
    defineField({
      name: 'subtitle',
      title: 'Eyebrow Tagline',
      type: 'string',
      initialValue: 'EXPLORE THE JOURNAL',
    }),
  ],
});
