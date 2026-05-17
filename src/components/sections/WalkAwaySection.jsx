import React, { useRef, useEffect, useState } from "react";

const outcomes = [
  { title: "Childcare Ecosystem Blueprint", description: "Your complete program vision document — model, philosophy, environment, and family experience.", category: "Planning", color: "#4D5E49" },
  { title: "Licensing Organization Plan", description: "Every requirement, document, and deadline organized so nothing falls through the cracks.", category: "Legal", color: "#C4956A" },
  { title: "Room & Environment Plan", description: "A guided space design framework for calm, organized, developmentally appropriate childcare at home.", category: "Environment", color: "#6B7E67" },
  { title: "Parent Handbook + Policy Guidance", description: "Policies, communication expectations, emergency protocols — structured and ready to personalize.", category: "Communication", color: "#4D5E49" },
  { title: "Waitlist & Tour Workflow", description: "A professional intake, waitlist, and home tour workflow that makes your first families feel confident.", category: "Enrollment", color: "#C4956A" },
  { title: "Launch Messaging + Outreach Plan", description: "Your launch-ready messaging, community outreach approach, and first enrollment strategy.", category: "Marketing", color: "#6B7E67" },
];

function OutcomeCard({ outcome, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 flex flex-col"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A18",
        transition: `all 0.6s ease ${index * 55}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        filter: visible ? "blur(0)" : "blur(2px)",
      }}
    >
      {/* Document top bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: outcome.color, opacity: 0.55 }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: outcome.color, opacity: 0.28 }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: outcome.color, opacity: 0.12 }} />
        </div>
        <span className="font-micro" style={{ color: outcome.color, fontSize: "0.58rem" }}>{outcome.category}</span>
      </div>
      <div className="w-full h-px mb-4" style={{ backgroundColor: `${outcome.color}20` }} />

      <h3 className="font-display text-base leading-snug mb-2" style={{ color: "#2C2C2C" }}>{outcome.title}</h3>
      <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "#6B5E56" }}>{outcome.description}</p>

      {/* Mock document lines */}
      <div className="mt-auto pt-4 space-y-2" style={{ borderTop: `1px solid ${outcome.color}15` }}>
        {[75, 55, 85].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, backgroundColor: `${outcome.color}14` }} />
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
      { threshold: 0.08 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="mb-14"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)",
          }}
        >
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Tangible Outcomes
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
              What You'll Actually
              <br />
              <em style={{ color: "#4D5E49" }}>Walk Away With.</em>
            </h2>
            <p className="font-body md:max-w-xs leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
              The Mama Launch Method produces real operational assets — not just new knowledge. Here's what you'll have built by the time your doors open.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.map((outcome, i) => (
            <OutcomeCard key={outcome.title} outcome={outcome} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-body mb-6 mx-auto" style={{ color: "#5C5148", maxWidth: "440px", fontSize: "0.92rem", lineHeight: "1.7" }}>
            These are the operational foundations of a real, running home childcare program — built step by step through the Mama Launch Method.
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

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}