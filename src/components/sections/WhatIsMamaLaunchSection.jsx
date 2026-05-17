import React, { useRef, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const differentiators = [
{ label: "Not a course you watch and forget", contrast: "A structured launch framework you build through" },
{ label: "Not vague coaching with no deliverables", contrast: "Real operational documents at every phase" },
{ label: "Not generic childcare training", contrast: "A method built specifically for home-based programs" }];


const included = [
"Step-by-step implementation phases",
"State-specific licensing guidance",
"Room & environment planning",
"Operational templates & workbooks",
"Parent communication systems",
"Community cohort support"];


function ImageStrip({ images }) {
  // Desktop: 3-column grid. Mobile: horizontal swipe carousel.
  return (
    <>
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 h-full gap-0">
        {images.map((img, i) =>
        <img
          key={i}
          src={img.image_url}
          alt={img.alt_text || ""}
          className="w-full h-full object-cover"
          style={{
            objectPosition: img.focal_position || "center",
            filter: "saturate(0.7) brightness(0.95)"
          }} />

        )}
      </div>

      {/* Mobile: swipe carousel — all 3 images, each ~80vw wide */}
      <div
        className="flex md:hidden overflow-x-auto gap-3 px-5 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}>
        
        {images.map((img, i) =>
        <div
          key={i}
          className="flex-none rounded-2xl overflow-hidden"
          style={{
            width: "78vw",
            aspectRatio: "3/4",
            scrollSnapAlign: "start",
            boxShadow: "0 8px 32px rgba(196,149,106,0.13)",
            border: "1px solid #C4956A14"
          }}>
          
            <img
            src={img.image_url}
            alt={img.alt_text || ""}
            className="w-full h-full object-cover"
            style={{
              objectPosition: img.focal_position || "center",
              filter: "saturate(0.72) brightness(0.95)"
            }} />
          
          </div>
        )}
        {/* trailing space */}
        <div className="flex-none w-2" />
      </div>

      {/* Mobile swipe hint */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-3 px-5">
        <div className="w-6 h-px" style={{ backgroundColor: "#C4956A44" }} />
        <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.6rem" }}>
          Swipe to explore
        </p>
        <div className="w-6 h-px" style={{ backgroundColor: "#C4956A44" }} />
      </div>
    </>);

}

export default function WhatIsMamaLaunchSection() {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [stripImages, setStripImages] = useState([]);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setImgVisible(true);}, { threshold: 0.06 });
    if (ref.current) o1.observe(ref.current);
    if (imgRef.current) o2.observe(imgRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  useEffect(() => {
    // Load primary image (reuse method_image_02 as the editorial left-column image)
    base44.entities.SiteContent.filter({ key: "method_image_02" }).then((r) => {
      if (r?.length > 0) setPrimaryImage(r[0]);
    });
    // Load all three strip images
    Promise.all([
    base44.entities.SiteContent.filter({ key: "method_image_01" }),
    base44.entities.SiteContent.filter({ key: "method_image_02" }),
    base44.entities.SiteContent.filter({ key: "method_image_03" })]
    ).then(([r1, r2, r3]) => {
      const imgs = [r1, r2, r3].map((r) => r?.[0]).filter(Boolean);
      setStripImages(imgs);
    });
  }, []);

  return (
    <section style={{ backgroundColor: "#F0EBE1", overflow: "hidden" }}>
      {/* Main two-column editorial block */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-14 md:py-24">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
          style={{
            transition: "all 0.8s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            filter: visible ? "blur(0)" : "blur(2px)"
          }}>
          
          {/* Left — editorial imagery + differentiators */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/3", boxShadow: "0 12px 48px rgba(196,149,106,0.12)" }}>
              
              {primaryImage?.image_url ?
              <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/9d672eb4b_7.jpg"

              alt={primaryImage.alt_text || ""}
              className="w-full h-full object-cover"
              style={{
                objectPosition: primaryImage.focal_position || "center 40%",
                filter: "saturate(0.75) brightness(0.96)"
              }} /> :


              <div className="w-full h-full" style={{ backgroundColor: "#E8D5C0" }} />
              }
            </div>

            <div className="rounded-3xl p-6" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A18" }}>
              <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>
                How Mama Launch is different
              </p>
              <div className="flex flex-col gap-4">
                {differentiators.map((d) =>
                <div key={d.label} className="flex flex-col gap-1">
                    <span className="font-body text-xs line-through" style={{ color: "#B8ADA6" }}>{d.label}</span>
                    <span className="font-body text-sm" style={{ color: "#4D5E49" }}>✓ {d.contrast}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — text content */}
          <div>
            <p className="font-micro mb-4 flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Understanding the Platform
            </p>
            <h2
              className="font-display leading-tight mb-5"
              style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              
              What is the{" "}
              <em style={{ color: "#4D5E49" }}>Mama Launch Method™?</em>
            </h2>
            <p className="font-body leading-relaxed mb-4" style={{ color: "#5C5148", fontSize: "1rem" }}>
              Mama Launch is a guided implementation system helping mothers launch intentional home childcare programs through step-by-step phases, operational systems, templates, and community support.
            </p>
            <p className="font-body leading-relaxed mb-8" style={{ color: "#5C5148", fontSize: "0.96rem" }}>
              This is not a traditional business course or generic childcare training. Mama Launch helps mothers build calm, sustainable childcare ecosystems rooted in structure, emotional safety, and real family life.
            </p>

            <p className="font-micro mb-4" style={{ color: "#9a8f84", fontSize: "0.68rem" }}>What's inside the method</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {included.map((item) =>
              <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
                  <span className="font-body text-sm leading-snug" style={{ color: "#5C5148" }}>{item}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => document.getElementById("method")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro px-7 py-3.5 rounded-full border hover:opacity-80 transition-all min-h-[48px]"
              style={{ color: "white", borderColor: "#4D5E49", fontSize: "0.78rem", backgroundColor: "#4D5E49" }}>
              
              See the 5-Phase Method →
            </button>
          </div>
        </div>
      </div>

      {/* Full-width editorial image strip */}
      <div
        ref={imgRef}
        className="w-full overflow-hidden"
        style={{
          transition: "all 1s ease",
          opacity: imgVisible ? 1 : 0,
          transform: imgVisible ? "scale(1)" : "scale(1.02)"
        }}>
        
        {/* Desktop: fixed height strip */}
        <div className="hidden md:block" style={{ height: "320px" }}>
          {stripImages.length > 0 &&
          <div className="grid grid-cols-3 h-full gap-0">
              {stripImages.map((img, i) =>
            <img
              key={i}
              src={img.image_url}
              alt={img.alt_text || ""}
              className="w-full h-full object-cover"
              style={{
                objectPosition: img.focal_position || "center",
                filter: "saturate(0.7) brightness(0.95)"
              }} />

            )}
            </div>
          }
        </div>

        {/* Mobile: swipe carousel with editorial framing */}
        {stripImages.length > 0 &&
        <div className="block md:hidden py-6">
            <div
            className="flex overflow-x-auto gap-3 px-5 pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}>
            
              {stripImages.map((img, i) =>
            <div
              key={i}
              className="flex-none rounded-2xl overflow-hidden"
              style={{
                width: "72vw",
                aspectRatio: "3/4",
                scrollSnapAlign: "start",
                boxShadow: "0 8px 32px rgba(196,149,106,0.14)",
                border: "1px solid #C4956A18"
              }}>
              
                  <img
                src={img.image_url}
                alt={img.alt_text || ""}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: img.focal_position || "center",
                  filter: "saturate(0.72) brightness(0.95)"
                }} />
              
                </div>
            )}
              <div className="flex-none w-4" />
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-6 h-px" style={{ backgroundColor: "#C4956A44" }} />
              <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.6rem" }}>Swipe to explore</p>
              <div className="w-6 h-px" style={{ backgroundColor: "#C4956A44" }} />
            </div>
          </div>
        }
      </div>
    </section>);

}