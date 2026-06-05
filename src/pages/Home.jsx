import React from "react";
import useScrollDepth from "@/lib/useScrollDepth";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import AppFeaturesSection from "@/components/sections/AppFeaturesSection";
import PathwaysSection from "@/components/sections/PathwaysSection";
import AppFlowSection from "@/components/sections/AppFlowSection";
import DanielleStorySection from "@/components/sections/DanielleStorySection";
import AppLaunchFormSection from "@/components/sections/AppLaunchFormSection";

export default function Home() {
  useScrollDepth();
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2", overflowX: "hidden" }}>
      <SiteNav />
      <main>
        <HeroSection />
        <TrustBar />
        <AppFeaturesSection />
        <PathwaysSection />
        <AppFlowSection />
        <DanielleStorySection />
        <AppLaunchFormSection />
      </main>
      <SiteFooter />
    </div>
  );
}