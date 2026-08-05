import React from 'react';
import type { ProductHighlight } from '@/features/products/types';

interface Props {
  highlights: ProductHighlight[];
}

export function ProductHighlights({ highlights }: Props) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section id="highlights" className="py-20 md:py-28 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            DISTINCTION AT A GLANCE
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            The Key Pillars of Hydrops Purity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={item.title ? `highlight-${item.title}-${idx}` : `highlight-${idx}`}
              className="product-highlight-card p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md hover:border-[#C8A96A]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center text-xl mb-6 border border-[#C8A96A]/20">
                  {item.icon || '✨'}
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-[#1A1A1A]/60 font-light text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
