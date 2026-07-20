import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

/**
 * ContactCTA – The brand arrives.
 * After six warm sections, the forest green is a statement.
 * The visitor should feel the brand land — confident, calm, complete.
 */
export function ContactCTA() {
  return (
    <section
      id="cta-section"
      className="relative w-full min-h-screen bg-[#0F5A32] text-white flex items-center justify-center overflow-hidden"
    >
      {/* Subtle inner light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Background bottle — large, ghostly, beautiful */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[45vw] max-w-[480px] h-[85vh] opacity-[0.12] pointer-events-none cta-bg-bottle">
        <Image
          src="/images/products/hydrops-coconut-oil.png"
          alt=""
          fill
          className="object-contain"
          sizes="45vw"
          aria-hidden="true"
        />
      </div>

      {/* Signature ripple at top */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 md:px-16 flex flex-col items-start max-w-2xl">

        <p className="cta-label text-[#C8A96A] text-[11px] font-medium tracking-[0.4em] uppercase mb-12 opacity-0">
          Hydrops · Pure Coconut Oil
        </p>

        <h2
          className="cta-title font-light tracking-tight mb-8 opacity-0"
          style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.92 }}
        >
          Ready to experience<br />
          <em className="not-italic text-white/50">real purity?</em>
        </h2>

        <p className="cta-desc text-white/60 font-light leading-relaxed mb-12 max-w-md opacity-0"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          Connect with us for wholesale inquiries, distribution partnerships, and bulk supply across India.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row gap-4 opacity-0">
          <Button
            size="lg"
            className="bg-white text-[#0F5A32] hover:bg-white/95 rounded-full px-10 text-base font-medium group shadow-xl"
          >
            Contact Us
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            className="bg-[#25D366] text-white hover:bg-[#22C55E] rounded-full px-10 text-base font-medium border-none shadow-xl"
          >
            WhatsApp
          </Button>
        </div>

        {/* Brand tagline */}
        <p className="cta-tagline mt-20 text-white/20 text-[11px] tracking-[0.35em] uppercase opacity-0">
          Crafted with care. Filtered with precision. Trusted by families.
        </p>
      </div>
    </section>
  );
}
