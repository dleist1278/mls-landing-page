import React, { useRef, useEffect, useState } from "react";

const credentials = [
{ label: "Teacher & Assistant Principal", note: "Curriculum, child development, parent communication, and school operations." },
{ label: "Licensed Home Daycare Owner", note: "Opened a program, navigated licensing, enrolled families, and scaled sustainably." },
{ label: "EdTech Implementation Lead", note: "Built adoption frameworks for an educator-facing platform — at scale." },
{ label: "Mother of Two Boys", note: "Building this inside the same real, full family life you're navigating." }];


export default function FounderSection() {
  const ref = useRef(null);
  const credRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [credVisible, setCredVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setCredVisible(true);}, { threshold: 0.06 });
    if (ref.current) o1.observe(ref.current);
    if (credRef.current) o2.observe(credRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return (
    <section id="founder" className="pt-7 md:pt-16 pb-4 md:pb-4" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-12">

        {/* Main two-col */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-6 md:gap-16 items-center mb-6 md:mb-12"
          style={{
            transition: "opacity 0.6s ease",
            opacity: visible ? 1 : 0,
          }}>
          
          {/* Image — desktop only (left column) */}
          <div className="hidden md:flex flex-col items-center gap-4 md:gap-7">
            <div className="relative w-full">
              <div
                className="absolute rounded-[28px]"
                style={{ inset: 0, transform: "translate(10px, 10px)", backgroundColor: "#E8D5C0", opacity: 0.35, zIndex: 0 }}
              />
              <div
                className="relative rounded-[28px] overflow-hidden"
                style={{ aspectRatio: "4/5", boxShadow: "0 8px 40px rgba(196,149,106,0.12)", zIndex: 1, maxWidth: "92%", margin: "0 auto" }}
              >
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
                  alt="Danielle, Founder of Mama Launch Studio"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 15%", filter: "saturate(0.68) brightness(0.97)" }}
                />
              </div>
            </div>
            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro text-white px-8 py-4 rounded-full transition-all min-h-[52px] w-full"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 4px 20px rgba(77,94,73,0.18)", maxWidth: "92%", margin: "0 auto" }}>
              Join the Founding Member Waitlist
            </button>
          </div>

          {/* Content */}
          <div style={{ overflow: "hidden" }}>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Meet Your Guide
            </p>

            <h2 className="font-display leading-tight mb-5" style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 3.5vw, 2.8rem)", lineHeight: "1.2" }}>
              Hi, I'm Danielle.<br />
              I built this<br />
              <em style={{ color: "#4D5E49" }}>because I needed it.</em>
            </h2>

            {/* Image — mobile only, shown after heading */}
            <div className="md:hidden mb-4" style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "65vw",
                  maxWidth: "260px",
                  aspectRatio: "4/5",
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(196,149,106,0.12)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
                  alt="Danielle, Founder of Mama Launch Studio"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "30% 12%", filter: "saturate(0.68) brightness(0.97)", display: "block" }}
                />
              </div>
            </div>

            {/* Bio text — mobile only, shown below photo */}
            <div className="md:hidden space-y-2 mb-4">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.6" }}>
                I spent years as a teacher, assistant principal, and implementation lead before becoming a licensed home daycare owner and mother of two. I know both sides — the professional systems and the real life you're building inside of.
              </p>
            </div>

            {/* Credibility grid — shown FIRST on mobile for immediate trust signals */}
            <div
              ref={credRef}
              className="mb-4 md:hidden"
              style={{
                transition: "opacity 0.6s ease",
                opacity: credVisible ? 1 : 0,
              }}>
              <p className="font-micro mb-2" style={{ color: "#9a8f84", fontSize: "0.65rem" }}>Background & experience</p>
              {/* Horizontal scroll — 2 cards per "page" */}
              <div
                className="flex gap-3 overflow-x-auto pb-1 px-1"
                style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory", overscrollBehaviorX: "contain", WebkitOverflowScrolling: "touch" }}
              >
                {[credentials.slice(0, 2), credentials.slice(2, 4)].map((pair, gi) => (
                  <div
                    key={gi}
                    className="flex-none flex flex-col gap-2"
                    style={{ width: "calc(100vw - 56px)", maxWidth: "300px", scrollSnapAlign: "start", scrollSnapStop: "always" }}
                  >
                    {pair.map((c) => (
                      <div key={c.label} className="flex items-start gap-3 p-2.5 rounded-xl text-left" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A14" }}>
                        <span className="flex-none mt-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49", marginTop: "5px" }} />
                        <div>
                          <p className="font-body text-xs font-medium leading-snug" style={{ color: "#2C2C2C" }}>{c.label}</p>
                          <p className="font-body text-xs leading-relaxed" style={{ color: "#7A6E65" }}>{c.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>

            {/* Bio text — desktop only */}
            <div className="hidden md:block space-y-3 mb-5">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.6" }}>
                I spent years as a teacher, assistant principal, and implementation lead before becoming a licensed home daycare owner and mother of two. I know both sides — the professional systems and the real life you're building inside of.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.6" }}>
                When I launched my own program, I found scattered information, no clear roadmap, and almost no support designed for serious home providers. So I built the system I needed.
              </p>
            </div>
            <div
              className="hidden md:block mb-8"
              style={{
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                opacity: credVisible ? 1 : 0,
                transform: credVisible ? "translateY(0)" : "translateY(12px)"
              }}>
              <p className="font-micro mb-3" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>Background & experience</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((c) => (
                  <div key={c.label} className="flex flex-col items-center p-3 rounded-2xl text-center" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A14" }}>
                    <div>
                      <p className="font-body text-xs font-medium leading-snug" style={{ color: "#2C2C2C" }}>{c.label}</p>
                      <p className="font-body text-xs leading-relaxed" style={{ color: "#7A6E65" }}>{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>









            


          </div>
        </div>


      </div>
    </section>);

}