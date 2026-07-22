import type { WhyChooseData } from '@/features/about/types';

interface Props {
  data: WhyChooseData;
}

/**
 * WhyChooseHydrops — four numbered reasons on a warm cream background.
 * Large numbered list with full-width separator lines — editorial and clean.
 */
export function WhyChooseHydrops({ data }: Props) {
  return (
    <section
      id="about-why"
      aria-labelledby="why-heading"
      className="relative w-full bg-[#F5F2EC] py-32 overflow-hidden"
    >
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 70%, rgba(200,169,106,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <p
              className="text-[#C8A96A] font-medium uppercase mb-6"
              style={{ fontSize: '11px', letterSpacing: '0.4em' }}
            >
              {data.eyebrow}
            </p>
            <h2
              id="why-heading"
              className="font-light text-[#1A1A1A]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.015em',
              }}
            >
              {data.headline}
            </h2>
          </div>
        </div>

        {/* Numbered reasons */}
        <ol
          className="flex flex-col"
          style={{ borderTop: '1px solid rgba(30,30,30,0.08)' }}
        >
          {data.items.map((item, i) => (
            <li
              key={i}
              className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 py-12"
              style={{ borderBottom: '1px solid rgba(30,30,30,0.08)' }}
            >
              {/* Number */}
              <span
                className="shrink-0 text-[#1A1A1A]/15 font-light"
                style={{
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  width: 80,
                }}
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-4 max-w-2xl">
                <h3
                  className="font-light text-[#1A1A1A]"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#1A1A1A]/55 font-light leading-relaxed"
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
                >
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
