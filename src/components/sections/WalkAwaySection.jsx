import React, { useRef, useEffect, useState } from "react";

const studioCards = [
{ title: "Interactive Guide", sub: "Step-by-step implementation", body: "Know exactly what to do next through guided phases, prompts, and progress tracking designed to keep you moving.", accent: "#4D5E49" },
{ title: "Done-for-You Tools", sub: "Templates that save time", body: "Open ready-made templates, checklists, parent resources, and operational tools without starting from scratch.", accent: "#6B7E67" },
{ title: "The Village", sub: "Community support built in", body: "Ask questions, get unstuck, and build alongside mothers walking through the same process with you.", accent: "#C4956A" }];


export default function WalkAwaySection() {
  const headerRef = useRef(null);
  const portalRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [portalVisible, setPortalVisible] = useState(false);

  useEffect(() => {
    const makeObs = (setter) => new IntersectionObserver(([e]) => {if (e.isIntersecting) setter(true);}, { threshold: 0.06 });
    const o1 = makeObs(setHeaderVisible);
    const o2 = makeObs(setPortalVisible);
    if (headerRef.current) o1.observe(headerRef.current);
    if (portalRef.current) o2.observe(portalRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return (
    <section id="walkaway" className="pt-8 md:pt-12 overflow-hidden hidden" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 overflow-hidden">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-5 md:mb-10 text-center"
          style={{ transition: "opacity 0.6s ease, transform 0.6s ease", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)" }}>
          <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            INSIDE THE STUDIO
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mb-3 mx-auto" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", maxWidth: "32rem", lineHeight: "1.2" }}>
            Everything works together to help you{" "}
            <em style={{ color: "#4D5E49" }}>keep moving forward.</em>
          </h2>
          <p className="font-body leading-relaxed mx-auto" style={{ color: "#5C5148", fontSize: "0.94rem", maxWidth: "48ch", lineHeight: "1.7" }}>
            Instead of overwhelming courses and scattered information, Mama Launch gives you guided implementation, done-for-you tools, and real support in one place.
          </p>
        </div>

        {/* Platform mockup image */}
        <div
          ref={portalRef}
          className="mb-0 mx-auto"
          style={{ maxWidth: "820px", transition: "opacity 0.6s ease, transform 0.6s ease", opacity: portalVisible ? 1 : 0, transform: portalVisible ? "translateY(0)" : "translateY(16px)" }}>
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c00815f2_Untitleddesign.png"
            alt="The Mama Launch Studio platform — your guided five-phase implementation dashboard"
            className="w-full h-auto block"
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.10)) drop-shadow(0 2px 8px rgba(196,149,106,0.10))" }} />
          

          {/* 3 concept cards — desktop grid, mobile swipe */}
          <div className="hidden md:grid grid-cols-3 gap-5 mt-8">
            {studioCards.map((card, i) =>
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
            )}
          </div>

          {/* Mobile swipe cards */}
          <div className="md:hidden mt-6 overflow-hidden">
            <div className="flex gap-3 overflow-x-auto pb-3"
            style={{
              scrollSnapType: "x mandatory",
              overscrollBehaviorX: "contain",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingLeft: "calc(50% - 130px)",
              paddingRight: "calc(50% - 130px + 20px)"
            }}>
              {studioCards.map((card) =>
              <div key={card.title} className="flex-none rounded-2xl overflow-hidden"
              style={{ width: "260px", scrollSnapAlign: "center", background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)", border: "1px solid #E4D5C0", boxShadow: "0 4px 20px rgba(196,149,106,0.12)" }}>
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }} />
                  <div className="px-4 pt-3 pb-4">
                    <p className="font-micro mb-1" style={{ color: card.accent, fontSize: "0.58rem", letterSpacing: "0.1em" }}>{card.sub}</p>
                    <p className="font-display text-sm font-semibold mb-1.5" style={{ color: card.accent }}>{card.title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>{card.body}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8 mb-10">
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