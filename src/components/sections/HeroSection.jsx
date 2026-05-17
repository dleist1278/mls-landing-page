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
      className="relative min-h-[65vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Background image wash */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1800&q=85"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 35%", opacity: 0.2 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, #FAF7F2 55%, rgba(250,247,242,0.85) 70%, rgba(250,247,242,0.1) 100%)",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ backgroundColor: "#C4956A", opacity: 0.4 }} />

      {/* Constrained, overflow-safe content wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-16 pb-16 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-20">

          {/* Text block — mobile-constrained */}
          <div className="w-full md:max-w-[520px] md:flex-none">

            {/* Eyebrow */}
            <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p
                className="font-micro mb-6 flex items-center gap-2 flex-wrap"
                style={{ color: "#C4956A", fontSize: "0.68rem" }}
              >
                <span className="inline-block w-6 h-px flex-none" style={{ backgroundColor: "#C4956A" }} />
                The Mama Launch Method — Early Access
              </p>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1
                className="font-display mb-5 break-words"
                style={{
                  color: "#2C2C2C",
                  fontSize: "clamp(1.75rem, 5vw, 4.2rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.18",
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Reimagining Home Childcare{" "}
                <em style={{ color: "#4D5E49" }}>for Modern Motherhood.</em>
              </h1>
            </div>

            {/* Subheadline */}
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p
                className="font-body mb-5"
                style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.7", maxWidth: "100%" }}
              >
                Launch your home childcare program with guided systems, intentional structure, and a supportive community built around real family life.
              </p>
            </div>

            {/* Tag line */}
            <div className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p
                className="font-micro mb-8"
                style={{ color: "#C4956A", fontSize: "0.66rem", letterSpacing: "0.1em" }}
              >
                Launch System · Templates · Community · Guided Implementation
              </p>
            </div>

            {/* CTAs — stacked on mobile, row on sm+ */}
            <div
              className={`transition-all duration-700 delay-500 flex flex-col sm:flex-row flex-wrap gap-3 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={scrollToIntake}
                className="font-micro text-white px-7 py-4 rounded-full transition-all duration-200 min-h-[52px] focus-sage w-full sm:w-auto text-center"
                style={{
                  backgroundColor: "#4D5E49",
                  fontSize: "0.78rem",
                  boxShadow: "0 4px 20px rgba(77,94,73,0.22)",
                }}
              >
                Join the Founding Member Waitlist
              </button>
              <button
                onClick={scrollToMethod}
                className="font-micro px-7 py-4 rounded-full border transition-all duration-200 min-h-[52px] focus-sage w-full sm:w-auto text-center"
                style={{
                  color: "#4D5E49",
                  borderColor: "#4D5E4928",
                  fontSize: "0.78rem",
                  backgroundColor: "rgba(77,94,73,0.03)",
                }}
              >
                Explore the Method
              </button>
            </div>
          </div>

          {/* Hero image — stacks below on mobile, right column on desktop */}
          <HeroImage imageData={heroImageData} visible={visible} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}