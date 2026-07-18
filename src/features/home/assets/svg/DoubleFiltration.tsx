export function DoubleFiltration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 40 L100 40" strokeDasharray="4 4" opacity="0.4" />
      <path d="M20 60 L100 60" opacity="0.7" />
      <path d="M20 80 L100 80" />
      <path d="M40 20 L40 100" opacity="0.3" />
      <path d="M60 20 L60 100" opacity="0.3" />
      <path d="M80 20 L80 100" opacity="0.3" />
    </svg>
  );
}
