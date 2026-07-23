'use client';

import { CTAButtons } from './CTAButtons';
import type { ProductShowcaseDocument } from '@/types';

interface Props { data: ProductShowcaseDocument; }

export function ProductContent({ data }: Props) {
  return (
    <div className="product-content flex-1 w-full flex flex-col justify-center max-w-lg opacity-0 translate-y-8 will-change-transform z-10">
      <span className="text-[length:var(--text-label)] font-bold tracking-[0.2em] uppercase mb-[var(--spacing-headline)] block text-[#1E1E1E]/60">
        {data.label}
      </span>
      
      <h2 className="text-[length:var(--text-headline)] font-light text-[#1E1E1E] tracking-tight mb-[var(--spacing-content)]" style={{ lineHeight: 0.95 }}>
        {data.headline}
      </h2>
      
      <p className="text-[length:var(--text-body)] text-[#1E1E1E]/70 font-light leading-relaxed mb-[var(--spacing-cta)] max-w-[90%]">
        {data.description}
      </p>
      
      <CTAButtons primaryCta={data.primaryCta} secondaryCta={data.secondaryCta} />
    </div>
  );
}
