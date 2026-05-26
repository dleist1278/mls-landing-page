import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const futurePathways = [
  {
    id: "kids-programs",
    title: "Kids Programs",
    description: "For mothers who want to host enrichment-style classes, drop-ins, or small group programs from home.",
    tags: ["Classes", "Drop-ins", "Small groups"]
  },
  {
    id: "homeschool-pods",
    title: "Homeschool Pods",
    description: "For mothers who want to build intentional small-group learning environments with flexibility and autonomy.",
    tags: ["Learning pods", "Flexible rhythm", "Small groups"]
  },
  {
    id: "caregiver-babysitter",
    title: "Caregiver / Babysitter",
    description: "For mothers offering dedicated in-home care to one family, with the option to bring their own child.",
    tags: ["In-home care", "One-family model", "Bring your child"]
  }
];

function DrawerRow({ pathway, isOpen, onToggle, isLast }) {
  return (
    <div
      style={{
        backgroundColor: isOpen ? "#FFFDF9" : "rgba(250,247,242,0.7)",
        border: `1px solid ${isOpen ? "rgba(196,149,106,0.30)" : "rgba(196,149,106,0.18)"}`,
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: isLast ? 0 : "6px",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Header row — always visible */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "13px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Title */}
        <span
          className="font-display"
          style={{
            flex: 1,
            color: "#3A3028",
            fontSize: "1.1rem",
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
          }}
        >
          {pathway.title}
        </span>

        {/* Coming Soon badge */}
        <span
          className="font-micro"
          style={{
            backgroundColor: "transparent",
            border: "1px solid rgba(196,149,106,0.28)",
            color: "#B5956A",
            borderRadius: "999px",
            padding: "3px 9px",
            fontSize: "0.55rem",
            letterSpacing: "0.10em",
            flexShrink: 0,
          }}
        >
          Coming Soon
        </span>

        {/* Chevron */}
        <ChevronDown
          size={14}
          style={{
            color: "#9a8f84",
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease",
          }}
        />
      </button>

      {/* Expanded content */}
      <div
        style={{
          maxHeight: isOpen ? "160px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.28s ease",
        }}
      >
        <div style={{ padding: "0 16px 14px", borderTop: "1px solid rgba(196,149,106,0.10)" }}>
          <p
            className="font-body"
            style={{
              color: "#6B5F56",
              fontSize: "1rem",
              lineHeight: "1.65",
              marginTop: "12px",
              marginBottom: "10px",
            }}
          >
            {pathway.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {pathway.tags.map((tag) => (
              <span
                key={tag}
                className="font-micro"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(196,149,106,0.20)",
                  color: "#9A8070",
                  borderRadius: "999px",
                  padding: "3px 9px",
                  fontSize: "0.55rem",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FuturePathwaysAccordion({ headerVisible }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div
      style={{
        borderTop: "1px solid rgba(196,149,106,0.14)",
        paddingTop: "24px",
        opacity: headerVisible ? 1 : 0,
        transition: "opacity 0.5s ease 0.35s",
        maxWidth: "1160px",
        margin: "0 auto",
      }}
    >
      {/* Sub-heading */}
      <div style={{ marginBottom: "14px" }}>
        <p
          className="font-micro"
          style={{ color: "#7A6E65", fontSize: "0.66rem", letterSpacing: "0.18em", marginBottom: "5px" }}
        >
          Future pathways coming soon
        </p>
        <p
          className="font-body"
          style={{ color: "#7A6E65", fontSize: "1rem", lineHeight: "1.6" }}
        >
          Mama Launch Studio is expanding into additional motherhood-centered childcare and learning models.
        </p>
      </div>

      {/* Accordion rows */}
      <div>
        {futurePathways.map((pathway, i) => (
          <DrawerRow
            key={pathway.id}
            pathway={pathway}
            isOpen={openId === pathway.id}
            onToggle={() => toggle(pathway.id)}
            isLast={i === futurePathways.length - 1}
          />
        ))}
      </div>
    </div>
  );
}