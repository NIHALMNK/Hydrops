import { Scene } from './Scene';
import { ProductContent } from './product-showcase/ProductContent';
import { ProductBottle } from './product-showcase/ProductBottle';

export function ProductShowcase() {
  return (
    <Scene id="product-showcase-section" className="bg-[#F5F2EC] relative min-h-[100svh] overflow-hidden">
      
      {/* 45% Content / 55% Product Layout */}
      <div className="container mx-auto px-12 lg:px-24 h-full w-full flex flex-col md:flex-row items-center justify-between relative z-10 min-h-[100svh] py-24 md:py-0">
        
        {/* Left Side: Editorial Content (40%) */}
        <div className="w-full md:w-[40%] h-full flex flex-col justify-center relative z-20">
           <ProductContent />
        </div>

        {/* Right Side: Immersive Product Composition (60%) */}
        <div className="w-full md:w-[60%] h-[60vh] md:h-[100svh] relative flex items-center justify-center">
           <ProductBottle />
        </div>
      </div>
    </Scene>
  );
}
