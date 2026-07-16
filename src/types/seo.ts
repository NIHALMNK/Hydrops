export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}
