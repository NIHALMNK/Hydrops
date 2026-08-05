/**
 * src/lib/sanity/queries/blog.ts
 *
 * All GROQ queries for the Hydrops Journal / Blog feature.
 *
 * Architecture notes:
 *   - Queries are GROQ template literals — no runtime cost.
 *   - Reusable fragments are composed inline to keep projections explicit.
 *   - Only the fields that adapters consume are projected — no over-fetching.
 *   - Content (raw Markdown) is fetched in the detail query only, never in list queries.
 */

import { cloudinaryImageFragment } from '../fragments';

// ── Reusable Blog Fragments ───────────────────────────────────────────────────

/** Minimal category projection — used inside post card projections. */
const categoryFragment = `
  _id,
  title,
  "slug": slug.current,
  description,
  colour,
  icon
`;

/** Minimal author projection — used inside post card projections. */
const authorSummaryFragment = `
  _id,
  name,
  "slug": slug.current,
  designation,
  "avatar": avatar { ${cloudinaryImageFragment} }
`;

/** Full author projection — used in individual post query only. */
const authorFullFragment = `
  _id,
  name,
  "slug": slug.current,
  designation,
  experience,
  shortBio,
  bio,
  linkedin,
  website,
  "avatar": avatar { ${cloudinaryImageFragment} },
  socialLinks[] {
    platform,
    url
  }
`;

/** Tag projection. */
const tagFragment = `
  _id,
  name,
  "slug": slug.current,
  description
`;

/** Series summary projection. */
const seriesSummaryFragment = `
  _id,
  title,
  "slug": slug.current
`;

/** Full series projection. */
const seriesFullFragment = `
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage { ${cloudinaryImageFragment} }
`;

/**
 * Post summary projection — used for landing page cards, related articles,
 * and anywhere only card-level data is needed.
 * Deliberately excludes raw content to keep payload small.
 */
const postSummaryFragment = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishDate,
  estimatedReadTimeOverride,
  isFeatured,
  isPinned,
  editorialStatus,
  partNumber,
  "featuredImage": featuredImage { ${cloudinaryImageFragment} },
  "category": category-> { ${categoryFragment} },
  "author": author-> { ${authorSummaryFragment} },
  "tags": tags[]-> { ${tagFragment} },
  "series": series-> { ${seriesSummaryFragment} }
`;

// ── Journal Settings ──────────────────────────────────────────────────────────

/**
 * Fetch the singleton Journal Settings document.
 * Document ID is pinned to 'blog-settings' by the desk structure.
 */
export const BLOG_SETTINGS_QUERY = `
  *[_type == "blogSettings"][0] {
    articlesPerPage,
    latestArticlesCount,
    relatedArticlesCount,
    defaultSorting,
    enableSearch,
    enableCategories,
    enableTags,
    enableNewsletter,
    showYoutubeSection,
    newsletterHeadline,
    newsletterSubtext,
    journalTitle,
    journalEyebrow,
    journalTagline
  }
`;

// ── Categories ────────────────────────────────────────────────────────────────

/** Fetch all blog categories ordered by title. */
export const BLOG_CATEGORIES_QUERY = `
  *[_type == "blogCategory"] | order(title asc) {
    ${categoryFragment}
  }
`;

// ── Featured Post ─────────────────────────────────────────────────────────────

/**
 * Fetch the single featured post.
 * If multiple posts are marked isFeatured, return the most recently published.
 */
export const BLOG_FEATURED_QUERY = `
  *[_type == "blogPost" && isFeatured == true && editorialStatus == "published"]
    | order(publishDate desc)[0] {
    ${postSummaryFragment}
  }
`;

// ── Latest Posts ──────────────────────────────────────────────────────────────

/**
 * Fetch the N most recent published posts, excluding the featured one.
 *
 * Parametrised with $limit (default provided by Settings).
 * Pinned posts are sorted to the top within the same recency window.
 */
export const BLOG_LATEST_QUERY = `
  *[_type == "blogPost" && editorialStatus == "published" && isFeatured != true]
    | order(isPinned desc, publishDate desc)[0...$limit] {
    ${postSummaryFragment}
  }
`;

// ── Category Filter ───────────────────────────────────────────────────────────

/**
 * Fetch published posts filtered by category slug.
 * Parametrised with $categorySlug and $limit.
 */
export const BLOG_BY_CATEGORY_QUERY = `
  *[_type == "blogPost"
    && editorialStatus == "published"
    && category->slug.current == $categorySlug]
    | order(isPinned desc, publishDate desc)[0...$limit] {
    ${postSummaryFragment}
  }
`;

// ── Individual Post ───────────────────────────────────────────────────────────

/**
 * Fetch a full article by slug.
 * Fetches the raw Markdown content — parsing happens in the adapter.
 */
export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && editorialStatus == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredQuote,
    content,
    publishDate,
    isFeatured,
    isPinned,
    editorialStatus,
    partNumber,
    youtubeUrl,
    hideToc,
    hideVideo,
    hideRelated,
    "featuredImage": featuredImage { ${cloudinaryImageFragment} },
    "category": category-> { ${categoryFragment} },
    "author": author-> { ${authorFullFragment} },
    "tags": tags[]-> { ${tagFragment} },
    "series": series-> { ${seriesFullFragment} },
    seo {
      metaTitle,
      metaDescription,
      "socialImage": socialImage { ${cloudinaryImageFragment} },
      canonicalUrl,
      noIndex
    }
  }
`;

// ── Related Posts ─────────────────────────────────────────────────────────────

/**
 * Fetch related posts for an article.
 * Matching logic (same category, same tags) is done in the adapter layer.
 * This query fetches a broad pool; the adapter applies scoring and limits.
 *
 * Parametrised with $categoryId and $excludeId.
 */
export const BLOG_RELATED_QUERY = `
  *[_type == "blogPost"
    && editorialStatus == "published"
    && _id != $excludeId
    && (
      (defined($categoryId) && category._ref == $categoryId) ||
      (defined($tagIds) && count((tags[]._ref)[@ in $tagIds]) > 0)
    )]
    | order(publishDate desc)[0...10] {
    ${postSummaryFragment}
  }
`;

// ── Slug Paths (for generateStaticParams) ─────────────────────────────────────

/** Fetch all published post slugs — used for Next.js static path generation. */
export const BLOG_ALL_SLUGS_QUERY = `
  *[_type == "blogPost" && editorialStatus == "published"] {
    "slug": slug.current
  }
`;
