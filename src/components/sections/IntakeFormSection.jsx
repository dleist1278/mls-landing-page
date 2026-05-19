import React, { useRef, useEffect, useState } from "react";
import { trackWaitlistSubmit, trackPathwaySelect, trackCTAClick } from "@/lib/analytics";

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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    firstName: "", email: "", role: "", interest: "", state: "", hesitation: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    // ──────────────────────────────────────────────────────────────
    // HUBSPOT CONFIGURATION
    // Replace these two values with your HubSpot Portal ID and Form ID.
    // Portal ID: HubSpot dashboard → account menu → Account & Billing → Hub ID
    // Form ID:   HubSpot → Marketing → Forms → open your form → GUID in the URL
    // ──────────────────────────────────────────────────────────────
    const PORTAL_ID = "REPLACE_WITH_YOUR_PORTAL_ID";
    const FORM_ID   = "REPLACE_WITH_YOUR_FORM_ID";

    if (PORTAL_ID.startsWith("REPLACE") || FORM_ID.startsWith("REPLACE")) {
      setSubmitError("Form not yet configured. Please contact the site owner.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: form.firstName },
              { name: "email", value: form.email },
              { name: "jobtitle", value: form.role },
              { name: "childcare_interest", value: form.interest },
              { name: "state", value: form.state },
              { name: "biggest_hesitation", value: form.hesitation },
              { name: "lead_source", value: "Mama Launch Studio — Founding Member Waitlist" },
            ],
            context: {
              pageUri: window.location.href,
              pageName: "Mama Launch Studio",
            },
          }),
        }
      );

      // HubSpot 200/201 = success; 400 often means existing contact — treat as success
      if (res.status === 400) {
        setSubmitted(true);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Submission failed. Please try again.");
      }
      trackWaitlistSubmit({ interest: form.interest, state: form.state });
      // Redirect to dedicated thank-you page, passing first name
      window.location.href = `/thank-you?name=${encodeURIComponent(form.firstName)}`;
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #C4956A",
    borderRadius: 0,
    padding: "11px 0",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    color: "#2C2C2C",
    width: "100%",
    outline: "none",
    WebkitAppearance: "none",
    appearance: "none",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
  };

  return (
    <section id="intake" style={{ backgroundColor: "#F0EBE1", overflow: "hidden", scrollMarginTop: "60px" }}>
      <div className="md:hidden px-6 pt-12 pb-0 text-center">
        <p
          className="font-display"
          style={{ color: "#5C5148", fontSize: "1.05rem", lineHeight: "1.6", fontStyle: "italic" }}
        >
          You do not need to figure this out alone anymore.
        </p>
        <div className="w-6 h-px mx-auto mt-5" style={{ backgroundColor: "#C4956A", opacity: 0.5 }} />
      </div>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-20">
        <div
          ref={ref}
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-7">
            <p className="font-micro mb-4 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
              Founding Member Waitlist
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
            </p>
            <h2
              className="font-display leading-tight mb-4 break-words"
              style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 5vw, 3.4rem)", overflowWrap: "break-word" }}
            >
              Come Build This{" "}
              <em style={{ color: "#4D5E49" }}>With Us.</em>
            </h2>
            <p
              className="font-body mx-auto leading-relaxed"
              style={{ color: "#5C5148", maxWidth: "460px", fontSize: "0.97rem" }}
            >
              Tell us a little about yourself and your vision. This is the beginning of your launch path — and we're honored to walk it with you.
            </p>
          </div>

          {/* Form / Success state */}
          {submitted ? (
            <div
              className="text-center py-16"
              style={{ animation: "atmosphericEntrance 0.9s ease-out forwards" }}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-7 flex items-center justify-center"
                style={{ backgroundColor: "#4D5E4915", border: "1px solid #4D5E4930" }}
              >
                <span style={{ color: "#4D5E49", fontSize: "1.4rem" }}>✓</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-5" style={{ color: "#2C2C2C" }}>
                You're on the waitlist,{" "}
                <em style={{ color: "#4D5E49" }}>{form.firstName || "Mama"}.</em>
              </h3>
              <div className="w-10 h-px mx-auto my-6" style={{ backgroundColor: "#C4956A" }} />
              <p
                className="font-body mx-auto leading-relaxed"
                style={{ color: "#5C5148", maxWidth: "420px", fontSize: "1rem" }}
              >
                We'll send next steps to your inbox soon.
              </p>
              <p className="font-micro mt-7" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
                You are exactly where you're meant to be.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-9">
              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <div>
                  <label className="font-micro block mb-2" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your first name"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="font-micro block mb-2" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2 — Role + Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <div className="relative">
                  <label className="font-micro block mb-2" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    Current Role
                  </label>
                  <select
                    required
                    value={form.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    style={{ ...selectStyle, color: form.role ? "#2C2C2C" : "#9a8f84" }}
                  >
                    <option value="" disabled>Select your current role</option>
                    {roles.map((r) => <option key={r} value={r} style={{ color: "#2C2C2C" }}>{r}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
                <div className="relative">
                  <label className="font-micro block mb-2" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    Childcare Interest
                  </label>
                  <select
                    required
                    value={form.interest}
                    onChange={(e) => { handleChange("interest", e.target.value); trackPathwaySelect(e.target.value); }}
                    style={{ ...selectStyle, color: form.interest ? "#2C2C2C" : "#9a8f84" }}
                  >
                    <option value="" disabled>What type interests you?</option>
                    {interests.map((i) => <option key={i} value={i} style={{ color: "#2C2C2C" }}>{i}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
              </div>

              {/* Row 3 — State + Hesitation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <div className="relative">
                  <label className="font-micro block mb-2" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    Your State
                  </label>
                  <select
                    required
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    style={{ ...selectStyle, color: form.state ? "#2C2C2C" : "#9a8f84" }}
                  >
                    <option value="" disabled>Select your state</option>
                    {states.map((s) => <option key={s} value={s} style={{ color: "#2C2C2C" }}>{s}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
                <div className="relative">
                  <label className="font-micro block mb-2" style={{ color: "#9a8f84", fontSize: "0.7rem" }}>
                    Biggest Hesitation
                  </label>
                  <select
                    required
                    value={form.hesitation}
                    onChange={(e) => handleChange("hesitation", e.target.value)}
                    style={{ ...selectStyle, color: form.hesitation ? "#2C2C2C" : "#9a8f84" }}
                  >
                    <option value="" disabled>What holds you back most?</option>
                    {hesitations.map((h) => <option key={h} value={h} style={{ color: "#2C2C2C" }}>{h}</option>)}
                  </select>
                  <span className="absolute right-0 bottom-4 pointer-events-none" style={{ color: "#C4956A", fontSize: "0.75rem" }}>↓</span>
                </div>
              </div>

              {/* Error state */}
              {submitError && (
                <div
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
                >
                  <p className="font-body text-sm" style={{ color: "#DC2626" }}>{submitError}</p>
                </div>
              )}

              {/* Submit */}
              <div className="pt-1 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={() => trackCTAClick("Join Founding Member Waitlist", "intake_form")}
                  className="font-micro text-white w-full px-8 py-4 rounded-full hover:opacity-90 transition-all min-h-[52px] disabled:opacity-60"
                  style={{
                    backgroundColor: "#4D5E49",
                    fontSize: "0.78rem",
                    boxShadow: "0 12px 40px rgba(77,94,73,0.25)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {submitting ? "Submitting…" : "Join the Founding Member Waitlist"}
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