import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getProductLandingData, getProductBySlug, getRelatedJournalArticles } from '@/lib/sanity/fetch/product';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';
import { ProductsLandingClient } from './ProductsLandingClient';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductLandingData();
  const title = `${data.settings.showcaseTitle || 'Products'} | Hydrops Pure Coconut Oil`;
  const description = data.settings.showcaseTagline || 'Discover double-filtered virgin coconut oil products from Hydrops India.';

  return {
    title,
    description,
    alternates: {
      canonical: 'https://hydropsindia.com/products',
    },
    openGraph: {
      title,
      description,
      url: 'https://hydropsindia.com/products',
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

export default async function ProductsPage() {
  const data = await getProductLandingData();
  const relatedArticles = await getRelatedJournalArticles();

  let flagshipDetail = null;
  if (data.flagshipProduct?.slug) {
    flagshipDetail = await getProductBySlug(data.flagshipProduct.slug);
  } else if (data.allProducts.length > 0 && data.allProducts[0].slug) {
    flagshipDetail = await getProductBySlug(data.allProducts[0].slug);
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/products' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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

