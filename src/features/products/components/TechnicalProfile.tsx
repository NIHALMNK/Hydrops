import React from 'react';
import type { ProductSpecification, ProductStorageCare } from '@/features/products/types';

interface Props {
  specifications: ProductSpecification[];
  storageCare: ProductStorageCare | null;
}

export function TechnicalProfile({ specifications, storageCare }: Props) {
  if ((!specifications || specifications.length === 0) && !storageCare) return null;

  return (
    <section id="technical-profile" className="py-16 md:py-24 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-2">
            SPECIFICATIONS & CARE
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Technical Profile & Storage Guidelines
          </h2>
        </div>

        {/* Specifications Grid */}
        {specifications && specifications.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10 product-section-fade">
            {specifications.map((spec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#C8A96A] mb-1">
                  {spec.title}
                </p>
                <p className="text-base md:text-lg font-light text-[#1A1A1A]">
                  {spec.value} {spec.unit ? <span className="text-xs text-[#1A1A1A]/50 font-normal">{spec.unit}</span> : ''}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Storage Guidelines Card */}
        {storageCare && (
          <div className="p-6 md:p-8 rounded-[1.5rem] bg-white border border-[#E5E0D8] shadow-sm product-section-fade">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#E5E0D8] pb-4 md:pb-0 md:pr-6">
                <span className="text-xl">🌿</span>
                <h3 className="text-base font-semibold text-[#1A1A1A] mt-1">Storage & Handling Care</h3>
                {storageCare.shelfLife && (
                  <p className="text-xs text-[#C8A96A] font-medium mt-1">Shelf Life: {storageCare.shelfLife}</p>
                )}
                {storageCare.temperatureRange && (
                  <p className="text-xs text-[#1A1A1A]/60 font-light mt-1">{storageCare.temperatureRange}</p>
                )}
              </div>

              <div className="md:col-span-8">
                {storageCare.storageTips && storageCare.storageTips.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1A1A1A]/70 font-light list-disc pl-4">
                    {storageCare.storageTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
