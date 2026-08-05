import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostSummary } from '@/features/blog/types';

interface Props {
  post: BlogPostSummary;
}

export function FeaturedArticleCard({ post }: Props) {
  const formattedDate = post.publishDate || '';

  return (
    <article className="group relative w-full overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl hover:shadow-2xl mb-16 transition-all duration-500 border border-neutral-800 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Featured Image Column (7 cols) */}
        <div className="lg:col-span-7 relative h-80 lg:h-auto overflow-hidden">
          {post.featuredImage.src ? (
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt || post.title}
              fill
              priority // User rule: ONLY featured article image has priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800" />
          )}
          {/* Vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950/90" />
        </div>

        {/* Content Column (5 cols) */}
        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between z-10 bg-neutral-900/90 backdrop-blur-xs">
          <div>
            {/* Category & Editor's Pick Badge */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-400 text-neutral-950 shadow-sm">
                Editor&apos;s Pick
              </span>
              {post.category?.title && (
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                  {post.category.icon ? `${post.category.icon} ` : ''}
                  {post.category.title}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white leading-tight mb-4 group-hover:text-amber-300 transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-neutral-300 text-sm md:text-base font-normal leading-relaxed line-clamp-3 mb-8">
              {post.excerpt}
            </p>

            {/* Read Article CTA */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors mb-8">
              <span>Read Article</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            {/* Author info */}
            <div className="flex items-center gap-3">
              {post.author.avatar.src ? (
                <Image
                  src={post.author.avatar.src}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover border border-neutral-700"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-neutral-200">{post.author.name}</p>
                <p className="text-[10px] text-neutral-400">{post.author.designation}</p>
              </div>
            </div>

            {/* Read time & date */}
            <div className="text-right text-[11px] text-neutral-400">
              <p className="font-medium text-neutral-300">{post.readingTime} min read</p>
              {formattedDate && <p className="text-[10px] text-neutral-500">{formattedDate}</p>}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
