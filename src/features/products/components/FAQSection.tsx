'use client';

import React, { useState } from 'react';
import type { ProductFaq } from '@/features/products/types';

interface Props {
  faqs: ProductFaq[];
}

export function FAQSection({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            COMMON INQUIRIES
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="product-section-fade rounded-2xl bg-white border border-[#E5E0D8] shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-[#1A1A1A] hover:text-[#C8A96A] transition-colors"
                >
                  <span className="text-base md:text-lg">{faq.question}</span>
                  <span className="text-[#C8A96A] text-xl font-mono shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-[#1A1A1A]/70 font-light text-sm leading-relaxed border-t border-[#E5E0D8] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
