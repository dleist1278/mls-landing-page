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
    <div
      className="w-full overflow-hidden py-4"
      style={{ backgroundColor: "#4D5E49" }}
    >
      <div
        className="flex items-center gap-10 px-6"
        style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Duplicate for seamless overflow on wide screens */}
        {[...signals, ...signals].map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 flex-none">
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