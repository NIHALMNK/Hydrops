import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hydrops Pure Coconut Oil',
  description: 'Read the Privacy Policy of Hydrops India Pvt. Ltd. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://hydropsindia.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Hydrops Pure Coconut Oil',
    description: 'Read the Privacy Policy of Hydrops India Pvt. Ltd. Learn how we collect, use, and protect your personal information.',
    url: 'https://hydropsindia.com/privacy-policy',
    type: 'website',
    images: [
      {
        url: 'https://hydropsindia.com/images/brand/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hydrops Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Hydrops Pure Coconut Oil',
    description: 'Read the Privacy Policy of Hydrops India Pvt. Ltd.',
    images: ['https://hydropsindia.com/images/brand/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Privacy Policy', item: '/privacy-policy' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar data={navigationData} />
      <main className="min-h-screen w-full bg-[#F8F6F1] text-[#1A1A1A] pt-32 pb-24 px-6 md:px-12 lg:px-24 selection:bg-[#C8A96A] selection:text-white">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="border-b border-[#E5E0D8] pb-8 space-y-4">
            <p className="text-[#C8A96A] text-xs font-semibold tracking-[0.25em] uppercase">Legal & Compliance</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[#08180E] tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-[#666666]">Last updated: August 2026</p>
          </div>

          {/* Policy Sections */}
          <article className="prose prose-stone max-w-none space-y-8 text-[#2C2C2C] leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">1. Introduction</h2>
              <p>
                Hydrops India Pvt. Ltd. (&quot;Hydrops&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us through our website at <a href="https://hydropsindia.com" className="text-[#08180E] underline underline-offset-4 hover:text-[#C8A96A]">https://hydropsindia.com</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">2. Information We Collect</h2>
              <p>We may collect information directly from you when you interact with our platform:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-[#4A4A4A]">
                <li><strong>Contact Enquiries:</strong> Name, email address, phone number, and message content submitted via our contact forms.</li>
                <li><strong>Log Data & Analytics:</strong> Anonymous usage data including browser types, referring pages, IP addresses, and page interaction timing.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">3. How We Use Your Information</h2>
              <p>Your information is used solely to provide and improve our services:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-[#4A4A4A]">
                <li>Responding to product enquiries, wholesale requests, and distribution queries.</li>
                <li>Ensuring technical security, preventing fraud, and optimizing website performance.</li>
                <li>Fulfilling legal and regulatory obligations in accordance with applicable laws in India.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">4. Information Sharing & Disclosure</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share information only with trusted service providers assisting in website hosting or communication delivery under strict confidentiality agreements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">5. Data Security</h2>
              <p>
                We employ industry-standard encryption, SSL protocols, and access controls to safeguard your data against unauthorized access, disclosure, or alteration.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">6. Contact Us</h2>
              <p>
                For questions or concerns regarding this Privacy Policy, please contact us at:
              </p>
              <div className="bg-[#EFECE6] p-6 rounded-lg text-sm space-y-2 border border-[#E5E0D8]">
                <p className="font-semibold text-[#08180E]">Hydrops India Pvt. Ltd.</p>
                <p>Housing Colony Road, Perinthalmanna, Malappuram, Kerala 679322, India</p>
                <p>Email: <a href="mailto:hydropsindia@gmail.com" className="text-[#08180E] underline">hydropsindia@gmail.com</a></p>
                <p>Phone: <a href="tel:+917012123505" className="text-[#08180E] underline">+91 7012123505</a></p>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
