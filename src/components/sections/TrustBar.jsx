import React from "react";

const signals = [
  { icon: "✦", label: "Guided Phase-by-Phase" },
  { icon: "✦", label: "Real Operational Deliverables" },
  { icon: "✦", label: "State-Specific Licensing Support" },
  { icon: "✦", label: "Founding Member Community" },
  { icon: "✦", label: "Built by a Licensed Home Daycare Owner" },
];

export default function TrustBar() {
  return (
    <div className="w-full py-2 overflow-hidden" style={{ backgroundColor: "#4D5E49" }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-track">
        {[...signals, ...signals, ...signals, ...signals].map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-none px-3">
            <span style={{ color: "#C4956A", fontSize: "0.5rem" }}>{s.icon}</span>
            <span className="font-micro whitespace-nowrap" style={{ color: "#E8D5C0", fontSize: "0.65rem" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}