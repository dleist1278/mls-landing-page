import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import MethodSection from "@/components/sections/MethodSection";
import ModelsSection from "@/components/sections/ModelsSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import FounderSection from "@/components/sections/FounderSection";
import IntakeFormSection from "@/components/sections/IntakeFormSection";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <SiteNav />
      <main>
        <HeroSection />
        <MethodSection />
        <ModelsSection />
        <EcosystemSection />
        <FounderSection />
        <IntakeFormSection />
      </main>
      <SiteFooter />
    </div>
  );
}