import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/ui/feature";
import FooterSection from "@/components/ui/footer";
import Pricing from "@/components/ui/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <HeroHeader />
        <HeroSection />
        <FeaturesSection />
        <Pricing />
        <FooterSection />
    </div>
  );
}
