import Image from 'next/image';
import { SectionRipple } from './SectionRipple';

/**
 * Everyday – Hydrops as part of life.
 * Not features. Not benefits. Moments.
 * Morning. Kitchen. Family. Wellness.
 */
const MOMENTS = [
  {
    id: 'morning',
    label: 'Morning',
    headline: 'The day starts\nwith intention.',
    desc: 'A single pour. The golden clarity catching the first light. A ritual so simple, it becomes sacred.',
    image: '/images/everyday/morning.png',
    imageAlt: 'Morning kitchen with Hydrops coconut oil',
    accent: 'Morning light, 6:14 AM.',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    headline: 'Cook with\npure confidence.',
    desc: 'No residue. No off-flavour. High smoke point and crystal clarity. Hydrops disappears into the food — leaving only taste.',
    image: '/images/everyday/kitchen.png',
    imageAlt: 'Cooking with crystal-clear coconut oil',
    accent: 'High smoke point. Neutral profile.',
  },
  {
    id: 'family',
    label: 'Family',
    headline: 'Some things are\nworth passing down.',
    desc: 'The tradition of coconut oil has been central to Indian households for generations. Hydrops gives that tradition the clarity it deserves.',
    image: '/images/everyday/family.png',
    imageAlt: 'Family passing down the tradition of coconut oil',
    accent: 'Three generations. One bottle.',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    headline: 'Pure outside.\nPure within.',
    desc: 'The same purity that makes it ideal for cooking makes it extraordinary for skin and hair. One oil. Many purposes. Zero compromise.',
    image: '/images/everyday/wellness.png',
    imageAlt: 'Wellness ritual with Hydrops coconut oil',
    accent: 'Skin. Hair. Mind. Body.',
  },
];

export function Everyday() {
  return (
    <section
      id="everyday-section"
      className="relative w-full bg-[#F5F2EC] overflow-hidden"
    >
      {/* Section intro — fullscreen height with centered editorial text */}
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(200,169,106,0.07) 0%, transparent 70%)' }}
        />
        <p className="everyday-label text-[11px] font-medium tracking-[0.35em] uppercase text-[#C8A96A] mb-8 opacity-0">
          Everyday Life
        </p>
        <h2
          className="everyday-headline font-light text-[#1E1E1E] tracking-tight opacity-0"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.95 }}
        >
          Not a pantry staple.<br />
          <span className="text-[#1E1E1E]/35">A daily companion.</span>
        </h2>
      </div>

      {/* Moments — full-bleed alternating panels */}
      <div className="space-y-0">
        {MOMENTS.map((moment, i) => (
          <div
            key={moment.id}
            className={`everyday-moment relative w-full min-h-[85vh] flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} opacity-0 translate-y-12 will-change-transform`}
          >
            {/* Image Panel — 55% */}
            <div className="relative w-full md:w-[55%] min-h-[50vh] md:min-h-full overflow-hidden bg-[#E8E4DC]">
              <Image
                src={moment.image}
                alt={moment.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Parallax overlay */}
              <div className="absolute inset-0"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(to right, transparent 60%, rgba(245,242,236,0.3))'
                    : 'linear-gradient(to left, transparent 60%, rgba(245,242,236,0.3))',
                }}
              />
              {/* Moment label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-white/50 text-[10px] tracking-[0.35em] font-medium uppercase">
                  {moment.accent}
                </span>
              </div>
            </div>

            {/* Text Panel — 45% */}
            <div className={`relative w-full md:w-[45%] flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 md:py-0 bg-[#F5F2EC]`}>
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#C8A96A] mb-6 block">
                {moment.label}
              </span>
              <h3
                className="font-light text-[#1E1E1E] tracking-tight mb-8 whitespace-pre-line"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.0 }}
              >
                {moment.headline}
              </h3>
              <p className="text-[#1E1E1E]/55 font-light leading-relaxed max-w-xs"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
              >
                {moment.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionRipple />
    </section>
  );
}
