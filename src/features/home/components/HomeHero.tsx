import { Scene } from './Scene';

export function HomeHero() {
  return (
    <Scene height="h-[100vh]" id="hero-section" className="bg-[#050505] text-white items-center justify-center">
      <div className="text-center select-none border border-white/20 p-8 rounded-xl backdrop-blur-sm">
        <h1 className="text-4xl font-light tracking-widest text-white/50">HERO PLACEHOLDER</h1>
        <p className="mt-4 text-white/30 tracking-widest">100VH</p>
      </div>
    </Scene>
  );
}
