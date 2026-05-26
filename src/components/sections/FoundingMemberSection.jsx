import React, { useRef, useEffect, useState } from "react";
import { ClipboardCheck, Mail, Users, Puzzle, DoorOpen, Heart, ChevronDown } from "lucide-react";

// ── Desktop + mobile shared data ─────────────────────────────────────────────
const steps = [
{ step: "01", title: "Mark Your Calendar", description: "The first Mama Launch cohort begins July 8, 2026. Spots are limited — this is a small, supported founding group. Enrollment closes June 30th.", sub: "July 8, 2026", icon: ClipboardCheck },
{ step: "02", title: "Get Oriented", description: "Define your hours, age range, and whether you're launching a daycare or nursery school. This is where your program starts taking real shape.", sub: "Shape your program", icon: Puzzle },
{ step: "03", title: "Build Forward", description: "Move through guided prompts, templates, and support at your own pace with the village beside you.", sub: "Steady momentum + support", icon: Users }];


// ── Mobile journey stages ─────────────────────────────────────────────────────
const mobileStages = [
{
  id: 1,
  title: "MARK YOUR CALENDAR",
  label: "July 8, 2026",
  copy: "The first Mama Launch cohort begins July 8, 2026. Spots are limited — this is a small, supported founding group. Enrollment closes June 30th."
},
{
  id: 2,
  title: "GET ORIENTED",
  label: "Shape your program",
  copy: "Define your hours, age range, and whether you're launching a daycare or nursery school. This is where your program starts taking real shape."
},
{
  id: 3,
  title: "BUILD FORWARD",
  label: "Steady momentum + support",
  copy: "Move through guided prompts, templates, and support at your own pace with the village beside you. Monthly Zoom calls and feedback sprints keep you moving forward with real accountability."
}];


