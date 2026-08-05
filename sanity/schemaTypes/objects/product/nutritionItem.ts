import { defineField, defineType } from 'sanity';
import { ThListIcon } from '@sanity/icons/ThList';

export const productNutritionItem = defineType({
  name: 'productNutritionItem',
  title: 'Nutrition Item',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Nutrient Name',
      type: 'string',
      description: 'e.g. "Lauric Acid (C12)", "Caprylic Acid (C8)", "Energy", "Total Fat"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountPer100ml',
      title: 'Amount Per 100ml / 100g',
      type: 'string',
      description: 'e.g. "50.2 g", "862 kcal", "7.8 g"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountPerServing',
      title: 'Amount Per Serving (Optional)',
      type: 'string',
      description: 'e.g. "130 kcal (per 15ml tbsp)"',
    }),
    defineField({
      name: 'dailyValue',
      title: '% Daily Value (Optional)',
      type: 'string',
      description: 'e.g. "72%"',
    }),
    defineField({
      name: 'isSubNutrient',
      title: 'Is Sub-Nutrient?',
      type: 'boolean',
      description: 'If checked, indents item under parent nutrient (e.g., Lauric Acid under Saturated Fat)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'amountPer100ml',
    },
  },
});
