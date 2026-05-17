import React, { useRef, useEffect, useState } from "react";

const phases = [
  {
    number: "01",
    name: "Dream",
    tagline: "Clarity Before Construction",
    description:
      "You'll define the type of caregiver you want to be, the families you want to serve, and the childcare environment you want to create — before a single form is filed or dollar is spent.",
    emotional: "You'll move from scattered ideas to a clear, confident vision.",
    operational: "You'll complete your Childcare Ecosystem Blueprint — your personalized program vision document.",
    image: "https://images.unsplash.com/photo-1558618047-3d2e2c8e5be8?w=600&q=80",
  },
  {
    number: "02",
    name: "Foundation",
    tagline: "Licensing with Confidence",
    description:
      "We walk through your state's licensing requirements, home safety standards, insurance, and legal documentation — step by step, with organized checklists and clear action items.",
    emotional: "You'll feel grounded and prepared instead of overwhelmed by the legal process.",
    operational: "You'll complete your Licensing Organization System with every requirement documented and tracked.",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&q=80",
  },
  {
    number: "03",
    name: "Ecosystem",
    tagline: "Design Your Program",
    description:
      "You'll build your daily rhythms, room environments, toy rotations, sensory setups, curriculum philosophy, and operational routines — the living systems that make your program run beautifully.",
    emotional: "You'll feel like a real provider — not someone playing house, but someone building something meaningful.",
    operational: "You'll walk away with your Room Planning Worksheet, Daily Rhythm Framework, and Program Environment Guide.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    number: "04",
    name: "Launch",
    tagline: "Open Your Doors",
    description:
      "Your enrollment workflow, parent handbook, waitlist system, pricing, and launch-ready messaging — all structured so your first families experience a calm, professional, memorable onboarding.",
    emotional: "You'll feel ready — not perfect, but genuinely prepared.",
    operational: "You'll complete your Waitlist & Enrollment System, Parent Handbook structure, and Tour Workflow.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80",
  },
  {
    number: "05",
    name: "Open",
    tagline: "Sustain & Grow",
    description:
      "The launch is just the beginning. We help you refine your operations, manage the rhythm of a live program, deepen community roots, and grow with intention rather than urgency.",
    emotional: "You'll feel sustainable — running a program that fits your life rather than consuming it.",
    operational: "You'll build your Ongoing Operations Framework and Calm Growth System.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
  },
];

function PhaseCard({ phase, index }) {
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
      className="flex-none w-80 md:w-[22rem]"
      style={{
        transition: `all 0.7s ease ${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        filter: visible ? "blur(0)" : "blur(4px)",
      }}
    >
      <div
        className="relative rounded-3xl overflow-hidden flex flex-col h-full"
        style={{ backgroundColor: "#F0EBE1", border: "1px solid #C4956A33" }}
      >
        {/* Clay numeral watermark */}
        <div className="absolute top-4 right-5 z-10 select-none pointer-events-none">
          <span className="font-display font-bold" style={{ color: "#C4956A", opacity: 0.15, fontSize: "5rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
            {phase.number}
          </span>
        </div>

        {/* Image */}
        <div className="h-44 overflow-hidden flex-none">
          <img
            src={phase.image}
            alt={phase.name}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.65) brightness(0.97)" }}
          />
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col flex-1">
          <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.68rem" }}>
            Phase {phase.number}
          </p>
          <h3 className="font-display text-2xl mb-1" style={{ color: "#2C2C2C" }}>
            {phase.name}
          </h3>
          <p className="font-body text-sm italic mb-4" style={{ color: "#4D5E49" }}>
            {phase.tagline}
          </p>
          <div className="w-8 h-px mb-4" style={{ backgroundColor: "#C4956A" }} />
          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#5C5148" }}>
            {phase.description}
          </p>

          <div className="mt-auto space-y-3 pt-4" style={{ borderTop: "1px solid #C4956A22" }}>
            <div className="flex items-start gap-2">
              <span className="flex-none mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
              <p className="font-body text-xs leading-relaxed" style={{ color: "#4D5E49" }}>
                <strong style={{ fontWeight: 500 }}>Feel: </strong>{phase.emotional}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex-none mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C4956A" }} />
              <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>
                <strong style={{ fontWeight: 500 }}>Walk away with: </strong>{phase.operational}
              </p>
            </div>
          </div>
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
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="method" className="py-24 md:py-36 overflow-hidden" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-14"
        style={{
          transition: "all 0.8s ease",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(28px)",
          filter: headerVisible ? "blur(0)" : "blur(3px)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Implementation Roadmap
            </p>
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
              The Mama Launch Method
              <br />
              <em style={{ color: "#4D5E49" }}>Five Phases. Real Outcomes.</em>
            </h2>
          </div>
          <p className="font-body md:max-w-sm leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
            A guided implementation roadmap that takes you from vision to a live, operational home childcare program — with the systems, templates, and community support to do it right.
          </p>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-12"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {phases.map((phase, i) => (
          <PhaseCard key={phase.number} phase={phase} index={i} />
        ))}
        <div className="flex-none w-6 md:w-12" />
      </div>

      <div className="flex items-center justify-center gap-3 mt-5 px-6">
        <div className="w-12 h-px" style={{ backgroundColor: "#C4956A33" }} />
        <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem" }}>
          Drag to explore all phases
        </p>
        <div className="w-12 h-px" style={{ backgroundColor: "#C4956A33" }} />
      </div>

      <div className="w-full h-px mt-20" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}