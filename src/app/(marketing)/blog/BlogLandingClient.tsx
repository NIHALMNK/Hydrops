'use client';

import React, { useState, useMemo } from 'react';
import type { BlogLandingData, BlogPostSummary } from '@/features/blog/types';
import {
  BlogJournalHero,
  BlogSearchBar,
  CategoryFilter,
  FeaturedArticleCard,
  EditorialMasonryGrid,
  EmptyState,
  LoadMore,
  useBlogSearch,
  useCategoryFilter,
} from '@/features/blog';
import { useBlogLandingAnimations } from '@/features/blog/animations/useBlogAnimations';

interface Props {
  data: BlogLandingData;
}

export function BlogLandingClient({ data }: Props) {
  const { settings, categories, featured, latest } = data;
  const containerRef = useBlogLandingAnimations();

  // Combine featured (if not already in latest) + latest into all pool
  const allPosts = useMemo(() => {
    const pool: BlogPostSummary[] = [];
    if (featured) pool.push(featured);
    for (const post of latest) {
      if (!pool.some((p) => p.id === post.id)) {
        pool.push(post);
      }
    }
    return pool;
  }, [featured, latest]);

  // Search hook
  const { query, setQuery, filteredPosts: searchFilteredPosts, resetSearch } = useBlogSearch(allPosts);

  // Category filter hook
  const {
    selectedCategorySlug,
    setSelectedCategorySlug,
    activeCategory,
    filteredPosts: finalPosts,
    resetCategory,
  } = useCategoryFilter(searchFilteredPosts, categories);

  // Pagination / Load More state
  const perPage = settings.articlesPerPage || 9;
  const [displayCount, setDisplayCount] = useState(perPage);

  // Determine if featured article card should be highlighted separately
  const isDefaultView = !query && selectedCategorySlug === 'all';
  const displayFeatured = isDefaultView ? featured : null;

  // Grid posts
  const gridPosts = useMemo(() => {
    if (displayFeatured) {
      return finalPosts.filter((p) => p.id !== displayFeatured.id);
    }
    return finalPosts;
  }, [finalPosts, displayFeatured]);

  // Paginated subset
  const visibleGridPosts = useMemo(() => {
    return gridPosts.slice(0, displayCount);
  }, [gridPosts, displayCount]);

  const hasMore = displayCount < gridPosts.length;

  const handleResetAll = () => {
    resetSearch();
    resetCategory();
    setDisplayCount(perPage);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-50/50 pb-24">
      {/* Hero Section */}
      <div className="blog-hero-animate">
        <BlogJournalHero
          settings={settings}
          articleCount={allPosts.length}
          categoryCount={categories.length}
        />
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="blog-controls-animate max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        {settings.enableCategories && (
          <div className="flex-1 overflow-hidden">
            <CategoryFilter
              categories={categories}
              selectedCategorySlug={selectedCategorySlug}
              onSelectCategory={(slug) => {
                setSelectedCategorySlug(slug);
                setDisplayCount(perPage);
              }}
            />
          </div>
        )}

        {settings.enableSearch && (
          <div className="w-full md:w-auto">
            <BlogSearchBar
              query={query}
              onQueryChange={(q) => {
                setQuery(q);
                setDisplayCount(perPage);
              }}
              onClear={() => setQuery('')}
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Featured Story Hero (Default View) */}
        {displayFeatured && (
          <div className="blog-featured-animate mb-12">
            <FeaturedArticleCard post={displayFeatured} />
          </div>
        )}

        {/* Grid Section Header (if filtering/searching) */}
        {!isDefaultView && (
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Showing {finalPosts.length} {finalPosts.length === 1 ? 'story' : 'stories'}
              {activeCategory ? ` in ${activeCategory.title}` : ''}
              {query ? ` for "${query}"` : ''}
            </p>
            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs font-semibold uppercase tracking-wider text-amber-700 hover:text-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/40 rounded px-1"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Masonry Grid */}
        {visibleGridPosts.length > 0 ? (
          <>
            <div className="blog-card-animate">
              <EditorialMasonryGrid posts={visibleGridPosts} />
            </div>
            <LoadMore
              hasMore={hasMore}
              onLoadMore={() => setDisplayCount((prev) => prev + perPage)}
            />
          </>
        ) : (
          !displayFeatured && (
            <EmptyState
              query={query}
              categoryName={activeCategory?.title}
              onReset={handleResetAll}
            />
          )
        )}
      </main>
    </div>
  );
}
