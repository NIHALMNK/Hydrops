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
    <Scene height="h-[140vh]" id="quality-section" className="bg-[#FAF7F1] text-[#1a1a1a] items-center justify-center relative overflow-hidden">
      {/* Warm premium cream, elegant shadows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-[#FAF7F1]/50 to-transparent pointer-events-none" />
      {/* Background Factory Parallax Image Placeholder */}
      <div className="quality-bg absolute inset-0 opacity-20 scale-110 will-change-transform bg-primary/10"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
         
         <div className="w-full md:w-1/2 mb-12 md:mb-0">
           <h2 className="text-4xl md:text-6xl font-light mb-8 opacity-90">The Quality Promise</h2>
           <div className="relative border-l border-black/10 pl-8 space-y-16">
             {TIMELINE.map((item, i) => (
               <div key={i} className="quality-item relative opacity-0 translate-x-8 will-change-transform">
                 <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-[#FAF7F1]"></div>
                 <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                 <p className="text-[#1a1a1a]/70">{item.desc}</p>
               </div>
             ))}
           </div>
         </div>
         
         {/* Bottle Close-up Placeholder */}
         <div className="w-full md:w-1/2 flex justify-center">
            <div className="quality-bottle w-64 h-[500px] bg-black/5 backdrop-blur-md rounded-[4rem] border border-black/10 flex items-center justify-center opacity-0 scale-95 will-change-transform shadow-[0_0_100px_rgba(0,0,0,0.05)]">
               <span className="text-black/50 tracking-[0.3em]">CLOSE UP</span>
            </div>
         </div>

      </div>
    </Scene>
  );
}
