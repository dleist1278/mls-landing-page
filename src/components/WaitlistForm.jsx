import { useState } from "react";
import { base44 } from "@/api/base44Client";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const PATHWAYS = [
  "Home Daycare & Nursery",
  "Caregiver & Nanny",
  "Kids Classes & Open Play",
  "Homeschool Pod",
];

export default function WaitlistForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    pathway: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.state || !form.pathway) {
      setError("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await base44.functions.invoke("hubspotLeadCapture", form);
      if (result?.success) {
        setSuccess(true);
      } else {
        setError(result?.error || "Something went wrong. Please try again.");
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
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 style={{
            fontFamily: "var(--font-display, Georgia, serif)",
            fontSize: "1.75rem", color: "#2C2C2C",
            marginBottom: "12px", letterSpacing: "-0.01em",
          }}>
            You're in, {form.firstName}.
          </h3>
          <p style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.7" }}>
            Welcome to Mama Launch Studio. Watch your inbox — your next step is on its way.
          </p>
        </div>
      </section>
    );
  }

  const labelStyle = {
    display: "block",
    fontSize: "0.65rem",
    fontFamily: "var(--font-micro, sans-serif)",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#7A6E65",
    marginBottom: "8px",
    fontWeight: 600,
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "#F5F0EA",
    border: "1px solid rgba(196,149,106,0.2)",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "0.88rem",
    color: "#2C2C2C",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "var(--font-body, sans-serif)",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="intake"
      style={{ backgroundColor: "#FAF7F2", padding: "80px 20px", borderTop: "1px solid rgba(196,149,106,0.2)" }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{
            fontSize: "0.65rem",
            fontFamily: "var(--font-micro, sans-serif)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C4956A",
            marginBottom: "14px",
            fontWeight: 600,
          }}>
            Founding Member Access
          </p>
          <h2 style={{
            fontFamily: "var(--font-display, Georgia, serif)",
            fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
            color: "#2C2C2C",
            letterSpacing: "-0.02em",
            lineHeight: "1.15",
            marginBottom: "14px",
          }}>
            Reserve your spot.
          </h2>
          <p style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.7", maxWidth: "38ch", margin: "0 auto" }}>
            Join the waitlist and be first to access the full Launch Path Membership when doors open.
          </p>
        </div>

        <div style={{
          backgroundColor: "#EDE5DB",
          borderRadius: "24px",
          padding: "36px 32px",
          boxShadow: "0 8px 40px rgba(196,149,106,0.12)",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" placeholder="First name" value={form.firstName} onChange={set("firstName")} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" placeholder="Last name" value={form.lastName} onChange={set("lastName")} style={inputStyle} required />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>Your State</label>
              <div style={{ position: "relative" }}>
                <select value={form.state} onChange={set("state")} style={{ ...inputStyle, appearance: "none", cursor: "pointer", paddingRight: "40px" }} required>
                  <option value="">Select your state</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#C4956A", fontSize: "0.75rem" }}>▼</span>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Which path interests you most?</label>
              <div style={{ position: "relative" }}>
                <select value={form.pathway} onChange={set("pathway")} style={{ ...inputStyle, appearance: "none", cursor: "pointer", paddingRight: "40px" }} required>
                  <option value="">Select your path</option>
                  {PATHWAYS.map((p) => <option key={p} value={p}>{p}</option>)}
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
                width: "100%",
                backgroundColor: loading ? "#7a9176" : "#4D5E49",
                color: "white",
                border: "none",
                borderRadius: "14px",
                padding: "18px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-micro, sans-serif)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
                marginTop: "4px",
              }}
            >
              {loading ? "Submitting..." : "Join the Founding Member Waitlist"}
            </button>

            <p style={{ textAlign: "center", color: "#9a8f84", fontSize: "0.72rem", marginTop: "-4px" }}>
              No spam, ever. Just your next step forward.
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}