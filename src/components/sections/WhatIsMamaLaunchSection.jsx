import React, { useRef, useEffect, useState } from "react";

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
  const innerScrollRef = useRef(null);
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

  // Scroll-spy: watch the internal scroll container
  useEffect(() => {
    const container = innerScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let best = 0;
      let bestDist = Infinity;
      phaseRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - containerTop - 80);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActiveIndex(best);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [visible]);

  const scrollToPhase = (i) => {
    const el = phaseRefs.current[i];
    const container = innerScrollRef.current;
    if (!el || !container) return;
    container.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
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
        <div className="text-center mx-auto px-8 pt-16 pb-8" style={{ maxWidth: "620px" }}>
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

        {/* ── Framed 3-column Method showcase ── */}
        <div className="mx-auto px-8 pb-12" style={{ maxWidth: "1160px" }}>
          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(196,149,106,0.18)",
              background: "linear-gradient(160deg, #FFFDF9 0%, #F7F2EB 100%)",
              boxShadow: "0 12px 64px rgba(44,44,44,0.08), 0 2px 12px rgba(196,149,106,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
              display: "flex",
              height: "clamp(620px, 74vh, 760px)",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {/* Top accent bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #4D5E49, #C4956A, #4D5E49)", borderRadius: "28px 28px 0 0" }} />

            {/* ── LEFT: Progress rail ── */}
            <div
              style={{
                width: "180px",
                flexShrink: 0,
                borderRight: "1px solid rgba(196,149,106,0.12)",
                padding: "36px 24px 36px 28px",
                display: "flex",
                flexDirection: "column",
                background: "rgba(240,235,225,0.45)"
              }}
            >
              <p className="font-micro mb-6" style={{ color: "#C4956A", fontSize: "0.57rem", letterSpacing: "0.16em" }}>
                THE FIVE PHASES
              </p>

              {/* Nav items with track */}
              <div className="relative flex flex-col flex-1" style={{ gap: "0" }}>
                {/* Track line */}
                <div style={{ position: "absolute", left: "13px", top: "13px", bottom: "13px", width: "1px", background: "linear-gradient(180deg, rgba(196,149,106,0.2), rgba(77,94,73,0.15), rgba(196,149,106,0.1))", zIndex: 0 }} />
                {/* Fill line */}
                <div style={{ position: "absolute", left: "13px", top: "13px", width: "1px", height: `${(activeIndex / (phases.length - 1)) * 100}%`, background: "linear-gradient(180deg, #4D5E49, #C4956A)", zIndex: 1, transition: "height 0.45s ease" }} />

                {phases.map((phase, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <button
                      key={phase.number}
                      onClick={() => scrollToPhase(i)}
                      style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "9px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", position: "relative", zIndex: 2 }}
                    >
                      {/* Node */}
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: isActive ? phase.color : "transparent",
                        border: isActive ? `2px solid ${phase.color}` : isPast ? `1px solid ${phase.color}66` : "1px solid rgba(196,149,106,0.28)",
                        boxShadow: isActive ? `0 0 0 3px ${phase.color}18, 0 2px 8px ${phase.color}28` : "none",
                        transition: "all 0.35s ease", position: "relative", zIndex: 2
                      }}>
                        {isPast && !isActive ? (
                          <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke={phase.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <span className="font-display" style={{ fontSize: "0.55rem", fontWeight: 700, lineHeight: 1, color: isActive ? "#fff" : "rgba(196,149,106,0.5)" }}>{phase.number}</span>
                        )}
                      </div>
                      {/* Label */}
                      <div style={{ paddingTop: "4px" }}>
                        <p className="font-body" style={{ fontSize: "0.72rem", lineHeight: "1.2", color: isActive ? "#2C2C2C" : isPast ? "#7A6E65" : "#9a8f84", fontWeight: isActive ? 600 : 400, transition: "color 0.3s ease" }}>
                          {phase.shortName}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── CENTER: Internally scrolling phase cards ── */}
            <div style={{ flex: "1", minWidth: 0, position: "relative" }}>
              {/* Inner scroll container */}
              <div
                ref={innerScrollRef}
                className="method-inner-scroll"
                style={{
                  height: "100%",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  padding: "32px 28px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <style>{`
                  .method-inner-scroll::-webkit-scrollbar { display: none; }
                `}</style>
                {phases.map((phase, i) => (
                  <div
                    key={phase.number}
                    ref={el => phaseRefs.current[i] = el}
                  >
                    <div style={{
                      borderRadius: "18px",
                      backgroundColor: "#FFFDF9",
                      border: `1px solid ${phase.color}1C`,
                      boxShadow: "0 3px 20px rgba(44,44,44,0.06), 0 1px 4px rgba(196,149,106,0.05)",
                      overflow: "hidden"
                    }}>
                      <div style={{ height: "3px", background: `linear-gradient(90deg, ${phase.color}, ${phase.color}44, transparent)` }} />
                      <div style={{ padding: "22px 28px 24px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <span className="font-micro" style={{ display: "inline-block", color: phase.color, fontSize: "0.55rem", letterSpacing: "0.16em", marginBottom: "6px" }}>
                            PHASE {phase.number}
                          </span>
                          <h3 className="font-display" style={{ color: "#2C2C2C", fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
                            {phase.name}
                          </h3>
                        </div>
                        <p className="font-body" style={{ color: "#3a3228", fontSize: "0.88rem", lineHeight: "1.6", marginBottom: "14px" }}>
                          {phase.outcome}
                        </p>
                        <div style={{ borderTop: `1px solid ${phase.color}18`, paddingTop: "12px", display: "flex", alignItems: "baseline", gap: "8px" }}>
                          <span className="font-micro" style={{ color: phase.color, fontSize: "0.53rem", letterSpacing: "0.14em", flexShrink: 0 }}>INSIDE</span>
                          <span className="font-body" style={{ color: "#7A6E65", fontSize: "0.8rem", lineHeight: "1.5" }}>{phase.inside}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom fade — scroll cue */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "64px",
                background: "linear-gradient(to bottom, transparent, rgba(247,242,235,0.95))",
                pointerEvents: "none",
                borderRadius: "0 0 0 0"
              }} />
            </div>

            {/* ── RIGHT: iPhone mockup ── */}
            <div
              style={{
                width: "240px",
                flexShrink: 0,
                borderLeft: "1px solid rgba(196,149,106,0.12)",
                background: "linear-gradient(160deg, #EDE5D8 0%, #E2D5C2 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "28px 20px 20px",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Blueprint grid lines */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice">
                {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                  <line key={i} x1="0" y1={i * 32} x2="9999" y2={i * 32} stroke="#4D5E49" strokeWidth="0.8" />
                ))}
              </svg>

              {/* Caption */}
              <div style={{ textAlign: "center", marginBottom: "16px", position: "relative", zIndex: 1 }}>
                <p className="font-micro mb-1" style={{ color: "#C4956A", fontSize: "0.54rem", letterSpacing: "0.16em" }}>
                  SEE THE METHOD IN ACTION
                </p>
                <p className="font-body" style={{ color: "#5C5148", fontSize: "0.72rem", lineHeight: "1.5" }}>
                  Guided questions, progress tracking, and portfolio tools — inside the app.
                </p>
              </div>

              {/* Phone */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: "-24px 0", background: "radial-gradient(ellipse at 50% 55%, rgba(196,149,106,0.24) 0%, transparent 68%)", pointerEvents: "none" }} />
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/ff612859f_Untitleddesign.png"
                  alt="Mama Launch Method app interface"
                  style={{
                    width: "100%",
                    maxWidth: "190px",
                    height: "auto",
                    display: "block",
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 18px 36px rgba(44,44,44,0.22)) drop-shadow(0 4px 10px rgba(44,44,44,0.10))"
                  }}
                />
              </div>
            </div>

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