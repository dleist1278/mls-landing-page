import React from "react";
import useScrollDepth from "@/lib/useScrollDepth";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import WhatIsMamaLaunchSection from "@/components/sections/WhatIsMamaLaunchSection";
import ModelsSection from "@/components/sections/ModelsSection";
import BuildInMotionSection from "@/components/sections/BuildInMotionSection";
import MethodSection from "@/components/sections/MethodSection";
import WalkAwaySection from "@/components/sections/WalkAwaySection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import DanielleStorySection from "@/components/sections/DanielleStorySection";
import FoundingMemberSection from "@/components/sections/FoundingMemberSection";
import FoundingCohortSection from "@/components/sections/FoundingCohortSection";
import IntakeFormSection from "@/components/sections/IntakeFormSection";

export default function Home() {
  useScrollDepth();
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2", overflowX: "hidden" }}>
      <SiteNav />
      <main>
        <HeroSection />
        <TrustBar />
        <WhatIsMamaLaunchSection />
        <ModelsSection />
        <BuildInMotionSection />
        <MethodSection />
        <WalkAwaySection />
        <EcosystemSection />
        <DanielleStorySection />
        <FoundingMemberSection />
        <FoundingCohortSection />
        <IntakeFormSection />
      </main>
      <SiteFooter />
    </div>
  );
}