import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getBlogLandingData } from '@/lib/sanity/fetch/blog';
import { BlogLandingClient } from './BlogLandingClient';

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getBlogLandingData();

  const title = `${settings.journalTitle || 'Journal'} | Hydrops Water`;
  const description = settings.journalTagline || 'Stories of purity, health, and craft.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPage() {
  const data = await getBlogLandingData();

  return (
    <>
      <Navbar data={navigationData} />
      <BlogLandingClient data={data} />
      <Footer />
    </>
  );
}
