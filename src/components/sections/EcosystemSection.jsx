import React, { useRef, useEffect, useState } from "react";

const pillars = [
  {
    num: "01",
    title: "Implementation-First Guidance",
    description:
      "Every phase of the Mama Launch Method comes with structured checklists, templates, and operational tools — so you're always moving forward, never just consuming content.",
    items: [
      "State-specific licensing roadmaps",
      "Phase-by-phase implementation checklists",
      "Downloadable templates and workbooks",
      "Guided action steps in every module",
    ],
    offsetY: 0,
  },
  {
    num: "02",
    title: "A Village That Moves Forward",
    description:
      "The Mama Launch community is implementation-focused, milestone-driven, and uplifting. We celebrate progress, share what's actually working, and move through the method together — a village helping a village.",
    items: [
      "Private peer implementation community",
      "Cohort-based milestone tracking",
      "Monthly live community calls",
      "Phase-organized peer support groups",
    ],
    offsetY: 24,
  },
  {
    num: "03",
    title: "Completion Certificate",
    description:
      "Members who complete the Mama Launch Method receive a completion certificate showing they worked through the five-phase implementation framework.",
    items: [
      "Completion of all 5 phases",
      "Full portfolio of operational documents",
      "Childcare Ecosystem Blueprint finalized",
      "Community milestone recognition",
    ],
    note: "This is not a state license or legal endorsement — it's a meaningful marker of the systems, planning, and intentional foundation you built.",
    offsetY: -8,
  },
];

function PillarCard({ pillar, index }) {
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
      className="rounded-3xl p-8 flex flex-col"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A1A",
        marginTop: `${pillar.offsetY}px`,
        transition: `all 0.8s ease ${index * 160}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        filter: visible ? "blur(0)" : "blur(3px)",
        boxShadow: "0 6px 40px rgba(196,149,106,0.05)",
      }}
    >
      <div className="w-8 h-8 rounded-full mb-6 flex items-center justify-center flex-none" style={{ backgroundColor: "#4D5E49" }}>
        <span className="font-display text-white" style={{ fontSize: "0.7rem" }}>{pillar.num}</span>
      </div>

      <h3 className="font-display text-xl mb-3" style={{ color: "#2C2C2C" }}>{pillar.title}</h3>
      <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#5C5148" }}>{pillar.description}</p>

      <div className="w-full h-px mb-5" style={{ backgroundColor: "#C4956A28" }} />

      <ul className="flex flex-col gap-3 flex-1">
        {pillar.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
            <span className="font-body text-sm" style={{ color: "#5C5148" }}>{item}</span>
          </li>
        ))}
      </ul>

      {pillar.note && (
        <p className="font-body mt-5 pt-4 text-xs italic leading-relaxed" style={{ color: "#9a8f84", borderTop: "1px solid #C4956A18" }}>
          {pillar.note}
        </p>
      )}
    </div>
  );
}

export default function EcosystemSection() {
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
    <section id="ecosystem" className="py-24 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="text-center mb-14"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)",
          }}
        >
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Community & Support
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2
            className="font-display leading-tight mx-auto mb-5"
            style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.6rem)", maxWidth: "660px" }}
          >
            Implementation Support,{" "}
            <em style={{ color: "#4D5E49" }}>Not Just Inspiration.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "520px", fontSize: "0.98rem" }}>
            The Mama Launch community is operationally focused, uplifting, and milestone-driven — a village helping a village build something real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.num} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Grounded quote */}
        <div className="mt-20 text-center mx-auto max-w-xl">
          <div className="w-10 h-px mx-auto mb-7" style={{ backgroundColor: "#C4956A" }} />
          <blockquote className="font-display text-xl md:text-2xl leading-relaxed mb-5" style={{ color: "#2C2C2C", fontStyle: "italic" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.68rem" }}>
            — Early Access Member, Mama Launch Studio
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}