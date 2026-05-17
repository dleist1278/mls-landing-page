import React, { useRef, useEffect, useState } from "react";

export default function FounderSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="founder"
      className="py-24 md:py-36"
      style={{ backgroundColor: "#F0EBE1" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
          style={{
            transition: "all 0.9s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            filter: visible ? "blur(0)" : "blur(3px)",
          }}
        >
          {/* Image */}
          <div className="relative">
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-20"
              style={{ backgroundColor: "#C4956A" }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 24px 80px rgba(196,149,106,0.2)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Danielle, Founder of Mama Launch Studio"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.75) brightness(0.97)" }}
              />
              {/* Overlay quote */}
              <div
                className="absolute bottom-0 left-0 right-0 p-8"
                style={{
                  background:
                    "linear-gradient(to top, rgba(44,44,44,0.85) 0%, transparent 100%)",
                }}
              >
                <p
                  className="font-display text-lg italic"
                  style={{ color: "#FAF7F2" }}
                >
                  "The living room is the most powerful boardroom."
                </p>
              </div>
            </div>
            {/* Clay accent line */}
            <div
              className="absolute -bottom-6 right-8 left-8 h-px"
              style={{ backgroundColor: "#C4956A" }}
            />
          </div>

          {/* Content */}
          <div>
            <p
              className="font-micro mb-6 flex items-center gap-3"
              style={{ color: "#C4956A", fontSize: "0.75rem" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "#C4956A" }}
              />
              Meet Your Guide
            </p>

            <h2
              className="font-display leading-tight mb-6"
              style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
            >
              Hi, I'm Danielle.
              <br />
              <em style={{ color: "#4D5E49" }}>I built this for you.</em>
            </h2>

            <div className="space-y-5">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
                I started my home daycare in 2016 with zero business experience, a dining room table, and a deep belief that mothers could create something extraordinary from the spaces they already occupied.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
                What I didn't have was a roadmap. The licensing process felt like a labyrinth. The business decisions were paralyzing. And the isolation of working from home — especially in those early months — was something no one warned me about.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
                So I built the guide I wish I'd had. And then I built the community around it. Mama Launch Studio is the result of years of licensing, launching, failing forward, and learning — distilled into the most intentional, calm, and effective implementation system I could create.
              </p>
            </div>

            <div
              className="mt-10 pt-10"
              style={{ borderTop: "1px solid #C4956A33" }}
            >
              <div className="flex flex-wrap gap-10">
                {[
                  { label: "Years in Childcare", value: "8+" },
                  { label: "Mothers Guided", value: "200+" },
                  { label: "States Covered", value: "32" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-display text-4xl"
                      style={{ color: "#4D5E49", letterSpacing: "-0.02em" }}
                    >
                      {s.value}
                    </p>
                    <p className="font-micro mt-1" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() =>
                  document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
                style={{
                  backgroundColor: "#4D5E49",
                  fontSize: "0.8rem",
                  boxShadow: "0 8px 32px rgba(77,94,73,0.2)",
                }}
              >
                Start Your Launch Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}