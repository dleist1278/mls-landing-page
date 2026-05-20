import React, { useRef, useEffect, useState } from "react";

const cards = [
  { title: "Guided Interactive Roadmap", body: "Move through 5 structured phases with prompts, decisions, and tasks at every step — so you always know what to do.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f5cbe19f1_ChatGPTImageMay19202609_41_06AM.png", accent: "#4D5E49" },
  { title: "Built-In Clarity", body: "Every template, checklist, and policy document you need — organized by phase and ready to fill in as you go.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/5c6463f25_ChatGPTImageMay19202609_41_35AM.png", accent: "#C4956A" },
  { title: "Launch Momentum", body: "See your progress in real time as you complete each phase and move closer to opening your program.", image: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bfb12d922_ChatGPTImageMay19202609_40_30AM.png", accent: "#4D5E49" }
];

export default function WhatIsMamaLaunchSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) o1.observe(ref.current);
    return () => o1.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden", maxWidth: "100vw", width: "100%", position: "relative", borderTop: "1px solid rgba(196,149,106,0.08)" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-20">
        <div
          ref={ref}
          style={{ transition: "opacity 0.6s ease", opacity: visible ? 1 : 0 }}>

          {/* Eyebrow */}
          <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            UNDERSTANDING THE PLATFORM
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>

          {/* Heading */}
          <h2
            className="font-display leading-tight mb-4 text-center"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2", maxWidth: "22ch", marginLeft: "auto", marginRight: "auto" }}>
            What is the <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
          </h2>

          {/* Support copy */}
          <p className="font-body leading-relaxed mb-7 text-center mx-auto" style={{ color: "#5C5148", fontSize: "0.93rem", lineHeight: "1.65", maxWidth: "42ch" }}>
            A guided opening path that helps you move from idea to real program with less guesswork. Built from real childcare experience, not theory.
          </p>

          {/* Cards — desktop: 3 columns, mobile: horizontal swipe */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
            {cards.map((card) => (
              <div key={card.title} className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)", border: "1px solid #E4D5C0", boxShadow: "0 8px 32px rgba(196,149,106,0.12)" }}>
                <div style={{ height: "4px", background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }} />
                <div className="overflow-hidden" style={{ height: "180px" }}>
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" style={{ objectPosition: "center", transform: "scale(1.1)", transformOrigin: "center", filter: "saturate(0.82) brightness(0.97)" }} />
                </div>
                <div className="px-6 pt-5 pb-6">
                  <p className="font-display text-lg font-semibold mb-2" style={{ color: card.accent }}>{card.title}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#5C5148", lineHeight: "1.65" }}>{card.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile swipe */}
          <div className="md:hidden mb-5 overflow-hidden w-full">
            <style>{`
              @keyframes peekNudge {
                0%   { transform: translateX(0); }
                40%  { transform: translateX(-18px); }
                70%  { transform: translateX(-8px); }
                100% { transform: translateX(0); }
              }
            `}</style>
            <div className="flex gap-3 overflow-x-auto pb-3"
              style={{
                scrollSnapType: "x mandatory",
                overscrollBehaviorX: "contain",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                touchAction: "pan-x",
                paddingLeft: "calc(50% - 126px)",
                paddingRight: "calc(50% - 126px + 20px)",
                animation: "peekNudge 0.9s ease-out 1.4s 1"
              }}>
              {cards.map((card) => (
                <div key={card.title} className="flex-none rounded-2xl overflow-hidden"
                  style={{ width: "252px", scrollSnapAlign: "center", background: "linear-gradient(160deg, #FFFDF9 0%, #F5EFE6 100%)", border: "1px solid #E4D5C0", boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)" }}>
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }} />
                  <div className="w-full overflow-hidden" style={{ height: "110px" }}>
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover"
                      style={{ objectPosition: "center", transform: "scale(1.18)", transformOrigin: "center", filter: "saturate(0.82) brightness(0.97)" }} />
                  </div>
                  <div className="px-4 pt-2 pb-3 text-center">
                    <p className="font-display text-sm font-semibold mb-1" style={{ color: card.accent }}>{card.title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148" }}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex justify-center my-2">
            <button
              onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro px-8 py-4 rounded-full transition-all min-h-[52px]"
              style={{ color: "#fff", fontSize: "0.75rem", backgroundColor: "#4D5E49", boxShadow: "0 6px 24px rgba(77,94,73,0.24), 0 1px 3px rgba(77,94,73,0.12)", letterSpacing: "0.08em" }}>
              See the 5-Phase Method →
            </button>
          </div>

          {/* Mobile bridge line */}
          <p className="md:hidden font-body text-xs mt-3 text-center" style={{ color: "#7A6E65", lineHeight: "1.5" }}>
            Founding members unlock the complete 5-phase path first.
          </p>
        </div>
      </div>
    </section>
  );
}