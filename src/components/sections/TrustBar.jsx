import React from "react";

const signals = [
  { icon: "✦", label: "Guided Phase-by-Phase" },
  { icon: "✦", label: "Real Operational Deliverables" },
  { icon: "✦", label: "State-Specific Licensing Support" },
  { icon: "✦", label: "Founding Member Community" },
  { icon: "✦", label: "Built by a Licensed Home Daycare Owner" },
];

const mobileSignals = [
  { icon: "✦", label: "Phase-by-Phase Guidance" },
  { icon: "✦", label: "Built by a Licensed Provider" },
  { icon: "✦", label: "Real Operational Tools" },
];

export default function TrustBar() {
  return (
    <div
      className="w-full py-3"
      style={{ backgroundColor: "#4D5E49" }}
    >
      {/* Mobile: static 3 items */}
      <div className="flex md:hidden items-center justify-center gap-5 px-4">
        {mobileSignals.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 flex-none">
            <span style={{ color: "#C4956A", fontSize: "0.45rem" }}>{s.icon}</span>
            <span className="font-micro whitespace-nowrap" style={{ color: "#E8D5C0", fontSize: "0.6rem" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
      {/* Desktop: scrolling row */}
      <div
        className="hidden md:flex items-center gap-10 px-6 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
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