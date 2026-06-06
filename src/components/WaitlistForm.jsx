import { useState } from "react";
import { base44 } from "@/api/base44Client";

const US_STATES = [
  { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" }, { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" }, { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" }, { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" }, { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" }, { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" }, { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" }, { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" }, { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" }
];

export default function WaitlistForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.email) {
      setError("Please provide your first name and email.");
      return;
    }
    setLoading(true);
    try {
      const result = await base44.functions.invoke("hubspotLeadCapture", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        state: form.state,
        contactType: "App Launch Lead",
        source: "Landing Page Intake",
      });
      if (result?.data?.success) {
        setSuccess(true);
      } else {
        setError(result?.data?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="intake" style={{ backgroundColor: "#FAF7F2", padding: "80px 20px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            backgroundColor: "#4D5E49", display: "flex",
            alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 style={{ fontFamily: "var(--font-display, Georgia, serif)", fontSize: "1.75rem", color: "#2C2C2C", marginBottom: "12px", letterSpacing: "-0.01em" }}>
            You're on the list, {form.firstName}.
          </h3>
          <p style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.7" }}>
            We'll reach out when Mama Launch is ready. Watch your inbox.
          </p>
        </div>
      </section>
    );
  }

  const labelStyle = {
    display: "block", fontSize: "0.65rem",
    fontFamily: "var(--font-micro, sans-serif)",
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: "#7A6E65", marginBottom: "8px", fontWeight: 600,
  };

  const inputStyle = {
    width: "100%", backgroundColor: "#F5F0EA",
    border: "1px solid rgba(196,149,106,0.2)", borderRadius: "12px",
    padding: "14px 18px", fontSize: "0.88rem", color: "#2C2C2C",
    outline: "none", boxSizing: "border-box",
    fontFamily: "var(--font-body, sans-serif)", transition: "border-color 0.2s",
  };

  return (
    <section
      id="intake"
      style={{ backgroundColor: "#FAF7F2", padding: "80px 20px", borderTop: "1px solid rgba(196,149,106,0.2)" }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-micro, sans-serif)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4956A", marginBottom: "14px", fontWeight: 600 }}>
            App Coming Soon
          </p>
          <h2 style={{ fontFamily: "var(--font-display, Georgia, serif)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", color: "#2C2C2C", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "14px" }}>
            Get app launch updates.
          </h2>
          <p style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.7", maxWidth: "38ch", margin: "0 auto" }}>
            Be the first to know when Mama Launch is ready for you.
          </p>
        </div>

        <div style={{ backgroundColor: "#EDE5DB", borderRadius: "24px", padding: "36px 32px", boxShadow: "0 8px 40px rgba(196,149,106,0.12)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" placeholder="First name" value={form.firstName} onChange={set("firstName")} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" placeholder="Last name" value={form.lastName} onChange={set("lastName")} style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>Your State (optional)</label>
              <div style={{ position: "relative" }}>
                <select value={form.state} onChange={set("state")} style={{ ...inputStyle, appearance: "none", cursor: "pointer", paddingRight: "40px" }}>
                  <option value="">Select your state</option>
                  {US_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#C4956A", fontSize: "0.75rem" }}>▼</span>
              </div>
            </div>

            {error && (
              <p style={{ color: "#b94a4a", fontSize: "0.78rem", textAlign: "center" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", backgroundColor: loading ? "#7a9176" : "#4D5E49",
                color: "white", border: "none", borderRadius: "14px", padding: "18px",
                fontSize: "0.72rem", fontFamily: "var(--font-micro, sans-serif)",
                letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer", transition: "background-color 0.2s", marginTop: "4px",
              }}
            >
              {loading ? "Submitting..." : "Get App Launch Updates"}
            </button>

            <p style={{ textAlign: "center", color: "#9a8f84", fontSize: "0.72rem", marginTop: "-4px" }}>
              No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}