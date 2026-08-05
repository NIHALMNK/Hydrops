import React from 'react';
import type { ProductDownload } from '@/features/products/types';

interface Props {
  downloads: ProductDownload[];
}

export function DownloadsSection({ downloads }: Props) {
  if (!downloads || downloads.length === 0) return null;

  return (
    <section id="downloads" className="py-20 md:py-28 bg-[#FAF8F5] text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-3">
            TRANSPARENCY & VERIFICATION
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Downloadable Assets & Reports
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {downloads.map((doc, idx) => (
            <div
              key={idx}
              className="product-section-fade p-6 rounded-[2rem] bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#C8A96A]/10 text-[#C8A96A] border border-[#C8A96A]/20 text-[10px] font-bold uppercase tracking-wider">
                    {doc.category}
                  </span>
                  <span className="text-xs text-[#1A1A1A]/40 font-mono">{doc.format}</span>
                </div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">{doc.title}</h3>
                {doc.description && <p className="text-xs text-[#1A1A1A]/60 font-light leading-relaxed mb-4">{doc.description}</p>}
              </div>

              <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                <span className="text-[10px] text-[#1A1A1A]/40 font-mono">
                  {doc.version ? `v${doc.version}` : ''} {doc.updatedDate ? `· ${doc.updatedDate}` : ''}
                </span>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#C8A96A] hover:bg-[#b59556] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Download</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
