import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/ui/feature";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <HeroHeader />
        <HeroSection />
        <FeaturesSection />
    </div>
  );
}
