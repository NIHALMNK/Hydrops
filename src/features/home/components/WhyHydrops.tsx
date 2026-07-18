import { Scene } from './Scene';
import { CrystalRipple } from '../assets/svg/CrystalRipple';
import { DoubleFiltration } from '../assets/svg/DoubleFiltration';
import { CoconutCrossSection } from '../assets/svg/CoconutCrossSection';
import { EverydayUse } from '../assets/svg/EverydayUse';
import { QualitySeal } from '../assets/svg/QualitySeal';
import { HydropsSignature } from '../assets/svg/HydropsSignature';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const CARDS = [
  { 
    label: 'PURITY', 
    title: 'Crystal Clear Purity', 
    desc: 'Every drop reflects our commitment to unmatched clarity and cleanliness.', 
    color: 'bg-[#F8F6F2]',
    Icon: CrystalRipple
  },
  { 
    label: 'PROCESS', 
    title: 'Double Filtered', 
    desc: 'Carefully refined to remove impurities while preserving natural goodness.', 
    color: 'bg-[#F6F2EA]',
    Icon: DoubleFiltration
  },
  { 
    label: 'QUALITY', 
    title: 'Naturally Preserved', 
    desc: 'Cold processing helps retain the natural qualities of coconut oil.', 
    color: 'bg-[#EEF5EC]',
    Icon: CoconutCrossSection
  },
  { 
    label: 'STANDARDS', 
    title: 'Food Grade Quality', 
    desc: 'Made for everyday cooking with uncompromising quality standards.', 
    color: 'bg-[#FCFAF7]',
    Icon: QualitySeal
  },
  { 
    label: 'VERSATILITY', 
    title: 'Made For Everyday Life', 
    desc: 'Perfect for cooking, skincare, hair care, and wellness.', 
    color: 'bg-[#F2F7EF]',
    Icon: EverydayUse
  },
  { 
    label: 'PROMISE', 
    title: "Purity isn't claimed.\nIt's crafted.", 
    desc: '', 
    color: 'bg-[#0F5A32] text-white',
    Icon: HydropsSignature,
    isFinal: true
  },
];

export function WhyHydrops() {
  return (
    <section id="why-hydrops-section" className="why-hydrops relative w-full bg-[#FBF8F2] z-10">
      <div className="why-pin-wrapper relative md:h-screen w-full flex flex-col items-center justify-center pt-24 pb-24 md:py-0 md:overflow-hidden">
        {/* Warm cream soft premium lighting */}
        <div className="why-radial-bg absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-[#FBF8F2]/40 to-transparent pointer-events-none transition-colors duration-700" />
        
        <h2 className="text-4xl md:text-5xl font-light mb-12 relative z-50 text-center tracking-wide">Why Hydrops</h2>
        
        <div className="why-stack relative w-[90vw] max-w-4xl flex flex-col md:block md:h-[65vh] perspective-[1200px] gap-8 md:gap-0">
          {CARDS.map((card, i) => {
            const Icon = card.Icon;
            
            // Define unique layouts based on index
            let contentLayout = "";
            if (i === 0) contentLayout = "flex-col md:flex-row text-left justify-between items-start md:items-center"; // Headline Left, SVG Right
            else if (i === 1) contentLayout = "flex-col text-center justify-center items-center relative"; // Centered, SVG Background
            else if (i === 2) contentLayout = "flex-col md:flex-row-reverse text-right justify-between items-start md:items-center"; // Headline Right, SVG Left
            else if (i === 3) contentLayout = "flex-col text-center justify-center items-center"; // Minimal Centered
            else if (i === 4) contentLayout = "flex-col md:flex-row text-left justify-between items-center"; // Split Layout
            else contentLayout = "flex-col text-center justify-center items-center"; // Final Card

            return (
              <div 
                key={i} 
                className={`why-card relative md:absolute inset-0 rounded-[2rem] shadow-xl border border-black/5 ${card.color} will-change-transform transform-gpu overflow-hidden`}
                style={{ 
                  zIndex: CARDS.length - i,
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)'
                }}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                <div className={`why-card-content w-full h-full p-8 md:p-16 flex ${contentLayout}`}>
                  {/* SVG Positioning based on layout */}
                  <div className={`
                    ${i === 1 ? 'absolute inset-0 m-auto w-full h-full flex items-center justify-center opacity-10 pointer-events-none' : ''}
                    ${i === 0 || i === 2 || i === 4 ? 'w-24 h-24 md:w-40 md:h-40 shrink-0 mb-8 md:mb-0' : ''}
                    ${i === 3 || i === 5 ? 'w-20 h-20 md:w-28 md:h-28 mb-8' : ''}
                  `}>
                    <Icon className={`${i === 1 ? 'w-64 h-64 md:w-96 md:h-96' : 'w-full h-full'}`} />
                  </div>

                  <div className={`flex flex-col ${i === 1 || i === 3 || i === 5 ? 'items-center relative z-10' : 'max-w-xl'}`}>
                    {!card.isFinal && (
                      <span className="text-sm font-medium tracking-[0.2em] mb-4 opacity-60">
                        {card.label}
                      </span>
                    )}
                    
                    <h3 className={`font-light leading-tight ${card.isFinal ? 'text-4xl md:text-6xl mb-12 whitespace-pre-line text-center' : 'text-3xl md:text-5xl mb-6'}`}>
                      {card.title}
                    </h3>
                    
                    {card.desc && (
                      <p className={`text-lg md:text-xl opacity-80 leading-relaxed ${i === 1 || i === 3 ? 'max-w-lg text-center' : ''}`}>
                        {card.desc}
                      </p>
                    )}

                    {card.isFinal && (
                      <Button size="lg" className="bg-white text-[#0F5A32] hover:bg-white/90 rounded-full px-8 py-6 text-lg shadow-xl mt-4 group">
                        Explore Product
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
