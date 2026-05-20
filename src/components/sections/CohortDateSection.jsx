import React from "react";

export default function CohortDateSection() {
  return (
    <section style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid #C4956A20" }}>
      {/* Mobile */}
      <div className="md:hidden max-w-5xl mx-auto px-6 py-12">
        <p className="font-micro text-center mb-3" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.18em" }}>
          FOUNDING COHORT BEGINS
        </p>
        <p className="font-body text-center mb-2" style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.6" }}>
          A small cohort. A supported start.
        </p>
        <p className="font-display text-center mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.25rem, 5vw, 1.6rem)", lineHeight: 1.25 }}>
          <em style={{ color: "#4D5E49" }}>July 6th.</em>
        </p>
        <style>{`
          @keyframes badgePulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(77,94,73,0.35); }
            50% { transform: scale(1.05); box-shadow: 0 0 0 6px rgba(77,94,73,0); }
          }
          @keyframes badgeColorFlash {
            0%, 100% { background-color: #4D5E490C; border-color: #4D5E491A; color: #4D5E49; }
            40% { background-color: #4D5E4930; border-color: #4D5E4960; color: #2C3E28; }
          }
        `}</style>
        <div className="flex justify-center mb-3">
          <span
            className="font-micro px-3 py-1 rounded-full"
            style={{
              backgroundColor: "#4D5E490C",
              border: "1px solid #4D5E491A",
              color: "#4D5E49",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              animation: "badgePulse 2s ease-in-out infinite, badgeColorFlash 2s ease-in-out infinite",
              display: "inline-block"
            }}>
            Founding member access
          </span>
        </div>
        <p className="font-body text-center mx-auto" style={{ color: "#9a8f84", fontSize: "0.78rem", lineHeight: "1.65", maxWidth: "30ch" }}>
          The first Mama Launch cohort opens July 6th with a limited number of founding members.
        </p>
        <p className="font-micro text-center mt-3" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.12em", opacity: 0.6 }}>
          Enrollment closes June 30th.
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-5xl mx-auto px-12 py-14">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.25 }} />
          <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem", letterSpacing: "0.16em", whiteSpace: "nowrap" }}>
            FOUNDING COHORT BEGINS
          </p>
          <div className="flex-1 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.25 }} />
        </div>
        <p className="font-display text-center mt-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.2 }}>
          <em style={{ color: "#4D5E49" }}>July 6th.</em>
        </p>
        <p className="font-body text-center mt-2" style={{ color: "#9a8f84", fontSize: "0.82rem" }}>
          A small cohort. A supported start.
        </p>
        <div className="flex flex-col items-center gap-2 mt-5">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="font-micro px-3 py-1 rounded-full" style={{ backgroundColor: "#4D5E4912", border: "1px solid #4D5E4928", color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.12em", animation: "badgePulse 2s ease-in-out infinite, badgeColorFlash 2s ease-in-out infinite", display: "inline-block" }}>
              Founding member access
            </span>
            <span className="font-body" style={{ color: "#9a8f84", fontSize: "0.78rem" }}>
              The first cohort opens July 6th with a limited number of founding members.
            </span>
          </div>
          <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.12em", opacity: 0.6 }}>
            Enrollment closes June 30th.
          </p>
        </div>
      </div>
    </section>
  );
}