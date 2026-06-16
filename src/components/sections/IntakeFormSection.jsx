import React, { useRef, useEffect, useState } from "react";

const US_STATES = [
  { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
];

const PROGRAM_PATHS = [
  { value: "home_daycare_nursery", label: "Home Daycare / Nursery" },
  { value: "kids_programs", label: "Kids Programs" },
  { value: "homeschool_pods", label: "Homeschool Pods" },
  { value: "caregiver_babysitter", label: "Caregiver / Babysitter" },
  { value: "not_sure", label: "Not Sure Yet" },
];

const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.7)",
  border: "1px solid #E0D1BF",
  borderRadius: "10px",
  padding: "10px 14px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  color: "#2C2C2C",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
};

const labelStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#9a8f84",
  display: "block",
  marginBottom: "6px",
};

export default function IntakeFormSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", state: "", programPath: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://superagent-40f97e01.base44.app/functions/hubspotLeadCapture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          state: form.state,
          programPath: form.programPath,
          source: "waitlist",
          contactType: "Waitlist Lead",
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      window.location.href = "/thank-you";
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="intake"
      style={{
        backgroundColor: "#FAF7F2",
        overflow: "hidden",
        scrollMarginTop: "96px",
        borderTop: "1px solid rgba(196,149,106,0.08)",
      }}
    >
      {/* Mobile-only header */}
      <div className="md:hidden px-5 pt-10 pb-0">
        <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.16em" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          FOUNDING MEMBER WAITLIST
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>
        <h2 className="font-display leading-snug mb-3 text-center" style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 5.5vw, 3.2rem)", lineHeight: "1.2", maxWidth: "16ch", marginLeft: "auto", marginRight: "auto" }}>
          The app is coming.<br />
          <em style={{ color: "#4D5E49" }}>Be the first to know.</em>
        </h2>
        <p className="font-body leading-relaxed mb-3 text-center mx-auto" style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "32ch" }}>
          Leave your details and we'll reach out<br />when Mama Launch is ready for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 md:px-10 py-6 md:py-16">
        <div
          ref={ref}
          style={{ transition: "opacity 0.6s ease, transform 0.6s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          <div className="relative overflow-hidden rounded-3xl" style={{ background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)", border: "1px solid rgba(196,149,106,0.12)", boxShadow: "0 8px 40px rgba(44,44,44,0.04), 0 2px 8px rgba(196,149,106,0.06)" }}>
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #C4956A, #4D5E49, #C4956A)" }} />
            <div className="absolute bottom-8 left-5 opacity-[0.06] pointer-events-none select-none" style={{ fontSize: "3.5rem", lineHeight: 1, color: "#4D5E49" }}>✦</div>

            <div className="px-6 md:px-10 py-8 md:py-10">
              {/* Desktop header */}
              <div className="hidden md:block text-center mb-8">
                <style>{`@keyframes intakeFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem", opacity: visible ? 1 : 0, animation: visible ? "intakeFadeUp 0.55s ease forwards" : "none" }}>
                  <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                  APP LAUNCH UPDATES
                  <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                </p>
                <h2 className="font-display leading-tight mb-3 break-words" style={{ color: "#2C2C2C", fontSize: "clamp(2rem, 3.8vw, 3rem)", opacity: visible ? 1 : 0, animation: visible ? "intakeFadeUp 0.65s ease 0.1s forwards" : "none" }}>
                  The app is coming.{" "}
                  <em style={{ color: "#4D5E49" }}>Be the first to know.</em>
                </h2>
                <p className="font-body mx-auto" style={{ color: "#5C5148", maxWidth: "680px", fontSize: "1.2rem", lineHeight: "1.62", opacity: visible ? 1 : 0, animation: visible ? "intakeFadeUp 0.6s ease 0.2s forwards" : "none" }}>
                  Leave your details and we'll reach out when Mama Launch is ready for you.
                </p>
              </div>

              {/* Native Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Your State</label>
                  <select
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    style={{ ...inputStyle, color: form.state ? "#2C2C2C" : "#9a8f84", appearance: "none", cursor: "pointer" }}
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Which program path interests you most?</label>
                  <select
                    value={form.programPath}
                    onChange={(e) => setForm({ ...form, programPath: e.target.value })}
                    style={{ ...inputStyle, color: form.programPath ? "#2C2C2C" : "#9a8f84", appearance: "none", cursor: "pointer" }}
                  >
                    <option value="">Select a path (optional)</option>
                    {PROGRAM_PATHS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {error && <p style={{ color: "#DC2626", fontSize: "0.8rem", textAlign: "center" }}>{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? "#7a9176" : "linear-gradient(135deg, #4D5E49, #3a4a37)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "14px",
                    padding: "14px 32px",
                    width: "100%",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 6px 24px rgba(77,94,73,0.28)",
                  }}
                >
                  {loading ? "Submitting..." : "Join the Waitlist"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}