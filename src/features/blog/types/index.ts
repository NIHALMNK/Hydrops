/**
 * src/features/blog/types/index.ts
 *
 * Pure frontend types for the Hydrops Journal.
 * No Sanity-specific types or _raw fields here — only clean, UI-ready shapes.
 * All adapters map from SanityRaw* → these types.
 */

// ── Primitive Shared Types ────────────────────────────────────────────────────

export interface BlogImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogSocialLink {
  platform: 'instagram' | 'twitter' | 'youtube' | 'facebook' | 'other';
  url: string;
}

// ── Category ──────────────────────────────────────────────────────────────────

export type CategoryColour = 'green' | 'emerald' | 'gold' | 'blue' | 'rose' | 'stone';

export interface BlogCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  colour: CategoryColour;
  icon: string;
}

// ── Tag ───────────────────────────────────────────────────────────────────────

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// ── Author ────────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  designation: string;
  experience: string;
  avatar: BlogImage;
  shortBio: string;
  bio: string;
  linkedin: string;
  website: string;
  socialLinks: BlogSocialLink[];
}

// ── Series ────────────────────────────────────────────────────────────────────

export interface BlogSeries {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: BlogImage;
}

// ── Article Summary (landing page card) ──────────────────────────────────────

export type EditorialStatus = 'draft' | 'review' | 'published' | 'archived';

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: BlogImage;
  category: Pick<BlogCategory, 'id' | 'title' | 'slug' | 'colour' | 'icon'>;
  author: Pick<BlogAuthor, 'id' | 'name' | 'slug' | 'designation' | 'avatar'>;
  tags: Pick<BlogTag, 'id' | 'name' | 'slug'>[];
  publishDate: string;
  readingTime: number;
  estimatedReadTimeOverride?: number | null;
  isFeatured: boolean;
  isPinned: boolean;
  editorialStatus: EditorialStatus;
  series: Pick<BlogSeries, 'id' | 'title' | 'slug'> | null;
  partNumber: number | null;
}

// ── Table of Contents ─────────────────────────────────────────────────────────

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// ── Article Detail (individual article page) ──────────────────────────────────

export interface BlogPost {
  // Identity
  id: string;
  title: string;
  slug: string;
  editorialStatus: EditorialStatus;

  // Author & Classification
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  series: BlogSeries | null;
  partNumber: number | null;

  // Visual
  featuredImage: BlogImage;

  // Content
  excerpt: string;
  featuredQuote: string;
  /** Raw Markdown content — parsed to HTML by the parser on the server. */
  content: string;
  /** Parsed, sanitised HTML string — ready for dangerouslySetInnerHTML. */
  contentHtml: string;
  /** Auto-generated or overridden reading time. */
  readingTime: number;
  estimatedReadTimeOverride?: number | null;
  /** Auto-generated table of contents. */
  toc: TocItem[];

  // Publishing
  publishDate: string;
  isFeatured: boolean;
  isPinned: boolean;

  // Media
  youtubeUrl: string;

  // Display toggles
  hideToc: boolean;
  hideVideo: boolean;
  hideRelated: boolean;

  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    socialImage: BlogImage | null;
    canonicalUrl: string;
    noIndex: boolean;
  };
}

// ── Journal Settings ──────────────────────────────────────────────────────────

export type BlogSortingOption = 'pinnedFirst' | 'publishedDesc' | 'publishedAsc';

export interface BlogSettings {
  articlesPerPage: number;
  latestArticlesCount: number;
  relatedArticlesCount: number;
  defaultSorting: BlogSortingOption;
  enableSearch: boolean;
  enableCategories: boolean;
  enableTags: boolean;
  enableNewsletter: boolean;
  showYoutubeSection: boolean;
  newsletterHeadline: string;
  newsletterSubtext: string;
  journalTitle: string;
  journalEyebrow: string;
  journalTagline: string;
}

// ── Fetch Result Wrappers ─────────────────────────────────────────────────────

export interface BlogLandingData {
  settings: BlogSettings;
  featured: BlogPostSummary | null;
  latest: BlogPostSummary[];
  categories: BlogCategory[];
}

export interface BlogArticleData {
  post: BlogPost;
  related: BlogPostSummary[];
}

// ── Legacy Compatibility Types (for old placeholder components until Phase 3) ────

export interface BlogHeroData {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export interface TopicPreviewData {
  headline?: string;
  topics: Array<{ title: string }>;
}

export interface BlogPageData {
  hero: BlogHeroData;
  topics: TopicPreviewData;
}

