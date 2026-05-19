import React, { useRef, useEffect, useState } from "react";
import { ClipboardCheck, Mail, Users, Puzzle, DoorOpen, Heart } from "lucide-react";

// ── Desktop data (unchanged) ──────────────────────────────────────────────────
const steps = [
{ step: "01", title: "Join the Waitlist", description: "Secure your spot and be the first to know what's next.", icon: ClipboardCheck },
{ step: "02", title: "Receive Your Welcome", description: "Check your inbox for your personal welcome and next steps.", icon: Mail },
{ step: "03", title: "Begin Phase One Together", description: "Kick things off with our first guided launch phase.", icon: Users },
{ step: "04", title: "Shape the Platform", description: "Share your insights and help build what matters most.", icon: Puzzle },
{ step: "05", title: "Open Your Doors", description: "Move toward launching your daycare or nursery with support.", icon: DoorOpen }];


// ── Mobile journey stages ─────────────────────────────────────────────────────
const mobileStages = [
{
  id: 2,
  title: "GET ORIENTED",
  label: "Choose your launch path",
  copy: "Choose your pathway and unlock your first implementation phase."
},
{
  id: 3,
  title: "BUILD FORWARD",
  label: "Steady momentum + support",
  copy: "Move through guided prompts, templates, and support at your own pace with the village beside you."
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
          backgroundColor: "rgba(255,255,255,0.80)",
          outline: isOpen ? "1px solid #D4BDA8" : "1px solid #EDE3D8",
          backdropFilter: "blur(8px)",
          boxShadow: isOpen ? "0 4px 18px rgba(196,149,106,0.10)" : "0 1px 4px rgba(196,149,106,0.05)",
          transition: "box-shadow 0.22s ease, outline-color 0.22s ease"
        }}>
        
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#F0EDE6", border: "1px solid #E4D8CC" }}>
            <Icon size={19} style={{ color: "#4D5E49", strokeWidth: 1.6 }} />
          </div>
          <h3 className="flex-1 font-display text-[19px] leading-snug" style={{ color: "#2C2C2C" }}>{step.title}</h3>
        </div>
        {isOpen &&
        <div className="px-5 pb-4" style={{ borderTop: "1px solid #F0EBE3" }}>
            <p className="pt-3 text-[14px] leading-relaxed" style={{ color: "#7A6E65", maxWidth: "38ch" }}>{step.description}</p>
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
          backgroundColor: isActive ? "#FFFCF8" : "transparent",
          border: `1px solid ${isActive ? "#D4BDA8" : "#E8DDD3"}`,
          boxShadow: isActive ? "0 3px 14px rgba(196,149,106,0.09)" : "none",
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
        </div>

        {/* Expanded copy */}
        <div
          style={{
            maxHeight: isActive ? "120px" : "0px",
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
  const [activeStage, setActiveStage] = useState(2);

  useEffect(() => {
    const o1 = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) setHeaderVisible(true);},
      { threshold: 0.08 }
    );
    if (headerRef.current) o1.observe(headerRef.current);
    return () => o1.disconnect();
  }, []);

  return (
    <section className="py-14 lg:py-24" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px" }}>

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
          className="font-body leading-relaxed mb-7 text-center"
          style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "38ch", margin: "0 auto 1.75rem" }}>
          
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

        {/* Founding member support line */}
        <div
          className="rounded-xl px-3 py-2 w-full mt-5"
          style={{ backgroundColor: "#F4F6F1", border: "1px solid #ECF0E8" }}>
          
          <div className="flex items-start gap-2">
            <Heart size={11} style={{ color: "#e53935", flexShrink: 0, marginTop: "2px", strokeWidth: 1.5, fill: "#e53935" }} />
            <p className="font-body leading-relaxed" style={{ color: "#7A8877", fontSize: "0.73rem" }}>
              Founding members receive first access, early pricing, and the opportunity to help shape the platform from the beginning.
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (unchanged) ───────────────────────────────────── */}
      <div className="hidden lg:block max-w-[1120px] mx-auto px-12">
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-12 items-start">

          {/* Left column */}
          <div
            ref={headerRef}
            className="sticky top-28 pr-6"
            style={{
              transition: "opacity 0.5s ease, transform 0.5s ease",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(14px)"
            }}>
            
            <p className="font-micro mb-2 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              The Founding Member Experience
            </p>
            <h2
              className="font-display leading-tight mb-6"
              style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 4vw, 3.4rem)", lineHeight: "1.2" }}>
              
              What Happens After<br />
              <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#7A6E65", maxWidth: "26ch", lineHeight: "1.7" }}>
              Each step is intentional. You'll always know what's next and why it matters.
            </p>
            <div className="rounded-xl p-4" style={{ backgroundColor: "#EEF1E7", outline: "1px solid #E1E6D8" }}>
              <div className="flex items-center gap-3">
                <Heart size={16} style={{ color: "#4D5E49", flexShrink: 0, strokeWidth: 1.6 }} />
                <div className="flex-1">
                  <p className="font-display text-sm font-semibold leading-snug" style={{ color: "#4D5E49" }}>You're not just joining.</p>
                  <p className="mt-0.5 text-xs" style={{ color: "#5C5148" }}>You're helping build the future.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="relative space-y-2.5 max-w-[540px]">
              <div
                className="absolute left-[19px] lg:left-[21px] top-10 h-[calc(100%-72px)] border-l border-dashed"
                style={{ borderColor: "rgba(196,149,106,0.22)" }} />
              
              {steps.map((step, i) =>
              <StepCard
                key={step.step}
                step={step}
                index={i}
                isOpen={activeStep === step.step}
                onToggle={() => setActiveStep(activeStep === step.step ? null : step.step)} />

              )}
            </div>
          </div>

        </div>
      </div>

    </section>);

}