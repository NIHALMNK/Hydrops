import Image from 'next/image';
import { MapPin, Clock, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import type { ContactCtaDocument } from '@/types';

/**
 * ContactCTA – Premium Luxury Contact Section.
 * Features a deep dark forest green atmosphere with a heavily blurred grove image background,
 * radial lighting, stacked dark glass information cards, and an embedded live Google Map.
 */
interface Props { data: ContactCtaDocument; }

export function ContactCTA({ data }: Props) {
  const whatsappUrl = `https://wa.me/917012123505?text=${encodeURIComponent(
    'Hello Hydrops Team, I would like to inquire about your crystal clear coconut oil.'
  )}`;

  return (
    <section
      id="cta-section"
      className="relative w-full bg-[#08180E] text-white py-28 lg:py-40 overflow-hidden select-none"
    >
      {/* Heavy Blurred Background Image Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/assets/trees.jpg"
          alt=""
          fill
          className="object-cover scale-110 blur-[70px] opacity-40 brightness-75"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark gradient vignetting & ambient radial gold light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08180E]/80 via-[#08180E]/50 to-[#08180E]/95" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(200,169,106,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top Editorial Header & Action Buttons */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <p className="cta-label text-xs sm:text-sm font-medium tracking-[0.35em] uppercase text-[#C8A96A] mb-4 opacity-0">
            HYDROPS · PURE COCONUT OIL
          </p>

          <h2 className="cta-title text-[clamp(2.5rem,5.5vw,4.5rem)] font-light text-[#FAF8F5] leading-[1.08] tracking-tight mb-6 font-serif opacity-0">
            {data.headline}{' '}
            <span className="text-[#C8A96A] italic font-normal">{data.accentHeadline}</span>
          </h2>

          <p className="cta-desc text-white/70 font-light text-base sm:text-lg leading-relaxed max-w-xl mb-10 opacity-0">
            {data.description}
          </p>

          <div className="cta-buttons flex flex-wrap items-center gap-4 opacity-0">
            <a
              href="mailto:official@hydrops.in"
              className="inline-flex items-center justify-center bg-[#FAF8F5] text-[#08180E] hover:bg-white rounded-full px-8 py-4 text-sm font-medium shadow-md transition-all duration-300 hover:scale-105 group"
            >
              <span>{data.primaryCta.label}</span>
              <ArrowRight className="ml-2.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white hover:bg-[#1eb956] rounded-full px-8 py-4 text-sm font-medium shadow-md transition-all duration-300 hover:scale-105"
            >
              <span>{data.secondaryCta.label}</span>
            </a>
          </div>
        </div>

        {/* 2-Column Responsive Grid: Cards Column (Left) | Embedded Google Map Column (Right) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left Column (~42%): Stack of 4 Dark Glass Information Cards */}
          <div className="cta-cards-column w-full lg:w-[42%] flex flex-col gap-5 justify-between">
            {/* Card 1: Company Name & Address */}
            <div className="cta-card bg-[#111C14]/90 backdrop-blur-md text-[#FAF8F5] border border-[#C8A96A]/25 rounded-[1.8rem] p-7 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-[#C8A96A]/50 transition-all duration-300 group flex flex-col justify-between opacity-0">
              <div>
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-5 text-[#C8A96A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif font-light text-[#FAF8F5] mb-2 tracking-tight">Hydrops</h3>
                <p className="text-sm font-light text-white/70 leading-relaxed mb-6">
                  Kadungalloor, Aluva, Ernakulam, Kerala 683110, India
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">10°03'38.6"N 76°19'34.7"E</span>
                <a
                  href="https://maps.app.goo.gl/LykpGeLBQjAHpcVd8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono tracking-[0.25em] uppercase text-[#C8A96A] hover:text-white transition-colors gap-2"
                >
                  <span>NAVIGATE</span>
                  <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Row with Business Hours (Card 2) and Phone (Card 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 2: Business Hours */}
              <div className="cta-card bg-[#111C14]/90 backdrop-blur-md text-[#FAF8F5] border border-[#C8A96A]/25 rounded-[1.8rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-[#C8A96A]/50 transition-all duration-300 group opacity-0">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-4 text-[#C8A96A]">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1 block">HOURS</span>
                <p className="text-base font-serif font-light text-[#FAF8F5]">Mon – Sat</p>
                <p className="text-sm font-light text-[#C8A96A]">08:00 — 19:00</p>
              </div>

              {/* Card 3: Phone */}
              <div className="cta-card bg-[#111C14]/90 backdrop-blur-md text-[#FAF8F5] border border-[#C8A96A]/25 rounded-[1.8rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-[#C8A96A]/50 transition-all duration-300 group opacity-0">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center mb-4 text-[#C8A96A]">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1 block">CALL US</span>
                <a href="tel:+917012123505" className="text-base font-light text-[#FAF8F5] hover:text-[#C8A96A] transition-colors block">
                  +91 70121 23505
                </a>
              </div>
            </div>

            {/* Card 4: Email */}
            <div className="cta-card bg-[#111C14]/90 backdrop-blur-md text-[#FAF8F5] border border-[#C8A96A]/25 rounded-[1.8rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-[#C8A96A]/50 transition-all duration-300 group opacity-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#C8A96A] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-0.5 block">EMAIL US</span>
                  <a href="mailto:official@hydrops.in" className="text-sm sm:text-base font-light text-[#FAF8F5] hover:text-[#C8A96A] transition-colors break-all">
                    official@hydrops.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (~58%): Embedded Google Map */}
          <div className="cta-map-column w-full lg:w-[58%] min-h-[460px] lg:min-h-[540px] rounded-[2.2rem] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-white/15 relative opacity-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.4682057814896!2d76.3262963!3d10.0607144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080b0000000001%3A0x0!2zMTDCsDAzJzM4LjYiTiA3NsKwMTknMzQuNyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '460px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hydrops Location Map"
              className="w-full h-full rounded-[2.2rem]"
            />
          </div>
        </div>

        {/* Brand Tagline Footer */}
        <p className="cta-tagline mt-20 text-white/40 text-[11px] tracking-[0.35em] uppercase text-center opacity-0">
          {data.tagline}
        </p>
      </div>
    </section>
  );
}
