/**
 * src/lib/sanity/adapters/product.ts
 *
 * Pure mapping functions: SanityRawProduct* → frontend Product* types.
 * Features section-based mapping architecture with backward compatibility for flat schemas.
 * Pure mapping — zero side effects, no React imports.
 */

import type {
  SanityCloudinaryImage,
  SanityRawProductHighlight,
  SanityRawProductSpecification,
  SanityRawProductStorageCare,
  SanityRawProductFeature,
  SanityRawProductUsage,
  SanityRawProductNutritionItem,
  SanityRawProductProcessStep,
  SanityRawProductCertification,
  SanityRawProductComparisonItem,
  SanityRawProductDownload,
  SanityRawProductQuickFact,
  SanityRawProductFaq,
  SanityRawProductStoryChapter,
  SanityRawProductSummary,
  SanityRawProductDetail,
  SanityRawProductSettings,
  SanityRawBlogPostSummary,
} from '../sanity.raw.types';

import type {
  ProductImage,
  ProductHighlight,
  ProductSpecification,
  ProductStorageCare,
  ProductFeature,
  ProductUsage,
  ProductNutritionItem,
  ProductProcessStep,
  SupportingDocument,
  ProductCertification,
  ProductComparisonItem,
  ProductDownload,
  ProductQuickFact,
  ProductFaq,
  ProductStoryChapter,
  ProductSummary,
  ProductDetail,
  ProductSettings,
  RelatedJournalArticle,
} from '@/features/products/types';

import { parseMarkdownToHtml } from '@/lib/markdown/parser';
import { formatDate } from '@/lib/date/formatDate';

// ── Shared Helpers ─────────────────────────────────────────────────────────────

function extractSlug(raw: unknown): string {
  if (!raw) return '';
  if (typeof raw === 'string') return raw;
  if (typeof (raw as { current?: string }).current === 'string') {
    return (raw as { current: string }).current;
  }
  if (typeof (raw as { slug?: unknown }).slug === 'string') {
    return (raw as { slug: string }).slug;
  }
  if (typeof (raw as { slug?: { current?: string } }).slug?.current === 'string') {
    return (raw as { slug: { current: string } }).slug.current;
  }
  return '';
}

function mapProductImage(
  raw: SanityCloudinaryImage | undefined,
  fallbackWidth = 1920,
  fallbackHeight = 1080,
): ProductImage {
  return {
    src: raw?.secureUrl ?? '',
    alt: raw?.alt ?? '',
    width: raw?.width ?? fallbackWidth,
    height: raw?.height ?? fallbackHeight,
  };
}

function mapProductImageOrNull(
  raw: SanityCloudinaryImage | undefined,
): ProductImage | null {
  if (!raw?.secureUrl) return null;
  return mapProductImage(raw);
}

// ── Sub-Object Mappers ─────────────────────────────────────────────────────────

function mapHighlight(raw: SanityRawProductHighlight): ProductHighlight {
  const validAccents: Array<ProductHighlight['accentColor']> = ['gold', 'amber', 'emerald', 'stone'];
  const accentColor = raw.accentColor && validAccents.includes(raw.accentColor as ProductHighlight['accentColor'])
    ? (raw.accentColor as ProductHighlight['accentColor'])
    : 'amber';

  return {
    title: raw.title ?? '',
    description: raw.description ?? '',
    icon: raw.icon ?? '✨',
    accentColor,
  };
}

function mapSpecification(raw: SanityRawProductSpecification): ProductSpecification {
  return {
    title: raw.title ?? '',
    value: raw.value ?? '',
    unit: raw.unit ?? undefined,
  };
}

function mapStorageCare(raw?: SanityRawProductStorageCare): ProductStorageCare | null {
  if (!raw) return null;
  return {
    temperatureRange: raw.temperatureRange ?? undefined,
    shelfLife: raw.shelfLife ?? undefined,
    storageTips: raw.storageTips ?? [],
    thingsToAvoid: raw.thingsToAvoid ?? [],
    bestBefore: raw.bestBefore ?? undefined,
  };
}

