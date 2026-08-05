/**
 * src/lib/sanity/fetch/blog.ts
 *
 * All Sanity fetch functions for the Hydrops Journal.
 * 100% driven by Sanity CMS — zero fallback data.
 */

import { client } from '../client';

import {
  BLOG_SETTINGS_QUERY,
  BLOG_CATEGORIES_QUERY,
  BLOG_FEATURED_QUERY,
  BLOG_LATEST_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_RELATED_QUERY,
  BLOG_ALL_SLUGS_QUERY,
  BLOG_BY_CATEGORY_QUERY,
} from '../queries/blog';

import {
  mapBlogSettings,
  mapBlogCategories,
  mapBlogPostSummary,
  mapBlogPostSummaries,
  mapBlogPost,
  validateBlogPost,
} from '../adapters/blog';

import { selectRelatedArticles } from '@/features/blog/services/relatedArticles';

import type {
  BlogSettings,
  BlogCategory,
  BlogPostSummary,
  BlogPost,
  BlogLandingData,
  BlogArticleData,
} from '@/features/blog/types';

import type {
  SanityRawBlogSettings,
  SanityRawBlogCategory,
  SanityRawBlogPostSummary,
  SanityRawBlogPost,
} from '../sanity.raw.types';

const REVALIDATE = 60;

// ── Settings ──────────────────────────────────────────────────────────────────

export async function getBlogSettings(): Promise<BlogSettings> {
  const raw = await client.fetch<SanityRawBlogSettings | null>(
    BLOG_SETTINGS_QUERY,
    {},
    { next: { revalidate: REVALIDATE } },
  );
  return mapBlogSettings(raw);
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const raw = await client.fetch<SanityRawBlogCategory[]>(
      BLOG_CATEGORIES_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw || raw.length === 0) return [];
    return mapBlogCategories(raw);
  } catch (error) {
    console.error('[blog] Failed to fetch categories:', error);
    return [];
  }
}

// ── Featured Post ─────────────────────────────────────────────────────────────

export async function getFeaturedPost(): Promise<BlogPostSummary | null> {
  try {
    const raw = await client.fetch<SanityRawBlogPostSummary | null>(
      BLOG_FEATURED_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw) return null;
    return mapBlogPostSummary(raw);
  } catch (error) {
    console.error('[blog] Failed to fetch featured post:', error);
    return null;
  }
}

// ── Latest Posts ──────────────────────────────────────────────────────────────

export async function getLatestPosts(limit?: number): Promise<BlogPostSummary[]> {
  const settings = await getBlogSettings();
  const resolvedLimit = limit ?? settings.latestArticlesCount;

  try {
    const raw = await client.fetch<SanityRawBlogPostSummary[]>(
      BLOG_LATEST_QUERY,
      { limit: resolvedLimit },
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw || raw.length === 0) return [];
    return mapBlogPostSummaries(raw);
  } catch (error) {
    console.error('[blog] Failed to fetch latest posts:', error);
    return [];
  }
}

// ── Posts by Category ─────────────────────────────────────────────────────────

export async function getPostsByCategory(
  categorySlug: string,
  limit = 12,
): Promise<BlogPostSummary[]> {
  try {
    const raw = await client.fetch<SanityRawBlogPostSummary[]>(
      BLOG_BY_CATEGORY_QUERY,
      { categorySlug, limit },
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw || raw.length === 0) return [];
    return mapBlogPostSummaries(raw);
  } catch (error) {
    console.error(`[blog] Failed to fetch posts for category "${categorySlug}":`, error);
    return [];
  }
}

// ── Landing Page ──────────────────────────────────────────────────────────────

/**
 * Composite fetch for the Journal landing page.
 * Runs settings, categories, featured post, and latest posts in parallel.
 */
export async function getBlogLandingData(): Promise<BlogLandingData> {
  const [settings, categories, featured, latest] = await Promise.all([
    getBlogSettings(),
    getBlogCategories(),
    getFeaturedPost(),
    getLatestPosts(),
  ]);

  return { settings, categories, featured, latest };
}

// ── Individual Post ───────────────────────────────────────────────────────────

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await client.fetch<SanityRawBlogPost | null>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw) return null;
    const post = await mapBlogPost(raw);
    if (!validateBlogPost(post)) {
      console.warn(`[blog] Article "${slug}" failed content/reference validation.`);
      return null;
    }
    return post;
  } catch (error) {
    console.error(`[blog] Failed to fetch post "${slug}":`, error);
    return null;
  }
}

// ── Article Page ──────────────────────────────────────────────────────────────

/**
 * Composite fetch for an individual article page.
 * Fetches the post and its related articles pool in parallel,
 * then applies the relevance scoring algorithm.
 */
export async function getBlogArticleData(slug: string): Promise<BlogArticleData | null> {
  const [post, settings] = await Promise.all([getBlogPost(slug), getBlogSettings()]);

  if (!post) return null;

  // Convert BlogPost to BlogPostSummary shape for related scoring
  const reference: BlogPostSummary = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    category: {
      id: post.category.id,
      title: post.category.title,
      slug: post.category.slug,
      colour: post.category.colour,
      icon: post.category.icon,
    },
    author: {
      id: post.author.id,
      name: post.author.name,
      slug: post.author.slug,
      designation: post.author.designation,
      avatar: post.author.avatar,
    },
    tags: post.tags,
    publishDate: post.publishDate,
    readingTime: post.readingTime,
    isFeatured: post.isFeatured,
    isPinned: post.isPinned,
    editorialStatus: post.editorialStatus,
    series: post.series ? { id: post.series.id, title: post.series.title, slug: post.series.slug } : null,
    partNumber: post.partNumber,
  };

  // Fetch related candidate pool
  let related: BlogPostSummary[] = [];

  if (!post.hideRelated) {
    try {
      const tagIds = post.tags.map((t) => t.id);
      const rawRelated = await client.fetch<SanityRawBlogPostSummary[]>(
        BLOG_RELATED_QUERY,
        { excludeId: post.id, categoryId: post.category.id, tagIds },
        { next: { revalidate: REVALIDATE } },
      );
      const candidates = mapBlogPostSummaries(rawRelated ?? []);
      related = selectRelatedArticles(candidates, reference, settings.relatedArticlesCount);
    } catch (error) {
      console.error(`[blog] Failed to fetch related articles for "${slug}":`, error);
    }
  }

  return { post, related };
}

// ── Static Paths ──────────────────────────────────────────────────────────────

/**
 * Fetch all published post slugs for generateStaticParams.
 * Uses no-store to always get the freshest list at build time.
 */
export async function getBlogAllSlugs(): Promise<string[]> {
  try {
    const raw = await client.fetch<{ slug: string }[]>(
      BLOG_ALL_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return (raw ?? []).map((r) => r.slug).filter(Boolean);
  } catch (error) {
    console.error('[blog] Failed to fetch slugs:', error);
    return [];
  }
}
