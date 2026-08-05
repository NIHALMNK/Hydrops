import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getProductLandingData, getProductBySlug, getRelatedJournalArticles } from '@/lib/sanity/fetch/product';
import { ProductsLandingClient } from './ProductsLandingClient';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductLandingData();
  const title = `${data.settings.showcaseTitle} | Hydrops Water`;
  const description = data.settings.showcaseTagline || 'Discover authentic cold-pressed botanical extraction from Hydrops India.';

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

export default async function ProductsPage() {
  const data = await getProductLandingData();
  const relatedArticles = await getRelatedJournalArticles();

  let flagshipDetail = null;
  if (data.flagshipProduct?.slug) {
    flagshipDetail = await getProductBySlug(data.flagshipProduct.slug);
  } else if (data.allProducts.length > 0 && data.allProducts[0].slug) {
    flagshipDetail = await getProductBySlug(data.allProducts[0].slug);
  }

  return (
    <>
      <Navbar data={navigationData} />
      <main className="w-full min-h-screen bg-[#F5F2EC]">
        <ProductsLandingClient
          data={data}
          flagshipDetail={flagshipDetail}
          relatedArticles={relatedArticles}
        />
      </main>
      <Footer />
    </>
  );
}
