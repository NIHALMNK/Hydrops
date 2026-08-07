import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getBlogLandingData } from '@/lib/sanity/fetch/blog';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';
import { BlogLandingClient } from './BlogLandingClient';

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getBlogLandingData();

  const title = `${settings.journalTitle || 'Journal'} | Hydrops Pure Coconut Oil`;
  const description = settings.journalTagline || 'Stories of purity, health, cold-pressed extraction, and culinary craft from Hydrops.';

  return {
    title,
    description,
    alternates: {
      canonical: 'https://hydropsindia.com/blog',
    },
    openGraph: {
      title,
      description,
      url: 'https://hydropsindia.com/blog',
      type: 'website',
      images: [
        {
          url: 'https://hydropsindia.com/images/brand/logo.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://hydropsindia.com/images/brand/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPage() {
  const data = await getBlogLandingData();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar data={navigationData} />
      <BlogLandingClient data={data} />
      <Footer />
    </>
  );
}