function mapFeature(raw: SanityRawProductFeature): ProductFeature {
  return {
    title: raw.title ?? '',
    description: raw.description ?? '',
    icon: raw.icon ?? '✨',
  };
}

function mapUsage(raw: SanityRawProductUsage): ProductUsage {
  return {
    title: raw.title ?? '',
    description: raw.description ?? '',
    icon: raw.icon ?? '🌿',
    suitabilityTags: raw.suitabilityTags ?? [],
  };
}

function mapNutritionItem(raw: SanityRawProductNutritionItem): ProductNutritionItem {
  return {
    label: raw.label ?? '',
    amountPer100ml: raw.amountPer100ml ?? '',
    amountPerServing: raw.amountPerServing ?? undefined,
    dailyValue: raw.dailyValue ?? undefined,
    isSubNutrient: raw.isSubNutrient ?? false,
  };
}

function mapProcessStep(raw: SanityRawProductProcessStep): ProductProcessStep {
  return {
    stepNumber: raw.stepNumber ?? 1,
    title: raw.title ?? '',
    description: raw.description ?? '',
    image: mapProductImageOrNull(raw.image),
    interestingFact: raw.interestingFact ?? undefined,
    estimatedDuration: raw.estimatedDuration ?? undefined,
  };
}

function mapSupportingDocument(raw: { title?: string; url?: string; format?: string }): SupportingDocument {
  return {
    title: raw.title ?? 'Document',
    url: raw.url ?? '',
    format: raw.format ?? 'PDF',
  };
}

function mapCertification(raw: SanityRawProductCertification): ProductCertification {
  return {
    name: raw.name ?? '',
    logo: mapProductImage(raw.logo, 200, 200),
    description: raw.description ?? undefined,
    issuer: raw.issuer ?? undefined,
    verificationUrl: raw.verificationUrl ?? undefined,
    supportingDocuments: (raw.supportingDocuments ?? []).map(mapSupportingDocument),
  };
}

function mapComparisonItem(raw: SanityRawProductComparisonItem): ProductComparisonItem {
  return {
    label: raw.label ?? '',
    leftValue: raw.leftValue ?? '',
    rightValue: raw.rightValue ?? '',
    isHighlight: raw.isHighlight ?? false,
  };
}

function mapDownload(raw: SanityRawProductDownload): ProductDownload {
  const validCategories: Array<ProductDownload['category']> = ['brochure', 'lab-report', 'certificate', 'spec-sheet'];
  const category = raw.category && validCategories.includes(raw.category as ProductDownload['category'])
    ? (raw.category as ProductDownload['category'])
    : 'brochure';

  return {
    title: raw.title ?? '',
    description: raw.description ?? undefined,
    category,
    url: raw.url ?? '',
    format: raw.format ?? 'PDF',
    version: raw.version ?? undefined,
    updatedDate: raw.updatedDate ?? undefined,
  };
}

function mapQuickFact(raw: SanityRawProductQuickFact): ProductQuickFact {
  return {
    question: raw.question ?? '',
    answer: raw.answer ?? '',
    isPositive: raw.isPositive ?? true,
  };
}

function mapFaq(raw: SanityRawProductFaq): ProductFaq {
  return {
    question: raw.question ?? '',
    answer: raw.answer ?? '',
  };
}

function mapStoryChapter(raw: SanityRawProductStoryChapter): ProductStoryChapter {
  return {
    title: raw.title ?? '',
    description: raw.description ?? '',
    image: mapProductImage(raw.image, 1200, 800),
    quote: raw.quote ?? undefined,
  };
}

// ── Product Summary Mapper ─────────────────────────────────────────────────────

