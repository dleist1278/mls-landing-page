import React, { useRef, useEffect, useState } from "react";

const phases = [
{
  number: "01",
  name: "Vision, Lifestyle & Program Alignment",
  outcome: "Choose the childcare model that fits your family, goals, and real-life schedule.",
  detail: "Clarify your pathway, income goals, and the type of program you want to build.",
  includes: ["Lifestyle alignment prompts", "Program model decision guide", "Income + schedule clarity"],
  color: "#4D5E49",
},
{
  number: "02",
  name: "Licensing, Home Setup & Safety",
  outcome: "Understand what you need to prepare legally and safely before opening.",
  detail: "Work through licensing requirements, home preparation, and inspection readiness.",
  includes: ["Licensing guidance", "Home setup checklist", "Inspection prep"],
  color: "#6B7E67",
},
{
  number: "03",
  name: "Program Design, Policies & Operations",
  outcome: "Build a calm, professional childcare experience families can trust.",
  detail: "Create your routines, policies, and parent communication systems.",
  includes: ["Parent handbook", "Operational templates", "Communication systems"],
  color: "#C4956A",
},
{
  number: "04",
  name: "Enrollment, Marketing & Family Trust",
  outcome: "Attract the right families and help them feel confident choosing your program.",
  detail: "Build your messaging, enrollment materials, and inquiry process.",
  includes: ["Enrollment tools", "Marketing prompts", "Parent inquiry systems"],
  color: "#4D5E49",
},
{
  number: "05",
  name: "Launch Readiness & Opening",
  outcome: "Feel prepared and supported walking into opening week.",
  detail: "Finalize your systems, welcome families, and transition into your program.",
  includes: ["Opening week checklist", "Family welcome tools", "First-week preparation"],
  color: "#6B7E67",
}];

function MobilePhaseCard({ phase, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden focus:outline-none"
      style={{
        backgroundColor: isActive ? "#F0EBE1" : "#FDFCFA",
        border: `1px solid ${isActive ? phase.color + "35" : "#C4956A10"}`,
        boxShadow: isActive ? `0 4px 20px rgba(77,94,73,0.08)` : "none",
        opacity: isActive ? 1 : 0.45,
        padding: isActive ? "13px 14px" : "10px 14px",
        transition: "opacity 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}>

      {/* Header row — always visible */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-display" style={{ color: phase.color, fontSize: isActive ? "1.2rem" : "0.95rem", lineHeight: 1 }}>
            {phase.number}
          </span>
          <h3 className="font-display leading-snug" style={{ color: "#2C2C2C", fontSize: isActive ? "0.9rem" : "0.82rem" }}>
            {phase.name}
          </h3>
        </div>
        {/* Refinement 3: subtle sage accent line as active indicator */}
        {isActive && (
          <span className="flex-none w-1 h-5 rounded-full" style={{ backgroundColor: phase.color, opacity: 0.5 }} />
        )}
      </div>

      {/* Expanded detail — only when active */}
      {isActive && (
        <div className="mt-2.5 pt-2.5" style={{ borderTop: `1px solid ${phase.color}18` }}>
          {/* Refinement 1: reduced label spacing */}
          <p className="font-body leading-snug mb-2" style={{ color: "#5C5148", fontSize: "0.78rem", maxWidth: "88%" }}>
            {phase.outcome}
          </p>
          <p className="font-micro mb-1" style={{ color: "#9a8f84", fontSize: "0.58rem" }}>What you'll do</p>
          {/* Refinement 5: slightly narrower text, smaller size */}
          <p className="font-body leading-snug mb-2.5" style={{ color: "#7A6E65", fontSize: "0.75rem", maxWidth: "86%" }}>
            {phase.detail}
          </p>
          <p className="font-micro mb-1.5" style={{ color: "#9a8f84", fontSize: "0.58rem" }}>Includes</p>
          {/* Refinement 1: tighter chip spacing */}
          <ul className="flex flex-col gap-0.5">
            {phase.includes.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="flex-none w-1 h-1 rounded-full" style={{ backgroundColor: phase.color, opacity: 0.7 }} />
                <span className="font-body leading-snug" style={{ color: "#5C5148", fontSize: "0.75rem" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}

export default function MethodSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activePhase, setActivePhase] = useState("01");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setHeaderVisible(true);},
      { threshold: 0.08 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="method" className="py-10 md:py-14 overflow-hidden" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px", maxWidth: "100vw" }}>
      <div className="w-full h-px mb-8" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div
        ref={headerRef}
        className="max-w-6xl mx-auto px-5 md:px-12 mb-5"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(16px)",
        }}>

        {/* Desktop header — unchanged */}
        <div className="hidden md:flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-micro mb-3 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Implementation Roadmap
            </p>
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 4vw, 3.4rem)", lineHeight: "1.2" }}>
              The Mama Launch Method
              <br />
              <em style={{ color: "#4D5E49" }}>Five Phases. Real Deliverables.</em>
            </h2>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden text-center">
          <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.16em" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            THE OPENING PATH
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 6.5vw, 3.4rem)", lineHeight: "1.2" }}>
            The 5 Phases<br />
            <em style={{ color: "#4D5E49" }}>That Guide You</em>
          </h2>
          <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "36ch" }}>
            Move through each phase with guided prompts, practical tools, and clear next steps designed for real motherhood life.
          </p>
        </div>
      </div>

      {/* Mobile: vertical active-step progression */}
      <div
        id="method-roadmap"
        className="md:hidden px-5 max-w-full overflow-hidden"
        style={{ display: "flex", flexDirection: "column", gap: "6px", paddingTop: "12px" }}>
        {phases.map((phase) => (
          <MobilePhaseCard
            key={phase.number}
            phase={phase}
            isActive={activePhase === phase.number}
            onClick={() => setActivePhase(phase.number)}
          />
        ))}
      </div>

      {/* Desktop: original horizontal scroll — unchanged */}
      <div
        className="hidden md:flex gap-3 overflow-x-auto pb-4 px-5 md:px-12 max-w-6xl mx-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "20px",
          alignItems: "flex-start",
        }}>
        {phases.map((phase, i) => (
          <div
            key={phase.number}
            className="flex-none"
            style={{ width: "52vw", maxWidth: "200px", scrollSnapAlign: "start" }}>
            <div
              className="w-full text-left rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#F0EBE1",
                border: `1px solid ${phase.color}28`,
                padding: "16px",
              }}>
              <div className="font-display mb-3" style={{ color: phase.color, fontSize: "2rem", lineHeight: 1 }}>
                {phase.number}
              </div>
              <h3 className="font-display text-sm leading-snug mb-1" style={{ color: "#2C2C2C" }}>
                {phase.name}
              </h3>
              <p className="font-body text-xs leading-snug mt-2" style={{ color: "#7A6E65" }}>
                {phase.outcome}
              </p>
            </div>
          </div>
        ))}
        <div className="flex-none w-2 md:w-8" />
      </div>

      <div className="w-full h-px mt-10" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>);
}