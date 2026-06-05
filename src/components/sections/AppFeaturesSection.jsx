import React, { useRef, useEffect, useState } from "react";
import { Map, BookOpen, FileText, Clock, Sparkles, Rocket } from "lucide-react";

const features = [
  { icon: Map,       title: "Discover your best-fit childcare pathway",       body: "Answer a few questions and get a clear starting point matched to your life, goals, and season." },
  { icon: BookOpen,  title: "Build your Program Foundation",                   body: "Structure your hours, age range, group size, and program model with guided prompts." },
  { icon: FileText,  title: "Understand licensing and setup next steps",        body: "Get state-specific guidance on what you'll need to open legally and safely." },
  { icon: Clock,     title: "Create schedules, pricing, and policies",          body: "Build your daily rhythm, tuition structure, and parent handbook with ready-to-use templates." },
  { icon: Sparkles,  title: "Access templates, resources, and AI support",      body: "Everything you need — organized by phase and powered by smart tools that adapt to your program." },
  { icon: Rocket,    title: "Launch with clarity and less overwhelm",           body: "Move from idea to opening day with a clear roadmap, community support, and a plan that fits real motherhood." },
];

export default function AppFeaturesSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#F0EBE1",
        borderTop: "1px solid rgba(196,149,106,0.08)",
        overflow: "hidden",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-14 md:py-20">

        {/* Header */}
        <div
          className="text-center mb-10 md:mb-14"
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            THE APP EXPERIENCE
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 3.8vw, 3rem)", lineHeight: "1.2" }}>
            What Mama Launch Studio
            <br />
            <em style={{ color: "#4D5E49" }}>will help you do.</em>
          </h2>
          <p className="font-body mx-auto mt-4" style={{ color: "#5C5148", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "52ch" }}>
            The full app is coming soon. Here's what's being built for mothers who want to create a childcare program that actually fits their life.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#FFFDF9",
                  border: "1px solid rgba(196,149,106,0.14)",
                  borderRadius: "18px",
                  padding: "22px 24px",
                  boxShadow: "0 2px 12px rgba(44,44,44,0.04)",
                  transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#4D5E4912", border: "1px solid #4D5E4920" }}
                >
                  <Icon size={18} style={{ color: "#4D5E49" }} />
                </div>
                <h3 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.1rem", lineHeight: "1.3" }}>
                  {f.title}
                </h3>
                <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.9rem", lineHeight: "1.6" }}>
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}