import React from 'react';
import Link from 'next/link';

interface Props {
  message?: string;
}

export function EmptyState({ message }: Props) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F5F2EC] text-[#1A1A1A] px-6 py-24">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#C8A96A]/10 text-[#C8A96A] border border-[#C8A96A]/20 flex items-center justify-center text-2xl mx-auto">
          🌴
        </div>

        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-[#1A1A1A]">
          Flagship Product Unavailable
        </h1>

        <p className="text-[#1A1A1A]/60 font-light text-sm leading-relaxed">
          {message || 'Our flagship product is currently undergoing seasonal cold pressing. Please check back soon.'}
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-[#C8A96A] hover:bg-[#b59556] text-white text-xs font-bold uppercase tracking-widest transition-all"
          >
            Contact Us
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white hover:bg-neutral-100 text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest border border-[#E5E0D8] transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
