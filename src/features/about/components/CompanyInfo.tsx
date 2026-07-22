import type { CompanyInfoData } from '@/features/about/types';

interface Props {
  data: CompanyInfoData;
}

/**
 * CompanyInfo — factual company details on a clean cream background.
 * Two-column layout: left column for identity facts, right for contact + certs.
 */
export function CompanyInfo({ data }: Props) {
  return (
    <section
      id="about-company"
      aria-labelledby="company-heading"
      className="relative w-full bg-[#EEEBE4] py-24 overflow-hidden"
    >
      {/* Top gold thread */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.35), transparent)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">

        {/* Eyebrow */}
        <p
          className="text-[#C8A96A] font-medium uppercase mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.4em' }}
        >
          {data.eyebrow}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left — identity */}
          <div>
            <h2
              id="company-heading"
              className="font-light text-[#1A1A1A] mb-8"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              {data.headline}
            </h2>

            <dl className="flex flex-col gap-6">
              {[
                { term: 'Legal Name', detail: data.legalName },
                { term: data.foundedLabel, detail: data.foundedValue },
                { term: data.originLabel, detail: data.originValue },
              ].map(({ term, detail }) => (
                <div key={term} className="flex flex-col gap-1">
                  <dt
                    className="text-[#1A1A1A]/40 font-medium uppercase"
                    style={{ fontSize: '10px', letterSpacing: '0.3em' }}
                  >
                    {term}
                  </dt>
                  <dd
                    className="text-[#1A1A1A]/75 font-light"
                    style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
                  >
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — contact + certifications */}
          <div className="flex flex-col gap-12">

            {/* Contact */}
            <div>
              <p
                className="text-[#1A1A1A]/40 font-medium uppercase mb-4"
                style={{ fontSize: '10px', letterSpacing: '0.3em' }}
              >
                {data.contactLabel}
              </p>
              <address className="not-italic flex flex-col gap-2">
                <a
                  href={`mailto:${data.email}`}
                  className="text-[#205C3B] font-light hover:underline transition-all"
                  style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
                >
                  {data.email}
                </a>
                <a
                  href={`tel:${data.phone.replace(/\s/g, '')}`}
                  className="text-[#1A1A1A]/65 font-light hover:text-[#1A1A1A] transition-colors"
                  style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
                >
                  {data.phone}
                </a>
                <div className="mt-2 text-[#1A1A1A]/50 font-light"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)' }}
                >
                  <p>{data.address.line1}</p>
                  <p>{data.address.line2}</p>
                  <p>{data.address.line3}</p>
                </div>
              </address>
            </div>

            {/* Certifications */}
            <div>
              <p
                className="text-[#1A1A1A]/40 font-medium uppercase mb-4"
                style={{ fontSize: '10px', letterSpacing: '0.3em' }}
              >
                Standards
              </p>
              <ul className="flex flex-col gap-3">
                {data.certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#1A1A1A]/60 font-light"
                    style={{ fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)' }}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-1 h-1 rounded-full"
                      style={{ background: '#C8A96A' }}
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom gold thread */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.35), transparent)',
        }}
      />
    </section>
  );
}
