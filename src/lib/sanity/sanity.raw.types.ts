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
