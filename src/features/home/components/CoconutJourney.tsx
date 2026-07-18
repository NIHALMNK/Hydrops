import { Scene } from './Scene';
import Image from 'next/image';

const JOURNEY_STAGES = [
  { 
    title: 'Morning in Kerala', 
    desc: 'The day begins in Kerala.',
    image: '/images/journey/1_morning.png'
  },
  { 
    title: 'Coconut Tree', 
    desc: 'Carefully selected palms.',
    image: '/images/journey/2_tree.png'
  },
  { 
    title: 'Harvest', 
    desc: 'Hand-picked at peak maturity.',
    image: '/images/journey/3_harvest.png'
  },
  { 
    title: 'Selection', 
    desc: 'Only the finest coconuts.',
    image: '/images/journey/4_selection.png'
  },
  { 
    title: 'Double Filtration', 
    desc: 'Purified with care.',
    image: '/images/journey/5_filtration.png'
  },
  { 
    title: 'Hydrops', 
    desc: 'Crystal-clear coconut oil.',
    image: '/images/journey/6_hydrops.png'
  },
];

export function CoconutJourney() {
  return (
    <div className="w-full">
      <section id="journey-section" className="relative w-full h-screen bg-[#EEF5EC] text-[#1a1a1a] overflow-hidden">
        {/* Natural green tint, very subtle botanical feeling */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e1efe0]/60 via-[#EEF5EC]/30 to-transparent pointer-events-none" />
        <div className="journey-track flex h-full w-[600vw] will-change-transform">
          {JOURNEY_STAGES.map((stage, i) => (
            <div key={i} className="journey-chapter w-screen h-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-24 gap-12 md:gap-32 relative">
              
              {/* Text Content */}
              <div className="journey-text flex-1 flex flex-col justify-center max-w-lg z-10 opacity-0 translate-y-12 will-change-transform">
                <span className="text-[#388e4a] text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4 block">
                  Chapter 0{i + 1}
                </span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
                  {stage.title}
                </h3>
                <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              {/* Visual */}
              <div className="journey-visual flex-1 w-full max-w-[500px] aspect-[4/5] md:aspect-square relative rounded-3xl overflow-hidden shadow-[0_32px_80px_-20px_rgba(56,142,74,0.15)] will-change-transform opacity-0 scale-95 bg-[#eef3ee]">
                 <div className="journey-image-inner absolute inset-0 will-change-transform scale-110">
                    <Image 
                      src={stage.image} 
                      alt={stage.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                 </div>
              </div>
              
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
