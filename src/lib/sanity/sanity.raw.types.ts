/**
 * Raw types representing exactly what Sanity returns for each query.
 * These are the shapes BEFORE the adapter transforms them into frontend interfaces.
 * They mirror the GROQ projections defined in queries.ts.
 */

// ── Shared Primitives ─────────────────────────────────────────────────────────

export interface SanityButton {
  text?: string;
  variant?: string;
  size?: string;
  icon?: string;
  route?: string;
  external?: boolean;
}

export interface SanityCloudinaryImage {
  secureUrl?: string;
  publicId?: string;
  resourceType?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  isDecorative?: boolean;
}

export interface SanityHeadingBlock {
  label?: string;
  title?: string;
  subtitle?: string;
  accent?: string;
}

// ── Home Page Raw Shapes ──────────────────────────────────────────────────────

export interface SanityRawHero {
  eyebrow?: string;
  headline?: string;
  description?: string;
  videoUrl?: string;
  posterUrl?: string;
  primaryCta?: SanityButton;
  secondaryCta?: SanityButton;
}

export interface SanityRawSoulStatement {
  label?: string;
  headline?: string;
  accentHeadline?: string;
  background?: SanityCloudinaryImage;
}

export interface SanityRawPhilosophyChapter {
  lines?: string[];
  accentLine?: string;
}

export interface SanityRawPhilosophy {
  persistentPhrase?: string;
  chapters?: SanityRawPhilosophyChapter[];
  cta?: SanityButton;
}

export interface SanityRawJourneyStage {
  chapter?: string;
  title?: string;
  description?: string;
  image?: SanityCloudinaryImage;
  mood?: string;
}

export interface SanityRawJourney {
  ambientImage?: SanityCloudinaryImage;
  stages?: SanityRawJourneyStage[];
}

export interface SanityRawProductShowcase {
  label?: string;
  headline?: string;
  description?: string;
  productImage?: SanityCloudinaryImage;
  floatingAsset?: SanityCloudinaryImage;
  primaryCta?: SanityButton;
  secondaryCta?: SanityButton;
}

export interface SanityRawPurityStatement {
  label?: string;
  supportingText?: string;
  statements?: Array<{
    line?: string;
    delay?: number;
    accent?: boolean;
  }>;
}

export interface SanityRawCraftStep {
  step?: string;
  title?: string;
  headline?: string;
  description?: string;
  image?: SanityCloudinaryImage;
}

export interface SanityRawCraftsmanship {
  heading?: SanityHeadingBlock;
  steps?: SanityRawCraftStep[];
}

export interface SanityRawEverydayMoment {
  id?: string;
  label?: string;
  headline?: string;
  description?: string;
  image?: SanityCloudinaryImage;
  accent?: string;
}

export interface SanityRawEveryday {
  heading?: SanityHeadingBlock;
  headlineAccent?: string;
  moments?: SanityRawEverydayMoment[];
}

export interface SanityRawContactCta {
  label?: string;
  headline?: string;
  accentHeadline?: string;
  description?: string;
  tagline?: string;
  primaryCta?: SanityButton;
  secondaryCta?: SanityButton;
  backgroundImage?: SanityCloudinaryImage;
}

export interface SanityRawHomePage {
  hero?: SanityRawHero;
  soulStatement?: SanityRawSoulStatement;
  philosophy?: SanityRawPhilosophy;
  journey?: SanityRawJourney;
  productShowcase?: SanityRawProductShowcase;
  purityStatement?: SanityRawPurityStatement;
  craftsmanship?: SanityRawCraftsmanship;
  everyday?: SanityRawEveryday;
  contactCta?: SanityRawContactCta;
}

// ── About Page Raw Shapes ─────────────────────────────────────────────────────

export interface SanityRawAboutHero {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  tagline?: string;
}

export interface SanityRawAboutIntroduction {
  eyebrow?: string;
  headline?: string;
  body?: string[];
  stat?: {
    value?: string;
    label?: string;
  };
}

export interface SanityRawAboutStoryChapter {
  year?: string;
  heading?: string;
  body?: string;
}

export interface SanityRawAboutStory {
  eyebrow?: string;
  headline?: string;
  image?: SanityCloudinaryImage;
  imageCaption?: string;
  chapters?: SanityRawAboutStoryChapter[];
}

export interface SanityRawMissionVision {
  eyebrow?: string;
  headline?: string;
  body?: string;
}

export interface SanityRawAboutValueItem {
  number?: string;
  title?: string;
  body?: string;
}

