import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DemoAnalyzer from "@/components/DemoAnalyzer";
import TimelineSection from "@/components/TimelineSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <DemoAnalyzer />
        <TimelineSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
