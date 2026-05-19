import React, { useRef, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

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
  const [primaryImage, setPrimaryImage] = useState(null);
  const [stripImages, setStripImages] = useState([]);
  const [mobileHeroImage, setMobileHeroImage] = useState(null);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setImgVisible(true);}, { threshold: 0.06 });
    if (ref.current) o1.observe(ref.current);
    if (imgRef.current) o2.observe(imgRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  useEffect(() => {
    // Load primary image (reuse method_image_02 as the editorial left-column image)
    base44.entities.SiteContent.filter({ key: "method_image_02" }).then((r) => {
      if (r?.length > 0) setPrimaryImage(r[0]);
    });
    // Load all three strip images
    Promise.all([
    base44.entities.SiteContent.filter({ key: "method_image_01" }),
    base44.entities.SiteContent.filter({ key: "method_image_02" }),
    base44.entities.SiteContent.filter({ key: "method_image_03" })]
    ).then(([r1, r2, r3]) => {
      const imgs = [r1, r2, r3].map((r) => r?.[0]).filter(Boolean);
      setStripImages(imgs);
    });
    // Load mobile hero image
    base44.entities.SiteContent.filter({ key: "method_mobile_hero_image" }).then((r) => {
      if (r?.length > 0) setMobileHeroImage(r[0]);
    });
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden", maxWidth: "100vw", width: "100%", position: "relative" }}>
      {/* Main two-column editorial block */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-20" style={{ overflow: "hidden" }}>
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-end"
          style={{
            transition: "opacity 0.6s ease",
            opacity: visible ? 1 : 0,
          }}>
          
          {/* Left — editorial imagery + differentiators (hidden on mobile) */}
          <div className="hidden md:flex flex-col gap-5">
            {/* Level 1 — editorial backing */}
            <div className="relative" style={{ aspectRatio: "4/3" }}>
              <div
                className="absolute rounded-[24px]"
                style={{
                  inset: 0,
                  transform: "translate(10px, 10px)",
                  backgroundColor: "#E8D5C0",
                  opacity: 0.4,
                  zIndex: 0
                }} />
              
              {/* Level 2 — image surface */}
              <div
                className="relative w-full h-full rounded-[24px] overflow-hidden"
                style={{ boxShadow: "0 8px 36px rgba(196,149,106,0.1)", zIndex: 1 }}>
                
                {primaryImage?.image_url ?
                <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bcd7fe44c_Untitled_design__1_.jpg"

                alt={primaryImage.alt_text || ""}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: primaryImage.focal_position || "center 40%",
                  filter: "saturate(0.75) brightness(0.96)"
                }} /> :
                <div className="w-full h-full" style={{ backgroundColor: "#E8D5C0" }} />
                }
              </div>
            </div>

            











            
          </div>

          {/* Right — text content */}
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Understanding the Platform
            </p>
            <h2
              className="font-display leading-tight mb-6"
              style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 3.5vw, 3rem)", lineHeight: "1.2" }}>
              
              What is the<br />
              <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
            </h2>
            {/* Desktop summary paragraph */}
            <p className="hidden md:block font-body leading-relaxed mb-3" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.6", maxWidth: "38rem" }}>
              Mama Launch is a guided implementation system helping mothers launch intentional home childcare programs — with step-by-step phases, templates, and community support.
            </p>

            {/* Mobile summary — concise */}
            <p className="md:hidden font-body leading-relaxed mb-4" style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.6" }}>
              A guided opening path that helps you move from idea to real program with less guesswork.
            </p>

            {/* Mobile-only horizontal swipe proof cards */}
            <div className="md:hidden -mx-5 mb-5 overflow-hidden">
              <div
                className="flex gap-3 overflow-x-auto px-5 pb-3"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitScrollSnapType: "x mandatory",
                  overscrollBehaviorX: "contain",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {[
                  { title: "Guided Roadmap", body: "Know what to do first, next, and later.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/81da247da_Screenshot2026-05-18at95622PM.png" },
                  { title: "Built-In Clarity", body: "Your templates, steps, and decisions live in one place.", image: "" },
                  { title: "Launch Momentum", body: "Track progress so your idea becomes a real program.", image: "" },
                ].map((card) => (
                  <div key={card.title}
                    className="flex-none w-[72vw] max-w-[260px] rounded-xl overflow-hidden"
                    style={{ scrollSnapAlign: "start", backgroundColor: "rgba(77,94,73,0.06)", border: "1px solid rgba(77,94,73,0.10)" }}>
                    {card.image ? (
                      <img src={card.image} alt={card.title} className="w-full h-[140px] object-cover" />
                    ) : (
                      <div className="w-full h-[140px] flex items-center justify-center" style={{ backgroundColor: "rgba(77,94,73,0.08)", borderBottom: "1px dashed rgba(77,94,73,0.18)" }}>
                        <span className="font-micro text-center" style={{ color: "#9a8f84", fontSize: "0.6rem" }}>Add image URL</span>
                      </div>
                    )}
                    <div className="px-4 py-3">
                      <p className="font-display text-sm font-semibold mb-1" style={{ color: "#2C2C2C" }}>{card.title}</p>
                      <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>{card.body}</p>
                    </div>
                  </div>
                ))}
                <div className="flex-none w-1" />
              </div>
            </div>

            <p className="hidden md:block font-body leading-relaxed mb-8" style={{ color: "#5C5148", fontSize: "0.93rem", maxWidth: "38rem" }}>
              This is not a traditional business course or generic childcare training. Mama Launch helps mothers build calm, sustainable childcare ecosystems rooted in structure, emotional safety, and real family life.
            </p>

            <p className="font-micro mb-3" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>What's inside the method</p>

            {/* Desktop: single-column list */}
            <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-1 mb-5">
              {included.map((item) =>
              <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                  <span className="font-body text-sm leading-snug" style={{ color: "#5C5148" }}>{item}</span>
                </div>
              )}
            </div>

            {/* Mobile: compact 2-column grid */}
            <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-2 mb-4 w-full max-w-full overflow-hidden">
              {[
                "Implementation phases",
                "Licensing guidance",
                "Home setup planning",
                "Operational templates",
                "Parent communication",
                "Cohort support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-1.5 overflow-hidden">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                  <span className="font-body text-xs leading-snug" style={{ color: "#5C5148" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Mobile: founding member support line */}
            <p className="md:hidden font-body text-xs mb-5" style={{ color: "#7A6E65", lineHeight: "1.5" }}>
              Founding members unlock the complete 5-phase path first.
            </p>

            <button
              onClick={() => document.getElementById("method-roadmap")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro px-7 py-3.5 rounded-full border transition-all min-h-[48px]"
              style={{ color: "#fff", borderColor: "#4D5E49", fontSize: "0.78rem", backgroundColor: "#4D5E49", boxShadow: "0 4px 20px rgba(77,94,73,0.18)" }}>
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
          transition: "opacity 0.6s ease",
          opacity: imgVisible ? 1 : 0,
        }}>
        
        {/* Desktop: fixed height strip */}
        <div className="hidden md:block" style={{ height: "320px" }}>
          {stripImages.length > 0 &&
          <div className="grid grid-cols-2 h-full gap-0">
              {[stripImages[0], stripImages[2]].filter(Boolean).map((img, i) =>
            <img
              key={i}
              src={img.image_url}
              alt={img.alt_text || ""}
              className="w-full h-full object-cover"
              style={{
                objectPosition: img.focal_position || "center",
                filter: "saturate(0.7) brightness(0.95)"
              }} />

            )}
            </div>
          }
        </div>

        {/* Mobile: single centered editorial image */}
        {mobileHeroImage &&
        <div className="block md:hidden px-5 py-6">
            <div
            className="rounded-2xl overflow-hidden mx-auto"
            style={{
              maxWidth: "420px",
              aspectRatio: "4/3",
              boxShadow: "0 12px 48px rgba(196,149,106,0.16)",
              border: "1px solid #C4956A18"
            }}>
              <img
              src={mobileHeroImage.image_url}
              alt={mobileHeroImage.alt_text || ""}
              className="w-full h-full object-cover"
              style={{
                objectPosition: mobileHeroImage.focal_position || "35% 40%",
                filter: "saturate(0.72) brightness(0.95)"
              }} />
            
            </div>
          </div>
        }
      </div>
    </section>);

}