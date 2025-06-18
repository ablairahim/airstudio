import Hero from '@/components/Hero';
import { ApproachSection } from '@/components/ApproachSection';
import { WorkSection } from '@/components/WorkSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { CtaSection } from '@/components/CtaSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ApproachSection />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <CtaSection />
    </>
  );
} 