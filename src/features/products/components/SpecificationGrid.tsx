import React from 'react';
import type { ProductSpecification, ProductStorageCare } from '@/features/products/types';

interface Props {
  specifications: ProductSpecification[];
  storageCare: ProductStorageCare | null;
}

export function SpecificationGrid({ specifications, storageCare }: Props) {
  return (
    <section id="specifications" className="py-20 md:py-28 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            TECHNICAL PROFILE & METRICS
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Specifications & Storage Guidelines
          </h2>
        </div>

        {/* Specifications Grid */}
        {specifications && specifications.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 product-section-fade">
            {specifications.map((spec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md hover:border-[#C8A96A]/30 transition-all duration-300"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-[#C8A96A] mb-1">
                  {spec.title}
                </p>
                <p className="text-xl font-light text-[#1A1A1A]">
                  {spec.value} {spec.unit ? <span className="text-xs text-[#1A1A1A]/50 font-normal">{spec.unit}</span> : ''}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Storage & Care Card */}
        {storageCare && (
          <div className="p-8 md:p-12 rounded-[2rem] bg-white border border-[#E5E0D8] shadow-sm product-section-fade">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-3 border-b border-[#E5E0D8] pb-4">
                <span className="text-2xl">🌿</span>
                <h3 className="text-xl font-semibold text-[#1A1A1A]">Storage & Handling Care</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {storageCare.temperatureRange && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C8A96A] mb-1">Ideal Temperature</p>
                    <p className="text-sm text-[#1A1A1A]/70 font-light">{storageCare.temperatureRange}</p>
                  </div>
                )}

                {storageCare.shelfLife && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C8A96A] mb-1">Shelf Life</p>
                    <p className="text-sm text-[#1A1A1A]/70 font-light">{storageCare.shelfLife}</p>
                  </div>
                )}
              </div>

              {storageCare.storageTips && storageCare.storageTips.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C8A96A] mb-2">Optimal Care Tips</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#1A1A1A]/70 font-light list-disc pl-4">
                    {storageCare.storageTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
