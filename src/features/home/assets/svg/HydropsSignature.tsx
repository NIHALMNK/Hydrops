export function HydropsSignature(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M40 80 L60 40 L80 80" opacity="0.8" />
      <path d="M50 60 H70" opacity="0.6" />
      <circle cx="60" cy="60" r="45" opacity="0.2" />
    </svg>
  );
}
