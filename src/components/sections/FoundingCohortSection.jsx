import React, { useRef, useEffect, useState } from "react";

export default function AppComingSoonSection() {
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

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <section style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <div ref={ref} className="max-w-2xl mx-auto px-5 sm:px-8 py-10 md:py-10 text-center">

        <p className="font-micro mb-5 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem", ...anim(0) }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          APP COMING SOON
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        <h2 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.8vw, 3rem)", lineHeight: "1.15", ...anim(0.18) }}>
          Not sure which path fits?<br />
          <em style={{ color: "#4D5E49" }}>The quiz takes 3 minutes.</em>
        </h2>

        <p className="font-body mx-auto leading-relaxed mb-5" style={{ color: "#5C5148", fontSize: "clamp(0.9rem, 3.5vw, 1.25rem)", lineHeight: "1.7", maxWidth: "40ch", ...anim(0.26) }}>
          Answer 20 questions and get your personalized Childcare Fit Result — including income range, pathway match, and how to start small.
        </p>

        <div style={anim(0.36)}>
          <a
            href="https://mama-launch-space.base44.app/quiz/start"
            className="font-micro text-white px-8 py-4 rounded-full min-h-[52px] inline-flex items-center justify-center"
            style={{
              backgroundColor: "#4D5E49",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)",
              textDecoration: "none"
            }}
          >
            Take the Free Quiz →
          </a>
        </div>

        <p className="font-body mt-4" style={{ color: "#9a8f84", fontSize: "0.78rem", ...anim(0.44) }}>
          Or{" "}
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            style={{ color: "#C4956A", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            get app launch updates
          </button>
          {" "}when we're ready.
        </p>
      </div>
    </section>
  );
}