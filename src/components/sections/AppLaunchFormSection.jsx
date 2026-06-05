import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { US_STATES } from "@/lib/quizConfig";

export default function AppLaunchFormSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [state, setState]         = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email."); return; }
    setSubmitting(true);
    setError("");

    try {
      const stateObj = US_STATES.find(s => s.value === state);
      const res = await base44.functions.invoke("hubspotLeadCapture", {
        email:        email.trim().toLowerCase(),
        firstName:    firstName.trim(),
        lastName:     lastName.trim(),
        source:       "app-launch",
        contactType:  "App Launch Lead",
        launchInterest: true,
        state:        state || undefined,
        stateLabel:   stateObj?.label || undefined,
      });
      setSubmitting(false);
      if (res.data?.success) {
        setSuccess(true);
      } else {
        setError("Something went wrong saving your info. Please try again.");
      }
    } catch (err) {
      console.error("App launch lead capture failed:", err);
      setSubmitting(false);
      setError("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <section
      id="intake"
      ref={ref}
      style={{
        backgroundColor: "#FAF7F2",
        borderTop: "1px solid rgba(196,149,106,0.08)",
        scrollMarginTop: "96px",
      }}
    >
      <div
        className="max-w-xl mx-auto px-5 sm:px-8 py-10 md:py-16"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
            border: "1px solid rgba(196,149,106,0.18)",
            boxShadow: "0 12px 48px rgba(44,44,44,0.06)",
          }}
        >
          <div style={{ height: "4px", background: "linear-gradient(90deg, #C4956A, #4D5E49, #C4956A)" }} />

          <div className="px-6 md:px-12 py-10 md:py-12">

            {!success ? (
              <>
                <div className="text-center mb-8">
                  <p className="font-micro mb-3 inline-flex items-center gap-3" style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
                    <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                    COMING SOON
                    <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                  </p>
                  <h2 className="font-display leading-tight mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: "1.2" }}>
                    Get App Updates
                  </h2>
                  <p className="font-body mx-auto" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.65", maxWidth: "38ch" }}>
                    You'll be the first to know when the app and free Childcare Fit Quiz are ready.
                  </p>
                </div>

                {error && <p className="font-body text-sm text-center mb-4" style={{ color: "#DC2626" }}>{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                      style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.7)", color: "#2C2C2C" }}
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                      style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.7)", color: "#2C2C2C" }}
                    />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email address *"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                    style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.7)", color: "#2C2C2C" }}
                  />
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                    style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.7)", color: state ? "#2C2C2C" : "#9a8f84" }}
                  >
                    <option value="">State (optional)</option>
                    {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-micro text-white rounded-full py-4 w-full flex items-center justify-center gap-2 mt-1"
                    style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.1em", boxShadow: "0 6px 24px rgba(77,94,73,0.28)" }}
                  >
                    {submitting
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <><span>Get App Updates</span><ArrowRight className="w-4 h-4" /></>
                    }
                  </button>
                </form>

                <p className="font-body text-xs text-center mt-4" style={{ color: "#9a8f84" }}>
                  Or{" "}
                  <button onClick={() => navigate("/quiz")} className="underline" style={{ color: "#C4956A", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    take the free quiz now
                  </button>.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#4D5E4918" }}>
                  <span style={{ fontSize: "1.6rem" }}>✓</span>
                </div>
                <h2 className="font-display mb-3" style={{ color: "#2C2C2C", fontSize: "1.8rem" }}>You're on the list!</h2>
                <p className="font-body mx-auto" style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.7", maxWidth: "40ch" }}>
                  We'll send you early access details and app launch updates as Mama Launch Studio gets closer to opening.
                </p>
                <button
                  onClick={() => navigate("/quiz")}
                  className="font-micro text-white px-7 py-3.5 rounded-full mt-6 inline-block"
                  style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", letterSpacing: "0.1em", boxShadow: "0 6px 24px rgba(77,94,73,0.24)" }}
                >
                  Take the Free Childcare Fit Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}