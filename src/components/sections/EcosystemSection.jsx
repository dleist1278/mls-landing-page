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
{ key: "village_feature", title: "Your Village" },
{ key: "phase_tracking_feature", title: "Your Progress" },
{ key: "implementation_tools_feature", title: "Your Tools" }];


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
      <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/a2409d929_Screenshot_2026-05-19_at_21305_PM.png"

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
    <section id="ecosystem" className="md:py-16 py-8 overflow-hidden" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px", maxWidth: "100vw", width: "100%" }}>


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
          <h2 className="font-display leading-tight mx-auto mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 5.5vw, 3.2rem)", maxWidth: "24ch", lineHeight: "1.2" }}>
            Everything works together to help you{" "}
            <em style={{ color: "#4D5E49" }}>keep moving.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "480px", fontSize: "0.92rem", lineHeight: "1.65" }}>
            A village that understands you. Built-in momentum to keep you progressing. Support that goes beyond motivation — straight into implementation.
          </p>
          <div className="mt-8 md:overflow-visible overflow-hidden" style={{ width: "150%", marginLeft: "-25%", marginRight: "-25%" }}>
            <img
              src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/79cea4da6_Untitleddesign.png"
              alt="Mama Launch platform — progress tracking, implementation tools, and community village"
              className="w-full h-auto block"
              style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.28)) drop-shadow(0 12px 32px rgba(196,149,106,0.22)) drop-shadow(0 4px 12px rgba(0,0,0,0.18))" }}
            />
          </div>
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
              
              <div className="relative w-full h-full rounded-[24px] overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)", zIndex: 1 }}>
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
        <div className="md:hidden -mx-6 overflow-hidden -mt-10">
          <style>{`
            @keyframes swipeNudge {
              0%   { transform: translateX(0px); opacity: 0.9; }
              30%  { transform: translateX(14px); opacity: 1; }
              60%  { transform: translateX(-4px); opacity: 0.7; }
              100% { transform: translateX(0px); opacity: 0.9; }
            }
            @keyframes swipeFadeOut {
              0%   { opacity: 1; }
              70%  { opacity: 1; }
              100% { opacity: 0; pointer-events: none; }
            }
          `}</style>
          {/* Swipe hint */}
          <div className="flex items-center justify-center gap-2 mb-3 px-5"
          style={{ animation: "swipeFadeOut 3.5s ease-out 1.2s forwards" }}>
            <div style={{ animation: "swipeNudge 1.1s ease-in-out 1.2s 3" }}
            className="flex items-center gap-1.5">
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>👆</span>
              <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.14em" }}>SWIPE TO EXPLORE</span>
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" style={{ opacity: 0.5 }}>
                <path d="M1 5h14M11 1l4 4-4 4" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div
            className="flex gap-3 overflow-x-auto pb-4 max-w-full hidden"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              WebkitScrollSnapType: "x mandatory",
              paddingLeft: "calc(50% - 150px)",
              paddingRight: "calc(50% - 150px + 20px)",
              animation: "peekNudge 0.9s ease-out 1.4s 1"
            }}>
            <style>{`
              @keyframes peekNudge {
                0%   { transform: translateX(0); }
                40%  { transform: translateX(-22px); }
                70%  { transform: translateX(-10px); }
                100% { transform: translateX(0); }
              }
            `}</style>
            
            {MOBILE_CARD_META.map((card) =>
            <div
              key={card.key}
              className="flex-none rounded-2xl overflow-hidden"
              style={{
                width: "300px",
                scrollSnapAlign: "center",
                background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)",
                border: "1px solid #E4D5C0",
                boxShadow: "0 8px 28px rgba(196,149,106,0.12), 0 1px 4px rgba(0,0,0,0.04)"
              }}>
              {/* Accent top bar */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, #C4956A, #C4956A88)" }} />
                <div className="w-full overflow-hidden hidden" style={{ height: "200px" }}>
                  {CARD_IMAGES[card.key] ? <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/a2409d929_Screenshot_2026-05-19_at_21305_PM.png" alt={card.key} className="w-full h-full object-contain object-center block hidden" style={{ filter: "saturate(0.82) brightness(0.97)" }} /> : null}
                </div>
                <div className="px-4 pt-2 pb-3 text-center hidden">
                  <h3 className="font-display text-sm font-semibold" style={{ color: "#4D5E49" }}>
                    {card.title}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-2 mt-4 hidden">
            <span className="h-2 w-2 rounded-full bg-[#566B4E]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C6B2]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C6B2]" />
          </div>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="mt-4 md:mt-10 mb-8 text-center mx-auto max-w-xl"
          style={{ transition: "opacity 0.6s ease", opacity: quoteVisible ? 1 : 0 }}>
          
          <blockquote className="font-display leading-relaxed mb-4" style={{ color: "#2C2C2C", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.35rem)", lineHeight: "1.5", maxWidth: "480px", margin: "0 auto 1rem" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <p className="font-micro hidden" style={{ color: "#4D5E49", fontSize: "0.68rem" }}>
            — Early Access Member, Mama Launch Studio
          </p>
        </div>
      </div>

    </section>);

}