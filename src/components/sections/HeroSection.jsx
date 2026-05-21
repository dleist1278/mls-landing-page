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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-10 md:pt-40 pb-12 md:pb-28 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-center gap-14 md:gap-16 lg:gap-20">

          {/* Text block — mobile-constrained */}
          <div className="w-full md:max-w-[520px] md:flex-none">

            {/* Headline */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1
              className="font-display mb-5 break-words md:text-left text-center"
                style={{
                  color: "#2C2C2C",
                  fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.12",
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}>
                
                Reimagining Home Childcare for
                <br />
                <em style={{ color: "#4D5E49" }}>Modern Motherhood.</em>
              </h1>
            </div>

            {/* Mobile photo below headline */}
            {(() => {
              const HERO_BELOW_TITLE_PHOTO = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/6a41827ad_4.jpg";
              return HERO_BELOW_TITLE_PHOTO ?
              <div className="md:hidden relative mb-5 mx-4">
                  <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(10px, 10px)", backgroundColor: "#C4956A", opacity: 0.18, zIndex: 0 }} />
                  <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(5px, 5px)", backgroundColor: "#4D5E49", opacity: 0.12, zIndex: 1 }} />
                  <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)", zIndex: 2 }}>
                    <img src={HERO_BELOW_TITLE_PHOTO} alt="Mama Launch" className="w-full object-cover" style={{ maxHeight: "260px", objectPosition: "center 20%" }} />
                  </div>
                </div> :

              <div className="md:hidden w-full rounded-2xl mb-5 flex items-center justify-center" style={{ height: "180px", backgroundColor: "rgba(77,94,73,0.06)", border: "1px dashed rgba(77,94,73,0.2)" }}>
                  <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.62rem" }}>Photo coming — paste URL in HeroSection</span>
                </div>;

            })()}

            {/* Subheadline */}
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p
                className="font-body mb-6 md:text-left text-center"
                style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "38ch", marginBottom: "1.75rem" }}>
                
                Build a <strong style={{ color: "#2C2C2C", fontWeight: 500 }}>flexible childcare business</strong><br />around your life, your family, and your goals.
              </p>
            </div>

            <div className="mb-6" />

            {/* CTAs — stacked on mobile, row on sm+ */}
            <div
              className={`transition-all duration-700 delay-500 flex flex-col sm:flex-row flex-wrap gap-3 mt-4 md:justify-start justify-center ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
              }>
              
              <button
                onClick={scrollToIntake}
                className="font-micro text-white px-8 py-4 rounded-full min-h-[52px] focus-sage w-full sm:w-auto text-center relative overflow-hidden"
                style={{
                  backgroundColor: "#4D5E49",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  boxShadow: "0 6px 24px rgba(77,94,73,0.28)",
                  animation: "heroPulse 2.8s ease-in-out infinite"
                }}>
                <style>{`
                  @keyframes heroPulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(77,94,73,0.22); transform: scale(1); }
                    50% { box-shadow: 0 6px 32px rgba(77,94,73,0.42), 0 0 0 6px rgba(77,94,73,0.08); transform: scale(1.015); }
                  }
                `}</style>
                Join the Founding Member Waitlist
                </button>
              <button
                onClick={scrollToMethod}
                className="hidden sm:block font-micro px-8 py-4 rounded-full border transition-all duration-200 min-h-[52px] focus-sage text-center"
                style={{
                  color: "#4D5E49",
                  borderColor: "#4D5E4940",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  backgroundColor: "rgba(77,94,73,0.04)"
                }}>
                Explore the Method
              </button>
            </div>

            {/* Mobile-only bridge copy */}
            <p className="md:hidden mt-4 font-body text-xs leading-relaxed text-center w-full" style={{ color: "#7A6E65" }}>
              The step-by-step path from idea to opening day.
            </p>
            
          </div>

          {/* Hero image — stacks below on mobile, right column on desktop */}
          <HeroImage imageData={heroImageData} visible={visible} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}