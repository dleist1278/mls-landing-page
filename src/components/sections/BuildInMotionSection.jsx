import React, { useRef, useEffect, useState } from "react";

export default function BuildInMotionSection() {
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

  return (
    <section style={{ backgroundColor: "#F0EBE1", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <div
        ref={ref}
        className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-14 md:py-20 text-center"
        style={{
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)"
        }}
      >
        <p
          className="font-micro mb-4 inline-flex items-center gap-3"
          style={{ color: "#C4956A", fontSize: "0.72rem" }}
        >
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          BUILD IN MOTION
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        <h2
          className="font-display leading-tight mb-5 mx-auto"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2", maxWidth: "24ch" }}
        >
          You do not need uninterrupted hours{" "}
          <em style={{ color: "#4D5E49" }}>to make progress.</em>
        </h2>

        <p
          className="font-body mx-auto leading-relaxed"
          style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "50ch" }}
        >
          Chip away at your business while living real motherhood life — during nap time, laundry,
          dinner prep, school pickup, or quiet moments throughout the day.
        </p>
      </div>
    </section>
  );
}