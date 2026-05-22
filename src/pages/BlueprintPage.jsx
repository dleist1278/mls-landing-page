import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";

const PDF_URL =
  "https://base44.app/api/apps/6a0f3060b259082fa2acf652/files/mp/public/6a0f3060b259082fa2acf652/0a5c8dad5_calm_home_childcare_blueprint_v2.pdf";

const STRIPE_URL = "https://buy.stripe.com/8x28wH8tV1Ltb1MdaedEs02";

const phases = [
  { num: "01", title: "Vision, Lifestyle & Program Alignment", desc: "Define what you actually want to build, how it fits your family, your home, and your life." },
  { num: "02", title: "Licensing, Home Setup & Safety", desc: "Navigate licensing requirements for your state and prepare your home environment." },
  { num: "03", title: "Program Design, Policies & Operations", desc: "Build your daily structure, write your policies, and set up the systems that keep your program running smoothly." },
  { num: "04", title: "Enrollment, Marketing & Family Trust", desc: "Attract the right families, build your reputation, and create the parent communication experience." },
  { num: "05", title: "Launch Readiness & Opening", desc: "Make sure everything is in place — physically, operationally, and emotionally — for your opening week." },
];

const foundations = [
  { title: "Your Environment", desc: "How your physical space sets the tone — from home setup to safety to creating a calm, intentional atmosphere families trust." },
  { title: "Your Daily Rhythm", desc: "Building a predictable structure that supports children, serves families, and works within your own energy and capacity." },
  { title: "The Parent Relationship", desc: "How you communicate, build trust, and create the kind of parent relationship that defines your reputation." },
  { title: "Your Operations", desc: "The policies, contracts, and simple systems that protect your family, your program, and the families in your care." },
  { title: "Long-Term Sustainability", desc: "Designing a program that fits your income goals, your energy, and your life — not just for opening week, but for years." },
];

