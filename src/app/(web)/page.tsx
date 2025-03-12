import { CTASection } from "@/components/web/cta-section";
import { Footer } from "@/components/web/footer";
import { Header } from "@/components/web/header";
import { Hero } from "@/components/web/hero";
import { Pricing } from "@/components/web/pricing";
import { ProblemSection } from "@/components/web/problem-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        {/* <FeaturesSection /> */}
        {/* <HowItWorks /> */}
        {/* <Testimonials /> */}
        <CTASection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
