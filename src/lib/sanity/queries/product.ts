/**
 * src/lib/sanity/queries/product.ts
 *
 * GROQ queries for the Hydrops Flagship Product feature.
 * Features section-based projections with backward-compatible fallbacks.
 */

import { cloudinaryImageFragment } from '../fragments';

// ── Reusable Product Fragments ───────────────────────────────────────────────

const highlightFragment = `
  title,
  description,
  icon,
  accentColor
`;

const specificationFragment = `
  title,
  value,
  unit
`;

const storageCareFragment = `
  temperatureRange,
  shelfLife,
  storageTips,
  thingsToAvoid,
  bestBefore
`;

const featureFragment = `
  title,
  description,
  icon
`;

const usageFragment = `
  title,
  description,
  icon,
  suitabilityTags
`;

const processStepFragment = `
  stepNumber,
  title,
  description,
  "image": image { ${cloudinaryImageFragment} },
  interestingFact,
  estimatedDuration
`;

const certificationFragment = `
  name,
  "logo": logo { ${cloudinaryImageFragment} },
  description,
  issuer,
  verificationUrl,
  supportingDocuments[] {
    title,
    url,
    format
  }
`;

const downloadFragment = `
  title,
  description,
  category,
  url,
  format,
  version,
  updatedDate
`;

const storyChapterFragment = `
  title,
  description,
  "image": image { ${cloudinaryImageFragment} },
  quote
`;

// ── Section Projections ───────────────────────────────────────────────────────

const heroSectionFragment = `
  eyebrow,
  headline,
  subheadline,
  "heroImage": heroImage { ${cloudinaryImageFragment} },
  "secondaryImage": secondaryImage { ${cloudinaryImageFragment} },
  ctaTitle,
  ctaDescription
`;

const highlightsSectionFragment = `
  title,
  highlights[] { ${highlightFragment} }
`;

const storySectionFragment = `
  title,
  description,
  storyChapters[] { ${storyChapterFragment} },
  quote
`;

const technicalProfileSectionFragment = `
  title,
  specifications[] { ${specificationFragment} },
  storageCare { ${storageCareFragment} }
`;

const benefitsSectionFragment = `
  title,
  benefits[] { ${featureFragment} },
  uses[] { ${usageFragment} }
`;

const manufacturingSectionFragment = `
  title,
  subtitle,
  timeline[] { ${processStepFragment} },
  closingNote
`;

const trustSectionFragment = `
  title,
  certifications[] { ${certificationFragment} },
  downloads[] { ${downloadFragment} }
`;

const relatedArticlesSectionFragment = `
  enabled,
  title,
  subtitle
`;

const ctaSectionFragment = `
  title,
  description,
  buttonText,
  buttonLink
`;

const productSummaryFragment = `
  _id,
  name,
  "slug": slug.current,
  tagline,
  editorialStatus,
  isFeatured,
  "primaryFeaturedImage": primaryFeaturedImage { ${cloudinaryImageFragment} },
  "hero": hero { ${heroSectionFragment} },
  "highlightsSection": highlights { ${highlightsSectionFragment} },
  highlights[] { ${highlightFragment} }
`;

// ── Product Settings ─────────────────────────────────────────────────────────

export const PRODUCT_SETTINGS_QUERY = `
  *[_type == "productSettings"][0] {
    showcaseTitle,
    showcaseEyebrow,
    showcaseTagline,
    ctaHeadline,
    ctaSubtext,
    enableSectionNav,
    enableAnimation,
    showRelatedArticles,
    emptyStateText
  }
`;

// ── Flagship Product ──────────────────────────────────────────────────────────

export const FLAGSHIP_PRODUCT_QUERY = `
  *[_type == "product" && editorialStatus == "published" && isFeatured == true][0] {
    ${productSummaryFragment}
  }
`;

// ── Product Listing ───────────────────────────────────────────────────────────

export const PRODUCT_LIST_QUERY = `
  *[_type == "product" && editorialStatus == "published"] | order(_createdAt desc) {
    ${productSummaryFragment}
  }
`;

// ── Product Detail by Slug ────────────────────────────────────────────────────

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug && editorialStatus == "published"][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    editorialStatus,
    isFeatured,
    
    // Section Objects
    "hero": hero { ${heroSectionFragment} },
    "highlightsSection": highlights { ${highlightsSectionFragment} },
    "story": story { ${storySectionFragment} },
    "technicalProfile": technicalProfile { ${technicalProfileSectionFragment} },
    "benefitsSection": benefits { ${benefitsSectionFragment} },
    "manufacturing": manufacturing { ${manufacturingSectionFragment} },
    "trust": trust { ${trustSectionFragment} },
    "relatedArticles": relatedArticles { ${relatedArticlesSectionFragment} },
    "cta": cta { ${ctaSectionFragment} },

    // Fallback Flat Fields
    eyebrow,
    headline,
    subheadline,
    description,
    "primaryFeaturedImage": primaryFeaturedImage { ${cloudinaryImageFragment} },
    storyChapters[] { ${storyChapterFragment} },
    highlights[] { ${highlightFragment} },
    specifications[] { ${specificationFragment} },
    storageCare { ${storageCareFragment} },
    benefits[] { ${featureFragment} },
    uses[] { ${usageFragment} },
    manufacturingSteps[] { ${processStepFragment} },
    certifications[] { ${certificationFragment} },
    downloads[] { ${downloadFragment} },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage { ${cloudinaryImageFragment} },
      canonicalUrl,
      noIndex
    }
  }
`;

// ── All Slugs (for generateStaticParams) ──────────────────────────────────────

export const PRODUCT_ALL_SLUGS_QUERY = `
  *[_type == "product" && editorialStatus == "published"] {
    "slug": slug.current
  }
`;

// ── Related Journal Articles ──────────────────────────────────────────────────

export const PRODUCT_RELATED_ARTICLES_QUERY = `
  *[_type == "blogPost" && editorialStatus == "published"] | order(publishDate desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishDate,
    estimatedReadTimeOverride,
    content,
    "featuredImage": featuredImage { ${cloudinaryImageFragment} }
  }
`;
