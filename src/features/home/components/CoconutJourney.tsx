import Image from 'next/image';
import { SectionRipple } from './SectionRipple';

/**
 * The human story behind every bottle of Hydrops.
 * Not manufacturing steps — emotional chapters.
 */
const JOURNEY_STAGES = [
  { 
    chapter: '01',
    title: 'Morning.', 
    desc: 'Before sunrise, the coconut groves of Kerala awaken. The air carries salt and earth. The day begins not in a factory, but in a grove that has fed families for centuries.',
    image: '/images/journey/1-morning.png',
    mood: 'Dawn light finds the treetops.',
  },
  { 
    chapter: '02',
    title: 'Harvest.', 
    desc: 'Only the coconuts that have ripened completely are chosen. Not by machine — by hand, and by experience passed down through generations.',
    image: '/images/journey/3-harvest.png',
    mood: 'Patience is the first ingredient.',
  },
  { 
    chapter: '03',
    title: 'Patience.', 
    desc: 'The finest oil cannot be rushed. Our extraction process honours the natural pace of the coconut, preserving everything the tree intended to give.',
    image: '/images/journey/4-selection.png',
    mood: 'Nothing valuable was ever made in a hurry.',
  },
  { 
    chapter: '04',
    title: 'Purity.', 
    desc: 'Double filtered. Crystal clear. What remains is the purest expression of the coconut — without compromise, without residue, without anything unnecessary.',
    image: '/images/journey/6-hydrops.png',
    mood: 'This is Hydrops.',
  },
];

export function CoconutJourney() {
  return (
    <div className="w-full">
      <section id="journey-section" className="relative w-full h-screen bg-[#F5F2EC] text-[#1E1E1E] overflow-hidden">
        
        {/* Subtle warm ambient light */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(200,169,106,0.05) 0%, transparent 60%)' }}
        />

        {/* Horizontal scroll track */}
        <div className="journey-track flex h-full will-change-transform" style={{ width: `${JOURNEY_STAGES.length * 100}vw` }}>
          {JOURNEY_STAGES.map((stage, i) => (
            <div
              key={i}
              className="journey-chapter flex-shrink-0 w-screen h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-24 gap-12 md:gap-20 relative"
            >
              {/* Text Content */}
              <div className="journey-text flex-1 flex flex-col justify-center max-w-md z-10 opacity-0 translate-y-10 will-change-transform">
                <span className="text-[#C8A96A] text-[11px] font-medium tracking-[0.35em] uppercase mb-6 block">
                  Chapter {stage.chapter}
                </span>
                <h3 className="text-[clamp(3rem,5vw,4.5rem)] font-light mb-6 leading-[0.95] tracking-tight text-[#1E1E1E]">
                  {stage.title}
                </h3>
                <p className="text-[clamp(1rem,1.5vw,1.15rem)] text-[#1E1E1E]/60 font-light leading-relaxed mb-8 max-w-sm">
                  {stage.desc}
                </p>
                {/* Mood line — the signature emotional note for each chapter */}
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#205C3B] font-medium">
                  {stage.mood}
                </p>
              </div>

              {/* Visual */}
              <div className="journey-visual flex-1 w-full max-w-[480px] aspect-[4/5] md:aspect-[3/4] relative rounded-[2rem] overflow-hidden will-change-transform opacity-0 scale-[0.96] bg-[#E8E4DC]"
                style={{ boxShadow: '0 40px 80px -20px rgba(30,30,30,0.12)' }}
              >
                <div className="journey-image-inner absolute inset-0 will-change-transform scale-[1.08]">
                  <Image 
                    src={stage.image} 
                    alt={stage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                {/* Vignette */}
                <div className="absolute inset-0 rounded-[2rem]"
                  style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(30,30,30,0.15))' }}
                />
              </div>

              {/* Chapter progress indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {JOURNEY_STAGES.map((_, j) => (
                  <div key={j}
                    className={`h-px transition-all duration-500 ${j === i ? 'w-8 bg-[#C8A96A]' : 'w-3 bg-[#1E1E1E]/20'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <SectionRipple />
      </section>
    </div>
  );
}
