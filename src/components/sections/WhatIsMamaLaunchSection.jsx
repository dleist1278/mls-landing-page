import React, { useRef, useEffect, useState } from "react";

const pillars = [
  { label: "Step-by-step phases", icon: "→" },
  { label: "Operational templates", icon: "→" },
  { label: "Licensing guidance", icon: "→" },
  { label: "Room & environment planning", icon: "→" },
  { label: "Community support", icon: "→" },
  { label: "Launch-ready systems", icon: "→" },
];

export default function WhatIsMamaLaunchSection() {
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
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F0EBE1" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
          style={{
            transition: "all 0.8s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            filter: visible ? "blur(0)" : "blur(3px)",
          }}
        >
          {/* Left — explanation */}
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Understanding the Platform
            </p>
            <h2
              className="font-display leading-tight mb-6"
              style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              What is{" "}
              <em style={{ color: "#4D5E49" }}>Mama Launch?</em>
            </h2>
            <p className="font-body leading-relaxed mb-6" style={{ color: "#5C5148", fontSize: "1.05rem" }}>
              Mama Launch is a guided implementation system that helps mothers build licensed home childcare programs through step-by-step phases, templates, operational tools, and community support.
            </p>
            <p className="font-body leading-relaxed mb-8" style={{ color: "#5C5148", fontSize: "1rem" }}>
              It's not a course you watch and forget. It's not a coaching program with vague action steps. It's a structured launch framework — designed specifically for mothers who want to build something real, intentional, and sustainable from their home.
            </p>
            <button
              onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro px-7 py-3.5 rounded-full border hover:bg-beige transition-all min-h-[48px] focus-sage"
              style={{ color: "#4D5E49", borderColor: "#4D5E49", fontSize: "0.78rem", backgroundColor: "transparent" }}
            >
              See the 5-Phase Method →
            </button>
          </div>

          {/* Right — what's included grid */}
          <div>
            <p className="font-micro mb-5" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
              What's included in the Mama Launch Method
            </p>
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="rounded-2xl px-5 py-4 flex items-center gap-3"
                  style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A1A" }}
                >
                  <span className="font-body text-sm" style={{ color: "#C4956A" }}>{p.icon}</span>
                  <span className="font-body text-sm leading-snug" style={{ color: "#5C5148" }}>{p.label}</span>
                </div>
              ))}
            </div>

            {/* Distinguisher note */}
            <div
              className="mt-6 p-5 rounded-2xl"
              style={{ backgroundColor: "#4D5E4908", border: "1px solid #4D5E4922" }}
            >
              <p className="font-body text-sm leading-relaxed" style={{ color: "#4D5E49" }}>
                <strong style={{ fontWeight: 600 }}>Who it's for:</strong> Mothers who are serious about building a calm, licensed, operational home childcare program — and want a structured path to get there without overwhelm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}