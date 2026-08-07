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

  const canonicalUrl = post.seo.canonicalUrl || `https://hydropsindia.com/blog/${post.slug}`;

  return {
    title,
    description,
    robots: post.seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: ogImage ? [{ url: ogImage, alt: post.title }] : [{ url: 'https://hydropsindia.com/images/brand/logo.png', alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : ['https://hydropsindia.com/images/brand/logo.png'],
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hydropsindia.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://hydropsindia.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.post.title,
        item: `https://hydropsindia.com/blog/${data.post.slug}`,
      },
    ],
  };

  // Google SEO JSON-LD Structured Data for Articles
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hydropsindia.com/blog/${data.post.slug}`,
    },
    headline: data.post.title,
    description: data.post.excerpt,
    image: data.post.featuredImage?.src ? [data.post.featuredImage.src] : ['https://hydropsindia.com/images/brand/logo.png'],
    datePublished: data.post.publishDate,
    author: {
      '@type': 'Person',
      name: data.post.author.name,
      jobTitle: data.post.author.designation,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hydrops',
      url: 'https://hydropsindia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hydropsindia.com/images/brand/logo.png',
        width: 1200,
        height: 630,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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

