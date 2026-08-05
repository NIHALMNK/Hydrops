import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const productStorageCare = defineType({
  name: 'productStorageCare',
  title: 'Storage & Care',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'temperatureRange',
      title: 'Ideal Temperature Range',
      type: 'string',
      description: 'e.g. "Store below 24°C (75°F) for liquid state, solidifies below 24°C"',
    }),
    defineField({
      name: 'shelfLife',
      title: 'Shelf Life',
      type: 'string',
      description: 'e.g. "24 Months from manufacturing date"',
    }),
    defineField({
      name: 'storageTips',
      title: 'Storage Tips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points for optimal storage (e.g. "Keep away from direct sunlight")',
    }),
    defineField({
      name: 'thingsToAvoid',
      title: 'Things to Avoid',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points for safety (e.g. "Do not introduce wet utensils into jar")',
    }),
    defineField({
      name: 'bestBefore',
      title: 'Best Before Note',
      type: 'string',
      description: 'e.g. "Best consumed within 12 months of opening"',
    }),
  ],
});