// ── Desktop StepCard (unchanged) ─────────────────────────────────────────────
function StepCard({ step, index, isOpen, onToggle }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) setVisible(true);},
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-3"
      style={{
        transition: `opacity 0.4s ease ${index * 60}ms, transform 0.4s ease ${index * 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)"
      }}>
      
      <div
        className="z-10 flex h-10 w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full bg-white text-xs lg:text-sm font-semibold self-start mt-3"
        style={{ color: "#C4956A", boxShadow: "0 1px 3px rgba(196,149,106,0.10)", outline: "1px solid #EAD9C8" }}>
        
        {step.step}
      </div>
      <div
        className="flex flex-1 flex-col rounded-2xl cursor-pointer"
        onClick={onToggle}
        style={{
          backgroundColor: isOpen ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.48)",
          outline: isOpen ? "1px solid rgba(196,149,106,0.20)" : "1px solid rgba(196,149,106,0.10)",
          backdropFilter: "blur(6px)",
          boxShadow: isOpen ? "0 3px 12px rgba(196,149,106,0.08)" : "none",
          transition: "box-shadow 0.22s ease, outline-color 0.22s ease"
        }}>
        
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#F0EDE6", border: "1px solid #E4D8CC" }}>
            <Icon size={19} style={{ color: "#4D5E49", strokeWidth: 1.6 }} />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-[19px] leading-snug" style={{ color: "#2C2C2C" }}>{step.title}</h3>
            <p className="font-micro mt-0.5" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.1em" }}>{step.sub}</p>
          </div>
        </div>
        {isOpen &&
        <div className="px-5 pb-4" style={{ borderTop: "1px solid #F0EBE3" }}>
            <p className="pt-3 text-[15px] leading-relaxed" style={{ color: "#7A6E65", maxWidth: "38ch", lineHeight: "1.65" }}>{step.description}</p>
          </div>
        }
      </div>
    </div>);

}

// ── Mobile stage card ─────────────────────────────────────────────────────────
function MobileStageCard({ stage, isActive, onTap, stageIndex, totalStages }) {
  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full text-left"
      style={{ display: "block" }}>
      
      {/* Stage row */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: isActive ? "#FDFAF6" : "#FAF7F2",
          border: `1px solid ${isActive ? "#D4BDA888" : "#DDD0C4"}`,
          boxShadow: isActive ? "0 8px 28px rgba(196,149,106,0.18), 0 2px 8px rgba(0,0,0,0.07)" : "0 4px 16px rgba(196,149,106,0.14), 0 1px 4px rgba(0,0,0,0.07)",
          transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)"
        }}>
        
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Stage dot */}
          <div
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isActive ? "#4D5E49" : "transparent",
              border: `1.5px solid ${isActive ? "#4D5E49" : "#C4A080"}`,
              transition: "background-color 0.2s ease"
            }}>
            
            {isActive &&
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fff" }} />
            }
          </div>

          {/* Title */}
          <span
            className="flex-1 font-micro"
            style={{
              color: isActive ? "#2C2C2C" : "#6B6259",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              fontWeight: isActive ? 700 : 500,
              transition: "color 0.2s ease"
            }}>
            
            {stage.title}
          </span>

          {/* Label — visible always, de-emphasized when inactive */}
          <span
            className="font-body"
            style={{
              color: isActive ? "#C4956A" : "#A8917A",
              fontSize: "0.62rem",
              opacity: isActive ? 1 : 0.8,
              transition: "opacity 0.2s ease"
            }}>
            
            {stage.label}
          </span>

          {/* Chevron */}
          <ChevronDown
            size={13}
            style={{
              color: isActive ? "#C4956A" : "#A8917A",
              transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.22s ease, color 0.2s ease",
              flexShrink: 0
            }} />
          
        </div>

        {/* Expanded copy */}
        <div
          style={{
            maxHeight: isActive ? "160px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.22s ease"
          }}>
          
          <p
            className="font-body px-4 pb-3"
            style={{ color: "#5C5148", fontSize: "0.82rem", lineHeight: "1.55" }}>
            
            {stage.copy}
          </p>
        </div>
      </div>

      {/* Connector line between stages */}
      {stageIndex < totalStages - 1 &&
      <div className="flex justify-start pl-[18px] py-1">
          <div style={{ width: "1px", height: "10px", backgroundColor: "#D4BDA840" }} />
        </div>
      }
    </button>);

}

// ── Main section ──────────────────────────────────────────────────────────────
export default function FoundingMemberSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeStep, setActiveStep] = useState("01");
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    const o1 = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) setHeaderVisible(true);},
      { threshold: 0.08 }
    );
    if (headerRef.current) o1.observe(headerRef.current);
    return () => o1.disconnect();
  }, []);

  return (
    <section className="py-14 lg:py-24" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px", borderTop: "1px solid rgba(196,149,106,0.08)" }}>

      {/* ── MOBILE layout ────────────────────────────────────────────────── */}
      <div className="lg:hidden w-full max-w-full overflow-hidden px-5">

        {/* Eyebrow */}
        <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.16em" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          YOUR FOUNDING MEMBER JOURNEY
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>

        {/* Headline */}
        <h2
          className="font-display leading-tight mb-4 text-center"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 5.5vw, 3.2rem)", lineHeight: "1.2", maxWidth: "22ch", marginLeft: "auto", marginRight: "auto" }}>
          
          What Happens After<br />
          <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
        </h2>

        {/* Support copy */}
        <p
          className="font-body leading-relaxed mb-3 text-center"
          style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "38ch", margin: "0 auto 0.75rem" }}>
          
          Mama Launch guides you step by step with structure, support, and tools for real motherhood life.
        </p>
        

        

        {/* 3-stage progression */}
        <div className="w-full">
          {mobileStages.map((stage, i) =>
          <MobileStageCard
            key={stage.id}
            stage={stage}
            isActive={activeStage === stage.id}
            onTap={() => setActiveStage(stage.id)}
            stageIndex={i}
            totalStages={mobileStages.length} />

          )}
        </div>

        {/* Micro-moment editorial line */}
        <p
          className="font-body mt-10 mb-5 hidden"
          style={{ color: "#9a8f84", fontSize: "0.76rem", fontStyle: "italic", lineHeight: "1.6", maxWidth: "30ch" }}>
          
          Built around real motherhood rhythms, not uninterrupted workdays.
        </p>

        {/* Badge / stamp graphic */}
        <div className="flex justify-center mt-6 mb-3 hidden">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer starburst */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => {
              const r = deg * Math.PI / 180;
              const x1 = 40 + 35 * Math.cos(r);
              const y1 = 40 + 35 * Math.sin(r);
              const x2 = 40 + 28 * Math.cos(r + 0.196);
              const y2 = 40 + 28 * Math.sin(r + 0.196);
              return <line key={i} x1="40" y1="40" x2={x1} y2={y1} stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />;
            })}
            {/* Outer ring */}
            <circle cx="40" cy="40" r="33" stroke="#C4956A" strokeWidth="1.2" strokeDasharray="3 2.5" fill="none" opacity="0.5" />
            {/* Inner circle fill */}
            <circle cx="40" cy="40" r="26" fill="#F5EFE6" stroke="#C4956A" strokeWidth="1.2" opacity="0.9" />
            {/* Star / seal center */}
            <text x="40" y="36" textAnchor="middle" fontSize="13" fill="#4D5E49" fontFamily="serif" fontStyle="italic" fontWeight="600">Mama</text>
            <text x="40" y="50" textAnchor="middle" fontSize="13" fill="#4D5E49" fontFamily="serif" fontStyle="italic" fontWeight="600">Launch</text>
            {/* Small dot accents */}
            <circle cx="40" cy="14" r="1.8" fill="#C4956A" opacity="0.6" />
            <circle cx="40" cy="66" r="1.8" fill="#C4956A" opacity="0.6" />
            <circle cx="14" cy="40" r="1.8" fill="#C4956A" opacity="0.6" />
            <circle cx="66" cy="40" r="1.8" fill="#C4956A" opacity="0.6" />
          </svg>
        </div>

        {/* Founding member support line */}
        <div
          className="rounded-xl px-4 py-3.5 w-full mt-4"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #C4956A22"
          }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
            style={{ backgroundColor: "#e5393518", border: "1px solid #e5393530" }}>
              <Heart size={12} style={{ color: "#e53935", strokeWidth: 1.8, fill: "#e53935", animation: "heartPulse 1.4s ease-in-out infinite" }} />
              <style>{`@keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.28); } }`}</style>
            </div>
            <div>
              <p className="font-micro mb-0.5" style={{ color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.14em" }}>FOUNDING MEMBER BENEFIT</p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.8rem", lineHeight: "1.6" }}>
                First access, early pricing, and the opportunity to help shape the platform from the beginning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout ───────────────────────────────────────────────── */}
      <div className="hidden lg:block max-w-[680px] mx-auto px-8">

        {/* Centered header */}
        <div
          ref={headerRef}
          className="text-center mb-8"
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(14px)"
          }}>
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            YOUR FOUNDING MEMBER JOURNEY
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2
            className="font-display leading-tight mb-3"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: "1.2" }}>
            What Happens After<br />
            <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
          </h2>
          <p className="font-body leading-relaxed mx-auto" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.68", maxWidth: "42ch" }}>
            Mama Launch guides you step by step with structure, support, and tools for real motherhood life.
          </p>
        </div>

        {/* Step accordion cards */}
        <div className="flex flex-col gap-2.5 mb-5">
          {steps.map((step, i) =>
            <StepCard
              key={step.step}
              step={step}
              index={i}
              isOpen={activeStep === step.step}
              onToggle={() => setActiveStep(activeStep === step.step ? null : step.step)} />
          )}
        </div>

        {/* Founding member benefit block */}
        <div
          className="rounded-xl px-5 py-4"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #C4956A22"
          }}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "#e5393518", border: "1px solid #e5393530" }}>
              <Heart size={12} style={{ color: "#e53935", strokeWidth: 1.8, fill: "#e53935", animation: "heartPulse 1.4s ease-in-out infinite" }} />
            </div>
            <div>
              <p className="font-micro mb-0.5" style={{ color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.14em" }}>FOUNDING MEMBER BENEFIT</p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.82rem", lineHeight: "1.6" }}>
                First access, early pricing, and the opportunity to help shape the platform from the beginning.
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>);

}