import { SEOMetadata } from '@/types';
import { siteConfig } from '@/constants/site';

export const defaultSEO: SEOMetadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['coconut oil', 'premium coconut oil', 'corporate gifting', 'hydrops'],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};
