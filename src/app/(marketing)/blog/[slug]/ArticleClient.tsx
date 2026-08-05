'use client';

import React from 'react';
import type { BlogArticleData } from '@/features/blog/types';
import {
  ArticleProgressBar,
  ArticleHeader,
  TableOfContents,
  ArticleContent,
  ShareButtons,
  EmbeddedVideoSection,
  ArticleFooterMeta,
  RelatedArticlesSection,
} from '@/features/blog';
import { useBlogArticleAnimations } from '@/features/blog/animations/useBlogAnimations';

interface Props {
  data: BlogArticleData;
}

export function ArticleClient({ data }: Props) {
  const { post, related } = data;
  const containerRef = useBlogArticleAnimations();

  const showToc = !post.hideToc && post.toc && post.toc.length > 0;

  return (
    <article ref={containerRef} className="min-h-screen bg-neutral-50/40 pb-24 relative">
      {/* Top Reading Progress Bar */}
      <ArticleProgressBar />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Article Header */}
        <div className="article-header-animate">
          <ArticleHeader post={post} />
        </div>

        {/* Main Reading Section with Sticky TOC Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-10">
          {/* Main Article Content Column */}
          <div className={showToc ? 'lg:col-span-8' : 'lg:col-span-10 lg:col-start-2'}>
            <ArticleContent
              contentHtml={post.contentHtml}
              featuredQuote={post.featuredQuote}
            />

            {/* Share Buttons */}
            <ShareButtons title={post.title} />

            {/* Embedded YouTube Section */}
            <EmbeddedVideoSection
              youtubeUrl={post.youtubeUrl}
              hideVideo={post.hideVideo}
            />

            {/* Author Profile & Article Metadata */}
            <ArticleFooterMeta
              author={post.author}
              category={post.category}
              tags={post.tags}
              publishDate={post.publishDate}
            />
          </div>

          {/* Sticky Table of Contents Sidebar Column */}
          {showToc && (
            <aside className="hidden lg:block lg:col-span-4">
              <TableOfContents items={post.toc} />
            </aside>
          )}
        </div>

        {/* Related Articles */}
        <div className="article-related-animate">
          <RelatedArticlesSection posts={related} />
        </div>
      </div>
    </article>
  );
}
