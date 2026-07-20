import Image from 'next/image';
import { SectionRipple } from './SectionRipple';

/**
 * Craftsmanship – documentary-style process story.
 * Four intimate scenes: Inspect → Filter → Bottle → Seal.
 * Close-ups. Real materials. The hands behind every drop.
 */
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Inspection',
    headline: 'Only the best\nmake it through.',
    desc: 'Every coconut is assessed by hand. Density, moisture, maturity. Nothing enters our process that doesn\'t meet our standards — no exceptions.',
    image: '/images/quality/craft-inspect.png',
    imageAlt: 'Hand inspecting a fresh coconut in morning light',
  },
  {
    step: '02',
    title: 'Filtration',
    headline: 'Clarity is not\nan accident.',
    desc: 'Two separate filtration stages. First, gross impurities. Then, microscopic particles. What remains is oil so clear, you can see straight through it.',
    image: '/images/quality/craft-filter.png',
    imageAlt: 'Crystal-clear oil filtering in warm light',
  },
  {
    step: '03',
    title: 'Preservation',
    headline: 'Purity sealed\nat its peak.',
    desc: 'The moment the oil reaches its ideal clarity, it is sealed. No delays. No exposure. The bottle captures the oil exactly as it was when it emerged from filtration.',
    image: '/images/quality/craft-bottle.png',
    imageAlt: 'Premium bottle with crystal-clear oil on dark surface',
  },
  {
    step: '04',
    title: 'Integrity',
    headline: 'Our promise\nin every seal.',
    desc: 'The final seal is a guarantee. What you open is exactly what was intended — uncompromised, untouched, unaltered. This is what we call the Hydrops Promise.',
    image: '/images/quality/craft-seal.png',
    imageAlt: 'Hands carefully sealing a premium bottle',
  },
];

export function Craftsmanship() {
  return (
    <section
      id="craftsmanship-section"
      className="relative w-full bg-[#F5F2EC] py-32 overflow-hidden"
    >
      {/* Ambient warm light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(200,169,106,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Section intro */}
      <div className="container mx-auto px-8 md:px-16 mb-24">
        <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#C8A96A] mb-6 craft-label opacity-0">
          Craftsmanship
        </p>
        <h2
          className="font-light text-[#1E1E1E] tracking-tight craft-headline opacity-0"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95 }}
        >
          Every step.<br />
          <span className="text-[#1E1E1E]/40">Deliberate.</span>
        </h2>
      </div>

      {/* Process steps — alternating layout */}
      <div className="container mx-auto px-8 md:px-16 space-y-32">
        {PROCESS_STEPS.map((step, i) => (
          <div
            key={i}
            className={`craft-step flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center opacity-0 translate-y-16 will-change-transform`}
          >
            {/* Image */}
            <div className="flex-1 relative aspect-[4/5] w-full max-w-[460px] rounded-[1.5rem] overflow-hidden"
              style={{ boxShadow: '0 32px 64px -16px rgba(30,30,30,0.10)' }}
            >
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover"
                loading="lazy"
              />
              {/* Bottom vignette */}
              <div className="absolute inset-0 rounded-[1.5rem]"
                style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(30,30,30,0.12))' }}
              />
              {/* Step number watermark */}
              <span className="absolute top-6 left-6 text-white/20 text-[11px] tracking-[0.3em] font-medium uppercase">
                {step.step} / {step.title}
              </span>
            </div>

            {/* Text */}
            <div className={`flex-1 max-w-md ${i % 2 === 0 ? '' : 'md:text-right'}`}>
              <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#C8A96A] mb-6 block">
                Step {step.step}
              </span>
              <h3
                className="font-light text-[#1E1E1E] tracking-tight mb-8 whitespace-pre-line"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.0 }}
              >
                {step.headline}
              </h3>
              <p className="text-[#1E1E1E]/55 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)' }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionRipple />
    </section>
  );
}
