import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const homeContactCta = defineType({
  name: 'homeContactCta',
  title: 'Home - Contact CTA',
  type: 'document',
  icon: EnvelopeIcon,
  description: 'The final call to action at the bottom of the Home page',
  fields: [
    defineField({
      name: 'label',
      title: 'Label / Eyebrow',
      type: 'string',
      description: 'Small text at the top (e.g., "Hydrops · Pure Coconut Oil")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentHeadline',
      title: 'Accent Headline',
      type: 'string',
      description: 'The italicized/colored part of the headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'button',
    }),
    defineField({
      name: 'tagline',
      title: 'Bottom Tagline',
      type: 'string',
      description: 'Small text appearing at the very bottom',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'cloudinaryImage',
      description: 'The image that appears in the background of this section',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'accentHeadline' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact CTA',
        subtitle: subtitle || 'Call to Action',
        icon: EnvelopeIcon,
      };
    },
  },
});
