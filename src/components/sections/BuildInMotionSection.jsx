import React, { useRef, useEffect, useState } from "react";

const progressMoments = [
  { title: "Nap time", description: "Review one checklist or answer one workbook prompt." },
  { title: "Laundry running", description: "Customize one policy, form, or template." },
  { title: "Dinner prep", description: "Listen, reflect, or plan your next small step." },
  { title: "Quiet evening", description: "Save your progress and know exactly what comes next." },
];

export default function BuildInMotionSection() {
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
    <section style={{ backgroundColor: "#F0EBE1", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* Mobile-only intro */}
      <div
        ref={ref}
        className="md:hidden max-w-3xl mx-auto px-5 sm:px-8 py-14 text-center"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)"
        }}
      >
        <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          BUILD IN MOTION
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        <h2
          className="font-display leading-tight mb-5 mx-auto"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2", maxWidth: "24ch" }}
        >
          You do not need uninterrupted hours{" "}
          <em style={{ color: "#4D5E49" }}>to make progress.</em>
        </h2>

        <p
          className="font-body mx-auto leading-relaxed"
          style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "50ch" }}
        >
          Chip away at your business while living real motherhood life — during nap time, laundry,
          dinner prep, school pickup, or quiet moments throughout the day.
        </p>
      </div>

      {/* Desktop-only: two-column editorial layout */}
      <div
        ref={ref}
        className="hidden md:grid max-w-6xl mx-auto px-12 py-16"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(56px, 6vw, 88px)",
          alignItems: "center",
          transition: "opacity 0.7s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Left: Photo — emotional anchor */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(196,149,106,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid rgba(196,149,106,0.10)",
          }}
        >
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5895f9396_Untitleddesign.png"
            alt="Mama Launch platform showing implementation tools and community village"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Right: Heading, moments, closing line */}
        <div>
          {/* Eyebrow */}
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem" }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "#C4956A" }} />
            BUILD IN MOTION
          </p>

          <h2
            className="font-display leading-tight mb-3"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: "1.15" }}
          >
            Small steps{" "}
            <em style={{ color: "#4D5E49" }}>still count.</em>
          </h2>

          <p
            className="font-body leading-relaxed mb-8"
            style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.7", maxWidth: "40ch" }}
          >
            Mama Launch Studio is designed so you can make progress in the pockets of time you already have.
          </p>

          {/* Progress moments — lightweight list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
            {progressMoments.map((moment) => (
              <div key={moment.title} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{
                  flexShrink: 0,
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#C4956A",
                  marginTop: "7px",
                }} />
                <div>
                  <p className="font-body" style={{ color: "#2C2C2C", fontSize: "0.9rem", fontWeight: 600, marginBottom: "1px" }}>
                    {moment.title}
                  </p>
                  <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.83rem", lineHeight: "1.5" }}>
                    {moment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <p className="font-body" style={{ color: "#9a8f84", fontSize: "0.82rem", lineHeight: "1.6", fontStyle: "italic" }}>
            Every saved answer, checklist, and template brings your business one step closer to launch.
          </p>
        </div>
      </div>

    </section>
  );
}