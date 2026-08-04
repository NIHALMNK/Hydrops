import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

import { blogData } from '@/data/blog/blog';
import { blogSeo } from '@/data/site/seo';
import { BlogHero, TopicPreview } from '@/features/blog';
import { BlogAnimationWrapper } from './BlogClient';

export const metadata: Metadata = {
  title: blogSeo.title,
  description: blogSeo.description,
  robots: blogSeo.robots,
  openGraph: { title: blogSeo.title, description: blogSeo.description, images: [blogSeo.openGraphImage.src] },
};

export default function BlogPage() {
  return (
    <>
      <Navbar data={navigationData} />
      
      <BlogAnimationWrapper>
        <BlogHero data={blogData.hero} />
        <TopicPreview data={blogData.topics} />
      </BlogAnimationWrapper>

      <Footer />
    </>
  );
}
