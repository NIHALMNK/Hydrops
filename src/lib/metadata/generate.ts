import { Metadata } from 'next';
import { defaultMetadata } from './default';
import { siteConfig } from '@/constants/site';

export function generateMetadata(
  title: string,
  description?: string,
  path?: string,
  image?: string
): Metadata {
  const metaDescription = description || defaultMetadata.description || undefined;
  const pagePath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = `${siteConfig.url}${pagePath}`;
  const ogImageUrl = image || siteConfig.ogImage;

  return {
    ...defaultMetadata,
    title,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: metaDescription,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description: metaDescription,
      images: [ogImageUrl],
    },
  };
}

