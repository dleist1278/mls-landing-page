import React, { useRef, useEffect, useState } from "react";

const PORTAL_IMG = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2164b968d_126b8850-64e7-44bb-9b84-3062101feb97.png";
const DELIVERABLES_IMG = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/ef8201f7e_Screenshot2026-05-16at95731PM.png";

const ecosystemPillars = [
  {
    number: "01",
    title: "Vision & Structure",
    description:
      "Clarify your childcare philosophy, daily rhythm, licensing direction, family-aligned schedule, and the type of program you want to build — so every decision that follows has a clear foundation.",
    tags: ["Program philosophy", "Licensing direction", "Family-aligned schedule", "Program model clarity"],
    accent: "#4D5E49",
  },
  {
    number: "02",
    title: "Environment & Rhythm",
    description:
      "Design calm, organized childcare spaces and daily routines that support movement, safety, independence, emotional regulation, and real family life — inside a home that works for everyone in it.",
    tags: ["Room planning", "Daily rhythm design", "Sensory & play environments", "Calm organizational systems"],
    accent: "#C4956A",
  },
  {
    number: "03",
    title: "Parent Experience",
    description:
      "Build trust-centered communication systems — from the first tour to enrollment, onboarding, policies, and ongoing family connection — so parents feel held and your program feels professional.",
    tags: ["Home tour workflow", "Enrollment & onboarding", "Parent communication systems", "Policy guidance"],
    accent: "#6B7E67",
  },
  {
    number: "04",
    title: "Sustainable Operations",
    description:
      "Create the operational rhythms, workflows, and organizational habits that keep your program calm, manageable, and sustainable — so your childcare ecosystem grows without consuming your life.",
    tags: ["Operational routines", "Capacity & growth planning", "Launch-ready messaging", "Calm systems framework"],
    accent: "#4D5E49",
  },
];

