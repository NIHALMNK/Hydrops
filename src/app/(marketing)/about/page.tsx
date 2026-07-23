import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

import { aboutData } from '@/data/about/about';
import { aboutSeo } from '@/data/site/seo';
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
  title: aboutSeo.title,
  description: aboutSeo.description,
  openGraph: { title: aboutSeo.title, description: aboutSeo.description, images: [aboutSeo.openGraphImage.src] },
};

export default function AboutPage() {
  return (
    <>
      {/* 
        The Navbar is globally aware and will automatically adapt its text colour 
        based on the sections it passes over via the canvas probe we built earlier.
      */}
      <Navbar data={navigationData} />
      
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

