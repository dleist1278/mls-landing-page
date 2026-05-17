import React, { useRef, useEffect, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Join the Waitlist",
    description: "Share a little about your vision and your readiness. We'll use this to understand where you are and what you need.",
  },
  {
    step: "02",
    title: "Receive Your Welcome",
    description: "Founding members receive a personal welcome, early access to Phase One materials, and an invitation to the founding community.",
  },
  {
    step: "03",
    title: "Begin Phase One Together",
    description: "You'll move through the Mama Launch Method with a cohort of founding members — guided, supported, and never alone.",
  },
  {
    step: "04",
    title: "Shape the Platform",
    description: "As a founding member, your feedback and experience directly influence how the platform evolves. You're not just a user — you're a co-architect.",
  },
  {
    step: "05",
    title: "Open Your Doors",
    description: "By the end of the method, you'll have a licensed, operational, enrollment-ready home childcare program — and a community standing with you.",
  },
];

export default function FoundingMemberSection() {
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
    <section className="py-24 md:py-36" style={{ backgroundColor: "#F0EBE1" }}>
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
            The Founding Member Experience
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
              What Happens After
              <br />
              <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
            </h2>
            <p className="font-body md:max-w-sm leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
              Mama Launch Studio is in early access. Here's exactly what founding members experience — transparently, honestly, and with full clarity.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line — desktop */}
          <div
            className="hidden md:block absolute left-[2.25rem] top-10 bottom-10 w-px"
            style={{ backgroundColor: "#C4956A33" }}
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <StepRow key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Transparency note */}
        <div
          className="mt-16 p-8 rounded-3xl"
          style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A22" }}
        >
          <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            A Note on Transparency
          </p>
          <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem", maxWidth: "680px" }}>
            Mama Launch Studio is a guided implementation platform in active development. Founding members receive early access, help shape the experience, and move through the Mama Launch Method as the platform evolves. This is a collaborative, community-centered launch — not a fully finished product. We believe in building with our community, not before them.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}
          >
            Apply for Early Access
          </button>
          <p className="font-body" style={{ color: "#9a8f84", fontSize: "0.85rem" }}>
            Founding member spots are limited.
          </p>
        </div>
      </div>
    </section>
  );
}

function StepRow({ step, index }) {
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
      className="flex gap-6 items-start"
      style={{
        transition: `all 0.7s ease ${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        filter: visible ? "blur(0)" : "blur(3px)",
      }}
    >
      {/* Step circle */}
      <div
        className="flex-none w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center z-10"
        style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A44" }}
      >
        <span className="font-display text-lg" style={{ color: "#C4956A", letterSpacing: "-0.02em" }}>
          {step.step}
        </span>
      </div>

      {/* Content */}
      <div className="pt-3 pb-4">
        <h3 className="font-display text-xl mb-2" style={{ color: "#2C2C2C" }}>
          {step.title}
        </h3>
        <p className="font-body text-sm leading-relaxed" style={{ color: "#5C5148", maxWidth: "560px" }}>
          {step.description}
        </p>
      </div>
    </div>
  );
}