import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const pathways = [
  "Home Daycare / Nursery",
  "Part-Time Nursery",
  "Drop-In Care",
  "Kids Classes & Enrichment",
  "Mommy & Me / Caregiver & Me",
  "Playgroup / Open Play",
  "Homeschool Pod",
  "Nanny-Style / Private Care",
  "Hybrid Model",
];

export default function PathwaysSection() {
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
      id="pathways"
      ref={ref}
      style={{
        backgroundColor: "#FAF7F2",
        borderTop: "1px solid rgba(196,149,106,0.08)",
        scrollMarginTop: "96px",
      }}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 md:py-20">

        {/* Header */}
        <div
          className="text-center mb-10"
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            MODERN CHILDCARE PATHWAYS
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 3.8vw, 3rem)", lineHeight: "1.2" }}>
            More ways to build a childcare
            <br />
            <em style={{ color: "#4D5E49" }}>business around your life.</em>
          </h2>
          <p className="font-body mx-auto" style={{ color: "#5C5148", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "50ch" }}>
            Mama Launch Studio will support all of these modern childcare models. You do not have to know which one is right yet — the quiz helps you find your starting point.
          </p>
        </div>

        {/* Pathway pills grid */}
        <div
          className="flex flex-wrap gap-3 justify-center mb-10"
          style={{
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          {pathways.map((p, i) => (
            <span
              key={p}
              className="font-body"
              style={{
                backgroundColor: i % 3 === 0 ? "rgba(77,94,73,0.08)" : i % 3 === 1 ? "rgba(196,149,106,0.10)" : "rgba(44,44,44,0.05)",
                border: i % 3 === 0 ? "1px solid rgba(77,94,73,0.18)" : i % 3 === 1 ? "1px solid rgba(196,149,106,0.22)" : "1px solid rgba(44,44,44,0.10)",
                color: i % 3 === 0 ? "#4D5E49" : i % 3 === 1 ? "#A07845" : "#5C5148",
                borderRadius: "999px",
                padding: "10px 20px",
                fontSize: "0.9rem",
                lineHeight: "1",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Quiz CTA */}
        <div
          className="text-center"
          style={{
            transition: "opacity 0.6s ease 0.25s",
            opacity: visible ? 1 : 0,
          }}
        >
          <p className="font-body mb-5" style={{ color: "#7A6E65", fontSize: "0.95rem" }}>
            Not sure which fits your season, goals, and strengths?
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="font-micro text-white px-8 py-4 rounded-full"
            style={{
              backgroundColor: "#4D5E49",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              boxShadow: "0 6px 24px rgba(77,94,73,0.28)",
            }}
          >
            Take the Free Childcare Fit Quiz
          </button>
        </div>

      </div>
    </section>
  );
}