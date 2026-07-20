/**
 * SectionRipple – Hydrops signature transition element.
 * A thin warm-gold light ripple that sits at the bottom of each section,
 * creating visual continuity across the homepage journey.
 * Visitors won't consciously notice it but will feel the cohesion.
 */
export function SectionRipple({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full h-px pointer-events-none z-20 ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.35) 30%, rgba(200,169,106,0.6) 50%, rgba(200,169,106,0.35) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
