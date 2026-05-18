import React, { useRef, useEffect, useState } from "react";
import { ClipboardCheck, Mail, Users, Puzzle, DoorOpen, Heart, ChevronDown } from "lucide-react";

const steps = [
  { step: "01", title: "Join the Waitlist", description: "Secure your spot and be the first to know what's next.", icon: ClipboardCheck },
  { step: "02", title: "Receive Your Welcome", description: "Check your inbox for your personal welcome and next steps.", icon: Mail },
  { step: "03", title: "Begin Phase One Together", description: "Kick things off with our first guided launch phase.", icon: Users },
  { step: "04", title: "Shape the Platform", description: "Share your insights and help build what matters most.", icon: Puzzle },
  { step: "05", title: "Open Your Doors", description: "Move toward launching your daycare or nursery with support.", icon: DoorOpen },
];

function StepCard({ step, index, isOpen, onToggle }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
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
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      {/* Step number circle */}
      <div
        className="z-10 flex h-10 w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full bg-white text-xs lg:text-sm font-semibold self-start mt-3"
        style={{ color: "#C4956A", boxShadow: "0 1px 3px rgba(196,149,106,0.10)", outline: "1px solid #EAD9C8" }}
      >
        {step.step}
      </div>

      {/* Card */}
      <div
        className="flex flex-1 flex-col rounded-2xl lg:rounded-2xl cursor-pointer group"
        onClick={onToggle}
        style={{
          backgroundColor: "rgba(255,255,255,0.80)",
          outline: isOpen ? "1px solid #D4BDA8" : "1px solid #EDE3D8",
          backdropFilter: "blur(8px)",
          boxShadow: isOpen
            ? "0 4px 18px rgba(196,149,106,0.10)"
            : "0 1px 4px rgba(196,149,106,0.05)",
          transition: "box-shadow 0.22s ease, outline-color 0.22s ease, transform 0.18s ease",
        }}
        onMouseEnter={e => {
          // desktop hover only
          if (window.innerWidth >= 1024) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 22px rgba(196,149,106,0.12)";
            e.currentTarget.style.outlineColor = "#C8B09A";
          }
        }}
        onMouseLeave={e => {
          if (window.innerWidth >= 1024) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = isOpen
              ? "0 4px 18px rgba(196,149,106,0.10)"
              : "0 1px 4px rgba(196,149,106,0.05)";
            e.currentTarget.style.outlineColor = isOpen ? "#D4BDA8" : "#EDE3D8";
          }
        }}
      >
        {/* Header row — always visible */}
        <div className="flex items-center gap-3 px-4 py-3.5 lg:px-5 lg:py-4">
          {/* Icon circle */}
          <div
            className="flex h-10 w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#F0EDE6", border: "1px solid #E4D8CC" }}
          >
            <Icon size={19} style={{ color: "#4D5E49", strokeWidth: 1.6 }} />
          </div>

          {/* Title */}
          <h3
            className="flex-1 font-display text-[18px] lg:text-[19px] leading-snug"
            style={{ color: "#2C2C2C" }}
          >
            {step.title}
          </h3>

          {/* Chevron */}
          <ChevronDown
            size={16}
            style={{
              color: "#C4956A",
              flexShrink: 0,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.22s ease",
            }}
          />
        </div>

        {/* Description — only when open */}
        {isOpen && (
          <div
            className="px-4 pb-3.5 lg:px-5 lg:pb-4"
            style={{ borderTop: "1px solid #F0EBE3" }}
          >
            <p
              className="pt-3 text-sm lg:text-[14px] leading-relaxed"
              style={{ color: "#7A6E65", maxWidth: "38ch" }}
            >
              {step.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FoundingMemberSection() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeStep, setActiveStep] = useState("01");

  useEffect(() => {
    const o1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.08 }
    );
    if (headerRef.current) o1.observe(headerRef.current);
    return () => o1.disconnect();
  }, []);

  return (
    <section className="py-8 lg:py-24" style={{ backgroundColor: "#F0EBE1", scrollMarginTop: "60px" }}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-12 items-start">

        {/* Left column */}
        <div
          ref={headerRef}
          className="lg:sticky lg:top-28 lg:pr-6"
          style={{
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <p className="font-micro mb-2 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Founding Member Experience
          </p>

          <h2
            className="font-display leading-tight mb-4 lg:mb-6"
            style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 3.5vw, 3.75rem)", lineHeight: "1.05" }}
          >
            What Happens After
            <br />
            <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
          </h2>

          {/* Supporting paragraph — desktop only for editorial calm */}
          <p
            className="hidden lg:block text-sm leading-relaxed mb-8"
            style={{ color: "#7A6E65", maxWidth: "26ch", lineHeight: "1.7" }}
          >
            Each step is intentional. You'll always know what's next and why it matters.
          </p>

          {/* Callout — soft note, reduced prominence */}
          <div
            className="rounded-xl p-3 lg:p-4"
            style={{ backgroundColor: "#EEF1E7", outline: "1px solid #E1E6D8" }}
          >
            <div className="flex items-center gap-3">
              <Heart size={16} style={{ color: "#4D5E49", flexShrink: 0, strokeWidth: 1.6 }} />
              <div className="flex-1">
                <p className="font-display text-sm font-semibold leading-snug" style={{ color: "#4D5E49" }}>
                  You're not just joining.
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "#5C5148" }}>
                  You're helping build the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Accordion steps */}
        <div>
          <div className="relative space-y-3 lg:space-y-2.5 max-w-full lg:max-w-[540px]">
            {/* Dashed vertical line */}
            <div
              className="absolute left-[19px] lg:left-[21px] top-10 h-[calc(100%-72px)] border-l border-dashed"
              style={{ borderColor: "rgba(196,149,106,0.22)" }}
            />
            {steps.map((step, i) => (
              <StepCard
                key={step.step}
                step={step}
                index={i}
                isOpen={activeStep === step.step}
                onToggle={() => setActiveStep(activeStep === step.step ? null : step.step)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}