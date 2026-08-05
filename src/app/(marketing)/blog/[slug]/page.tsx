import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import {
  getBlogArticleData,
  getBlogAllSlugs,
} from '@/lib/sanity/fetch/blog';
import { ArticleClient } from './ArticleClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getBlogArticleData(decodedSlug);

  if (!data) {
    return { title: 'Article Not Found | Hydrops Journal' };
  }

  const { post } = data;
  const title = post.seo.metaTitle || `${post.title} | Hydrops Journal`;
  const description = post.seo.metaDescription || post.excerpt;
  const ogImage = post.seo.socialImage?.src || post.featuredImage?.src;

  return {
    title,
    description,
    robots: post.seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: post.seo.canonicalUrl || undefined,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: ogImage ? [{ url: ogImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getBlogArticleData(decodedSlug);

  if (!data) {
    notFound();
  }

  // Google SEO JSON-LD Structured Data for Articles
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.post.title,
    description: data.post.excerpt,
    image: data.post.featuredImage?.src || undefined,
    datePublished: data.post.publishDate,
    author: {
      '@type': 'Person',
      name: data.post.author.name,
      jobTitle: data.post.author.designation,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hydrops India',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hydrops.in/images/logo.png',
      },
    },
  };

  return (
    <>
      {/* JSON-LD Article Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar data={navigationData} />
      <ArticleClient data={data} />
      <Footer />
    </>
  );
}