export function mapProductSummary(raw: SanityRawProductSummary): ProductSummary {
  const validStatuses = ['draft', 'review', 'published', 'archived'] as const;
  const isStatusValid = raw.editorialStatus && validStatuses.includes(raw.editorialStatus as (typeof validStatuses)[number]);
  const status = isStatusValid
    ? (raw.editorialStatus as ProductSummary['editorialStatus'])
    : 'draft';

  const rawHighlightsList = Array.isArray(raw.highlights)
    ? raw.highlights
    : (raw.highlights as { highlights?: SanityRawProductHighlight[] })?.highlights ?? [];

  return {
    id: raw._id ?? '',
    name: raw.name ?? '',
    slug: extractSlug(raw.slug),
    tagline: raw.tagline ?? '',
    primaryFeaturedImage: mapProductImage(raw.primaryFeaturedImage, 1200, 800),
    highlights: rawHighlightsList.map(mapHighlight),
    editorialStatus: status,
    isFeatured: raw.isFeatured ?? true,
  };
}

export function mapProductSummaries(raws: SanityRawProductSummary[]): ProductSummary[] {
  return raws.map(mapProductSummary);
}

// ── Full Product Detail Mapper (async — section-based mapping) ─────────────────

export async function mapProductDetail(raw: SanityRawProductDetail): Promise<ProductDetail> {
  // Resolve Story description
  const description = raw.story?.description ?? raw.description ?? '';
  const descriptionHtml = await parseMarkdownToHtml(description);

  // Editorial Status
  const validStatuses = ['draft', 'review', 'published', 'archived'] as const;
  const isStatusValid = raw.editorialStatus && validStatuses.includes(raw.editorialStatus as (typeof validStatuses)[number]);
  const status = isStatusValid
    ? (raw.editorialStatus as ProductDetail['editorialStatus'])
    : 'draft';

  // Hero Fields
  const eyebrow = raw.hero?.eyebrow ?? raw.eyebrow ?? 'FLAGSHIP BOTANICAL EXTRACTION';
  const headline = raw.hero?.headline ?? raw.headline ?? raw.name ?? '';
  const subheadline = raw.hero?.subheadline ?? raw.subheadline ?? '';
  const primaryFeaturedImage = mapProductImage(
    raw.hero?.heroImage ?? raw.primaryFeaturedImage,
    1920,
    1080,
  );

  // Highlights
  const rawHighlights = raw.highlightsSection?.highlights ?? (Array.isArray(raw.highlights) ? raw.highlights : []);
  const highlights = rawHighlights.map(mapHighlight);

  // Story Chapters
  const rawChapters = raw.story?.storyChapters ?? raw.storyChapters ?? [];
  const storyChapters = rawChapters.map(mapStoryChapter);

  // Technical Profile
  const rawSpecs = raw.technicalProfile?.specifications ?? raw.specifications ?? [];
  const specifications = rawSpecs.map(mapSpecification);
  const storageCare = mapStorageCare(raw.technicalProfile?.storageCare ?? raw.storageCare);

  // Benefits & Uses
  const rawBenefits = raw.benefitsSection?.benefits ?? raw.benefits ?? [];
  const benefits = rawBenefits.map(mapFeature);
  const rawUses = raw.benefitsSection?.uses ?? raw.uses ?? [];
  const uses = rawUses.map(mapUsage);
  const nutritionItems = (raw.nutritionItems ?? []).map(mapNutritionItem);

  // Manufacturing Timeline
  const rawSteps = raw.manufacturing?.timeline ?? raw.manufacturingSteps ?? [];
  const manufacturingSteps = rawSteps.map(mapProcessStep);

  // Trust & Certifications
  const rawCerts = raw.trust?.certifications ?? raw.certifications ?? [];
  const certifications = rawCerts.map(mapCertification);
  const rawDownloads = raw.trust?.downloads ?? raw.downloads ?? [];
  const downloads = rawDownloads.map(mapDownload);

  // Comparison, Quick Facts, FAQs
  const comparisonHeadingLeft = raw.comparisonHeadingLeft ?? 'Ordinary Cold Pressed Oil';
  const comparisonHeadingRight = raw.comparisonHeadingRight ?? 'Hydrops Double-Filtered Pure Oil';
  const comparisonItems = (raw.comparisonItems ?? []).map(mapComparisonItem);
  const quickFacts = (raw.quickFacts ?? []).map(mapQuickFact);
  const faqs = (raw.faqs ?? []).map(mapFaq);

  return {
    id: raw._id ?? '',
    name: raw.name ?? '',
    slug: extractSlug(raw.slug),
    tagline: raw.tagline ?? '',
    editorialStatus: status,
    isFeatured: raw.isFeatured ?? true,

    // Hero & Story
    eyebrow,
    headline,
    subheadline,
    primaryFeaturedImage,
    storyChapters,
    highlights,
    description,
    descriptionHtml,

    // Technical & Care
    specifications,
    storageCare,

    // Benefits & Applications
    benefits,
    uses,
    nutritionItems,

    // Manufacturing & Proof
    manufacturingSteps,
    certifications,

    // Comparison
    comparisonHeadingLeft,
    comparisonHeadingRight,
    comparisonItems,

    // Resources & FAQ
    downloads,
    quickFacts,
    faqs,

    // SEO
    seo: {
      metaTitle: raw.seo?.metaTitle ?? `${raw.name ?? 'Product'} | Hydrops Water`,
      metaDescription: raw.seo?.metaDescription ?? raw.tagline ?? '',
      socialImage: mapProductImageOrNull(raw.seo?.socialImage),
      canonicalUrl: raw.seo?.canonicalUrl ?? '',
      noIndex: raw.seo?.noIndex ?? false,
    },
  };
}

