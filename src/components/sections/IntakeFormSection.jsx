import React, { useRef, useEffect, useState } from "react";

const roles = [
  "Stay-at-home mother",
  "Working mother seeking transition",
  "Currently providing informal childcare",
  "Early childhood educator",
  "Other",
];

const interests = [
  "Home Daycare & Nursery (Full-Time)",
  "Drop-In Care (Part-Time / Flexible)",
  "Small-Group Caregiver Co-op",
  "I'm not sure yet — help me decide",
];

const hesitations = [
  "Understanding the licensing process",
  "Financial planning and pricing",
  "Finding my first families",
  "Balancing with my own children",
  "Feeling qualified enough",
  "The time commitment required",
];

const states = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

export default function IntakeFormSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", email: "", role: "", interest: "", state: "", hesitation: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 400);
  };

  const inputStyle = {
    background: "transparent", border: "none", borderBottom: "1px solid #C4956A",
    borderRadius: 0, padding: "12px 0", fontFamily: "'Inter', sans-serif",
    fontSize: "1rem", color: "#2C2C2C", width: "100%", outline: "none",
  };

  const selectStyle = {
    ...inputStyle, cursor: "pointer", WebkitAppearance: "none", appearance: "none",
  };

  return (
    <section id="intake" style={{ backgroundColor: "#F0EBE1", overflow: "hidden" }}>

      {/* Top image strip */}
      <div style={{ height: "260px", overflow: "hidden" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 h-full">
          {[
            { src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80", pos: "center 30%", alt: "Mother and child floor play" },
            { src: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=500&q=80", pos: "center 20%", alt: "Organized childcare shelving" },
            { src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80", pos: "center 35%", alt: "Children at snack time" },
            { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&q=80", pos: "center 15%", alt: "Outdoor exploration moment" },
          ].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="w-full h-full object-cover hidden md:block"
              style={{ objectPosition: img.pos, filter: "saturate(0.65) brightness(0.9)" }} />
          ))}
          {/* Mobile: show two */}
          <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80" alt="Mother and child" className="w-full h-full object-cover md:hidden"
            style={{ objectPosition: "center 30%", filter: "saturate(0.65) brightness(0.9)" }} />
          <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&q=80" alt="Outdoor play" className="w-full h-full object-cover md:hidden"
            style={{ objectPosition: "center 15%", filter: "saturate(0.65) brightness(0.9)" }} />
        </div>
      </div>

      {/* Form container */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div
          ref={ref}
          style={{
            transition: "all 0.9s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            filter: visible ? "blur(0)" : "blur(2px)",
          }}
        >

          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Founding Member Waitlist
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            </p>
            <h2 className="font-display leading-tight mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}>
              Come Build This{" "}
              <em style={{ color: "#4D5E49" }}>With Us.</em>
            </h2>
            <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "460px", fontSize: "0.97rem" }}>
              Tell us a little about yourself and your vision. This is the beginning of your launch path — and we're honored to walk it with you.
            </p>
          </div>



          {/* Form / Success */}
          {submitted ? (
            <div className="text-center py-16" style={{ animation: "atmosphericEntrance 0.9s ease-out forwards" }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-7 flex items-center justify-center" style={{ backgroundColor: "#4D5E4915" }}>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: "#4D5E49" }} />
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-5" style={{ color: "#2C2C2C" }}>
                Welcome to the Path,
                <br />
                <em style={{ color: "#4D5E49" }}>{form.firstName || "Mama"}.</em>
              </h3>
              <div className="w-10 h-px mx-auto my-6" style={{ backgroundColor: "#C4956A" }} />
              <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "420px", fontSize: "1rem" }}>
                We've received your information and we're so glad you're here. Expect a warm, personal note in your inbox soon — along with your next steps.
              </p>
              <p className="font-micro mt-7" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
                You are exactly where you're meant to be.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="font-micro block mb-3" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>First Name</label>
                  <input type="text" required placeholder="Your first name" value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label className="font-micro block mb-3" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>Email Address</label>
                  <input type="email" required placeholder="your@email.com" value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="font-micro block mb-3" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>Current Role</label>
                  <select required value={form.role} onChange={(e) => handleChange("role", e.target.value)}
                    style={{ ...selectStyle, color: form.role ? "#2C2C2C" : "#9a8f84" }}>
                    <option value="" disabled>Select your current role</option>
                    {roles.map((r) => <option key={r} value={r} style={{ color: "#2C2C2C" }}>{r}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
                <div className="relative">
                  <label className="font-micro block mb-3" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>Childcare Interest</label>
                  <select required value={form.interest} onChange={(e) => handleChange("interest", e.target.value)}
                    style={{ ...selectStyle, color: form.interest ? "#2C2C2C" : "#9a8f84" }}>
                    <option value="" disabled>What type interests you?</option>
                    {interests.map((i) => <option key={i} value={i} style={{ color: "#2C2C2C" }}>{i}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="font-micro block mb-3" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>Your State</label>
                  <select required value={form.state} onChange={(e) => handleChange("state", e.target.value)}
                    style={{ ...selectStyle, color: form.state ? "#2C2C2C" : "#9a8f84" }}>
                    <option value="" disabled>Select your state</option>
                    {states.map((s) => <option key={s} value={s} style={{ color: "#2C2C2C" }}>{s}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
                <div className="relative">
                  <label className="font-micro block mb-3" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>Biggest Hesitation</label>
                  <select required value={form.hesitation} onChange={(e) => handleChange("hesitation", e.target.value)}
                    style={{ ...selectStyle, color: form.hesitation ? "#2C2C2C" : "#9a8f84" }}>
                    <option value="" disabled>What holds you back most?</option>
                    {hesitations.map((h) => <option key={h} value={h} style={{ color: "#2C2C2C" }}>{h}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  className="font-micro text-white px-12 py-5 rounded-full hover:opacity-90 transition-all min-h-[56px]"
                  style={{ backgroundColor: "#4D5E49", fontSize: "0.82rem", boxShadow: "0 12px 40px rgba(77,94,73,0.25)", letterSpacing: "0.1em" }}
                >
                  Begin My Journey
                </button>
                <p className="font-body text-center" style={{ color: "#9a8f84", fontSize: "0.82rem" }}>
                  No spam, ever. Just a personal welcome and your next step.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}