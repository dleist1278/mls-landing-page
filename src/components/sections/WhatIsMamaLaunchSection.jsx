import React, { useRef, useEffect, useState } from "react";

// Mobile-only swipe cards — unchanged
const cards = [
  { title: "Guided Interactive Roadmap", body: "Move through 5 structured phases with prompts, decisions, and tasks at every step — so you always know what to do.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png", accent: "#4D5E49" },
  { title: "Built-In Clarity", body: "Every template, checklist, and policy document you need — organized by phase and ready to fill in as you go.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png", accent: "#C4956A" },
  { title: "Launch Momentum", body: "See your progress in real time as you complete each phase and move closer to opening your program.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png", accent: "#4D5E49" }
];

// ── LOCKED PHASE DATA ─────────────────────────────────────────────────────────
const phases = [
  {
    number: "01",
    name: "Vision, Lifestyle & Program Alignment",
    outcome: "Choose the childcare model that fits your family, goals, income needs, and real-life schedule.",
    whyItMatters: "This phase helps you stop spinning and start building the right path with confidence.",
    includes: ["Lifestyle alignment prompts", "Program model decision guide", "Income + schedule clarity"],
    color: "#4D5E49",
    accentBg: "rgba(77,94,73,0.07)",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png",
  },
  {
    number: "02",
    name: "Licensing, Home Setup & Safety",
    outcome: "Understand what needs to be prepared legally, safely, and practically before opening.",
    whyItMatters: "This phase helps you move from uncertainty to clear next steps.",
    includes: ["Licensing guidance", "Home setup checklist", "Safety + inspection prep"],
    color: "#7A6E65",
    accentBg: "rgba(122,110,101,0.07)",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png",
  },
  {
    number: "03",
    name: "Program Design, Policies & Operations",
    outcome: "Build the policies, routines, and communication systems that help families trust your care.",
    whyItMatters: "This phase helps you create a calm, structured business that feels professional and sustainable.",
    includes: ["Parent handbook", "Operational templates", "Family communication systems"],
    color: "#C4956A",
    accentBg: "rgba(196,149,106,0.07)",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png",
  },
  {
    number: "04",
    name: "Enrollment, Marketing & Family Trust",
    outcome: "Attract aligned families and guide them from interest to confident enrollment.",
    whyItMatters: "This phase helps you turn your vision into a program families feel excited to join.",
    includes: ["Enrollment tools", "Marketing prompts", "Parent inquiry systems"],
    color: "#4D5E49",
    accentBg: "rgba(77,94,73,0.07)",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png",
  },
  {
    number: "05",
    name: "Launch Readiness & Opening",
    outcome: "Feel prepared, supported, and organized as you move into opening week.",
    whyItMatters: "This phase helps you launch with more confidence, calm, and clarity.",
    includes: ["Opening week checklist", "Family welcome tools", "First-week preparation"],
    color: "#6B7E67",
    accentBg: "rgba(107,126,103,0.07)",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png",
  }
];

// ── Blueprint accent — subtle ruled-line workbook texture rendered in SVG ─────
function BlueprintAccent({ color }) {
  return (
    <svg width="180" height="100%" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-[0.18]" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <line key={i} x1="0" y1={18 + i * 18} x2="180" y2={18 + i * 18} stroke={color} strokeWidth="0.8" />
      ))}
      <line x1="28" y1="0" x2="28" y2="220" stroke={color} strokeWidth="1.2" />
      <circle cx="28" cy="36" r="3" fill={color} opacity="0.5" />
      <circle cx="28" cy="72" r="3" fill={color} opacity="0.5" />
      <circle cx="28" cy="108" r="3" fill={color} opacity="0.5" />
      <rect x="40" y="30" width="100" height="6" rx="2" fill={color} opacity="0.25" />
      <rect x="40" y="66" width="76" height="6" rx="2" fill={color} opacity="0.18" />
      <rect x="40" y="102" width="88" height="6" rx="2" fill={color} opacity="0.2" />
      <rect x="40" y="138" width="60" height="6" rx="2" fill={color} opacity="0.14" />
    </svg>
  );
}

export default function WhatIsMamaLaunchSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToWaitlist = () => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden", maxWidth: "100vw", width: "100%", position: "relative", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={ref}
        className="hidden md:block"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)"
        }}
      >

        {/* ── Intro ── */}
        <div className="text-center mx-auto px-8 pt-16 pb-10" style={{ maxWidth: "700px" }}>
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.16em" }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "#C4956A" }} />
            THE MAMA LAUNCH METHOD™
            <span style={{ display: "inline-block", width: "28px", height: "1px", backgroundColor: "#C4956A" }} />
          </p>

          <h2 className="font-display leading-tight mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 3vw, 2.65rem)", lineHeight: "1.15" }}>
            The guided path from idea to a fully launched home childcare business.
          </h2>

          <p className="font-body leading-relaxed mb-3 mx-auto" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.75" }}>
            This is the heart of Mama Launch Studio — a step-by-step method designed to help mothers move from uncertainty and overwhelm to clarity, confidence, and launch readiness.
          </p>

          <p className="font-body leading-relaxed mb-7 mx-auto" style={{ color: "#7A6E65", fontSize: "0.88rem", lineHeight: "1.75", fontStyle: "italic" }}>
            Instead of piecing everything together alone, you'll follow a clear path that walks you through what to do, when to do it, and how to do it well.
          </p>

          <div className="flex items-center justify-center gap-5">
            <button
              onClick={scrollToWaitlist}
              className="font-micro transition-all"
              style={{
                color: "#fff",
                fontSize: "0.7rem",
                letterSpacing: "0.09em",
                backgroundColor: "#4D5E49",
                border: "none",
                borderRadius: "999px",
                padding: "13px 28px",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(77,94,73,0.26)"
              }}
            >
              Join the Founding Member Waitlist
            </button>
            <button
              onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro transition-all"
              style={{
                color: "#4D5E49",
                fontSize: "0.7rem",
                letterSpacing: "0.09em",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px"
              }}
            >
              Explore the Method ↓
            </button>
          </div>
        </div>

        {/* ── Phase cards stack ── */}
        <div className="mx-auto px-6 pb-6" style={{ maxWidth: "1100px" }}>
          <div className="flex flex-col" style={{ gap: "10px" }}>
            {phases.map((phase, i) => (
              <div key={phase.number} className="relative">

                {/* Subtle connector dot between cards */}
                {i < phases.length - 1 && (
                  <div
                    className="absolute left-1/2 -bottom-[5px] z-10"
                    style={{
                      transform: "translateX(-50%)",
                      width: "1px",
                      height: "10px",
                      background: `linear-gradient(180deg, ${phase.color}55, ${phases[i+1].color}33)`
                    }}
                  />
                )}

                {/* Card */}
                <div
                  className="flex overflow-hidden"
                  style={{
                    borderRadius: "14px",
                    backgroundColor: "#FFFDF9",
                    border: `1px solid ${phase.color}1E`,
                    boxShadow: "0 2px 16px rgba(44,44,44,0.07), 0 1px 3px rgba(196,149,106,0.06)"
                  }}
                >
                  {/* Left accent strip */}
                  <div style={{ width: "4px", flexShrink: 0, background: `linear-gradient(180deg, ${phase.color}, ${phase.color}66)`, borderRadius: "14px 0 0 14px" }} />

                  {/* Text content */}
                  <div className="flex-1 px-7 py-6 min-w-0">
                    {/* Phase number + name row */}
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className="font-micro flex-shrink-0"
                        style={{
                          color: "#fff",
                          backgroundColor: phase.color,
                          fontSize: "0.58rem",
                          letterSpacing: "0.12em",
                          padding: "3px 8px",
                          borderRadius: "999px"
                        }}
                      >
                        PHASE {phase.number}
                      </span>
                      <h3 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "1.1rem", lineHeight: "1.2" }}>
                        {phase.name}
                      </h3>
                    </div>

                    {/* Outcome */}
                    <p className="font-body mb-2" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>
                      {phase.outcome}
                    </p>

                    {/* Why it matters */}
                    <p className="font-body mb-4" style={{ color: "#9a8f84", fontSize: "0.82rem", lineHeight: "1.6", fontStyle: "italic" }}>
                      {phase.whyItMatters}
                    </p>

                    {/* Deliverables */}
                    <div className="flex flex-wrap gap-2">
                      {phase.includes.map((item) => (
                        <span
                          key={item}
                          className="font-body flex items-center gap-1.5"
                          style={{
                            fontSize: "0.75rem",
                            color: "#5C5148",
                            backgroundColor: phase.accentBg,
                            border: `1px solid ${phase.color}22`,
                            borderRadius: "6px",
                            padding: "4px 10px",
                            lineHeight: 1
                          }}
                        >
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: phase.color, display: "inline-block", flexShrink: 0 }} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Blueprint visual panel */}
                  <div
                    className="flex-shrink-0 relative overflow-hidden"
                    style={{
                      width: "160px",
                      backgroundColor: phase.accentBg,
                      borderLeft: `1px solid ${phase.color}16`
                    }}
                  >
                    <BlueprintAccent color={phase.color} />
                    <img
                      src={phase.image}
                      alt={phase.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        filter: `saturate(0.6) brightness(0.92) sepia(0.1)`,
                        opacity: 0.55,
                        mixBlendMode: "multiply"
                      }}
                    />
                    {/* Phase number watermark */}
                    <div
                      className="absolute bottom-3 right-3 font-display"
                      style={{ color: phase.color, fontSize: "2.2rem", opacity: 0.18, lineHeight: 1, fontWeight: 700, userSelect: "none" }}
                    >
                      {phase.number}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing CTA ── */}
        <div className="text-center mx-auto px-8 pt-8 pb-16" style={{ maxWidth: "600px" }}>
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C4956A44, transparent)", marginBottom: "24px" }} />
          <h3 className="font-display mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.2rem, 2vw, 1.55rem)", lineHeight: "1.25" }}>
            A calm, guided path to opening with clarity and support.
          </h3>
          <p className="font-body mb-6" style={{ color: "#7A6E65", fontSize: "0.88rem", lineHeight: "1.7" }}>
            Founding members will be the first to move through the complete Mama Launch Method™ with step-by-step guidance, templates, and support designed for real motherhood.
          </p>
          <button
            onClick={scrollToWaitlist}
            className="font-micro transition-all"
            style={{
              color: "#fff",
              fontSize: "0.7rem",
              letterSpacing: "0.09em",
              backgroundColor: "#4D5E49",
              border: "none",
              borderRadius: "999px",
              padding: "13px 28px",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(77,94,73,0.26)"
            }}
          >
            Join the Founding Member Waitlist
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE LAYOUT — UNCHANGED
      ══════════════════════════════════════════════════════════════ */}
      <div className="md:hidden max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <div style={{ transition: "opacity 0.6s ease", opacity: visible ? 1 : 0 }}>

          <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            UNDERSTANDING THE PLATFORM
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>

          <h2
            className="font-display leading-tight mb-4 text-center"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2", maxWidth: "22ch", marginLeft: "auto", marginRight: "auto" }}
          >
            What is the <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
          </h2>

          <p className="font-body leading-relaxed mb-7 text-center mx-auto" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.65", maxWidth: "42ch" }}>
            A guided opening path that helps you move from idea to real program with less guesswork. Built from real childcare experience, not theory.
          </p>

          <div className="mb-5 overflow-hidden w-full">
            <style>{`
              @keyframes peekNudge {
                0%   { transform: translateX(0); }
                40%  { transform: translateX(-18px); }
                70%  { transform: translateX(-8px); }
                100% { transform: translateX(0); }
              }
            `}</style>
            <div
              className="flex gap-3 overflow-x-auto pb-3"
              style={{
                scrollSnapType: "x mandatory",
                overscrollBehaviorX: "contain",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                touchAction: "pan-x",
                paddingLeft: "calc(50% - 126px)",
                paddingRight: "calc(50% - 126px + 20px)",
                animation: "peekNudge 0.9s ease-out 1.4s 1"
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="flex-none rounded-2xl overflow-hidden"
                  style={{ width: "252px", scrollSnapAlign: "center", background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)", border: "1px solid #E4D5C0", boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)" }}
                >
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }} />
                  <div className="w-full overflow-hidden" style={{ height: "110px" }}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center", transform: "scale(1.18)", transformOrigin: "center", filter: "saturate(0.82) brightness(0.97)" }}
                    />
                  </div>
                  <div className="px-4 pt-2 pb-3 text-center">
                    <p className="font-display text-sm font-semibold mb-1" style={{ color: card.accent }}>{card.title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="font-body text-xs mt-3 text-center" style={{ color: "#7A6E65", lineHeight: "1.5" }}>
            Founding members unlock the complete 5-phase path first.
          </p>
        </div>
      </div>

    </section>
  );
}