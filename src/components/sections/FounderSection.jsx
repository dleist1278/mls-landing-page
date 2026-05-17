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
    <section id="founder" className="py-12 md:py-16" style={{ backgroundColor: "#F0EBE1" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Main two-col */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-12"
          style={{
            transition: "all 0.9s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            filter: visible ? "blur(0)" : "blur(2px)"
          }}>
          
          {/* Image — with editorial depth system */}
          <div className="flex flex-col items-center gap-7">
            <div className="relative w-full">
              {/* Level 1 — editorial backing shape */}
              <div
                className="absolute rounded-[28px]"
                style={{
                  inset: 0,
                  transform: "translate(10px, 10px)",
                  backgroundColor: "#E8D5C0",
                  opacity: 0.35,
                  zIndex: 0,
                }}
              />
              {/* Level 2 — image surface */}
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
            {/* CTA under photo */}
            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro text-white px-8 py-4 rounded-full transition-all min-h-[52px] w-full"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 4px 20px rgba(77,94,73,0.18)", maxWidth: "92%", margin: "0 auto" }}>
              Join the Founding Member Waitlist
            </button>
          </div>

          {/* Content */}
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Meet Your Guide
            </p>

            <h2 className="font-display leading-tight mb-5" style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
              Hi, I'm Danielle.<br />
              I built this<br />
              <em style={{ color: "#4D5E49" }}>because I needed it.</em>
            </h2>

            <div className="space-y-4 mb-7">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
                I spent years as a teacher, assistant principal, and implementation lead before becoming a licensed home daycare owner and mother of two. I know both sides of this — the professional systems and the real life you're building inside of.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
                When I launched my own program, I found scattered information, no clear roadmap, and almost no support designed for serious home providers. So I built the system I needed. Mama Launch Studio is the guided method I wish had existed when I started.
              </p>
            </div>

            {/* Credibility grid */}
            <div
              ref={credRef}
              className="mb-8"
              style={{
                transition: "all 0.8s ease 0.2s",
                opacity: credVisible ? 1 : 0,
                transform: credVisible ? "translateY(0)" : "translateY(16px)"
              }}>
              <p className="font-micro mb-3" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>Background & experience</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((c) => (
                  <div key={c.label} className="flex items-center justify-center p-3 rounded-2xl" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A14" }}>
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