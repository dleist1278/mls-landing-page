import React, { useRef, useEffect, useState } from "react";

const credentials = [
{ label: "Mother", note: "Mom to two boys, ages 1 and 3." },
{ label: "Former Teacher", note: "Background in child development, learning, and parent communication." },
{ label: "Former Assistant Principal", note: "Experienced in school leadership, operations, and team management." },
{ label: "Home Daycare Owner", note: "Licensed home daycare owner with enrollment, staffing, and daily operations experience." },
{ label: "Product Implementation", note: "Built educator-focused systems and implementation workflows for teachers and schools." }];


const realTalkItems = [
"The licensing paperwork was a maze — and no one handed me a map.",
"The business decisions were lonely and I second-guessed everything.",
"I experienced burnout before I found operational clarity.",
"Real support for serious home providers barely existed."];


export default function FounderSection() {
  const ref = useRef(null);
  const credRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [credVisible, setCredVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setCredVisible(true);}, { threshold: 0.06 });
    if (ref.current) o1.observe(ref.current);
    if (credRef.current) o2.observe(credRef.current);
    return () => {o1.disconnect();o2.disconnect();};
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
            filter: visible ? "blur(0)" : "blur(2px)"
          }}>
          
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4/5", boxShadow: "0 16px 60px rgba(196,149,106,0.14)" }}>
              
              <img
                src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2c01c579c_54354ad6-84ca-460d-9cf0-f3fe5fffec311.png"
                alt="Danielle, Founder of Mama Launch Studio"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%", filter: "saturate(0.68) brightness(0.97)" }} />
              
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(44,44,44,0.82) 0%, transparent 100%)" }}>
                
                <p className="font-display text-sm italic hidden" style={{ color: "#FAF7F2" }}>
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
                I spent years in education as a teacher and assistant principal before working in educator-focused app and systems implementation. Later, I became a licensed home daycare owner and mother to two boys.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
                Through teaching, leadership, childcare operations, and implementation work, I developed a deep understanding of child development, parent communication, operational systems, and the real-life challenges providers face while building sustainable programs — but what I didn't have was a clear, modern roadmap for launching a home childcare program that felt calm, intentional, and aligned with real family life.
              </p>
              <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "0.97rem" }}>
                Mama Launch Studio is the system I wish existed: a guided implementation method helping mothers build home childcare programs with structure, support, and step-by-step guidance.
              </p>
            </div>

            {/* Real talk */}
            <div className="rounded-3xl p-6 mb-7 hidden" style={{ backgroundColor: "#FAF7F2", border: "1px solid #C4956A18" }}>
              <p className="font-micro mb-3" style={{ color: "#9a8f84", fontSize: "0.67rem" }}>What I learned the hard way</p>
              <div className="flex flex-col gap-2.5">
                {realTalkItems.map((item) =>
                <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 flex-none w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C4956A" }} />
                    <span className="font-body text-sm leading-snug" style={{ color: "#5C5148" }}>{item}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
              className="font-micro text-white px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px]"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", boxShadow: "0 8px 32px rgba(77,94,73,0.2)" }}>
              
              Join the Founding Member Waitlist
            </button>
          </div>
        </div>


      </div>
    </section>);

}