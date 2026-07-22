import type { MissionVisionData } from '@/features/about/types';

interface Props {
  data: MissionVisionData;
}

/**
 * MissionVision — side-by-side Mission and Vision cards on a cream background.
 * Clean two-column layout separated by a vertical gold hairline on desktop.
 */
export function MissionVision({ data }: Props) {
  const cards = [data.mission, data.vision];

  return (
    <section
      id="about-mission-vision"
      aria-label="Mission and Vision"
      className="relative w-full bg-[#F5F2EC] py-32 overflow-hidden"
    >
      {/* Ambient warm light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(200,169,106,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={`flex flex-col py-12 ${
                i === 0
                  ? 'md:pr-16 md:border-r'
                  : 'md:pl-16'
              }`}
              style={{ borderColor: 'rgba(200,169,106,0.25)' }}
            >
              {/* Eyebrow */}
              <p
                className="text-[#C8A96A] font-medium uppercase mb-10"
                style={{ fontSize: '11px', letterSpacing: '0.4em' }}
              >
                {card.eyebrow}
              </p>

              {/* Headline */}
              <h2
                className="font-light text-[#1A1A1A] mb-8 text-balance"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {card.headline}
              </h2>

              {/* Divider */}
              <div
                aria-hidden="true"
                className="mb-8"
                style={{ width: 32, height: 1, background: 'rgba(200,169,106,0.4)' }}
              />

              {/* Body */}
              <p
                className="text-[#1A1A1A]/60 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
              >
                {card.body}
              </p>
            </div>
          ))}
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
