export function CoconutCrossSection(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="60" cy="60" r="40" />
      <circle cx="60" cy="60" r="30" opacity="0.5" />
      <circle cx="60" cy="60" r="20" strokeDasharray="2 4" opacity="0.3" />
    </svg>
  );
}
