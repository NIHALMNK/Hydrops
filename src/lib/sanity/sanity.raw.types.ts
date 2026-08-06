// Base Cloudinary image shape
export interface SanityCloudinaryImage {
  publicId?: string;
  url?: string;
  secureUrl?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  duration?: number;
  tags?: string[];
  alt?: string;
  caption?: string;
}

export interface SanityButton {
  label?: string;
  text?: string;
  href?: string;
  route?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface SanityHeadingBlock {
  eyebrow?: string;
  label?: string;
  heading?: string;
  title?: string;
  headline?: string;
  subtitle?: string;
  supportingText?: string;
  description?: string;
}

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  socialImage?: SanityCloudinaryImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// ── Homepage Raw Shapes ────────────────────────────────────────────────────────

export interface SanityRawHero {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  description?: string;
  videoUrl?: string;
  posterUrl?: string;
  primaryCta?: SanityButton;
  secondaryCta?: SanityButton;
  bgImage?: SanityCloudinaryImage;
}

export interface SanityRawSoulStatement {
  eyebrow?: string;
  label?: string;
  headline?: string;
  accentHeadline?: string;
  description?: string;
  background?: SanityCloudinaryImage;
  quote?: string;
  authorName?: string;
  authorTitle?: string;
}

export interface SanityRawPhilosophyChapter {
  number?: string;
  title?: string;
  description?: string;
  lines?: string[];
  accentLine?: string;
}

export interface SanityRawPhilosophy {
  eyebrow?: string;
  headline?: string;
  persistentPhrase?: string;
  description?: string;
  chapters?: SanityRawPhilosophyChapter[];
  cta?: SanityButton;
  pillars?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
}

export interface SanityRawJourneyStage {
  number?: string;
  chapter?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  mood?: string;
  image?: SanityCloudinaryImage;
}

export interface SanityRawJourneyStep {
  stepNumber?: number;
  title?: string;
  description?: string;
  image?: SanityCloudinaryImage;
}

export interface SanityRawJourney {
  eyebrow?: string;
  headline?: string;
  ambientImage?: SanityCloudinaryImage;
  stages?: SanityRawJourneyStage[];
  steps?: SanityRawJourneyStep[];
}

export interface SanityRawProductShowcase {
  eyebrow?: string;
  label?: string;
  headline?: string;
  description?: string;
  highlights?: string[];
  primaryCta?: SanityButton;
  secondaryCta?: SanityButton;
  productImage?: SanityCloudinaryImage;
  floatingAsset?: SanityCloudinaryImage;
  image?: SanityCloudinaryImage;
}

export interface SanityRawPurityStatement {
  eyebrow?: string;
  label?: string;
  headline?: string;
  quote?: string;
  supportingText?: string;
  subtext?: string;
  statements?: Array<{
    label?: string;
    text?: string;
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
  eyebrow?: string;
  headline?: string;
  heading?: SanityHeadingBlock;
  description?: string;
  steps?: SanityRawCraftStep[];
  features?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
}

export interface SanityRawEverydayMoment {
  id?: string;
  label?: string;
  headline?: string;
  title?: string;
  description?: string;
  accent?: string;
  image?: SanityCloudinaryImage;
}

export interface SanityRawEveryday {
  eyebrow?: string;
  headline?: string;
  heading?: SanityHeadingBlock;
  headlineAccent?: string;
  description?: string;
  moments?: SanityRawEverydayMoment[];
  uses?: Array<{
    title?: string;
    description?: string;
    icon?: string;
  }>;
}

export interface SanityRawContactCta {
  eyebrow?: string;
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

// ── About Page Raw Shapes ──────────────────────────────────────────────────────

export interface SanityRawAboutHero {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  tagline?: string;
  heroImage?: SanityCloudinaryImage;
}

export interface SanityRawAboutIntroduction {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  leadParagraph?: string;
  bodyParagraphs?: string[];
  body?: string[];
  quote?: string;
  quoteAuthor?: string;
  stat?: {
    value?: string;
    label?: string;
  };
}

export interface SanityRawAboutStoryChapter {
  year?: string;
  title?: string;
  heading?: string;
  description?: string;
  body?: string;
  image?: SanityCloudinaryImage;
}

export interface SanityRawAboutStory {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  chapters?: SanityRawAboutStoryChapter[];
  image?: SanityCloudinaryImage;
  imageCaption?: string;
}

export interface SanityRawMissionVision {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  statement?: string;
  description?: string;
  body?: string;
  points?: string[];
}

export interface SanityRawAboutValuePillar {
  title?: string;
  description?: string;
  icon?: string;
}

export interface SanityRawAboutValueItem {
  number?: string;
  title?: string;
  description?: string;
  body?: string;
  icon?: string;
}

export interface SanityRawAboutValues {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  subheading?: string;
  pillars?: SanityRawAboutValuePillar[];
  items?: SanityRawAboutValueItem[];
}

export interface SanityRawAboutManufacturingStep {
  stepNumber?: number;
  step?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  body?: string;
  highlights?: string[];
  image?: SanityCloudinaryImage;
}

export interface SanityRawManufacturingStage {
  stepNumber?: number;
  step?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  body?: string;
  highlights?: string[];
  image?: SanityCloudinaryImage;
}

export interface SanityRawAboutManufacturing {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  subheading?: string;
  subheadline?: string;
  steps?: SanityRawAboutManufacturingStep[];
  stages?: SanityRawManufacturingStage[];
}

export interface SanityRawAboutCommitmentPillar {
  label?: string;
  headline?: string;
  title?: string;
  description?: string;
  body?: string;
  metric?: string;
  metricLabel?: string;
}

export interface SanityRawCommitmentPillar {
  label?: string;
  headline?: string;
  title?: string;
  description?: string;
  body?: string;
  metric?: string;
  metricLabel?: string;
}

export interface SanityRawAboutCommitment {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  description?: string;
  body?: string;
  pillars?: SanityRawCommitmentPillar[];
  seal?: string | {
    title?: string;
    subtitle?: string;
  };
}

export interface SanityRawAboutWhyHydropsPoint {
  number?: string;
  title?: string;
  description?: string;
  body?: string;
  badge?: string;
}

export interface SanityRawWhyItem {
  number?: string;
  title?: string;
  description?: string;
  body?: string;
  badge?: string;
}

export interface SanityRawAboutWhyHydrops {
  eyebrow?: string;
  heading?: string;
  headline?: string;
  description?: string;
  points?: SanityRawAboutWhyHydropsPoint[];
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

export interface SanityRawBlogPostSummary {
  _id?: string;
  title?: string;
  slug?: string | { current?: string };
  excerpt?: string;
  featuredImage?: SanityCloudinaryImage;
  category?: SanityRawBlogCategory;
  author?: SanityRawBlogAuthor;
  tags?: SanityRawBlogTag[];
  publishDate?: string;
  readingTime?: number;
  estimatedReadTimeOverride?: number | null;
  isFeatured?: boolean;
  isPinned?: boolean;
  editorialStatus?: string;
  series?: SanityRawBlogSeries;
  partNumber?: number | null;
  content?: string;
}

export interface SanityRawBlogPost extends SanityRawBlogPostSummary {
  featuredQuote?: string;
  youtubeUrl?: string;
  hideToc?: boolean;
  hideVideo?: boolean;
  hideRelated?: boolean;
  seo?: SanitySeo;
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

// ── Product Raw Shapes ────────────────────────────────────────────────────────

export interface SanityRawProductHighlight {
  title?: string;
  description?: string;
  icon?: string;
  accentColor?: string;
}

export interface SanityRawProductSpecification {
  title?: string;
  value?: string;
  unit?: string;
}

export interface SanityRawProductStorageCare {
  temperatureRange?: string;
  shelfLife?: string;
  storageTips?: string[];
  thingsToAvoid?: string[];
  bestBefore?: string;
}

export interface SanityRawProductFeature {
  title?: string;
  description?: string;
  icon?: string;
}

export interface SanityRawProductUsage {
  title?: string;
  description?: string;
  icon?: string;
  suitabilityTags?: string[];
}

export interface SanityRawProductNutritionItem {
  label?: string;
  amountPer100ml?: string;
  amountPerServing?: string;
  dailyValue?: string;
  isSubNutrient?: boolean;
}

export interface SanityRawProductProcessStep {
  stepNumber?: number;
  title?: string;
  description?: string;
  image?: SanityCloudinaryImage;
  interestingFact?: string;
  estimatedDuration?: string;
}

export interface SanityRawProductCertification {
  name?: string;
  logo?: SanityCloudinaryImage;
  description?: string;
  issuer?: string;
  verificationUrl?: string;
  supportingDocuments?: Array<{
    title?: string;
    url?: string;
    format?: string;
  }>;
}

export interface SanityRawProductComparisonItem {
  label?: string;
  leftValue?: string;
  rightValue?: string;
  isHighlight?: boolean;
}

export interface SanityRawProductDownload {
  title?: string;
  description?: string;
  category?: string;
  url?: string;
  format?: string;
  version?: string;
  updatedDate?: string;
}

export interface SanityRawProductQuickFact {
  question?: string;
  answer?: string;
  isPositive?: boolean;
}

export interface SanityRawProductFaq {
  question?: string;
  answer?: string;
}

export interface SanityRawProductStoryChapter {
  title?: string;
  description?: string;
  image?: SanityCloudinaryImage;
  quote?: string;
}

// ── Product Section Raw Shapes ────────────────────────────────────────────────

export interface SanityRawProductHeroSection {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  heroImage?: SanityCloudinaryImage;
  secondaryImage?: SanityCloudinaryImage;
  ctaTitle?: string;
  ctaDescription?: string;
}

export interface SanityRawProductHighlightsSection {
  title?: string;
  highlights?: SanityRawProductHighlight[];
}

export interface SanityRawProductStorySection {
  title?: string;
  description?: string;
  storyChapters?: SanityRawProductStoryChapter[];
  quote?: string;
}

export interface SanityRawProductTechnicalProfileSection {
  title?: string;
  specifications?: SanityRawProductSpecification[];
  storageCare?: SanityRawProductStorageCare;
}

export interface SanityRawProductBenefitsSection {
  title?: string;
  benefits?: SanityRawProductFeature[];
  uses?: SanityRawProductUsage[];
}

export interface SanityRawProductManufacturingSection {
  title?: string;
  subtitle?: string;
  timeline?: SanityRawProductProcessStep[];
  closingNote?: string;
}

export interface SanityRawProductTrustSection {
  title?: string;
  certifications?: SanityRawProductCertification[];
  downloads?: SanityRawProductDownload[];
}

export interface SanityRawProductRelatedArticlesSection {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
}

export interface SanityRawProductCtaSection {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface SanityRawProductSummary {
  _id?: string;
  name?: string;
  slug?: string | { current?: string };
  tagline?: string;
  editorialStatus?: string;
  isFeatured?: boolean;
  primaryFeaturedImage?: SanityCloudinaryImage;
  highlights?: SanityRawProductHighlight[] | SanityRawProductHighlightsSection;
}

export interface SanityRawProductDetail extends SanityRawProductSummary {
  // Section Objects
  hero?: SanityRawProductHeroSection;
  highlightsSection?: SanityRawProductHighlightsSection;
  story?: SanityRawProductStorySection;
  technicalProfile?: SanityRawProductTechnicalProfileSection;
  benefitsSection?: SanityRawProductBenefitsSection;
  manufacturing?: SanityRawProductManufacturingSection;
  trust?: SanityRawProductTrustSection;
  relatedArticles?: SanityRawProductRelatedArticlesSection;
  cta?: SanityRawProductCtaSection;

