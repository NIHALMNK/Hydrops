import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const aboutCompanyInfo = defineType({
  name: 'aboutCompanyInfo',
  title: 'About - Company Information',
  type: 'document',
  icon: HomeIcon,
  description: 'Company contact details, location, and CTA buttons',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'contact', title: 'Contact' },
    { name: 'address', title: 'Address' },
    { name: 'business', title: 'Business' },
    { name: 'map', title: 'Map' },
    { name: 'buttons', title: 'Buttons' },
  ],
  fields: [
    // General
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'general' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'general' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'general' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', group: 'general' }),
    defineField({ name: 'legalName', title: 'Legal Name', type: 'string', group: 'general' }),
    defineField({ name: 'founded', title: 'Founded', type: 'string', description: 'e.g. 2020', group: 'general' }),
    defineField({ name: 'origin', title: 'Origin', type: 'string', description: 'e.g. Kerala, India', group: 'general' }),

    // Contact
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact', validation: Rule => Rule.email() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),

    // Address
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'address',
      fields: [
        defineField({ name: 'line1', title: 'Line 1', type: 'string' }),
        defineField({ name: 'line2', title: 'Line 2', type: 'string' }),
        defineField({ name: 'line3', title: 'Line 3', type: 'string' }),
      ],
    }),
    defineField({ name: 'coordinates', title: 'Coordinates', type: 'string', description: 'e.g. 10.8505° N, 76.2711° E', group: 'address' }),

    // Business
    defineField({ name: 'businessHours', title: 'Business Hours', type: 'text', rows: 2, group: 'business' }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'business',
    }),

    // Map
    defineField({ name: 'mapUrl', title: 'Google Maps Embed URL', type: 'url', description: 'The iframe src URL from Google Maps Embed', group: 'map' }),

    // Buttons
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'button', group: 'buttons' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'button', group: 'buttons' }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'companyName' },
    prepare({ title, subtitle }) {
      return { title: title || 'Company Information', subtitle: subtitle || 'Company Info Section' };
    }
  }
});
