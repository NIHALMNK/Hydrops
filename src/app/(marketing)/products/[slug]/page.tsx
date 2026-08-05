import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getProductDetailData, getProductAllSlugs } from '@/lib/sanity/fetch/product';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProductAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getProductDetailData(decodedSlug);

  if (!data || !data.product) {
    return {
      title: 'Product Not Found | Hydrops Water',
    };
  }

  const { product } = data;
  const title = product.seo.metaTitle || `${product.name} | Hydrops Water`;
  const description = product.seo.metaDescription || product.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: product.primaryFeaturedImage?.src ? [product.primaryFeaturedImage.src] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.primaryFeaturedImage?.src ? [product.primaryFeaturedImage.src] : [],
    },
    robots: {
      index: !product.seo.noIndex,
      follow: !product.seo.noIndex,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getProductDetailData(decodedSlug);

  if (!data || !data.product) {
    notFound();
  }

  return (
    <>
      <Navbar data={navigationData} />
      <main className="w-full min-h-screen bg-[#F5F2EC]">
        <ProductDetailClient data={data} />
      </main>
      <Footer />
    </>
  );
}
