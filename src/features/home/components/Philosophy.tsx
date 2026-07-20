import { SectionRipple } from './SectionRipple';

export function Philosophy() {
  return (
    <div id="philosophy-section" className="bg-[#F5F2EC] text-[#1E1E1E] relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* Ambient warm radial — no harsh center glare */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(200,169,106,0.06) 0%, transparent 70%)' }}
      />

      {/* Background Watermark */}
      <div className="philosophy-watermark absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[25vw] font-bold text-[#1E1E1E] opacity-[0.018] blur-[6px] select-none whitespace-nowrap will-change-transform">
          HYDROPS
        </span>
      </div>

      {/* Centered Content Block */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[800px] px-6">
        
        {/* Visual Anchor: The Droplet */}
        <div className="philosophy-droplet mb-12 will-change-transform opacity-0">
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M12 0C12 0 3 12.632 3 21C3 25.9706 7.02944 30 12 30C16.9706 30 21 25.9706 21 21C21 12.632 12 0 12 0Z" 
                  stroke="#1E1E1E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 21C7 18.2386 9.23858 16 12 16" 
                  stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Typography Engine */}
        <div className="relative w-full">
          
          {/* Persistent Phrase */}
          <h2 className="philosophy-persistent text-[clamp(3rem,6vw,5rem)] font-light tracking-tight mb-4 opacity-0 will-change-transform text-[#1E1E1E]">
            Every Drop
          </h2>

          {/* Chapters Container */}
          <div className="relative h-[200px] md:h-[240px] w-full mt-4">
            
            {/* Chapter 1 */}
            <div className="philosophy-chapter chapter-1 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0 will-change-transform">
              <h3 className="text-[clamp(3rem,6vw,5rem)] font-light tracking-tight text-[#1E1E1E]">
                Begins<br />
                <span className="text-[#205C3B]">With Purity.</span>
              </h3>
            </div>

            {/* Chapter 2 */}
            <div className="philosophy-chapter chapter-2 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0 will-change-transform">
              <h3 className="text-[clamp(2.2rem,5vw,4rem)] font-light tracking-tight leading-tight text-[#1E1E1E]">
                Carefully Selected.<br />
                Patiently Crafted.<br />
                Crystal Clear.
              </h3>
            </div>

            {/* Chapter 3 */}
            <div className="philosophy-chapter chapter-3 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0 will-change-transform">
              <h3 className="text-[clamp(3rem,6vw,5rem)] font-light tracking-tight text-[#1E1E1E]">
                Earns Your Trust.
              </h3>
              
              {/* Final CTA */}
              <div className="philosophy-cta mt-12 opacity-0 will-change-transform flex justify-center w-full">
                <button className="text-xs font-medium tracking-[0.25em] uppercase text-[#205C3B] border-b border-[#205C3B]/50 pb-1 hover:border-[#205C3B] transition-colors duration-300">
                  Discover The Journey
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Signature ripple transition */}
      <SectionRipple />
    </div>
  );
}
