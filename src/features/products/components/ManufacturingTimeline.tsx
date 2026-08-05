import React from 'react';
import Image from 'next/image';
import type { ProductProcessStep } from '@/features/products/types';

interface Props {
  manufacturingSteps: ProductProcessStep[];
}

export function ManufacturingTimeline({ manufacturingSteps }: Props) {
  if (!manufacturingSteps || manufacturingSteps.length === 0) return null;

  return (
    <section id="manufacturing" className="py-20 md:py-28 bg-[#F5F2EC] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            THE CRAFT OF EXTRACTION
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Step-by-Step Manufacturing Journey
          </h2>
          <p className="text-[#1A1A1A]/60 font-light text-sm mt-2">
            Trace the disciplined journey from coastal palm grove to sealed glass vessel.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto space-y-16">
          {/* Vertical Center Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#E5E0D8] -translate-x-1/2 pointer-events-none" />

          {manufacturingSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`timeline-step-animate relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step Marker Badge for Desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C8A96A] text-white font-bold text-xs items-center justify-center shadow-md border-4 border-[#F5F2EC] z-10">
                  0{step.stepNumber || idx + 1}
                </div>

                {/* Content Box (6 cols) */}
                <div className={`md:col-span-6 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                  <div className="p-6 md:p-8 rounded-[2rem] bg-white border border-[#E5E0D8] shadow-sm">
                    <div className="flex items-center gap-2 mb-2 md:justify-end">
                      <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C8A96A]">
                        Step 0{step.stepNumber || idx + 1}
                      </span>
                      {step.estimatedDuration && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF8F5] border border-[#E5E0D8] text-[#1A1A1A]/60 font-mono">
                          ⏱ {step.estimatedDuration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{step.title}</h3>
                    <p className="text-[#1A1A1A]/60 font-light text-sm leading-relaxed mb-4">{step.description}</p>

                    {step.interestingFact && (
                      <div className="p-3.5 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 text-[#8B6E30] text-xs text-left">
                        <span className="font-bold">Interesting Fact:</span> {step.interestingFact}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Box (6 cols) */}
                <div className={`md:col-span-6 ${isEven ? 'md:pl-12' : 'md:pr-12 md:order-1'}`}>
                  {step.image?.src ? (
                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-sm border border-[#E5E0D8]">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt || step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] rounded-[2rem] bg-white border border-[#E5E0D8] flex items-center justify-center text-xs text-neutral-400 font-light">
                      Step {step.stepNumber} Visual
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
