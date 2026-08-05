/**
 * src/lib/sanity/adapters/blog.ts
 *
 * Pure mapping functions: SanityRaw* → frontend Blog* types.
 *
 * Rules (same discipline as the Home and About adapters):
 *   - No React imports, no UI logic.
 *   - Every field has a safe fallback — null/undefined never reaches components.
 *   - Markdown parsing happens here for BlogPost (async).
 *   - BlogPostSummary mapping is synchronous (no content fetched for cards).
 *   - Reading time and TOC are computed here, not in components.
 *   - Zero `any` usage.
 */

import type {
  SanityCloudinaryImage,
  SanityRawBlogCategory,
  SanityRawBlogTag,
  SanityRawBlogAuthor,
  SanityRawBlogSeries,
  SanityRawBlogPostSummary,
  SanityRawBlogPost,
  SanityRawBlogSettings,
  SanityRawBlogSocialLink,
} from '../sanity.raw.types';

import type {
  BlogImage,
  BlogCategory,
  CategoryColour,
  BlogTag,
  BlogAuthor,
  BlogSocialLink,
  BlogSeries,
  BlogPostSummary,
  BlogPost,
  BlogSettings,
  TocItem,
  EditorialStatus,
} from '@/features/blog/types';

import { parseMarkdownToHtml } from '@/lib/markdown/parser';
import { calculateReadingTime } from '@/lib/markdown/readingTime';
import { extractTableOfContents } from '@/lib/markdown/toc';
import { formatDate } from '@/lib/date/formatDate';

// ── Shared Primitive Mappers ──────────────────────────────────────────────────

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

function mapBlogImage(
  raw: SanityCloudinaryImage | undefined,
  fallbackWidth = 1920,
  fallbackHeight = 1080,
): BlogImage {
  return {
    src: raw?.secureUrl ?? '',
    alt: raw?.alt ?? '',
    width: raw?.width ?? fallbackWidth,
    height: raw?.height ?? fallbackHeight,
  };
}

function mapBlogImageOrNull(
  raw: SanityCloudinaryImage | undefined,
): BlogImage | null {
  if (!raw?.secureUrl) return null;
  return mapBlogImage(raw);
}

const VALID_COLOURS: CategoryColour[] = ['green', 'emerald', 'gold', 'blue', 'rose', 'stone'];

function mapColour(raw: string | undefined): CategoryColour {
  if (raw && (VALID_COLOURS as string[]).includes(raw)) return raw as CategoryColour;
  return 'stone';
}

const VALID_STATUSES: EditorialStatus[] = ['draft', 'review', 'published', 'archived'];

function mapEditorialStatus(raw: string | undefined): EditorialStatus {
  if (raw && (VALID_STATUSES as string[]).includes(raw)) return raw as EditorialStatus;
  return 'draft';
}

function mapSocialLink(raw: SanityRawBlogSocialLink): BlogSocialLink {
  const validPlatforms = ['instagram', 'twitter', 'youtube', 'facebook', 'other'] as const;
  type Platform = typeof validPlatforms[number];
  const platform = (raw.platform && (validPlatforms as readonly string[]).includes(raw.platform))
    ? (raw.platform as Platform)
    : 'other';
  return { platform, url: raw.url ?? '' };
}

// ── Category Mapper ───────────────────────────────────────────────────────────

export function mapBlogCategory(raw: SanityRawBlogCategory | undefined): BlogCategory {
  return {
    id: raw?._id ?? '',
    title: raw?.title ?? '',
    slug: extractSlug(raw?.slug),
    description: raw?.description ?? '',
    colour: mapColour(raw?.colour),
    icon: raw?.icon ?? '',
  };
}

export function mapBlogCategories(raws: SanityRawBlogCategory[]): BlogCategory[] {
  return raws.map(mapBlogCategory);
}

// ── Tag Mapper ────────────────────────────────────────────────────────────────

export function mapBlogTag(raw: SanityRawBlogTag | undefined): BlogTag {
  return {
    id: raw?._id ?? '',
    name: raw?.name ?? '',
    slug: extractSlug(raw?.slug),
    description: raw?.description ?? '',
  };
}

// ── Author Mapper ─────────────────────────────────────────────────────────────

