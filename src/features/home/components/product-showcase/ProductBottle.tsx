import Image from 'next/image';

export function ProductBottle() {
  return (
    <div className="product-bottle-container flex-1 w-full flex items-center justify-center relative perspective-[1000px] h-[50vh] md:h-auto">
      <div className="product-bottle will-change-transform opacity-0 scale-90 origin-center">
        <div className="product-parallax relative w-[240px] md:w-[320px] lg:w-[400px] aspect-[1/2.2]">
          
          {/* Soft Shadow below bottle */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-black/10 blur-xl rounded-[100%] scale-x-[1.5]"></div>

          <Image 
            src="/images/products/Hydrops_coconutOil.png"
            alt="Hydrops Coconut Oil Bottle"
            fill
            className="object-contain drop-shadow-2xl z-10"
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 400px"
            priority
          />
          
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay z-20 pointer-events-none rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
