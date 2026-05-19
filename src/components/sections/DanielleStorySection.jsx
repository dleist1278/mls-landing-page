import { useState } from "react";
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
    content:
      "When I opened my own program, I found scattered information, unclear direction, and very little support built for serious home providers.",
  },
  {
    icon: BookOpen,
    title: "WHAT I UNDERSTAND",
    content:
      "I understand licensing, parent communication, daily systems, classroom flow, and the reality of building while raising children.",
  },
  {
    icon: Gift,
    title: "WHAT THIS GIVES YOU",
    content:
      "Mama Launch gives you structure, guidance, tools, and community support so you can stop piecing everything together alone.",
  },
];

function AccordionDrawer({ drawer, isOpen, onToggle }) {
  const Icon = drawer.icon;
  return (
    <div className={`rounded-2xl border border-[#E8D8C7] overflow-hidden transition-colors duration-200 ${isOpen ? "bg-[#FFFDF9]" : "bg-white/70"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
      >
        <span className="flex items-center gap-2.5 text-[#2B2B28]" style={{ fontSize: "0.68rem", letterSpacing: "0.12em", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#C4956A" }} />
          {drawer.title}
        </span>
        <ChevronDown
          className="h-4 w-4 flex-shrink-0 text-[#566B4E] transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        style={{
          maxHeight: isOpen ? "160px" : "0px",
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.25s ease, opacity 0.2s ease",
        }}
      >
        <p className="px-4 pb-4 text-sm leading-relaxed text-[#3A3A35]">
          {drawer.content}
        </p>
      </div>
    </div>
  );
}

export default function DanielleStorySection() {
  const [openDrawer, setOpenDrawer] = useState(0);

  const handleToggle = (index) => {
    setOpenDrawer(openDrawer === index ? -1 : index);
  };

  const Eyebrow = (
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C98F5D] mb-1">
      Hi, I'm Danielle
    </p>
  );

  const Title = (
    <h2 className="font-display text-[38px] leading-[1.05] lg:text-6xl text-[#2B2B28] mb-3">
      I built this{" "}
      <em className="block italic text-[#566B4E]">because I needed it.</em>
    </h2>
  );

  const Bio = (
    <p className="text-[16px] leading-7 text-[#3A3A35] mb-4 max-w-prose">
      I've been the educator, the assistant principal, the licensed home daycare owner — and through all of it, I've been a mom of two. I know what it feels like to hold a vision for something meaningful and not know where to begin.
    </p>
  );

  const Pills = (
    <div className="flex flex-wrap gap-2 mb-7 lg:flex-col lg:gap-1">
      {credentials.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.text}
            className="flex items-center gap-3 rounded-full bg-white/40 px-3 py-2 text-[13px] text-[#2B2B28] ring-1 ring-[#E8D8C7] w-fit basis-[48%] lg:basis-auto"
          >
            <Icon className="h-3.5 w-3.5 text-[#566B4E] flex-shrink-0" />
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );

  const CTA = (
    <a
      href="#waitlist"
      className="mx-auto lg:mx-0 inline-flex items-center justify-center rounded-full bg-[#566B4E] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:shadow-lg w-fit mt-2"
    >
      Join the Founding<br />Member Waitlist
      <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );

  // Desktop photo — used in right column
  const Photo = (
    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.06)" }}>
      <img
        src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
        alt="Danielle, founder of Mama Launch Studio"
        className="w-full h-[420px]"
        style={{ objectFit: "cover", objectPosition: "center 10%", filter: "saturate(0.85) brightness(1.0)", display: "block" }}
      />
    </div>
  );

  // Mobile photo — full-width editorial portrait, no gutter
  const MobilePhoto = (
    <div className="overflow-hidden rounded-xl" style={{ margin: "0 -4px" }}>
      <img
        src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
        alt="Danielle, founder of Mama Launch Studio"
        className="w-full"
        style={{ objectFit: "cover", objectPosition: "center 12%", display: "block", maxHeight: "280px" }}
      />
    </div>
  );

  const drawerGaps = ["mb-1", "mb-2", ""];

  const Accordion = (
    <div className="mt-2">
      {drawers.map((drawer, index) => (
        <div key={drawer.title} className={drawerGaps[index]}>
          <AccordionDrawer
            drawer={drawer}
            isOpen={openDrawer === index}
            onToggle={() => handleToggle(index)}
          />
        </div>
      ))}
    </div>
  );

  const leftColumn = (
    <>
      {Eyebrow}
      {Title}
      {Bio}
      {Pills}
      {CTA}
    </>
  );

  const rightColumn = (
    <>
      {Photo}
      {Accordion}
    </>
  );

  return (
    <section className="px-5 py-16 lg:px-8 lg:py-20" style={{ backgroundColor: "#F4EFE6" }}>
      <div className="mx-auto max-w-[1120px]">

        {/* MOBILE: Specific content order */}
        <div className="flex flex-col gap-5 lg:hidden">
          <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.16em" }}>
            BUILT FROM REAL EXPERIENCE
          </p>
          <h2 className="font-display leading-snug" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 6.5vw, 2.2rem)", lineHeight: "1.2" }}>
            Created by Someone<br />Who Understands
          </h2>
          {MobilePhoto}
          <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "36ch" }}>
            Mama Launch was built from the intersection of education, childcare operations, motherhood, and implementation systems — so you can move forward with more clarity and less overwhelm.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {credentials.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
                  style={{ backgroundColor: "rgba(77,94,73,0.06)", color: "#4D5E49", border: "1px solid #4D5E4918" }}
                >
                  <Icon className="h-3 w-3 flex-shrink-0" style={{ color: "#4D5E49" }} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
          {Accordion}
          {CTA}
        </div>

        {/* DESKTOP: Original two-column grid */}
        <div className="hidden lg:grid grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          <div>{leftColumn}</div>
          <div>{rightColumn}</div>
        </div>

      </div>
    </section>
  );
}