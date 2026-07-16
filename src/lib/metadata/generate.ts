import { Metadata } from 'next';
import { defaultMetadata } from './default';

export function generateMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  return {
    ...defaultMetadata,
    title,
    description: description || defaultMetadata.description || undefined,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: description || defaultMetadata.description || undefined,
      url: path ? `${defaultMetadata.metadataBase}${path}` : defaultMetadata.metadataBase?.toString(),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description: description || defaultMetadata.description || undefined,
    },
  };
}
