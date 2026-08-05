import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons/Tag';

/**
 * Blog Category Schema
 *
 * Categories are locked to a predefined set to prevent editorial chaos.
 * Each category carries a colour token and an emoji icon so the UI can
 * render coloured chips automatically without any configuration.
 *
 * Colour tokens map to CSS custom properties defined in tokens.css.
 */

/** Allowed category values — used for the dropdown list. */
const CATEGORY_OPTIONS = [
  { title: 'Recipes', value: 'Recipes' },
  { title: 'Health', value: 'Health' },
  { title: 'Lifestyle', value: 'Lifestyle' },
  { title: 'Production', value: 'Production' },
  { title: 'News', value: 'News' },
] as const;

const COLOUR_OPTIONS = [
  { title: '🍃 Green', value: 'green' },
  { title: '💎 Emerald', value: 'emerald' },
  { title: '✨ Gold', value: 'gold' },
  { title: '🌊 Blue', value: 'blue' },
  { title: '🌸 Rose', value: 'rose' },
  { title: '🪨 Stone', value: 'stone' },
] as const;

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  description: 'Journal content category. Categories are fixed to maintain consistent content organisation.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Category display name.',
      options: {
        list: [...CATEGORY_OPTIONS],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier. Auto-generated from title.',
      options: { source: 'title', maxLength: 32 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short description displayed on the category filter and on the landing page chip tooltip.',
    }),

    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'string',
      description: 'Colour token for category chips and article cards. Applied automatically to the UI.',
      options: {
        list: [...COLOUR_OPTIONS],
        layout: 'radio',
      },
      initialValue: 'stone',
    }),

    defineField({
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'Single emoji displayed on the category chip (e.g. 🥗 for Recipes, 💚 for Health).',
      validation: (Rule) => Rule.max(4),
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'description', colour: 'colour', icon: 'icon' },
    prepare({ title, subtitle, icon }: { title?: string; subtitle?: string; colour?: string; icon?: string }) {
      return {
        title: [icon, title].filter(Boolean).join('  '),
        subtitle: subtitle ?? '',
      };
    },
  },
});
