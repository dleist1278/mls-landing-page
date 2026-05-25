import React, { useRef, useEffect, useState } from "react";

const cards = [
  { title: "Guided Interactive Roadmap", body: "Move through 5 structured phases with prompts, decisions, and tasks at every step — so you always know what to do.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png", accent: "#4D5E49" },
  { title: "Built-In Clarity", body: "Every template, checklist, and policy document you need — organized by phase and ready to fill in as you go.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png", accent: "#C4956A" },
  { title: "Launch Momentum", body: "See your progress in real time as you complete each phase and move closer to opening your program.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png", accent: "#4D5E49" }
];

const phases = [
  {
    number: "01",
    name: "Vision, Lifestyle & Program Alignment",
    outcome: "Choose the childcare model that fits your family, goals, and real-life schedule.",
    detail: "Clarify your pathway, income goals, and the type of program you want to build.",
    includes: ["Lifestyle alignment prompts", "Program model decision guide", "Income + schedule clarity"],
    color: "#4D5E49",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png"
  },
  {
    number: "02",
    name: "Licensing, Home Setup & Safety",
    outcome: "Understand what you need to prepare legally and safely before opening.",
    detail: "Work through licensing requirements, home preparation, and inspection readiness.",
    includes: ["Licensing guidance", "Home setup checklist", "Inspection prep"],
    color: "#6B7E67",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png"
  },
  {
    number: "03",
    name: "Program Design, Policies & Operations",
    outcome: "Build a calm, professional childcare experience families can trust.",
    detail: "Create your routines, policies, and parent communication systems.",
    includes: ["Parent handbook", "Operational templates", "Communication systems"],
    color: "#C4956A",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png"
  },
  {
    number: "04",
    name: "Enrollment, Marketing & Family Trust",
    outcome: "Attract the right families and help them feel confident choosing your program.",
    detail: "Build your messaging, enrollment materials, and inquiry process.",
    includes: ["Enrollment tools", "Marketing prompts", "Parent inquiry systems"],
    color: "#4D5E49",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png"
  },
  {
    number: "05",
    name: "Launch Readiness & Opening",
    outcome: "Feel prepared and supported walking into opening week.",
    detail: "Finalize your systems, welcome families, and transition into your program.",
    includes: ["Opening week checklist", "Family welcome tools", "First-week preparation"],
    color: "#6B7E67",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png"
  }
];

export default function WhatIsMamaLaunchSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) o1.observe(ref.current);
    return () => o1.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden", maxWidth: "100vw", width: "100%", position: "relative", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* ── DESKTOP LAYOUT ─────────────────────────────────────────────── */}
      <div
        ref={ref}
        className="hidden md:flex max-w-6xl mx-auto px-8 lg:px-12 py-16 lg:py-20 gap-12 lg:gap-16 items-start"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)"
        }}
      >

        {/* ── LEFT: Sticky Intro Panel ── */}
        <div className="w-[38%] flex-shrink-0 sticky top-24 self-start">
          {/* Eyebrow */}
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.14em" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            UNDERSTANDING THE PLATFORM
          </p>

          {/* Headline */}
          <h2
            className="font-display leading-tight mb-4"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: "1.18" }}
          >
            What is the{" "}
            <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
          </h2>

          {/* Supporting copy */}
          <p className="font-body leading-relaxed mb-4" style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.7", maxWidth: "36ch" }}>
            A guided opening path that helps you move from idea to real program with less guesswork. Built from real childcare experience, not theory.
          </p>

          <p className="font-body leading-relaxed mb-6" style={{ color: "#7A6E65", fontSize: "0.85rem", lineHeight: "1.65", maxWidth: "34ch" }}>
            Five structured phases take you from clarity about your vision all the way through to opening day — with templates, prompts, and tools at every step.
          </p>

          {/* CTA */}
          <button
            onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro px-7 py-3.5 rounded-full transition-all mb-8"
            style={{ color: "#fff", fontSize: "0.72rem", backgroundColor: "#4D5E49", boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)", letterSpacing: "0.08em" }}
          >
            See the 5-Phase Method →
          </button>

          {/* Mockup image */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 16px 48px rgba(44,44,44,0.14), 0 4px 16px rgba(196,149,106,0.12)",
              border: "1px solid rgba(196,149,106,0.18)",
              position: "relative"
            }}
          >
            <div style={{ height: "3px", background: "linear-gradient(90deg, #4D5E49, #C4956A, #4D5E49)" }} />
            <img
              src={cards[0].image}
              alt="Mama Launch implementation workbook"
              className="w-full block"
              style={{ height: "220px", objectFit: "cover", objectPosition: "center", filter: "saturate(0.88) brightness(0.96)" }}
            />
            {/* Overlay caption */}
            <div className="px-4 py-3" style={{ backgroundColor: "#FFFDF9", borderTop: "1px solid #EDE3D8" }}>
              <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.12em" }}>MAMA LAUNCH METHOD™</p>
              <p className="font-body mt-0.5" style={{ color: "#7A6E65", fontSize: "0.75rem" }}>Implementation workbook + phase toolkit</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Connected Phase Roadmap ── */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[19px] top-[44px]"
              style={{
                width: "1px",
                bottom: "44px",
                background: "linear-gradient(180deg, #C4956A44 0%, #4D5E4944 50%, #C4956A44 100%)",
                zIndex: 0
              }}
            />

            <div className="flex flex-col gap-0">
              {phases.map((phase, i) => (
                <div key={phase.number} className="relative flex gap-5 items-start" style={{ paddingBottom: i < phases.length - 1 ? "28px" : "0" }}>

                  {/* Phase number node */}
                  <div
                    className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#F0EBE1",
                      border: `1.5px solid ${phase.color}`,
                      boxShadow: `0 2px 8px ${phase.color}22`,
                      marginTop: "4px"
                    }}
                  >
                    <span className="font-display" style={{ color: phase.color, fontSize: "0.8rem", fontWeight: 700, lineHeight: 1 }}>
                      {phase.number}
                    </span>
                  </div>

                  {/* Phase card */}
                  <div
                    className="flex-1 min-w-0 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: "#FFFDF9",
                      border: `1px solid ${phase.color}20`,
                      boxShadow: "0 3px 16px rgba(44,44,44,0.06), 0 1px 4px rgba(196,149,106,0.08)"
                    }}
                  >
                    {/* Top accent */}
                    <div style={{ height: "2px", background: `linear-gradient(90deg, ${phase.color}, ${phase.color}44)` }} />

                    <div className="flex gap-0">
                      {/* Text content */}
                      <div className="flex-1 p-5">
                        <h3 className="font-display leading-snug mb-2" style={{ color: "#2C2C2C", fontSize: "1.05rem" }}>
                          {phase.name}
                        </h3>
                        <p className="font-body mb-1" style={{ color: "#5C5148", fontSize: "0.85rem", lineHeight: "1.6" }}>
                          <span className="font-micro" style={{ color: phase.color, fontSize: "0.58rem", letterSpacing: "0.1em", display: "block", marginBottom: "2px" }}>WHAT YOU'LL ACHIEVE</span>
                          {phase.outcome}
                        </p>
                        <p className="font-body mb-3" style={{ color: "#7A6E65", fontSize: "0.82rem", lineHeight: "1.55" }}>
                          <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.1em", display: "block", marginBottom: "2px" }}>WHAT YOU'LL DO</span>
                          {phase.detail}
                        </p>

                        {/* Deliverables */}
                        <div className="pt-3" style={{ borderTop: `1px solid ${phase.color}14` }}>
                          <p className="font-micro mb-2" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.1em" }}>INCLUDES</p>
                          <ul className="flex flex-col gap-1.5">
                            {phase.includes.map((item) => (
                              <li key={item} className="flex items-center gap-2">
                                <span
                                  className="flex-shrink-0 rounded-sm flex items-center justify-center"
                                  style={{ width: "16px", height: "16px", backgroundColor: phase.color + "14", border: `1px solid ${phase.color}28` }}
                                >
                                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: phase.color, display: "block" }} />
                                </span>
                                <span className="font-body" style={{ color: "#5C5148", fontSize: "0.78rem", lineHeight: "1.4" }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Phase mockup image */}
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{
                          width: "120px",
                          borderLeft: `1px solid ${phase.color}14`
                        }}
                      >
                        <img
                          src={phase.image}
                          alt={phase.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: "center", filter: "saturate(0.82) brightness(0.96)" }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Bottom closing note */}
          <p className="font-micro mt-6 ml-[52px]" style={{ color: "#9a8f84", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
            Founding members unlock the complete 5-phase path first.
          </p>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (unchanged) ─────────────────────────────────── */}
      <div className="md:hidden max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <div
          style={{
            transition: "opacity 0.6s ease",
            opacity: visible ? 1 : 0
          }}
        >
          {/* Eyebrow */}
          <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            UNDERSTANDING THE PLATFORM
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>

          {/* Heading */}
          <h2
            className="font-display leading-tight mb-4 text-center"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2", maxWidth: "22ch", marginLeft: "auto", marginRight: "auto" }}
          >
            What is the <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
          </h2>

          {/* Support copy */}
          <p className="font-body leading-relaxed mb-7 text-center mx-auto" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.65", maxWidth: "42ch" }}>
            A guided opening path that helps you move from idea to real program with less guesswork. Built from real childcare experience, not theory.
          </p>

          {/* Mobile swipe cards */}
          <div className="mb-5 overflow-hidden w-full">
            <style>{`
              @keyframes peekNudge {
                0%   { transform: translateX(0); }
                40%  { transform: translateX(-18px); }
                70%  { transform: translateX(-8px); }
                100% { transform: translateX(0); }
              }
            `}</style>
            <div className="flex gap-3 overflow-x-auto pb-3"
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
              }}>
              {cards.map((card) => (
                <div key={card.title} className="flex-none rounded-2xl overflow-hidden"
                  style={{ width: "252px", scrollSnapAlign: "center", background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)", border: "1px solid #E4D5C0", boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)" }}>
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }} />
                  <div className="w-full overflow-hidden" style={{ height: "110px" }}>
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover"
                      style={{ objectPosition: "center", transform: "scale(1.18)", transformOrigin: "center", filter: "saturate(0.82) brightness(0.97)" }} />
                  </div>
                  <div className="px-4 pt-2 pb-3 text-center">
                    <p className="font-display text-sm font-semibold mb-1" style={{ color: card.accent }}>{card.title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile bridge line */}
          <p className="font-body text-xs mt-3 text-center" style={{ color: "#7A6E65", lineHeight: "1.5" }}>
            Founding members unlock the complete 5-phase path first.
          </p>
        </div>
      </div>

    </section>
  );
}