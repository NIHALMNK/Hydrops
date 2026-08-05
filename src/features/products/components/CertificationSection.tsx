import React from 'react';
import Image from 'next/image';
import type { ProductCertification } from '@/features/products/types';

interface Props {
  certifications: ProductCertification[];
}

export function CertificationSection({ certifications }: Props) {
  // Only render if actual certification documents or verification links exist
  const validCerts = certifications?.filter(
    (cert) => (cert.supportingDocuments && cert.supportingDocuments.length > 0) || cert.verificationUrl,
  );

  if (!validCerts || validCerts.length === 0) return null;

  return (
    <section id="certifications" className="py-16 md:py-24 bg-white text-[#1A1A1A] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 product-section-fade">
          <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-2">
            VERIFIED ASSURANCE
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
            Purity & Quality Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validCerts.map((cert, idx) => (
            <div
              key={idx}
              className="product-section-fade p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-20 h-20 mb-4 rounded-xl overflow-hidden bg-white p-2 border border-[#E5E0D8] flex items-center justify-center">
                  {cert.logo?.src ? (
                    <Image
                      src={cert.logo.src}
                      alt={cert.logo.alt || cert.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-xs font-mono text-neutral-400">Logo</span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[#1A1A1A] mb-1">{cert.name}</h3>
                {cert.issuer && <p className="text-xs font-medium text-[#C8A96A] mb-2">{cert.issuer}</p>}
                {cert.description && <p className="text-[#1A1A1A]/60 font-light text-xs leading-relaxed mb-4">{cert.description}</p>}
              </div>

              <div className="pt-3 border-t border-[#E5E0D8] space-y-2">
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C8A96A] hover:text-[#8B6E30] font-medium"
                  >
                    <span>🔗 Verify Certificate</span>
                  </a>
                )}

                {cert.supportingDocuments && cert.supportingDocuments.length > 0 && (
                  <div className="space-y-1">
                    {cert.supportingDocuments.map((doc, dIdx) => (
                      <a
                        key={dIdx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E5E0D8] hover:bg-[#F5F2EC] text-xs text-[#1A1A1A] transition-colors"
                      >
                        <span>📄 {doc.title}</span>
                        <span className="text-[10px] text-[#C8A96A] font-mono">{doc.format}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
