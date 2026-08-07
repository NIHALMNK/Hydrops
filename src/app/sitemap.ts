import { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site';
import { getBlogAllSlugs } from '@/lib/sanity/fetch/blog';
import { getProductAllSlugs } from '@/lib/sanity/fetch/product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Static routes with priorities & frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic Product routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const rawProductSlugs = await getProductAllSlugs();
    const productSlugs = Array.from(
      new Set(
        rawProductSlugs.filter(
          (slug) => typeof slug === 'string' && slug.trim() !== '' && !slug.startsWith('drafts.')
        )
      )
    );

    productRoutes = productSlugs.map((slug) => ({
      url: `${baseUrl}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching product slugs for sitemap:', error);
  }

  // Dynamic Blog / Journal routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const rawBlogSlugs = await getBlogAllSlugs();
    const blogSlugs = Array.from(
      new Set(
        rawBlogSlugs.filter(
          (slug) => typeof slug === 'string' && slug.trim() !== '' && !slug.startsWith('drafts.')
        )
      )
    );

    blogRoutes = blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

