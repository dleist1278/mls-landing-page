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

      {/* Shared intro — mobile + desktop */}
      <div
        ref={ref}
        className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-14 md:py-20 text-center"
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
        className="hidden md:grid max-w-6xl mx-auto px-12 pb-20"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px, 6vw, 80px)",
          alignItems: "center",
          transition: "opacity 0.7s ease 0.2s",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Left: Photo */}
        <div
          className="rounded-[20px] overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(196,149,106,0.22), 0 6px 20px rgba(0,0,0,0.09)",
            border: "1px solid rgba(196,149,106,0.1)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1596496181165-27a147d34193?q=80&w=1200&auto=format&fit=crop"
            alt="Mother working on her business during a quiet moment at home"
            className="w-full h-full object-cover block"
            style={{ objectPosition: "center", filter: "saturate(0.88) brightness(0.97)", display: "block" }}
          />
        </div>

        {/* Right: Heading, copy, progress moments, closing line */}
        <div>
          <h3
            className="font-display leading-tight mb-3"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.3rem, 2vw, 1.7rem)", lineHeight: "1.2" }}
          >
            Small steps still count.
          </h3>
          <p
            className="font-body leading-relaxed mb-7"
            style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.7", maxWidth: "42ch" }}
          >
            Mama Launch Studio is designed so you can make progress in the pockets of time you already have.
          </p>

          {/* Progress moments */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
            {progressMoments.map((moment, i) => (
              <div key={moment.title} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: "#C4956A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2px",
                  }}
                >
                  <span className="font-micro" style={{ color: "#fff", fontSize: "0.48rem", letterSpacing: "0" }}>{i + 1}</span>
                </div>
                <div>
                  <p className="font-body" style={{ color: "#2C2C2C", fontSize: "0.88rem", fontWeight: 600, marginBottom: "2px" }}>
                    {moment.title}
                  </p>
                  <p className="font-body" style={{ color: "#5C5148", fontSize: "0.82rem", lineHeight: "1.5" }}>
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