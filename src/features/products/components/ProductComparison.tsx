import React from 'react';
import type { ProductComparisonItem } from '@/features/products/types';

interface Props {
  leftHeading: string;
  rightHeading: string;
  comparisonItems: ProductComparisonItem[];
}

export function ProductComparison({ leftHeading, rightHeading, comparisonItems }: Props) {
  if (!comparisonItems || comparisonItems.length === 0) return null;

  return (
    <section id="comparison" className="py-20 md:py-28 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            THE PURITY DIFFERENTIAL
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Why Hydrops Stands Alone
          </h2>
        </div>

        {/* Comparison Table Card */}
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-[#E5E0D8] overflow-hidden shadow-sm product-section-fade">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-[#FAF8F5] p-4 md:p-6 border-b border-[#E5E0D8] text-xs md:text-sm font-bold uppercase tracking-wider">
            <div className="col-span-4 text-[#1A1A1A]/50 font-medium">Parameter</div>
            <div className="col-span-4 text-[#1A1A1A]/40 text-center font-medium">{leftHeading || 'Ordinary Oil'}</div>
            <div className="col-span-4 text-[#C8A96A] text-center font-bold">{rightHeading || 'Hydrops Pure Oil'}</div>
          </div>

          {/* Body Rows */}
          <div className="divide-y divide-[#E5E0D8]">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 md:p-6 text-xs md:text-sm items-center transition-colors ${
                  item.isHighlight ? 'bg-[#C8A96A]/10' : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="col-span-4 font-semibold text-[#1A1A1A]">{item.label}</div>
                <div className="col-span-4 text-center text-[#1A1A1A]/50 font-light px-2">{item.leftValue}</div>
                <div className="col-span-4 text-center font-semibold text-[#8B6E30] px-2 flex items-center justify-center gap-1.5">
                  <span>✨</span>
                  <span>{item.rightValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
