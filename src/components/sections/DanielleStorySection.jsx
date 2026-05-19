import { useState, useRef, useEffect } from "react";
import { GraduationCap, Home, Heart, ChevronDown, ArrowRight, LayoutDashboard, Lightbulb, BookOpen, Gift } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "Former educator + school leader" },
  { icon: Home, text: "Licensed home daycare owner" },
  { icon: Heart, text: "Mom of two" },
  { icon: LayoutDashboard, text: "Experience in app implementation" },
];

const drawers = [
  {
    icon: Lightbulb,
    title: "WHY I BUILT THIS",
    content: "When I opened my own program, I found scattered information, unclear direction, and very little support built for serious home providers.",
  },
  {
    icon: BookOpen,
    title: "WHAT I UNDERSTAND",
    content: "I understand licensing, parent communication, daily systems, classroom flow, and the reality of building while raising children.",
  },
  {
    icon: Gift,
    title: "WHAT THIS GIVES YOU",
    content: "Mama Launch gives you structure, guidance, tools, and community support so you can stop piecing everything together alone.",
  },
];

function AccordionDrawer({ drawer, isOpen, onToggle }) {
  const Icon = drawer.icon;
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen
          ? "linear-gradient(135deg, #FFFDF9 0%, #FDF6EE 100%)"
          : "rgba(255,255,255,0.55)",
        border: `1px solid ${isOpen ? "#C4956A28" : "#EAD9C8"}`,
        boxShadow: isOpen
          ? "0 6px 28px rgba(196,149,106,0.13), 0 1px 4px rgba(44,44,44,0.04)"
          : "0 1px 4px rgba(196,149,106,0.04)",
        position: "relative",
      }}>

      {/* Left accent bar — visible when open */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
        borderRadius: "12px 0 0 12px",
        background: isOpen ? "linear-gradient(180deg, #C4956A, #C4956A88)" : "transparent",
        transition: "background 0.25s ease"
      }} />

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
        style={{ paddingLeft: "20px" }}>

        {/* Icon badge */}
        <div className="flex-none flex items-center justify-center rounded-xl transition-all duration-200"
          style={{
            width: "36px", height: "36px",
            backgroundColor: isOpen ? "#C4956A15" : "rgba(77,94,73,0.07)",
            border: `1px solid ${isOpen ? "#C4956A28" : "rgba(77,94,73,0.12)"}`,
          }}>
          <Icon className="h-4 w-4" style={{ color: isOpen ? "#C4956A" : "#4D5E49" }} />
        </div>

        <span className="flex-1 font-micro" style={{ fontSize: "0.66rem", letterSpacing: "0.14em", color: isOpen ? "#2B2B28" : "#5C5148" }}>
          {drawer.title}
        </span>

        <ChevronDown
          className="h-4 w-4 flex-shrink-0 transition-transform duration-300"
          style={{ color: isOpen ? "#C4956A" : "#9a8f84", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div style={{ maxHeight: isOpen ? "180px" : "0px", overflow: "hidden", opacity: isOpen ? 1 : 0, transition: "max-height 0.32s ease, opacity 0.25s ease" }}>
        <div className="px-5 pb-5" style={{ paddingLeft: "20px" }}>
          <div className="pl-[52px]">
            <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>
              {drawer.content}
            </p>
          </div>
        </div>
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
        className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-14 md:py-20"
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
            <h2 className="font-display leading-tight mb-5" style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: "1.15" }}>
              I built this{" "}
              <em className="block" style={{ color: "#4D5E49" }}>because I needed it.</em>
            </h2>
            <p className="font-body leading-relaxed mb-6" style={{ color: "#5C5148", fontSize: "0.97rem", lineHeight: "1.72" }}>
              I've been the educator, the assistant principal, the licensed home daycare owner — and through all of it, I've been a mom of two. I know what it feels like to hold a vision for something meaningful and not know where to begin.
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
              style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", boxShadow: "0 4px 20px rgba(77,94,73,0.22)" }}>
              Join the Founding Member Waitlist
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right — photo + accordion */}
          <div className="flex flex-col gap-5">
            {/* Photo with depth layers */}
            <div className="relative">
              <div className="absolute rounded-[20px]" style={{ inset: 0, transform: "translate(10px, 10px)", backgroundColor: "#C4956A", opacity: 0.13, zIndex: 0 }} />
              <div className="absolute rounded-[20px]" style={{ inset: 0, transform: "translate(5px, 5px)", backgroundColor: "#4D5E49", opacity: 0.09, zIndex: 1 }} />
              <div className="relative rounded-[20px] overflow-hidden" style={{ zIndex: 2, boxShadow: "0 8px 36px rgba(196,149,106,0.14)", border: "1px solid rgba(196,149,106,0.1)" }}>
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

            {/* Accordion */}
            <div className="flex flex-col gap-2">
              {drawers.map((drawer, index) => (
                <AccordionDrawer key={drawer.title} drawer={drawer} isOpen={openDrawer === index} onToggle={() => handleToggle(index)} />
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE single-column ── */}
        <div className="md:hidden flex flex-col gap-6">
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
            <div className="relative rounded-2xl overflow-hidden" style={{ zIndex: 2, boxShadow: "0 6px 28px rgba(196,149,106,0.16)" }}>
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

          {/* Accordion */}
          <div className="flex flex-col gap-2">
            {drawers.map((drawer, index) => (
              <AccordionDrawer key={drawer.title} drawer={drawer} isOpen={openDrawer === index} onToggle={() => handleToggle(index)} />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full min-h-[48px]"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", boxShadow: "0 4px 20px rgba(77,94,73,0.22)" }}>
              Join the Founding Member Waitlist
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
      <div className="w-full h-px" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}