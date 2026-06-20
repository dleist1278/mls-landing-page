import React, { useEffect, useState } from "react";
import HeroImage from "@/components/sections/HeroImage";
import { trackCTAClick } from "@/lib/analytics";

const HERO_DESKTOP_SRC = "/hero-desktop.jpg";
const APP_URL = "https://mama-launch-studio.vercel.app";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToIntake = () => {
    trackCTAClick("Get App Updates", "hero");
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "0px" }}>

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
            background: "linear-gradient(100deg, #FAF7F2 55%, rgba(250,247,242,0.85) 70%, rgba(250,247,242,0.1) 100%)"
          }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ backgroundColor: "#C4956A", opacity: 0.4 }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pt-10 md:pt-40 pb-12 md:pb-28 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-center gap-14 md:gap-16 lg:gap-20">

          <div className="w-full md:max-w-[520px] md:flex-none">

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

            <div className="md:hidden relative mb-5 mx-4">
              <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(10px, 10px)", backgroundColor: "#C4956A", opacity: 0.18, zIndex: 0 }} />
              <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(5px, 5px)", backgroundColor: "#4D5E49", opacity: 0.12, zIndex: 1 }} />
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)", zIndex: 2 }}>
                <img src={HERO_DESKTOP_SRC} alt="Mama Launch" className="w-full object-cover" style={{ maxHeight: "260px", objectPosition: "center 20%" }} />
              </div>
            </div>

            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p
                className="font-body mb-6 md:text-left text-center"
                style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.72", maxWidth: "38ch", marginBottom: "1.75rem" }}>
                Build a <strong style={{ color: "#2C2C2C", fontWeight: 500 }}>flexible childcare business</strong><br />around your life, your family, and your goals.
              </p>
            </div>

            <div className="mb-6" />

            <div className={`transition-all duration-700 delay-500 flex flex-col sm:flex-row flex-wrap gap-3 mt-4 md:justify-start justify-center ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

              <a
                href={`${APP_URL}/quiz/start`}
                className="font-micro text-white px-8 py-4 rounded-full min-h-[52px] focus-sage w-full sm:w-auto text-center relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", border: "none" }}
                onClick={() => trackCTAClick("Take the Free Quiz", "hero")}
              >
                Take the Free Quiz →
              </a>

              <button
                onClick={scrollToIntake}
                className="font-micro px-8 py-4 rounded-full min-h-[52px] focus-sage w-full sm:w-auto text-center"
                style={{ backgroundColor: "transparent", color: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", border: "1.5px solid #4D5E49", cursor: "pointer" }}
              >
                Get App Updates
              </button>

            </div>
          </div>

          <HeroImage src={HERO_DESKTOP_SRC} visible={visible} />

        </div>
      </div>
    </section>
  );
}
