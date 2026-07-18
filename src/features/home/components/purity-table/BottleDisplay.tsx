import Image from 'next/image';

export function BottleDisplay() {
  return (
    <div className="relative pt-32 md:pt-0 md:absolute inset-0 z-10 flex items-center justify-center pointer-events-none perspective-[1000px]">
      <div className="purity-parallax-wrapper relative w-full h-full flex items-center justify-center will-change-transform">
        <div className="purity-bottle-container relative w-[240px] md:w-[280px] lg:w-[320px] aspect-[1/2.2] will-change-transform origin-center">
          
          {/* Soft shadow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-black/10 blur-xl rounded-[100%] scale-x-[1.5] bottle-shadow"></div>

          <Image 
            src="/images/products/Hydrops_coconutOil.png"
            alt="Hydrops Coconut Oil Bottle"
            fill
            className="object-contain drop-shadow-2xl z-10 bottle-image"
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
            priority
          />
          
          {/* Halo overlay - animated by GSAP to glow when cards activate */}
          <div className="bottle-halo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#388e4a]/0 blur-[80px] -z-10 rounded-full will-change-[background-color,scale]" />

          {/* Glass reflection overlay */}
          <div className="bottle-reflection absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay z-20 pointer-events-none rounded-3xl will-change-transform" />
        </div>
      </div>
    </div>
  );
}
