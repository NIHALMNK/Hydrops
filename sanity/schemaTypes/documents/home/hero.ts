import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons/Play';

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Home - Hero',
  type: 'document',
  icon: PlayIcon,
  description: 'The main video hero section at the top of the Home page',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the headline (e.g., "CRYSTAL CLEAR · NATURALLY PURE")',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main heading for the hero section',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Supporting text below the headline',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Direct link to the MP4 video hosted on Cloudinary',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'posterUrl',
      title: 'Poster URL',
      type: 'url',
      description: 'Direct link to the fallback image while the video loads',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'button',
      description: 'The main action button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'button',
      description: 'Optional secondary action button',
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Home Hero',
        subtitle: subtitle || 'Hero Section',
        icon: PlayIcon,
      };
    },
  },
});
