import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { RelatedJournalArticle } from '@/features/products/types';

interface Props {
  articles: RelatedJournalArticle[];
}

export function RelatedJournalArticles({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 product-section-fade">
          <div>
            <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
              EXPLORE THE JOURNAL
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Related Insights & Botanical Science
            </h2>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-widest text-[#C8A96A] hover:text-[#8B6E30] transition-colors flex items-center gap-1"
          >
            <span>View All Articles</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="product-section-fade group rounded-[2rem] bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md overflow-hidden hover:border-[#C8A96A]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  {post.featuredImage?.src ? (
                    <Image
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest mb-2 font-mono">
                    {post.publishDate && <span>{post.publishDate}</span>}
                    {post.readingTime && <span>· {post.readingTime} min read</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#C8A96A] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-[#1A1A1A]/60 font-light line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 text-xs font-bold uppercase tracking-wider text-[#C8A96A] group-hover:text-[#8B6E30] flex items-center gap-1">
                <span>Read Article</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
