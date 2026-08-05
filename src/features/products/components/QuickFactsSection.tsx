import React from 'react';
import type { ProductQuickFact } from '@/features/products/types';

interface Props {
  quickFacts: ProductQuickFact[];
}

export function QuickFactsSection({ quickFacts }: Props) {
  if (!quickFacts || quickFacts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-2">
            QUICK REFERENCE SUMMARY
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#1A1A1A]">
            Frequently Asked Facts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {quickFacts.map((fact, idx) => (
            <div
              key={idx}
              className="product-section-fade p-5 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm flex items-center justify-between"
            >
              <span className="text-xs font-medium text-[#1A1A1A] pr-2">{fact.question}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                  fact.isPositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                }`}
              >
                {fact.answer}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
