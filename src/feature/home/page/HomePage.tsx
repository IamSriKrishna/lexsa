import { HeaderBar } from "../components/HeaderBar";
import { HeroSection } from "../components/HeroSection";
import { ProductSections } from "../components/ProductSections";
import { VideoSection } from "../components/VideoSection";
import { FooterSection } from "../components/FooterSection";
import { JewelryStorySection } from "../components/JewelryStorySection";
import { ContactSection } from "../components/ContactSection";
import { DeveloperSection } from "../components/DeveloperSection";
import { LoadingScreen } from "../components/LoadingScreen";
import { useState } from "react";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="min-h-screen bg-[#f4f4f2]">
        <HeaderBar />
        <HeroSection />
        <ProductSections />
        <VideoSection />
        <JewelryStorySection />
        <ContactSection />
        <DeveloperSection />
        <FooterSection />
      </main>
    </>
  );
};