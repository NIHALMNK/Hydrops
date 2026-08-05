import React from 'react';
import type { ProductFeature } from '@/features/products/types';

interface Props {
  benefits: ProductFeature[];
}

export function BenefitsSection({ benefits }: Props) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section id="benefits" className="py-20 md:py-28 bg-[#FAF8F5] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            PHYSIOLOGICAL ADVANTAGES
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Biochemical & Health Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="product-section-fade p-8 rounded-[2rem] bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md hover:border-[#C8A96A]/40 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#C8A96A]/10 text-[#C8A96A] flex items-center justify-center text-2xl mb-6 border border-[#C8A96A]/20">
                {b.icon || '💧'}
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{b.title}</h3>
              <p className="text-[#1A1A1A]/60 font-light text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
