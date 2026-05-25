import React, { useRef, useEffect, useState, useCallback } from "react";

// Mobile-only swipe cards — unchanged
const cards = [
  { title: "Guided Interactive Roadmap", body: "Move through 5 structured phases with prompts, decisions, and tasks at every step — so you always know what to do.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png", accent: "#4D5E49" },
  { title: "Built-In Clarity", body: "Every template, checklist, and policy document you need — organized by phase and ready to fill in as you go.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png", accent: "#C4956A" },
  { title: "Launch Momentum", body: "See your progress in real time as you complete each phase and move closer to opening your program.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png", accent: "#4D5E49" }
];

const phases = [
  {
    number: "01",
    shortName: "Vision",
    name: "Vision, Lifestyle & Program Alignment",
    outcome: "Choose the childcare model that fits your family, goals, income needs, and real-life rhythm so you can start with clarity.",
    inside: "Lifestyle prompts · Model decision guide · Income clarity",
    color: "#4D5E49",
  },
  {
    number: "02",
    shortName: "Licensing",
    name: "Licensing, Home Setup & Safety",
    outcome: "Understand what needs to be prepared legally, safely, and practically so your home and program feel ready.",
    inside: "Licensing guidance · Home setup checklist · Safety prep",
    color: "#7A6E65",
  },
  {
    number: "03",
    shortName: "Systems",
    name: "Program Design, Policies & Operations",
    outcome: "Build the routines, policies, and communication systems that make your program feel professional and sustainable.",
    inside: "Parent handbook · Operations templates · Communication systems",
    color: "#C4956A",
  },
  {
    number: "04",
    shortName: "Enrollment",
    name: "Enrollment, Marketing & Family Trust",
    outcome: "Attract aligned families and guide them from interest to confident enrollment.",
    inside: "Enrollment tools · Marketing prompts · Inquiry systems",
    color: "#4D5E49",
  },
  {
    number: "05",
    shortName: "Launch",
    name: "Launch Readiness & Opening",
    outcome: "Prepare for opening week with the tools, confidence, and organization to begin calmly.",
    inside: "Opening checklist · Family welcome tools · First-week prep",
    color: "#6B7E67",
  }
];

