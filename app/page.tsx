import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/ui/feature";
import Pricing from "@/components/ui/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <HeroHeader />
        <HeroSection />
        <FeaturesSection />
        <Pricing />
    </div>
  );
}
