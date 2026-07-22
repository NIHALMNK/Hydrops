import type { AboutHeroData } from '@/features/about/types';

interface Props {
  data: AboutHeroData;
}

/**
 * AboutHero — the opening statement of the About page.
 * Full-viewport dark canvas, mirroring the cinematic language of the home hero.
 * Purely presentational: all copy comes from the data layer.
 */
export function AboutHero({ data }: Props) {
  return (
    <section
      aria-label="About Hydrops"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Warm radial ambient — same visual language as HeroScene */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(200,169,106,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Gold thread — top edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Eyebrow */}
        <p
          className="text-[#C8A96A] font-medium uppercase mb-10"
          style={{
            fontSize: '11px',
            letterSpacing: '0.4em',
          }}
        >
          {data.eyebrow}
        </p>

        {/* Headline */}
        <h1
          className="font-light text-white text-balance"
          style={{
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {data.headline}
        </h1>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="my-10"
          style={{
            width: 40,
            height: 1,
            background: 'rgba(200,169,106,0.45)',
          }}
        />

        {/* Sub-headline */}
        <p
          className="text-white/50 font-light tracking-widest uppercase"
          style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', letterSpacing: '0.3em' }}
        >
          {data.subheadline}
        </p>
      </div>

      {/* Brand tagline — bottom anchored */}
      <p
        aria-hidden="true"
        className="absolute bottom-10 text-white/12"
        style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
      >
        {data.tagline}
      </p>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
      >
        <div
          style={{
            width: 1,
            height: 48,
            background:
              'linear-gradient(to bottom, rgba(200,169,106,0.6), transparent)',
          }}
        />
      </div>
    </section>
  );
}
