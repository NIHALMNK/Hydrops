import { Scene } from './Scene';

const COMPARISON = [
  { label: 'Ordinary Oil', items: ['Yellow Tint', 'Strong Odor', 'Natural Particles Remain'] },
  { label: 'Hydrops', items: ['Crystal Clear', 'Neutral Aroma', 'Double Filtered Purity'] },
];

export function WhyCrystalClear() {
  return (
    <Scene height="h-[120vh]" id="why-crystal-clear-section" className="bg-secondary/20 items-center justify-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center crystal-title opacity-0 translate-y-8 will-change-transform">
          Why Crystal Clear?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {COMPARISON.map((side, i) => (
             <div key={i} className="crystal-col bg-background p-10 rounded-[2rem] border shadow-sm opacity-0 translate-y-12 will-change-transform">
                <h3 className="text-3xl font-medium mb-8 text-center">{side.label}</h3>
                <ul className="space-y-6">
                  {side.items.map((item, j) => (
                    <li key={j} className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-primary' : 'bg-muted'}`}></div>
                      <span className="text-lg text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
             </div>
           ))}
        </div>
      </div>
    </Scene>
  );
}
