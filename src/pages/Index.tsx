
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { StemCellEducation } from "@/components/StemCellEducation";
import { VideoSection } from "@/components/VideoSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";
import { PersistentFooter } from "@/components/PersistentFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <ProductShowcase />
      <StemCellEducation />
      <VideoSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <NewsletterSignup />
      <Footer />
      <PersistentFooter />
    </div>
  );
};

export default Index;
