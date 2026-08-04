import type { CompanyInfoData } from '@/features/about/types';
import { MapPin, Clock, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Props {
  data: CompanyInfoData;
}

export function CompanyInfo({ data }: Props) {
  return (
    <section
      id="about-company"
      aria-labelledby="company-heading"
      className="relative w-full bg-[#0A0A0A] text-white py-32 overflow-hidden"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Top Area */}
        <div className="mb-20 max-w-3xl">
          <p
            className="company-eyebrow text-[#C8A96A] font-medium uppercase mb-6"
            style={{ fontSize: '11px', letterSpacing: '0.4em' }}
          >
            {data.eyebrow}
          </p>
          <h2
            id="company-heading"
            className="company-heading font-light text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
            dangerouslySetInnerHTML={{
              __html: data.heading.replace('real purity', '<span class="text-[#C8A96A] italic pr-2">real purity</span>')
            }}
          />
          <p className="company-desc text-white/60 font-light text-lg mb-10 max-w-xl leading-relaxed">
            {data.description}
          </p>
          
          <div className="company-ctas flex flex-wrap gap-4">
            <Link
              href={data.primaryCta.href}
              className="group inline-flex items-center justify-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 rounded-full font-medium transition-transform hover:scale-105"
            >
              {data.primaryCta.label}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={data.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105"
            >
              {data.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* Bottom Area: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Location Card */}
            <div className="company-card group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md transition-all duration-500 hover:border-[#C8A96A]/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C8A96A]/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A96A]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 transition-colors group-hover:border-[#C8A96A]/50">
                <MapPin size={20} className="text-[#C8A96A] transition-transform duration-500 group-hover:scale-110" />
              </div>
              
              <h3 className="text-2xl font-light mb-2">{data.companyName}</h3>
              <p className="text-white/60 font-light mb-8 max-w-xs leading-relaxed">
                {data.address.line1}, {data.address.line2}, {data.address.line3}
              </p>
              
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-white/40 text-xs font-mono tracking-widest uppercase">{data.coordinates}</span>
                <a
                  href={data.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C8A96A] text-xs font-medium tracking-[0.2em] uppercase transition-colors hover:text-white"
                >
                  Navigate <ExternalLink size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Sub Grid (Hours & Phone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Hours Card */}
              <div className="company-card group flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md transition-all duration-500 hover:border-[#C8A96A]/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6 transition-colors group-hover:border-[#C8A96A]/50">
                  <Clock size={16} className="text-[#C8A96A] transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-2">Hours</p>
                <div className="text-white font-light text-sm whitespace-pre-line leading-relaxed">
                  {data.businessHours}
                </div>
              </div>

              {/* Phone Card */}
              <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="company-card group flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md transition-all duration-500 hover:border-[#C8A96A]/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-2xl">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6 transition-colors group-hover:border-[#C8A96A]/50">
                  <Phone size={16} className="text-[#C8A96A] transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-2">Call Us</p>
                <p className="text-white font-light text-lg tracking-wide">{data.phone}</p>
              </a>

            </div>

            {/* Email Card */}
            <a href={`mailto:${data.email}`} className="company-card group flex items-center gap-6 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md transition-all duration-500 hover:border-[#C8A96A]/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors group-hover:border-[#C8A96A]/50">
                <Mail size={16} className="text-[#C8A96A] transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-1">Email Us</p>
                <p className="text-white font-light text-lg">{data.email}</p>
              </div>
            </a>
          </div>

          {/* Right Column: Google Map */}
          <div className="company-map relative w-full h-[500px] lg:h-auto rounded-3xl overflow-hidden border border-white/10">
            <iframe
              src={data.mapUrl}
              className="absolute inset-0 w-full h-full filter grayscale contrast-125 opacity-80 transition-all duration-700 hover:filter-none hover:opacity-100"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
