import Image from 'next/image';
import type { ManufacturingPhilosophyData } from '@/features/about/types';

interface Props {
  data: ManufacturingPhilosophyData;
}

/**
 * ManufacturingPhilosophy — four process stages on cream, alternating layout.
 * Closely follows the Craftsmanship component's visual grammar from the home page
 * but tells a distinct, about-specific story with about-specific copy.
 */
export function ManufacturingPhilosophy({ data }: Props) {
  return (
    <section
      id="about-manufacturing"
      aria-labelledby="manufacturing-heading"
      className="relative w-full bg-[#F5F2EC] py-32 overflow-hidden"
    >
      {/* Ambient warm light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(200,169,106,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Section intro */}
      <div className="container mx-auto px-8 md:px-16 lg:px-24 mb-24">
        <p
          className="text-[#C8A96A] font-medium uppercase mb-6"
          style={{ fontSize: '11px', letterSpacing: '0.4em' }}
        >
          {data.eyebrow}
        </p>
        <h2
          id="manufacturing-heading"
          className="font-light text-[#1A1A1A] mb-8 text-balance"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.015em',
            whiteSpace: 'pre-line',
          }}
        >
          {data.headline}
        </h2>
        <p
          className="max-w-2xl text-[#1A1A1A]/55 font-light leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
        >
          {data.subheadline}
        </p>
      </div>

      {/* Process stages — alternating layout */}
      <div className="container mx-auto px-8 md:px-16 lg:px-24 flex flex-col gap-28">
        {data.stages.map((stage, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-12 md:gap-20 items-center`}
          >
            {/* Image */}
            <div
              className="flex-1 relative aspect-[4/5] w-full max-w-[440px] rounded-[1.5rem] overflow-hidden"
              style={{ boxShadow: '0 32px 64px -16px rgba(30,30,30,0.10)' }}
            >
              <Image
                src={stage.image}
                alt={stage.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 440px"
                className="object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Bottom vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[1.5rem]"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 50%, rgba(30,30,30,0.12))',
                }}
              />
              {/* Step watermark */}
              <span
                className="absolute top-6 left-6 text-white/20 font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.3em' }}
              >
                {stage.step} / {stage.title}
              </span>
            </div>

            {/* Text */}
            <div className={`flex-1 max-w-md ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
              <span
                className="text-[#C8A96A] font-medium uppercase mb-6 block"
                style={{ fontSize: '10px', letterSpacing: '0.4em' }}
              >
                Step {stage.step}
              </span>
              <h3
                className="font-light text-[#1A1A1A] mb-6"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}
              >
                {stage.title}
              </h3>
              <p
                className="text-[#1A1A1A]/55 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
              >
                {stage.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gold thread */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.35), transparent)',
        }}
      />
    </section>
  );
}
