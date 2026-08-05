import React from 'react';
import type { BlogPostSummary } from '@/features/blog/types';
import { MasonryCard } from './MasonryCard';

interface Props {
  posts: BlogPostSummary[];
}

export function RelatedArticlesSection({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-neutral-200/80">
      {/* Section Header */}
      <div className="mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-3 border border-amber-500/20">
          <span>✨</span>
          <span>Curated Reading</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">
          You May Also Like
        </h3>
      </div>

      {/* Grid of Related Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {posts.map((post) => (
          <MasonryCard key={post.id || post.slug} post={post} variant="medium" />
        ))}
      </div>
    </section>
  );
}
