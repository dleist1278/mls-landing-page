import React, { useRef, useEffect, useState } from "react";

const ecosystemPillars = [
  {
    number: "01",
    title: "Vision & Structure",
    description:
      "Clarify your childcare philosophy, daily rhythm, licensing direction, family-aligned schedule, and the type of program you want to build — so every decision that follows has a clear foundation.",
    tags: ["Program philosophy", "Licensing direction", "Family-aligned schedule", "Program model clarity"],
    accent: "#4D5E49",
    imageAlt: "Childcare Ecosystem Blueprint — vision and program structure",
  },
  {
    number: "02",
    title: "Environment & Rhythm",
    description:
      "Design calm, organized childcare spaces and daily routines that support movement, safety, independence, emotional regulation, and real family life — inside a home that works for everyone in it.",
    tags: ["Room planning", "Daily rhythm design", "Sensory & play environments", "Calm organizational systems"],
    accent: "#C4956A",
    imageAlt: "Room planning worksheet and daily rhythm framework",
  },
  {
    number: "03",
    title: "Parent Experience",
    description:
      "Build trust-centered communication systems — from the first tour to enrollment, onboarding, policies, and ongoing family connection — so parents feel held and your program feels professional.",
    tags: ["Home tour workflow", "Enrollment & onboarding", "Parent communication systems", "Policy guidance"],
    accent: "#6B7E67",
    imageAlt: "Parent handbook and enrollment workflow",
  },
  {
    number: "04",
    title: "Sustainable Operations",
    description:
      "Create the operational rhythms, workflows, and organizational habits that keep your program calm, manageable, and sustainable — so your childcare ecosystem grows without consuming your life.",
    tags: ["Operational routines", "Capacity & growth planning", "Launch-ready messaging", "Calm systems framework"],
    accent: "#4D5E49",
    imageAlt: "Operational systems and calm growth framework",
  },
];

function EcosystemPillar({ pillar, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

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
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? "md:[direction:rtl]" : ""}`}
      style={{
        transition: `all 0.8s ease ${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        filter: visible ? "blur(0)" : "blur(3px)",
      }}
    >
      {/* Image / placeholder block */}
      <div className={!isEven ? "md:[direction:ltr]" : ""}>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            aspectRatio: "4/3",
            backgroundColor: "#F0EBE1",
            border: `1px solid ${pillar.accent}22`,
            boxShadow: `0 12px 48px ${pillar.accent}12`,
          }}
        >
          {/* Placeholder layout — editorial document feel */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            {/* Mock header bar */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillar.accent, opacity: 0.5 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillar.accent, opacity: 0.25 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pillar.accent, opacity: 0.12 }} />
              </div>
              <span className="font-micro" style={{ color: pillar.accent, fontSize: "0.58rem", opacity: 0.6 }}>
                Mama Launch Method · {pillar.title}
              </span>
            </div>

            {/* Mock content area */}
            <div className="flex-1 flex flex-col justify-center py-6 gap-4">
              {/* Headline placeholder */}
              <div className="h-3 rounded-full w-3/4" style={{ backgroundColor: `${pillar.accent}28` }} />
              <div className="h-2 rounded-full w-full" style={{ backgroundColor: `${pillar.accent}14` }} />
              <div className="h-2 rounded-full w-5/6" style={{ backgroundColor: `${pillar.accent}14` }} />

              {/* Mock two-column layout */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="rounded-xl p-3 space-y-2" style={{ backgroundColor: `${pillar.accent}0A`, border: `1px solid ${pillar.accent}18` }}>
                  <div className="h-2 rounded-full w-4/5" style={{ backgroundColor: `${pillar.accent}22` }} />
                  <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: `${pillar.accent}12` }} />
                  <div className="h-1.5 rounded-full w-3/4" style={{ backgroundColor: `${pillar.accent}12` }} />
                </div>
                <div className="rounded-xl p-3 space-y-2" style={{ backgroundColor: `${pillar.accent}0A`, border: `1px solid ${pillar.accent}18` }}>
                  <div className="h-2 rounded-full w-3/5" style={{ backgroundColor: `${pillar.accent}22` }} />
                  <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: `${pillar.accent}12` }} />
                  <div className="h-1.5 rounded-full w-4/5" style={{ backgroundColor: `${pillar.accent}12` }} />
                </div>
              </div>

              {/* Mock checklist rows */}
              <div className="space-y-2 mt-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded flex-none flex items-center justify-center" style={{ backgroundColor: `${pillar.accent}18`, border: `1px solid ${pillar.accent}28` }}>
                      <div className="w-1.5 h-1 rounded-sm" style={{ backgroundColor: pillar.accent, opacity: 0.5 }} />
                    </div>
                    <div className="h-1.5 rounded-full flex-1" style={{ width: `${[85, 70, 90][i - 1]}%`, backgroundColor: `${pillar.accent}12` }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <div className="flex items-center gap-2 pt-4" style={{ borderTop: `1px solid ${pillar.accent}14` }}>
              <div className="w-4 h-px" style={{ backgroundColor: pillar.accent, opacity: 0.3 }} />
              <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.55rem" }}>
                Real workbooks and templates coming soon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className={!isEven ? "md:[direction:ltr]" : ""}>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-display text-4xl select-none"
            style={{ color: pillar.accent, opacity: 0.2, letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            {pillar.number}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: `${pillar.accent}22` }} />
        </div>

        <h3
          className="font-display mb-4"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", lineHeight: "1.2" }}
        >
          {pillar.title}
        </h3>

        <p className="font-body leading-relaxed mb-7" style={{ color: "#5C5148", fontSize: "0.98rem" }}>
          {pillar.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {pillar.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: `${pillar.accent}0C`,
                color: pillar.accent,
                border: `1px solid ${pillar.accent}22`,
              }}
            >
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

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-20"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)",
          }}
        >
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Childcare Ecosystem
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2
              className="font-display leading-tight"
              style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}
            >
              Building Your
              <br />
              <em style={{ color: "#4D5E49" }}>Childcare Ecosystem.</em>
            </h2>
            <p
              className="font-body md:max-w-xs leading-relaxed"
              style={{ color: "#5C5148", fontSize: "0.95rem" }}
            >
              The Mama Launch Method builds four interconnected pillars — each one supporting the others to create a whole, sustainable childcare program.
            </p>
          </div>
        </div>

        {/* Alternating pillars */}
        <div className="flex flex-col gap-20 md:gap-28">
          {ecosystemPillars.map((pillar, i) => (
            <EcosystemPillar key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="w-10 h-px mx-auto mb-8" style={{ backgroundColor: "#C4956A44" }} />
          <p
            className="font-body mb-6 mx-auto"
            style={{ color: "#5C5148", maxWidth: "440px", fontSize: "0.95rem", lineHeight: "1.75" }}
          >
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

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}