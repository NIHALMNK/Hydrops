import { defineField, defineType } from 'sanity';
import { EyeOpenIcon } from '@sanity/icons/EyeOpen';

export const aboutMission = defineType({
  name: 'aboutMission',
  title: 'About - Mission',
  type: 'document',
  icon: EyeOpenIcon,
  description: 'The brand mission statement',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Mission',
        subtitle: subtitle || 'Mission Section',
        icon: EyeOpenIcon
      };
    }
  }
});
