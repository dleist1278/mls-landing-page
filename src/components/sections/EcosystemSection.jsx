import React, { useRef, useEffect, useState } from "react";

const pillars = [
{
  num: "01",
  title: "Implementation-First Guidance",
  description:
  "Every phase of the Mama Launch Method comes with structured checklists, templates, and operational tools — so you're always moving forward, never just consuming content.",
  items: [
  "State-specific licensing roadmaps",
  "Phase-by-phase implementation checklists",
  "Downloadable templates and workbooks",
  "Guided action steps in every module"]
},
{
  num: "02",
  title: "A Village That Moves Forward",
  description:
  "The Mama Launch community is implementation-focused, milestone-driven, and uplifting. We celebrate progress, share what's actually working, and move through the method together — a village helping a village.",
  items: [
  "Private peer implementation community",
  "Cohort-based milestone tracking",
  "Monthly live community calls",
  "Phase-organized peer support groups"]
}];



function PillarCard({ pillar, index }) {
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
      className="rounded-3xl p-7 flex flex-col"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A1A",
        transition: `all 0.8s ease ${index * 140}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        filter: visible ? "blur(0)" : "blur(2px)",
        boxShadow: "0 4px 32px rgba(196,149,106,0.04)"
      }}>
      
      <div className="w-7 h-7 rounded-full mb-5 flex items-center justify-center flex-none" style={{ backgroundColor: "#4D5E49" }}>
        <span className="font-display text-white" style={{ fontSize: "0.65rem" }}>{pillar.num}</span>
      </div>

      <h3 className="font-display text-xl mb-3" style={{ color: "#2C2C2C" }}>{pillar.title}</h3>
      <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "#5C5148" }}>{pillar.description}</p>

      <div className="w-full h-px mb-4" style={{ backgroundColor: "#C4956A22" }} />

      <ul className="flex flex-col gap-2.5 flex-1">
        {pillar.items.map((item) =>
        <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
            <span className="font-body text-sm" style={{ color: "#5C5148" }}>{item}</span>
          </li>
        )}
      </ul>

      {pillar.note &&
      <p className="font-body mt-5 pt-4 text-xs italic leading-relaxed" style={{ color: "#9a8f84", borderTop: "1px solid #C4956A14" }}>
          {pillar.note}
        </p>
      }
    </div>);

}

export default function EcosystemSection() {
  const headerRef = useRef(null);
  const quoteRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setHeaderVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setQuoteVisible(true);}, { threshold: 0.08 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (quoteRef.current) o2.observe(quoteRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return (
    <section id="ecosystem" className="md:py-24 py-16" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="w-full h-px mb-14" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            filter: headerVisible ? "blur(0)" : "blur(2px)"
          }}>
          
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Community & Support
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mx-auto mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", maxWidth: "620px" }}>
            Implementation Support,{" "}
            <em style={{ color: "#4D5E49" }}>Not Just Inspiration.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "500px", fontSize: "0.95rem" }}>
            The Mama Launch community is operationally focused, uplifting, and milestone-driven — a village helping a village build something real.
          </p>
        </div>

        {/* Community image + pillars */}
        <div className="grid md:grid-cols-5 gap-5 mb-10 items-start">
          {/* Image — hidden on mobile to avoid awkward stacking */}
          <div className="hidden md:block md:col-span-2 rounded-3xl overflow-hidden" style={{ height: "520px" }}>
            <img
              src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/4df106e43_Untitled_design__1_.jpg"
              alt="Mothers in a warm, supportive community gathering"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%", filter: "saturate(0.68) brightness(0.93)" }}
            />
          </div>
          {/* Pillars */}
          <div className="md:col-span-3 flex flex-col gap-4">
            {pillars.slice(0, 2).map((pillar, i) =>
            <PillarCard key={pillar.num} pillar={pillar} index={i} />
            )}
          </div>
        </div>



        {/* Quote */}
        <div
          ref={quoteRef}
          className="mt-14 text-center mx-auto max-w-xl"
          style={{
            transition: "all 0.8s ease",
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "translateY(0)" : "translateY(20px)"
          }}>
          
          <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: "#C4956A" }} />
          <blockquote className="font-display text-xl md:text-2xl leading-relaxed mb-4" style={{ color: "#2C2C2C", fontStyle: "italic" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.68rem" }}>
            — Early Access Member, Mama Launch Studio
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-14" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>);

}