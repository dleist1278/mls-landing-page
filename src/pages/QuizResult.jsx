import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { quizConfig } from "@/lib/quizConfig";
import { calculateChildcareFit } from "@/lib/quizResultEngine";
import { base44 } from "@/api/base44Client";

export default function QuizResult() {
  const [bestModelKey, setBestModelKey] = useState("home_daycare_nursery");
  const [rawAnswers, setRawAnswers] = useState({});
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("mama_launch_quiz_answers");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setRawAnswers(parsed);
        const { bestModel } = calculateChildcareFit(parsed);
        setBestModelKey(bestModel);
      } catch (e) {
        console.error("Quiz score error:", e);
      }
    }
  }, []);

  const model = quizConfig.models[bestModelKey];

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://superagent-40f97e01.base44.app/functions/sendQuizResultEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          primaryPathway: bestModelKey,
          secondaryPathways: model.alternatives.join(","),
          whySurfaced: model.surfaceReason,
          incomeRange: model.incomeRange,
          lightestStart: model.lightestStartingVersion,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
      } else {
        setError(data.error || "Could not send your results. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!model) return null;

  return (
    <div className="min-h-screen py-12 px-5" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Nav */}
      <div className="max-w-2xl mx-auto mb-10 flex items-center justify-between">
        <Link to="/" className="font-display text-charcoal" style={{ fontSize: "1.05rem", textDecoration: "none" }}>
          Mama Launch Studio
        </Link>
        <Link to="/quiz" className="font-micro" style={{ color: "#9a8f84", fontSize: "0.62rem", letterSpacing: "0.1em", textDecoration: "none" }}>
          Retake Quiz
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p className="font-micro text-center mb-2" style={{ color: "#C4956A", fontSize: "0.65rem", letterSpacing: "0.18em" }}>
          CHILDCARE FIT RESULT
        </p>
        <h1 className="font-display text-center leading-tight mb-2" style={{ color: "#2C2C2C", fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
          Your matched pathway
        </h1>
        <h2 className="font-display text-center leading-tight mb-8" style={{ color: "#4D5E49", fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", fontStyle: "italic" }}>
          {model.title}
        </h2>

        {/* Result card */}
        <div
          className="rounded-3xl mb-8 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)", border: "1px solid rgba(196,149,106,0.14)" }}
        >
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4D5E49, #C4956A)" }} />
          <div className="p-7 md:p-8 space-y-5">
            {/* Description */}
            <div>
              <p className="font-body leading-relaxed" style={{ color: "#3a3228", fontSize: "1rem", lineHeight: "1.72" }}>
                {model.description}
              </p>
            </div>

            <div className="w-full h-px" style={{ backgroundColor: "rgba(196,149,106,0.18)" }} />

            {/* Why this surfaced */}
            <div>
              <p className="font-micro mb-1.5" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>WHY THIS SURFACED</p>
              <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>
                {model.surfaceReason}
              </p>
            </div>

            {/* Gross income range */}
            <div>
              <p className="font-micro mb-1.5" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>TYPICAL GROSS INCOME RANGE</p>
              <p className="font-display" style={{ color: "#2C2C2C", fontSize: "1.1rem" }}>
                {model.incomeRange}
              </p>
              <p className="font-body mt-1" style={{ color: "#9a8f84", fontSize: "0.74rem", fontStyle: "italic" }}>
                Gross revenue before expenses. Actual results vary.
              </p>
            </div>

            {/* Lightest starting version */}
            <div>
              <p className="font-micro mb-1.5" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>LIGHTEST STARTING VERSION</p>
              <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>
                {model.lightestStartingVersion}
              </p>
            </div>

            {/* Other pathways */}
            <div>
              <p className="font-micro mb-2" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>OTHER PATHWAYS TO CONSIDER</p>
              <div className="flex flex-wrap gap-2">
                {model.alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="font-body"
                    style={{
                      backgroundColor: "#FDFAF6",
                      border: "1px solid rgba(196,149,106,0.22)",
                      borderRadius: "999px",
                      padding: "4px 12px",
                      fontSize: "0.78rem",
                      color: "#6B6156"
                    }}
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capture form */}
        <div className="p-7 md:p-8 bg-white rounded-3xl border" style={{ borderColor: "#E8D5C0", boxShadow: "0 4px 24px rgba(44,44,44,0.04)" }}>
          {!saved ? (
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div className="text-center">
                <h3 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.25rem" }}>
                  Email my Childcare Fit Result
                </h3>
                <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.82rem", lineHeight: "1.6" }}>
                  Save your Childcare Fit Result and get app launch updates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="font-body outline-none rounded-xl border p-4 text-sm"
                  style={{ backgroundColor: "#F5F0EA", borderColor: "rgba(196,149,106,0.2)", color: "#2C2C2C" }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="font-body outline-none rounded-xl border p-4 text-sm"
                  style={{ backgroundColor: "#F5F0EA", borderColor: "rgba(196,149,106,0.2)", color: "#2C2C2C" }}
                />
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="font-body outline-none rounded-xl border p-4 text-sm w-full"
                style={{ backgroundColor: "#F5F0EA", borderColor: "rgba(196,149,106,0.2)", color: "#2C2C2C" }}
              />

              {error && (
                <p className="font-body text-center text-xs" style={{ color: "#b94a4a" }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="font-micro text-white py-4 rounded-xl transition-colors"
                style={{
                  backgroundColor: loading ? "#7a9176" : "#4D5E49",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  cursor: loading ? "not-allowed" : "pointer",
                  border: "none"
                }}
              >
                {loading ? "Sending..." : "Email My Result →"}
              </button>

              <p className="font-body text-center" style={{ color: "#9a8f84", fontSize: "0.72rem" }}>
                No spam, ever.
              </p>
            </form>
          ) : (
            <div className="text-center py-4">
              <div
                className="flex items-center justify-center mx-auto mb-4 rounded-full"
                style={{ width: "48px", height: "48px", backgroundColor: "#4D5E49" }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.25rem" }}>On its way!</h3>
              <p className="font-body mb-6" style={{ color: "#5C5148", fontSize: "0.85rem", lineHeight: "1.65" }}>
                Your result is on its way to <strong>{form.email}</strong>. Check your inbox — and keep an eye out for app launch updates from Mama Launch Studio.
              </p>
              <Link
                to="/"
                className="font-micro inline-block text-white py-3.5 px-8 rounded-full"
                style={{ backgroundColor: "#C4956A", fontSize: "0.7rem", letterSpacing: "0.08em", textDecoration: "none" }}
              >
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}