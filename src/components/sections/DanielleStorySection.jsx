import { useState, useRef, useEffect } from "react";
import { GraduationCap, Home, Heart, ArrowRight, LayoutDashboard, Lightbulb, Gift } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "Educator, teacher & assistant principal" },
  { icon: Home, text: "Licensed home daycare owner — lived it firsthand" },
  { icon: LayoutDashboard, text: "Built features & retention systems at ClassTag" },
  { icon: Heart, text: "Mom of two — this work is deeply personal" },
];

const drawers = [
  {
    icon: Heart,
    title: "WHO",
    content: "I'm Danielle — and I've lived every version of this. I've been the teacher, the assistant principal, the mom figuring out childcare, and the one who actually went through licensing and opened my own home daycare. I didn't read about this path. I walked it.",
  },
  {
    icon: Lightbulb,
    title: "WHY",
    content: "When I opened my program, I was shocked at how hard it was to find real, organized guidance. The information was scattered, the process felt impossible to navigate alone, and nothing was built for mothers running serious programs from home. So I built what I wished had existed.",
  },
  {
    icon: Gift,
    title: "WHAT",
    content: "I took everything — my years in education, my licensing experience, my work building features and retention systems at ClassTag — and designed a platform that actually moves you forward. Mama Launch is the structured, supported launch path I needed and couldn't find.",
  },
];