  // Legacy flat fields (for backward compatibility)
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  description?: string;
  storyChapters?: SanityRawProductStoryChapter[];
  specifications?: SanityRawProductSpecification[];
  storageCare?: SanityRawProductStorageCare;
  benefits?: SanityRawProductFeature[];
  uses?: SanityRawProductUsage[];
  nutritionItems?: SanityRawProductNutritionItem[];
  manufacturingSteps?: SanityRawProductProcessStep[];
  certifications?: SanityRawProductCertification[];
  comparisonHeadingLeft?: string;
  comparisonHeadingRight?: string;
  comparisonItems?: SanityRawProductComparisonItem[];
  downloads?: SanityRawProductDownload[];
  quickFacts?: SanityRawProductQuickFact[];
  faqs?: SanityRawProductFaq[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: SanityCloudinaryImage;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
}

export interface SanityRawProductSettings {
  showcaseTitle?: string;
  showcaseEyebrow?: string;
  showcaseTagline?: string;
  ctaHeadline?: string;
  ctaSubtext?: string;
  enableSectionNav?: boolean;
  enableAnimation?: boolean;
  showRelatedArticles?: boolean;
  emptyStateText?: string;
}

export interface SanityRawCtaButtonItem {
  type?: 'call' | 'whatsapp' | 'email' | 'custom';
  label?: string;
  url?: string;
}

export interface SanityRawContactPage {
  eyebrow?: string;
  heading?: string;
  highlightedWord?: string;
  description?: string;
  backgroundImage?: SanityCloudinaryImage;

  phoneTitle?: string;
  phoneNumbers?: string[];

  whatsappTitle?: string;
  whatsappButtonText?: string;
  whatsappNumber?: string;

  locationTitle?: string;
  locationAddress?: string;
  googleMapsUrl?: string;

  hoursTitle?: string;
  workingHours?: string;

  formSectionTitle?: string;
  formHeading?: string;
  formDescription?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;

  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;

  mapEmbedUrl?: string;

  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtons?: SanityRawCtaButtonItem[];
}

