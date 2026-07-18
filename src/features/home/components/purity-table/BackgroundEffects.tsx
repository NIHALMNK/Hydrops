export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F6F8F3]">
      {/* Slow moving light gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,rgba(240,245,235,0.9)_0%,rgba(240,245,235,0)_70%)] opacity-80 blur-3xl pointer-events-none"></div>
      <div className="purity-bg-gradient absolute top-[30%] left-[20%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_60%)] opacity-70 blur-[120px] pointer-events-none will-change-transform"></div>
      <div className="purity-bg-gradient-alt absolute bottom-[20%] right-[10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_60%)] opacity-50 blur-[100px] pointer-events-none will-change-transform"></div>
    </div>
  );
}
