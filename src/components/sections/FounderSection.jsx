import React, { useRef, useEffect, useState } from "react";

const credentials = [
  { label: "Mother", icon: "○" },
  { label: "Former Teacher", icon: "○" },
  { label: "Former Assistant Principal", icon: "○" },
  { label: "Home Daycare Owner", icon: "○" },
  { label: "Implementation & Systems Expert", icon: "○" },
];

export default function FounderSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="founder" className="py-24 md:py-32" style={{ backgroundColor: "#F0EBE1" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-14 md:gap-20 items-center"
          style={{
            transition: "all 0.9s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            filter: visible ? "blur(0)" : "blur(3px)",
          }}
        >
          {/* Image — warm, motherhood-centered, home environment */}
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full opacity-12" style={{ backgroundColor: "#C4956A" }} />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/5", boxShadow: "0 20px 72px rgba(196,149,106,0.16)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=85"
                alt="Danielle, Founder of Mama Launch Studio"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%", filter: "saturate(0.68) brightness(0.97)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-7"
                style={{ background: "linear-gradient(to top, rgba(44,44,44,0.8) 0%, transparent 100%)" }}
              >
                <p className="font-display text-base italic" style={{ color: "#FAF7F2" }}>
                  "The living room is the most intentional classroom."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 right-8 left-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </div>

          {/* Content */}
          <div>
            <p className="font-micro mb-5 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Meet Your Guide
            </p>

            <h2
              className="font-display leading-tight mb-6"
              style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Hi, I'm Danielle.
              <br />
              <em style={{ color: "#4D5E49" }}>I built this because I needed it.</em>
            </h2>

            {/* Credentials — grounded, not flashy */}
            <div className="flex flex-wrap gap-2 mb-7">
              {credentials.map((c) => (
                <span
                  key={c.label}
                  className="font-body text-xs px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "#FAF7F2", color: "#5C5148", border: "1px solid #C4956A1A" }}
                >
                  {c.label}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.98rem" }}>
                I spent years in education — first as a teacher, then as an assistant principal — before becoming a home daycare owner. I understood child development, parent communication, and systems. What I didn't have was a real map for the operational side of launching a home childcare program.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.98rem" }}>
                The licensing paperwork was a maze. The business decisions were lonely. And the support for mothers doing this seriously barely existed. I learned it the hard way — through trial, error, burnout, and eventual clarity.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.98rem" }}>
                Mama Launch Studio is what I wish had existed. A real implementation system — with templates, licensing guidance, room planning, community, and a method that actually walks you through it. We're building this as a founding member experience, and I'd love for you to help shape it.
              </p>
            </div>

            <div className="mt-9 pt-8" style={{ borderTop: "1px solid #C4956A2A" }}>
              <button
                onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}
              >
                Join the Founding Member Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}