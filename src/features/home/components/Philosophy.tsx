import { Scene } from './Scene';

export function Philosophy() {
  return (
    <Scene height="h-[80vh]" id="philosophy-section" className="items-center justify-center bg-background">
      <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
        <p className="philosophy-text text-3xl md:text-5xl font-light leading-relaxed text-foreground opacity-0 translate-y-12 will-change-transform">
          Rooted in <span className="italic text-primary">quality</span>, driven by <span className="italic text-primary">purity</span>.
          We provide the finest crystal clear coconut oil for your corporate needs.
        </p>
      </div>
    </Scene>
  );
}
