import { Scene } from './Scene';

const JOURNEY_STAGES = [
  { title: 'Morning', desc: 'The day begins in Kerala.' },
  { title: 'Coconut Tree', desc: 'Carefully selected palms.' },
  { title: 'Harvest', desc: 'Hand-picked at peak maturity.' },
  { title: 'Fresh Coconut', desc: 'Opened and inspected.' },
  { title: 'Extraction', desc: 'Cold-pressed with precision.' },
  { title: 'Double Filtration', desc: 'Ensuring absolute purity.' },
  { title: 'Crystal Clear', desc: 'The perfect oil emerges.' },
  { title: 'Bottle Filling', desc: 'Sealed for freshness.' },
  { title: 'Finished Product', desc: 'Ready for you.' },
];

export function CoconutJourney() {
  return (
    <Scene height="h-[350vh]" id="journey-section" className="bg-secondary text-secondary-foreground">
      <div className="journey-sticky-container sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="journey-track flex h-full items-center pl-[20vw] pr-[50vw]">
          {JOURNEY_STAGES.map((stage, i) => (
            <div key={i} className="journey-card flex-shrink-0 w-[40vw] max-w-sm mr-16 flex flex-col items-center justify-center opacity-0 scale-90 will-change-transform">
              <div className="w-48 h-64 bg-background rounded-lg shadow-xl border mb-8 relative overflow-hidden">
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 bg-primary/10"></div>
              </div>
              <h3 className="text-2xl font-medium mb-2">{stage.title}</h3>
              <p className="text-muted-foreground text-center">{stage.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Progress Line */}
        <div className="absolute bottom-20 left-0 w-full h-[1px] bg-border overflow-hidden">
           <div className="journey-progress h-full w-full bg-primary origin-left scale-x-0 will-change-transform"></div>
        </div>
      </div>
    </Scene>
  );
}
