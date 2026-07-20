export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large warm radial light in the upper right */}
      <div 
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full pointer-events-none mix-blend-soft-light"
        style={{
          background: 'radial-gradient(circle, rgba(255,253,240,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
