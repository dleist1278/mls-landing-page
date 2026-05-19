import React from "react";

const INTERACTIVE_GUIDE_IMAGE = "";
const DONE_FOR_YOU_TOOLS_IMAGE = "";
const VILLAGE_IMAGE = "";

function ImagePlaceholder({ label }) {
  return (
    <div
      className="w-full rounded-xl flex items-center justify-center"
      style={{
        backgroundColor: "#EDE8E0",
        border: "1px dashed #C4956A30",
        height: "100px",
      }}
    >
      <span className="font-micro text-center" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
        {label || "Platform preview image"}
      </span>
    </div>
  );
}

export default function InsideTheStudioSection() {
  return (
    <section
      className="md:hidden w-full max-w-full overflow-hidden"
      style={{ backgroundColor: "#FAF7F2", padding: "40px 20px 48px" }}
    >
      {/* Eyebrow */}
      <p
        className="font-micro mb-3"
        style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.14em" }}
      >
        INSIDE THE STUDIO
      </p>

      {/* Headline */}
      <h2
        className="font-display leading-tight mb-3"
        style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 7vw, 2.4rem)", lineHeight: "1.2" }}
      >
        Everything works together to help you{" "}
        <em style={{ color: "#4D5E49" }}>keep moving forward.</em>
      </h2>

      {/* Support copy */}
      <p
        className="font-body leading-relaxed mb-8"
        style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65", maxWidth: "92%" }}
      >
        Instead of overwhelming courses and scattered information, Mama Launch gives you guided implementation, done-for-you tools, and real support in one place.
      </p>

      {/* Card 1 — Interactive Guide: largest visual weight */}
      <div
        className="w-full rounded-2xl mb-3 overflow-hidden"
        style={{
          backgroundColor: "#F0EBE1",
          border: "1px solid #4D5E4920",
          boxShadow: "0 6px 28px rgba(77,94,73,0.09)",
          padding: "20px",
        }}
      >
        {INTERACTIVE_GUIDE_IMAGE ? (
          <img
            src={INTERACTIVE_GUIDE_IMAGE}
            alt="Interactive Guide"
            className="w-full rounded-xl mb-4 object-cover"
            style={{ height: "100px" }}
          />
        ) : (
          <div className="mb-4">
            <ImagePlaceholder label="Platform preview image" />
          </div>
        )}
        <p
          className="font-micro mb-1.5"
          style={{ color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.1em" }}
        >
          Step-by-step implementation
        </p>
        <h3
          className="font-display leading-snug mb-2"
          style={{ color: "#2C2C2C", fontSize: "1.15rem" }}
        >
          Interactive Guide
        </h3>
        <p
          className="font-body leading-relaxed"
          style={{ color: "#5C5148", fontSize: "0.82rem", lineHeight: "1.6" }}
        >
          Know exactly what to do next through guided phases, prompts, and progress tracking designed to keep you moving.
        </p>
      </div>

      {/* Card 2 — Done-for-You Tools: medium visual weight */}
      <div
        className="w-full rounded-2xl mb-3 overflow-hidden"
        style={{
          backgroundColor: "#FDFCFA",
          border: "1px solid #C4956A18",
          padding: "16px",
        }}
      >
        {DONE_FOR_YOU_TOOLS_IMAGE ? (
          <img
            src={DONE_FOR_YOU_TOOLS_IMAGE}
            alt="Done-for-You Tools"
            className="w-full rounded-xl mb-3 object-cover"
            style={{ height: "80px" }}
          />
        ) : (
          <div className="mb-3">
            <ImagePlaceholder label="Platform preview image" />
          </div>
        )}
        <p
          className="font-micro mb-1"
          style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.1em" }}
        >
          Templates that save time
        </p>
        <h3
          className="font-display leading-snug mb-1.5"
          style={{ color: "#2C2C2C", fontSize: "1rem" }}
        >
          Done-for-You Tools
        </h3>
        <p
          className="font-body leading-relaxed"
          style={{ color: "#5C5148", fontSize: "0.8rem", lineHeight: "1.55" }}
        >
          Open ready-made templates, checklists, parent resources, and operational tools without starting from scratch.
        </p>
      </div>

      {/* Card 3 — The Village: lightest visual weight */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "transparent",
          border: "1px solid #C4956A12",
          padding: "14px 16px",
        }}
      >
        <p
          className="font-micro mb-1"
          style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.1em" }}
        >
          Community support built in
        </p>
        <h3
          className="font-display leading-snug mb-1.5"
          style={{ color: "#2C2C2C", fontSize: "0.95rem", opacity: 0.85 }}
        >
          The Village
        </h3>
        <p
          className="font-body leading-relaxed"
          style={{ color: "#7A6E65", fontSize: "0.78rem", lineHeight: "1.55" }}
        >
          Ask questions, get unstuck, and build alongside mothers walking through the same process with you.
        </p>
      </div>
    </section>
  );
}