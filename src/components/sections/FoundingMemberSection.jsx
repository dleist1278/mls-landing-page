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
}];


export default function FoundingMemberSection() {
  const headerRef = useRef(null);
  const imgRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  const handleUpload = async (e, setImg) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setImg(file_url);
  };

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setHeaderVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setImgVisible(true);}, { threshold: 0.06 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (imgRef.current) o2.observe(imgRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return (
    <section className="md:py-24 py-16" style={{ backgroundColor: "#F0EBE1" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div
          ref={headerRef}
          className="mb-12"
          style={{ transition: "all 0.8s ease", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(24px)", filter: headerVisible ? "blur(0)" : "blur(2px)" }}>
          
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
              Mama Launch Studio is in early access. Here's exactly what founding members experience — transparently, honestly, and with full clarity.
            </p>
          </div>
        </div>

        {/* Steps + image side by side */}
        <div className="grid md:grid-cols-5 gap-8 mb-10">
          {/* Steps */}
          <div className="md:col-span-3 relative">
            <div className="hidden md:block absolute left-[2.1rem] top-10 bottom-10 w-px" style={{ backgroundColor: "#C4956A28" }} />
            <div className="flex flex-col gap-6">
              {steps.map((step, i) =>
              <StepRow key={step.step} step={step} index={i} />
              )}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imgRef}
            className="md:col-span-2 flex flex-col gap-4"
            style={{ transition: "all 0.8s ease 0.2s", opacity: imgVisible ? 1 : 0, transform: imgVisible ? "translateY(0)" : "translateY(24px)" }}>
            
            <input ref={input1Ref} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, setImg1)} />
            <div
              className="rounded-3xl overflow-hidden flex-1 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              style={{ minHeight: "200px", backgroundColor: "#E8D5C014", border: "1px dashed #C4956A44" }}
              onClick={() => input1Ref.current?.click()}>
              {img1
                ? <img src={img1} alt="" className="w-full h-full object-cover" style={{ minHeight: "200px" }} />
                : <span className="font-micro" style={{ color: "#C4956A", opacity: 0.5, fontSize: "0.65rem" }}>Click to upload image</span>}
            </div>

            <input ref={input2Ref} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, setImg2)} />
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              style={{ height: "180px", backgroundColor: "#E8D5C014", border: "1px dashed #C4956A44" }}
              onClick={() => input2Ref.current?.click()}>
              {img2
                ? <img src={img2} alt="" className="w-full h-full object-cover" style={{ height: "180px" }} />
                : <span className="font-micro" style={{ color: "#C4956A", opacity: 0.5, fontSize: "0.65rem" }}>Click to upload image</span>}
            </div>
          </div>
        </div>

        {/* Transparency note */}
        <div className="p-7 rounded-3xl" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A1A" }}>
          <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.7rem" }}>A Note on Transparency</p>
          <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.93rem", maxWidth: "660px" }}>
            Mama Launch Studio is a guided implementation platform in active development. Founding members receive early access, help shape the experience, and move through the Mama Launch Method as the platform evolves. This is a collaborative, community-centered launch — not a fully finished product. We believe in building with our community, not before them.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
            className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px]"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}>
            
            Apply for Early Access
          </button>
          <p className="font-body" style={{ color: "#9a8f84", fontSize: "0.83rem" }}>
            Founding member spots are limited.
          </p>
        </div>
      </div>
    </section>);

}

function StepRow({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
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
      
      <div className="flex-none w-[4rem] h-[4rem] rounded-full flex items-center justify-center z-10"
      style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A44" }}>
        <span className="font-display text-base" style={{ color: "#C4956A", letterSpacing: "-0.02em" }}>{step.step}</span>
      </div>
      <div className="pt-2 pb-3">
        <h3 className="font-display text-lg mb-1.5" style={{ color: "#2C2C2C" }}>{step.title}</h3>
        <p className="font-body text-sm leading-relaxed" style={{ color: "#5C5148", maxWidth: "480px" }}>{step.description}</p>
      </div>
    </div>);

}