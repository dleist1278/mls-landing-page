import React, { useRef, useEffect, useState } from "react";

const progressMoments = [
  { num: "01", title: "Nap time",       description: "Review one checklist or answer one workbook prompt." },
  { num: "02", title: "Laundry running", description: "Customize one policy, form, or template." },
  { num: "03", title: "Dinner prep",    description: "Listen, reflect, or plan your next small step." },
  { num: "04", title: "Quiet evening",  description: "Save your progress and know exactly what comes next." },
];

const supportItems = [
  { label: "Village",         line: "Peer community and phase-based support." },
  { label: "Implementation",  line: "Templates, checklists, and guided action steps." },
  { label: "Real Answers",    line: "Q&A and feedback when questions come up." },
];

export default function BuildInMotionSection() {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mo = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMobileVisible(true); }, { threshold: 0.06 });
    const do_ = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (mobileRef.current) mo.observe(mobileRef.current);
    if (desktopRef.current) do_.observe(desktopRef.current);
    return () => { mo.disconnect(); do_.disconnect(); };
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* ─────────────────── DESKTOP ANIMATIONS ─────────────────── */}
      {visible && (
        <style>{`
          @keyframes bimFadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes bimFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
          @keyframes bimPathDraw {
            from { stroke-dashoffset: 400; opacity: 0; }
            to   { stroke-dashoffset: 0;   opacity: 1; }
          }
          /* device: fade-up entry, then float forever */
          .bim-device {
            animation:
              bimFadeUp 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards,
              bimFloat  7s ease-in-out 0.95s infinite;
          }
          .bim-support  { animation: bimFadeUp 0.6s ease forwards 0.7s;  opacity: 0; }
          .bim-s0       { animation: bimFadeUp 0.5s ease forwards 0.82s; opacity: 0; }
          .bim-s1       { animation: bimFadeUp 0.5s ease forwards 0.94s; opacity: 0; }
          .bim-s2       { animation: bimFadeUp 0.5s ease forwards 1.06s; opacity: 0; }
          .bim-head     { animation: bimFadeUp 0.65s ease forwards 0.15s; opacity: 0; }
          .bim-m0       { animation: bimFadeUp 0.5s ease forwards 0.30s; opacity: 0; }
          .bim-m1       { animation: bimFadeUp 0.5s ease forwards 0.42s; opacity: 0; }
          .bim-m2       { animation: bimFadeUp 0.5s ease forwards 0.54s; opacity: 0; }
          .bim-m3       { animation: bimFadeUp 0.5s ease forwards 0.66s; opacity: 0; }
          .bim-close    { animation: bimFadeUp 0.5s ease forwards 0.78s; opacity: 0; }
          .bim-path     {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            opacity: 0;
            animation: bimPathDraw 1.4s ease forwards 0.5s;
          }
        `}</style>
      )}

      {/* ─────────────────── MOBILE (unchanged) ─────────────────── */}
      <div
        ref={mobileRef}
        className="md:hidden max-w-xl mx-auto px-5 sm:px-8 py-12 text-center"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: mobileVisible ? 1 : 0,
          transform: mobileVisible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          BUILD IN MOTION
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>
        <h2
          className="font-display leading-tight mb-4 mx-auto"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 5vw, 2.4rem)", lineHeight: "1.2", maxWidth: "22ch" }}
        >
          You do not need uninterrupted hours{" "}
          <em style={{ color: "#4D5E49" }}>to make progress.</em>
        </h2>
        <p
          className="font-body mx-auto leading-relaxed"
          style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.7", maxWidth: "42ch" }}
        >
          Chip away at your business while living real motherhood life — during nap time, laundry,
          dinner prep, school pickup, or quiet moments throughout the day.
        </p>
      </div>

      {/* ─────────────────── DESKTOP ─────────────────── */}
      <div ref={desktopRef} className="hidden md:block" style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px,5vw,64px) clamp(32px,4vw,64px) clamp(40px,5vw,60px)" }}>

        <p className="font-micro mb-5 flex items-center gap-2" style={{ color: "#C4956A", fontSize: "0.62rem" }}>
          <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "#C4956A" }} />
          BUILD IN MOTION
        </p>

        {/* ── Main two-column row ── */}
        <div style={{ display: "flex", gap: "clamp(28px, 4vw, 56px)", alignItems: "flex-start", position: "relative" }}>

          {/* ── LEFT COLUMN: floating device + support strip ── */}
          <div style={{ flexShrink: 0, width: "clamp(480px, 54%, 640px)", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Device mockup — floating hero */}
            <div
              className={visible ? "bim-device" : ""}
              style={{
                opacity: visible ? undefined : 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5895f9396_Untitleddesign.png"
                alt="Mama Launch Studio app — used during real motherhood moments"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: [
                    "drop-shadow(0 32px 64px rgba(44,44,44,0.20))",
                    "drop-shadow(0 8px 20px rgba(196,149,106,0.14))",
                    "drop-shadow(0 2px 6px rgba(44,44,44,0.08))",
                  ].join(" "),
                }}
              />
            </div>

            {/* Support strip — directly under device, visually connected */}
            <div
              className={visible ? "bim-support" : ""}
              style={{
                opacity: visible ? undefined : 0,
                width: "100%",
                marginTop: "20px",
                paddingTop: "18px",
                borderTop: "1px solid rgba(196,149,106,0.14)",
              }}
            >
              {/* Strip header */}
              <p className="font-display" style={{ color: "#2C2C2C", fontSize: "0.95rem", lineHeight: "1.2", marginBottom: "3px" }}>
                Support that keeps you moving
              </p>
              <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.78rem", lineHeight: "1.55", marginBottom: "14px", maxWidth: "52ch" }}>
                Village support, guided implementation, and small next steps live together inside Mama Launch Studio.
              </p>

              {/* Mini chips — compact horizontal row */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {supportItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={visible ? `bim-s${i}` : ""}
                    style={{
                      opacity: visible ? undefined : 0,
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 140px",
                      minWidth: "130px",
                      padding: "10px 13px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255,253,249,0.75)",
                      border: "1px solid rgba(196,149,106,0.11)",
                    }}
                  >
                    <span className="font-body" style={{ color: "#2C2C2C", fontSize: "0.78rem", fontWeight: 600, marginBottom: "2px" }}>
                      {item.label}
                    </span>
                    <span className="font-body" style={{ color: "#7A6E65", fontSize: "0.72rem", lineHeight: "1.45" }}>
                      {item.line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Subtle SVG bridge between columns ── */}
          <div style={{ position: "absolute", left: "clamp(480px,54%,640px)", top: "30%", width: "clamp(28px,4vw,56px)", height: "120px", pointerEvents: "none", overflow: "visible", zIndex: 1 }}>
            <svg width="100%" height="100%" viewBox="0 0 56 120" fill="none" style={{ overflow: "visible" }}>
              <path
                className={visible ? "bim-path" : ""}
                d="M4 10 C 20 40, 36 80, 52 110"
                stroke="#C4956A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="4 7"
                fill="none"
                style={{ opacity: visible ? undefined : 0 }}
              />
              {/* tiny arrowhead */}
              <circle cx="52" cy="110" r="2.5" fill="#C4956A" style={{ opacity: visible ? 0.45 : 0, transition: "opacity 0.4s ease 1.9s" }} />
            </svg>
          </div>

          {/* ── RIGHT COLUMN: heading + progress moments ── */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: "4px" }}>

            <div className={visible ? "bim-head" : ""} style={{ opacity: visible ? undefined : 0, marginBottom: "20px" }}>
              <h2
                className="font-display leading-tight mb-2"
                style={{ color: "#2C2C2C", fontSize: "clamp(1.45rem, 2.2vw, 2rem)", lineHeight: "1.15" }}
              >
                Small steps <em style={{ color: "#4D5E49" }}>still count.</em>
              </h2>
              <p
                className="font-body"
                style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65", maxWidth: "36ch" }}
              >
                Mama Launch Studio is designed so you can make progress in the pockets of time you already have.
              </p>
            </div>

            {/* Progress moments — compact numbered rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {progressMoments.map((moment, i) => (
                <div
                  key={moment.title}
                  className={visible ? `bim-m${i}` : ""}
                  style={{
                    opacity: visible ? undefined : 0,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "10px 13px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,253,249,0.65)",
                    border: "1px solid rgba(196,149,106,0.09)",
                  }}
                >
                  {/* Subtle number */}
                  <span className="font-display" style={{ flexShrink: 0, color: "#C4956A", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1, marginTop: "4px", opacity: 0.7 }}>
                    {moment.num}
                  </span>
                  <div>
                    <p className="font-body" style={{ color: "#2C2C2C", fontSize: "0.84rem", fontWeight: 600, marginBottom: "1px" }}>
                      {moment.title}
                    </p>
                    <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.77rem", lineHeight: "1.45" }}>
                      {moment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing line */}
            <p
              className={visible ? "bim-close font-body" : "font-body"}
              style={{ color: "#9a8f84", fontSize: "0.77rem", lineHeight: "1.6", fontStyle: "italic", marginTop: "16px", opacity: visible ? undefined : 0 }}
            >
              Every saved answer, checklist, and template brings your business one step closer to launch.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}