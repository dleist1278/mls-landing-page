import React, { useRef, useEffect, useState } from "react";
const steps = [
{ step: "01", title: "Join the Waitlist", description: "Secure your spot and be the first to know what's next.", icon: "☑️" },
{ step: "02", title: "Receive Your Welcome", description: "Check your inbox for your personal welcome and next steps.", icon: "✉️" },
{ step: "03", title: "Begin Phase One Together", description: "Kick things off with our first guided launch phase.", icon: "👥" },
{ step: "04", title: "Shape the Platform", description: "Share your insights and help build what matters most.", icon: "🧩" },
{ step: "05", title: "Open Your Doors", description: "Move toward launching your daycare or nursery with support.", icon: "🚪" },
];






export default function FoundingMemberSection() {
  const headerRef = useRef(null);
  const imgRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setHeaderVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setImgVisible(true);}, { threshold: 0.06 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (imgRef.current) o2.observe(imgRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return (
    <section className="md:py-16 py-7" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Village Community Image */}
        <div className="mb-8 md:mb-14">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mx-auto" style={{ maxWidth: "820px", boxShadow: "0 12px 48px rgba(44,44,44,0.10), 0 2px 12px rgba(196,149,106,0.08)", border: "1px solid #C4956A18" }}>
            <img
              src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/9b9b7e4c8_ChatGPTImageMay18202609_40_41AM.png"
              alt="The Village — community hub inside Mama Launch Studio"
              className="w-full h-auto block"
              style={{ filter: "saturate(0.9) brightness(0.98)" }}
            />
          </div>
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-5 md:mb-12"
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)"
          }}>
          <p className="font-micro mb-3 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Founding Member Experience
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 4vw, 3.4rem)", lineHeight: "1.2" }}>
              What Happens After
              <br />
              <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
            </h2>

          </div>
        </div>

        {/* Steps */}
        <div ref={imgRef} className="mx-auto max-w-md">
          <div className="relative space-y-5">
            <div className="absolute left-[28px] top-10 h-[calc(100%-80px)] border-l border-dashed" style={{ borderColor: "#D8C6B2" }} />
            {steps.map((step) => (
              <div key={step.step} className="relative flex gap-4">
                <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold shadow-sm" style={{ color: "#C4956A", boxShadow: "0 1px 4px rgba(196,149,106,0.12)", outline: "1px solid #E8D8C7" }}>
                  {step.step}
                </div>
                <div className="flex flex-1 items-center gap-4 rounded-3xl p-5 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.75)", outline: "1px solid #EDE3D8", backdropFilter: "blur(8px)" }}>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-3xl" style={{ backgroundColor: "#F3EEE6", color: "#4D5E49" }}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl leading-snug" style={{ color: "#2C2C2C" }}>{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "#5C5148" }}>{step.description}</p>
                  </div>
                  <span className="text-3xl" style={{ color: "#C4956A" }}>›</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom callout */}
          <div className="mt-10 rounded-3xl p-6 shadow-sm" style={{ backgroundColor: "#EEF1E7", outline: "1px solid #E1E6D8" }}>
            <div className="flex items-center gap-5">
              <div className="text-4xl" style={{ color: "#4D5E49" }}>✨</div>
              <div className="flex-1">
                <p className="font-display text-xl font-semibold" style={{ color: "#4D5E49" }}>You're not just joining.</p>
                <p className="mt-1 text-lg" style={{ color: "#2C2C2C" }}>You're helping build the future.</p>
              </div>
              <div className="text-3xl" style={{ color: "#4D5E49" }}>♡</div>
            </div>
          </div>
        </div>

        {/* Transparency note — centered editorial composition */}
        
















        
      </div>
    </section>);

}