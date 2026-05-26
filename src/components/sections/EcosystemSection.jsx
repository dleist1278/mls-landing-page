import React, { useRef, useEffect, useState } from "react";

const communityCards = [
{
  num: "01",
  title: "A Village That Understands",
  description: "Connect with mothers building alongside you, asking questions, sharing wins, and navigating real motherhood life together.",
  items: ["Private peer community", "Cohort-based milestone support", "Monthly live community calls", "Phase-organized groups"]
},
{
  num: "02",
  title: "Built to Keep You Moving",
  description: "Mama Launch helps you continue making progress with guided accountability, milestone momentum, and support woven into every phase.",
  items: ["Phase-by-phase checklists", "Progress tracking", "Guided action steps", "Implementation sprints"]
},
{
  num: "03",
  title: "Support Beyond Motivation",
  description: "Real answers to real questions — operational, licensing, family, and business challenges addressed with people who understand your path.",
  items: ["Ask-anything community threads", "Expert Q&A sessions", "Peer accountability pairs", "Implementation feedback"]
}];


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
    <section id="ecosystem" className="py-10 md:py-16 overflow-hidden hidden" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px", maxWidth: "100vw", width: "100%", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header — shared mobile + desktop */}
        <div
          ref={headerRef}
          className="text-center mb-8 md:mb-12"
          style={{ transition: "opacity 0.6s ease", opacity: headerVisible ? 1 : 0 }}>
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            COMMUNITY &amp; SUPPORT
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mx-auto mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", maxWidth: "28ch", lineHeight: "1.2" }}>
            Implementation Support,{" "}
            <em style={{ color: "#4D5E49" }}>Not Just Inspiration.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "480px", fontSize: "0.92rem", lineHeight: "1.65" }}>
            The Mama Launch community is operationally focused, uplifting, and milestone-driven — a village helping a village build something real.
          </p>

          {/* Platform image — both mobile and desktop */}
          <div className="mt-8 overflow-hidden" style={{ width: "150%", marginLeft: "-25%", marginRight: "-25%" }}>
            <img
              src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/79cea4da6_Untitleddesign.png"
              alt="Mama Launch platform — progress tracking, implementation tools, and community village"
              className="w-full h-auto block"
              style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12)) drop-shadow(0 2px 8px rgba(196,149,106,0.10))" }} />
          </div>
        </div>

        {/* 3 community cards — desktop grid, mobile swipe */}
        <div className="hidden md:grid grid-cols-3 gap-5 mb-10">
          {communityCards.map((card, i) =>
          <div key={card.num} className="rounded-3xl p-5 flex flex-col"
          style={{ backgroundColor: "#FFFDF9", border: "1px solid #C4956A1A", boxShadow: "0 4px 32px rgba(196,149,106,0.04)" }}>
              <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.12em" }}>{card.num}</p>
              <h3 className="font-display text-lg mb-2" style={{ color: "#2C2C2C" }}>{card.title}</h3>
              <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#5C5148" }}>{card.description}</p>
              <div className="w-full h-px mb-3" style={{ backgroundColor: "#C4956A22" }} />
              <ul className="flex flex-col gap-1.5 flex-1">
                {card.items.map((item) =>
              <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                    <span className="font-body text-sm" style={{ color: "#5C5148" }}>{item}</span>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile swipe cards */}
        <div className="md:hidden mb-8 overflow-hidden">
          <div className="flex gap-3 overflow-x-auto pb-3"
          style={{
            scrollSnapType: "x mandatory",
            overscrollBehaviorX: "contain",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "calc(50% - 140px)",
            paddingRight: "calc(50% - 140px + 20px)"
          }}>
            {communityCards.map((card) =>
            <div key={card.num} className="flex-none rounded-2xl overflow-hidden"
            style={{ width: "280px", scrollSnapAlign: "center", background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)", border: "1px solid #E4D5C0", boxShadow: "0 4px 20px rgba(196,149,106,0.10)" }}>
                <div style={{ height: "3px", background: "linear-gradient(90deg, #4D5E49, #4D5E4955)" }} />
                <div className="px-4 pt-3 pb-4">
                  <p className="font-micro mb-1" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.1em" }}>{card.num}</p>
                  <p className="font-display text-sm font-semibold mb-1.5" style={{ color: "#2C2C2C" }}>{card.title}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>{card.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="mt-4 md:mt-6 mb-8 text-center mx-auto max-w-xl"
          style={{ transition: "opacity 0.6s ease", opacity: quoteVisible ? 1 : 0 }}>
          <blockquote className="font-display leading-relaxed mb-6" style={{ color: "#2C2C2C", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.35rem)", lineHeight: "1.5", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro text-white px-8 py-4 rounded-full transition-all min-h-[52px]"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)" }}>
              Join the Founding Member Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>);

}