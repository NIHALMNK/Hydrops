import type { BlogPageData } from '@/features/blog/types';

export const blogData: BlogPageData = {
  hero: {
    eyebrow: 'JOURNAL',
    headline: 'Blog',
    description: "We're preparing a collection of articles, product stories, behind-the-scenes content, coconut knowledge, wellness tips, and company updates.\n\nOur journal will be available soon.",
    primaryCta: { label: '', href: '' },
    secondaryCta: { label: '', href: '' },
  },
  topics: {
    headline: "",
    topics: [
      { title: 'Product Stories' },
      { title: 'Health & Wellness' },
      { title: 'Recipes & Tips' },
    ],
  },
};
