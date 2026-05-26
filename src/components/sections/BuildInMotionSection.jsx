import React, { useRef, useEffect, useState } from "react";

const progressMoments = [
  { title: "Nap time", description: "Review one checklist or answer one workbook prompt." },
  { title: "Laundry running", description: "Customize one policy, form, or template." },
  { title: "Dinner prep", description: "Listen, reflect, or plan your next small step." },
  { title: "Quiet evening", description: "Save your progress and know exactly what comes next." },
];

const desktopStyles = `
  @keyframes bimPhotoLift {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bimTextFade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bim-photo-enter { animation: bimPhotoLift 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  .bim-text-enter  { animation: bimTextFade 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
  .bim-moment-0    { animation: bimTextFade 0.6s ease forwards 0.35s; opacity: 0; }
  .bim-moment-1    { animation: bimTextFade 0.6s ease forwards 0.48s; opacity: 0; }
  .bim-moment-2    { animation: bimTextFade 0.6s ease forwards 0.61s; opacity: 0; }
  .bim-moment-3    { animation: bimTextFade 0.6s ease forwards 0.74s; opacity: 0; }
  .bim-closing     { animation: bimTextFade 0.6s ease forwards 0.88s; opacity: 0; }
`;

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
      {visible && <style>{desktopStyles}</style>}
      <div
        ref={ref}
        className="hidden md:grid max-w-5xl mx-auto px-12 pb-16"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px, 5vw, 72px)",
          alignItems: "center",
        }}
      >
        {/* Left: Photo — emotional anchor */}
        <div
          className={visible ? "bim-photo-enter" : ""}
          style={{
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 6px 28px rgba(196,149,106,0.13), 0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid rgba(196,149,106,0.09)",
            opacity: visible ? undefined : 0,
          }}
        >
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5895f9396_Untitleddesign.png"
            alt="Mama Launch platform showing implementation tools and community village"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Right: Heading, moments, closing line */}
        <div className={visible ? "bim-text-enter" : ""} style={{ opacity: visible ? undefined : 0 }}>
          {/* Eyebrow */}
          <p className="font-micro mb-3 inline-flex items-center gap-2" style={{ color: "#C4956A", fontSize: "0.66rem" }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "#C4956A" }} />
            BUILD IN MOTION
          </p>

          <h2
            className="font-display leading-tight mb-3"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.55rem, 2.6vw, 2.2rem)", lineHeight: "1.15" }}
          >
            Small steps{" "}
            <em style={{ color: "#4D5E49" }}>still count.</em>
          </h2>

          <p
            className="font-body leading-relaxed mb-6"
            style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.7", maxWidth: "38ch" }}
          >
            Mama Launch Studio is designed so you can make progress in the pockets of time you already have.
          </p>

          {/* Progress moments — staggered lightweight list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
            {progressMoments.map((moment, i) => (
              <div
                key={moment.title}
                className={visible ? `bim-moment-${i}` : ""}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  opacity: visible ? undefined : 0,
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#C4956A",
                  marginTop: "7px",
                }} />
                <div>
                  <p className="font-body" style={{ color: "#2C2C2C", fontSize: "0.88rem", fontWeight: 600, marginBottom: "1px" }}>
                    {moment.title}
                  </p>
                  <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.81rem", lineHeight: "1.5" }}>
                    {moment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing line — fades in last */}
          <p
            className={visible ? "bim-closing font-body" : "font-body"}
            style={{ color: "#9a8f84", fontSize: "0.8rem", lineHeight: "1.6", fontStyle: "italic", opacity: visible ? undefined : 0 }}
          >
            Every saved answer, checklist, and template brings your business one step closer to launch.
          </p>
        </div>
      </div>

    </section>
  );
}