import React, { useRef, useEffect, useState } from "react";
import { Map, BookOpen, FileText, Clock, Sparkles, Rocket } from "lucide-react";

const features = [
  { icon: Map,       title: "Find Your Path",              body: "Take the quiz and get a starting point matched to your life and goals." },
  { icon: BookOpen,  title: "Build Your Foundation",        body: "Structure your hours, group size, and program model with guided prompts." },
  { icon: FileText,  title: "Understand Setup Steps",       body: "Get state-specific licensing guidance so you know what's needed to open." },
  { icon: Clock,     title: "Grow With Clarity",            body: "Create schedules, pricing, and a parent handbook with ready-to-use templates." },
  { icon: Sparkles,  title: "Get Templates & AI Support",   body: "Everything organized by phase, powered by smart tools that adapt to your program." },
  { icon: Rocket,    title: "Prepare to Launch",            body: "Move from idea to opening day with a clear roadmap and community support." },
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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-10 md:py-16">

        {/* Header */}
        <div
          className="text-center mb-8 md:mb-12"
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
          <p className="font-body mx-auto mt-3" style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.65", maxWidth: "44ch" }}>
            Coming soon. Here's what's being built for you.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#FFFDF9",
                  border: "1px solid rgba(196,149,106,0.14)",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  boxShadow: "0 2px 8px rgba(44,44,44,0.04)",
                  transition: `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "#4D5E4912", border: "1px solid #4D5E4920" }}
                >
                  <Icon size={15} style={{ color: "#4D5E49" }} />
                </div>
                <h3 className="font-display mb-1" style={{ color: "#2C2C2C", fontSize: "0.95rem", lineHeight: "1.3" }}>
                  {f.title}
                </h3>
                <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.78rem", lineHeight: "1.55" }}>
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