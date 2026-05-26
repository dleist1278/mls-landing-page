import React, { useRef, useEffect, useState } from "react";
import { Users, ClipboardList, MessageCircle } from "lucide-react";

const progressMoments = [
  { num: "01", title: "Nap time",        description: "Review one checklist or answer one workbook prompt." },
  { num: "02", title: "Laundry running", description: "Customize one policy, form, or template." },
  { num: "03", title: "Dinner prep",     description: "Listen, reflect, or plan your next small step." },
  { num: "04", title: "Quiet evening",   description: "Save your progress and know exactly what comes next." },
];

const supportItems = [
  { Icon: Users,         label: "Village",        line: "Peer community and phase-based support." },
  { Icon: ClipboardList, label: "Implementation", line: "Templates, checklists, and guided action steps." },
  { Icon: MessageCircle, label: "Real Answers",   line: "Q&A and feedback when questions come up." },
];

export default function BuildInMotionSection() {
  const mobileRef  = useRef(null);
  const desktopRef = useRef(null);
  const [mobileVisible,  setMobileVisible]  = useState(false);
  const [visible,        setVisible]        = useState(false);
  const [hoveredRow,     setHoveredRow]     = useState(null);

  useEffect(() => {
    const mo  = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMobileVisible(true); },  { threshold: 0.06 });
    const dsk = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); },        { threshold: 0.06 });
    if (mobileRef.current)  mo.observe(mobileRef.current);
    if (desktopRef.current) dsk.observe(desktopRef.current);
    return () => { mo.disconnect(); dsk.disconnect(); };
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* ── DESKTOP ANIMATIONS ── */}
      {visible && (
        <style>{`
          @keyframes bimFadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes bimFloat {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-9px); }
          }
          @keyframes bimScaleFade {
            from { opacity: 0; transform: scale(0.7); }
            to   { opacity: 1; transform: scale(1); }
          }
          .bim-device {
            animation:
              bimFadeUp 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards,
              bimFloat  7s ease-in-out 0.95s infinite;
          }
          .bim-support  { animation: bimFadeUp 0.6s ease forwards 0.70s; opacity: 0; }
          .bim-s0       { animation: bimFadeUp 0.5s ease forwards 0.82s; opacity: 0; }
          .bim-s1       { animation: bimFadeUp 0.5s ease forwards 0.94s; opacity: 0; }
          .bim-s2       { animation: bimFadeUp 0.5s ease forwards 1.06s; opacity: 0; }
          .bim-head     { animation: bimFadeUp 0.65s ease forwards 0.15s; opacity: 0; }
          .bim-m0       { animation: bimFadeUp 0.5s ease forwards 0.30s; opacity: 0; }
          .bim-m1       { animation: bimFadeUp 0.5s ease forwards 0.42s; opacity: 0; }
          .bim-m2       { animation: bimFadeUp 0.5s ease forwards 0.54s; opacity: 0; }
          .bim-m3       { animation: bimFadeUp 0.5s ease forwards 0.66s; opacity: 0; }
          .bim-close    { animation: bimFadeUp 0.5s ease forwards 0.78s; opacity: 0; }
          .bim-num0     { animation: bimScaleFade 0.4s ease forwards 0.36s; opacity: 0; }
          .bim-num1     { animation: bimScaleFade 0.4s ease forwards 0.48s; opacity: 0; }
          .bim-num2     { animation: bimScaleFade 0.4s ease forwards 0.60s; opacity: 0; }
          .bim-num3     { animation: bimScaleFade 0.4s ease forwards 0.72s; opacity: 0; }
        `}</style>
      )}

      {/* ── MOBILE (unchanged) ── */}
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

      {/* ── DESKTOP ── */}
      <div
        ref={desktopRef}
        className="hidden md:block"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px,5vw,64px) clamp(32px,4vw,64px) clamp(40px,5vw,60px)" }}
      >
        <p className="font-micro mb-5 flex items-center gap-2" style={{ color: "#C4956A", fontSize: "0.62rem" }}>
          <span style={{ display: "inline-block", width: "20px", height: "1px", backgroundColor: "#C4956A" }} />
          BUILD IN MOTION
        </p>

        {/* Two-column row */}
        <div style={{ display: "flex", gap: "clamp(28px, 4vw, 60px)", alignItems: "flex-start" }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ flexShrink: 0, width: "clamp(460px, 52%, 620px)", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Floating device mockup */}
            <div
              className={visible ? "bim-device" : ""}
              style={{ opacity: visible ? undefined : 0, width: "100%" }}
            >
              <img
                src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5895f9396_Untitleddesign.png"
                alt="Mama Launch Studio app — used during real motherhood moments"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: [
                    "drop-shadow(0 36px 72px rgba(44,44,44,0.22))",
                    "drop-shadow(0 10px 24px rgba(196,149,106,0.15))",
                    "drop-shadow(0 2px 6px rgba(44,44,44,0.07))",
                  ].join(" "),
                }}
              />
            </div>

            {/* Support strip — visually connected directly under device */}
            <div
              className={visible ? "bim-support" : ""}
              style={{
                opacity: visible ? undefined : 0,
                width: "100%",
                marginTop: "18px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(196,149,106,0.16)",
              }}
            >
              <p className="font-display" style={{ color: "#2C2C2C", fontSize: "0.92rem", lineHeight: "1.2", marginBottom: "3px" }}>
                Support that keeps you moving
              </p>
              <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.76rem", lineHeight: "1.55", marginBottom: "12px", maxWidth: "50ch" }}>
                Village support, guided implementation, and small next steps live together inside Mama Launch Studio.
              </p>

              {/* Support chips with icons */}
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {supportItems.map(({ Icon, label, line }, i) => (
                  <div
                    key={label}
                    className={visible ? `bim-s${i}` : ""}
                    style={{
                      opacity: visible ? undefined : 0,
                      flex: "1 1 130px",
                      minWidth: "120px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,253,249,0.5)",
                      border: "1px solid rgba(196,149,106,0.07)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Icon size={12} style={{ color: "#4D5E49", opacity: 0.7, flexShrink: 0 }} />
                      <span className="font-body" style={{ color: "#2C2C2C", fontSize: "0.76rem", fontWeight: 600 }}>
                        {label}
                      </span>
                    </div>
                    <span className="font-body" style={{ color: "#7A6E65", fontSize: "0.70rem", lineHeight: "1.45" }}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: progress moments ── */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: "4px" }}>

            <div className={visible ? "bim-head" : ""} style={{ opacity: visible ? undefined : 0, marginBottom: "22px" }}>
              <h2
                className="font-display leading-tight mb-2"
                style={{ color: "#2C2C2C", fontSize: "clamp(1.4rem, 2.1vw, 1.95rem)", lineHeight: "1.15" }}
              >
                Small steps <em style={{ color: "#4D5E49" }}>still count.</em>
              </h2>
              <p className="font-body" style={{ color: "#5C5148", fontSize: "0.87rem", lineHeight: "1.65", maxWidth: "36ch" }}>
                Mama Launch Studio is designed so you can make progress in the pockets of time you already have.
              </p>
            </div>

            {/* Progress moment rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {progressMoments.map((moment, i) => (
                <div
                  key={moment.title}
                  className={visible ? `bim-m${i}` : ""}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    opacity: visible ? undefined : 0,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "13px",
                    padding: "11px 14px",
                    borderRadius: "11px",
                    backgroundColor: hoveredRow === i ? "rgba(255,253,249,0.85)" : "rgba(255,253,249,0.35)",
                    border: `1px solid ${hoveredRow === i ? "rgba(196,149,106,0.16)" : "rgba(196,149,106,0.07)"}`,
                    boxShadow: hoveredRow === i ? "0 2px 10px rgba(44,44,44,0.05)" : "none",
                    transition: "background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
                    transform: hoveredRow === i ? "translateY(-1px)" : "translateY(0)",
                    cursor: "default",
                  }}
                >
                  {/* Premium numbered circle */}
                  <div
                    className={visible ? `bim-num${i}` : ""}
                    style={{
                      opacity: visible ? undefined : 0,
                      flexShrink: 0,
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#4D5E49",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "1px",
                    }}
                  >
                    <span className="font-display" style={{ color: "#fff", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1 }}>
                      {moment.num}
                    </span>
                  </div>

                  <div>
                    <p className="font-body" style={{ color: "#2C2C2C", fontSize: "0.86rem", fontWeight: 600, marginBottom: "2px" }}>
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
              style={{ color: "#9a8f84", fontSize: "0.76rem", lineHeight: "1.6", fontStyle: "italic", marginTop: "16px", opacity: visible ? undefined : 0 }}
            >
              Every saved answer, checklist, and template brings your business one step closer to launch.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}