import React, { useRef, useEffect, useState } from "react";

const PORTAL_IMG = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2164b968d_126b8850-64e7-44bb-9b84-3062101feb97.png";
const DELIVERABLES_IMG = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/ef8201f7e_Screenshot2026-05-16at95731PM.png";

const ecosystemPillars = [
{
  number: "01",
  title: "Vision & Structure",
  description:
  "Clarify your childcare philosophy, daily rhythm, licensing direction, family-aligned schedule, and the type of program you want to build — so every decision that follows has a clear foundation.",
  tags: ["Program philosophy", "Licensing direction", "Family-aligned schedule", "Program model clarity"],
  accent: "#4D5E49",
  image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&q=80",
  imagePosition: "center 30%"
},
{
  number: "02",
  title: "Environment & Rhythm",
  description:
  "Design calm, organized childcare spaces and daily routines that support movement, safety, independence, emotional regulation, and real family life — inside a home that works for everyone in it.",
  tags: ["Room planning", "Daily rhythm design", "Sensory & play environments", "Calm organizational systems"],
  accent: "#C4956A",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  imagePosition: "center 35%"
},
{
  number: "03",
  title: "Parent Experience",
  description:
  "Build trust-centered communication systems — from the first tour to enrollment, onboarding, policies, and ongoing family connection — so parents feel held and your program feels professional.",
  tags: ["Home tour workflow", "Enrollment & onboarding", "Parent communication systems", "Policy guidance"],
  accent: "#6B7E67",
  image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&q=80",
  imagePosition: "center 20%"
},
{
  number: "04",
  title: "Sustainable Operations",
  description:
  "Create the operational rhythms, workflows, and organizational habits that keep your program calm, manageable, and sustainable — so your childcare ecosystem grows without consuming your life.",
  tags: ["Operational routines", "Capacity & growth planning", "Launch-ready messaging", "Calm systems framework"],
  accent: "#4D5E49",
  image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
  imagePosition: "center 15%"
}];


function PillarRow({ pillar, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="max-w-2xl"
      style={{
        transition: `all 0.8s ease ${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        filter: visible ? "blur(0)" : "blur(3px)"
      }}>

      {/* Text */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-display select-none" style={{ color: pillar.accent, opacity: 0.18, fontSize: "3.5rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
            {pillar.number}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: `${pillar.accent}1A` }} />
        </div>
        <h3 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)", lineHeight: "1.2" }}>
          {pillar.title}
        </h3>
        <p className="font-body leading-relaxed mb-6" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
          {pillar.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {pillar.tags.map((tag) =>
          <span key={tag} className="font-body text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: `${pillar.accent}0A`, color: pillar.accent, border: `1px solid ${pillar.accent}20` }}>
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>);

}

export default function WalkAwaySection() {
  const headerRef = useRef(null);
  const portalRef = useRef(null);
  const deliverablesRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [portalVisible, setPortalVisible] = useState(false);
  const [deliverablesVisible, setDeliverablesVisible] = useState(false);
  useEffect(() => {
    const makeObs = (setter) => new IntersectionObserver(([e]) => {if (e.isIntersecting) setter(true);}, { threshold: 0.06 });
    const o1 = makeObs(setHeaderVisible);
    const o2 = makeObs(setPortalVisible);
    const o3 = makeObs(setDeliverablesVisible);
    if (headerRef.current) o1.observe(headerRef.current);
    if (portalRef.current) o2.observe(portalRef.current);
    if (deliverablesRef.current) o3.observe(deliverablesRef.current);
    return () => {o1.disconnect();o2.disconnect();o3.disconnect();};
  }, []);

  return (
    <section id="walkaway" className="pt-8 md:pt-12 overflow-hidden" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      <div className="max-w-6xl mx-auto px-6 md:px-12 overflow-hidden">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-5 md:mb-12 text-center"
          style={{ transition: "opacity 0.6s ease, transform 0.6s ease", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)" }}>

          <p className="font-micro mb-5 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            INSIDE THE STUDIO
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mb-3 mx-auto" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", maxWidth: "38rem", lineHeight: "1.2" }}>
            Everything works together to help you{" "}
            <em style={{ color: "#4D5E49" }}>keep moving forward.</em>
          </h2>
          <p className="font-body leading-relaxed mx-auto" style={{ color: "#5C5148", fontSize: "0.94rem", maxWidth: "44rem" }}>
            Instead of overwhelming courses and scattered information, Mama Launch gives you guided implementation, done-for-you tools, and real support in one place.
          </p>
        </div>

        {/* REAL ASSET — Portal mockup */}
        <div
          ref={portalRef}
          className="mb-0 mx-auto"
          style={{ maxWidth: "820px", overflow: "visible", transition: "opacity 0.6s ease, transform 0.6s ease", opacity: portalVisible ? 1 : 0, transform: portalVisible ? "translateY(0)" : "translateY(16px)" }}>

          <p className="font-micro mb-3 flex items-center justify-center gap-3 hidden" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>
            <span className="inline-block w-6 h-px" style={{ backgroundColor: "#C4956A44" }} />
            Inside the Mama Launch Platform
            <span className="inline-block w-6 h-px" style={{ backgroundColor: "#C4956A44" }} />
          </p>

          {/* Phone mockup image */}
          <div className="relative">
            <img
              src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c00815f2_Untitleddesign.png"
              alt="The Mama Launch Studio platform — your guided five-phase implementation dashboard"
              className="w-full h-auto block"
              style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.10)) drop-shadow(0 2px 8px rgba(196,149,106,0.10))" }}
            />
          </div>
          {/* Desktop 3-card studio breakdown */}
          <div className="hidden md:grid grid-cols-3 gap-5 mt-8">
            {[
              { title: "Interactive Guide", sub: "Step-by-step implementation", body: "Know exactly what to do next through guided phases, prompts, and progress tracking designed to keep you moving.", weight: "high", accent: "#4D5E49" },
              { title: "Done-for-You Tools", sub: "Templates that save time", body: "Open ready-made templates, checklists, parent resources, and operational tools without starting from scratch.", weight: "mid", accent: "#6B7E67" },
              { title: "The Village", sub: "Community support built in", body: "Ask questions, get unstuck, and build alongside mothers walking through the same process with you.", weight: "low", accent: "#C4956A" }
            ].map((card, i) => (
              <div key={card.title} className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  backgroundColor: i === 0 ? "#FFFDF9" : i === 1 ? "#F8F4EE" : "#F4EFE8",
                  border: `1px solid ${card.accent}18`,
                  boxShadow: i === 0 ? "0 8px 32px rgba(77,94,73,0.12)" : i === 1 ? "0 4px 16px rgba(77,94,73,0.07)" : "0 2px 8px rgba(196,149,106,0.06)"
                }}>
                <div style={{ height: "3px", background: `linear-gradient(90deg, ${card.accent}, ${card.accent}55)` }} />
                <div className="p-5 flex flex-col flex-1 gap-2.5">
                  <p className="font-micro" style={{ color: card.accent, fontSize: "0.6rem", letterSpacing: "0.12em" }}>{card.sub}</p>
                  <h3 className="font-display" style={{ color: "#2C2C2C", fontSize: i === 0 ? "1.25rem" : "1.05rem", lineHeight: "1.2" }}>{card.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#5C5148" }}>{card.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex justify-center mt-8">
            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro text-white px-8 py-4 rounded-full transition-all min-h-[52px]"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)" }}>
              Become a Founding Member
            </button>
          </div>
        </div>


      </div>
    </section>);

}