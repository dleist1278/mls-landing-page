import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import HeroImage from "@/components/sections/HeroImage";
import { trackCTAClick } from "@/lib/analytics";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [heroImageData, setHeroImageData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    base44.entities.SiteContent.filter({ key: "hero_image" }).then((r) => {
      if (r?.length > 0) setHeroImageData(r[0]);
    });
    return () => clearTimeout(timer);
  }, []);

  const scrollToIntake = () => {
    trackCTAClick("Join the Founding Member Waitlist", "hero");
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToMethod = () => {
    trackCTAClick("Explore the Method", "hero");
    document.getElementById("method")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "0px" }}>
      
      {/* Background image wash */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1800&q=85"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 35%", opacity: 0.2 }} />
        
        <div
          className="absolute inset-0"
          style={{
            background:
            "linear-gradient(100deg, #FAF7F2 55%, rgba(250,247,242,0.85) 70%, rgba(250,247,242,0.1) 100%)"
          }} />
        
      </div>

      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ backgroundColor: "#C4956A", opacity: 0.4 }} />

      {/* Constrained, overflow-safe content wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-8 md:pt-28 pb-10 md:pb-16 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-12 lg:gap-20">

          {/* Text block — mobile-constrained */}
          <div className="w-full md:max-w-[520px] md:flex-none">

            {/* Headline */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1
                className="font-display mb-5 break-words"
                style={{
                  color: "#2C2C2C",
                  fontSize: "clamp(2.4rem, 7vw, 5.6rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.18",
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  overflowWrap: "break-word"
                }}>
                
                Reimagining Home Childcare for
                <br />
                <em style={{ color: "#4D5E49" }}>Modern Motherhood.</em>
              </h1>
            </div>

            {/* Mobile photo below headline */}
            {(() => {
              const HERO_BELOW_TITLE_PHOTO = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/6a41827ad_4.jpg"; // ← paste your photo URL here
              return HERO_BELOW_TITLE_PHOTO ?
              <div className="md:hidden w-full rounded-2xl overflow-hidden mb-5" style={{ boxShadow: "0 8px 32px rgba(196,149,106,0.12)" }}>
                  <img src={HERO_BELOW_TITLE_PHOTO} alt="Mama Launch" className="w-full object-cover" style={{ maxHeight: "260px", objectPosition: "center 20%" }} />
                </div> :

              <div className="md:hidden w-full rounded-2xl mb-5 flex items-center justify-center" style={{ height: "180px", backgroundColor: "rgba(77,94,73,0.06)", border: "1px dashed rgba(77,94,73,0.2)" }}>
                  <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.62rem" }}>Photo coming — paste URL in HeroSection</span>
                </div>;

            })()}

            {/* Subheadline */}
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p
                className="font-body mb-6 mx-auto text-center"
                style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "36ch" }}>
                
                Build a <strong style={{ color: "#2C2C2C", fontWeight: 500 }}>flexible childcare business</strong> around your life and goals — with guided systems, real structure, and a community that gets it.
              </p>
            </div>

            {/* Tag line — hidden on mobile */}
            <div className={`hidden sm:block transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p
                className="font-micro mb-9"
                style={{ color: "#C4956A", fontSize: "0.66rem", letterSpacing: "0.1em", textAlign: "center", display: "block" }}>
                
                Launch System · Templates · Community · Guided Implementation
              </p>
            </div>
            <div className="sm:hidden mb-6" />

            {/* CTAs — stacked on mobile, row on sm+ */}
            <div
              className={`transition-all duration-700 delay-500 flex flex-col sm:flex-row flex-wrap gap-3 mt-4 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
              }>
              
              <button
                onClick={scrollToIntake}
                className="font-micro text-white px-7 py-3.5 rounded-full transition-all duration-200 min-h-[48px] focus-sage w-full sm:w-auto text-center"
                style={{
                  backgroundColor: "#4D5E49",
                  fontSize: "0.78rem",
                  boxShadow: "0 4px 20px rgba(77,94,73,0.22)"
                }}>
                
                Become a Founding Member
              </button>
              {/* Ghost CTA — desktop/tablet only; replaced by text link on mobile */}
              <button
                onClick={scrollToMethod}
                className="hidden sm:block font-micro px-7 py-3.5 rounded-full border transition-all duration-200 min-h-[48px] focus-sage text-center"
                style={{
                  color: "#4D5E49",
                  borderColor: "#4D5E4928",
                  fontSize: "0.78rem",
                  backgroundColor: "rgba(77,94,73,0.03)"
                }}>
                
                Explore the Method
              </button>
            </div>

            {/* Mobile-only bridge copy */}
            <p className="md:hidden mt-5 font-body text-xs leading-relaxed text-center w-full" style={{ color: "#7A6E65" }}>
              You don't have to piece this together alone. Founding members get the step-by-step path from idea to opening day.
            </p>

            {/* Mobile-only: Your First Steps proof card */}
            

























            

            {/* Mobile-only: secondary text link replacing the ghost button */}
            





            
          </div>

          {/* Hero image — stacks below on mobile, right column on desktop */}
          <HeroImage imageData={heroImageData} visible={visible} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>);

}