export default function WhatIsMamaLaunchSection() {
  const sectionRef = useRef(null);
  const phaseRefs = useRef([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy: track which phase card is in view
  useEffect(() => {
    const observers = phaseRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4, rootMargin: "-10% 0px -50% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [visible]);

  const scrollToPhase = (i) => {
    phaseRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToWaitlist = () => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#F0EBE1",
        overflow: "hidden",
        maxWidth: "100vw",
        width: "100%",
        position: "relative",
        borderTop: "1px solid rgba(196,149,106,0.08)"
      }}
    >

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:block"
        style={{
          transition: "opacity 0.8s ease, transform 0.8s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)"
        }}
      >

        {/* ── Section Intro ── */}
        <div className="text-center mx-auto px-8 pt-16 pb-10" style={{ maxWidth: "620px" }}>
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "#C4956A" }} />
            THE MAMA LAUNCH METHOD™
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "#C4956A" }} />
          </p>

          <h2 className="font-display leading-tight mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", lineHeight: "1.12" }}>
            The guided path from idea to opening day.
          </h2>

          <p className="font-body mx-auto" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.75", maxWidth: "52ch" }}>
            A step-by-step framework that helps mothers move from uncertainty to clarity, structure, and launch readiness — without piecing everything together alone.
          </p>
        </div>

        {/* ── Two-column: sticky nav + scrollable phase cards ── */}
        {/* Phone mockup is embedded in the sticky left column below */}
        <div className="mx-auto flex" style={{ maxWidth: "1120px", padding: "0 32px" }}>

          {/* LEFT: Sticky progress rail + phone mockup */}
          <div
            className="flex-shrink-0"
            style={{
              width: "300px",
              paddingTop: "56px",
              paddingBottom: "56px",
              paddingRight: "40px",
            }}
          >
            <div style={{ position: "sticky", top: "80px" }}>

              {/* Rail label */}
              <p className="font-micro mb-5" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.16em" }}>
                THE FIVE PHASES
              </p>

              {/* Phase nav items */}
              <div className="relative flex flex-col" style={{ gap: "0" }}>

                {/* Vertical track line */}
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "14px",
                    bottom: "14px",
                    width: "1px",
                    background: "linear-gradient(180deg, rgba(196,149,106,0.2), rgba(77,94,73,0.15), rgba(196,149,106,0.1))",
                    zIndex: 0
                  }}
                />

                {/* Animated fill line */}
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "14px",
                    width: "1px",
                    height: `${(activeIndex / (phases.length - 1)) * 100}%`,
                    background: "linear-gradient(180deg, #4D5E49, #C4956A)",
                    zIndex: 1,
                    transition: "height 0.5s ease"
                  }}
                />

                {phases.map((phase, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <button
                      key={phase.number}
                      onClick={() => scrollToPhase(i)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "10px 0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        position: "relative",
                        zIndex: 2,
                        transition: "opacity 0.3s ease"
                      }}
                    >
                      {/* Node dot */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isActive ? phase.color : isPast ? "#F0EBE1" : "#F0EBE1",
                          border: isActive
                            ? `2px solid ${phase.color}`
                            : isPast
                            ? `1px solid ${phase.color}55`
                            : "1px solid rgba(196,149,106,0.25)",
                          boxShadow: isActive ? `0 0 0 4px ${phase.color}18, 0 2px 10px ${phase.color}30` : "none",
                          transition: "all 0.35s ease",
                          zIndex: 2,
                          position: "relative"
                        }}
                      >
                        {isPast && !isActive ? (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke={phase.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span
                            className="font-display"
                            style={{
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              lineHeight: 1,
                              color: isActive ? "#fff" : "rgba(196,149,106,0.5)"
                            }}
                          >
                            {phase.number}
                          </span>
                        )}
                      </div>

                      {/* Phase title in nav */}
                      <div style={{ paddingTop: "5px" }}>
                       <p
                         className="font-body"
                         style={{
                           fontSize: "0.75rem",
                           lineHeight: "1.2",
                           color: isActive ? "#2C2C2C" : isPast ? "#7A6E65" : "#9a8f84",
                           fontWeight: isActive ? 600 : 400,
                           transition: "color 0.3s ease"
                         }}
                       >
                         {phase.shortName}
                       </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ── Phone mockup below nav ── */}
              <div style={{ marginTop: "40px" }}>
                {/* Card frame */}
                <div
                  style={{
                    borderRadius: "20px",
                    background: "linear-gradient(150deg, #EDE5D8 0%, #E2D6C4 100%)",
                    border: "1px solid rgba(196,149,106,0.16)",
                    boxShadow: "0 6px 32px rgba(44,44,44,0.07), inset 0 1px 0 rgba(255,255,255,0.55)",
                    padding: "20px 16px 8px",
                    position: "relative",
                    overflow: "hidden",
                    textAlign: "center"
                  }}
                >
                  {/* Subtle grid lines */}
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice">
                    {[0,1,2,3,4,5,6,7,8].map(i => (
                      <line key={i} x1="0" y1={i * 32} x2="9999" y2={i * 32} stroke="#4D5E49" strokeWidth="0.8" />
                    ))}
                  </svg>

                  {/* Caption */}
                  <p className="font-micro mb-1" style={{ color: "#C4956A", fontSize: "0.56rem", letterSpacing: "0.16em", position: "relative", zIndex: 1 }}>
                    SEE THE METHOD IN ACTION
                  </p>
                  <p className="font-body mb-4" style={{ color: "#5C5148", fontSize: "0.75rem", lineHeight: "1.55", position: "relative", zIndex: 1 }}>
                    Guided questions, progress tracking, and portfolio-building tools — all inside the app.
                  </p>

                  {/* Phone image */}
                  <div style={{ position: "relative", display: "inline-block" }}>
                    {/* Glow */}
                    <div style={{
                      position: "absolute",
                      inset: "-20px 0",
                      background: "radial-gradient(ellipse at 50% 60%, rgba(196,149,106,0.22) 0%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 0
                    }} />
                    <img
                      src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/ff612859f_Untitleddesign.png"
                      alt="Mama Launch Method app interface"
                      style={{
                        width: "100%",
                        maxWidth: "220px",
                        height: "auto",
                        display: "block",
                        position: "relative",
                        zIndex: 1,
                        filter: "drop-shadow(0 20px 40px rgba(44,44,44,0.20)) drop-shadow(0 4px 12px rgba(44,44,44,0.10))"
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Scrollable phase detail cards */}
          <div
            className="flex-1 min-w-0 flex flex-col"
            style={{ paddingTop: "48px", paddingBottom: "48px", gap: "0" }}
          >
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                ref={el => phaseRefs.current[i] = el}
                style={{
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  borderBottom: i < phases.length - 1 ? "1px solid rgba(196,149,106,0.1)" : "none"
                }}
              >
                {/* Phase card — editorial layout */}
                <div
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#FFFDF9",
                    border: `1px solid ${phase.color}1A`,
                    boxShadow: "0 4px 32px rgba(44,44,44,0.07), 0 1px 4px rgba(196,149,106,0.06)",
                    overflow: "hidden",
                    transition: "box-shadow 0.4s ease"
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${phase.color}, ${phase.color}44, transparent)` }} />

                  <div style={{ padding: "28px 36px 32px" }}>

                    {/* Phase number + title */}
                    <div style={{ marginBottom: "16px" }}>
                      <span
                        className="font-micro"
                        style={{
                          display: "inline-block",
                          color: phase.color,
                          fontSize: "0.58rem",
                          letterSpacing: "0.16em",
                          marginBottom: "8px"
                        }}
                      >
                        PHASE {phase.number}
                      </span>
                      <h3
                        className="font-display"
                        style={{
                          color: "#2C2C2C",
                          fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)",
                          lineHeight: "1.2",
                          letterSpacing: "-0.02em"
                        }}
                      >
                        {phase.name}
                      </h3>
                    </div>

                    {/* Outcome */}
                    <p
                      className="font-body"
                      style={{ color: "#3a3228", fontSize: "0.92rem", lineHeight: "1.65", marginBottom: "20px" }}
                    >
                      {phase.outcome}
                    </p>

                    {/* Inside line */}
                    <div
                      style={{
                        borderTop: `1px solid ${phase.color}18`,
                        paddingTop: "16px",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px"
                      }}
                    >
                      <span
                        className="font-micro"
                        style={{ color: phase.color, fontSize: "0.56rem", letterSpacing: "0.14em", flexShrink: 0 }}
                      >
                        INSIDE
                      </span>
                      <span
                        className="font-body"
                        style={{ color: "#7A6E65", fontSize: "0.82rem", lineHeight: "1.5" }}
                      >
                        {phase.inside}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Closing CTA ── */}
        <div
          className="text-center mx-auto px-8 pb-20 pt-4"
          style={{ maxWidth: "620px" }}
        >
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C4956A44, transparent)", marginBottom: "32px" }} />
          <h3 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.25rem, 2vw, 1.65rem)", lineHeight: "1.2" }}>
            You don't need to figure out every step alone.
          </h3>
          <p className="font-body mb-8" style={{ color: "#7A6E65", fontSize: "0.9rem", lineHeight: "1.75" }}>
            Founding members will be the first to move through the full Mama Launch Method™ with guided support, templates, and a clear path to opening.
          </p>
          <button
            onClick={scrollToWaitlist}
            className="font-micro transition-all"
            style={{
              color: "#fff",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              backgroundColor: "#4D5E49",
              border: "none",
              borderRadius: "999px",
              padding: "15px 36px",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(77,94,73,0.28), 0 1px 4px rgba(77,94,73,0.14)"
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