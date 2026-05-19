import React, { useRef, useEffect, useState } from "react";

const pathways = [
{
  id: "home-daycare",
  tag: "NOW ENROLLING",
  tagActive: true,
  title: "Home Daycare / Nursery",
  description:
  "Best for mothers wanting a home-based childcare program naturally woven into daily family life.",
  features: ["Flexible pace", "Guided licensing", "Templates", "Village support"],
  cta: "Explore this path",
  ctaAction: "intake"
},
{
  id: "kids-programs",
  tag: "Coming Soon",
  tagActive: false,
  title: "Kids Programs",
  description:
  "For mothers wanting to host enrichment-style classes, drop-ins, or small group programs from home.",
  features: [],
  cta: null
},
{
  id: "homeschool-pods",
  tag: "Coming Soon",
  tagActive: false,
  title: "Homeschool Pods",
  description:
  "For mothers wanting to build intentional small-group learning environments with more flexibility and autonomy.",
  features: [],
  cta: null
}];


export default function ModelsSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) setHeaderVisible(true);},
      { threshold: 0.1 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const cardWidth = el.scrollWidth / pathways.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, pathways.length - 1));
  };

  return (
    <section
      id="models"
      className="py-10 md:py-16 pb-0 md:pb-0 overflow-hidden"
      style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px", maxWidth: "100vw" }}>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-5 md:mb-14"
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)"
          }}>
          
          {/* Desktop header */}
          <div className="hidden md:block">
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Program Pathways
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <h2 className="font-display leading-tight break-words" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 5vw, 3.6rem)", maxWidth: "100%", overflowWrap: "break-word" }}>
                One Method.{" "}
                <br />
                <em style={{ color: "#4D5E49" }}>Built Around Your Life.</em>
              </h2>
            </div>
          </div>

          {/* Mobile header */}
          <div className="md:hidden">
            <p className="font-micro mb-3 inline-flex items-center gap-3 w-full justify-center" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              NOW ENROLLING
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            </p>
            <h2
              className="font-display leading-tight mb-3 text-center"
              style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 5.5vw, 3.2rem)", lineHeight: "1.2", maxWidth: "22ch", margin: "0 auto 0.75rem" }}>
              
              Choose the path that <em style={{ color: "#4D5E49" }}>fits your motherhood life.</em>
            </h2>


          </div>
        </div>

        {/* Desktop: original layout unchanged */}
        <div className="hidden md:block">
          <div
            className="rounded-3xl p-10 mb-6 relative overflow-hidden"
            style={{
              backgroundColor: "#F0EBE1",
              border: "1px solid #4D5E4930",
              boxShadow: "0 6px 36px rgba(77,94,73,0.08)"
            }}>

            {/* Corner ribbon — Spots Limited */}
            <div style={{ position: "absolute", top: "18px", left: "-28px", zIndex: 10, transform: "rotate(-45deg)", width: "120px", textAlign: "center", backgroundColor: "#C4956A", padding: "5px 0", boxShadow: "0 2px 8px rgba(196,149,106,0.3)" }}>
              <span className="font-micro" style={{ color: "#fff", fontSize: "0.55rem", letterSpacing: "0.1em" }}>SPOTS LIMITED</span>
            </div>

            <style>{`
              @keyframes enrollPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
              }
            `}</style>
            
            <div className="flex flex-col md:flex-row md:gap-10 gap-6">
              <div className="flex-1">
                <div className="flex justify-center mb-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "#4D5E4918", border: "1px solid #4D5E4930" }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4D5E49", animation: "enrollPulse 1.6s ease-in-out infinite" }} />
                    <span className="font-micro" style={{ color: "#4D5E49", fontSize: "0.68rem", animation: "enrollPulse 1.6s ease-in-out infinite" }}>Now Enrolling</span>
                  </div>
                </div>
                <h3 className="font-display mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                  Home Daycare / Nursery
                </h3>
                <p className="font-body leading-relaxed mb-6" style={{ color: "#5C5148", fontSize: "1rem", maxWidth: "520px" }}>
                  Launch a calm, intentional home childcare program designed around your family life, licensing goals, and community needs. This is the core Mama Launch pathway — full-time, part-time, nursery-style, or mixed-age.
                </p>
                <button
                  onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-micro text-white px-6 py-3 rounded-full transition-all min-h-[44px] focus-sage"
                  style={{ backgroundColor: "#4D5E49", fontSize: "0.7rem", boxShadow: "0 4px 20px rgba(77,94,73,0.18)" }}>
                  
                  Join the Founding Member Waitlist
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
            { title: "Drop-In Childcare", description: "Flexible short-format care models built around specific time blocks, rhythms, or caregiver schedules. Ideal for mothers who want to start smaller or offer need-based care." },
            { title: "Kids Classes & Enrichment Programs", description: "Creative, movement-based, sensory, or educational programs hosted from home or community spaces. A village-centered model for mothers with an educational or developmental focus." }].
            map((m) =>
            <div
              key={m.title}
              className="rounded-3xl p-6 flex flex-col gap-2.5"
              style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A1A", opacity: 0.65 }}>
              
                <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full" style={{ backgroundColor: "#C4956A10", border: "1px solid #C4956A22" }}>
                  <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem" }}>Coming Soon</span>
                </div>
                <div className="w-8 h-px" style={{ backgroundColor: "#C4956A44" }} />
                <h3 className="font-display text-xl" style={{ color: "#2C2C2C", opacity: 0.75 }}>{m.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#8C7E75" }}>{m.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: swipeable pathway chooser */}
        <div className="md:hidden w-full max-w-full overflow-hidden">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto w-full"
            style={{
              scrollSnapType: "x mandatory",
              WebkitScrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "contain",
              gap: "10px",
              paddingRight: "20px",
              willChange: "scroll-position"
            }}>
            
            {pathways.map((pathway, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={pathway.id}
                  style={{
                    scrollSnapAlign: "start",
                    flex: "0 0 calc(100% - 20px)",
                    maxWidth: "calc(100% - 20px)",
                    minHeight: "260px",
                    borderRadius: "20px",
                    padding: "28px 22px",
                    backgroundColor: isActive ? "#F5F1EB" : "transparent",
                    border: `1px solid ${isActive ? "#C4956A18" : "transparent"}`,
                    boxShadow: "none",
                    opacity: isActive ? 1 : 0.35,
                    transition: "opacity 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}>

                  {/* Corner ribbon — only on first (home-daycare) card */}
                  {pathway.tagActive && (
                    <div style={{ position: "absolute", top: "14px", left: "-22px", zIndex: 10, transform: "rotate(-45deg)", width: "100px", textAlign: "center", backgroundColor: "#C4956A", padding: "4px 0", boxShadow: "0 2px 6px rgba(196,149,106,0.3)" }}>
                      <span className="font-micro" style={{ color: "#fff", fontSize: "0.48rem", letterSpacing: "0.1em" }}>SPOTS LIMITED</span>
                    </div>
                  )}
                  
                  <div className="mb-2.5">
                    <span
                      className="font-micro"
                      style={{
                        color: pathway.tagActive ? "#4D5E49" : "#C4956A",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        animation: pathway.tagActive ? "enrollPulse 1.6s ease-in-out infinite" : "none"
                      }}>
                      {pathway.tag}
                    </span>
                  </div>

                  <h3
                    className="font-display leading-snug mb-2 font-bold"
                    style={{ color: "#2C2C2C", fontSize: "1.05rem" }}>
                    {pathway.title}
                  </h3>

                  <p
                    className="font-body leading-snug mb-3"
                    style={{ color: "#5C5148", fontSize: "0.82rem", lineHeight: "1.55" }}>
                    {pathway.description}
                  </p>

                  {pathway.features.length > 0 &&
                  <div className="flex flex-wrap gap-1 mb-3 justify-center">
                      {pathway.features.map((f) =>
                    <span
                      key={f}
                      className="font-micro px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(77,94,73,0.06)",
                        color: "#4D5E49",
                        fontSize: "0.6rem",
                        letterSpacing: "0.06em"
                      }}>
                          {f}
                        </span>
                    )}
                    </div>
                  }

                  <div className="mt-auto">
                    {pathway.cta ?
                    <button
                      onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                      className="font-micro px-5 py-2 rounded-full min-h-[44px]"
                      style={{
                        backgroundColor: "#4D5E49",
                        color: "#fff",
                        fontSize: "0.7rem",
                        border: "none",
                        boxShadow: "0 3px 14px rgba(77,94,73,0.13)"
                      }}>
                        {pathway.cta}
                      </button>
                    :
                    <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem", letterSpacing: "0.08em" }}>Coming Soon</span>
                    }
                  </div>
                </div>);

            })}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {pathways.map((_, i) =>
            <span
              key={i}
              style={{
                width: i === activeIndex ? "12px" : "5px",
                height: "5px",
                borderRadius: "3px",
                backgroundColor: i === activeIndex ? "#4D5E4960" : "#C4956A28",
                transition: "width 0.25s ease, background-color 0.25s ease",
                display: "inline-block"
              }} />

            )}
          </div>
        </div>
      </div>

      {/* Cohort date — full width, below all cards */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-8 md:mt-10 pb-10 md:pb-14">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.25 }} />
          <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.65rem", letterSpacing: "0.16em", whiteSpace: "nowrap" }}>
            FOUNDING COHORT BEGINS
          </p>
          <div className="flex-1 h-px" style={{ backgroundColor: "#C4956A", opacity: 0.25 }} />
        </div>
        <p className="font-display text-center mt-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.2 }}>
          <em style={{ color: "#4D5E49" }}>July 6th.</em>
        </p>
        <p className="font-body text-center mt-2" style={{ color: "#9a8f84", fontSize: "0.82rem" }}>
          A small cohort. A supported start.
        </p>

        {/* Founding member value line */}
        <div className="flex flex-col items-center gap-2 mt-5">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="font-micro px-3 py-1 rounded-full" style={{ backgroundColor: "#4D5E4912", border: "1px solid #4D5E4928", color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
              FOUNDING MEMBERSHIP FREE
            </span>
            <span className="font-micro" style={{ color: "#C4956A44", fontSize: "0.6rem" }}>·</span>
            <span className="font-body" style={{ color: "#9a8f84", fontSize: "0.78rem" }}>
              Saving <span style={{ color: "#2C2C2C", textDecoration: "line-through", opacity: 0.5 }}>$47</span> when we launch for the <em>2026 school year</em>
            </span>
          </div>
        </div>
      </div>

      {/* BUILD IN MOTION — mobile only */}
      <div className="md:hidden">
















        
        </div>
    </section>);

}