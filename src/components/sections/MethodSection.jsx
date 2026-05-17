import React, { useRef, useEffect, useState } from "react";

const phases = [
  {
    number: "01",
    name: "Program Foundation",
    tagline: "Your why, your vision, your path.",
    emotional: "Feel clear on who you are as a provider and what you're building.",
    deliverables: ["Program Vision Blueprint", "Ideal Program Summary", "Parent Experience Statement", "Brand Foundation Summary", "Lifestyle Alignment Summary"],
    color: "#4D5E49",
  },
  {
    number: "02",
    name: "Licensing & Legal Setup",
    tagline: "Build on a strong and compliant foundation.",
    emotional: "Feel grounded and prepared — not overwhelmed by paperwork.",
    deliverables: ["Licensing & Compliance Tracker", "Document Checklist", "Policy & Procedure Outline", "Business Setup Summary", "Insurance & Safety Plan"],
    color: "#6B7E67",
  },
  {
    number: "03",
    name: "Environment & Space Plan",
    tagline: "Design a space that inspires learning.",
    emotional: "Feel like a real provider building something beautiful and safe.",
    deliverables: ["Room Layouts & Floor Plans", "Environment & Material List", "Safety & Setup Checklist", "Outdoor Space Plan", "Aesthetic Vision Board"],
    color: "#C4956A",
  },
  {
    number: "04",
    name: "Daily Operations Plan",
    tagline: "Create calm, consistent, and meaningful days.",
    emotional: "Feel operationally confident — with systems that actually fit your life.",
    deliverables: ["Daily Schedule Template", "Curriculum Plan Outline", "Routine & Flow Guide", "Communication Plan", "Behavior Support Plan"],
    color: "#4D5E49",
  },
  {
    number: "05",
    name: "Branding & Enrollment Plan",
    tagline: "Attract the right families and grow with ease.",
    emotional: "Feel ready to open your doors and welcome your first families.",
    deliverables: ["Brand Identity Guide", "Website & Marketing Copy", "Enrollment Process Map", "Parent Communication Templates", "Launch Plan Checklist"],
    color: "#6B7E67",
  },
  {
    number: "06",
    name: "Growth & Expansion Plan",
    tagline: "Dream bigger and create more impact.",
    emotional: "Feel sustainable — and ready to grow without burning out.",
    deliverables: ["Growth Roadmap", "Financial Plan Summary", "Systems & Team Plan", "Expansion Pathway Plan", "Long-Term Vision Statement"],
    color: "#C4956A",
  },
];

function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      className="flex-none"
      style={{
        width: "288px",
        transition: `all 0.65s ease ${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        filter: visible ? "blur(0)" : "blur(3px)",
      }}
    >
      <div
        className="rounded-3xl flex flex-col h-full"
        style={{ backgroundColor: "#F0EBE1", border: "1px solid #C4956A2A" }}
      >
        {/* Phase header */}
        <div className="rounded-t-3xl px-6 pt-6 pb-5" style={{ borderBottom: `1px solid ${phase.color}1A` }}>
          <div className="flex items-start justify-between mb-3">
            <span
              className="font-display select-none"
              style={{ color: phase.color, opacity: 0.18, fontSize: "4rem", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {phase.number}
            </span>
            <span
              className="font-micro mt-1"
              style={{ color: phase.color, fontSize: "0.6rem", backgroundColor: `${phase.color}10`, padding: "3px 9px", borderRadius: "100px" }}
            >
              Phase {phase.number}
            </span>
          </div>
          <h3 className="font-display text-lg mb-1.5" style={{ color: "#2C2C2C", lineHeight: "1.25" }}>
            {phase.name}
          </h3>
          <p className="font-body text-xs italic" style={{ color: "#7A6E65" }}>
            {phase.tagline}
          </p>
        </div>

        {/* Emotional outcome */}
        <div className="px-6 pt-4 pb-3">
          <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148", fontStyle: "italic" }}>
            "{phase.emotional}"
          </p>
        </div>

        {/* Deliverables */}
        <div className="px-6 pb-6 flex-1" style={{ borderTop: `1px solid ${phase.color}12` }}>
          <p className="font-micro mt-4 mb-3" style={{ color: "#9a8f84", fontSize: "0.62rem" }}>
            You'll walk away with
          </p>
          <ul className="flex flex-col gap-2.5">
            {phase.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <span
                  className="flex-none mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${phase.color}14`, border: `1px solid ${phase.color}28` }}
                >
                  <span style={{ color: phase.color, fontSize: "0.55rem" }}>✓</span>
                </span>
                <span className="font-body text-xs leading-snug" style={{ color: "#3A3330" }}>{d}</span>
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
      { threshold: 0.08 }
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
              <em style={{ color: "#4D5E49" }}>Six Phases. Real Deliverables.</em>
            </h2>
          </div>
          <p className="font-body md:max-w-xs leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
            Each phase of the Mama Launch Method produces real operational documents — so by the end, you have a complete, launch-ready childcare program.
          </p>
        </div>
      </div>

      {/* Horizontal scroll */}
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
          Drag to explore all six phases
        </p>
        <div className="w-10 h-px" style={{ backgroundColor: "#C4956A33" }} />
      </div>

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}