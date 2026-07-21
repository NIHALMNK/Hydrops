import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products — Hydrops',
  description:
    'Explore the Hydrops range of pure, double-filtered coconut oil products — crafted for purity and everyday use.',
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full"
        style={{ backgroundColor: '#F5F2EC', paddingTop: '8rem' }}
      >
        {/* Placeholder — Products page content goes here */}
        <section className="container mx-auto px-6 md:px-12 lg:px-16 py-24">
          <h1
            className="font-light tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'rgba(30,30,30,0.85)',
              lineHeight: 1.1,
            }}
          >
            Our Products
          </h1>
          <p
            className="mt-6 text-[1.1rem] leading-relaxed max-w-2xl"
            style={{ color: 'rgba(30,30,30,0.55)' }}
          >
            Double-filtered purity in every drop. Discover the Hydrops product range.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
