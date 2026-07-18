import { CTAButtons } from './CTAButtons';

export function ProductContent() {
  return (
    <div className="product-content flex-1 w-full flex flex-col justify-center max-w-lg opacity-0 translate-y-8 will-change-transform">
      <span className="text-[#388e4a] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 block">
        OUR PRODUCT
      </span>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight text-black tracking-tight">
        Colorless Crystal Clear Coconut Oil
      </h2>
      
      <p className="text-lg text-black/60 font-light leading-relaxed mb-10 max-w-[90%]">
        Experience the purest form of coconut oil. Double filtered to achieve a crystal clear finish that preserves natural goodness without any residue.
      </p>
      
      <CTAButtons />
    </div>
  );
}
