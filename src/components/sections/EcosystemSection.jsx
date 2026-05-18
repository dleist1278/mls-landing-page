import React, { useRef, useEffect, useState } from "react";

const VILLAGE_FEATURE_IMAGE = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/9f2d05936_ChatGPTImageMay18202602_16_25PM.png";
const VILLAGE_FEATURE_POSITION = "center top";

const PHASE_TRACKING_FEATURE_IMAGE = "";
const PHASE_TRACKING_FEATURE_POSITION = "center top";

const IMPLEMENTATION_TOOLS_FEATURE_IMAGE = "";
const IMPLEMENTATION_TOOLS_FEATURE_POSITION = "center top";

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

const mobileCards = [
{
  title: "The Village",
  description: "Connect with other moms building alongside you.",
  image: VILLAGE_FEATURE_IMAGE,
  position: VILLAGE_FEATURE_POSITION
},
{
  title: "Phase Tracking",
  description: "See exactly where you are and what to do next.",
  image: PHASE_TRACKING_FEATURE_IMAGE,
  position: PHASE_TRACKING_FEATURE_POSITION
},
{
  title: "Implementation Tools",
  description: "Access templates, prompts, and guided action steps.",
  image: IMPLEMENTATION_TOOLS_FEATURE_IMAGE,
  position: IMPLEMENTATION_TOOLS_FEATURE_POSITION
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
      className="rounded-3xl p-4 pb-3.5 md:p-5 md:pb-4 flex flex-col w-full"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A1A",
        transition: `opacity 0.6s ease ${index * 100}ms`,
        opacity: visible ? 1 : 0,
        boxShadow: "0 4px 32px rgba(196,149,106,0.04)"
      }}>

      <h3 className="font-display text-lg md:text-xl mb-2" style={{ color: "#2C2C2C" }}>{pillar.title}</h3>
      

      <div className="w-full h-px mb-2" style={{ backgroundColor: "#C4956A22" }} />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 flex-1">
        {pillar.items.map((item) =>
        <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
            <span className="font-body text-sm" style={{ color: "#5C5148" }}>{item}</span>
          </li>
        )}
      </ul>

      {pillar.note &&
      <p className="font-body mt-4 pt-3 text-xs italic leading-relaxed" style={{ color: "#9a8f84", borderTop: "1px solid #C4956A14" }}>
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
    <section id="ecosystem" className="md:py-16 py-7" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px" }}>
      <div className="w-full h-px mb-5 md:mb-10" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="text-center mb-5 md:mb-12"
          style={{
            transition: "opacity 0.6s ease",
            opacity: headerVisible ? 1 : 0
          }}>
          
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Community & Support
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mx-auto mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 4vw, 3.4rem)", maxWidth: "620px", lineHeight: "1.2" }}>
            Implementation Support,{" "}
            <br />
            <em style={{ color: "#4D5E49" }}>Not Just Inspiration.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "500px", fontSize: "0.9rem", lineHeight: "1.6" }}>
            The Mama Launch community is operationally focused, uplifting, and milestone-driven — a village helping a village build something real.
          </p>
        </div>

        {/* Community image + pillars */}
        <div className="grid md:grid-cols-5 gap-5 mb-10 items-center">
          {/* Image — hidden on mobile */}
          <div className="hidden md:block md:col-span-2 self-stretch">
            {/* Relative wrapper fills full column height */}
            <div className="relative h-full" style={{ minHeight: "360px" }}>
              <div
                className="absolute rounded-[24px]"
                style={{
                  inset: 0,
                  transform: "translate(-8px, 8px)",
                  backgroundColor: "#E8D5C0",
                  opacity: 0.32,
                  zIndex: 0
                }} />
              
              <div
                className="relative w-full h-full rounded-[24px] overflow-hidden"
                style={{ boxShadow: "0 8px 36px rgba(196,149,106,0.1)", zIndex: 1 }}>
                
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/4df106e43_Untitled_design__1_.jpg"
                  alt="Mothers in a warm, supportive community gathering"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%", filter: "saturate(0.68) brightness(0.93)" }} />
                
              </div>
            </div>
          </div>
          {/* Pillars — desktop only stacked */}
          <div className="hidden md:block md:col-span-3">
            <div className="flex flex-col gap-3">
              {pillars.slice(0, 2).map((pillar, i) =>
              <div key={pillar.num}>
                <PillarCard pillar={pillar} index={i} />
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile swipe cards */}
        <div className="md:hidden -mx-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ overscrollBehaviorX: "contain", WebkitOverflowScrolling: "touch" }}>
            {mobileCards.map((card) =>
            <div key={card.title} className="flex-none min-w-[86%] snap-center rounded-[28px] bg-white/75 border border-[#E8D8C7] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden">
                {card.image ?
              <div className="w-full h-[210px] rounded-2xl border border-[#E8D8C7] overflow-hidden">
                    <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/0163ef7f7_Screenshot_2026-05-18_at_22025_PM.png"

                alt={card.title}
                className="w-full h-full object-cover"
                style={{ backgroundColor: "#F4EFE6", objectPosition: card.position }} />
                
                  </div> :

              <div className="h-[210px] rounded-2xl border border-dashed border-[#D8C6B2] bg-[#F4EFE6] flex items-center justify-center">
                    <span className="text-sm text-[#566B4E]">Upload platform screenshot</span>
                  </div>
              }
                <div className="px-2 pt-4 pb-2">
                  <h3 className="font-display text-2xl text-[#2B2B28]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3A3A35]">{card.description}</p>
                </div>
              </div>
            )}
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            <span className="h-2 w-2 rounded-full bg-[#566B4E]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C6B2]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C6B2]" />
          </div>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="mt-4 md:mt-10 text-center mx-auto max-w-xl"
          style={{
            transition: "opacity 0.6s ease",
            opacity: quoteVisible ? 1 : 0
          }}>
          
          <div className="w-8 h-px mx-auto mb-5" style={{ backgroundColor: "#C4956A" }} />
          <blockquote className="font-display leading-relaxed mb-4" style={{ color: "#2C2C2C", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.35rem)", lineHeight: "1.5", maxWidth: "480px", margin: "0 auto 1rem" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.68rem" }}>
            — Early Access Member, Mama Launch Studio
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-6 md:mt-10" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>);

}