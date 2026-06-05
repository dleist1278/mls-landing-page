import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PATHWAY_LABELS, PATHWAY_DESCRIPTIONS, HOME_BASED_PATHWAYS } from "@/lib/quizConfig";

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = {}, result = {}, leadForm = {}, savedContactId } = location.state || {};

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const [saved, setSaved]           = useState(false);

  const primaryLabel = PATHWAY_LABELS[result.primary] || "Your Best-Fit Pathway";
  const description  = PATHWAY_DESCRIPTIONS[result.primary] || "";
  const isHomeBased  = HOME_BASED_PATHWAYS.includes(result.primary);

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

  const handleSaveResult = async () => {
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        email:             leadForm.email?.trim().toLowerCase(),
        firstName:         leadForm.firstName?.trim(),
        lastName:          leadForm.lastName?.trim(),
        state:             leadForm.stateCode,
        source:            "childcare_fit_quiz",
        contactType:       "Quiz Lead",
        quizTaken:         true,
        quizCompletedDate: new Date().toISOString(),
        primaryPathway:    result.primary,
        secondaryPathways: result.secondary,
        pathway:           result.primary,
        biggestBlocker:    answers.q_biggest_blocker,
        supportNeeded:     Array.isArray(answers.q_support_needed) ? answers.q_support_needed.join(", ") : (answers.q_support_needed || ""),
        localParentNeed:   Array.isArray(answers.q_local_parent_need) ? answers.q_local_parent_need.join(", ") : (answers.q_local_parent_need || ""),
        readinessLevel:    answers.q_readiness_level,
        incomeGoal:        answers.q_income_goal,
        incomeStyle:       answers.q_income_style,
        launchTimeline:    answers.q_launch_timeline,
        providerIdentity:  answers.q_provider_identity,
        parentPresence:    answers.q_parent_presence,
        careLocation:      answers.q_care_location,
      };

      // Include contactId for direct patch — email is fallback upsert
      if (savedContactId) payload.contactId = savedContactId;

      const res = await base44.functions.invoke("hubspotLeadCapture", payload);
      setSubmitting(false);

      if (res.data?.success) {
        setSaved(true);
      } else {
        setError("Something went wrong saving your result. Your quiz result is still here — please try again in a moment.");
      }
    } catch (err) {
      console.error("Quiz result save failed:", err);
      setSubmitting(false);
      setError("Something went wrong saving your result. Your quiz result is still here — please try again in a moment.");
    }
  };

  const displayEmail = leadForm.email || "";

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

        {/* Save result / waitlist CTA */}
        <div
          className="rounded-3xl p-6 md:p-10"
          style={{
            backgroundColor: "#FFFDF9",
            border: "1px solid rgba(196,149,106,0.14)",
            boxShadow: "0 4px 24px rgba(44,44,44,0.04)",
          }}
        >
          {saved ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(77,94,73,0.12)" }}>
                <span style={{ fontSize: "1.4rem" }}>✓</span>
              </div>
              <p className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.3rem" }}>Your result is saved!</p>
              <p className="font-body mb-1" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.6" }}>
                Your result has been saved. You're on the Mama Launch waitlist.
              </p>
              {displayEmail && (
                <p className="font-body" style={{ color: "#9a8f84", fontSize: "0.85rem" }}>
                  Check {displayEmail} soon for your saved pathway and next steps.
                </p>
              )}
              <button
                disabled
                className="font-micro text-white rounded-full py-3 px-6 mt-5 opacity-70"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", letterSpacing: "0.1em" }}
              >
                Saved — you're on the list ✓
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.5rem", lineHeight: "1.2" }}>
                Save your result & join the Mama Launch waitlist
              </h2>
              {displayEmail ? (
                <p className="font-body mb-6" style={{ color: "#7A6E65", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Your result is ready — we'll send a copy to <strong>{displayEmail}</strong>.
                </p>
              ) : (
                <p className="font-body mb-6" style={{ color: "#7A6E65", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  Save your Childcare Fit result and get notified when Mama Launch opens.
                </p>
              )}

              {error && (
                <p className="font-body text-sm mb-4 p-3 rounded-xl" style={{ color: "#92400E", backgroundColor: "rgba(196,149,106,0.12)", border: "1px solid rgba(196,149,106,0.25)" }}>
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSaveResult}
                disabled={submitting}
                className="w-full font-micro text-white rounded-full py-4 flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.1em", boxShadow: "0 6px 24px rgba(77,94,73,0.28)" }}
              >
                {submitting
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <><span>SEND MY RESULT + JOIN THE WAITLIST</span><ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}