export interface SanityRawAboutValues {
  eyebrow?: string;
  headline?: string;
  items?: SanityRawAboutValueItem[];
}

export interface SanityRawManufacturingStage {
  step?: string;
  title?: string;
  body?: string;
  image?: SanityCloudinaryImage;
}

export interface SanityRawAboutManufacturing {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  stages?: SanityRawManufacturingStage[];
}

export interface SanityRawCommitmentPillar {
  label?: string;
  headline?: string;
  body?: string;
}

export interface SanityRawAboutCommitment {
  eyebrow?: string;
  headline?: string;
  body?: string;
  pillars?: SanityRawCommitmentPillar[];
  seal?: string;
}

export interface SanityRawWhyItem {
  number?: string;
  title?: string;
  body?: string;
}

export interface SanityRawAboutWhyHydrops {
  eyebrow?: string;
  headline?: string;
  items?: SanityRawWhyItem[];
}

export interface SanityRawAboutCompanyInfo {
  eyebrow?: string;
  heading?: string;
  description?: string;
  companyName?: string;
  legalName?: string;
  founded?: string;
  origin?: string;
  email?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    line3?: string;
  };
  coordinates?: string;
  mapUrl?: string;
  businessHours?: string;
  certifications?: string[];
  primaryCta?: SanityButton;
  secondaryCta?: SanityButton;
}

export interface SanityRawAboutPage {
  hero?: SanityRawAboutHero;
  introduction?: SanityRawAboutIntroduction;
  story?: SanityRawAboutStory;
  mission?: SanityRawMissionVision;
  vision?: SanityRawMissionVision;
  coreValues?: SanityRawAboutValues;
  manufacturing?: SanityRawAboutManufacturing;
  quality?: SanityRawAboutCommitment;
  whyChoose?: SanityRawAboutWhyHydrops;
  companyInfo?: SanityRawAboutCompanyInfo;
}

// ── Blog / Journal Raw Shapes ─────────────────────────────────────────────────

export interface SanityRawBlogCategory {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  description?: string;
  colour?: string;
  icon?: string;
}

export interface SanityRawBlogTag {
  _id?: string;
  name?: string;
  slug?: { current?: string };
  description?: string;
}

export interface SanityRawBlogSocialLink {
  platform?: string;
  url?: string;
}

export interface SanityRawBlogAuthor {
  _id?: string;
  name?: string;
  slug?: { current?: string };
  designation?: string;
  experience?: string;
  avatar?: SanityCloudinaryImage;
  shortBio?: string;
  bio?: string;
  linkedin?: string;
  website?: string;
  socialLinks?: SanityRawBlogSocialLink[];
}

export interface SanityRawBlogSeries {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  description?: string;
  coverImage?: SanityCloudinaryImage;
}

/** Flattened shape returned by the post summary GROQ projection. */
export interface SanityRawBlogPostSummary {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  featuredImage?: SanityCloudinaryImage;
  category?: SanityRawBlogCategory;
  author?: Pick<SanityRawBlogAuthor, '_id' | 'name' | 'slug' | 'designation' | 'avatar'>;
  tags?: SanityRawBlogTag[];
  publishDate?: string;
  content?: string;
  estimatedReadTimeOverride?: number | null;
  isFeatured?: boolean;
  isPinned?: boolean;
  editorialStatus?: string;
  series?: Pick<SanityRawBlogSeries, '_id' | 'title' | 'slug'> | null;
  partNumber?: number | null;
}

/** Full shape returned by the individual post GROQ projection. */
export interface SanityRawBlogPost extends SanityRawBlogPostSummary {
  featuredQuote?: string;
  author?: SanityRawBlogAuthor;
  category?: SanityRawBlogCategory;
  tags?: SanityRawBlogTag[];
  series?: SanityRawBlogSeries | null;
  youtubeUrl?: string;
  hideToc?: boolean;
  hideVideo?: boolean;
  hideRelated?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: SanityCloudinaryImage;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
}

export interface SanityRawBlogSettings {
  articlesPerPage?: number;
  latestArticlesCount?: number;
  relatedArticlesCount?: number;
  defaultSorting?: string;
  enableSearch?: boolean;
  enableCategories?: boolean;
  enableTags?: boolean;
  enableNewsletter?: boolean;
  showYoutubeSection?: boolean;
  newsletterHeadline?: string;
  newsletterSubtext?: string;
  journalTitle?: string;
  journalEyebrow?: string;
  journalTagline?: string;
}
