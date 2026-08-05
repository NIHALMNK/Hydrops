import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/features/blog/types';

interface Props {
  post: BlogPost;
}

export function ArticleHeader({ post }: Props) {
  const formattedDate = post.publishDate || '';

  return (
    <header className="pt-12 pb-10 md:pt-16 md:pb-14 max-w-4xl mx-auto text-left">
      {/* Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <span>←</span>
          <span>Back to Journal</span>
        </Link>
      </div>

      {/* Category & Series Badges */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {post.category?.title && (
          <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/20">
            {post.category.icon ? `${post.category.icon} ` : ''}
            {post.category.title}
          </span>
        )}

        {post.series && (
          <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200">
            Series: {post.series.title} {post.partNumber ? `(Part ${post.partNumber})` : ''}
          </span>
        )}
      </div>

      {/* Article Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-900 leading-[1.12] mb-6">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-lg md:text-2xl font-normal text-neutral-600 leading-relaxed mb-8">
          {post.excerpt}
        </p>
      )}

      {/* Author & Publication Meta Bar */}
      <div className="flex items-center justify-between py-6 border-y border-neutral-200/80 flex-wrap gap-4 text-xs text-neutral-600">
        {/* Author Byline */}
        <div className="flex items-center gap-3">
          {post.author.avatar?.src ? (
            <Image
              src={post.author.avatar.src}
              alt={post.author.name}
              width={44}
              height={44}
              className="rounded-full object-cover border border-neutral-200"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-amber-500/10 text-amber-700 font-bold flex items-center justify-center text-sm border border-amber-500/20">
              {post.author.name.charAt(0)}
            </div>
          )}

          <div>
            <p className="font-semibold text-neutral-900 text-sm">{post.author.name}</p>
            <p className="text-neutral-500 text-xs">{post.author.designation}</p>
          </div>
        </div>

        {/* Read time & date */}
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <span>{post.readingTime} min read</span>
          <span>·</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage?.src && (
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[540px] rounded-3xl overflow-hidden mt-10 shadow-lg border border-neutral-200/60">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt || post.title}
            fill
            priority // Article hero image always uses priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
