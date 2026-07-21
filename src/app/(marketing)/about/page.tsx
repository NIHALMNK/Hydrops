import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Hydrops',
  description:
    'Learn about Hydrops and our commitment to producing pure, double-filtered coconut oil from the finest Indian coconuts.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full"
        style={{ backgroundColor: '#F5F2EC', paddingTop: '8rem' }}
      >
        {/* Placeholder — About page content goes here */}
        <section className="container mx-auto px-6 md:px-12 lg:px-16 py-24">
          <h1
            className="font-light tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'rgba(30,30,30,0.85)',
              lineHeight: 1.1,
            }}
          >
            About Hydrops
          </h1>
          <p
            className="mt-6 text-[1.1rem] leading-relaxed max-w-2xl"
            style={{ color: 'rgba(30,30,30,0.55)' }}
          >
            Pure coconut oil, crafted with care from the finest Indian coconuts.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
