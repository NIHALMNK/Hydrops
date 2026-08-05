/**
 * src/features/blog — Public API
 *
 * Clean barrel export for the Hydrops Journal feature.
 * Import components, hooks, types, and utils from '@/features/blog'.
 */

// Types
export * from './types';

// Landing Components
export { BlogJournalHero } from './components/BlogJournalHero';
export { BlogSearchBar } from './components/BlogSearchBar';
export { CategoryFilter } from './components/CategoryFilter';
export { FeaturedArticleCard } from './components/FeaturedArticleCard';
export { MasonryCard } from './components/MasonryCard';
export { EditorialMasonryGrid } from './components/EditorialMasonryGrid';
export { EmptyState } from './components/EmptyState';
export { LoadMore } from './components/LoadMore';
export { BlogSkeleton } from './components/BlogSkeleton';

// Article Components
export { ArticleProgressBar } from './components/ArticleProgressBar';
export { ArticleHeader } from './components/ArticleHeader';
export { TableOfContents } from './components/TableOfContents';
export { ArticleContent } from './components/ArticleContent';
export { ShareButtons } from './components/ShareButtons';
export { EmbeddedVideoSection } from './components/EmbeddedVideoSection';
export { ArticleFooterMeta } from './components/ArticleFooterMeta';
export { RelatedArticlesSection } from './components/RelatedArticlesSection';

// Hooks
export { useBlogSearch } from './hooks/useBlogSearch';
export { useCategoryFilter } from './hooks/useCategoryFilter';

// Utils & Services
export { getMasonryCardVariant, assignMasonryLayout } from './utils/masonry';
export { selectRelatedArticles } from './services/relatedArticles';
