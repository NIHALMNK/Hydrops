import { useState, useMemo } from 'react';
import type { BlogPostSummary } from '@/features/blog/types';

/**
 * Custom hook for client-side instant search filtering of articles.
 * Matches against article title, excerpt, category title, and tag names.
 */
export function useBlogSearch(posts: BlogPostSummary[]) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return posts;

    return posts.filter((post) => {
      const matchTitle = post.title.toLowerCase().includes(trimmed);
      const matchExcerpt = post.excerpt.toLowerCase().includes(trimmed);
      const matchCategory = post.category.title.toLowerCase().includes(trimmed);
      const matchTags = post.tags.some((tag) => tag.name.toLowerCase().includes(trimmed));

      return matchTitle || matchExcerpt || matchCategory || matchTags;
    });
  }, [posts, query]);

  return {
    query,
    setQuery,
    filteredPosts,
    hasQuery: query.trim().length > 0,
    resetSearch: () => setQuery(''),
  };
}