function PillarRow({ pillar, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? "md:[direction:rtl]" : ""}`}
      style={{
        transition: `all 0.8s ease ${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        filter: visible ? "blur(0)" : "blur(3px)",
      }}
    >
      {/* Placeholder image slot — ready for real asset */}
      <div className={!isEven ? "md:[direction:ltr]" : ""}>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            aspectRatio: "4/3",
            backgroundColor: "#F0EBE1",
            border: `1px solid ${pillar.accent}20`,
            boxShadow: `0 16px 56px ${pillar.accent}10`,
          }}
        >
          {/* Inner document mock */}
          <div className="absolute inset-0 p-7 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pillar.accent, opacity: 0.45 }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pillar.accent, opacity: 0.2 }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pillar.accent, opacity: 0.1 }} />
              </div>
              <span className="font-micro" style={{ color: pillar.accent, fontSize: "0.55rem", opacity: 0.55 }}>
                Mama Launch Method · Phase {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title area */}
            <div className="mb-5">
              <div className="h-2.5 rounded-full w-2/3 mb-2" style={{ backgroundColor: `${pillar.accent}2A` }} />
              <div className="h-1.5 rounded-full w-full mb-1.5" style={{ backgroundColor: `${pillar.accent}12` }} />
              <div className="h-1.5 rounded-full w-4/5" style={{ backgroundColor: `${pillar.accent}10` }} />
            </div>

            {/* Two-column content */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {[0, 1].map((col) => (
                <div key={col} className="rounded-2xl p-4 flex flex-col gap-2" style={{ backgroundColor: `${pillar.accent}07`, border: `1px solid ${pillar.accent}14` }}>
                  <div className="h-2 rounded-full w-4/5" style={{ backgroundColor: `${pillar.accent}20` }} />
                  {[85, 70, 90, 60].map((w, i) => (
                    <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, backgroundColor: `${pillar.accent}10` }} />
                  ))}
                </div>
              ))}
            </div>

            {/* Checklist row */}
            <div className="mt-4 space-y-2 pt-4" style={{ borderTop: `1px solid ${pillar.accent}12` }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded flex-none flex items-center justify-center" style={{ backgroundColor: `${pillar.accent}12`, border: `1px solid ${pillar.accent}22` }}>
                    <div className="w-1.5 h-1 rounded-sm" style={{ backgroundColor: pillar.accent, opacity: 0.45 }} />
                  </div>
                  <div className="h-1.5 rounded-full" style={{ width: `${[80, 65, 88][i - 1]}%`, backgroundColor: `${pillar.accent}10` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className={!isEven ? "md:[direction:ltr]" : ""}>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-display select-none" style={{ color: pillar.accent, opacity: 0.18, fontSize: "3.5rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
            {pillar.number}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: `${pillar.accent}1A` }} />
        </div>
        <h3 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)", lineHeight: "1.2" }}>
          {pillar.title}
        </h3>
        <p className="font-body leading-relaxed mb-6" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
          {pillar.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {pillar.tags.map((tag) => (
            <span key={tag} className="font-body text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: `${pillar.accent}0A`, color: pillar.accent, border: `1px solid ${pillar.accent}20` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WalkAwaySection() {
  const headerRef = useRef(null);
  const portalRef = useRef(null);
  const deliverablesRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [portalVisible, setPortalVisible] = useState(false);
  const [deliverablesVisible, setDeliverablesVisible] = useState(false);

  useEffect(() => {
    const makeObs = (setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) setter(true); }, { threshold: 0.06 });
    const o1 = makeObs(setHeaderVisible);
    const o2 = makeObs(setPortalVisible);
    const o3 = makeObs(setDeliverablesVisible);
    if (headerRef.current) o1.observe(headerRef.current);
    if (portalRef.current) o2.observe(portalRef.current);
    if (deliverablesRef.current) o3.observe(deliverablesRef.current);
    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-14" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-14"
          style={{ transition: "all 0.8s ease", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(28px)", filter: headerVisible ? "blur(0)" : "blur(3px)" }}
        >
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Childcare Ecosystem
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
              Building Your
              <br />
              <em style={{ color: "#4D5E49" }}>Childcare Ecosystem.</em>
            </h2>
            <p className="font-body md:max-w-xs leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
              The Mama Launch Method builds four interconnected pillars — each one supporting the others to create a whole, sustainable childcare program.
            </p>
          </div>
        </div>

        {/* REAL ASSET — Portal mockup */}
        <div
          ref={portalRef}
          className="mb-24"
          style={{ transition: "all 0.9s ease", opacity: portalVisible ? 1 : 0, transform: portalVisible ? "translateY(0)" : "translateY(32px)", filter: portalVisible ? "blur(0)" : "blur(3px)" }}
        >
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#4D5E49", fontSize: "0.7rem" }}>
            <span className="inline-block w-6 h-px" style={{ backgroundColor: "#4D5E49" }} />
            Inside the Mama Launch Platform
          </p>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 24px 80px rgba(77,94,73,0.14)", border: "1px solid #4D5E4920" }}
          >
            <img
              src={PORTAL_IMG}
              alt="The Mama Launch Studio platform — your guided 6-phase implementation dashboard"
              className="w-full h-auto block"
            />
          </div>
          <p className="font-body mt-4 text-center" style={{ color: "#9a8f84", fontSize: "0.8rem" }}>
            Your guided implementation dashboard — track your progress through every phase.
          </p>
        </div>

        {/* Four ecosystem pillars — alternating */}
        <div className="flex flex-col gap-14 md:gap-18 mb-16">
          {ecosystemPillars.map((pillar, i) => (
            <PillarRow key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>



        {/* CTA */}
        <div className="text-center">
          <div className="w-10 h-px mx-auto mb-7" style={{ backgroundColor: "#C4956A44" }} />
          <p className="font-body mb-6 mx-auto" style={{ color: "#5C5148", maxWidth: "440px", fontSize: "0.95rem", lineHeight: "1.75" }}>
            These aren't separate downloads. They're the four pillars of a complete, calm, intentional childcare program — built step by step through the Mama Launch Method.
          </p>
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-10 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 8px 32px rgba(77,94,73,0.22)" }}
          >
            Start Your Launch Path
          </button>
        </div>
      </div>

      <div className="w-full h-px mt-14" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}