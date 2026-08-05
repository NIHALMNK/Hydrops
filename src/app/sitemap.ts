import { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site';
import { ROUTES } from '@/constants/routes';
import { getBlogAllSlugs } from '@/lib/sanity/fetch/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    ROUTES.HOME,
    ROUTES.ABOUT,
    ROUTES.PRODUCTS,
    ROUTES.CONTACT,
    '/blog',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === ROUTES.HOME ? 1 : 0.8,
  }));

  // Add all Journal article URLs dynamically
  try {
    const articleSlugs = await getBlogAllSlugs();
    const articleRoutes = articleSlugs.map((slug) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, ...articleRoutes];
  } catch {
    return [...routes];
  }
}
