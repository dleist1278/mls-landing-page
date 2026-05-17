import React, { useRef, useEffect, useState } from "react";

const credentials = [
  { label: "Mother", note: "Mother of two boys, 1 and 3 years old. When I became a mom, I was looking for daycares and couldn't find one that gave me the right homey feeling I wanted my son to experience. I left my job to open my own." },
  { label: "Former Teacher", note: "I spent years in education — first as a teacher, then as an assistant principal — before becoming a home daycare owner. I understood child development, parent communication, and systems deeply. What I didn't have was a real operational map for launching a home childcare program." },
  { label: "Former Assistant Principal", note: "K & 2 lead, NYC Charter. School operations, staff coordination, program oversight." },
  { label: "Home Daycare Owner", note: "Licensing, enrollment, daily operations, parent communication. My home daycare was max capacity in 8 months and I had two hired staff." },
  { label: "App Product Development", note: "I helped build features teachers needed at ClassTag, then left teaching to work for the company, starting their implementation for a SaaS product." },
];

const realTalkItems = [
  "The licensing paperwork was a maze — and no one handed me a map.",
  "The business decisions were lonely and I second-guessed everything.",
  "I experienced burnout before I found operational clarity.",
  "Real support for serious home providers barely existed.",
];

export default function FounderSection() {
  const ref = useRef(null);
  const credRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [credVisible, setCredVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCredVisible(true); }, { threshold: 0.06 });
    if (ref.current) o1.observe(ref.current);
    if (credRef.current) o2.observe(credRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <section id="founder" className="py-16 md:py-24" style={{ backgroundColor: "#F0EBE1" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Main two-col */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-12"
          style={{
            transition: "all 0.9s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            filter: visible ? "blur(0)" : "blur(2px)",
          }}
        >
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/5", boxShadow: "0 16px 60px rgba(196,149,106,0.14)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=85"
                alt="Danielle, Founder of Mama Launch Studio"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%", filter: "saturate(0.68) brightness(0.97)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(44,44,44,0.82) 0%, transparent 100%)" }}
              >
                <p className="font-display text-sm italic" style={{ color: "#FAF7F2" }}>
                  "The living room is the most intentional classroom."
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Meet Your Guide
            </p>

            <h2 className="font-display leading-tight mb-5" style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
              Hi, I'm Danielle.
              <br />
              <em style={{ color: "#4D5E49" }}>I built this because I needed it.</em>
            </h2>

            <div className="space-y-4 mb-7">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
                I spent years in education — first as a teacher, then as an assistant principal — before becoming a home daycare owner. I understood child development, parent communication, and systems deeply. What I didn't have was a real operational map for launching a home childcare program.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
                Mama Launch Studio is what I wish had existed: a real implementation system with templates, licensing guidance, room planning, community, and a method that actually walks you through it — phase by phase.
              </p>
            </div>

            {/* Real talk */}
            <div className="rounded-3xl p-6 mb-7" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A18" }}>
              <p className="font-micro mb-3" style={{ color: "#9a8f84", fontSize: "0.67rem" }}>What I learned the hard way</p>
              <div className="flex flex-col gap-2.5">
                {realTalkItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C4956A" }} />
                    <span className="font-body text-sm leading-snug" style={{ color: "#5C5148" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px]"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}
            >
              Join the Founding Member Waitlist
            </button>
          </div>
        </div>

        {/* Credentials — full width editorial strip */}
        <div
          ref={credRef}
          className="grid md:grid-cols-5 gap-3"
          style={{
            transition: "all 0.8s ease",
            opacity: credVisible ? 1 : 0,
            transform: credVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {credentials.map((c, i) => (
            <div
              key={c.label}
              className="rounded-2xl p-5 flex flex-col gap-2"
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #C4956A18",
                transition: `all 0.6s ease ${i * 80}ms`,
                opacity: credVisible ? 1 : 0,
                transform: credVisible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <span className="font-display text-base" style={{ color: "#2C2C2C" }}>{c.label}</span>
              <span className="font-body text-xs leading-snug" style={{ color: "#9a8f84" }}>{c.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}