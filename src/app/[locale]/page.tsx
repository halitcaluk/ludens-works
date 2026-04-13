import Hero from "@/components/home/Hero";
import LogoCarousel from "@/components/home/LogoCarousel";
import PainPoints from "@/components/home/PainPoints";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Differentiator from "@/components/home/Differentiator";
import Metrics from "@/components/home/Metrics";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <PainPoints />
      <Services />
      <Process />
      <Differentiator />
      {/* <Metrics /> */}
      <CTASection />
    </>
  );
}