function DrawerTabs({ drawers, openDrawer, onToggle }) {
  return (
    <div className="flex flex-col gap-0">
      <style>{`
        @keyframes tabNudge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes tabGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Hint label — only visible before any tab is opened */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        marginBottom: "8px",
        opacity: openDrawer >= 0 ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: "none"
      }}>
        <span style={{ width: "16px", height: "1px", backgroundColor: "#C4956A66" }} />
        <span className="font-micro" style={{ color: "#C4956A99", fontSize: "0.56rem", letterSpacing: "0.16em", animation: "tabGlow 2s ease-in-out infinite" }}>
          TAP TO EXPLORE
        </span>
        <span style={{ width: "16px", height: "1px", backgroundColor: "#C4956A66" }} />
      </div>

      {/* Tab row */}
      <div className="flex gap-2">
        {drawers.map((drawer, index) => {
          const Icon = drawer.icon;
          const isOpen = openDrawer === index;
          return (
            <button
              key={drawer.title}
              type="button"
              onClick={() => onToggle(index)}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 transition-all duration-200"
              style={{
                borderRadius: "10px 10px 0 0",
                backgroundColor: isOpen ? "#FFFDF9" : "rgba(255,255,255,0.5)",
                border: `1px solid ${isOpen ? "#C4956A28" : "#EAD9C8"}`,
                borderBottom: isOpen ? "1px solid #FFFDF9" : "1px solid #EAD9C8",
                boxShadow: isOpen ? "0 -8px 24px rgba(196,149,106,0.18), 0 -2px 6px rgba(0,0,0,0.06)" : "0 -4px 12px rgba(196,149,106,0.08), 0 -1px 3px rgba(0,0,0,0.04)",
                position: "relative",
                zIndex: isOpen ? 2 : 1,
                marginBottom: isOpen ? "-1px" : "0",
                cursor: "pointer",
                animation: !isOpen && openDrawer < 0 ? `tabNudge 2.4s ease-in-out ${index * 0.3}s infinite` : "none",
              }}>
              <Icon className="h-4 w-4" style={{ color: isOpen ? "#C4956A" : "#9a8f84", transition: "color 0.2s" }} />
              <span className="font-micro" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: isOpen ? "#2B2B28" : "#9a8f84", transition: "color 0.2s" }}>
                {drawer.title}
              </span>
              {/* Active bottom accent */}
              {isOpen && (
                <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: "2px", backgroundColor: "#C4956A", borderRadius: "2px 2px 0 0" }} />
              )}
              {/* Tap indicator dot — inactive only */}
              {!isOpen && openDrawer < 0 && (
                <div style={{ position: "absolute", top: "8px", right: "10px", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#C4956A", animation: `tabGlow 2.4s ease-in-out ${index * 0.3}s infinite` }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Pop-out content panel */}
      <div
        style={{
          borderRadius: "0 0 12px 12px",
          backgroundColor: "#FFFDF9",
          border: "1px solid #C4956A28",
          borderTop: "none",
          overflow: "hidden",
          maxHeight: openDrawer >= 0 ? "260px" : "0px",
          opacity: openDrawer >= 0 ? 1 : 0,
          transition: "max-height 0.32s ease, opacity 0.25s ease",
          boxShadow: "0 8px 28px rgba(196,149,106,0.1)",
          position: "relative",
          zIndex: 1,
        }}>
        {openDrawer >= 0 && (
          <div className="px-5 py-4">
            <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.65" }}>
              {drawers[openDrawer]?.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DanielleStorySection() {
  const [openDrawer, setOpenDrawer] = useState(-1);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index) => setOpenDrawer(openDrawer === index ? -1 : index);

  return (
    <section style={{ backgroundColor: "#FAF7F2", overflow: "hidden" }}>
      <div className="w-full h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-20"
        style={{ transition: "opacity 0.7s ease, transform 0.7s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>

        {/* Section eyebrow — shared mobile + desktop */}
        <p className="font-micro mb-5 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          Built From Real Experience
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        {/* ── DESKTOP two-column ── */}
        <div className="hidden md:grid grid-cols-[1fr_1fr] gap-14 items-start">

          {/* Left — text content */}
          <div>
            <h2 className="font-display leading-tight mb-5" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2" }}>
              I built this{" "}
              <em className="block" style={{ color: "#4D5E49" }}>because I needed it.</em>
            </h2>
            <p className="font-body leading-relaxed mb-6" style={{ color: "#5C5148", fontSize: "0.97rem", lineHeight: "1.72" }}>
              I've stood exactly where you're standing. I've been the educator, the assistant principal, the mom who went through licensing and opened her own home daycare — and learned everything the hard way. That experience is exactly why I'm the right person to guide you through this.
            </p>

            {/* Credential list */}
            <div className="flex flex-col mb-8" style={{ borderLeft: "2px solid #C4956A28" }}>
              {credentials.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3 py-2.5 px-4"
                    style={{ borderBottom: "1px solid rgba(77,94,73,0.07)" }}>
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#C4956A" }} />
                    <span className="font-body" style={{ fontSize: "0.88rem", color: "#3A3530" }}>{item.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full min-h-[48px] transition-all"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", boxShadow: "0 8px 32px rgba(77,94,73,0.32), 0 2px 8px rgba(0,0,0,0.10)" }}>
              Become a Founding Member
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right — photo + accordion */}
          <div className="flex flex-col gap-5">
            {/* Photo with depth layers */}
            <div className="relative">
              <div className="absolute rounded-[20px]" style={{ inset: 0, transform: "translate(10px, 10px)", backgroundColor: "#C4956A", opacity: 0.13, zIndex: 0 }} />
              <div className="absolute rounded-[20px]" style={{ inset: 0, transform: "translate(5px, 5px)", backgroundColor: "#4D5E49", opacity: 0.09, zIndex: 1 }} />
              <div className="relative rounded-[20px] overflow-hidden" style={{ zIndex: 2, boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)", border: "1px solid rgba(196,149,106,0.1)" }}>
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
                  alt="Danielle, founder of Mama Launch Studio"
                  className="w-full"
                  style={{ height: "400px", objectFit: "cover", objectPosition: "center 10%", filter: "saturate(0.82) brightness(0.98)", display: "block" }}
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: "linear-gradient(to top, rgba(250,247,242,0.4), transparent)" }} />
              </div>
            </div>

            {/* Tabs */}
            <DrawerTabs drawers={drawers} openDrawer={openDrawer} onToggle={handleToggle} />
          </div>
        </div>

        {/* ── MOBILE single-column ── */}
        <div className="md:hidden flex flex-col gap-5">
          <h2 className="font-display leading-snug text-center mx-auto" style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 6vw, 2.8rem)", lineHeight: "1.18", maxWidth: "20ch" }}>
            Created by Someone<br /><em style={{ color: "#4D5E49" }}>Who Understands</em>
          </h2>
          <p className="font-body leading-relaxed text-center mx-auto" style={{ color: "#5C5148", fontSize: "0.9rem", lineHeight: "1.65", maxWidth: "36ch" }}>
            Mama Launch was built from the intersection of education, childcare operations, motherhood, and implementation systems — so you can move forward with more clarity and less overwhelm.
          </p>

          {/* Mobile photo with depth */}
          <div className="relative mx-4">
            <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(8px, 8px)", backgroundColor: "#C4956A", opacity: 0.15, zIndex: 0 }} />
            <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(4px, 4px)", backgroundColor: "#4D5E49", opacity: 0.1, zIndex: 1 }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ zIndex: 2, boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)" }}>
              <img
                src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
                alt="Danielle, founder of Mama Launch Studio"
                className="w-full"
                style={{ maxHeight: "280px", objectFit: "cover", objectPosition: "center 12%", filter: "saturate(0.82) brightness(0.98)", display: "block" }}
              />
            </div>
          </div>

          {/* Credential list — mobile */}
          <div className="flex flex-col" style={{ borderLeft: "2px solid #C4956A28" }}>
            {credentials.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3 py-2.5 px-4"
                  style={{ borderBottom: "1px solid rgba(77,94,73,0.07)" }}>
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#C4956A" }} />
                  <span className="font-body" style={{ fontSize: "0.82rem", color: "#3A3530" }}>{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <DrawerTabs drawers={drawers} openDrawer={openDrawer} onToggle={handleToggle} />

          <div className="flex justify-center">
            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full min-h-[48px]"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", boxShadow: "0 8px 32px rgba(77,94,73,0.32), 0 2px 8px rgba(0,0,0,0.10)" }}>
              Become a Founding Member
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
      <div className="w-full h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}