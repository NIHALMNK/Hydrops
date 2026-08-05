import { defineField, defineType } from 'sanity';
import { TimelineIcon } from '@sanity/icons/Timeline';

export const productProcessStep = defineType({
  name: 'productProcessStep',
  title: 'Manufacturing Process Step',
  type: 'object',
  icon: TimelineIcon,
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      description: 'e.g. "Coastal Kerala Coconut Selection", "Ambient Cold Expulsion", "Double Micro-Filtration"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Step Visual Image',
      type: 'cloudinaryImage',
    }),
    defineField({
      name: 'interestingFact',
      title: 'Interesting Fact / Story Highlight',
      type: 'text',
      rows: 2,
      description: 'e.g. "Each batch undergoes 24 hours of ambient settling before physical cotton filtration."',
    }),
    defineField({
      name: 'estimatedDuration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g. "12 Hours", "24 Hours"',
    }),
  ],
  preview: {
    select: {
      stepNumber: 'stepNumber',
      title: 'title',
      media: 'image.secureUrl',
    },
    prepare({ stepNumber, title, media }) {
      return {
        title: `Step ${stepNumber}: ${title || 'Untitled'}`,
        media,
      };
    },
  },
});
