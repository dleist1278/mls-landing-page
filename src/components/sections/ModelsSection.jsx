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
  features: ["Drop-in care", "Class formats", "Flexible hours", "Village support"],
  cta: null
},
{
  id: "homeschool-pods",
  tag: "Coming Soon",
  tagActive: false,
  title: "Homeschool Pods",
  description:
  "For mothers wanting to build intentional small-group learning environments with more flexibility and autonomy.",
  features: ["Small groups", "Custom curriculum", "Autonomy", "Village support"],
  cta: null
},
{
  id: "caregiver-babysitter",
  tag: "Coming Soon",
  tagActive: false,
  title: "Caregiver / Babysitter",
  description:
  "For mothers offering dedicated in-home care to one family — following the Mama Launch Method with the option to bring their own child as a natural enhancement to family life.",
  features: ["One-family focus", "Flexible hours", "Child-friendly", "Village support"],
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
      className="py-10 md:py-16 pb-6 md:pb-0 overflow-hidden"
      style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px", maxWidth: "100vw", width: "100%", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      
      <div className="max-w-5xl mx-auto px-5 md:px-12 max-w-full overflow-hidden">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-5 md:mb-14"
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)"
          }}>
          
          {/* Desktop header — matches mobile */}
          <div className="hidden md:block text-center">
            <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              NOW ENROLLING
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            </p>
            <h2 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2" }}>
              Choose the path that fits{" "}
              <em style={{ color: "#4D5E49" }}>your motherhood life.</em>
            </h2>
            <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.65", maxWidth: "52ch" }}>
              Every pathway is designed to help you build steadily with guided support, flexible structure, and real implementation tools.
            </p>
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

        {/* Desktop: 3-column pathway cards matching mobile content */}
        <style>{`
          @keyframes enrollPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
        <div className="hidden md:grid grid-cols-4 gap-5">
          {[pathways[1], pathways[0], pathways[2], pathways[3]].map((pathway, i) => (
            <div key={pathway.id} className="rounded-3xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#FFFDF9",
                border: `1px solid ${pathway.tagActive ? "#4D5E4940" : "#C4956A22"}`,
                boxShadow: pathway.tagActive ? "0 8px 40px rgba(77,94,73,0.14)" : "none",
                opacity: pathway.tagActive ? 1 : 0.75,
                position: "relative"
              }}>
              {pathway.tagActive && (
                <div style={{ position: "absolute", top: "14px", left: "-22px", zIndex: 10, transform: "rotate(-45deg)", width: "100px", textAlign: "center", backgroundColor: "#C4956A", padding: "4px 0", boxShadow: "0 2px 6px rgba(196,149,106,0.3)" }}>
                  <span className="font-micro" style={{ color: "#fff", fontSize: "0.48rem", letterSpacing: "0.1em" }}>SPOTS LIMITED</span>
                </div>
              )}
              <div style={{ height: "3px", background: pathway.tagActive ? "linear-gradient(90deg, #4D5E49, #4D5E4955)" : "linear-gradient(90deg, #C4956A55, #C4956A22)" }} />
              <div className="p-7 flex flex-col flex-1 gap-3">
                <div className="flex justify-center">
                  {pathway.tagActive ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#4D5E4918", border: "1px solid #4D5E4930" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49", animation: "enrollPulse 1.6s ease-in-out infinite" }} />
                      <span className="font-micro" style={{ color: "#4D5E49", fontSize: "0.62rem" }}>{pathway.tag}</span>
                    </div>
                  ) : (
                    <span className="font-micro px-3 py-1.5 rounded-full" style={{ backgroundColor: "#C4956A10", border: "1px solid #C4956A22", color: "#C4956A", fontSize: "0.62rem" }}>{pathway.tag}</span>
                  )}
                </div>
                <h3 className="font-display text-center" style={{ color: "#2C2C2C", fontSize: "1.35rem", lineHeight: "1.2" }}>{pathway.title}</h3>
                <p className="font-body text-sm leading-relaxed flex-1 text-center" style={{ color: "#5C5148" }}>{pathway.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-2 justify-center">
                  {pathway.features.map((f) => (
                    <span key={f} className="font-micro px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(77,94,73,0.06)", color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.06em" }}>{f}</span>
                  ))}
                </div>
                {pathway.cta ? (
                  <button onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                    className="font-micro text-white px-7 py-3.5 rounded-full min-h-[48px] mt-auto"
                    style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", letterSpacing: "0.08em", boxShadow: "0 6px 24px rgba(77,94,73,0.24)" }}>
                    Join the Founding Member Waitlist
                  </button>
                ) : (
                  <span className="font-micro px-5 py-2.5 rounded-full inline-flex items-center justify-center mt-auto" style={{ backgroundColor: "rgba(196,149,106,0.08)", color: "#C4956A", fontSize: "0.68rem", border: "1px solid rgba(196,149,106,0.22)", letterSpacing: "0.08em" }}>Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: swipeable pathway chooser */}
        <div className="md:hidden w-full max-w-full overflow-hidden">
          <style>{`
            @keyframes modelsPeekNudge {
              0%   { transform: translateX(0); }
              40%  { transform: translateX(-18px); }
              70%  { transform: translateX(-8px); }
              100% { transform: translateX(0); }
            }
          `}</style>
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
              touchAction: "pan-x",
              gap: "12px",
              paddingLeft: "calc(50% - 40vw)",
              paddingRight: "calc(50% - 40vw + 24px)",
              willChange: "scroll-position",
              animation: "modelsPeekNudge 0.9s ease-out 1.4s 1"
            }}>
            
            {pathways.map((pathway, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={pathway.id}
                  style={{
                    scrollSnapAlign: "center",
                    flex: "0 0 80vw",
                    maxWidth: "320px",
                    minHeight: "260px",
                    borderRadius: "20px",
                    padding: "28px 22px",
                    backgroundColor: isActive ? "#FFFDF9" : "#DDD4C7",
                    border: `1px solid ${isActive ? "#C4956A40" : "#C4956A10"}`,
                    boxShadow: isActive ? "0 6px 28px rgba(77,94,73,0.12)" : "none",
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
                  {pathway.tagActive &&
                  <div style={{ position: "absolute", top: "14px", left: "-22px", zIndex: 10, transform: "rotate(-45deg)", width: "100px", textAlign: "center", backgroundColor: "#C4956A", padding: "4px 0", boxShadow: "0 2px 6px rgba(196,149,106,0.3)" }}>
                      <span className="font-micro" style={{ color: "#fff", fontSize: "0.48rem", letterSpacing: "0.1em" }}>SPOTS LIMITED</span>
                    </div>
                  }
                  
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

                  <div className="mt-auto pt-5">
                    <style>{`
                      @keyframes ctaPulse {
                        0%, 100% { transform: scale(1); box-shadow: 0 3px 14px rgba(77,94,73,0.13); }
                        50% { transform: scale(1.04); box-shadow: 0 6px 22px rgba(77,94,73,0.28); }
                      }
                    `}</style>
                    {pathway.cta ?
                    <button
                      onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                      className="font-micro px-5 py-2 rounded-full min-h-[44px]"
                      style={{
                        backgroundColor: "#4D5E49",
                        color: "#fff",
                        fontSize: "0.7rem",
                        border: "none",
                        animation: "ctaPulse 2.4s ease-in-out infinite"
                      }}>
                        {pathway.cta}
                      </button> :

                    <span
                      className="font-micro px-5 py-2 rounded-full min-h-[44px] inline-flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(196,149,106,0.10)",
                        color: "#C4956A",
                        fontSize: "0.7rem",
                        border: "1px solid rgba(196,149,106,0.25)",
                        letterSpacing: "0.08em"
                      }}>
                      Coming Soon
                    </span>
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

      {/* Animated section divider — mobile + desktop */}
      <div className="w-full overflow-hidden" style={{ marginTop: "8px", lineHeight: 0 }}>
        <style>{`
          @keyframes shimmerWave {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes breatheGlow {
            0%, 100% { opacity: 0.18; transform: scaleX(1); }
            50% { opacity: 0.38; transform: scaleX(1.04); }
          }
          @keyframes floatOrb {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.22; }
            50% { transform: translateY(-8px) scale(1.08); opacity: 0.36; }
          }
        `}</style>

        





































































        
      </div>

      {/* BUILD IN MOTION — mobile only */}
      <div className="md:hidden">
















        
        </div>
    </section>);

}