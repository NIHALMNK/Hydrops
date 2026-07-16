import { Scene } from './Scene';

const TIMELINE = [
  { title: 'Quality Checked', desc: 'Raw material strictly inspected.' },
  { title: 'Double Filtered', desc: 'Purity at its finest.' },
  { title: 'Lab Tested', desc: 'Ensuring zero impurities.' },
  { title: 'Premium Packaging', desc: 'Sealed for longevity.' },
  { title: 'Quality Checked', desc: 'Raw material strictly inspected.' },
  { title: 'Double Filtered', desc: 'Purity at its finest.' },
  { title: 'Lab Tested', desc: 'Ensuring zero impurities.' },
  { title: 'Premium Packaging', desc: 'Sealed for longevity.' },
];

export function QualityPromise() {
  return (
    <Scene height="h-[140vh]" id="quality-section" className="bg-[#111111] text-white items-center justify-center relative overflow-hidden">
      {/* Background Factory Parallax Image Placeholder */}
      <div className="quality-bg absolute inset-0 opacity-20 scale-110 will-change-transform bg-primary/10"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
         
         <div className="w-full md:w-1/2 mb-12 md:mb-0">
           <h2 className="text-4xl md:text-6xl font-light mb-8 opacity-90">The Quality Promise</h2>
           <div className="relative border-l border-white/20 pl-8 space-y-16">
             {TIMELINE.map((item, i) => (
               <div key={i} className="quality-item relative opacity-0 translate-x-8 will-change-transform">
                 <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-[#111111]"></div>
                 <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                 <p className="text-white/60">{item.desc}</p>
               </div>
             ))}
           </div>
         </div>
         
         {/* Bottle Close-up Placeholder */}
         <div className="w-full md:w-1/2 flex justify-center">
            <div className="quality-bottle w-64 h-[500px] bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 flex items-center justify-center opacity-0 scale-95 will-change-transform shadow-[0_0_100px_rgba(255,255,255,0.05)]">
               <span className="text-white/50 tracking-[0.3em]">CLOSE UP</span>
            </div>
         </div>

      </div>
    </Scene>
  );
}
