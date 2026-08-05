import React from 'react';
import Image from 'next/image';
import type { ProductStoryChapter } from '@/features/products/types';

interface Props {
  storyChapters: ProductStoryChapter[];
  descriptionHtml: string;
}

export function CraftsmanshipStory({ storyChapters, descriptionHtml }: Props) {
  return (
    <section id="story" className="relative py-24 md:py-32 bg-[#111111] text-white overflow-hidden border-b border-white/10">
      {/* Gold thread top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.45), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-4">
            BOTANICAL HERITAGE & SCIENCE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            The Story of Uncompromising Purity
          </h2>
          <p className="mt-4 text-white/50 font-light text-base md:text-lg leading-relaxed">
            Every drop represents a disciplined synthesis of coastal Kerala agricultural wisdom, low-RPM expeller technology, and physical micro-filtration.
          </p>
        </div>

        {/* Apple-style Cinematic Story Chapters */}
        {storyChapters && storyChapters.length > 0 && (
          <div className="space-y-20 md:space-y-28 mb-24">
            {storyChapters.map((chapter, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`product-story-chapter grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Image Column (6 cols) */}
                  <div className={`lg:col-span-6 relative aspect-[16/10] rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    {chapter.image?.src ? (
                      <Image
                        src={chapter.image.src}
                        alt={chapter.image.alt || chapter.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-900" />
                    )}
                  </div>

                  {/* Narrative Column (6 cols) */}
                  <div className={`lg:col-span-6 flex flex-col justify-center space-y-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.3em]">
                      Chapter 0{idx + 1}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                      {chapter.title}
                    </h3>
                    <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                      {chapter.description}
                    </p>
                    {chapter.quote && (
                      <blockquote className="p-5 rounded-2xl bg-white/5 border-l-2 border-[#C8A96A] text-[#C8A96A] text-xs font-light italic leading-relaxed">
                        &ldquo;{chapter.quote}&rdquo;
                      </blockquote>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Markdown Story Content Body */}
        {descriptionHtml && (
          <div className="max-w-4xl mx-auto p-8 md:p-14 rounded-[2rem] bg-neutral-900/90 border border-white/10 shadow-2xl product-section-fade">
            <div
              className="prose prose-invert max-w-none 
                prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-t prose-h2:border-white/10 prose-h2:pt-6
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-white/70 prose-p:font-light prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-[#C8A96A] prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-[#C8A96A] prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-[#C8A96A]
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:mb-2 prose-li:text-white/70
                prose-table:w-full prose-table:my-8 prose-th:bg-black/50 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-white/10
              "
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        )}
      </div>

      {/* Gold thread bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.35), transparent)',
        }}
      />
    </section>
  );
}
