import { Scene } from './Scene';
import { BottleDisplay } from './purity-table/BottleDisplay';
import { SpecificationOrbit } from './purity-table/SpecificationOrbit';
import { BackgroundEffects } from './purity-table/BackgroundEffects';

export function PurityTable() {
  return (
    <Scene height="min-h-[120vh]" id="purity-table-section" className="bg-[#F6F8F3] text-[#1a1a1a] relative">
      <BackgroundEffects />
      
      <div className="container mx-auto flex-1 w-full relative flex items-center justify-center">
        <BottleDisplay />
        <SpecificationOrbit />
      </div>
    </Scene>
  );
}
