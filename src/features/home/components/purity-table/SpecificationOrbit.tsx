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
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 767px) {
          .purity-card {
            position: relative !important;
            transform: none !important;
            left: auto !important;
            top: auto !important;
            margin: 0 !important;
            width: 100% !important;
            opacity: 0; /* GSAP will fade them in on scroll */
            scale: 1 !important;
            margin-bottom: 3rem !important;
          }
          .purity-card-content {
            width: 100% !important;
          }
        }
      `}} />
      <div className="orbit-container relative md:absolute md:inset-0 z-30 mt-24 md:mt-0 flex flex-col md:block px-6 md:px-0 md:scale-[0.85] lg:scale-100 origin-center">
        {specifications.map((spec, index) => (
          <SpecificationCard 
            key={spec.id} 
            spec={spec} 
            position={orbitLayout[index]} 
          />
        ))}
      </div>
    </>
  );
}
