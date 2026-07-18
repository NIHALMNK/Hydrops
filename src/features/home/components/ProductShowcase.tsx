import { Scene } from './Scene';
import { BackgroundEffects } from './product-showcase/BackgroundEffects';
import { ProductContent } from './product-showcase/ProductContent';
import { ProductBottle } from './product-showcase/ProductBottle';

export function ProductShowcase() {
  return (
    <Scene id="product-showcase-section" className="bg-[#FFFDFC] relative items-center justify-center py-24 md:py-0 min-h-[100svh]">
      <BackgroundEffects />
      
      <div className="container mx-auto px-6 flex-1 w-full flex flex-col-reverse md:flex-row items-center justify-center relative z-10 gap-12 md:gap-8 lg:gap-16">
        <ProductContent />
        <ProductBottle />
      </div>
    </Scene>
  );
}
