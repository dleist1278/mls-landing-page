import React, { useRef, useEffect, useState } from "react";

const pillars = [
  {
    title: "Implementation-First Guidance",
    description:
      "Every phase of the Mama Launch Method comes with structured guidance, checklists, templates, and operational systems — so you're never just watching a video and wondering what to do next.",
    items: [
      "State-specific licensing roadmaps",
      "Step-by-step implementation checklists",
      "Downloadable templates and workbooks",
      "Guided action steps in every phase",
    ],
    offsetY: 0,
  },
  {
    title: "A Village That Moves Forward",
    description:
      "The Mama Launch community is implementation-focused, milestone-driven, and uplifting. We celebrate progress. We share what's actually working. And we move through the method together — as a village helping a village.",
    items: [
      "Private implementation community",
      "Cohort-based milestone tracking",
      "Monthly live community calls",
      "Peer support organized by program phase",
    ],
    offsetY: 28,
  },
  {
    title: "Mama Launch Method Completion",
    description:
      "Upon completing the full Mama Launch Method framework, you'll receive a Mama Launch Method Completion acknowledgment — recognizing your commitment to building an intentional, structured childcare program.",
    items: [
      "Completion of all 5 phases",
      "Full portfolio of operational documents",
      "Childcare Ecosystem Blueprint finalized",
      "Community recognition milestone",
    ],
    offsetY: -12,
    note: "This represents completion of the Mama Launch framework — not a licensing, accreditation, or formal childcare credential.",
  },
];

function PillarCard({ pillar, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-8 relative flex flex-col"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A22",
        marginTop: `${pillar.offsetY}px`,
        transition: `all 0.8s ease ${index * 180}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        filter: visible ? "blur(0)" : "blur(3px)",
        boxShadow: "inset 0 1px 0 rgba(196,149,106,0.2), 0 8px 40px rgba(196,149,106,0.05)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-20 rounded-t-3xl pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(196,149,106,0.06), transparent)" }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <div
          className="w-8 h-8 rounded-full mb-6 flex items-center justify-center flex-none"
          style={{ backgroundColor: "#4D5E49" }}
        >
          <span className="font-display text-white text-xs" style={{ letterSpacing: "-0.01em" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display text-2xl mb-4" style={{ color: "#2C2C2C" }}>
          {pillar.title}
        </h3>

        <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#5C5148" }}>
          {pillar.description}
        </p>

        <div className="w-full h-px mb-5" style={{ backgroundColor: "#C4956A33" }} />

        <ul className="flex flex-col gap-3 flex-1">
          {pillar.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
              <span className="font-body text-sm" style={{ color: "#5C5148" }}>{item}</span>
            </li>
          ))}
        </ul>

        {pillar.note && (
          <p className="font-body mt-5 pt-4 text-xs italic leading-relaxed" style={{ color: "#9a8f84", borderTop: "1px solid #C4956A22" }}>
            {pillar.note}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EcosystemSection() {
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
    <section id="ecosystem" className="py-24 md:py-36" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)",
          }}
        >
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Community & Support System
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2
            className="font-display leading-tight mx-auto"
            style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.8rem)", maxWidth: "700px" }}
          >
            Implementation Support,
            <br />
            <em style={{ color: "#4D5E49" }}>Not Just Inspiration.</em>
          </h2>
          <p
            className="font-body mt-6 mx-auto leading-relaxed"
            style={{ color: "#5C5148", maxWidth: "560px", fontSize: "1rem" }}
          >
            The Mama Launch ecosystem is operationally focused and community-centered. Every element is designed to keep you moving through the method — supported, accountable, and never alone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Quote */}
        <div className="mt-24 text-center mx-auto max-w-2xl">
          <div className="w-12 h-px mx-auto mb-8" style={{ backgroundColor: "#C4956A" }} />
          <blockquote className="font-display text-2xl md:text-3xl leading-relaxed mb-6" style={{ color: "#2C2C2C", fontStyle: "italic" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.72rem" }}>
            — Early Access Member, Mama Launch Studio
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}