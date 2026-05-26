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

const phaseCaptions = [
  "Guided foundation prompts",
  "Setup and safety checklists",
  "Policies and systems",
  "Enrollment tools",
  "Opening readiness",
];

export default function WhatIsMamaLaunchSection() {
  const sectionRef = useRef(null);
  const phaseRefs = useRef([]);
  const innerScrollRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

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
      // If scrolled to (or near) the bottom, always activate the last phase
      const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 40;
      if (atBottom) {
        const last = phases.length - 1;
        if (last !== activeIndex) { setPrevIndex(activeIndex); setActiveIndex(last); }
        return;
      }

      const containerTop = container.getBoundingClientRect().top;
      let best = 0;
      let bestDist = Infinity;
      phaseRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - containerTop - 80);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      if (best !== activeIndex) {
        setPrevIndex(activeIndex);
        setActiveIndex(best);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [visible, activeIndex]);

  const scrollToPhase = (i) => {
    const el = phaseRefs.current[i];
    const container = innerScrollRef.current;
    if (!el || !container) return;
    container.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  };

  const scrollToWaitlist = () => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="method"
      ref={sectionRef}
      style={{
        backgroundColor: "#F0EBE1",
        overflow: "hidden",
        maxWidth: "100vw",
        width: "100%",
        position: "relative",
        borderTop: "1px solid rgba(196,149,106,0.08)",
        scrollMarginTop: "96px"
      }}
    >

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ══════════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes methodFadeUp {
          from { opacity: 0; transform: translateY(22px); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes methodFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.16; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.28; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes railDot {
          0%, 100% { box-shadow: 0 0 0 0px rgba(196,149,106,0); }
          50%       { box-shadow: 0 0 0 5px rgba(196,149,106,0.12); }
        }
      `}</style>

      <div className="hidden md:block">


        {/* ── Section Intro — staggered entrance ── */}
        <div className="text-center mx-auto px-8 pt-16 pb-8" style={{ maxWidth: "720px" }}>
          <p
            className="font-micro mb-4 inline-flex items-center gap-3"
            style={{
              color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.18em",
              opacity: visible ? 1 : 0,
              animation: visible ? "methodFadeUp 0.7s ease forwards" : "none",
              animationDelay: "0s"
            }}
          >
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "#C4956A" }} />
            THE MAMA LAUNCH METHOD™
            <span style={{ display: "inline-block", width: "32px", height: "1px", backgroundColor: "#C4956A" }} />
          </p>
          <h2
            className="font-display leading-tight mb-4"
            style={{
              color: "#2C2C2C", fontSize: "clamp(2rem, 3.4vw, 3rem)", lineHeight: "1.12",
              opacity: visible ? 1 : 0,
              animation: visible ? "methodFadeUp 0.8s ease forwards" : "none",
              animationDelay: "0.1s"
            }}
          >
            The guided path from idea to opening day.
          </h2>
          <p
            className="font-body mx-auto"
            style={{
            color: "#5C5148", fontSize: "1.125rem", lineHeight: "1.75", maxWidth: "58ch",
              opacity: visible ? 1 : 0,
              animation: visible ? "methodFadeUp 0.8s ease forwards" : "none",
              animationDelay: "0.2s"
            }}
          >
            A step-by-step framework that helps mothers move from uncertainty to clarity, structure, and launch readiness — without piecing everything together alone.
          </p>
        </div>

        {/* ── Framed 3-column Method showcase ── */}
        <div
          className="mx-auto px-8 pb-12"
          style={{
            maxWidth: "1280px",
            opacity: visible ? 1 : 0,
            animation: visible ? "methodFadeUp 0.9s ease forwards" : "none",
            animationDelay: "0.3s"
          }}
        >
          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(196,149,106,0.18)",
              background: "linear-gradient(160deg, #FFFDF9 0%, #F7F2EB 100%)",
              boxShadow: "0 12px 64px rgba(44,44,44,0.08), 0 2px 12px rgba(196,149,106,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
              display: "flex",
              height: "clamp(660px, 76vh, 800px)",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {/* Top accent bar — spans full frame including right panel */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #4D5E49 0%, #C4956A 50%, #6B7E67 100%)", borderRadius: "28px 28px 0 0", zIndex: 10 }} />

            {/* ── LEFT: Progress rail ── */}
            <div
              style={{
                width: "200px",
                flexShrink: 0,
                borderRight: "1px solid rgba(196,149,106,0.12)",
                padding: "36px 24px 36px 28px",
                display: "flex",
                flexDirection: "column",
                background: "rgba(240,235,225,0.45)"
              }}
            >
              <p className="font-micro mb-6" style={{ color: "#C4956A", fontSize: "0.57rem", letterSpacing: "0.18em" }}>
                METHOD MAP
              </p>

              {/* Nav items — no connecting line */}
              <div className="flex flex-col flex-1" style={{ gap: "2px" }}>
                {phases.map((phase, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <button
                      key={phase.number}
                      onClick={() => scrollToPhase(i)}
                      style={{
                        display: "flex", alignItems: "center", gap: "11px",
                        padding: "8px 10px 8px 6px",
                        background: isActive ? `linear-gradient(90deg, ${phase.color}10, transparent)` : "none",
                        border: "none", borderRadius: "10px",
                        cursor: "pointer", textAlign: "left",
                        transition: "background 0.4s ease"
                      }}
                    >
                      {/* Node */}
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: isActive ? phase.color : isPast ? phase.color + "22" : "transparent",
                        border: isActive ? `2px solid ${phase.color}` : isPast ? `1px solid ${phase.color}55` : "1px solid rgba(196,149,106,0.3)",
                        boxShadow: isActive ? `0 0 0 4px ${phase.color}14, 0 2px 10px ${phase.color}30` : "none",
                        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)"
                      }}>
                        {isPast && !isActive ? (
                          <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke={phase.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <span className="font-display" style={{ fontSize: "0.55rem", fontWeight: 700, lineHeight: 1, color: isActive ? "#fff" : "rgba(196,149,106,0.55)" }}>{phase.number}</span>
                        )}
                      </div>
                      {/* Label */}
                      <p className="font-body" style={{
                        fontSize: "0.72rem", lineHeight: "1.2",
                        color: isActive ? "#2C2C2C" : isPast ? "#7A6E65" : "#9a8f84",
                        fontWeight: isActive ? 600 : 400,
                        transition: "color 0.35s ease, font-weight 0.35s ease"
                      }}>
                        {phase.shortName}
                      </p>
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
                {phases.map((phase, i) => {
                  const isActiveCard = i === activeIndex;
                  return (
                  <div
                    key={phase.number}
                    ref={el => phaseRefs.current[i] = el}
                  >
                    <div style={{
                      borderRadius: "18px",
                      backgroundColor: isActiveCard ? "#FFFDF9" : "#FDFAF5",
                      border: `1px solid ${isActiveCard ? phase.color + "48" : phase.color + "18"}`,
                      boxShadow: isActiveCard
                        ? `0 10px 40px rgba(44,44,44,0.13), 0 3px 10px ${phase.color}22, inset 0 1px 0 rgba(255,255,255,0.8)`
                        : "0 2px 10px rgba(44,44,44,0.04)",
                      overflow: "hidden",
                      opacity: isActiveCard ? 1 : 0.72,
                      transform: isActiveCard ? "translateY(-3px) scale(1.005)" : "translateY(0px) scale(1)",
                      transition: "box-shadow 0.5s ease, border-color 0.5s ease, transform 0.5s ease, opacity 0.5s ease"
                    }}>
                      <div style={{ height: "3px", background: `linear-gradient(90deg, ${phase.color}, ${phase.color}44, transparent)` }} />
                      <div style={{ padding: "22px 28px 24px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <span className="font-micro" style={{ display: "inline-block", color: phase.color, fontSize: "0.55rem", letterSpacing: "0.16em", marginBottom: "6px" }}>
                            PHASE {phase.number}
                          </span>
                          <h3 className="font-display" style={{ color: "#2C2C2C", fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
                            {phase.name}
                          </h3>
                        </div>
                        <p className="font-body" style={{ color: "#3a3228", fontSize: "1.05rem", lineHeight: "1.68", marginBottom: "14px" }}>
                          {phase.outcome}
                        </p>
                        <div style={{ borderTop: `1px solid ${phase.color}18`, paddingTop: "9px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <p className="font-micro" style={{ color: phase.color, fontSize: "0.48rem", letterSpacing: "0.16em", flexShrink: 0 }}>INSIDE</p>
                            <div style={{ display: "flex", gap: "4px", overflowX: "hidden", flexWrap: "nowrap", minWidth: 0 }}>
                              {phase.inside.split(" · ").map((item) => (
                                <span key={item} style={{
                                  display: "inline-block",
                                  whiteSpace: "nowrap",
                                  flexShrink: 0,
                                  backgroundColor: "#FDFAF6",
                                  border: `1px solid ${phase.color}22`,
                                  borderRadius: "999px",
                                  padding: "2px 7px",
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "0.65rem",
                                  color: "#6B6156",
                                  letterSpacing: "0em",
                                  lineHeight: "1.5",
                                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7)`
                                }}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
                })}
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

            {/* ── RIGHT: App Preview Panel ── */}
            <div
              style={{
                width: "clamp(320px, 34%, 420px)",
                flexShrink: 0,
                borderLeft: "1px solid rgba(196,149,106,0.12)",
                background: "linear-gradient(170deg, #FEFAF5 0%, #F5EDE0 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                padding: "28px 20px 24px",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                animation: visible ? "methodFadeUp 1s ease forwards" : "none",
                animationDelay: "0.5s"
              }}
            >
              {/* Blueprint grid lines — behind everything */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045, pointerEvents: "none", zIndex: 0 }} preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 24 }, (_, i) => (
                  <line key={i} x1="0" y1={i * 28} x2="9999" y2={i * 28} stroke="#4D5E49" strokeWidth="0.7" />
                ))}
              </svg>

              {/* Animated radial glow — shifts subtly with active phase */}
              <div style={{
                position: "absolute",
                top: "38%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "260px",
                height: "300px",
                background: `radial-gradient(ellipse at center, ${phases[activeIndex].color}28 0%, transparent 68%)`,
                pointerEvents: "none",
                zIndex: 1,
                transition: "background 0.6s ease",
                animation: "glowPulse 4s ease-in-out infinite"
              }} />

              {/* Phone — hero, with float animation */}
              <div style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: "1",
                minHeight: 0,
                gap: "16px",
                padding: "16px 0 8px"
              }}>
                {/* Panel heading — centered above phone */}
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <p className="font-display" style={{
                    color: "#2C2C2C",
                    fontSize: "1.2rem",
                    letterSpacing: "-0.01em",
                    lineHeight: "1.2",
                    marginBottom: "2px"
                  }}>
                    See the Method
                  </p>
                  <p className="font-micro" style={{
                    color: "#C4956A",
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                  }}>
                    IN ACTION
                  </p>
                </div>

                 <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/ff612859f_Untitleddesign.png"
                 alt="Mama Launch Method app interface"
                 style={{
                   width: "auto",
                   maxWidth: "min(240px, 90%)",
                   maxHeight: "100%",
                   objectFit: "contain",
                   display: "block",
                   position: "relative",
                   zIndex: 3,
                   animation: "phoneFloat 6s ease-in-out infinite",
                   filter: "drop-shadow(0 18px 36px rgba(44,44,44,0.18)) drop-shadow(0 3px 10px rgba(44,44,44,0.08))"
                 }}
                />
              </div>

              {/* Phase dot indicator — stays, no text */}
              <div style={{ display: "flex", gap: "5px", justifyContent: "center", position: "relative", zIndex: 2, flexShrink: 0 }}>
                {phases.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeIndex ? "16px" : "5px",
                    height: "5px",
                    borderRadius: "999px",
                    backgroundColor: i === activeIndex ? phases[activeIndex].color : "rgba(196,149,106,0.22)",
                    transition: "all 0.5s ease"
                  }} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Closing CTA ── */}
        <div
          className="text-center mx-auto px-8 pb-20 pt-4"
          style={{ maxWidth: "720px" }}
        >
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C4956A44, transparent)", marginBottom: "32px" }} />
          <h3 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.25rem, 2vw, 1.65rem)", lineHeight: "1.2" }}>
            You don't need to figure out every step alone.
          </h3>
          <p className="font-body mb-8" style={{ color: "#7A6E65", fontSize: "1.1rem", lineHeight: "1.75" }}>
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