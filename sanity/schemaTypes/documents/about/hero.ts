import { defineField, defineType } from 'sanity';
import { StarIcon } from '@sanity/icons/Star'; // Using appropriate icons

export const aboutHero = defineType({
  name: 'aboutHero',
  title: 'About - Hero',
  type: 'document',
  icon: StarIcon,
  description: 'The hero section at the top of the About page',
  fields: [
    defineField({ 
      name: 'eyebrow', 
      title: 'Eyebrow', 
      type: 'string',
      description: 'Small text above the headline',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'headline', 
      title: 'Headline', 
      type: 'text', 
      rows: 3,
      description: 'Main heading text',
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'subheadline', 
      title: 'Subheadline', 
      type: 'string',
      description: 'Supporting text below the headline',
    }),
    defineField({ 
      name: 'tagline', 
      title: 'Tagline', 
      type: 'string',
      description: 'Bottom tagline text',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'About Hero',
        subtitle: subtitle || 'Hero Section',
        icon: StarIcon
      };
    }
  }
});
