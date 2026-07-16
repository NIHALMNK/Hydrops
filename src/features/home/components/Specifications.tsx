import { Scene } from './Scene';

const SPECS = [
  { title: 'Cold-Pressed Extraction', desc: 'No heat applied.' },
  { title: '100% Pure', desc: 'Zero preservatives.' },
  { title: 'Crystal Clear', desc: 'Double filtered.' },
];

export function Specifications() {
  return (
    <Scene height="h-[100vh]" id="specifications-section" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Left Side: The Bottle continues from previous section's storytelling */}
        <div className="w-1/2 flex justify-center">
           <div className="spec-bottle w-48 h-80 bg-background rounded-[3rem] border shadow-xl flex items-center justify-center opacity-0 scale-95 translate-y-12">
             <span className="text-primary font-medium tracking-widest text-sm">HYDROPS</span>
           </div>
        </div>

        {/* Right Side: Specifications */}
        <div className="w-1/2 flex flex-col justify-center space-y-6">
          {SPECS.map((spec, i) => (
            <div key={i} className="spec-card bg-background p-6 rounded-2xl shadow-sm border opacity-0 translate-x-12 will-change-transform">
              <h4 className="text-xl font-medium mb-2">{spec.title}</h4>
              <p className="text-muted-foreground">{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
