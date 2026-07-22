import type { QualityCommitmentData } from '@/features/about/types';

interface Props {
  data: QualityCommitmentData;
}

/**
 * QualityCommitment — four quality pillars on a dark background.
 * Intro paragraph + 2×2 pillar grid + a brand seal line at the bottom.
 */
export function QualityCommitment({ data }: Props) {
  return (
    <section
      id="about-quality"
      aria-labelledby="quality-heading"
      className="relative w-full py-32 overflow-hidden"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(32,92,59,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Gold thread — top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.45), transparent)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">

        {/* Intro block */}
        <div className="max-w-3xl mb-20">
          <p
            className="text-[#C8A96A] font-medium uppercase mb-6"
            style={{ fontSize: '11px', letterSpacing: '0.4em' }}
          >
            {data.eyebrow}
          </p>
          <h2
            id="quality-heading"
            className="font-light text-white mb-10 text-balance"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre-line',
            }}
          >
            {data.headline}
          </h2>
          <p
            className="text-white/45 font-light leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
          >
            {data.body}
          </p>
        </div>

        {/* Pillars grid — 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          {data.pillars.map((pillar, i) => (
            <article
              key={i}
              className="p-10 lg:p-14 flex flex-col"
              style={{ background: '#0F0F0F' }}
            >
              <span
                className="text-[#205C3B] font-medium uppercase mb-6 block"
                style={{ fontSize: '10px', letterSpacing: '0.35em' }}
              >
                {pillar.label}
              </span>
              <h3
                className="font-light text-white mb-5"
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.005em',
                }}
              >
                {pillar.headline}
              </h3>
              <p
                className="text-white/40 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)' }}
              >
                {pillar.body}
              </p>
            </article>
          ))}
        </div>

        {/* Brand seal */}
        <div className="mt-16 flex items-center justify-center">
          <p
            className="text-[#C8A96A]/45 text-center"
            style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
          >
            {data.seal}
          </p>
        </div>

      </div>

      {/* Gold thread — bottom */}
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
