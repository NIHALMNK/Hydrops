import React from 'react';
import type { ProductUsage } from '@/features/products/types';

interface Props {
  uses: ProductUsage[];
}

export function ProductUsesSection({ uses }: Props) {
  if (!uses || uses.length === 0) return null;

  return (
    <section id="uses" className="py-20 md:py-28 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            VERSATILE APPLICATIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Daily Rituals & Uses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uses.map((u, idx) => (
            <div
              key={idx}
              className="product-section-fade p-8 rounded-[2rem] bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4">{u.icon || '🌿'}</div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{u.title}</h3>
                <p className="text-[#1A1A1A]/60 font-light text-sm leading-relaxed mb-6">{u.description}</p>
              </div>

              {u.suitabilityTags && u.suitabilityTags.length > 0 && (
                <div className="pt-4 border-t border-[#E5E0D8] flex flex-wrap gap-2">
                  {u.suitabilityTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#C8A96A]/10 text-[#C8A96A] border border-[#C8A96A]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
