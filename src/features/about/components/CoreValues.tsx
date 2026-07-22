import type { CoreValuesData } from '@/features/about/types';

interface Props {
  data: CoreValuesData;
}

/**
 * CoreValues — six values displayed in a 2×3 grid on a dark canvas.
 * Each card shows a numbered label, title, and body paragraph.
 * The dark background provides strong contrast after the cream Mission/Vision.
 */
export function CoreValues({ data }: Props) {
  return (
    <section
      id="about-values"
      aria-labelledby="values-heading"
      className="relative w-full py-32 overflow-hidden"
      style={{ backgroundColor: '#171717' }}
    >
      {/* Ambient gold center glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(200,169,106,0.04) 0%, transparent 65%)',
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

        {/* Section header */}
        <div className="mb-20">
          <p
            className="text-[#C8A96A] font-medium uppercase mb-6"
            style={{ fontSize: '11px', letterSpacing: '0.4em' }}
          >
            {data.eyebrow}
          </p>
          <h2
            id="values-heading"
            className="font-light text-white text-balance"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre-line',
            }}
          >
            {data.headline}
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          {data.values.map((value, i) => (
            <article
              key={i}
              className="flex flex-col p-10 lg:p-12"
              style={{ background: '#171717' }}
            >
              {/* Number */}
              <span
                className="text-[#C8A96A]/40 font-medium mb-8 block"
                style={{ fontSize: '11px', letterSpacing: '0.3em' }}
              >
                {value.number}
              </span>

              {/* Title */}
              <h3
                className="font-light text-white mb-5"
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.005em',
                }}
              >
                {value.title}
              </h3>

              {/* Body */}
              <p
                className="text-white/40 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)' }}
              >
                {value.body}
              </p>
            </article>
          ))}
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
