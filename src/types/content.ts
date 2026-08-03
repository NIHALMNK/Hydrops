export interface ContentDocument {
  _id: string;
  _type: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CTA {
  label: string;
  href: string;
}

export interface SectionHeading {
  eyebrow?: string;
  headline: string;
  supportingText?: string;
}

export interface HeroChapter {
  id: string;
  startFrame: number;
  endFrame: number;
  title: string | null;
  subtitle: string | null;
}

export interface LightingMood {
  frame: number;
  background: string;
  opacity: number;
}

export interface HeroDocument extends ContentDocument {
  eyebrow?: string;
  headline: string;
  description: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  videoUrl?: string;
  posterUrl?: string;
}

export type HeroCinematicDocument = HeroDocument;

export interface SoulStatementDocument extends ContentDocument {
  background: ImageAsset;
  label: string;
  headline: string;
  accentHeadline: string;
}

export interface PhilosophyChapter {
  lines: string[];
  accentLine?: string;
}

export interface PhilosophyDocument extends ContentDocument {
  topRightDecoration?: ImageAsset;
  bottomLeftDecoration?: ImageAsset;
  watermark?: string;
  persistentPhrase: string;
  chapters: PhilosophyChapter[];
  cta?: CTA;
}

export interface JourneyStage {
  chapter: string;
  title: string;
  description: string;
  image: ImageAsset;
  mood: string;
}

export interface JourneyDocument extends ContentDocument {
  ambientImage: ImageAsset;
  stages: JourneyStage[];
}

export interface ProductShowcaseDocument extends ContentDocument {
  label: string;
  headline: string;
  description: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  productImage: ImageAsset;
  floatingAsset: ImageAsset;
}

export interface PurityStatementDocument extends ContentDocument {
  label: string;
  statements: Array<{ line: string; delay: number; accent?: boolean }>;
  supportingText: string;
}

export interface CraftStep {
  step: string;
  title: string;
  headline: string;
  description: string;
  image: ImageAsset;
}

export interface CraftsmanshipDocument extends ContentDocument {
  heading: SectionHeading;
  steps: CraftStep[];
}

export interface EverydayMoment {
  id: string;
  label: string;
  headline: string;
  description: string;
  image: ImageAsset;
  accent: string;
}

export interface EverydayDocument extends ContentDocument {
  heading: SectionHeading;
  headlineAccent: string;
  moments: EverydayMoment[];
}

export interface ContactCtaDocument extends ContentDocument {
  label: string;
  headline: string;
  accentHeadline: string;
  description: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  tagline: string;
  backgroundImage: ImageAsset;
}

export interface HomePageDocument extends ContentDocument {
  hero: HeroDocument;
  soulStatement: SoulStatementDocument;
  philosophy: PhilosophyDocument;
  journey: JourneyDocument;
  productShowcase: ProductShowcaseDocument;
  purityStatement: PurityStatementDocument;
  craftsmanship: CraftsmanshipDocument;
  everyday: EverydayDocument;
  contactCta: ContactCtaDocument;
}

export interface CompanyDocument extends ContentDocument {
  name: string;
  displayName: string;
  countryLabel: string;
  legalName: string;
  description: string;
  url: string;
  foundingYear: number;
  contact: {
    email: string | null;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isCta?: boolean;
}

export interface NavigationDocument extends ContentDocument {
  ariaLabel: string;
  homeLabel: string;
  brandName: string;
  brandTagline: string;
  brandLogo: ImageAsset;
  items: NavigationItem[];
  openMenuLabel: string;
  closeMenuLabel: string;
  mobileMenuLabel: string;
  overlayCopyright: string;
}

export interface FooterDocument extends ContentDocument {
  tagline: string;
  socialLabelTemplate: string;
  labels: {
    contact: string;
    hours: string;
    maps: string;
    legalLinks: string;
    emailUnavailable: string;
  };
  contact: { phone: string; whatsapp: string; email: string | null };
  address: { company: string; street: string; city: string; state: string; postalCode: string; country: string; mapsUrl: string };
  workingHours: { weekdays: string; hours: string; closedDay: string; closedLabel: string };
  legalLinks: NavigationItem[];
  copyright: string;
}

export interface SocialLinkDocument {
  platform: string;
  url: string;
  icon: 'facebook' | 'instagram';
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price?: number;
  images: {
    main: string;
    gallery: string[];
  };
  features: Array<{ title: string; description: string; icon?: string }>;
  specifications: Record<string, string>;
  isAvailable: boolean;
}

export interface SeoDocument extends ContentDocument {
  title: string;
  description: string;
  keywords: string[];
  openGraphImage: ImageAsset;
  twitterImage: ImageAsset;
}

export interface SimplePageDocument extends ContentDocument {
  seo: SeoDocument;
  heading: string;
  description: string;
}

export type Company = CompanyDocument;
export type FooterData = FooterDocument;
export type NavigationMenu = {
  main: NavigationItem[];
  footer: Record<string, NavigationItem[]>;
};
export type SocialLink = SocialLinkDocument;
export type SEOMetadata = SeoDocument & {
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
};
