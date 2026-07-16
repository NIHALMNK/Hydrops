import { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site';
import { ROUTES } from '@/constants/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ROUTES.HOME,
    ROUTES.ABOUT,
    ROUTES.PRODUCTS,
    ROUTES.CONTACT,
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === ROUTES.HOME ? 1 : 0.8,
  }));

  return [...routes];
}
