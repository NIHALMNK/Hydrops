import { defineField, defineType } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline';

export const aboutIntroduction = defineType({
  name: 'aboutIntroduction',
  title: 'About - Introduction',
  type: 'document',
  icon: InfoOutlineIcon,
  description: 'Brand Introduction section',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'statistic', title: 'Statistic' },
  ],
  fields: [
    defineField({ 
      name: 'eyebrow', 
      title: 'Eyebrow', 
      type: 'string',
      group: 'content'
    }),
    defineField({ 
      name: 'headline', 
      title: 'Headline', 
      type: 'string',
      group: 'content'
    }),
    defineField({ 
      name: 'body', 
      title: 'Body Paragraphs', 
      type: 'array', 
      of: [{ type: 'text', rows: 3 }],
      group: 'content'
    }),
    defineField({
      name: 'stat',
      title: 'Statistic',
      type: 'object',
      group: 'statistic',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 2x' }),
        defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Double filtered for crystal-clear purity' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Introduction',
        subtitle: subtitle || 'Introduction Section',
        icon: InfoOutlineIcon
      };
    }
  }
});
