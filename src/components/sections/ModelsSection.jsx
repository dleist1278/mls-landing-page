import React, { useRef, useEffect, useState } from "react";

const models = [
  {
    title: "Home Daycare & Nursery",
    subtitle: "Consistent • Licensed • Full-Time",
    description:
      "A structured, licensed daily program for a small group of children in your home. The Mama Launch Method guides you through every step of building a full-time program that serves families consistently.",
    features: [
      "State licensing navigation & documentation",
      "Infant through Pre-K program design",
      "Capacity, ratio & scheduling systems",
      "Tuition structure & enrollment workflow",
      "Daily rhythm & curriculum framework",
    ],
    accent: "#4D5E49",
    bg: "#F0EBE1",
  },
  {
    title: "Drop-In Childcare",
    subtitle: "Flexible • Part-Time • Community-Facing",
    description:
      "A part-time, as-needed care model for families who need occasional, reliable childcare. Ideal if you want to begin with flexibility and grow into a fuller program over time.",
    features: [
      "Flexible scheduling & booking systems",
      "Hourly & session pricing strategy",
      "Drop-in policies & safety protocols",
      "Digital enrollment & waiver setup",
      "Community visibility & referral systems",
    ],
    accent: "#C4956A",
    bg: "#FAF7F2",
  },
  {
    title: "Small-Group Caregiver Care",
    subtitle: "Collaborative • Village-Centered • Shared",
    description:
      "A cooperative model built on mutual investment among a small circle of families. Village-Centered Care — where community is the program, and you are the trusted facilitator.",
    features: [
      "Co-op structure, agreements & roles",
      "Shared resource & supply planning",
      "Rotating schedule & facilitation systems",
      "Community care philosophy & policies",
      "Conflict resolution & family communication",
    ],
    accent: "#2C2C2C",
    bg: "#F0EBE1",
  },
];

function ModelCard({ model, index }) {
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
      className="rounded-3xl p-8 md:p-10 flex flex-col"
      style={{
        backgroundColor: model.bg,
        border: "1px solid #C4956A22",
        transition: `all 0.8s ease ${index * 150}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${32 + index * 8}px)`,
        filter: visible ? "blur(0)" : "blur(3px)",
        boxShadow: "0 4px 40px rgba(196,149,106,0.07)",
      }}
    >
      <div className="w-10 h-1 rounded-full mb-7" style={{ backgroundColor: model.accent }} />
      <p className="font-micro mb-2" style={{ color: model.accent, fontSize: "0.68rem" }}>
        {model.subtitle}
      </p>
      <h3 className="font-display text-2xl md:text-3xl mb-4" style={{ color: "#2C2C2C" }}>
        {model.title}
      </h3>
      <p className="font-body text-sm leading-relaxed mb-8" style={{ color: "#5C5148" }}>
        {model.description}
      </p>
      <div className="mt-auto">
        <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>
          Guided through the Mama Launch Method
        </p>
        <div className="w-full h-px mb-5" style={{ backgroundColor: "#C4956A22" }} />
        <ul className="flex flex-col gap-3">
          {model.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-1.5 flex-none w-2 h-2 rounded-full" style={{ backgroundColor: model.accent }} />
              <span className="font-body text-sm" style={{ color: "#5C5148" }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ModelsSection() {
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
    <section id="models" className="py-24 md:py-36" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            Three Ways to Structure Your Program
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}>
              One Method.
              <br />
              <em style={{ color: "#4D5E49" }}>Your Structure.</em>
            </h2>
            <p className="font-body md:max-w-sm leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
              The Mama Launch Method is flexible by design. These are not separate businesses — they're three ways to structure a modern home childcare program that fits your life.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <ModelCard key={model.title} model={model} index={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-10 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}
          >
            Apply for Early Access
          </button>
        </div>
      </div>
    </section>
  );
}