import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

import { aboutData } from '@/data/about/about';
import {
  AboutHero,
  BrandIntroduction,
  BrandStory,
  MissionVision,
  CoreValues,
  ManufacturingPhilosophy,
  QualityCommitment,
  WhyChooseHydrops,
  CompanyInfo,
  AboutCTA
} from '@/features/about';

export const metadata: Metadata = {
  title: 'About Us — Hydrops',
  description:
    'Discover the story of Hydrops. A company built around a single belief — that purity is never an accident. Double-filtered virgin coconut oil from the finest Indian coconuts.',
  openGraph: {
    title: 'About Us — Hydrops',
    description: 'A company built around a single belief — that purity is never an accident.',
    images: ['/images/brand/philosophy-coconut.png'],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* 
        The Navbar is globally aware and will automatically adapt its text colour 
        based on the sections it passes over via the canvas probe we built earlier.
      */}
      <Navbar />
      
      <main className="w-full flex flex-col">
        <AboutHero data={aboutData.hero} />
        <BrandIntroduction data={aboutData.introduction} />
        <BrandStory data={aboutData.story} />
        <MissionVision data={aboutData.missionVision} />
        <CoreValues data={aboutData.coreValues} />
        <ManufacturingPhilosophy data={aboutData.manufacturing} />
        <QualityCommitment data={aboutData.quality} />
        <WhyChooseHydrops data={aboutData.whyChoose} />
        <CompanyInfo data={aboutData.companyInfo} />
        <AboutCTA data={aboutData.cta} />
      </main>

      <Footer />
    </>
  );
}

