import { useState } from "react";
import {
  GraduationCap,
  Home,
  Heart,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function DanielleStorySection() {
  const [openDrawer, setOpenDrawer] = useState(0);

  const drawers = [
    {
      title: "Why I built it",
      content:
        "I opened my own home daycare and quickly realized how hard it was to find clear, practical, trustworthy guidance in one place.",
    },
    {
      title: "What I know",
      content:
        "I understand licensing, systems, parent communication, classroom flow, and the emotional reality of building something while raising your own children.",
    },
    {
      title: "What this gives you",
      content:
        "Mama Launch gives you a guided path, practical templates, and a supportive village so you can move forward without feeling overwhelmed.",
    },
  ];

  const credentials = [
    { icon: GraduationCap, text: "Former educator + school leader" },
    { icon: Home, text: "Licensed home daycare owner" },
    { icon: Heart, text: "Mom of two" },
  ];

  return (
    <section className="bg-[#F4EFE6] px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#C98F5D]">
            Hi, I'm Danielle
          </p>

          <h2 className="font-serif text-[42px] leading-[1.05] text-[#2B2B28] sm:text-5xl lg:text-6xl">
            I built this
            <span className="block italic text-[#566B4E]">
              because I needed it.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#3A3A35] sm:text-lg">
            I know both sides: the professional systems and the real-life
            motherhood you're building inside of.
          </p>

          <div className="mt-7 space-y-3">
            {credentials.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-full bg-white/60 px-4 py-3 text-sm text-[#2B2B28] ring-1 ring-[#E8D8C7]"
                >
                  <Icon className="h-5 w-5 text-[#566B4E]" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-full bg-[#566B4E] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Join the Founding Member Waitlist
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>

            <a
              href="#method"
              className="inline-flex items-center justify-center rounded-full border border-[#C98F5D] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#566B4E] transition hover:-translate-y-0.5 hover:bg-white/50"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="space-y-5">
          <div className="overflow-hidden rounded-[2rem] bg-white/70 p-3 shadow-sm ring-1 ring-[#E8D8C7]">
            <img
              src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
              alt="Danielle, founder of Mama Launch Studio"
              className="h-[420px] w-full rounded-[1.5rem] object-cover object-center sm:h-[500px] lg:h-[520px]"
              style={{ objectPosition: "center 12%", filter: "saturate(0.68) brightness(0.97)" }}
            />
          </div>

          <div className="rounded-[2rem] bg-white/70 p-5 shadow-sm ring-1 ring-[#E8D8C7]">
            <p className="mb-4 font-serif text-2xl text-[#2B2B28]">
              My story, simply
            </p>

            <div className="space-y-3">
              {drawers.map((drawer, index) => {
                const isOpen = openDrawer === index;

                return (
                  <div
                    key={drawer.title}
                    className="rounded-2xl border border-[#E8D8C7] bg-white/70 transition hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDrawer(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                    >
                      <span className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#566B4E]" />
                        <span className="font-medium text-[#2B2B28]">
                          {drawer.title}
                        </span>
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 text-[#566B4E] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 text-sm leading-6 text-[#3A3A35]">
                          {drawer.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}