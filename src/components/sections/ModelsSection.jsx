import React, { useRef, useEffect, useState } from "react";

const activeModel = {
  tag: "Active Now",
  title: "Home Daycare / Nursery",
  description:
  "Launch a calm, intentional home childcare program designed around your family life, licensing goals, and community needs. This is the core Mama Launch pathway — full-time, part-time, nursery-style, or mixed-age.",
  features: [
  "State licensing navigation & documentation",
  "Full-time, part-time & mixed-age structures",
  "Room planning & environment design",
  "Enrollment, pricing & parent communication",
  "Daily rhythm & curriculum framework",
  "Waitlist, tour & launch workflows"]

};

const comingSoon = [
{
  title: "Drop-In Childcare",
  description:
  "Flexible short-format care models built around specific time blocks, rhythms, or caregiver schedules. Ideal for mothers who want to start smaller or offer need-based care."
},
{
  title: "Kids Classes & Enrichment Programs",
  description:
  "Creative, movement-based, sensory, or educational programs hosted from home or community spaces. A village-centered model for mothers with an educational or developmental focus."
}];


export default function ModelsSection() {
  const headerRef = useRef(null);
  const activeRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeVisible, setActiveVisible] = useState(false);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setHeaderVisible(true);}, { threshold: 0.1 });
    const obs2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setActiveVisible(true);}, { threshold: 0.08 });
    if (headerRef.current) obs1.observe(headerRef.current);
    if (activeRef.current) obs2.observe(activeRef.current);
    return () => {obs1.disconnect();obs2.disconnect();};
  }, []);

  return (
    <section id="models" className="py-10 md:py-16" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-14"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(28px)",
            filter: headerVisible ? "blur(0)" : "blur(3px)"
          }}>
          
          <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Program Pathways
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-display leading-tight break-words" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 5vw, 3.6rem)", maxWidth: "100%", overflowWrap: "break-word" }}>
              One Method.{" "}
              <em style={{ color: "#4D5E49" }}>Built Around Your Life.</em>
            </h2>
            <p className="font-body md:max-w-xs leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
              Built to meet you where you are — whatever form your program takes.
            </p>
          </div>
        </div>

        {/* Active pathway — prominent */}
        <div
          ref={activeRef}
          className="rounded-3xl p-7 md:p-10 mb-6"
          style={{
            backgroundColor: "#F0EBE1",
            border: "1px solid #4D5E4930",
            boxShadow: "0 6px 36px rgba(77,94,73,0.08)",
            transition: "all 0.8s ease",
            opacity: activeVisible ? 1 : 0,
            transform: activeVisible ? "translateY(0)" : "translateY(28px)",
            filter: activeVisible ? "blur(0)" : "blur(3px)"
          }}>
          
          <div className="flex flex-col md:flex-row md:gap-10 gap-8">
            <div className="flex-1">
              {/* Active badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: "#4D5E4918", border: "1px solid #4D5E4930" }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                <span className="font-micro" style={{ color: "#4D5E49", fontSize: "0.68rem" }}>Active Pathway — Now Enrolling</span>
              </div>

              <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: "#4D5E49" }} />
              <h3 className="font-display mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                {activeModel.title}
              </h3>
              <p className="font-body leading-relaxed mb-8" style={{ color: "#5C5148", fontSize: "1rem", maxWidth: "520px" }}>
                {activeModel.description}
              </p>
              <button
                onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                className="font-micro text-white px-8 py-4 rounded-full transition-all min-h-[52px] focus-sage"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 4px 20px rgba(77,94,73,0.18)" }}>
                
                Join the Founding Member Waitlist
              </button>
            </div>

            {/* Feature list */}
            <div className="md:w-72 flex-none">
              <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>
                Guided through the Mama Launch Method
              </p>
              <div className="w-full h-px mb-5" style={{ backgroundColor: "#C4956A22" }} />
              <ul className="flex flex-col gap-3.5">
                {activeModel.features.map((f) =>
                <li key={f} className="flex items-start gap-3">
                    <span className="mt-1.5 flex-none w-2 h-2 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                    <span className="font-body text-sm" style={{ color: "#5C5148" }}>{f}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Coming soon pathways */}
        <div className="grid md:grid-cols-2 gap-4">
          {comingSoon.map((m, i) =>
          <ComingSoonCard key={m.title} model={m} index={i} />
          )}
        </div>
      </div>
    </section>);

}

function ComingSoonCard({ model, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 flex flex-col gap-3"
      style={{
        backgroundColor: "#FAF7F2",
        border: "1px solid #C4956A1A",
        opacity: visible ? 0.88 : 0,
        transform: visible ? "translateY(0)" : `translateY(${20 + index * 6}px)`,
        filter: visible ? "blur(0)" : "blur(2px)",
        transition: `all 0.7s ease ${index * 120}ms`
      }}>
      
      {/* Coming soon badge */}
      <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full" style={{ backgroundColor: "#C4956A10", border: "1px solid #C4956A22" }}>
        <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem" }}>Coming Soon</span>
      </div>

      <div className="w-8 h-px" style={{ backgroundColor: "#C4956A44" }} />
      <h3 className="font-display text-xl" style={{ color: "#2C2C2C", opacity: 0.75 }}>
        {model.title}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: "#8C7E75" }}>
        {model.description}
      </p>
      <button
        onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
        className="font-micro self-start mt-2 px-5 py-2.5 rounded-full border transition-all min-h-[40px] focus-sage"
        style={{ color: "#C4956A", borderColor: "#C4956A40", fontSize: "0.7rem", backgroundColor: "rgba(196,149,106,0.04)" }}>
        
        Join the Waitlist
      </button>
    </div>);

}