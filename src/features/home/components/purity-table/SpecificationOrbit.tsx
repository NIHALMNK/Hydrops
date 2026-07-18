import { specifications } from '../../data/specifications';
import { SpecificationCard } from './SpecificationCard';

// Desktop asymmetrical fixed positions
const orbitLayout = [
  { x: -280, y: -170 },   // [1]
  { x: 250, y: -120 },    // [2]
  { x: -320, y: 40 },     // [3]
  { x: 290, y: 90 },      // [4]
  { x: -170, y: 250 },    // [5]
  { x: 170, y: 250 },     // [6]
];

export function SpecificationOrbit() {
  return (
    <div className="orbit-container absolute inset-0 z-30 flex scale-[0.85] lg:scale-100 origin-center pointer-events-none">
      {specifications.map((spec, index) => (
        <SpecificationCard 
          key={spec.id} 
          spec={spec} 
          position={orbitLayout[index]} 
        />
      ))}
    </div>
  );
}
