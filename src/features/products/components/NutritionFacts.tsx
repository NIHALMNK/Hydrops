import React from 'react';
import type { ProductNutritionItem } from '@/features/products/types';

interface Props {
  nutritionItems: ProductNutritionItem[];
}

export function NutritionFacts({ nutritionItems }: Props) {
  if (!nutritionItems || nutritionItems.length === 0) return null;

  return (
    <section id="nutrition" className="py-20 md:py-28 bg-[#FAF8F5] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            NUTRITIONAL PROFILE
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Nutrition Facts
          </h2>
          <p className="text-[#1A1A1A]/60 font-light text-sm mt-2">
            Values per 100ml / 100g sample test analysis.
          </p>
        </div>

        {/* Nutrition Table Card */}
        <div className="max-w-2xl mx-auto p-8 md:p-10 rounded-[2rem] bg-white border border-neutral-300 shadow-md product-section-fade text-[#1A1A1A]">
          <div className="border-b-4 border-[#1A1A1A] pb-4 mb-4">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">Nutrition Facts</h3>
            <p className="text-xs text-[#1A1A1A]/60 font-light">Serving Size: 1 Tbsp (15ml) | Servings Per Container: ~33</p>
          </div>

          <div className="divide-y divide-neutral-200 text-sm">
            {nutritionItems.map((item, idx) => (
              <div
                key={idx}
                className={`py-3 flex items-center justify-between ${
                  item.isSubNutrient ? 'pl-6 text-[#1A1A1A]/60 text-xs' : 'font-semibold text-[#1A1A1A]'
                }`}
              >
                <span>{item.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#8B6E30] font-mono">{item.amountPer100ml}</span>
                  {item.dailyValue && (
                    <span className="text-xs text-[#1A1A1A]/40 font-mono">{item.dailyValue}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-neutral-200 pt-4 mt-4 text-[11px] text-[#1A1A1A]/50 leading-relaxed font-light">
            * Percent Daily Values are based on a 2,000 calorie diet. Lauric Acid (C12) & Caprylic Acid (C8) naturally occurring in cold-pressed virgin coconut oil.
          </div>
        </div>
      </div>
    </section>
  );
}
