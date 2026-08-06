import type { ImageAsset } from '@/data/types';

export interface ContactCtaButton {
  type: 'call' | 'whatsapp' | 'email' | 'custom';
  label: string;
  url: string;
}

export interface ContactHeroData {
  eyebrow: string;
  heading: string;
  highlightedWord: string;
  description: string;
  backgroundImage?: ImageAsset;
}

export interface ContactCardsData {
  phone: {
    title: string;
    phoneNumbers: string[];
  };
  whatsapp: {
    title: string;
    buttonText: string;
    whatsappNumber: string;
  };
  location: {
    title: string;
    address: string;
    googleMapsUrl: string;
  };
  businessHours: {
    title: string;
    workingHours: string;
  };
}

export interface ContactFormContentData {
  sectionTitle: string;
  heading: string;
  description: string;
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
  labels: {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  placeholders: {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
}

export interface ContactMapData {
  googleMapsUrl: string;
  mapEmbedUrl?: string;
}

export interface ContactCtaSectionData {
  title: string;
  description: string;
  buttons: ContactCtaButton[];
}

export interface ContactPageData {
  hero: ContactHeroData;
  cards: ContactCardsData;
  formContent: ContactFormContentData;
  map: ContactMapData;
  cta: ContactCtaSectionData;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website?: string; // Honeypot field
  formLoadedAt?: number; // Form load timestamp for min submit time check
}

export interface SubmissionMetadata {
  userAgent?: string;
  referer?: string;
}

export interface SubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
}
