import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { productsPageData } from '@/data/products/products-page';

export const metadata: Metadata = {
  title: productsPageData.seo.title,
  description: productsPageData.seo.description,
};

export default function ProductsPage() {
  return (
    <>
      <Navbar data={navigationData} />
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
            {productsPageData.heading}
          </h1>
          <p
            className="mt-6 text-[1.1rem] leading-relaxed max-w-2xl"
            style={{ color: 'rgba(30,30,30,0.55)' }}
          >
            {productsPageData.description}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
