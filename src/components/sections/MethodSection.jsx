import React, { useRef, useEffect, useState } from "react";

const phases = [
  {
    number: "01",
    name: "Dream & Align",
    emotional: "Feel clear on what you're building and why it fits your life.",
    deliverables: ["Childcare Ecosystem Blueprint", "Program Model Clarity", "Lifestyle Alignment Notes"],
    color: "#4D5E49",
  },
  {
    number: "02",
    name: "Foundation",
    emotional: "Feel grounded and prepared — not overwhelmed by the legal process.",
    deliverables: ["Licensing Organization Plan", "Home Safety Checklist", "State Requirements Tracker"],
    color: "#6B7E67",
  },
  {
    number: "03",
    name: "Ecosystem Design",
    emotional: "Feel like a real provider building something beautiful and meaningful.",
    deliverables: ["Room Planning Worksheet", "Daily Rhythm Framework", "Curriculum Philosophy Guide"],
    color: "#C4956A",
  },
  {
    number: "04",
    name: "Launch Preparation",
    emotional: "Feel genuinely ready — structured, confident, and calm.",
    deliverables: ["Parent Handbook Structure", "Waitlist & Enrollment System", "Tour Workflow Guide"],
    color: "#4D5E49",
  },
  {
    number: "05",
    name: "Open & Sustain",
    emotional: "Feel sustainable — running a program that fits your life.",
    deliverables: ["Ongoing Operations Framework", "Growth & Capacity Plan", "Calm Systems Checklist"],
    color: "#6B7E67",
  },
];

function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
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
        transition: `all 0.65s ease ${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        filter: visible ? "blur(0)" : "blur(3px)",
      }}
    >
      <div
        className="rounded-3xl flex flex-col h-full"
        style={{ backgroundColor: "#F0EBE1", border: "1px solid #C4956A2A" }}
      >
        {/* Phase header band */}
        <div
          className="rounded-t-3xl px-7 pt-7 pb-5"
          style={{ borderBottom: `1px solid ${phase.color}22` }}
        >
          <div className="flex items-start justify-between mb-4">
            <span
              className="font-display text-5xl select-none"
              style={{ color: phase.color, opacity: 0.2, letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {phase.number}
            </span>
            <span
              className="font-micro mt-1"
              style={{ color: phase.color, fontSize: "0.62rem", backgroundColor: `${phase.color}12`, padding: "4px 10px", borderRadius: "100px" }}
            >
              Phase {phase.number}
            </span>
          </div>
          <h3 className="font-display text-xl mb-3" style={{ color: "#2C2C2C" }}>
            {phase.name}
          </h3>
          <p className="font-body text-sm leading-relaxed italic" style={{ color: "#5C5148" }}>
            "{phase.emotional}"
          </p>
        </div>

        {/* Deliverables */}
        <div className="px-7 py-6 flex-1">
          <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.65rem" }}>
            You'll walk away with
          </p>
          <ul className="flex flex-col gap-3">
            {phase.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-3">
                <span
                  className="flex-none w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${phase.color}18`, border: `1px solid ${phase.color}30` }}
                >
                  <span style={{ color: phase.color, fontSize: "0.6rem" }}>✓</span>
                </span>
                <span className="font-body text-sm" style={{ color: "#2C2C2C" }}>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function MethodSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="method" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-12"
        style={{
          transition: "all 0.8s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(28px)",
          filter: headerVisible ? "blur(0)" : "blur(3px)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Implementation Roadmap
            </p>
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
              The Mama Launch Method
              <br />
              <em style={{ color: "#4D5E49" }}>Five Phases. Real Deliverables.</em>
            </h2>
          </div>
          <p className="font-body md:max-w-xs leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
            A true implementation roadmap — each phase produces real operational assets, not just new knowledge.
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        className="flex gap-4 overflow-x-auto pb-6 px-6 md:px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {phases.map((phase, i) => (
          <PhaseCard key={phase.number} phase={phase} index={i} />
        ))}
        <div className="flex-none w-8 md:w-12" />
      </div>

      <div className="flex items-center justify-center gap-3 mt-4 px-6">
        <div className="w-10 h-px" style={{ backgroundColor: "#C4956A33" }} />
        <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.62rem" }}>
          Drag to explore all phases
        </p>
        <div className="w-10 h-px" style={{ backgroundColor: "#C4956A33" }} />
      </div>

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}