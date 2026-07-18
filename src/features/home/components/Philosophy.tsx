import { Scene } from './Scene';

export function Philosophy() {
  return (
    <Scene height="min-h-screen" id="philosophy-section" className="items-center justify-center bg-[#F8F6F0] text-[#1a1a1a] relative overflow-hidden">
      {/* Warm sunrise glow, soft cream atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fdfcf8]/80 via-[#F8F6F0]/40 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-[900px] flex flex-col items-center justify-center text-center relative z-10 philosophy-content">
        <span className="philosophy-eyebrow text-[#388e4a] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-8 md:mb-12 opacity-0">
          Our Philosophy
        </span>
        
        <h2 className="philosophy-heading text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 md:mb-12 opacity-0 translate-y-12">
          Every Drop<br />Begins With Purity.
        </h2>
        
        <p className="philosophy-paragraph text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-[600px] opacity-0">
          At Hydrops, our commitment to purity is absolute. We curate the finest coconuts and employ an unyielding quality process, ensuring every crystal-clear drop delivers the premium standard of trust your business deserves.
        </p>
      </div>
    </Scene>
  );
}
