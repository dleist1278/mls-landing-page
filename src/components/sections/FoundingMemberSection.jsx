import React, { useRef, useEffect, useState } from "react";

const steps = [
  { step: "01", title: "Join the Waitlist", description: "Secure your spot and be the first to know what's next.", icon: "☑️" },
  { step: "02", title: "Receive Your Welcome", description: "Check your inbox for your personal welcome and next steps.", icon: "✉️" },
  { step: "03", title: "Begin Phase One Together", description: "Kick things off with our first guided launch phase.", icon: "👥" },
  { step: "04", title: "Shape the Platform", description: "Share your insights and help build what matters most.", icon: "🧩" },
  { step: "05", title: "Open Your Doors", description: "Move toward launching your daycare or nursery with support.", icon: "🚪" },
];



function StepCard({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-3 lg:gap-4"
      style={{
        transition: `opacity 0.45s ease ${index * 70}ms, transform 0.45s ease ${index * 70}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
      }}
    >
      <div
        className="z-10 flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full bg-white text-sm lg:text-lg font-semibold"
        style={{ color: "#C4956A", boxShadow: "0 1px 4px rgba(196,149,106,0.12)", outline: "1px solid #E8D8C7" }}
      >
        {step.step}
      </div>
      <div
        className="flex flex-1 items-center gap-3 lg:gap-4 rounded-2xl lg:rounded-3xl p-4 lg:p-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: "rgba(255,255,255,0.78)",
          outline: "1px solid #EDE3D8",
          backdropFilter: "blur(8px)",
          boxShadow: hovered
            ? "0 6px 24px rgba(196,149,106,0.13)"
            : "0 1px 6px rgba(196,149,106,0.06)",
          transition: "box-shadow 0.22s ease",
        }}
      >
        <div
          className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-full text-2xl lg:text-3xl"
          style={{ backgroundColor: "#F3EEE6", color: "#4D5E49" }}
        >
          {step.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg lg:text-xl leading-snug" style={{ color: "#2C2C2C" }}>{step.title}</h3>
          <p className="mt-0.5 text-sm leading-relaxed max-w-[34ch]" style={{ color: "#7A6E65" }}>{step.description}</p>
        </div>
        <span className="text-2xl flex-none" style={{ color: "#C4956A", opacity: 0.7 }}>›</span>
      </div>
    </div>
  );
}

export default function FoundingMemberSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.08 });
    if (headerRef.current) o1.observe(headerRef.current);
    return () => o1.disconnect();
  }, []);

  return (
    <section className="py-8 lg:py-24" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px" }}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-12 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-12 items-start">

        {/* Left column: Header + Callout */}
        <div
          ref={headerRef}
          className="lg:sticky lg:top-24 lg:pr-6"
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <p className="font-micro mb-2 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Founding Member Experience
          </p>
          <h2 className="font-display leading-tight mb-2" style={{ color: "#2C2C2C", fontSize: "clamp(1.75rem, 4vw, 3.4rem)", lineHeight: "1.15" }}>
            What Happens After
            <br />
            <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
          </h2>

          {/* Callout — lighter on mobile */}
          <div className="mt-6 lg:mt-10 rounded-2xl p-4 lg:p-5" style={{ backgroundColor: "#EEF1E7", outline: "1px solid #E1E6D8" }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl flex-none" style={{ color: "#4D5E49" }}>✨</span>
              <div className="flex-1">
                <p className="font-display text-base font-semibold leading-snug" style={{ color: "#4D5E49" }}>You're not just joining.</p>
                <p className="mt-0.5 text-sm" style={{ color: "#5C5148" }}>You're helping build the future.</p>
              </div>
              <span className="text-xl flex-none" style={{ color: "#4D5E49", opacity: 0.6 }}>♡</span>
            </div>
          </div>
        </div>

        {/* Right column: Steps */}
        <div>
          <div className="relative space-y-3 lg:space-y-4 max-w-[520px]">
            <div className="absolute left-[22px] lg:left-[28px] top-10 h-[calc(100%-80px)] border-l border-dashed" style={{ borderColor: "#D8C6B2" }} />
            {steps.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>

















        
      </div>
    </section>);

}