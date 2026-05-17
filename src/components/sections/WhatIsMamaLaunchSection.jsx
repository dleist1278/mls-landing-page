import React, { useRef, useEffect, useState } from "react";

const differentiators = [
{ label: "Not a course you watch and forget", contrast: "A structured launch framework you build through" },
{ label: "Not vague coaching with no deliverables", contrast: "Real operational documents at every phase" },
{ label: "Not generic childcare training", contrast: "A method built specifically for home-based programs" }];

const included = [
"Step-by-step implementation phases",
"State-specific licensing guidance",
"Room & environment planning",
"Operational templates & workbooks",
"Parent communication systems",
"Community cohort support"];

export default function WhatIsMamaLaunchSection() {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setImgVisible(true);}, { threshold: 0.06 });
    if (ref.current) o1.observe(ref.current);
    if (imgRef.current) o2.observe(imgRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden" }}>

      {/* Main two-column editorial block — image LEFT, text RIGHT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
          style={{
            transition: "all 0.8s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            filter: visible ? "blur(0)" : "blur(2px)"
          }}>

          {/* Left — editorial imagery stack */}
          <div className="flex flex-col gap-5">
            {/* Primary image */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/3", boxShadow: "0 12px 48px rgba(196,149,106,0.12)" }}>
              <img
                src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bcd7fe44c_Untitled_design__1_.jpg"
                alt="Mother reading with children in a calm home environment"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 40%", filter: "saturate(0.75) brightness(0.96)" }}
              />
            </div>

            {/* Differentiator block */}
            <div className="rounded-3xl p-6" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A18" }}>
              <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>
                How Mama Launch is different
              </p>
              <div className="flex flex-col gap-4">
                {differentiators.map((d) =>
                <div key={d.label} className="flex flex-col gap-1">
                    <span className="font-body text-xs line-through" style={{ color: "#B8ADA6" }}>{d.label}</span>
                    <span className="font-body text-sm" style={{ color: "#4D5E49" }}>✓ {d.contrast}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — text content */}
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Understanding the Platform
            </p>
            <h2 className="font-display leading-tight mb-5" style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              What is the{" "}
              <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
            </h2>
            <p className="font-body leading-relaxed mb-4" style={{ color: "#5C5148", fontSize: "1rem" }}>
              Mama Launch is a guided implementation system helping mothers launch intentional home childcare programs through step-by-step phases, operational systems, templates, and community support.
            </p>
            <p className="font-body leading-relaxed mb-8" style={{ color: "#5C5148", fontSize: "0.96rem" }}>
              This is not a traditional business course or generic childcare training. Mama Launch helps mothers build calm, sustainable childcare ecosystems rooted in structure, emotional safety, and real family life.
            </p>

            {/* What's included */}
            <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>What's inside the method</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {included.map((item) =>
              <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                  <span className="font-body text-sm leading-snug" style={{ color: "#5C5148" }}>{item}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro px-7 py-3.5 rounded-full border hover:opacity-80 transition-all min-h-[48px]"
              style={{ color: "#4D5E49", borderColor: "#4D5E49", fontSize: "0.78rem", backgroundColor: "transparent" }}>
              See the 5-Phase Method →
            </button>
          </div>
        </div>
      </div>

      {/* Full-width editorial image strip */}
      <div
        ref={imgRef}
        className="w-full overflow-hidden"
        style={{
          height: "320px",
          transition: "all 1s ease",
          opacity: imgVisible ? 1 : 0,
          transform: imgVisible ? "scale(1)" : "scale(1.02)"
        }}>
        <div className="grid grid-cols-3 h-full gap-0">
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/4df106e43_Untitled_design__1_.jpg"
            alt="Children exploring sensory play on the floor"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.7) brightness(0.95)" }}
          />
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/c862e10f1_Untitled_design__1_.jpg"
            alt="Calm organized shelving in a home childcare space"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.7) brightness(0.92)", objectPosition: "center 30%" }}
          />
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/8edc2d80e_Untitled_design__1__copy.jpg"
            alt="Child reading independently in a cozy reading corner"
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.7) brightness(0.93)" }}
          />
        </div>
      </div>
    </section>);
}