import React, { useRef, useEffect, useState } from "react";

const outcomes = [
  {
    title: "Childcare Ecosystem Blueprint",
    description: "Your complete program vision document — defining your model, philosophy, environment, and family experience.",
    category: "Planning",
  },
  {
    title: "Licensing Organization System",
    description: "Every requirement, document, deadline, and contact organized in one structured system so nothing falls through the cracks.",
    category: "Legal & Compliance",
  },
  {
    title: "Room Planning Worksheet",
    description: "A guided space design framework for creating organized, developmentally appropriate, beautiful childcare environments at home.",
    category: "Environment",
  },
  {
    title: "Daily Rhythm Framework",
    description: "Your program's operational daily schedule — structured around child development principles and your family's real life.",
    category: "Operations",
  },
  {
    title: "Waitlist & Enrollment System",
    description: "A complete intake, waitlist, and enrollment workflow so families experience a professional, organized onboarding from day one.",
    category: "Enrollment",
  },
  {
    title: "Parent Handbook Structure",
    description: "Policies, communication expectations, emergency protocols, and program guidelines — structured and ready to personalize.",
    category: "Communication",
  },
  {
    title: "Tour Workflow Example",
    description: "A guided script and walkthrough structure for confident, warm, conversion-ready home tours with prospective families.",
    category: "Marketing",
  },
  {
    title: "Calm Operational Systems",
    description: "Supply management, documentation habits, and daily systems that keep your program running smoothly without burnout.",
    category: "Sustainability",
  },
];

const categoryColors = {
  "Planning": "#4D5E49",
  "Legal & Compliance": "#C4956A",
  "Environment": "#7A8E76",
  "Operations": "#4D5E49",
  "Enrollment": "#C4956A",
  "Communication": "#7A8E76",
  "Marketing": "#4D5E49",
  "Sustainability": "#C4956A",
};

function OutcomeCard({ outcome, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const color = categoryColors[outcome.category] || "#4D5E49";

  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A1A",
        transition: `all 0.6s ease ${index * 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        filter: visible ? "blur(0)" : "blur(2px)",
      }}
    >
      {/* Document-style header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.3 }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.15 }} />
        </div>
        <span className="font-micro" style={{ color: color, fontSize: "0.6rem" }}>
          {outcome.category}
        </span>
      </div>

      {/* Horizontal rule — document feel */}
      <div className="w-full h-px" style={{ backgroundColor: `${color}22` }} />

      <h3 className="font-display text-lg leading-snug" style={{ color: "#2C2C2C" }}>
        {outcome.title}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: "#6B5E56" }}>
        {outcome.description}
      </p>

      {/* Mock document lines — editorial placeholder feel */}
      <div className="mt-2 space-y-1.5 pt-3" style={{ borderTop: `1px solid ${color}18` }}>
        {[80, 65, 90].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, backgroundColor: `${color}18` }} />
        ))}
      </div>
    </div>
  );
}

export default function WalkAwaySection() {
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
    <section className="py-24 md:py-36" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-16"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)",
          }}
        >
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Tangible Outcomes
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
              What You'll Actually
              <br />
              <em style={{ color: "#4D5E49" }}>Walk Away With.</em>
            </h2>
            <p className="font-body md:max-w-sm leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
              The Mama Launch Method isn't just inspiration — it produces real, operational assets you can hold, use, and build from. Here's what you'll have completed by the time your doors open.
            </p>
          </div>
        </div>

        {/* Outcome cards — document/asset styling */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomes.map((outcome, i) => (
            <OutcomeCard key={outcome.title} outcome={outcome} index={i} />
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <p
            className="font-body mb-6 mx-auto leading-relaxed"
            style={{ color: "#5C5148", maxWidth: "480px", fontSize: "0.95rem" }}
          >
            These are the operational foundations of a real, running home childcare program — built calmly, step by step, through the Mama Launch Method.
          </p>
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-10 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem", boxShadow: "0 8px 32px rgba(77,94,73,0.22)" }}
          >
            Start Your Launch Path
          </button>
        </div>
      </div>

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}