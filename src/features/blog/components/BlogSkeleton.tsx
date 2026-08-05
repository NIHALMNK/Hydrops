import React from 'react';

export function BlogSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 animate-pulse space-y-12">
      {/* Hero Skeleton */}
      <div className="space-y-4 max-w-3xl">
        <div className="w-32 h-6 bg-neutral-200 rounded-full" />
        <div className="w-full h-12 bg-neutral-200 rounded-xl" />
        <div className="w-3/4 h-6 bg-neutral-200 rounded-lg" />
      </div>

      {/* Featured Card Skeleton */}
      <div className="w-full h-[450px] bg-neutral-200 rounded-3xl" />

      {/* Masonry Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-80 bg-neutral-200 rounded-2xl md:col-span-2" />
        <div className="h-80 bg-neutral-200 rounded-2xl" />
        <div className="h-80 bg-neutral-200 rounded-2xl" />
        <div className="h-80 bg-neutral-200 rounded-2xl" />
        <div className="h-80 bg-neutral-200 rounded-2xl" />
      </div>
    </div>
  );
}
