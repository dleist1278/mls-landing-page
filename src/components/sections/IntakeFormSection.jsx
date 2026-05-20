import React, { useRef, useEffect, useState } from "react";
import { trackWaitlistSubmit, trackPathwaySelect, trackCTAClick } from "@/lib/analytics";

const roles = [
"Stay-at-home mother",
"Working mother seeking transition",
"Currently providing informal childcare",
"Early childhood educator",
"Other"];


const interests = [
"Home Daycare & Nursery (Full-Time)",
"Drop-In Care (Part-Time / Flexible)",
"Small-Group Caregiver Co-op",
"I'm not sure yet — help me decide"];


const hesitations = [
"Understanding the licensing process",
"Financial planning and pricing",
"Finding my first families",
"Balancing with my own children",
"Feeling qualified enough",
"The time commitment required"];


const states = [
"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
"Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
"Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
"Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
"New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
"Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
"Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
"Wisconsin", "Wyoming"];


export default function IntakeFormSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    firstName: "", email: "", role: "", interest: "", state: "", hesitation: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
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
    const FORM_ID = "REPLACE_WITH_YOUR_FORM_ID";

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
            { name: "lead_source", value: "Mama Launch Studio — Founding Member Waitlist" }],

            context: {
              pageUri: window.location.href,
              pageName: "Mama Launch Studio"
            }
          })
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
    border: "1px solid #E0D1BF",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.88rem",
    color: "#2C2C2C",
    width: "100%",
    outline: "none",
    WebkitAppearance: "none",
    appearance: "none"
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none"
  };

  return (
    <section id="intake" style={{ backgroundColor: "#FAF7F2", overflow: "hidden", scrollMarginTop: "60px", paddingBottom: "40px" }}>
      {/* Mobile-only header — softer editorial entry */}
      <div className="md:hidden px-5 pt-14 pb-0">
        <p className="font-micro mb-3 flex items-center justify-center gap-3" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.16em" }}>
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          FOUNDING MEMBER WAITLIST
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>
        <h2
          className="font-display leading-snug mb-3 text-center"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.85rem, 5.5vw, 3.2rem)", lineHeight: "1.2", maxWidth: "16ch", marginLeft: "auto", marginRight: "auto" }}>
          
          Come build this<br />
          <em style={{ color: "#4D5E49" }}>with us.</em>
        </h2>
        <p
          className="font-body leading-relaxed mb-7 text-center mx-auto"
          style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "32ch" }}>
          From idea to opening day — with clarity,<br />structure, and support<br />you don't have to find alone.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-10 py-8 md:py-16">
        <div
          ref={ref}
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)"
          }}>

          {/* Elevated form card */}
          <div className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
            border: "1px solid rgba(196,149,106,0.12)",
            boxShadow: "0 8px 40px rgba(44,44,44,0.04), 0 2px 8px rgba(196,149,106,0.06)"
          }}>

            {/* Decorative top accent bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #C4956A, #4D5E49, #C4956A)" }} />

            {/* Decorative corner flourish */}
            <div className="absolute top-6 right-6 opacity-10 pointer-events-none select-none" style={{ fontSize: "5rem", lineHeight: 1, color: "#C4956A" }}>✦</div>
            <div className="absolute bottom-8 left-5 opacity-[0.06] pointer-events-none select-none" style={{ fontSize: "3.5rem", lineHeight: 1, color: "#4D5E49" }}>✦</div>

            <div className="px-6 md:px-10 py-8 md:py-10">

              {/* Desktop header */}
              <div className="hidden md:block text-center mb-8">
                <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
                  <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                  Founding Member Waitlist
                  <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                </p>
                <h2 className="font-display leading-tight mb-3 break-words" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 5vw, 3.2rem)", overflowWrap: "break-word" }}>
                  Come Build This{" "}
                  <em style={{ color: "#4D5E49" }}>With Us.</em>
                </h2>
                <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "440px", fontSize: "0.95rem" }}>
                  Tell us a little about yourself and your vision. This is the beginning of your launch path.
                </p>
              </div>

              {/* Mobile micro-line */}
              {!submitted &&
              <p className="md:hidden font-body mb-6 mt-2 text-center hidden" style={{ color: "#9a8f84", fontSize: "0.76rem", fontStyle: "italic", lineHeight: "1.6" }}>
                  You do not need to have everything figured out before starting.
                </p>
              }

              {/* Form / Success */}
              {submitted ?
              <div className="text-center py-12" style={{ animation: "atmosphericEntrance 0.9s ease-out forwards" }}>
                  <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4D5E4920, #4D5E4908)", border: "1px solid #4D5E4930" }}>
                    <span style={{ color: "#4D5E49", fontSize: "1.6rem" }}>✓</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl mb-4" style={{ color: "#2C2C2C" }}>
                    You're on the waitlist,{" "}
                    <em style={{ color: "#4D5E49" }}>{form.firstName || "Mama"}.</em>
                  </h3>
                  <div className="w-10 h-px mx-auto my-5" style={{ backgroundColor: "#C4956A" }} />
                  <p className="font-body mx-auto leading-relaxed" style={{ color: "#5C5148", maxWidth: "400px", fontSize: "1rem" }}>
                    We'll send next steps to your inbox soon.
                  </p>
                  <p className="font-micro mt-6" style={{ color: "#C4956A", fontSize: "0.72rem" }}>
                    You are exactly where you're meant to be.
                  </p>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Section divider label */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px" style={{ backgroundColor: "#E4D5C022" }} />
                    <span className="font-micro text-[0.6rem] tracking-widest hidden" style={{ color: "#C4956A80" }}>TELL US ABOUT YOU</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#E4D5C022" }} />
                  </div>

                  {/* Row 1 — Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="group">
                      <label className="font-micro block mb-1.5" style={{ color: "#9a8f84", fontSize: "0.65rem" }}>First Name</label>
                      <div className="relative">
                        <input type="text" required placeholder="Your first name" value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      style={{ ...inputStyle, padding: "10px 14px", borderRadius: "10px", border: "1px solid #E0D1BF", backgroundColor: "rgba(255,255,255,0.7)" }} />
                      </div>
                    </div>
                    <div className="group">
                      <label className="font-micro block mb-1.5" style={{ color: "#9a8f84", fontSize: "0.65rem" }}>Email Address</label>
                      <input type="email" required placeholder="your@email.com" value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={{ ...inputStyle, padding: "10px 14px", borderRadius: "10px", border: "1px solid #E0D1BF", backgroundColor: "rgba(255,255,255,0.7)" }} />
                    </div>
                  </div>

                  {/* Row 2 — State only */}
                  <div className="relative">
                    <label className="font-micro block mb-1.5" style={{ color: "#9a8f84", fontSize: "0.65rem" }}>Your State</label>
                    <select required value={form.state} onChange={(e) => handleChange("state", e.target.value)}
                  style={{ ...selectStyle, padding: "10px 14px", borderRadius: "10px", border: "1px solid #E0D1BF", backgroundColor: "rgba(255,255,255,0.7)", color: form.state ? "#2C2C2C" : "#9a8f84" }}>
                      <option value="" disabled>Select your state</option>
                      {states.map((s) => <option key={s} value={s} style={{ color: "#2C2C2C" }}>{s}</option>)}
                    </select>
                    <span className="absolute right-3 bottom-3.5 pointer-events-none" style={{ color: "#C4956A88", fontSize: "0.6rem" }}>↓</span>
                  </div>

                  {/* Error */}
                  {submitError &&
                <div className="p-4 rounded-2xl" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
                      <p className="font-body text-sm" style={{ color: "#DC2626" }}>{submitError}</p>
                    </div>
                }

                  {/* Submit */}
                  <div className="pt-2">
                    <button type="submit" disabled={submitting}
                  onClick={() => trackCTAClick("Join Founding Member Waitlist", "intake_form")}
                  className="font-micro text-white w-full px-8 py-4 rounded-2xl transition-all min-h-[52px] disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #4D5E49, #3a4a37)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    boxShadow: "0 6px 24px rgba(77,94,73,0.28), 0 1px 3px rgba(77,94,73,0.12)"
                  }}>
                      {submitting ? "Submitting…" : "Join the Founding Member Waitlist"}
                    </button>
                    <p className="text-center font-body mt-3" style={{ color: "#B0A090", fontSize: "0.7rem" }}>
                      No spam, ever. Just your next step forward.
                    </p>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </section>);

}