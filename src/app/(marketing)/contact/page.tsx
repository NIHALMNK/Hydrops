import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getContactPage } from '@/lib/sanity/fetch';
import {
  ContactHero,
  ContactCards,
  ContactForm,
  ContactMap,
  ContactCTASection,
} from '@/features/contact';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getContactPage();
  return {
    title: `${pageData.hero.heading} | Hydrops`,
    description: pageData.hero.description,
  };
}

export default async function ContactPage() {
  const contactData = await getContactPage();

  return (
    <>
      <Navbar data={navigationData} />
      <main className="min-h-screen w-full bg-[#F8F6F1] text-[#1A1A1A]">
        {/* 01 · Hero Section */}
        <ContactHero data={contactData.hero} />

        {/* 02 · Contact Cards Section */}
        <ContactCards data={contactData.cards} />

        {/* 03 · Contact Form Section */}
        <ContactForm data={contactData.formContent} />

        {/* 04 · Live Google Map Section */}
        <ContactMap data={contactData.map} />

        {/* 05 · Quick Action CTA Section */}
        <ContactCTASection data={contactData.cta} />
      </main>
      <Footer />
    </>
  );
}
