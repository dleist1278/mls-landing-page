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
    <section id="founder" className="py-24 md:py-36" style={{ backgroundColor: "#F0EBE1" }}>
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
          {/* Image — warm, grounded, home-centered */}
          <div className="relative">
            <div
              className="absolute -top-5 -left-5 w-28 h-28 rounded-full opacity-15"
              style={{ backgroundColor: "#C4956A" }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/5", boxShadow: "0 24px 80px rgba(196,149,106,0.18)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cfeaa8?w=800&q=85"
                alt="Danielle, Founder of Mama Launch Studio — in a warm home environment"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 20%", filter: "saturate(0.7) brightness(0.96)" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-8"
                style={{ background: "linear-gradient(to top, rgba(44,44,44,0.82) 0%, transparent 100%)" }}
              >
                <p className="font-display text-base italic" style={{ color: "#FAF7F2" }}>
                  "The living room is the most intentional classroom."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 right-8 left-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </div>

          {/* Content */}
          <div>
            <p className="font-micro mb-6 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Meet Your Guide
            </p>

            <h2
              className="font-display leading-tight mb-6"
              style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
            >
              Hi, I'm Danielle.
              <br />
              <em style={{ color: "#4D5E49" }}>I built this because I needed it.</em>
            </h2>

            <div className="space-y-5">
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
                I started my home daycare at my own kitchen table — with children underfoot, licensing paperwork I didn't understand, and no real roadmap for what came next. The process was isolating. The systems were scattered. And the support for mothers trying to do this thing seriously was almost nonexistent.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
                So I built what I wish had existed. Not a course. Not a coaching program. An actual implementation system — with real templates, organized licensing guidance, room planning support, community, and a method that walks you through every phase of launching a home childcare program with clarity and calm.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem" }}>
                Mama Launch Studio is a founding member experience right now. We are building this together — and I'd love for you to be part of shaping what it becomes.
              </p>
            </div>

            <div className="mt-10 pt-8" style={{ borderTop: "1px solid #C4956A33" }}>
              <button
                onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}
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