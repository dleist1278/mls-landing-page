import React, { useEffect, useState } from "react";
import { gaEvent } from "@/lib/analytics";

const nextSteps = [
  { number: "01", title: "Check your inbox within 24 hours.", icon: "✉️" },
  { number: "02", title: "Receive The Calm Home Childcare Blueprint and founding member details.", icon: "🗝️" },
  { number: "03", title: "Learn more about the July 8 founding cohort experience.", icon: "🌿" },
  { number: "04", title: "Be first invited into the Mama Launch membership experience.", icon: "🤝" },
];

function StepCard({ step, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200 + index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      style={{
        transition: "all 0.7s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        className="rounded-3xl p-6"
        style={{
          backgroundColor: "#FAF7F2",
          border: "1px solid #C4956A18",
          boxShadow: "0 4px 24px rgba(196,149,106,0.07)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-none w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: "#4D5E4910", border: "1px solid #4D5E4920" }}
          >
            {step.icon}
          </div>
          <div>
            <p className="font-micro mb-1" style={{ color: "#C4956A", fontSize: "0.65rem" }}>
              Step {step.number}
            </p>
            <h3 className="font-display" style={{ color: "#2C2C2C", fontSize: "1rem", lineHeight: "1.4" }}>
              {step.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThankYou() {
  const [visible, setVisible] = useState(false);

  // Pull name from URL param if passed: /thank-you?name=Sarah
  const name = new URLSearchParams(window.location.search).get("name") || "Mama";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    gaEvent("thank_you_page_view", { event_category: "conversion" });
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Top accent line */}
      <div className="h-px w-full" style={{ backgroundColor: "#C4956A", opacity: 0.4 }} />

      {/* Nav — minimal */}
      <header className="w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <span className="font-display" style={{ color: "#2C2C2C", fontSize: "1.1rem" }}>
          Mama Launch <em style={{ color: "#4D5E49" }}>Studio</em>
        </span>
        <a
          href="/"
          className="font-micro"
          style={{ color: "#C4956A", fontSize: "0.72rem", textDecoration: "none" }}
        >
          ← Back to site
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-5 sm:px-8 pb-20 pt-8">

        {/* Hero confirmation */}
        <div
          className="text-center mb-14"
          style={{
            transition: "all 0.8s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {/* Checkmark */}
          <div
            className="w-16 h-16 rounded-full mx-auto mb-7 flex items-center justify-center"
            style={{
              backgroundColor: "#4D5E4910",
              border: "1px solid #4D5E4930",
              boxShadow: "0 8px 32px rgba(77,94,73,0.12)",
            }}
          >
            <span style={{ color: "#4D5E49", fontSize: "1.6rem" }}>✓</span>
          </div>

          <p className="font-micro mb-4 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.7rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            You're in.
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>

          <h1
            className="font-display leading-tight mb-5"
            style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            You're on the waitlist.
          </h1>

          <p
            className="font-body leading-relaxed mx-auto"
            style={{ color: "#5C5148", maxWidth: "400px", fontSize: "1rem" }}
          >
            We'll send next steps to your inbox within 24 hours.
          </p>

          <div className="w-10 h-px mx-auto my-8" style={{ backgroundColor: "#C4956A", opacity: 0.5 }} />

          <p
            className="font-body mx-auto"
            style={{ color: "#7A6E65", maxWidth: "380px", fontSize: "0.92rem", fontStyle: "italic" }}
          >
            You do not need to have everything figured out before starting.
          </p>
        </div>

        {/* What happens next */}
        <div
          style={{
            transition: "all 0.8s ease 0.2s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <h2 className="font-display mb-6" style={{ color: "#2C2C2C", fontSize: "1.4rem" }}>
            What Happens Next?
          </h2>
        </div>

        <div className="flex flex-col gap-4 mb-14">
          {nextSteps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Emotional close */}
        <div
          className="text-center"
          style={{
            transition: "all 0.8s ease 0.6s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <div className="w-10 h-px mx-auto mb-8" style={{ backgroundColor: "#C4956A", opacity: 0.4 }} />

          <blockquote
            className="font-display italic mb-6"
            style={{ color: "#4D5E49", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", lineHeight: "1.4" }}
          >
            "You don't have to have it all figured out to begin.
            You just have to begin."
          </blockquote>

          <p className="font-body mb-10" style={{ color: "#9a8f84", fontSize: "0.9rem" }}>
            — The Mama Launch Team
          </p>

          {/* Social / email share nudge */}
          <div
            className="rounded-3xl p-7"
            style={{ backgroundColor: "#F0EBE1", border: "1px solid #C4956A14" }}
          >
            <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.68rem" }}>
              Know a mama who's been thinking about this?
            </p>
            <p className="font-body mb-5" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
              Share this with someone who needs to hear it. One conversation could change the trajectory of her family.
            </p>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Mama Launch Studio",
                    text: "I just joined the founding member waitlist for Mama Launch Studio — a guided system for launching a home childcare program. Thought you might want to check it out.",
                    url: "https://mamalaunchchstudio.com",
                  });
                } else {
                  navigator.clipboard.writeText("https://mamalaunchchstudio.com");
                  alert("Link copied! Share it with someone who needs it.");
                }
                gaEvent("share_click", { event_category: "engagement", location: "thank_you" });
              }}
              className="font-micro px-7 py-3.5 rounded-full border hover:opacity-80 transition-all min-h-[48px]"
              style={{
                color: "white",
                backgroundColor: "#4D5E49",
                borderColor: "#4D5E49",
                fontSize: "0.78rem",
              }}
            >
              Share Mama Launch Studio →
            </button>
          </div>
        </div>
      </main>

      {/* Bottom accent */}
      <div className="h-px w-full" style={{ backgroundColor: "#C4956A", opacity: 0.2 }} />
    </div>
  );
}