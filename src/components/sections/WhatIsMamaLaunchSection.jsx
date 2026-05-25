import React, { useRef, useEffect, useState } from "react";

// Mobile-only cards (unchanged)
const cards = [
  { title: "Guided Interactive Roadmap", body: "Move through 5 structured phases with prompts, decisions, and tasks at every step — so you always know what to do.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png", accent: "#4D5E49" },
  { title: "Built-In Clarity", body: "Every template, checklist, and policy document you need — organized by phase and ready to fill in as you go.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png", accent: "#C4956A" },
  { title: "Launch Momentum", body: "See your progress in real time as you complete each phase and move closer to opening your program.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png", accent: "#4D5E49" }
];

// Locked phase names + exact copy per brief
const phases = [
  {
    number: "01",
    name: "Dream & Align",
    outcome: "Feel clear on what you're building and why it fits your life.",
    detail: "Clarify your childcare vision, family-aligned schedule, program model, income goals, and the type of experience you want to create.",
    includes: ["Vision Blueprint", "Program model clarity", "Lifestyle + schedule alignment"],
    color: "#4D5E49",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png",
    imageLabel: "Vision workbook pages"
  },
  {
    number: "02",
    name: "Build Your Foundation",
    outcome: "Feel grounded and organized instead of overwhelmed by licensing and setup.",
    detail: "Work through licensing preparation, home setup, safety requirements, documentation, and operational readiness.",
    includes: ["Licensing guidance", "Home setup checklist", "Inspection preparation"],
    color: "#6B7E67",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png",
    imageLabel: "Licensing checklist & document tracker"
  },
  {
    number: "03",
    name: "Design Your Ecosystem",
    outcome: "See your program come to life through space, rhythm, policies, and parent experience.",
    detail: "Create your environment plan, daily rhythms, policies, parent communication systems, and childcare experience.",
    includes: ["Room planning", "Parent handbook guidance", "Daily rhythm framework"],
    color: "#C4956A",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png",
    imageLabel: "Room layout & environment plan"
  },
  {
    number: "04",
    name: "Launch Your Program",
    outcome: "Feel ready to share your program publicly and begin attracting aligned families.",
    detail: "Set up your waitlist, tour process, website messaging, enrollment flow, and local outreach systems.",
    includes: ["Waitlist workflow", "Tour system", "Launch messaging"],
    color: "#4D5E49",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png",
    imageLabel: "Waitlist & marketing workflow"
  },
  {
    number: "05",
    name: "Open Your Doors",
    outcome: "Feel prepared and supported walking into opening week.",
    detail: "Finalize your systems, welcome families, prepare for the first day, and transition into real program operations.",
    includes: ["Opening week checklist", "Family welcome tools", "First-week preparation"],
    color: "#6B7E67",
    image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png",
    imageLabel: "Opening week checklist & welcome plan"
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

  const scrollToWaitlist = () => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden", maxWidth: "100vw", width: "100%", position: "relative", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={ref}
        className="hidden md:block"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)"
        }}
      >
        {/* ── Section intro — full-width centered ── */}
        <div className="max-w-3xl mx-auto px-8 pt-16 pb-10 text-center">
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.16em" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            UNDERSTANDING THE PLATFORM
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>

          <h2
            className="font-display leading-tight mb-5"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", lineHeight: "1.15" }}
          >
            What is the{" "}
            <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
          </h2>

          <p className="font-body leading-relaxed mb-6 mx-auto" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.75", maxWidth: "58ch" }}>
            The Mama Launch Method is a guided implementation path that helps mothers move from idea to opening day with less overwhelm, less guesswork, and more support. Each phase helps you build one part of your home childcare ecosystem — from vision and licensing to environment, enrollment, and opening your doors.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={scrollToWaitlist}
              className="font-micro px-7 py-3.5 rounded-full transition-all"
              style={{ color: "#fff", fontSize: "0.72rem", backgroundColor: "#4D5E49", boxShadow: "0 6px 24px rgba(77,94,73,0.24)", letterSpacing: "0.09em" }}
            >
              Join the Founding Member Waitlist
            </button>
            <button
              onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro transition-all"
              style={{ color: "#4D5E49", fontSize: "0.7rem", letterSpacing: "0.09em", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Explore the Method ↓
            </button>
          </div>
        </div>

        {/* ── Centered vertical roadmap ── */}
        <div className="max-w-4xl mx-auto px-8 pb-10 relative">

          {/* Vertical timeline line — hugs the phase number circles */}
          <div
            className="absolute"
            style={{
              left: "calc(50% - 0.5px)",
              top: "20px",
              bottom: "20px",
              width: "1px",
              background: "linear-gradient(180deg, transparent 0%, #C4956A55 8%, #4D5E4944 50%, #C4956A55 92%, transparent 100%)",
              zIndex: 0,
              display: "none" // hidden — using left-side node line instead
            }}
          />

          <div className="flex flex-col" style={{ gap: "0" }}>
            {phases.map((phase, i) => (
              <div key={phase.number} className="relative flex items-stretch" style={{ marginBottom: i < phases.length - 1 ? "0" : "0" }}>

                {/* Timeline gutter — left 48px */}
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: "48px" }}>
                  {/* Connector line above node */}
                  {i > 0 && (
                    <div style={{ flex: "0 0 24px", width: "1px", background: `linear-gradient(180deg, ${phases[i-1].color}44, ${phase.color}44)` }} />
                  )}
                  {i === 0 && <div style={{ flex: "0 0 24px" }} />}

                  {/* Phase number node */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full z-10"
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "#F0EBE1",
                      border: `2px solid ${phase.color}`,
                      boxShadow: `0 0 0 4px #F0EBE1, 0 2px 10px ${phase.color}28`
                    }}
                  >
                    <span className="font-display" style={{ color: phase.color, fontSize: "0.82rem", fontWeight: 700, lineHeight: 1 }}>
                      {phase.number}
                    </span>
                  </div>

                  {/* Connector line below node */}
                  {i < phases.length - 1 && (
                    <div style={{ flex: "1", minHeight: "24px", width: "1px", background: `linear-gradient(180deg, ${phase.color}44, ${phases[i+1].color}44)` }} />
                  )}
                  {i === phases.length - 1 && <div style={{ flex: "0 0 24px" }} />}
                </div>

                {/* Phase card */}
                <div
                  className="flex-1 min-w-0 overflow-hidden"
                  style={{
                    margin: "12px 0 12px 16px",
                    borderRadius: "16px",
                    backgroundColor: "#FFFDF9",
                    border: `1px solid ${phase.color}22`,
                    boxShadow: "0 4px 20px rgba(44,44,44,0.07), 0 1px 4px rgba(196,149,106,0.07)"
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ height: "2px", background: `linear-gradient(90deg, ${phase.color}, ${phase.color}44)`, borderRadius: "16px 16px 0 0" }} />

                  <div className="flex">
                    {/* Text side */}
                    <div className="flex-1 p-5 lg:p-6">
                      {/* Phase label */}
                      <p className="font-micro mb-1" style={{ color: phase.color, fontSize: "0.6rem", letterSpacing: "0.14em" }}>
                        PHASE {phase.number}
                      </p>
                      <h3 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "1.15rem" }}>
                        {phase.name}
                      </h3>

                      {/* Outcome */}
                      <div className="mb-3">
                        <p className="font-micro mb-1" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.1em" }}>WHAT YOU'LL FEEL</p>
                        <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.6", fontStyle: "italic" }}>
                          "{phase.outcome}"
                        </p>
                      </div>

                      {/* What you'll build */}
                      <div className="mb-3">
                        <p className="font-micro mb-1" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.1em" }}>WHAT YOU'LL BUILD</p>
                        <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.84rem", lineHeight: "1.6" }}>
                          {phase.detail}
                        </p>
                      </div>

                      {/* Deliverables */}
                      <div className="pt-3" style={{ borderTop: `1px solid ${phase.color}16` }}>
                        <p className="font-micro mb-2" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.1em" }}>INCLUDES</p>
                        <ul className="flex flex-wrap gap-2">
                          {phase.includes.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: phase.color + "10", border: `1px solid ${phase.color}22` }}
                            >
                              <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: phase.color, display: "block", flexShrink: 0 }} />
                              <span className="font-body" style={{ color: "#5C5148", fontSize: "0.75rem", lineHeight: 1 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Mockup image side */}
                    <div
                      className="flex-shrink-0 flex flex-col overflow-hidden"
                      style={{
                        width: "180px",
                        borderLeft: `1px solid ${phase.color}14`,
                        borderRadius: "0 16px 16px 0"
                      }}
                    >
                      <div className="flex-1 overflow-hidden">
                        <img
                          src={phase.image}
                          alt={phase.imageLabel}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: "center top", filter: "saturate(0.85) brightness(0.95)", minHeight: "140px" }}
                        />
                      </div>
                      <div
                        className="px-3 py-2"
                        style={{ backgroundColor: "#F8F4EF", borderTop: `1px solid ${phase.color}16` }}
                      >
                        <p className="font-micro" style={{ color: phase.color, fontSize: "0.55rem", letterSpacing: "0.1em", lineHeight: "1.4" }}>
                          {phase.imageLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── Closing CTA ── */}
        <div className="max-w-3xl mx-auto px-8 pb-16 text-center">
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C4956A44, transparent)", marginBottom: "28px" }} />
          <p className="font-body mb-5" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>
            Founding members will be the first to move through the complete 5-phase path.
          </p>
          <button
            onClick={scrollToWaitlist}
            className="font-micro px-8 py-4 rounded-full transition-all"
            style={{ color: "#fff", fontSize: "0.72rem", backgroundColor: "#4D5E49", boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)", letterSpacing: "0.09em" }}
          >
            Join the Founding Member Waitlist
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE LAYOUT — UNCHANGED
      ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <div style={{ transition: "opacity 0.6s ease", opacity: visible ? 1 : 0 }}>

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

          {/* Mobile bridge line */}
          <p className="font-body text-xs mt-3 text-center" style={{ color: "#7A6E65", lineHeight: "1.5" }}>
            Founding members unlock the complete 5-phase path first.
          </p>
        </div>
      </div>

    </section>
  );
}