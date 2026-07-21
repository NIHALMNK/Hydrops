import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Hydrops',
  description:
    'Get in touch with Hydrops. Enquire about our pure coconut oil products, wholesale orders, or any questions you may have.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full"
        style={{ backgroundColor: '#F5F2EC', paddingTop: '8rem' }}
      >
        {/* Placeholder — Contact page content goes here */}
        <section className="container mx-auto px-6 md:px-12 lg:px-16 py-24">
          <h1
            className="font-light tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'rgba(30,30,30,0.85)',
              lineHeight: 1.1,
            }}
          >
            Contact Us
          </h1>
          <p
            className="mt-6 text-[1.1rem] leading-relaxed max-w-2xl"
            style={{ color: 'rgba(30,30,30,0.55)' }}
          >
            We&apos;d love to hear from you. Reach out about products, orders, or anything else.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
