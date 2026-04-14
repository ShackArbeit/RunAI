import { CTASection } from "@/components/landing/CTASection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingProvider } from "@/components/landing/LandingProvider";
import { RouteSection } from "@/components/landing/RouteSection";

export default function Home() {
  return (
    <LandingProvider>
      <div id="top" />
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <RouteSection />
        <CTASection />
      </main>
      <Footer />
    </LandingProvider>
  );
}
