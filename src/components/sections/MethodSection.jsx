import React, { useRef, useEffect, useState } from "react";

// 5 phases only — Phase 06 (Growth/Expansion) removed per brand direction
const phases = [
{
  number: "01",
  name: "Program Foundation",
  tagline: "Your why, your vision, your path.",
  emotional: "Feel clear on who you are as a provider and what you're building.",
  deliverables: ["Program Vision Blueprint", "Ideal Program Summary", "Parent Experience Statement", "Brand Foundation Summary", "Lifestyle Alignment Summary"],
  color: "#4D5E49",
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
  imageAlt: "Phase 01 — Program Foundation",
  imagePosition: "center 30%"
},
{
  number: "02",
  name: "Licensing & Legal Setup",
  tagline: "Build on a strong and compliant foundation.",
  emotional: "Feel grounded and prepared — not overwhelmed by paperwork.",
  deliverables: ["Licensing & Compliance Tracker", "Document Checklist", "Policy & Procedure Outline", "Business Setup Summary", "Insurance & Safety Plan"],
  color: "#6B7E67",
  image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  imageAlt: "Phase 02 — Licensing & Legal Setup",
  imagePosition: "center 20%"
},
{
  number: "03",
  name: "Environment & Space Plan",
  tagline: "Design a space that inspires learning.",
  emotional: "Feel like a real provider building something beautiful and safe.",
  deliverables: ["Room Layouts & Floor Plans", "Environment & Material List", "Safety & Setup Checklist", "Outdoor Space Plan", "Aesthetic Vision Board"],
  color: "#C4956A",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  imageAlt: "Phase 03 — Environment & Space Plan",
  imagePosition: "center 35%"
},
{
  number: "04",
  name: "Daily Operations Plan",
  tagline: "Create calm, consistent, and meaningful days.",
  emotional: "Feel operationally confident — with systems that actually fit your life.",
  deliverables: ["Daily Schedule Template", "Curriculum Plan Outline", "Routine & Flow Guide", "Communication Plan", "Behavior Support Plan"],
  color: "#4D5E49",
  image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
  imageAlt: "Phase 04 — Daily Operations Plan",
  imagePosition: "center 20%"
},
{
  number: "05",
  name: "Branding & Enrollment Plan",
  tagline: "Attract the right families and grow with ease.",
  emotional: "Feel ready to open your doors and welcome your first families.",
  deliverables: ["Brand Identity Guide", "Website & Marketing Copy", "Enrollment Process Map", "Parent Communication Templates", "Launch Plan Checklist"],
  color: "#6B7E67",
  image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
  imageAlt: "Phase 05 — Branding & Enrollment Plan",
  imagePosition: "center 25%"
}];


function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex-none"
      style={{
        width: "300px",
        transition: `all 0.65s ease ${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        filter: visible ? "blur(0)" : "blur(2px)"
      }}>
      
      <div className="rounded-3xl flex flex-col h-full overflow-hidden" style={{ backgroundColor: "#F0EBE1", border: "1px solid #C4956A1A" }}>

        {/* Phase image */}
        <div style={{ height: "160px", overflow: "hidden", position: "relative", marginBottom: "-1px" }}>
          {phase.image ?
          <img
            src={phase.image}
            alt={phase.imageAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: phase.imagePosition, filter: "saturate(0.65) brightness(0.94)" }} /> :


          <div className="w-full h-full flex items-center justify-center hidden" style={{ backgroundColor: `${phase.color}12` }}>
              <span className="font-micro" style={{ color: phase.color, opacity: 0.4, fontSize: "0.65rem" }}>Your image here</span>
            </div>
          }
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${phase.color}40 100%)` }} className="hidden" />
          {/* Phase badge */}
          <div
            className="absolute top-4 left-4 font-micro"
            style={{ color: "white", fontSize: "0.6rem", backgroundColor: `${phase.color}CC`, padding: "3px 10px", borderRadius: "100px" }}>
            
            Phase {phase.number}
          </div>
        </div>

        {/* Phase header */}
        <div className="px-6 pt-3 pb-4" style={{ borderBottom: `1px solid ${phase.color}1A` }}>
          <h3 className="font-display text-lg mb-1" style={{ color: "#2C2C2C", lineHeight: "1.25" }}>
            {phase.name}
          </h3>
          <p className="font-body text-xs italic" style={{ color: "#7A6E65" }}>
            {phase.tagline}
          </p>
          <p className="font-body text-xs mt-2 leading-relaxed" style={{ color: "#5C5148", fontStyle: "italic" }}>
            "{phase.emotional}"
          </p>
        </div>

        {/* Deliverables */}
        <div className="px-6 py-5 flex-1">
          <p className="font-micro mb-3" style={{ color: "#9a8f84", fontSize: "0.62rem" }}>
            You'll walk away with
          </p>
          <ul className="flex flex-col gap-2">
            {phase.deliverables.map((d) =>
            <li key={d} className="flex items-start gap-2.5">
                <span className="flex-none mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${phase.color}14`, border: `1px solid ${phase.color}28` }}>
                  <span style={{ color: phase.color, fontSize: "0.5rem" }}>✓</span>
                </span>
                <span className="font-body text-xs leading-snug" style={{ color: "#3A3330" }}>{d}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>);

}

export default function MethodSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setHeaderVisible(true);},
      { threshold: 0.08 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="method" className="py-16 md:py-24 overflow-hidden" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-14" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-10"
        style={{
          transition: "all 0.8s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(24px)",
          filter: headerVisible ? "blur(0)" : "blur(2px)"
        }}>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-micro mb-3 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Implementation Roadmap
            </p>
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}>
              The Mama Launch Method
              <br />
              <em style={{ color: "#4D5E49" }}>Five Phases. Real Deliverables.</em>
            </h2>
          </div>
          <p className="font-body md:max-w-xs leading-relaxed" style={{ color: "#5C5148", fontSize: "0.93rem" }}>
            Each phase produces real operational documents — so by the end, you have a complete, launch-ready childcare program.
          </p>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto pb-5 px-6 md:px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        
        {phases.map((phase, i) =>
        <PhaseCard key={phase.number} phase={phase} index={i} />
        )}
        <div className="flex-none w-6 md:w-10" />
      </div>

      <div className="flex items-center justify-center gap-3 mt-3 px-6">
        <div className="w-8 h-px" style={{ backgroundColor: "#C4956A33" }} />
        <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.62rem" }}>
          Drag to explore all five phases
        </p>
        <div className="w-8 h-px" style={{ backgroundColor: "#C4956A33" }} />
      </div>

      <div className="w-full h-px mt-14" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>);

}