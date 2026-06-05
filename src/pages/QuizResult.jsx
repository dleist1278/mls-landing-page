import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PATHWAY_LABELS, PATHWAY_DESCRIPTIONS, HOME_BASED_PATHWAYS, US_STATES } from "@/lib/quizConfig";

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = {}, result = {} } = location.state || {};

  const [firstName, setFirstName] = useState("");
  const [email, setEmail]         = useState("");
  const [state, setState]         = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");

  const primaryLabel  = PATHWAY_LABELS[result.primary] || "Your Best-Fit Pathway";
  const description   = PATHWAY_DESCRIPTIONS[result.primary] || "";
  const isHomeBased   = HOME_BASED_PATHWAYS.includes(result.primary);

  if (!result.primary) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
        <SiteNav />
        <main className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-4">
          <p className="font-body" style={{ color: "#5C5148" }}>No quiz result found. Please take the quiz first.</p>
          <button
            onClick={() => navigate("/quiz")}
            className="font-micro text-white px-6 py-3 rounded-full"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem" }}
          >
            Take the Quiz
          </button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email."); return; }
    setSubmitting(true);
    setError("");

    try {
      const res = await base44.functions.invoke("hubspotLeadCapture", {
        email,
        firstName,
        source: "quiz",
        contactType: "Quiz Lead",
        quizTaken: true,
        quizCompletedDate: new Date().toISOString(),
        primaryPathway: result.primary,
        secondaryPathways: result.secondary,
        pathway: result.primary,
        state,
        incomeGoal:         answers.q_income_goal,
        incomeStyle:        answers.q_income_style,
        launchTimeline:     answers.q_launch_timeline,
        biggestBlocker:     answers.q_biggest_blocker,
        supportNeeded:      Array.isArray(answers.q_support_needed) ? answers.q_support_needed.join(", ") : answers.q_support_needed,
        readinessLevel:     answers.q_readiness_level,
        providerIdentity:   answers.q_provider_identity,
        parentPresence:     answers.q_parent_presence,
        careLocation:       answers.q_care_location,
      });

      setSubmitting(false);

      if (res.data?.success) {
        navigate("/quiz/join", { state: { primaryLabel, firstName } });
      } else {
        setError(res.data?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Quiz lead capture failed:", err);
      setSubmitting(false);
      setError(err.message || "A network error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <SiteNav />
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-10 md:py-20">

        {/* Result card */}
        <div
          className="rounded-3xl mb-6 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
            border: "1px solid rgba(196,149,106,0.18)",
            boxShadow: "0 8px 40px rgba(44,44,44,0.06)",
          }}
        >
          <div style={{ height: "4px", background: "linear-gradient(90deg, #C4956A, #4D5E49, #C4956A)" }} />
          <div className="p-6 md:p-10">
            <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.18em" }}>
              YOUR CHILDCARE FIT RESULT
            </p>
            <h1 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", lineHeight: "1.15" }}>
              {primaryLabel}
            </h1>
            <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1.1rem", lineHeight: "1.7" }}>
              {description}
            </p>

            {/* Licensing + insurance setup note for home-based pathways */}
            {isHomeBased && (
              <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: "rgba(77,94,73,0.06)", border: "1px solid rgba(77,94,73,0.14)" }}>
                <p className="font-micro mb-1" style={{ color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                  BEFORE YOU OPEN YOUR DOORS
                </p>
                <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>
                  Before accepting children into care, confirm your licensing pathway, home/business insurance needs, parent policies, emergency procedures, and local requirements. Mama Launch helps you organize this inside the <strong>Licensing + Business Protection</strong> setup path.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Email capture */}
        <div
          className="rounded-3xl p-6 md:p-10"
          style={{
            backgroundColor: "#FFFDF9",
            border: "1px solid rgba(196,149,106,0.14)",
            boxShadow: "0 4px 24px rgba(44,44,44,0.04)",
          }}
        >
          <h2 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.5rem", lineHeight: "1.2" }}>
            Save your result & get app updates
          </h2>
          <p className="font-body mb-6" style={{ color: "#7A6E65", fontSize: "0.95rem", lineHeight: "1.6" }}>
            Mama Launch Studio is coming soon. Enter your email to save your Childcare Fit result and be first to know when the app opens.
          </p>

          {error && <p className="font-body text-sm mb-4" style={{ color: "#DC2626" }}>{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                FIRST NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                style={{ border: "1px solid #E0D1BF", backgroundColor: "#FAF7F2", color: "#2C2C2C" }}
              />
            </div>
            <div>
              <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                EMAIL ADDRESS <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. sarah@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                style={{ border: "1px solid #E0D1BF", backgroundColor: "#FAF7F2", color: "#2C2C2C" }}
              />
            </div>
            <div>
              <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                YOUR STATE
              </label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                style={{ border: "1px solid #E0D1BF", backgroundColor: "#FAF7F2", color: state ? "#2C2C2C" : "#9a8f84" }}
              >
                <option value="">Select your state (optional)</option>
                {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="font-micro text-white rounded-full py-4 flex items-center justify-center gap-2 transition-opacity"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.1em", boxShadow: "0 6px 24px rgba(77,94,73,0.28)" }}
            >
              {submitting
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <><span>Save My Result & Get App Updates</span><ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}