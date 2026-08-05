export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductHighlight {
  title: string;
  description: string;
  icon: string;
  accentColor: 'gold' | 'amber' | 'emerald' | 'stone';
}

export interface ProductSpecification {
  title: string;
  value: string;
  unit?: string;
}

export interface ProductStorageCare {
  temperatureRange?: string;
  shelfLife?: string;
  storageTips: string[];
  thingsToAvoid: string[];
  bestBefore?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductUsage {
  title: string;
  description: string;
  icon: string;
  suitabilityTags: string[];
}

export interface ProductNutritionItem {
  label: string;
  amountPer100ml: string;
  amountPerServing?: string;
  dailyValue?: string;
  isSubNutrient: boolean;
}

export interface ProductProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  image: ProductImage | null;
  interestingFact?: string;
  estimatedDuration?: string;
}

export interface SupportingDocument {
  title: string;
  url: string;
  format: string;
}

export interface ProductCertification {
  name: string;
  logo: ProductImage;
  description?: string;
  issuer?: string;
  verificationUrl?: string;
  supportingDocuments: SupportingDocument[];
}

export interface ProductComparisonItem {
  label: string;
  leftValue: string;
  rightValue: string;
  isHighlight: boolean;
}

export interface ProductDownload {
  title: string;
  description?: string;
  category: 'brochure' | 'lab-report' | 'certificate' | 'spec-sheet';
  url: string;
  format: string;
  version?: string;
  updatedDate?: string;
}

export interface ProductQuickFact {
  question: string;
  answer: string;
  isPositive: boolean;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductStoryChapter {
  title: string;
  description: string;
  image: ProductImage;
  quote?: string;
}

export interface ProductSeo {
  metaTitle: string;
  metaDescription: string;
  socialImage: ProductImage | null;
  canonicalUrl: string;
  noIndex: boolean;
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  primaryFeaturedImage: ProductImage;
  highlights: ProductHighlight[];
  editorialStatus: 'draft' | 'review' | 'published' | 'archived';
  isFeatured: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  editorialStatus: 'draft' | 'review' | 'published' | 'archived';
  isFeatured: boolean;

  // Hero & Story
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryFeaturedImage: ProductImage;
  storyChapters: ProductStoryChapter[];
  highlights: ProductHighlight[];
  description: string;
  descriptionHtml: string;

  // Technical & Care
  specifications: ProductSpecification[];
  storageCare: ProductStorageCare | null;

  // Benefits & Applications
  benefits: ProductFeature[];
  uses: ProductUsage[];
  nutritionItems: ProductNutritionItem[];

  // Manufacturing & Proof
  manufacturingSteps: ProductProcessStep[];
  certifications: ProductCertification[];

  // Comparison
  comparisonHeadingLeft: string;
  comparisonHeadingRight: string;
  comparisonItems: ProductComparisonItem[];

  // Resources & FAQ
  downloads: ProductDownload[];
  quickFacts: ProductQuickFact[];
  faqs: ProductFaq[];

  // SEO
  seo: ProductSeo;
}

export interface ProductSettings {
  showcaseTitle: string;
  showcaseEyebrow: string;
  showcaseTagline: string;
  ctaHeadline: string;
  ctaSubtext: string;
  enableSectionNav: boolean;
  enableAnimation: boolean;
  showRelatedArticles: boolean;
  emptyStateText: string;
}

export interface RelatedJournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: ProductImage;
  publishDate: string;
  readingTime: number;
}

export interface ProductLandingData {
  settings: ProductSettings;
  flagshipProduct: ProductSummary | null;
  allProducts: ProductSummary[];
}

export interface ProductDetailData {
  product: ProductDetail;
  settings: ProductSettings;
  relatedArticles: RelatedJournalArticle[];
}
