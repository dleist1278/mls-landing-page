import React, { useRef, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const steps = [
  {
    step: "01",
    title: "Join the Waitlist",
    description: "Share a little about your vision and readiness. We use this to understand where you are and what you need most."
  },
  {
    step: "02",
    title: "Receive Your Welcome",
    description: "Founding members receive a personal welcome, early access to Phase One materials, and an invitation to the founding community."
  },
  {
    step: "03",
    title: "Begin Phase One Together",
    description: "You'll move through the Mama Launch Method with a cohort of founding members — guided, supported, and never alone."
  },
  {
    step: "04",
    title: "Shape the Platform",
    description: "Your feedback and experience directly influence how the platform evolves. You're not just a user — you're a co-architect."
  },
  {
    step: "05",
    title: "Open Your Doors",
    description: "By the end of the method, you'll have a licensed, operational, enrollment-ready home childcare program — with a community standing beside you."
  }
];

function StepRow({ step, index }) {
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
    <div
      ref={ref}
      className="flex gap-5 items-start"
      style={{
        transition: `all 0.65s ease ${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        filter: visible ? "blur(0)" : "blur(2px)"
      }}>
      <div
        className="flex-none w-[4rem] h-[4rem] rounded-full flex items-center justify-center z-10"
        style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A44" }}>
        <span className="font-display text-base" style={{ color: "#C4956A", letterSpacing: "-0.02em" }}>{step.step}</span>
      </div>
      <div className="pt-2 pb-3">
        <h3 className="font-display text-lg mb-1.5" style={{ color: "#2C2C2C" }}>{step.title}</h3>
        <p className="font-body text-sm leading-relaxed" style={{ color: "#5C5148", maxWidth: "480px" }}>{step.description}</p>
      </div>
    </div>
  );
}

/**
 * Editorial imagery composition — staggered, asymmetric, layered.
 * Images loaded from editor-managed SiteContent entity.
 * Conditionally hidden if no image exists — no broken states.
 */
function EditorialImagery({ img1, img2, visible }) {
  return (
    <div
      className="relative hidden md:block"
      style={{
        minHeight: "560px",
        transition: "all 1s ease 0.3s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)"
      }}>

      {/* Background wash — warm editorial tone */}
      <div
        className="absolute inset-0 rounded-[40px]"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, #E8D5C040 0%, transparent 70%)",
          zIndex: 0
        }}
      />

      {/* Primary image — large, anchored bottom-right */}
      {true && (
        <div
          className="absolute rounded-[28px] overflow-hidden"
          style={{
            width: "72%",
            aspectRatio: "3/4",
            right: 0,
            bottom: 0,
            zIndex: 2,
            boxShadow: "0 24px 80px rgba(44,44,44,0.13), 0 4px 20px rgba(196,149,106,0.12)",
            border: "1px solid #C4956A14"
          }}>
          <img
            src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/3b7c88598_Untitleddesign2.jpg"
            alt={img1.alt_text || "Mother and child playing together"}
            className="w-full h-full object-cover"
            style={{
              objectPosition: "center 20%",
              filter: "saturate(0.72) brightness(0.96)"
            }}
          />
          {/* Soft vignette overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 55%, rgba(44,44,44,0.18) 100%)" }}
          />
        </div>
      )}

      {/* Secondary image — smaller, floated top-left, overlapping */}
      {img2?.image_url && (
        <div
          className="absolute rounded-[22px] overflow-hidden"
          style={{
            width: "52%",
            aspectRatio: "4/3",
            left: 0,
            top: "6%",
            zIndex: 3,
            boxShadow: "0 16px 56px rgba(44,44,44,0.16), 0 2px 12px rgba(196,149,106,0.1)",
            border: "2px solid #FAF7F2"
          }}>
          <img
            src={img2.image_url}
            alt={img2.alt_text || ""}
            className="w-full h-full object-cover"
            style={{
              objectPosition: img2.focal_position || "center 25%",
              filter: "saturate(0.68) brightness(0.97)"
            }}
          />
        </div>
      )}

      {/* Decorative clay accent circle — bottom-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "120px",
          height: "120px",
          bottom: "8%",
          left: "2%",
          zIndex: 1,
          background: "radial-gradient(circle, #E8D5C0 0%, #F0EBE1 70%)",
          opacity: 0.55
        }}
      />

      {/* Decorative sage dot cluster — top-right */}
      <div
        className="absolute"
        style={{ top: "2%", right: "4%", zIndex: 1, opacity: 0.25 }}>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
          ))}
        </div>
      </div>

      {/* Floating quote card */}
      <div
        className="absolute rounded-2xl px-5 py-4"
        style={{
          bottom: "18%",
          left: "-4%",
          zIndex: 4,
          backgroundColor: "#FAF7F2",
          border: "1px solid #C4956A18",
          boxShadow: "0 8px 32px rgba(44,44,44,0.09)",
          maxWidth: "200px"
        }}>
        <p className="font-body text-xs leading-relaxed" style={{ color: "#5C5148", fontStyle: "italic" }}>
          "You don't build alone. You build alongside."
        </p>
        <div className="mt-2 w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
      </div>
    </div>
  );
}

export default function FoundingMemberSection() {
  const headerRef = useRef(null);
  const imgRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setImgVisible(true); }, { threshold: 0.06 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (imgRef.current) o2.observe(imgRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  // Load both images independently — each from its own SiteContent record
  useEffect(() => {
    base44.entities.SiteContent.filter({ key: "waitlist_experience_image_01" })
      .then((r) => { if (r?.length > 0) setImg1(r[0]); });
    base44.entities.SiteContent.filter({ key: "waitlist_experience_image_02" })
      .then((r) => { if (r?.length > 0) setImg2(r[0]); });
  }, []);

  return (
    <section className="md:py-24 py-16" style={{ backgroundColor: "#F0EBE1" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-12"
          style={{
            transition: "all 0.8s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            filter: headerVisible ? "blur(0)" : "blur(2px)"
          }}>
          <p className="font-micro mb-3 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            The Founding Member Experience
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-display leading-tight" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}>
              What Happens After
              <br />
              <em style={{ color: "#4D5E49" }}>You Join the Waitlist?</em>
            </h2>
            <p className="font-body md:max-w-sm leading-relaxed" style={{ color: "#5C5148", fontSize: "0.95rem" }}>
              Here's exactly what founding members experience — transparently, honestly, and with full clarity.
            </p>
          </div>
        </div>

        {/* Steps + editorial imagery */}
        <div ref={imgRef} className="grid md:grid-cols-5 gap-10 md:gap-16 mb-10 items-center">

          {/* Steps timeline */}
          <div className="md:col-span-3 relative">
            <div className="hidden md:block absolute left-[2.1rem] top-10 bottom-10 w-px" style={{ backgroundColor: "#C4956A28" }} />
            <div className="flex flex-col gap-6">
              {steps.map((step, i) => (
                <StepRow key={step.step} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Editorial imagery composition */}
          <div className="md:col-span-2">
            <EditorialImagery img1={img1} img2={img2} visible={imgVisible} />
          </div>
        </div>

        {/* Transparency note */}
        <div className="p-7 rounded-3xl" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A1A" }}>
          <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.7rem" }}>A Note on Transparency</p>
          <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.93rem", maxWidth: "660px" }}>
            Mama Launch Studio is a guided implementation platform in active development. Founding members receive early access, help shape the experience, and move through the Mama Launch Method™ as the platform evolves. This is a collaborative, community-centered launch — not a fully finished product. We believe in building with our community, not before them.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] focus-sage"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}>
            Join the Founding Member Waitlist
          </button>
          <p className="font-body" style={{ color: "#9a8f84", fontSize: "0.83rem" }}>
            Founding member spots are limited.
          </p>
        </div>
      </div>
    </section>
  );
}