export function mapBlogAuthor(raw: SanityRawBlogAuthor | undefined): BlogAuthor {
  return {
    id: raw?._id ?? '',
    name: raw?.name ?? '',
    slug: extractSlug(raw?.slug),
    designation: raw?.designation ?? '',
    experience: raw?.experience ?? '',
    avatar: mapBlogImage(raw?.avatar, 96, 96),
    shortBio: raw?.shortBio ?? '',
    bio: raw?.bio ?? '',
    linkedin: raw?.linkedin ?? '',
    website: raw?.website ?? '',
    socialLinks: (raw?.socialLinks ?? []).map(mapSocialLink),
  };
}

/** Minimal author shape for post summary cards. */
function mapAuthorSummary(
  raw: Pick<SanityRawBlogAuthor, '_id' | 'name' | 'slug' | 'designation' | 'avatar'> | undefined,
): BlogPostSummary['author'] {
  return {
    id: raw?._id ?? '',
    name: raw?.name ?? '',
    slug: extractSlug(raw?.slug),
    designation: raw?.designation ?? '',
    avatar: mapBlogImage(raw?.avatar, 96, 96),
  };
}

// ── Series Mapper ─────────────────────────────────────────────────────────────

export function mapBlogSeries(raw: SanityRawBlogSeries | undefined): BlogSeries {
  return {
    id: raw?._id ?? '',
    title: raw?.title ?? '',
    slug: extractSlug(raw?.slug),
    description: raw?.description ?? '',
    coverImage: mapBlogImage(raw?.coverImage, 1200, 800),
  };
}

function mapSeriesSummaryOrNull(
  raw: Pick<SanityRawBlogSeries, '_id' | 'title' | 'slug'> | null | undefined,
): BlogPostSummary['series'] {
  if (!raw?._id) return null;
  return {
    id: raw._id ?? '',
    title: raw.title ?? '',
    slug: extractSlug(raw.slug),
  };
}

// ── Post Summary Mapper (synchronous — for landing page cards) ────────────────

/**
 * Map a Sanity raw post summary to a BlogPostSummary.
 * Reading time is computed from the content field if present
 * (the summary query fetches content for this purpose).
 */
export function mapBlogPostSummary(raw: SanityRawBlogPostSummary): BlogPostSummary {
  const calculatedReadingTime = raw.content ? calculateReadingTime(raw.content) : 0;
  const readingTime = raw.estimatedReadTimeOverride ?? (calculatedReadingTime > 0 ? calculatedReadingTime : 1);

  return {
    id: raw._id ?? '',
    title: raw.title ?? '',
    slug: extractSlug(raw.slug),
    excerpt: raw.excerpt ?? '',
    featuredImage: mapBlogImage(raw.featuredImage, 1200, 800),
    category: {
      id: raw.category?._id ?? '',
      title: raw.category?.title ?? '',
      slug: extractSlug(raw.category?.slug),
      colour: mapColour(raw.category?.colour),
      icon: raw.category?.icon ?? '',
    },
    author: mapAuthorSummary(raw.author),
    tags: (raw.tags ?? []).map(mapBlogTag),
    publishDate: formatDate(raw.publishDate),
    readingTime,
    estimatedReadTimeOverride: raw.estimatedReadTimeOverride ?? null,
    isFeatured: raw.isFeatured ?? false,
    isPinned: raw.isPinned ?? false,
    editorialStatus: mapEditorialStatus(raw.editorialStatus),
    series: mapSeriesSummaryOrNull(raw.series),
    partNumber: raw.partNumber ?? null,
  };
}

export function mapBlogPostSummaries(raws: SanityRawBlogPostSummary[]): BlogPostSummary[] {
  return raws.map(mapBlogPostSummary);
}

// ── Full Post Mapper (async — parses Markdown to HTML) ───────────────────────

/**
 * Map a full Sanity blog post raw result to a BlogPost.
 * This is async because Markdown → HTML parsing is async.
 */
