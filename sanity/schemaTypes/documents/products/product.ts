import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons/Package';

export const product = defineType({
  name: 'product',
  title: 'Flagship Product',
  type: 'document',
  icon: PackageIcon,
  description: 'Hydrops Flagship Cold-Pressed Coconut Oil Product Document (Section-Based CMS Architecture).',
  fieldsets: [
    { name: 'identity', title: '1. Identity & Status', options: { collapsible: true, collapsed: false } },
    { name: 'sections', title: '2. Storytelling Page Sections', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: '3. Search Engine Optimization', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // ── Identity ────────────────────────────────────────────────────────────

    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'The official name of the product (e.g. "Hydrops Unrefined Cold-Pressed Coconut Oil")',
      validation: (Rule) => Rule.required().min(3).max(120),
      fieldset: 'identity',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug (e.g. /products/unrefined-cold-pressed-coconut-oil)',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'identity',
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline / Short Subtitle',
      type: 'string',
      description: 'Single-sentence tagline (e.g. "100% Pure Coastal Kerala Copra · Double Filtered · Zero Preservatives")',
      fieldset: 'identity',
    }),

    defineField({
      name: 'editorialStatus',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '✏️  Draft', value: 'draft' },
          { title: '🔍  Review', value: 'review' },
          { title: '✅  Published', value: 'published' },
          { title: '📦  Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
      fieldset: 'identity',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Mark as Flagship Product',
      type: 'boolean',
      initialValue: true,
      fieldset: 'identity',
    }),

    // ── Section Objects ─────────────────────────────────────────────────────

    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'productHeroSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'highlights',
      title: 'Highlights Section',
      type: 'productHighlightsSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'story',
      title: 'The Hydrops Story Section',
      type: 'productStorySection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'technicalProfile',
      title: 'Technical Profile Section',
      type: 'productTechnicalProfileSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'benefits',
      title: 'Benefits & Everyday Uses Section',
      type: 'productBenefitsSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'manufacturing',
      title: 'Manufacturing Journey Section',
      type: 'productManufacturingSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'trust',
      title: 'Trust & Quality Section',
      type: 'productTrustSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'relatedArticles',
      title: 'Related Articles Section Settings',
      type: 'productRelatedArticlesSection',
      fieldset: 'sections',
    }),

    defineField({
      name: 'cta',
      title: 'Contact CTA Section',
      type: 'productCtaSection',
      fieldset: 'sections',
    }),

    // ── Legacy Root Fields (Fallback for existing published documents) ──────

    defineField({
      name: 'eyebrow',
      title: 'Hero Eyebrow (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'headline',
      title: 'Hero Headline (Legacy)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero Subheadline (Legacy)',
      type: 'text',
      rows: 2,
      hidden: true,
    }),
    defineField({
      name: 'primaryFeaturedImage',
      title: 'Primary Hero Bottle Image (Legacy)',
      type: 'cloudinaryImage',
      hidden: true,
    }),
    defineField({
      name: 'storyChapters',
      title: 'Craftsmanship Story Chapters (Legacy)',
      type: 'array',
      of: [{ type: 'productStoryChapter' }],
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Full Craftsmanship Story (Legacy)',
      type: 'text',
      hidden: true,
    }),
    defineField({
      name: 'specifications',
      title: 'Technical Specifications (Legacy)',
      type: 'array',
      of: [{ type: 'productSpecification' }],
      hidden: true,
    }),
    defineField({
      name: 'storageCare',
      title: 'Storage & Care (Legacy)',
      type: 'productStorageCare',
      hidden: true,
    }),
    defineField({
      name: 'uses',
      title: 'Uses & Applications (Legacy)',
      type: 'array',
      of: [{ type: 'productUsage' }],
      hidden: true,
    }),
    defineField({
      name: 'manufacturingSteps',
      title: 'Manufacturing Steps (Legacy)',
      type: 'array',
      of: [{ type: 'productProcessStep' }],
      hidden: true,
    }),
    defineField({
      name: 'certifications',
      title: 'Quality Certifications (Legacy)',
      type: 'array',
      of: [{ type: 'productCertification' }],
      hidden: true,
    }),
    defineField({
      name: 'downloads',
      title: 'Downloadable Documents (Legacy)',
      type: 'array',
      of: [{ type: 'productDownload' }],
      hidden: true,
    }),

    // ── SEO ─────────────────────────────────────────────────────────────────

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      fieldset: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      heroTitle: 'hero.headline',
      media: 'hero.heroImage.secureUrl',
      fallbackMedia: 'primaryFeaturedImage.secureUrl',
      editorialStatus: 'editorialStatus',
    },
    prepare({ title, subtitle, heroTitle, media, fallbackMedia, editorialStatus }) {
      const statusEmoji: Record<string, string> = {
        draft: '✏️',
        review: '🔍',
        published: '✅',
        archived: '📦',
      };
      return {
        title: title || 'Unnamed Product',
        subtitle: `${statusEmoji[editorialStatus] || ''} ${subtitle || heroTitle || ''}`.trim(),
        media: media || fallbackMedia,
      };
    },
  },
});
