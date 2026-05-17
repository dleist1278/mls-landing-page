import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToIntake = () => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMethod = () => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Background image — calm home childcare environment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1800&q=85"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 40%", opacity: 0.28 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #FAF7F2 42%, rgba(250,247,242,0.75) 62%, rgba(250,247,242,0.15) 100%)",
          }}
        />
      </div>

      {/* Top clay line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ backgroundColor: "#C4956A", opacity: 0.4 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="font-micro mb-8 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Mama Launch Method
            </p>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1
              className="font-display mb-7 leading-tight"
              style={{ color: "#2C2C2C", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              Reimagining Home Childcare
              <br />
              <em className="font-display" style={{ color: "#4D5E49" }}>
                for Modern Motherhood.
              </em>
            </h1>
          </div>

          {/* Subheadline */}
          <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-body mb-6 leading-relaxed" style={{ color: "#5C5148", fontSize: "1.15rem", maxWidth: "500px" }}>
              Launch your home childcare program with guided systems, intentional structure, and a supportive community built around real family life.
            </p>
          </div>

          {/* Operational clarity line */}
          <div className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="font-micro mb-10" style={{ color: "#C4956A", fontSize: "0.72rem", letterSpacing: "0.12em" }}>
              Launch System &nbsp;·&nbsp; Templates &nbsp;·&nbsp; Community &nbsp;·&nbsp; Guided Implementation
            </p>
          </div>

          {/* CTAs */}
          <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-4 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <button
              onClick={scrollToIntake}
              className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all duration-200 min-h-[52px] focus-sage"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem", boxShadow: "0 8px 32px rgba(77,94,73,0.25)" }}
            >
              Join the Founding Member Waitlist
            </button>
            <button
              onClick={scrollToMethod}
              className="font-micro px-8 py-4 rounded-full border hover:bg-beige transition-all duration-200 min-h-[52px] focus-sage"
              style={{ color: "#2C2C2C", borderColor: "#C4956A", fontSize: "0.8rem", backgroundColor: "transparent" }}
            >
              Explore the Method
            </button>
          </div>

          {/* Philosophy statement — replaces fake metrics */}
          <div
            className={`transition-all duration-700 delay-700 mt-14 pt-8 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ borderTop: "1px solid #C4956A30" }}
          >
            <p className="font-body" style={{ color: "#8C7E75", fontSize: "0.95rem", maxWidth: "420px", lineHeight: "1.7" }}>
              Built for mothers creating calm, intentional childcare environments rooted in community, structure, and real family life.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom clay line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}