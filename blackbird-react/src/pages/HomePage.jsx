import HeroSection from '../components/sections/HeroSection';
import TrustedSection from '../components/sections/TrustedSection';
import VideoSection from '../components/sections/VideoSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import NewFeaturesSection from '../components/sections/NewFeaturesSection';
import EmergencySection from '../components/sections/EmergencySection';
import ProductsSection from '../components/sections/ProductsSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import PricingSection from '../components/sections/PricingSection';
import CTASection from '../components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <VideoSection />
      <FeaturesSection />
      <NewFeaturesSection />
      <EmergencySection />
      <ProductsSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
