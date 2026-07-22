import type { BrandIntroductionData } from '@/features/about/types';

interface Props {
  data: BrandIntroductionData;
}

/**
 * BrandIntroduction — the warm landing after the dark hero.
 * A cream section that introduces who Hydrops is in two paragraphs,
 * anchored by a single striking statistic.
 */
export function BrandIntroduction({ data }: Props) {
  return (
    <section
      id="about-introduction"
      aria-labelledby="intro-heading"
      className="relative w-full bg-[#F5F2EC] py-32 overflow-hidden"
    >
      {/* Subtle ambient gold */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(200,169,106,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left — eyebrow + headline */}
          <div className="lg:w-1/2 lg:sticky lg:top-24">
            <p
              className="text-[#C8A96A] font-medium uppercase mb-8 block"
              style={{ fontSize: '11px', letterSpacing: '0.4em' }}
            >
              {data.eyebrow}
            </p>
            <h2
              id="intro-heading"
              className="font-light text-[#1A1A1A] text-balance"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {data.headline}
            </h2>

            {/* Stat block */}
            <div
              className="mt-16 pt-12 border-t"
              style={{ borderColor: 'rgba(30,30,30,0.08)' }}
            >
              <p
                className="font-light text-[#205C3B]"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
              >
                {data.stat.value}
              </p>
              <p
                className="mt-3 text-[#1A1A1A]/50 font-light"
                style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', letterSpacing: '0.02em' }}
              >
                {data.stat.label}
              </p>
            </div>
          </div>

          {/* Right — body paragraphs */}
          <div className="lg:w-1/2 flex flex-col gap-8 pt-[3.5rem]">
            {data.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-[#1A1A1A]/65 font-light leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

        </div>
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
