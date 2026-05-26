import React, { useRef, useEffect, useState } from "react";

export default function FoundingCohortSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  const milestones = [
    { label: "Enrollment closes", date: "June 30, 2026" },
    { label: "Founding cohort begins", date: "July 8, 2026" },
  ];

  return (
    <section style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <style>{`
        .cohort-cta-btn {
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .cohort-cta-btn:hover {
          box-shadow: 0 10px 32px rgba(77,94,73,0.34) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div
        ref={ref}
        className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-10 text-center"
      >
        {/* Eyebrow */}
        <p
          className="font-micro mb-5 inline-flex items-center gap-3"
          style={{ color: "#C4956A", fontSize: "0.72rem", ...anim(0) }}
        >
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          FOUNDING COHORT BEGINS
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        {/* Headline */}
        <h2
          className="font-display leading-tight mb-3"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: "1.15", ...anim(0.18) }}
        >
          A small cohort.<br />
          <em style={{ color: "#4D5E49" }}>A supported start.</em>
        </h2>

        {/* Body */}
        <p
          className="font-body mx-auto leading-relaxed mb-5"
          style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.68", maxWidth: "40ch", ...anim(0.26) }}
        >
          The first Mama Launch cohort opens July 8, 2026 with a limited number of founding members.
        </p>

        {/* Soft divider — desktop tighter */}
        <div style={{ ...anim(0.32), display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ flex: 1, maxWidth: "60px", height: "1px", backgroundColor: "rgba(196,149,106,0.18)" }} />
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "rgba(196,149,106,0.35)" }} />
          <span style={{ flex: 1, maxWidth: "60px", height: "1px", backgroundColor: "rgba(196,149,106,0.18)" }} />
        </div>

        {/* Timeline milestones */}
        <div
          className="inline-flex flex-col gap-0 mx-auto mb-5"
          style={{ ...anim(0.38), alignItems: "stretch", minWidth: "220px" }}
        >
          {milestones.map((m, i) => (
            <div key={m.label}>
              <div className="flex items-center gap-3 py-2.5 px-4 rounded-xl"
                style={{ backgroundColor: i === 1 ? "rgba(77,94,73,0.05)" : "transparent" }}>
                {/* dot */}
                <div style={{
                  flexShrink: 0,
                  width: "8px", height: "8px",
                  borderRadius: "50%",
                  backgroundColor: i === 1 ? "#4D5E49" : "rgba(196,149,106,0.45)",
                  border: i === 1 ? "none" : "1px solid rgba(196,149,106,0.5)"
                }} />
                <span className="font-body" style={{ color: "#7A6E65", fontSize: "0.8rem", flex: 1, textAlign: "left" }}>{m.label}</span>
                <span className="font-micro" style={{ color: i === 1 ? "#4D5E49" : "#A8917A", fontSize: "0.66rem", letterSpacing: "0.06em" }}>{m.date}</span>
              </div>
              {i < milestones.length - 1 && (
                <div className="flex justify-start pl-[19px]">
                  <div style={{ width: "1px", height: "8px", backgroundColor: "rgba(196,149,106,0.20)" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={anim(0.44)}>
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="cohort-cta-btn font-micro text-white px-8 py-4 rounded-full min-h-[52px]"
            style={{
              backgroundColor: "#4D5E49",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)"
            }}
          >
            Join the Founding Member Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}