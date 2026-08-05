import React from 'react';
import type { ProductFeature, ProductUsage } from '@/features/products/types';

interface Props {
  benefits: ProductFeature[];
  uses: ProductUsage[];
}

export function BenefitsAndUses({ benefits, uses }: Props) {
  if ((!benefits || benefits.length === 0) && (!uses || uses.length === 0)) return null;

  return (
    <section id="benefits-and-uses" className="py-16 md:py-24 bg-[#FAF8F5] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-2">
            HOLISTIC PURITY
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Benefits & Everyday Uses
          </h2>
        </div>

        {/* Benefits Grid */}
        {benefits && benefits.length > 0 && (
          <div className="mb-14">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C8A96A] mb-6 text-center">
              Physiological Advantages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="product-section-fade p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center text-xl mb-4 border border-[#C8A96A]/20">
                    {b.icon || '💧'}
                  </div>
                  <h4 className="text-base font-semibold text-[#1A1A1A] mb-2">{b.title}</h4>
                  <p className="text-[#1A1A1A]/60 font-light text-xs leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uses & Applications Grid */}
        {uses && uses.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C8A96A] mb-6 text-center">
              Daily Application Rituals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uses.map((u, idx) => (
                <div
                  key={idx}
                  className="product-section-fade p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl mb-3">{u.icon || '🌿'}</div>
                    <h4 className="text-base font-semibold text-[#1A1A1A] mb-2">{u.title}</h4>
                    <p className="text-[#1A1A1A]/60 font-light text-xs leading-relaxed mb-4">{u.description}</p>
                  </div>

                  {u.suitabilityTags && u.suitabilityTags.length > 0 && (
                    <div className="pt-3 border-t border-[#E5E0D8] flex flex-wrap gap-1.5">
                      {u.suitabilityTags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-[#C8A96A]/10 text-[#C8A96A] border border-[#C8A96A]/20"
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
        )}
      </div>
    </section>
  );
}
