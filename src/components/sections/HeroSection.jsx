import React, { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToIntake = () => {
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToMethod = () => {
    document.getElementById("method")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=80"
          alt=""
          role="presentation"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%", opacity: 0.22 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #FAF7F2 45%, rgba(250,247,242,0.6) 70%, rgba(250,247,242,0.1) 100%)",
          }}
        />
      </div>

      {/* Clay horizon line — decorative top */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ backgroundColor: "#C4956A", opacity: 0.4 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p
              className="font-micro mb-8 inline-flex items-center gap-3"
              style={{ color: "#C4956A", fontSize: "0.75rem" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "#C4956A" }}
              />
              The Home Childcare Implementation System
            </p>
          </div>

          {/* Main Headline */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1
              className="font-display mb-8 leading-tight"
              style={{
                color: "#2C2C2C",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Build a Legacy
              <br />
              <em
                className="font-display"
                style={{ color: "#4D5E49" }}
              >
                from the Living Room.
              </em>
            </h1>
          </div>

          {/* Subheadline */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p
              className="font-body mb-12 leading-relaxed"
              style={{
                color: "#5C5148",
                fontSize: "1.2rem",
                maxWidth: "520px",
              }}
            >
              A calm, structured path to launching your licensed home-based childcare program — without overwhelm, without guessing, without doing it alone.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`transition-all duration-700 delay-500 flex flex-wrap gap-4 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={scrollToIntake}
              className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all duration-200 min-h-[52px] focus-sage shadow-lg"
              style={{
                backgroundColor: "#4D5E49",
                fontSize: "0.8rem",
                boxShadow: "0 8px 32px rgba(77,94,73,0.25)",
              }}
            >
              Start Your Launch Path
            </button>
            <button
              onClick={scrollToMethod}
              className="font-micro px-8 py-4 rounded-full border hover:bg-beige transition-all duration-200 min-h-[52px] focus-sage"
              style={{
                color: "#2C2C2C",
                borderColor: "#C4956A",
                fontSize: "0.8rem",
                backgroundColor: "transparent",
              }}
            >
              Explore the Method
            </button>
          </div>

          {/* Trust indicators */}
          <div
            className={`transition-all duration-700 delay-700 mt-16 pt-8 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ borderTop: "1px solid #C4956A33" }}
          >
            <div className="flex flex-wrap gap-8">
              {[
                { number: "200+", label: "Mothers Launched" },
                { number: "5", label: "Phase Framework" },
                { number: "3", label: "Childcare Models" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display text-3xl"
                    style={{ color: "#4D5E49", letterSpacing: "-0.02em" }}
                  >
                    {stat.number}
                  </p>
                  <p className="font-micro mt-1" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom horizon line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "#C4956A", opacity: 0.3 }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem" }}>
          Scroll to Begin
        </p>
        <div
          className="w-px h-12 animate-pulse"
          style={{ backgroundColor: "#C4956A" }}
        />
      </div>
    </section>
  );
}