import { useState, useMemo } from 'react';
import type { BlogPostSummary, BlogCategory } from '@/features/blog/types';

/**
 * Custom hook for category filtering.
 * Supports 'All' (null or 'all') or selecting a specific category slug.
 */
export function useCategoryFilter(posts: BlogPostSummary[], categories: BlogCategory[]) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');

  const filteredPosts = useMemo(() => {
    if (selectedCategorySlug === 'all') return posts;
    return posts.filter((post) => post.category.slug === selectedCategorySlug);
  }, [posts, selectedCategorySlug]);

  const activeCategory = useMemo(() => {
    if (selectedCategorySlug === 'all') return null;
    return categories.find((c) => c.slug === selectedCategorySlug) ?? null;
  }, [categories, selectedCategorySlug]);

  return {
    selectedCategorySlug,
    setSelectedCategorySlug,
    activeCategory,
    filteredPosts,
    resetCategory: () => setSelectedCategorySlug('all'),
  };
}
