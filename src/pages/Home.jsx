import React from "react";
import useScrollDepth from "@/lib/useScrollDepth";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import WhatIsMamaLaunchSection from "@/components/sections/WhatIsMamaLaunchSection";
import MethodSection from "@/components/sections/MethodSection";
import WalkAwaySection from "@/components/sections/WalkAwaySection";
import ModelsSection from "@/components/sections/ModelsSection";
import InsideTheStudioSection from "@/components/sections/InsideTheStudioSection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import FoundingMemberSection from "@/components/sections/FoundingMemberSection";
import DanielleStorySection from "@/components/sections/DanielleStorySection";
import IntakeFormSection from "@/components/sections/IntakeFormSection";

export default function Home() {
  useScrollDepth();
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <SiteNav />
      <main>
        <HeroSection />
        <TrustBar />
        <WhatIsMamaLaunchSection />
        <MethodSection />
        <WalkAwaySection />
        <ModelsSection />
        <InsideTheStudioSection />
        <EcosystemSection />
        <DanielleStorySection />
        <FoundingMemberSection />
        <IntakeFormSection />
      </main>
      <SiteFooter />
    </div>
  );
}