// ── Standalone Content Validator ──────────────────────────────────────────────

export function validateProduct(product: ProductDetail | null): boolean {
  if (!product) {
    console.warn('[product] Validation failed: product object is null.');
    return false;
  }
  if (!product.slug || product.slug.trim() === '') {
    console.warn(`[product] Validation failed for "${product.id}": missing slug.`);
    return false;
  }
  if (!product.name || product.name.trim() === '') {
    console.warn(`[product] Validation failed for "${product.slug}": missing name.`);
    return false;
  }
  if (!product.primaryFeaturedImage || !product.primaryFeaturedImage.src) {
    console.warn(`[product] Validation failed for "${product.slug}": missing primary featured image.`);
    return false;
  }
  if (product.editorialStatus !== 'published') {
    console.warn(`[product] Validation failed for "${product.slug}": status is "${product.editorialStatus}", expected "published".`);
    return false;
  }

  return true;
}

// ── Settings Mapper ───────────────────────────────────────────────────────────

export function mapProductSettings(raw: SanityRawProductSettings | null): ProductSettings {
  return {
    showcaseTitle: raw?.showcaseTitle ?? 'Hydrops Flagship Collection',
    showcaseEyebrow: raw?.showcaseEyebrow ?? 'THE PURITY OF EXTRACTION',
    showcaseTagline: raw?.showcaseTagline ?? 'Crafted without heat, chemistry, or compromise.',
    ctaHeadline: raw?.ctaHeadline ?? 'Experience Authentic Hydrops Purity',
    ctaSubtext: raw?.ctaSubtext ?? 'Connect with our team to enquire about bulk orders, institutional supply, or brand partnerships.',
    enableSectionNav: raw?.enableSectionNav ?? true,
    enableAnimation: raw?.enableAnimation ?? true,
    showRelatedArticles: raw?.showRelatedArticles ?? true,
    emptyStateText: raw?.emptyStateText ?? 'Our flagship product is currently undergoing seasonal cold pressing. Please check back soon.',
  };
}

// ── Related Articles Mappers ──────────────────────────────────────────────────

export function mapRelatedJournalArticle(raw: SanityRawBlogPostSummary): RelatedJournalArticle {
  const content = raw.content ?? '';
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const computedReadTime = Math.max(1, Math.ceil(wordCount / 200));
  const readingTime = raw.estimatedReadTimeOverride ?? computedReadTime;

  return {
    id: raw._id ?? '',
    title: raw.title ?? '',
    slug: extractSlug(raw.slug),
    excerpt: raw.excerpt ?? '',
    featuredImage: mapProductImage(raw.featuredImage, 800, 600),
    publishDate: formatDate(raw.publishDate),
    readingTime,
  };
}

export function mapRelatedJournalArticles(raws: SanityRawBlogPostSummary[]): RelatedJournalArticle[] {
  return raws.map(mapRelatedJournalArticle);
}
