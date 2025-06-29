import Hero from '@/components/Hero';
import { BenefitsSection } from '@/components/BenefitsSection';
import { WorkSection } from '@/components/WorkSection';
import { ClientLayout } from '@/components/ClientLayout';

export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <BenefitsSection />
      <WorkSection />
    </ClientLayout>
  );
} 