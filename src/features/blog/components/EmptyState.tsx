import React from 'react';

interface Props {
  query?: string;
  categoryName?: string;
  onReset: () => void;
}

export function EmptyState({ query, categoryName, onReset }: Props) {
  return (
    <div className="py-24 text-center max-w-md mx-auto">
      {/* Coconut / Botanical Aesthetic Icon */}
      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6 text-2xl">
        🌴
      </div>
      <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-tight">No stories matched your search</h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-8">
        {query
          ? `We couldn't find any articles matching "${query}". Try exploring another topic.`
          : categoryName
          ? `No articles available under "${categoryName}" yet.`
          : 'Explore another topic or reset your filters to discover more stories.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="px-6 py-3 rounded-full bg-neutral-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Explore all stories
      </button>
    </div>
  );
}
