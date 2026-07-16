import { Scene } from './Scene';

export function ProductShowcase() {
  return (
    <Scene height="h-[140vh]" id="product-showcase-section" className="bg-background items-center justify-center relative">
      <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-10">
        
        {/* Floating elements & orbit */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="product-orbit w-[600px] h-[600px] rounded-full border border-primary/10 absolute will-change-transform opacity-0"></div>
           
           {/* Floating Feature Labels */}
           <div className="feature-label absolute top-[25%] left-[20%] bg-white/80 backdrop-blur shadow-lg px-4 py-2 rounded-full text-sm font-medium border opacity-0 translate-y-4">
             Crystal Clear
           </div>
           <div className="feature-label absolute bottom-[30%] right-[20%] bg-white/80 backdrop-blur shadow-lg px-4 py-2 rounded-full text-sm font-medium border opacity-0 translate-y-4">
             Zero Residue
           </div>
        </div>

        {/* The Bottle (Placeholder for 3D/Image) */}
        <div className="product-bottle relative w-64 h-96 bg-secondary/50 rounded-[4rem] border shadow-2xl flex items-center justify-center will-change-transform opacity-0 scale-95">
          <div className="absolute inset-x-4 top-10 bottom-10 border border-primary/20 rounded-[3rem]"></div>
          <span className="text-primary font-medium tracking-widest text-lg">HYDROPS</span>
          
          {/* Reflection glow */}
          <div className="product-glow absolute inset-0 bg-primary/20 blur-3xl -z-10 opacity-0"></div>
        </div>
        
      </div>
    </Scene>
  );
}
