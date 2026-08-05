import React from 'react';

interface Props {
  contentHtml: string;
  featuredQuote?: string;
}

export function ArticleContent({ contentHtml, featuredQuote }: Props) {
  return (
    <div className="article-body">
      {/* Optional Featured Pull Quote */}
      {featuredQuote && (
        <blockquote className="relative my-10 p-8 md:p-10 rounded-3xl bg-neutral-900 text-white shadow-xl overflow-hidden border border-neutral-800">
          <div className="absolute top-4 left-6 text-6xl text-amber-500/30 select-none font-serif">
            ❝
          </div>
          <p className="relative z-10 text-xl md:text-2xl font-light italic leading-relaxed text-amber-100 mb-4">
            &ldquo;{featuredQuote}&rdquo;
          </p>
          <cite className="relative z-10 block text-xs font-semibold uppercase tracking-widest text-amber-400 not-italic">
            — Key Takeaway
          </cite>
        </blockquote>
      )}

      {/* Main Parsed Markdown HTML */}
      <div
        className="prose prose-neutral max-w-none 
          prose-headings:font-light prose-headings:tracking-tight prose-headings:text-neutral-900
          prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pt-4 prose-h2:border-t prose-h2:border-neutral-200/80
          prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-neutral-700 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-amber-700 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-amber-800
          prose-strong:font-semibold prose-strong:text-neutral-900
          prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-neutral-800 prose-blockquote:bg-amber-500/5 prose-blockquote:rounded-r-xl
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:mb-2 prose-li:text-neutral-700
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
          prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8 prose-img:w-full prose-img:object-cover
          prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-neutral-800
          prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:overflow-x-auto
          prose-table:w-full prose-table:my-8 prose-table:text-sm prose-th:bg-neutral-100 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-neutral-200
          first-letter:float-left first-letter:text-5xl first-letter:font-light first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-700
        "
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
