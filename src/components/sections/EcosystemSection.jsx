import React, { useRef, useEffect, useState } from "react";

const VILLAGE_FEATURE_IMAGE = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/99a8aebd5_Screenshot2026-05-18at25207PM.png";
const PHASE_TRACKING_FEATURE_IMAGE = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/e63b44c25_Screenshot2026-05-18at31233PM.png";
const IMPLEMENTATION_TOOLS_FEATURE_IMAGE = "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/b0bf81438_Screenshot2026-05-18at25036PM.png";

const CARD_IMAGES = {
  village_feature: VILLAGE_FEATURE_IMAGE,
  phase_tracking_feature: PHASE_TRACKING_FEATURE_IMAGE,
  implementation_tools_feature: IMPLEMENTATION_TOOLS_FEATURE_IMAGE
};

const MOBILE_CARD_META = [
{ key: "village_feature", title: "A Village That Understands", description: "Connect with mothers building alongside you, asking questions, sharing wins, and navigating real motherhood life together." },
{ key: "phase_tracking_feature", title: "Built to Keep You Moving", description: "Mama Launch helps you continue making progress with guided accountability, milestone momentum, and support woven into every phase." },
{ key: "implementation_tools_feature", title: "Support Beyond Motivation", description: "This is not just inspiration. It is structure, encouragement, implementation support, and steady guidance when things feel overwhelming." }];


const pillars = [
{
  num: "01",
  title: "Implementation-First Guidance",
  description: "Every phase of the Mama Launch Method comes with structured checklists, templates, and operational tools — so you're always moving forward, never just consuming content.",
  items: [
  "State-specific licensing roadmaps",
  "Phase-by-phase implementation checklists",
  "Downloadable templates and workbooks",
  "Guided action steps in every module"]

},
{
  num: "02",
  title: "A Village That Moves Forward",
  description: "The Mama Launch community is implementation-focused, milestone-driven, and uplifting. We celebrate progress, share what's actually working, and move through the method together — a village helping a village.",
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
    </div>);

}

function CardImage({ cardKey }) {
  const imageUrl = CARD_IMAGES[cardKey] || "";

  return (
    <div className="w-full h-[210px] overflow-hidden rounded-xl border border-[#EAD9C8] bg-white shadow-[0_2px_8px_rgba(196,149,106,0.05)]">
      {imageUrl ?
      <img
        src={imageUrl}
        alt={cardKey}
        className="w-full h-full object-contain object-center block" /> :


      <div className="w-full h-[240px] rounded-2xl border border-dashed border-[#D8C6B2] bg-[#F4EFE6] flex items-center justify-center">
          <span className="text-sm text-[#566B4E]">Upload platform screenshot</span>
        </div>
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
    <section id="ecosystem" className="md:py-16 py-10 overflow-hidden" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px", maxWidth: "100vw" }}>
      <div className="w-full h-px mb-5 md:mb-10" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="text-center mb-5 md:mb-12"
          style={{ transition: "opacity 0.6s ease", opacity: headerVisible ? 1 : 0 }}>
          
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Inside the Studio
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mx-auto mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 4vw, 3.4rem)", maxWidth: "620px", lineHeight: "1.2" }}>
            Everything works together to help you{" "}
            <em style={{ color: "#4D5E49" }}>keep moving forward.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed hidden" style={{ color: "#5C5148", maxWidth: "500px", fontSize: "0.9rem", lineHeight: "1.6" }}>
            The Mama Launch community is operationally focused, uplifting, and milestone-driven — a village helping a village build something real.
          </p>
        </div>

        {/* Community image + pillars — desktop only */}
        <div className="grid md:grid-cols-5 gap-5 mb-10 items-center">
          <div className="hidden md:block md:col-span-2 self-stretch">
            <div className="relative h-full" style={{ minHeight: "360px" }}>
              <div
                className="absolute rounded-[24px]"
                style={{ inset: 0, transform: "translate(-8px, 8px)", backgroundColor: "#E8D5C0", opacity: 0.32, zIndex: 0 }} />
              
              <div className="relative w-full h-full rounded-[24px] overflow-hidden" style={{ boxShadow: "0 8px 36px rgba(196,149,106,0.1)", zIndex: 1 }}>
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/4df106e43_Untitled_design__1_.jpg"
                  alt="Mothers in a warm, supportive community gathering"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%", filter: "saturate(0.68) brightness(0.93)" }} />
                
              </div>
            </div>
          </div>
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
        <div className="md:hidden -mx-6 overflow-hidden">
          <div
            className="flex gap-3 overflow-x-auto px-5 pb-4 max-w-full"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              WebkitScrollSnapType: "x mandatory"
            }}>
            
            {MOBILE_CARD_META.map((card) =>
            <div
              key={card.key}
              className="flex-none w-[82vw] max-w-[340px] rounded-[24px] bg-[#FDFCFA] border border-[#EAD9C8] p-2.5 overflow-hidden"
              style={{ scrollSnapAlign: "start", boxShadow: "0 4px 18px rgba(196,149,106,0.07)" }}>
              
                <CardImage cardKey={card.key} />
                <div className="px-2 pt-3 pb-1.5">
                  <h3 className="font-display text-2xl text-[#2B2B28]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3A3A35]">{card.description}</p>
                </div>
              </div>
            )}
          </div>
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
          style={{ transition: "opacity 0.6s ease", opacity: quoteVisible ? 1 : 0 }}>
          
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