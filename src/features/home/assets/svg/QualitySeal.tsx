export function QualitySeal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="60" cy="60" r="40" strokeDasharray="10 6" />
      <circle cx="60" cy="60" r="32" opacity="0.6" />
      <path d="M60 40 V80 M40 60 H80" opacity="0.4" />
    </svg>
  );
}
