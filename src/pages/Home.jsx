import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import MethodSection from "@/components/sections/MethodSection";
import WalkAwaySection from "@/components/sections/WalkAwaySection";
import ModelsSection from "@/components/sections/ModelsSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import FoundingMemberSection from "@/components/sections/FoundingMemberSection";
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
        <WalkAwaySection />
        <ModelsSection />
        <EcosystemSection />
        <FoundingMemberSection />
        <FounderSection />
        <IntakeFormSection />
      </main>
      <SiteFooter />
    </div>
  );
}