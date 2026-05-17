import React, { useRef, useEffect, useState } from "react";

const pillars = [
  {
    title: "Expert-Led Implementation",
    description:
      "Every phase is guided by childcare licensing experts, curriculum designers, and business coaches who understand both the heart and the logistics of this work.",
    items: [
      "State-specific licensing roadmaps",
      "Live expert Q&A sessions",
      "Vetted resource library",
      "Step-by-step implementation checklists",
    ],
    offsetY: 0,
  },
  {
    title: "A Community That Holds You",
    description:
      "You don't need a co-founder. You need women who understand. Our private community is your council — celebrating wins, navigating hard days, sharing what actually works.",
    items: [
      "Private peer community access",
      "Regional mama cohort groups",
      "Monthly live community calls",
      "Mentorship matching program",
    ],
    offsetY: 32,
  },
  {
    title: "Certification & Credentials",
    description:
      "Stand apart in your community with recognized credentials that signal your commitment to child development excellence and professional standards.",
    items: [
      "Mama Launch Certified™ designation",
      "CPR & First Aid guidance",
      "Child development curriculum certificate",
      "Portfolio of professional documentation",
    ],
    offsetY: -16,
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
      className="rounded-3xl p-8 relative"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A22",
        marginTop: `${pillar.offsetY}px`,
        transition: `all 0.8s ease ${index * 180}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        filter: visible ? "blur(0)" : "blur(3px)",
        boxShadow: "inset 0 1px 0 rgba(196,149,106,0.2), 0 8px 40px rgba(196,149,106,0.06)",
      }}
    >
      {/* Soft inner glow */}
      <div
        className="absolute top-0 left-0 right-0 h-24 rounded-t-3xl pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(196,149,106,0.07), transparent)",
        }}
      />

      <div className="relative z-10">
        <div
          className="w-8 h-8 rounded-full mb-6 flex items-center justify-center"
          style={{ backgroundColor: "#4D5E49" }}
        >
          <span
            className="font-display text-white text-sm"
            style={{ letterSpacing: "-0.01em" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="font-display text-2xl mb-4"
          style={{ color: "#2C2C2C" }}
        >
          {pillar.title}
        </h3>

        <p className="font-body text-sm leading-relaxed mb-8" style={{ color: "#5C5148" }}>
          {pillar.description}
        </p>

        <div className="w-full h-px mb-6" style={{ backgroundColor: "#C4956A33" }} />

        <ul className="flex flex-col gap-3">
          {pillar.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="mt-2 flex-none w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#4D5E49" }}
              />
              <span className="font-body text-sm" style={{ color: "#5C5148" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
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
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ecosystem"
      className="py-24 md:py-36"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div
        className="w-full h-px mb-24"
        style={{ backgroundColor: "#C4956A", opacity: 0.3 }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)",
          }}
        >
          <p
            className="font-micro mb-4 inline-flex items-center gap-3"
            style={{ color: "#C4956A", fontSize: "0.75rem" }}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Ecosystem
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2
            className="font-display leading-tight mx-auto"
            style={{
              color: "#2C2C2C",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              maxWidth: "700px",
            }}
          >
            You Don't Have to{" "}
            <em style={{ color: "#4D5E49" }}>Figure This Out Alone</em>
          </h2>
          <p
            className="font-body mt-6 mx-auto leading-relaxed"
            style={{ color: "#5C5148", maxWidth: "560px", fontSize: "1rem" }}
          >
            Membership means more than resources. It means being held by a community that understands the courage it takes to build something meaningful from home.
          </p>
        </div>

        {/* Cards — intentionally offset */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Testimonial / quote */}
        <div
          className="mt-24 text-center mx-auto max-w-2xl"
          style={{ padding: "0 1rem" }}
        >
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ backgroundColor: "#C4956A" }}
          />
          <blockquote
            className="font-display text-2xl md:text-3xl leading-relaxed mb-8"
            style={{ color: "#2C2C2C", fontStyle: "italic" }}
          >
            "I thought I needed a business degree. What I needed was someone who had already walked the path and was willing to light the way."
          </blockquote>
          <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.75rem" }}>
            — Sarah M., Licensed Home Daycare Provider, Ohio
          </p>
        </div>
      </div>

      <div
        className="w-full h-px mt-24"
        style={{ backgroundColor: "#C4956A", opacity: 0.3 }}
      />
    </section>
  );
}