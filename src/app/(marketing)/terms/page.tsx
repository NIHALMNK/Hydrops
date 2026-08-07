import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service | Hydrops Pure Coconut Oil',
  description: 'Read the Terms of Service for Hydrops India Pvt. Ltd. Governing website use, product information, intellectual property, and guidelines.',
  alternates: {
    canonical: 'https://hydropsindia.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Hydrops Pure Coconut Oil',
    description: 'Read the Terms of Service for Hydrops India Pvt. Ltd. Governing website use and guidelines.',
    url: 'https://hydropsindia.com/terms',
    type: 'website',
    images: [
      {
        url: 'https://hydropsindia.com/images/brand/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hydrops Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Hydrops Pure Coconut Oil',
    description: 'Read the Terms of Service for Hydrops India Pvt. Ltd.',
    images: ['https://hydropsindia.com/images/brand/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Terms of Service', item: '/terms' },
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
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[#08180E] tracking-tight">Terms of Service</h1>
            <p className="text-sm text-[#666666]">Last updated: August 2026</p>
          </div>

          {/* Terms Sections */}
          <article className="prose prose-stone max-w-none space-y-8 text-[#2C2C2C] leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the website of Hydrops India Pvt. Ltd. at <a href="https://hydropsindia.com" className="text-[#08180E] underline underline-offset-4 hover:text-[#C8A96A]">https://hydropsindia.com</a>, you agree to be bound by these Terms of Service and all applicable laws in India.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">2. Intellectual Property Rights</h2>
              <p>
                All content, trademarks, logos, imagery, designs, and text on this website are the exclusive property of Hydrops India Pvt. Ltd. Reproduction, distribution, or commercial exploitation without prior written consent is strictly prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">3. Product & Educational Information</h2>
              <p>
                The information provided on this website regarding pure coconut oil, cold-pressed extraction, and product specifications is for educational and informational purposes. While we ensure maximum precision in product details, specifications may be updated as part of continuous quality refinement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">4. User Conduct</h2>
              <p>
                You agree not to use the website for any unlawful purpose, transmit malicious code, interfere with site security, or attempt unauthorized access to our infrastructure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">5. Limitation of Liability</h2>
              <p>
                Hydrops India Pvt. Ltd. shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your access to or use of this website or inability to access services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">6. Governing Law & Jurisdiction</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Malappuram/Kerala, India.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif text-[#08180E] font-medium border-l-2 border-[#C8A96A] pl-4">7. Contact Information</h2>
              <p>
                For enquiries regarding these Terms of Service, please reach out to us:
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
