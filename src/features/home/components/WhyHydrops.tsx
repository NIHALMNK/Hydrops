import { Scene } from './Scene';

const CARDS = [
  { title: 'The Purity Difference', desc: 'No yellow tint. No burnt smell. Just pure clarity.', color: 'bg-[#f1f5f9]' },
  { title: 'Double Filtration', desc: 'Our unique process removes micro-particles ordinary oils leave behind.', color: 'bg-[#e2e8f0]' },
  { title: 'Nutrient Dense', desc: 'Cold pressing ensures all natural benefits remain intact.', color: 'bg-[#cbd5e1]' },
  { title: 'Multi-Purpose', desc: 'Perfect for culinary, skin, and hair care.', color: 'bg-[#94a3b8]' },
  { title: 'The Final Result', desc: 'Experience the Hydrops difference.', color: 'bg-primary text-primary-foreground' },
  { title: 'Wild Groves', desc: 'Hand-selected from pristine, untouched coastal ecosystems.', color: 'bg-[#f8fafc]' },
  { title: 'Fair Trade Purity', desc: 'Supporting local farming communities with ethical, sustainable partnerships.', color: 'bg-[#f1f5f9]' },
  { title: 'Zero Carbon Footprint', desc: 'Consciously processed to respect and preserve the environment.', color: 'bg-[#e2e8f0]' },
  { title: 'Small Batch Integrity', desc: 'Produced in limited quantities to guarantee absolute freshness.', color: 'bg-[#cbd5e1]' },
  { title: 'Conscious Luxury', desc: 'Premium quality that honors the earth and your body.', color: 'bg-primary text-primary-foreground' },
];

export function WhyHydrops() {
  return (
    <section id="why-hydrops-section" className="why-hydrops relative w-full bg-background z-10">
      <div className="why-pin-wrapper relative h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-6xl font-light mb-12 relative z-50 text-center">Why Hydrops</h2>
        
        <div className="why-stack relative w-[90vw] max-w-4xl h-[60vh] perspective-[1200px]">
          {CARDS.map((card, i) => (
            <div 
              key={i} 
              className={`why-card absolute inset-0 rounded-[2rem] p-12 flex flex-col justify-center items-center shadow-2xl border ${card.color} will-change-transform transform-gpu`}
              style={{ zIndex: i + 1 }}
            >
              <h3 className="text-3xl md:text-5xl font-medium mb-6 text-center">{card.title}</h3>
              <p className="text-xl md:text-2xl text-center max-w-2xl opacity-90">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
