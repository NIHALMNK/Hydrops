import Link from 'next/link';
import type { CTA } from '@/types';

interface Props { primaryCta: CTA; secondaryCta: CTA; }

export function CTAButtons({ primaryCta, secondaryCta }: Props) {
  return (
    <div className="cta-buttons flex flex-col sm:flex-row gap-4 opacity-0 will-change-transform">
      <Link 
        href={primaryCta.href}
        className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-[#388e4a] px-8 text-sm font-semibold tracking-wide text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {primaryCta.label}
      </Link>
      <Link 
        href={secondaryCta.href}
        className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border border-black/10 bg-transparent px-8 text-sm font-semibold tracking-wide text-black transition-all hover:border-black/30 hover:bg-black/5 active:scale-[0.98]"
      >
        {secondaryCta.label}
      </Link>
    </div>
  );
}
