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

      {visible && (
        <style>{`
          @keyframes bimFadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .bim-photo  { animation: bimFadeUp 0.85s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
          .bim-head   { animation: bimFadeUp 0.65s ease forwards 0.15s; opacity: 0; }
          .bim-m0     { animation: bimFadeUp 0.55s ease forwards 0.28s; opacity: 0; }
          .bim-m1     { animation: bimFadeUp 0.55s ease forwards 0.38s; opacity: 0; }
          .bim-m2     { animation: bimFadeUp 0.55s ease forwards 0.48s; opacity: 0; }
          .bim-m3     { animation: bimFadeUp 0.55s ease forwards 0.58s; opacity: 0; }
          .bim-close  { animation: bimFadeUp 0.55s ease forwards 0.70s; opacity: 0; }
        `}</style>
      )}

      {/* ── MOBILE only intro block ── */}
      <div className="md:hidden max-w-xl mx-auto px-5 sm:px-8 py-12 text-center"
        ref={ref}
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
        <h2 className="font-display leading-tight mb-4 mx-auto"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 5vw, 2.4rem)", lineHeight: "1.2", maxWidth: "22ch" }}>
          You do not need uninterrupted hours{" "}
          <em style={{ color: "#4D5E49" }}>to make progress.</em>
        </h2>
        <p className="font-body mx-auto leading-relaxed"
          style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.7", maxWidth: "42ch" }}>
          Chip away at your business while living real motherhood life — during nap time, laundry,
          dinner prep, school pickup, or quiet moments throughout the day.
        </p>
      </div>

      {/* ── DESKTOP two-column ── */}
      <div
        ref={ref}
        className="hidden md:flex max-w-5xl mx-auto px-10 lg:px-12 py-14"
        style={{ gap: "clamp(44px, 5vw, 72px)", alignItems: "center" }}
      >

        {/* Left: floating device mockup — no background panel */}
        <div
          className={visible ? "bim-photo" : ""}
          style={{
            flexShrink: 0,
            width: "clamp(320px, 46%, 460px)",
            opacity: visible ? undefined : 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5895f9396_Untitleddesign.png"
            alt="Mama Launch platform — implementation tools and community"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 14px 32px rgba(44,44,44,0.14)) drop-shadow(0 3px 10px rgba(196,149,106,0.10))",
            }}
          />
        </div>

        {/* Right: text */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Eyebrow */}
          <p className="font-micro mb-3 flex items-center gap-2" style={{ color: "#C4956A", fontSize: "0.64rem" }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", backgroundColor: "#C4956A" }} />
            BUILD IN MOTION
          </p>

          {/* Heading + copy */}
          <div className={visible ? "bim-head" : ""} style={{ opacity: visible ? undefined : 0 }}>
            <h2 className="font-display leading-tight mb-3"
              style={{ color: "#2C2C2C", fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", lineHeight: "1.15" }}>
              Small steps{" "}
              <em style={{ color: "#4D5E49" }}>still count.</em>
            </h2>
            <p className="font-body mb-6"
              style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.68", maxWidth: "38ch" }}>
              Mama Launch Studio is designed so you can make progress in the pockets of time you already have.
            </p>
          </div>

          {/* Progress moments — compact rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginBottom: "20px" }}>
            {progressMoments.map((moment, i) => (
              <div
                key={moment.title}
                className={visible ? `bim-m${i}` : ""}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "11px",
                  opacity: visible ? undefined : 0,
                  padding: "9px 12px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,253,249,0.7)",
                  border: "1px solid rgba(196,149,106,0.09)",
                }}
              >
                <span style={{
                  flexShrink: 0,
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#C4956A",
                  marginTop: "6px",
                }} />
                <div>
                  <p className="font-body" style={{ color: "#2C2C2C", fontSize: "0.86rem", fontWeight: 600, marginBottom: "1px" }}>
                    {moment.title}
                  </p>
                  <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.8rem", lineHeight: "1.45" }}>
                    {moment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <p
            className={visible ? "bim-close font-body" : "font-body"}
            style={{ color: "#9a8f84", fontSize: "0.79rem", lineHeight: "1.6", fontStyle: "italic", opacity: visible ? undefined : 0 }}
          >
            Every saved answer, checklist, and template brings your business one step closer to launch.
          </p>
        </div>
      </div>

    </section>
  );
}