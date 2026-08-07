import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  description: 'CMS content for the Contact page',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'cards', title: 'Contact Cards' },
    { name: 'form', title: 'Contact Form' },
    { name: 'map', title: 'Google Map' },
    { name: 'cta', title: 'CTA Section' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero Section ─────────────────────────────────────────────────────────────
    defineField({
      name: 'eyebrow',
      title: 'Hero Eyebrow / Label',
      type: 'string',
      group: 'hero',
      initialValue: 'CONNECT WITH HYDROPS',
    }),
    defineField({
      name: 'heading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'We would love to hear from you',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedWord',
      title: 'Highlighted Word',
      type: 'string',
      group: 'hero',
      description: 'The word within or extending the heading that receives gold accent styling (e.g., "hear from you")',
      initialValue: 'hear from you',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue: 'Reach out to our team regarding inquiries, corporate orders, press, or partnership opportunities. We respond to all messages within 24 hours.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'cloudinaryImage',
      group: 'hero',
    }),

    // ── Contact Cards ────────────────────────────────────────────────────────────
    // Phone Card
    defineField({
      name: 'phoneTitle',
      title: 'Phone Card Title',
      type: 'string',
      group: 'cards',
      initialValue: 'Phone Enquiries',
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'cards',
      initialValue: ['+91 70121 23505', '+91 98765 43210'],
    }),

    // WhatsApp Card
    defineField({
      name: 'whatsappTitle',
      title: 'WhatsApp Card Title',
      type: 'string',
      group: 'cards',
      initialValue: 'Instant WhatsApp',
    }),
    defineField({
      name: 'whatsappButtonText',
      title: 'WhatsApp Button Text',
      type: 'string',
      group: 'cards',
      initialValue: 'Chat on WhatsApp',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'cards',
      description: 'International format with country code (e.g. +917012123505)',
      initialValue: '+917012123505',
    }),

    // Location Card
    defineField({
      name: 'locationTitle',
      title: 'Location Card Title',
      type: 'string',
      group: 'cards',
      initialValue: 'Our Headquarters',
    }),
    defineField({
      name: 'locationAddress',
      title: 'Location Address',
      type: 'text',
      rows: 2,
      group: 'cards',
      initialValue: 'Kadungalloor, Aluva, Ernakulam, Kerala 683110, India',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
      group: 'cards',
      description: 'Direct link or share URL from Google Maps',
      initialValue: 'https://maps.app.goo.gl/LykpGeLBQjAHpcVd8',
    }),

    // Business Hours Card
    defineField({
      name: 'hoursTitle',
      title: 'Business Hours Title',
      type: 'string',
      group: 'cards',
      initialValue: 'Business Hours',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours Text',
      type: 'string',
      group: 'cards',
      initialValue: 'Monday – Saturday: 08:00 AM — 07:00 PM IST',
    }),

    // ── Contact Form Labels & Texts ──────────────────────────────────────────────
    defineField({
      name: 'formSectionTitle',
      title: 'Form Eyebrow / Label',
      type: 'string',
      group: 'form',
      initialValue: 'SEND US A MESSAGE',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      group: 'form',
      initialValue: 'Begin the Conversation',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      rows: 2,
      group: 'form',
      initialValue: 'Fill out the form below and a representative from Hydrops will get back to you promptly.',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      group: 'form',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Toast Message',
      type: 'string',
      group: 'form',
      initialValue: 'Thank you for reaching out. Your message has been delivered to Hydrops.',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Toast Message',
      type: 'string',
      group: 'form',
      initialValue: 'Unable to send message at this moment. Please try again or reach out via WhatsApp.',
    }),

    // Dynamic Form Field Labels & Placeholders
    defineField({
      name: 'fullNameLabel',
      title: 'Full Name Label',
      type: 'string',
      group: 'form',
      initialValue: 'Full Name',
    }),
    defineField({
      name: 'fullNamePlaceholder',
      title: 'Full Name Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'e.g. Alexander Wright',
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Label',
      type: 'string',
      group: 'form',
      initialValue: 'Email Address',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'alexander@example.com',
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Phone Label',
      type: 'string',
      group: 'form',
      initialValue: 'Phone Number (Optional)',
    }),
    defineField({
      name: 'phonePlaceholder',
      title: 'Phone Placeholder',
      type: 'string',
      group: 'form',
      initialValue: '+91 98765 43210',
    }),
    defineField({
      name: 'subjectLabel',
      title: 'Subject Label',
      type: 'string',
      group: 'form',
      initialValue: 'Subject (Optional)',
    }),
    defineField({
      name: 'subjectPlaceholder',
      title: 'Subject Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'Product Inquiry / Bulk Order',
    }),
    defineField({
      name: 'messageLabel',
      title: 'Message Label',
      type: 'string',
      group: 'form',
      initialValue: 'Your Message',
    }),
    defineField({
      name: 'messagePlaceholder',
      title: 'Message Placeholder',
      type: 'string',
      group: 'form',
      initialValue: 'Tell us how we can assist you...',
    }),

    // ── Google Map Section ───────────────────────────────────────────────────────
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed iframe URL (Optional)',
      type: 'url',
      group: 'map',
      description: 'Custom Google Maps Embed src URL. If left empty, it will be automatically generated from Google Maps Link.',
    }),

    // ── CTA Section ──────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      group: 'cta',
      initialValue: 'Prefer Direct Communication?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Section Description',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'Connect with us immediately via direct call, WhatsApp message, or direct email.',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      group: 'cta',
      of: [
        {
          name: 'ctaItem',
          title: 'CTA Button Item',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Action Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Call Now', value: 'call' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Email Us', value: 'email' },
                  { title: 'Custom Link', value: 'custom' },
                ],
              },
              initialValue: 'call',
            }),
            defineField({
              name: 'label',
              title: 'Button Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Target URL / Link',
              type: 'string',
              description: 'e.g. tel:+917012123505, https://wa.me/..., mailto:hydropsindia@gmail.com',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      initialValue: [

        { type: 'call', label: 'Call Now', url: 'tel:+917012123505' },
        { type: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/917012123505' },
        { type: 'email', label: 'Email Us', url: 'mailto:hydropsindia@gmail.com' },
      ],
    }),

    // ── SEO Settings ─────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Page',
        subtitle: subtitle || 'Contact Page Configuration',
        icon: EnvelopeIcon,
      };
    },
  },
});
