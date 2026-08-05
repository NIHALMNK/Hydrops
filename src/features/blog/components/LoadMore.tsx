import React from 'react';

interface Props {
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export function LoadMore({ hasMore, onLoadMore, isLoading = false }: Props) {
  if (!hasMore) return null;

  return (
    <div className="pt-16 pb-8 text-center">
      <button
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-8 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-900 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 shadow-sm disabled:opacity-50"
      >
        {isLoading ? 'Loading stories...' : 'Load more stories'}
      </button>
    </div>
  );
}
