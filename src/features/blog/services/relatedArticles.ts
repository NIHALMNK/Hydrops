/**
 * src/features/blog/services/relatedArticles.ts
 *
 * Scores and selects related articles for a given post.
 *
 * The algorithm mirrors editorial intuition:
 *   - Same category  = high relevance
 *   - Shared tag     = medium relevance (per tag)
 *   - Same series    = bonus relevance
 *   - Recency        = minor tie-breaker
 *
 * The adapter fetches a broad pool from Sanity (10 candidates).
 * This service scores and slices to the count defined in Settings.
 */

import type { BlogPostSummary } from '@/features/blog/types';

interface ScoredPost {
  post: BlogPostSummary;
  score: number;
}

/** Score weights. Tune here without changing the rest of the system. */
const WEIGHTS = {
  sameCategory: 10,
  sharedTag: 3,
  sameSeries: 5,
} as const;

/**
 * Score a candidate post against the reference post.
 *
 * @param candidate   The candidate post to evaluate.
 * @param reference   The current article being read.
 * @returns           Relevance score (higher = more relevant).
 */
function scorePost(candidate: BlogPostSummary, reference: BlogPostSummary): number {
  let score = 0;

  // Same category
  if (candidate.category?.id && reference.category?.id && candidate.category.id === reference.category.id) {
    score += WEIGHTS.sameCategory;
  }

  // Shared tags (safely handle optional/empty tags)
  const candidateTags = candidate.tags ?? [];
  const referenceTags = reference.tags ?? [];
  const refTagIds = new Set(referenceTags.map((t) => t.id));
  const sharedTags = candidateTags.filter((t) => refTagIds.has(t.id)).length;
  score += sharedTags * WEIGHTS.sharedTag;

  // Same series
  if (reference.series && candidate.series?.id === reference.series.id) {
    score += WEIGHTS.sameSeries;
  }

  return score;
}

/**
 * Select and rank related articles for a given reference post.
 *
 * @param candidates  Pool of candidate posts fetched from Sanity/fallback.
 * @param reference   The article the user is currently reading.
 * @param limit       Maximum number of related articles to return.
 * @returns           Ranked list of related posts, most relevant first.
 */
export function selectRelatedArticles(
  candidates: BlogPostSummary[],
  reference: BlogPostSummary,
  limit: number,
): BlogPostSummary[] {
  if (!candidates || candidates.length === 0) return [];

  const scored: ScoredPost[] = candidates
    .filter((c) => c.id !== reference.id) // exclude self
    .map((post) => ({ post, score: scorePost(post, reference) }))
    .filter(({ score }) => score > 0) // only posts with actual relevance
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tie-break: more recent first
      return new Date(b.post.publishDate).getTime() - new Date(a.post.publishDate).getTime();
    });

  // If we don't have enough scored results, pad with the most recent candidates
  if (scored.length < limit) {
    const scoredIds = new Set(scored.map(({ post }) => post.id));
    const unscored = candidates
      .filter((c) => !scoredIds.has(c.id) && c.id !== reference.id)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    const padding: ScoredPost[] = unscored
      .slice(0, limit - scored.length)
      .map((post) => ({ post, score: 0 }));

    scored.push(...padding);
  }

  return scored.slice(0, limit).map(({ post }) => post);
}
