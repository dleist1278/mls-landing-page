import React, { useRef, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload } from "lucide-react";

const MOBILE_CARD_META = [
  { key: "village_feature", title: "The Village", description: "Connect with other moms building alongside you." },
  { key: "phase_tracking_feature", title: "Phase Tracking", description: "See exactly where you are and what to do next." },
  { key: "implementation_tools_feature", title: "Implementation Tools", description: "Access templates, prompts, and guided action steps." },
];

const pillars = [
  {
    num: "01",
    title: "Implementation-First Guidance",
    description: "Every phase of the Mama Launch Method comes with structured checklists, templates, and operational tools — so you're always moving forward, never just consuming content.",
    items: [
      "State-specific licensing roadmaps",
      "Phase-by-phase implementation checklists",
      "Downloadable templates and workbooks",
      "Guided action steps in every module",
    ],
  },
  {
    num: "02",
    title: "A Village That Moves Forward",
    description: "The Mama Launch community is implementation-focused, milestone-driven, and uplifting. We celebrate progress, share what's actually working, and move through the method together — a village helping a village.",
    items: [
      "Private peer implementation community",
      "Cohort-based milestone tracking",
      "Monthly live community calls",
      "Phase-organized peer support groups",
    ],
  },
];

function PillarCard({ pillar, index }) {
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
      className="rounded-3xl p-4 pb-3.5 md:p-5 md:pb-4 flex flex-col w-full"
      style={{
        backgroundColor: "#F0EBE1",
        border: "1px solid #C4956A1A",
        transition: `opacity 0.6s ease ${index * 100}ms`,
        opacity: visible ? 1 : 0,
        boxShadow: "0 4px 32px rgba(196,149,106,0.04)",
      }}
    >
      <h3 className="font-display text-lg md:text-xl mb-2" style={{ color: "#2C2C2C" }}>{pillar.title}</h3>
      <div className="w-full h-px mb-2" style={{ backgroundColor: "#C4956A22" }} />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 flex-1">
        {pillar.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
            <span className="font-body text-sm" style={{ color: "#5C5148" }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CardImage({ cardKey }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    base44.entities.SiteContent.filter({ key: cardKey }).then((results) => {
      if (results && results.length > 0 && results[0].image_url) {
        setImageUrl(results[0].image_url);
      }
    });
  }, [cardKey]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const existing = await base44.entities.SiteContent.filter({ key: cardKey });
    if (existing && existing.length > 0) {
      await base44.entities.SiteContent.update(existing[0].id, { image_url: file_url });
    } else {
      await base44.entities.SiteContent.create({ key: cardKey, image_url: file_url });
    }
    setImageUrl(file_url);
    setUploading(false);
  };

  if (imageUrl) {
    return (
      <div className="relative w-full h-[210px] rounded-2xl border border-[#E8D8C7] overflow-hidden group">
        <img
          src={imageUrl}
          alt={cardKey}
          className="w-full h-full object-cover"
          style={{ backgroundColor: "#F4EFE6" }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span className="bg-white/90 text-[#2C2C2C] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Upload size={12} /> Replace photo
          </span>
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>
    );
  }

  return (
    <div
      className="h-[210px] rounded-2xl border border-dashed border-[#D8C6B2] bg-[#F4EFE6] flex flex-col items-center justify-center gap-2 cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      {uploading ? (
        <span className="text-sm text-[#566B4E]">Uploading…</span>
      ) : (
        <>
          <Upload size={20} style={{ color: "#C4956A" }} />
          <span className="text-sm text-[#566B4E]">Tap to upload photo</span>
        </>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
}

export default function EcosystemSection() {
  const headerRef = useRef(null);
  const quoteRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setQuoteVisible(true); }, { threshold: 0.08 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (quoteRef.current) o2.observe(quoteRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <section id="ecosystem" className="md:py-16 py-7" style={{ backgroundColor: "#FAF7F2", scrollMarginTop: "60px" }}>
      <div className="w-full h-px mb-5 md:mb-10" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className="text-center mb-5 md:mb-12"
          style={{ transition: "opacity 0.6s ease", opacity: headerVisible ? 1 : 0 }}
        >
          <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            Community & Support
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          </p>
          <h2 className="font-display leading-tight mx-auto mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 4vw, 3.4rem)", maxWidth: "620px", lineHeight: "1.2" }}>
            Implementation Support,{" "}
            <br />
            <em style={{ color: "#4D5E49" }}>Not Just Inspiration.</em>
          </h2>
          <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "500px", fontSize: "0.9rem", lineHeight: "1.6" }}>
            The Mama Launch community is operationally focused, uplifting, and milestone-driven — a village helping a village build something real.
          </p>
        </div>

        {/* Community image + pillars */}
        <div className="grid md:grid-cols-5 gap-5 mb-10 items-center">
          <div className="hidden md:block md:col-span-2 self-stretch">
            <div className="relative h-full" style={{ minHeight: "360px" }}>
              <div
                className="absolute rounded-[24px]"
                style={{ inset: 0, transform: "translate(-8px, 8px)", backgroundColor: "#E8D5C0", opacity: 0.32, zIndex: 0 }}
              />
              <div className="relative w-full h-full rounded-[24px] overflow-hidden" style={{ boxShadow: "0 8px 36px rgba(196,149,106,0.1)", zIndex: 1 }}>
                <img
                  src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/4df106e43_Untitled_design__1_.jpg"
                  alt="Mothers in a warm, supportive community gathering"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%", filter: "saturate(0.68) brightness(0.93)" }}
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-3">
            <div className="flex flex-col gap-3">
              {pillars.slice(0, 2).map((pillar, i) => (
                <div key={pillar.num}>
                  <PillarCard pillar={pillar} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile swipe cards */}
        <div className="md:hidden -mx-6">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ overscrollBehaviorX: "contain", WebkitOverflowScrolling: "touch" }}
          >
            {MOBILE_CARD_META.map((card) => (
              <div key={card.key} className="flex-none min-w-[86%] snap-center rounded-[28px] bg-white/75 border border-[#E8D8C7] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden">
                <CardImage cardKey={card.key} />
                <div className="px-2 pt-4 pb-2">
                  <h3 className="font-display text-2xl text-[#2B2B28]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3A3A35]">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <span className="h-2 w-2 rounded-full bg-[#566B4E]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C6B2]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C6B2]" />
          </div>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="mt-4 md:mt-10 text-center mx-auto max-w-xl"
          style={{ transition: "opacity 0.6s ease", opacity: quoteVisible ? 1 : 0 }}
        >
          <div className="w-8 h-px mx-auto mb-5" style={{ backgroundColor: "#C4956A" }} />
          <blockquote className="font-display leading-relaxed mb-4" style={{ color: "#2C2C2C", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.35rem)", lineHeight: "1.5", maxWidth: "480px", margin: "0 auto 1rem" }}>
            "I didn't need more inspiration. I needed someone to sit beside me and say — here's what to do next. That's exactly what this is."
          </blockquote>
          <p className="font-micro" style={{ color: "#4D5E49", fontSize: "0.68rem" }}>
            — Early Access Member, Mama Launch Studio
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-6 md:mt-10" style={{ backgroundColor: "#C4956A", opacity: 0.3 }} />
    </section>
  );
}