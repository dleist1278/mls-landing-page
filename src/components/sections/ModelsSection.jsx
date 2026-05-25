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
          
          {/* Desktop header */}
          <div className="hidden md:block text-center">
            <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              MAMA LAUNCH PATHWAYS
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            </p>
            <h2 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2" }}>
              Now enrolling:{" "}
              <em style={{ color: "#4D5E49" }}>Home Daycare / Nursery</em>
            </h2>
            <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.65", maxWidth: "56ch" }}>
              The first founding pathway is for mothers who want to build a calm, intentional home childcare program from home. Other Mama Launch pathways are coming soon.
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

        {/* Desktop: Featured card + 3 secondary cards */}
        <style>{`
          @keyframes enrollPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes featuredFadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes secondaryFadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .featured-card {
            transition: box-shadow 0.35s ease, transform 0.35s ease;
          }
          .featured-card:hover {
            box-shadow: 0 20px 64px rgba(77,94,73,0.22), 0 4px 16px rgba(77,94,73,0.10) !important;
            transform: translateY(-3px);
          }
          .secondary-card {
            transition: box-shadow 0.3s ease, opacity 0.3s ease;
          }
          .secondary-card:hover {
            box-shadow: 0 4px 18px rgba(44,44,44,0.07) !important;
          }
        `}</style>

        <div
          className="hidden md:flex flex-col gap-5"
          style={{ opacity: headerVisible ? 1 : 0, animation: headerVisible ? "featuredFadeUp 0.7s ease forwards" : "none" }}
        >
          {/* ── FEATURED CARD: Home Daycare / Nursery ── */}
          <div
            className="featured-card rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#FFFDF9",
              border: "1px solid rgba(77,94,73,0.2)",
              boxShadow: "0 12px 48px rgba(77,94,73,0.14), 0 2px 8px rgba(77,94,73,0.06)",
              display: "flex",
              minHeight: "340px"
            }}
          >
            {/* Left: Image — easy to replace, just swap the src */}
            <div style={{
              width: "42%",
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
              borderRadius: "24px 0 0 24px"
            }}>
              <img
                src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/d4f06cd77_generated_image.png"
                alt="Calm, intentional home nursery playroom"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block"
                }}
              />
              {/* Subtle right-edge fade to blend with card */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, transparent 70%, #FFFDF9 100%)"
              }} />
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: "linear-gradient(90deg, #4D5E49, #6B7E67)"
              }} />
            </div>

            {/* Right: Content */}
            <div style={{
              flex: 1,
              padding: "40px 44px 40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "18px"
            }}>
              {/* Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#4D5E4915", border: "1px solid #4D5E4928" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49", animation: "enrollPulse 1.6s ease-in-out infinite" }} />
                  <span className="font-micro" style={{ color: "#4D5E49", fontSize: "0.62rem", letterSpacing: "0.14em" }}>NOW ENROLLING</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)", lineHeight: "1.15", letterSpacing: "-0.02em" }}>
                Home Daycare / Nursery
              </h3>

              {/* Description */}
              <p className="font-body" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "46ch" }}>
                Build a calm, intentional home childcare program naturally woven into daily family life.
              </p>

              {/* Value chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Calm home setup", "Guided licensing", "Parent trust systems", "Village support"].map((chip) => (
                  <span key={chip} className="font-micro" style={{
                    backgroundColor: "rgba(77,94,73,0.07)",
                    border: "1px solid rgba(77,94,73,0.16)",
                    color: "#4D5E49",
                    borderRadius: "999px",
                    padding: "4px 12px",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em"
                  }}>{chip}</span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                className="font-micro"
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#4D5E49",
                  color: "#fff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px 32px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(77,94,73,0.28), 0 1px 4px rgba(77,94,73,0.14)",
                  transition: "background 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                Join the Founding Member Waitlist
              </button>
            </div>
          </div>

          {/* ── SECONDARY CARDS row ── */}
          <div
            className="grid grid-cols-3 gap-4"
            style={{ animation: headerVisible ? "secondaryFadeUp 0.8s ease 0.25s forwards" : "none", opacity: headerVisible ? 0 : 0, animationFillMode: "forwards" }}
          >
            {[
              { id: "kids-programs", title: "Kids Programs", description: "For mothers who want to host enrichment-style classes, drop-ins, or small group programs from home." },
              { id: "homeschool-pods", title: "Homeschool Pods", description: "For mothers who want to build intentional small-group learning environments with flexibility and autonomy." },
              { id: "caregiver-babysitter", title: "Caregiver / Babysitter", description: "For mothers offering dedicated in-home care to one family, with the option to bring their own child." }
            ].map((card) => (
              <div
                key={card.id}
                className="secondary-card rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#F5EFE6",
                  border: "1px solid rgba(196,149,106,0.14)",
                  boxShadow: "0 2px 10px rgba(44,44,44,0.04)",
                  opacity: 0.82
                }}
              >
                <div style={{ height: "2px", background: "linear-gradient(90deg, #C4956A44, transparent)" }} />
                <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span className="font-micro" style={{
                    display: "inline-block",
                    backgroundColor: "rgba(196,149,106,0.10)",
                    border: "1px solid rgba(196,149,106,0.2)",
                    color: "#C4956A",
                    borderRadius: "999px",
                    padding: "3px 10px",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    alignSelf: "flex-start"
                  }}>Coming Soon</span>
                  <h4 className="font-display" style={{ color: "#5C5148", fontSize: "1.05rem", lineHeight: "1.2", letterSpacing: "-0.01em" }}>
                    {card.title}
                  </h4>
                  <p className="font-body" style={{ color: "#8a7d74", fontSize: "0.82rem", lineHeight: "1.6" }}>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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