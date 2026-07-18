import { SpecificationItemData } from '../../data/specifications';

interface SpecificationCardProps {
  spec: SpecificationItemData;
  position?: { x: number; y: number };
}

export function SpecificationCard({ spec, position }: SpecificationCardProps) {
  return (
    <div 
      className="purity-card relative md:absolute flex flex-col items-center justify-center opacity-30 scale-95 will-change-[transform,opacity]"
      style={position ? { 
        transform: `translate(${position.x}px, ${position.y}px)`,
        // We use absolute positioning from the center of the orbit container
        left: '50%',
        top: '50%',
        marginLeft: '-140px', // half width to center anchor
        marginTop: '-40px', // roughly half height
      } : {}}
      data-id={spec.id}
    >
      <div className="w-[280px] p-4 text-center purity-card-content flex flex-col items-center justify-center">
        <span className="purity-card-label text-[#388e4a] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-1 block opacity-80">
          {spec.label}
        </span>
        <h3 className="purity-card-title text-lg md:text-xl font-medium text-black transition-colors duration-500 tracking-[0.05em] m-0">
          {spec.title}
        </h3>
      </div>
    </div>
  );
}
