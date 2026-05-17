import React, { useRef, useEffect, useState } from "react";

const phases = [
  {
    number: "01",
    name: "Dream",
    tagline: "Clarity Before Construction",
    description:
      "We begin with vision. You'll define the type of caregiver you want to be, the families you want to serve, and the life you want to build — before a single form is filed.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  },
  {
    number: "02",
    name: "Foundation",
    tagline: "Licensing with Confidence",
    description:
      "Navigating your state's licensing requirements, home safety standards, and insurance needs — step by step, never alone. We make the legal feel approachable.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    number: "03",
    name: "Ecosystem",
    tagline: "Design Your Program",
    description:
      "Craft your curriculum philosophy, daily rhythms, and enrollment policies. Build a program that reflects your values and attracts the families meant for your space.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    number: "04",
    name: "Launch",
    tagline: "Open Your Doors",
    description:
      "Your marketing, your first enrollment, your pricing — done with intention. We'll guide you through your soft opening and help you build momentum from day one.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    number: "05",
    name: "Open",
    tagline: "Sustain & Grow",
    description:
      "The launch is just the beginning. We help you refine operations, manage growth sustainably, and deepen your impact in your community — season after season.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
  },
];

function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex-none w-80 md:w-96"
      style={{
        transition: `all 0.7s ease ${index * 120}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        filter: visible ? "blur(0)" : "blur(4px)",
      }}
    >
      <div
        className="relative rounded-3xl overflow-hidden h-full"
        style={{
          backgroundColor: "#F0EBE1",
          border: "1px solid #C4956A33",
        }}
      >
        {/* Clay numeral */}
        <div className="absolute top-6 right-6 z-10">
          <span
            className="font-display text-7xl font-bold select-none"
            style={{ color: "#C4956A", opacity: 0.18, letterSpacing: "-0.04em" }}
          >
            {phase.number}
          </span>
        </div>

        {/* Image */}
        <div className="h-52 overflow-hidden">
          <img
            src={phase.image}
            alt={phase.name}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.7) brightness(0.95)" }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <p
            className="font-micro mb-3"
            style={{ color: "#C4956A", fontSize: "0.7rem" }}
          >
            Phase {phase.number}
          </p>
          <h3
            className="font-display text-3xl mb-2"
            style={{ color: "#2C2C2C" }}
          >
            {phase.name}
          </h3>
          <p
            className="font-body text-sm mb-4 italic"
            style={{ color: "#4D5E49" }}
          >
            {phase.tagline}
          </p>
          <div
            className="w-8 h-px mb-4"
            style={{ backgroundColor: "#C4956A" }}
          />
          <p className="font-body text-sm leading-relaxed" style={{ color: "#5C5148" }}>
            {phase.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MethodSection() {
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="method"
      className="py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Top horizon line */}
      <div
        className="w-full h-px mb-24"
        style={{ backgroundColor: "#C4956A", opacity: 0.3 }}
      />

      {/* Section Header */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-16"
        style={{
          transition: "all 0.8s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(28px)",
          filter: headerVisible ? "blur(0)" : "blur(3px)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className="font-micro mb-4 flex items-center gap-3"
              style={{ color: "#C4956A", fontSize: "0.75rem" }}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Signature Framework
            </p>
            <h2
              className="font-display leading-tight"
              style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
            >
              The 5-Phase
              <br />
              <em style={{ color: "#4D5E49" }}>Launch Method</em>
            </h2>
          </div>
          <p
            className="font-body md:max-w-sm leading-relaxed"
            style={{ color: "#5C5148", fontSize: "1rem" }}
          >
            Five intentional phases that take you from dream to open doors — without rushing, without guessing, without overwhelm.
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >
        {phases.map((phase, i) => (
          <PhaseCard key={phase.number} phase={phase} index={i} />
        ))}
        {/* End spacer */}
        <div className="flex-none w-6 md:w-12" />
      </div>

      {/* Scroll hint */}
      <div className="flex items-center justify-center gap-3 mt-6 px-6">
        <div className="w-16 h-px" style={{ backgroundColor: "#C4956A33" }} />
        <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem" }}>
          Scroll to explore all phases
        </p>
        <div className="w-16 h-px" style={{ backgroundColor: "#C4956A33" }} />
      </div>

      {/* Bottom horizon line */}
      <div
        className="w-full h-px mt-24"
        style={{ backgroundColor: "#C4956A", opacity: 0.3 }}
      />
    </section>
  );
}