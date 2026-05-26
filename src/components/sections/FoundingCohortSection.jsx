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

  return (
    <section style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <style>{`
        @keyframes cohortFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
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
        className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-14 md:py-20 text-center"
      >
        {/* Eyebrow */}
        <p
          className="font-micro mb-4 inline-flex items-center gap-3"
          style={{
            color: "#C4956A", fontSize: "0.72rem",
            opacity: visible ? 1 : 0,
            animation: visible ? "cohortFadeUp 0.55s ease forwards" : "none",
          }}
        >
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          FOUNDING COHORT BEGINS
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        {/* Headline */}
        <h2
          className="font-display leading-tight mb-4"
          style={{
            color: "#2C2C2C", fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: "1.1",
            opacity: visible ? 1 : 0,
            animation: visible ? "cohortFadeUp 0.65s ease 0.1s forwards" : "none",
          }}
        >
          July 8th.
        </h2>

        {/* Subheadline */}
        <p
          className="font-display leading-snug mb-5 mx-auto"
          style={{
            color: "#4D5E49", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontStyle: "italic", lineHeight: "1.4", maxWidth: "22ch",
            opacity: visible ? 1 : 0,
            animation: visible ? "cohortFadeUp 0.65s ease 0.2s forwards" : "none",
          }}
        >
          A small cohort. A supported start.
        </p>

        {/* Body */}
        <p
          className="font-body mx-auto leading-relaxed mb-3"
          style={{
            color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.65", maxWidth: "42ch",
            opacity: visible ? 1 : 0,
            animation: visible ? "cohortFadeUp 0.6s ease 0.3s forwards" : "none",
          }}
        >
          The first Mama Launch cohort opens July 8th with a limited number of founding members.
        </p>

        {/* Closing date */}
        <p
          className="font-micro"
          style={{
            color: "#9a8f84", fontSize: "0.66rem", letterSpacing: "0.08em",
            opacity: visible ? 1 : 0,
            animation: visible ? "cohortFadeUp 0.6s ease 0.38s forwards" : "none",
          }}
        >
          Enrollment closes June 30th.
        </p>

        {/* Desktop CTA — animated */}
        <div
          className="hidden md:flex justify-center mt-8"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? "cohortFadeUp 0.6s ease 0.46s forwards" : "none",
          }}
        >
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

        {/* Mobile CTA — no animation */}
        <div className="md:hidden flex justify-center mt-8">
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-8 py-4 rounded-full transition-all min-h-[52px]"
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