export async function mapBlogPost(raw: SanityRawBlogPost): Promise<BlogPost> {
  const content = raw.content ?? '';
  const calculatedReadingTime = calculateReadingTime(content);
  const readingTime = raw.estimatedReadTimeOverride ?? calculatedReadingTime;

  const [contentHtml, toc] = await Promise.all([
    parseMarkdownToHtml(content),
    Promise.resolve(extractTableOfContents(content) as TocItem[]),
  ]);

  return {
    // Identity
    id: raw._id ?? '',
    title: raw.title ?? '',
    slug: extractSlug(raw.slug),
    editorialStatus: mapEditorialStatus(raw.editorialStatus),

    // Author & Classification
    author: mapBlogAuthor(raw.author as SanityRawBlogAuthor | undefined),
    category: mapBlogCategory(raw.category),
    tags: (raw.tags ?? []).map(mapBlogTag),
    series: raw.series ? mapBlogSeries(raw.series as SanityRawBlogSeries) : null,
    partNumber: raw.partNumber ?? null,

    // Visual
    featuredImage: mapBlogImage(raw.featuredImage, 1920, 1080),

    // Content
    excerpt: raw.excerpt ?? '',
    featuredQuote: raw.featuredQuote ?? '',
    content,
    contentHtml,
    readingTime,
    estimatedReadTimeOverride: raw.estimatedReadTimeOverride ?? null,
    toc,

    // Publishing
    publishDate: formatDate(raw.publishDate),
    isFeatured: raw.isFeatured ?? false,
    isPinned: raw.isPinned ?? false,

    // Media
    youtubeUrl: raw.youtubeUrl ?? '',

    // Display toggles
    hideToc: raw.hideToc ?? false,
    hideVideo: raw.hideVideo ?? false,
    hideRelated: raw.hideRelated ?? false,

    // SEO
    seo: {
      metaTitle: raw.seo?.metaTitle ?? '',
      metaDescription: raw.seo?.metaDescription ?? '',
      socialImage: mapBlogImageOrNull(raw.seo?.socialImage),
      canonicalUrl: raw.seo?.canonicalUrl ?? '',
      noIndex: raw.seo?.noIndex ?? false,
    },
  };
}

// ── Standalone Content Validator ──────────────────────────────────────────────

/**
 * Standalone Content Validator for Blog Articles.
 * Validates that an article has all required fields and intact references.
 * If validation fails, returns false so the fetch/route layer can invoke notFound().
 */
export function validateBlogPost(post: BlogPost | null): boolean {
  if (!post) {
    console.warn('[blog] Validation failed: post object is null or undefined.');
    return false;
  }
  if (!post.slug || typeof post.slug !== 'string' || post.slug.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.id}": missing or empty slug.`);
    return false;
  }
  if (!post.title || typeof post.title !== 'string' || post.title.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.slug}": missing or empty title.`);
    return false;
  }
  if (!post.author || !post.author.name || post.author.name.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.slug}": missing or broken author reference.`);
    return false;
  }
  if (!post.category || !post.category.title || post.category.title.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.slug}": missing or broken category reference.`);
    return false;
  }
  if (!post.featuredImage || !post.featuredImage.src || post.featuredImage.src.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.slug}": missing featured image src.`);
    return false;
  }
  if (!post.content || typeof post.content !== 'string' || post.content.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.slug}": missing or empty content markdown.`);
    return false;
  }
  if (post.editorialStatus !== 'published') {
    console.warn(`[blog] Validation failed for post "${post.slug}": status is "${post.editorialStatus}", expected "published".`);
    return false;
  }
  if (!post.publishDate || typeof post.publishDate !== 'string' || post.publishDate.trim() === '') {
    console.warn(`[blog] Validation failed for post "${post.slug}": missing or empty publishDate.`);
    return false;
  }

  return true;
}

// ── Settings Mapper ───────────────────────────────────────────────────────────

export function mapBlogSettings(raw: SanityRawBlogSettings | null): BlogSettings {
  const validSortings: Array<BlogSettings['defaultSorting']> = ['pinnedFirst', 'publishedDesc', 'publishedAsc'];
  const defaultSorting = raw?.defaultSorting && validSortings.includes(raw.defaultSorting as BlogSettings['defaultSorting'])
    ? (raw.defaultSorting as BlogSettings['defaultSorting'])
    : 'pinnedFirst';

  return {
    articlesPerPage: raw?.articlesPerPage ?? 9,
    latestArticlesCount: raw?.latestArticlesCount ?? 12,
    relatedArticlesCount: raw?.relatedArticlesCount ?? 3,
    defaultSorting,
    enableSearch: raw?.enableSearch ?? true,
    enableCategories: raw?.enableCategories ?? true,
    enableTags: raw?.enableTags ?? true,
    enableNewsletter: raw?.enableNewsletter ?? false,
    showYoutubeSection: raw?.showYoutubeSection ?? true,
    newsletterHeadline: raw?.newsletterHeadline ?? '',
    newsletterSubtext: raw?.newsletterSubtext ?? '',
    journalTitle: raw?.journalTitle ?? 'Journal',
    journalEyebrow: raw?.journalEyebrow ?? 'HYDROPS JOURNAL',
    journalTagline: raw?.journalTagline ?? 'Stories of purity, health, and craft.',
  };
}
