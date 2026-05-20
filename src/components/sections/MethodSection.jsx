import React, { useRef, useEffect, useState } from "react";

const phases = [
{
  number: "01",
  name: "Vision, Lifestyle & Program Alignment",
  outcome: "Choose the childcare model that fits your family, goals, and real-life schedule.",
  detail: "Clarify your pathway, income goals, and the type of program you want to build.",
  includes: ["Lifestyle alignment prompts", "Program model decision guide", "Income + schedule clarity"],
  color: "#4D5E49"
},
{
  number: "02",
  name: "Licensing, Home Setup & Safety",
  outcome: "Understand what you need to prepare legally and safely before opening.",
  detail: "Work through licensing requirements, home preparation, and inspection readiness.",
  includes: ["Licensing guidance", "Home setup checklist", "Inspection prep"],
  color: "#6B7E67"
},
{
  number: "03",
  name: "Program Design, Policies & Operations",
  outcome: "Build a calm, professional childcare experience families can trust.",
  detail: "Create your routines, policies, and parent communication systems.",
  includes: ["Parent handbook", "Operational templates", "Communication systems"],
  color: "#C4956A"
},
{
  number: "04",
  name: "Enrollment, Marketing & Family Trust",
  outcome: "Attract the right families and help them feel confident choosing your program.",
  detail: "Build your messaging, enrollment materials, and inquiry process.",
  includes: ["Enrollment tools", "Marketing prompts", "Parent inquiry systems"],
  color: "#4D5E49"
},
{
  number: "05",
  name: "Launch Readiness & Opening",
  outcome: "Feel prepared and supported walking into opening week.",
  detail: "Finalize your systems, welcome families, and transition into your program.",
  includes: ["Opening week checklist", "Family welcome tools", "First-week preparation"],
  color: "#6B7E67"
}];

function MobilePhaseCard({ phase, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left overflow-hidden focus:outline-none relative"
      style={{
        borderRadius: "14px",
        backgroundColor: isActive ? "#FFFDF9" : "#EDE5D8",
        border: `1px solid ${isActive ? phase.color + "28" : "#C4956A14"}`,
        boxShadow: isActive ?
        `0 8px 32px rgba(77,94,73,0.18), 0 3px 10px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)` :
        "0 2px 6px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        opacity: isActive ? 1 : 0.55,
        transition: "opacity 0.2s ease, box-shadow 0.22s ease, background-color 0.2s ease",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)"
      }}>

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: "3px",
          borderRadius: "18px 0 0 18px",
          background: isActive ?
          `linear-gradient(180deg, ${phase.color}, ${phase.color}88)` :
          "transparent",
          transition: "background 0.2s ease"
        }} />

      <div style={{ padding: isActive ? "14px 14px 14px 17px" : "11px 14px 11px 17px" }}>

        {/* Header row — always visible */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Phase number badge */}
            <div
              className="flex-none flex items-center justify-center rounded-lg"
              style={{
                width: isActive ? "30px" : "24px",
                height: isActive ? "30px" : "24px",
                backgroundColor: isActive ? phase.color + "18" : "transparent",
                border: isActive ? `1px solid ${phase.color}30` : "none",
                transition: "all 0.2s ease"
              }}>
              <span className="font-display" style={{ color: phase.color, fontSize: isActive ? "0.85rem" : "0.8rem", lineHeight: 1, fontWeight: 600 }}>
                {phase.number}
              </span>
            </div>
            <h3 className="font-display leading-snug" style={{ color: "#2C2C2C", fontSize: isActive ? "0.9rem" : "0.82rem" }}>
              {phase.name}
            </h3>
          </div>
          {isActive ?
          <div
            className="flex-none rounded-full"
            style={{ width: "20px", height: "20px", backgroundColor: phase.color + "15", border: `1px solid ${phase.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: phase.color, fontSize: "0.6rem", lineHeight: 1 }}>▾</span>
            </div> :

          <div
            className="flex-none rounded-full"
            style={{
              width: "18px", height: "18px",
              backgroundColor: "#C4956A10",
              border: "1px solid #C4956A28",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "chevronBounce 2s ease-in-out infinite"
            }}>
              <span style={{ color: "#C4956A", fontSize: "0.55rem", lineHeight: 1 }}>▾</span>
            </div>
          }
        </div>

        {/* Expanded detail — only when active */}
        {isActive &&
        <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${phase.color}18` }}>
            <p className="font-micro mb-1" style={{ color: "#9a8f84", fontSize: "0.58rem" }}>What you'll do</p>
            <p className="font-body leading-snug mb-3" style={{ color: "#7A6E65", fontSize: "0.75rem", maxWidth: "86%" }}>
              {phase.detail}
            </p>
            <p className="font-micro mb-2" style={{ color: "#9a8f84", fontSize: "0.58rem" }}>Includes</p>
            <ul className="flex flex-col gap-1">
              {phase.includes.map((item) =>
            <li key={item} className="flex items-center gap-2">
                  <span
                className="flex-none rounded-sm"
                style={{ width: "14px", height: "14px", backgroundColor: phase.color + "14", border: `1px solid ${phase.color}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: phase.color, display: "block" }} />
                  </span>
                  <span className="font-body leading-snug" style={{ color: "#5C5148", fontSize: "0.75rem" }}>{item}</span>
                </li>
            )}
            </ul>
          </div>
        }
      </div>
    </button>);
}

const phaseCardStyles = `
  @keyframes chevronBounce {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(3px); opacity: 1; }
  }
  @keyframes phaseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(196,149,106,0); }
    50% { box-shadow: 0 0 0 4px rgba(196,149,106,0.12); }
  }
`;

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
    <section id="method" className="pt-12 pb-10 md:py-14 overflow-hidden" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px", maxWidth: "100vw", width: "100%" }}>


      <div
        ref={headerRef}
        className="max-w-6xl mx-auto px-5 md:px-12 mb-5"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(16px)"
        }}>

        {/* Desktop header — unchanged */}
        <div className="hidden md:flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="font-micro mb-3 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Implementation Roadmap
            </p>
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2" }}>
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
          <p className="font-body leading-relaxed mx-auto text-center" style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "36ch" }}>
            Move through each phase with guided prompts, practical tools, and clear next steps designed for real motherhood life.
          </p>
          <p className="font-micro mt-3 text-center hidden" style={{ color: "#9a8f84", fontSize: "0.62rem", letterSpacing: "0.08em" }}>
            Guided implementation — not an overwhelming course.
          </p>
        </div>
      </div>

      {/* Mobile: vertical active-step progression */}
      <style>{phaseCardStyles}</style>
      <div
        id="method-roadmap"
        className="md:hidden px-4 max-w-full overflow-hidden"
        style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "12px" }}>
        {phases.map((phase) =>
        <MobilePhaseCard
          key={phase.number}
          phase={phase}
          isActive={activePhase === phase.number}
          onClick={() => setActivePhase(phase.number)} />

        )}
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
          alignItems: "flex-start"
        }}>
        {phases.map((phase, i) =>
        <div
          key={phase.number}
          className="flex-none"
          style={{ width: "52vw", maxWidth: "200px", scrollSnapAlign: "start" }}>
            <div
            className="w-full text-left rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#F0EBE1",
              border: `1px solid ${phase.color}28`,
              padding: "16px"
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
        )}
        <div className="flex-none w-2 md:w-8" />
      </div>

      
    </section>);
}