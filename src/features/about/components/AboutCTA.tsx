import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { AboutCTAData } from '@/features/about/types';

interface Props {
  data: AboutCTAData;
}

/**
 * AboutCTA — the final brand statement on the About page.
 * Uses brand green (#0F5A32) with a ghost bottle in the background,
 * identical to the home page ContactCTA but receiving about-specific data.
 */
export function AboutCTA({ data }: Props) {
  return (
    <section
      id="about-cta"
      aria-label="Call to action"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0F5A32' }}
    >
      {/* Ambient center light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Ghost bottle background */}
      <div
        aria-hidden="true"
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[45vw] max-w-[480px] h-[85vh] opacity-[0.12] pointer-events-none"
      >
        <Image
          src="/images/products/hydrops-coconut-oil.png"
          alt=""
          fill
          className="object-contain"
          sizes="45vw"
        />
      </div>

      {/* Top gold thread */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />

      <div className="relative z-10 container mx-auto px-8 md:px-16 flex flex-col items-start max-w-2xl py-24">
        
        {/* Eyebrow */}
        <p
          className="text-[#C8A96A] font-medium uppercase mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.4em' }}
        >
          {data.eyebrow}
        </p>

        {/* Headline */}
        <h2
          className="font-light text-white mb-8 text-balance"
          style={{
            fontSize: 'clamp(3rem, 6vw, 6rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {data.headline}
        </h2>

        {/* Body */}
        <p
          className="text-white/60 font-light leading-relaxed mb-12 max-w-md"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          {data.body}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={data.primaryHref}
            className="inline-flex items-center justify-center bg-white text-[#0F5A32] hover:bg-white/95 rounded-full px-10 h-11 text-base font-medium group shadow-xl transition-colors focus-visible:outline-none focus-visible:ring-2"
          >
            {data.primaryLabel}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={data.secondaryHref}
            className="inline-flex items-center justify-center bg-transparent text-white border border-white/20 hover:bg-white/10 rounded-full px-10 h-11 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
          >
            {data.secondaryLabel}
          </Link>
        </div>

        {/* Tagline */}
        <p
          className="mt-20 text-white/20 font-medium uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.35em' }}
        >
          {data.tagline}
        </p>
      </div>
    </section>
  );
}
