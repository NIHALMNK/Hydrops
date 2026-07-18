import Link from 'next/link';

export function CTAButtons() {
  return (
    <div className="cta-buttons flex flex-col sm:flex-row gap-4 opacity-0 will-change-transform">
      <Link 
        href="/products"
        className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-[#388e4a] px-8 text-sm font-semibold tracking-wide text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Explore Product
      </Link>
      <Link 
        href="/contact"
        className="group relative flex h-14 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border border-black/10 bg-transparent px-8 text-sm font-semibold tracking-wide text-black transition-all hover:border-black/30 hover:bg-black/5 active:scale-[0.98]"
      >
        Contact Us
      </Link>
    </div>
  );
}
