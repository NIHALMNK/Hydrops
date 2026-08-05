import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostSummary } from '@/features/blog/types';
import type { MasonryCardVariant } from '../utils/masonry';

interface Props {
  post: BlogPostSummary;
  variant?: MasonryCardVariant;
}

export function MasonryCard({ post, variant = 'medium' }: Props) {
  const formattedDate = post.publishDate || '';

  // Aspect ratio & typography sizing based on card variant
  const imageHeightClass =
    variant === 'large'
      ? 'h-64 sm:h-72 md:h-80'
      : variant === 'tall'
      ? 'h-72 sm:h-80 md:h-96'
      : variant === 'medium'
      ? 'h-52 sm:h-60'
      : 'h-44 sm:h-48';

  const titleSizeClass =
    variant === 'large' || variant === 'tall'
      ? 'text-xl md:text-2xl font-light'
      : 'text-base md:text-lg font-normal';

  return (
    <article className="group flex flex-col h-full rounded-2xl bg-white border border-neutral-200/80 overflow-hidden hover:shadow-xl hover:border-neutral-300 transition-all duration-500 hover:-translate-y-1.5">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className={`relative w-full ${imageHeightClass} overflow-hidden bg-neutral-100`}>
          {post.featuredImage.src ? (
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt || post.title}
              fill
              loading="lazy" // User rule: lazy loading for grid images
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs">
              Hydrops Journal
            </div>
          )}

          {/* Category Chip Overlay */}
          {post.category?.title && (
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-neutral-900 border border-black/5 shadow-xs group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors duration-300">
                {post.category.icon ? `${post.category.icon} ` : ''}
                {post.category.title}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            {/* Title with subtle gold underline hover effect */}
            <h3 className={`${titleSizeClass} tracking-tight text-neutral-900 leading-snug mb-3 group-hover:text-amber-700 transition-colors duration-300 relative inline-block`}>
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-neutral-600 text-xs md:text-sm font-normal leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-4 mt-auto border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span className="font-medium text-neutral-800 text-[11px] truncate max-w-[140px]">
              {post.author.name}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
              <span className="font-medium text-neutral-600">{post.readingTime} min read</span>
              {formattedDate && <span>· {formattedDate}</span>}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
