import { useState } from "react";
import { GraduationCap, Home, Heart, ChevronDown, ArrowRight, LayoutDashboard } from "lucide-react";

const credentials = [
  { icon: GraduationCap, text: "Former educator + school leader" },
  { icon: Home, text: "Licensed home daycare owner" },
  { icon: Heart, text: "Mom of two" },
  { icon: LayoutDashboard, text: "Experience in app implementation" },
];

const drawers = [
  {
    title: "Why I built it",
    content:
      "When I opened my own program, I found scattered information, no clear roadmap, and very little support designed for serious home providers.",
  },
  {
    title: "What I understand",
    content:
      "I understand licensing, parent communication, daily systems, classroom flow, and the emotional reality of building a business while raising your own children.",
  },
  {
    title: "What this gives you",
    content:
      "Mama Launch gives you a guided path, practical tools, and a supportive village so you can move forward with clarity instead of overwhelm.",
  },
];

function AccordionDrawer({ drawer, isOpen, onToggle }) {
  return (
    <div className={`rounded-2xl border border-[#E8D8C7] overflow-hidden transition-colors duration-200 ${isOpen ? "bg-[#FFFDF9]" : "bg-white/70"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
      >
        <span className="font-medium text-[#2B2B28] text-sm">{drawer.title}</span>
        <ChevronDown
          className="h-4 w-4 flex-shrink-0 text-[#566B4E] transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm leading-relaxed text-[#3A3A35]">
            {drawer.content}
          </p>
        </div>
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
      I'm a former educator, assistant principal, licensed home daycare owner, and mom of two.
      I know both the professional systems and the real life you're building inside of.
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
      Join the Founding Member Waitlist
      <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );

  const Photo = (
    <div className="rounded-3xl overflow-hidden p-2" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>
      <img
        src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
        alt="Danielle, founder of Mama Launch Studio"
        className="w-full object-cover object-center h-[320px] lg:h-[420px]"
        style={{ filter: "saturate(0.82) brightness(0.99)", objectPosition: "center 12%", display: "block" }}
      />
    </div>
  );

  const Accordion = (
    <div className="mt-2 space-y-1">
      {drawers.map((drawer, index) => (
        <AccordionDrawer
          key={drawer.title}
          drawer={drawer}
          isOpen={openDrawer === index}
          onToggle={() => handleToggle(index)}
        />
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
    <section className="px-5 py-14 lg:px-8 lg:py-20" style={{ backgroundColor: "#F4EFE6" }}>
      <div className="mx-auto max-w-[1120px]">

        {/* MOBILE: Specific content order */}
        <div className="flex flex-col gap-5 lg:hidden">
          {Eyebrow}
          {Title}
          {Photo}
          {Bio}
          {Pills}
          {CTA}
          {Accordion}
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