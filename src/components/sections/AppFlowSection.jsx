import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    num: "01",
    title: "Take the Childcare Fit Quiz",
    body: "Answer 9 short questions about your goals, lifestyle, and strengths.",
    accent: "#C4956A",
  },
  {
    num: "02",
    title: "Get your Childcare Fit Result",
    body: "Receive your matched childcare pathway based on your answers.",
    accent: "#4D5E49",
  },
  {
    num: "03",
    title: "Confirm your pathway",
    body: "Review your best-fit model, explore your options, and save your result.",
    accent: "#C4956A",
  },
  {
    num: "04",
    title: "Build your Program Foundation",
    body: "Inside the app, structure your hours, age range, group size, and program identity.",
    accent: "#4D5E49",
  },
  {
    num: "05",
    title: "Move into licensing, setup, and launch planning",
    body: "Templates, checklists, state guidance, and a clear path to opening day.",
    accent: "#C4956A",
  },
];

export default function AppFlowSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

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
      }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 md:py-20">

        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            HOW IT WORKS
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 3.8vw, 3rem)", lineHeight: "1.2" }}>
            From quiz to launch —
            <br />
            <em style={{ color: "#4D5E49" }}>a clear path forward.</em>
          </h2>
          <p className="font-body mx-auto" style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.7", maxWidth: "44ch" }}>
            Start with the free quiz today. The full Mama Launch Studio app is coming soon to guide you through every step.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.num}>
              <div
                className="flex gap-5 items-start"
                style={{
                  transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {/* Left: number + connector */}
                <div className="flex flex-col items-center" style={{ flexShrink: 0, width: "44px" }}>
                  <div
                    className="flex items-center justify-center rounded-full font-display"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: step.accent,
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(196,149,106,0.25)", marginTop: "4px" }} />
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-8">
                  <h3 className="font-display mb-1" style={{ color: "#2C2C2C", fontSize: "1.2rem", lineHeight: "1.3" }}>
                    {step.title}
                  </h3>
                  <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.95rem", lineHeight: "1.6" }}>
                    {step.body}
                  </p>
                  {i === 0 && (
                    <button
                      onClick={() => navigate("/quiz")}
                      className="font-micro mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#4D5E49", fontSize: "0.68rem", letterSpacing: "0.1em", boxShadow: "0 4px 16px rgba(77,94,73,0.24)" }}
                    >
                      Start the Quiz →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}