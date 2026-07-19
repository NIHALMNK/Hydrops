import { Scene } from './Scene';

export function Philosophy() {
  return (
    <div id="philosophy-section" className="bg-[#FBF8F2] text-[#1a1a1a] relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* Background Radial Light */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" />

      {/* Background Watermark */}
      <div className="philosophy-watermark absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[25vw] font-bold text-black opacity-[0.02] blur-[8px] select-none whitespace-nowrap will-change-transform">
          HYDROPS
        </span>
      </div>

      {/* Centered Content Block */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[800px] px-6">
        
        {/* Visual Anchor: The Droplet */}
        <div className="philosophy-droplet mb-12 will-change-transform opacity-0">
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M12 0C12 0 3 12.632 3 21C3 25.9706 7.02944 30 12 30C16.9706 30 21 25.9706 21 21C21 12.632 12 0 12 0Z" 
                  stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 21C7 18.2386 9.23858 16 12 16" 
                  stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Typography Engine */}
        <div className="relative w-full">
          
          {/* Persistent Phrase */}
          <h2 className="philosophy-persistent text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4 opacity-0 will-change-transform">
            Every Drop
          </h2>

          {/* Chapters Container - Fixed height to avoid layout jumps */}
          <div className="relative h-[200px] md:h-[240px] w-full mt-4">
            
            {/* Chapter 1 */}
            <div className="philosophy-chapter chapter-1 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0 will-change-transform">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1a1a1a]">
                Begins<br />
                <span className="text-[#388e4a]">With Purity.</span>
              </h3>
            </div>

            {/* Chapter 2 */}
            <div className="philosophy-chapter chapter-2 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0 will-change-transform">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-[#1a1a1a]">
                Carefully Selected.<br />
                Patiently Crafted.<br />
                Crystal Clear.
              </h3>
            </div>

            {/* Chapter 3 */}
            <div className="philosophy-chapter chapter-3 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0 will-change-transform">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1a1a1a]">
                Earns Your Trust.
              </h3>
              
              {/* Final CTA - Only appears in Chapter 3 */}
              <div className="philosophy-cta mt-12 opacity-0 will-change-transform flex justify-center w-full">
                <button className="text-sm font-medium tracking-[0.2em] uppercase text-[#388e4a] border-b border-[#388e4a] pb-1 hover:text-[#2a6b38] hover:border-[#2a6b38] transition-colors duration-300">
                  Discover The Journey
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Liquid Transition to next section */}
      <div className="philosophy-liquid-wrapper absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none translate-y-[150px] will-change-transform">
        <svg 
          className="philosophy-liquid-svg relative block w-[110vw] h-[150px] md:h-[200px] -ml-[5vw] will-change-transform" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 200" 
          preserveAspectRatio="none"
        >
          <path 
            className="philosophy-liquid-path"
            d="M0,200 L1440,200 L1440,110 C1200,110 1200,50 960,50 C720,50 720,110 480,110 C240,110 240,70 0,70 Z" 
            fill="#EEF5EC" 
          />
        </svg>
      </div>
    </div>
  );
}
