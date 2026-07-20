'use client';

import { CTAButtons } from './CTAButtons';

export function ProductContent() {
  return (
    <div className="product-content flex-1 w-full flex flex-col justify-center max-w-lg opacity-0 translate-y-8 will-change-transform z-10">
      <span className="text-[length:var(--text-label)] font-bold tracking-[0.2em] uppercase mb-[var(--spacing-headline)] block text-[#1E1E1E]/60">
        OUR PRODUCT
      </span>
      
      <h2 className="text-[length:var(--text-headline)] font-light text-[#1E1E1E] tracking-tight mb-[var(--spacing-content)]" style={{ lineHeight: 0.95 }}>
        Colorless Crystal Clear Coconut Oil
      </h2>
      
      <p className="text-[length:var(--text-body)] text-[#1E1E1E]/70 font-light leading-relaxed mb-[var(--spacing-cta)] max-w-[90%]">
        Experience the purest form of coconut oil. Double filtered to achieve a crystal clear finish that preserves natural goodness without any residue.
      </p>
      
      <CTAButtons />
    </div>
  );
}
