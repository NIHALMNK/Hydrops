export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Bright, minimal, crystal clean lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/90 via-[#FFFDFC]/40 to-transparent pointer-events-none" />
    </div>
  );
}
