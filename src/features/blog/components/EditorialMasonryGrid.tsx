import React from 'react';
import type { BlogPostSummary } from '@/features/blog/types';
import { assignMasonryLayout } from '../utils/masonry';
import { MasonryCard } from './MasonryCard';

interface Props {
  posts: BlogPostSummary[];
}

export function EditorialMasonryGrid({ posts }: Props) {
  const assigned = assignMasonryLayout(posts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
      {assigned.map(({ item, variant, index }) => (
        <div
          key={item.id || item.slug || index}
          className={variant === 'large' ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
        >
          <MasonryCard post={item} variant={variant} />
        </div>
      ))}
    </div>
  );
}