export default function BlueprintPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", stage: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.firstName) {
      setError("Please fill in your first name and email.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await base44.functions.invoke("hubspotLeadCapture", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        stage: form.stage,
        source: "blueprint_landing",
      });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAF7F2", color: "#2C2C2C", overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #F0EBE1 0%, #FAF7F2 100%)", padding: "60px 24px 40px", textAlign: "center", borderBottom: "1px solid rgba(196,149,106,0.12)" }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4956A", marginBottom: "16px" }}>Free Resource</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 6vw, 3.2rem)", lineHeight: 1.15, color: "#2C2C2C", maxWidth: "600px", margin: "0 auto 20px" }}>
          The <em style={{ color: "#4D5E49" }}>Calm</em> Home Childcare Blueprint
        </h1>
        <p style={{ fontSize: "1rem", color: "#5C5148", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.65 }}>
          A more intentional approach to building an at-home nursery or home daycare around real family life.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "#4D5E49", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 28px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 6px 20px rgba(77,94,73,0.25)" }}>
            Download the Blueprint
          </button>
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer"
            style={{ background: "transparent", color: "#4D5E49", border: "1px solid #4D5E4960", borderRadius: "50px", padding: "14px 24px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            Join the Founding Membership →
          </a>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ background: "#F0EBE1", padding: "48px 24px", textAlign: "center", borderBottom: "1px solid rgba(196,149,106,0.08)" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "#2C2C2C", maxWidth: "520px", margin: "0 auto 12px", lineHeight: 1.5, fontStyle: "italic" }}>
          "I know I want this. I just don't know where to start — or how to make it work around my family."
        </p>
        <p style={{ fontSize: "0.85rem", color: "#7A6E65", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
          Most moms exploring home-based childcare are piecing it together alone. The overwhelm is not a sign that this path is wrong — it's a sign that you need a clearer starting point. That's what this blueprint is for.
        </p>
      </section>

      {/* FOUNDATIONS */}
      <section style={{ padding: "56px 24px", maxWidth: "860px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4956A", textAlign: "center", marginBottom: "10px" }}>What's Inside</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", textAlign: "center", color: "#2C2C2C", marginBottom: "36px", lineHeight: 1.2 }}>
          Five foundations of a calm, sustainable at-home childcare program
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {foundations.map((f, i) => (
            <div key={i} style={{ background: "#FFFDF9", border: "1px solid rgba(196,149,106,0.15)", borderRadius: "16px", padding: "22px", borderLeft: "3px solid #C4956A" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4956A", marginBottom: "6px" }}>Foundation {i + 1}</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", color: "#2C2C2C", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#5C5148", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 PHASES */}
      <section style={{ background: "#F0EBE1", padding: "56px 24px", borderTop: "1px solid rgba(196,149,106,0.08)", borderBottom: "1px solid rgba(196,149,106,0.08)" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4956A", textAlign: "center", marginBottom: "10px" }}>Inside the Mama Launch Studio Membership</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", textAlign: "center", color: "#2C2C2C", marginBottom: "36px", lineHeight: 1.2 }}>
            A clear look at the <em style={{ color: "#4D5E49" }}>five-phase framework</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {phases.map((p) => (
              <div key={p.num} style={{ background: "#FFFDF9", border: "1px solid rgba(77,94,73,0.12)", borderRadius: "14px", padding: "20px 22px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#4D5E4960", fontWeight: 600, flexShrink: 0, lineHeight: 1 }}>{p.num}</span>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#2C2C2C", marginBottom: "4px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.83rem", color: "#5C5148", lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPT-IN FORM */}
      <section ref={formRef} id="get-blueprint" style={{ padding: "60px 24px", maxWidth: "540px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4956A", textAlign: "center", marginBottom: "10px" }}>Get the Blueprint</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", textAlign: "center", color: "#2C2C2C", marginBottom: "6px", lineHeight: 1.2 }}>
          Free. Instant access. No overwhelm.
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8f84", marginBottom: "6px" }}>First Name</label>
              <input type="text" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                placeholder="Your first name"
                style={{ width: "100%", background: "rgba(255,255,255,0.7)", border: "1px solid #E0D1BF", borderRadius: "10px", padding: "12px 14px", fontSize: "1rem", color: "#2C2C2C", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8f84", marginBottom: "6px" }}>Last Name</label>
              <input type="text" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                placeholder="Your last name"
                style={{ width: "100%", background: "rgba(255,255,255,0.7)", border: "1px solid #E0D1BF", borderRadius: "10px", padding: "12px 14px", fontSize: "1rem", color: "#2C2C2C", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8f84", marginBottom: "6px" }}>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
                style={{ width: "100%", background: "rgba(255,255,255,0.7)", border: "1px solid #E0D1BF", borderRadius: "10px", padding: "12px 14px", fontSize: "1rem", color: "#2C2C2C", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9a8f84", marginBottom: "6px" }}>Where are you right now?</label>
              <select value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}
                style={{ width: "100%", background: "rgba(255,255,255,0.7)", border: "1px solid #E0D1BF", borderRadius: "10px", padding: "12px 14px", fontSize: "1rem", color: form.stage ? "#2C2C2C" : "#9a8f84", boxSizing: "border-box", outline: "none" }}>
                <option value="">Select one…</option>
                <option value="exploring">Just starting to explore this idea</option>
                <option value="researching">Actively researching and learning</option>
                <option value="planning">In planning mode, working toward opening</option>
                <option value="ready">Ready to start building now</option>
              </select>
            </div>
            {error && <p style={{ color: "#DC2626", fontSize: "0.85rem", margin: 0 }}>{error}</p>}
            <button type="submit" disabled={submitting}
              style={{ background: "linear-gradient(135deg, #4D5E49, #3a4a37)", color: "#fff", border: "none", borderRadius: "14px", padding: "16px 32px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer", boxShadow: "0 6px 24px rgba(77,94,73,0.28)", opacity: submitting ? 0.7 : 1 }}>
              {submitting ? "Sending…" : "Download the Blueprint"}
            </button>
            <p style={{ fontSize: "0.78rem", color: "#9a8f84", textAlign: "center", margin: 0 }}>
              Your information is safe. No spam, ever. You'll also receive a short 5-email series from Danielle.
            </p>
          </form>
        ) : (
          /* SUCCESS STATE */
          <div style={{ marginTop: "28px", background: "#FFFDF9", border: "1px solid rgba(196,149,106,0.2)", borderRadius: "20px", padding: "36px 28px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🤍</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#2C2C2C", marginBottom: "10px" }}>Your blueprint is on its way.</h3>
            <p style={{ fontSize: "0.88rem", color: "#5C5148", lineHeight: 1.65, marginBottom: "8px" }}>
              Check your inbox — we've sent it to <strong>{form.email}</strong>.
            </p>
            <p style={{ fontSize: "0.83rem", color: "#7A6E65", lineHeight: 1.6, marginBottom: "24px" }}>
              Over the next few days, you'll receive a few notes from Danielle to help you go deeper and decide whether building a calm home daycare or at-home nursery is right for you.
            </p>
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", background: "#4D5E49", color: "#fff", borderRadius: "50px", padding: "14px 28px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", marginBottom: "12px", boxShadow: "0 4px 16px rgba(77,94,73,0.22)" }}>
              Or download it directly here →
            </a>
            <hr style={{ border: "none", borderTop: "1px solid rgba(196,149,106,0.15)", margin: "24px 0" }} />
            <p style={{ fontSize: "0.83rem", color: "#5C5148", marginBottom: "16px", lineHeight: 1.6 }}>
              Already know you want guided support?
            </p>
            <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", background: "linear-gradient(135deg, #4D5E49, #3a4a37)", color: "#fff", borderRadius: "50px", padding: "16px 28px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 6px 24px rgba(77,94,73,0.28)" }}>
              Join the Founding Membership
            </a>
            <p style={{ fontSize: "0.72rem", color: "#9a8f84", marginTop: "8px" }}>$23.50/month founding rate · Public pricing $47/month after July 8</p>
          </div>
        )}
      </section>

      {/* BOTTOM FOUNDING MEMBERSHIP SECTION */}
      <section style={{ background: "#F0EBE1", padding: "60px 24px", borderTop: "1px solid rgba(196,149,106,0.08)", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4956A", marginBottom: "10px" }}>Founding Membership · Opens July 8</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "#2C2C2C", marginBottom: "14px", lineHeight: 1.2 }}>
            Ready for guided support?
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#5C5148", lineHeight: 1.65, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            The Calm Home Childcare Blueprint gives you the starting point. The Mama Launch Studio Founding Membership gives you the full path.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "36px", textAlign: "left" }}>
            {["Access to The Mama Launch Method", "Templates & Operational Tools", "Licensing & Home Setup Support", "Parent Communication Tools", "Enrollment & Marketing Guidance", "Launch Readiness Support", "Ongoing Membership Updates", "Lifetime Founding Pricing"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "#4D5E49", fontSize: "0.8rem", marginTop: "2px" }}>✓</span>
                <span style={{ fontSize: "0.83rem", color: "#5C5148", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FFFDF9", border: "1px solid rgba(196,149,106,0.2)", borderRadius: "20px", padding: "28px", marginBottom: "24px", display: "inline-block" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#2C2C2C", marginBottom: "4px" }}>$23.50<span style={{ fontSize: "1rem", color: "#7A6E65" }}>/mo</span></p>
            <p style={{ fontSize: "0.78rem", color: "#9a8f84" }}>Founding member rate — locked for life</p>
            <p style={{ fontSize: "0.75rem", color: "#C4956A" }}>Future public pricing: $47/month</p>
          </div>
          <br />
          <a href={STRIPE_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "linear-gradient(135deg, #4D5E49, #3a4a37)", color: "#fff", borderRadius: "50px", padding: "18px 40px", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 8px 28px rgba(77,94,73,0.3)" }}>
            Join the Founding Membership
          </a>
          <p style={{ fontSize: "0.72rem", color: "#9a8f84", marginTop: "10px" }}>Opens July 8, 2026 · Founding spots are intentionally limited</p>
        </div>
      </section>
    </div>
  );
}