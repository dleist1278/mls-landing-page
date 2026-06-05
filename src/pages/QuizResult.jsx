import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PATHWAY_LABELS, PATHWAY_DESCRIPTIONS, HOME_BASED_PATHWAYS } from "@/lib/quizConfig";
import { PATHWAY_RICH_CONTENT } from "@/lib/pathwayContent";

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Restore from sessionStorage if state was lost (page refresh)
  const stateData = location.state || (() => {
    try {
      const s = sessionStorage.getItem("mls_quiz_result");
      return s ? JSON.parse(s) : null;
    } catch (_) { return null; }
  })();

  const { answers = {}, result = {}, leadForm = {}, savedContactId } = stateData || {};

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");
  const [saved, setSaved]           = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const primaryLabel = PATHWAY_LABELS[result.primary] || "Your Best-Fit Pathway";
  const description  = PATHWAY_DESCRIPTIONS[result.primary] || "";
  const isHomeBased  = HOME_BASED_PATHWAYS.includes(result.primary);
  const richContent  = PATHWAY_RICH_CONTENT[result.primary] || null;

  if (!result.primary) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2", overflowX: "hidden", width: "100%" }}>
        <SiteNav />
        <main
          className="flex-1 w-full max-w-2xl mx-auto flex flex-col justify-center"
          style={{ padding: "48px 16px calc(100px + env(safe-area-inset-bottom, 0px))" }}
        >
          <div
            className="rounded-3xl w-full"
            style={{
              background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
              border: "1px solid rgba(196,149,106,0.14)",
              boxShadow: "0 8px 40px rgba(44,44,44,0.05)",
              padding: "clamp(24px, 6vw, 48px)",
              textAlign: "center",
            }}
          >
            <p className="font-micro mb-4" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.18em" }}>
              CHILDCARE FIT QUIZ
            </p>
            <h1 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 5vw, 2.4rem)", lineHeight: "1.2" }}>
              Your quiz result isn't available yet.
            </h1>
            <p className="font-body mx-auto mb-8" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.7", maxWidth: "38ch" }}>
              Take the free Childcare Fit Quiz to discover which Mama Launch pathway fits your season of life, your home, your schedule, and the kind of village you want to build.
            </p>
            <button
              onClick={() => navigate("/quiz")}
              className="font-micro text-white rounded-full w-full"
              style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", letterSpacing: "0.08em", minHeight: "56px", padding: "16px 24px", boxShadow: "0 6px 24px rgba(77,94,73,0.28)", whiteSpace: "normal", lineHeight: "1.25" }}
            >
              TAKE THE FREE QUIZ
            </button>
          </div>
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

      if (savedContactId) payload.contactId = savedContactId;

      const res = await base44.functions.invoke("hubspotLeadCapture", payload);
      setSubmitting(false);

      if (res.data?.success) {
        setSaved(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FAF7F2", overflowX: "hidden", width: "100%" }}
    >
      <SiteNav />
      <main
        className="flex-1 w-full max-w-2xl mx-auto"
        style={{ padding: "32px 16px calc(120px + env(safe-area-inset-bottom, 0px))" }}
      >

        {/* 1. Result badge + title + short description */}
        <div
          className="rounded-3xl mb-5 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
            border: "1px solid rgba(196,149,106,0.18)",
            boxShadow: "0 8px 40px rgba(44,44,44,0.06)",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ height: "4px", background: "linear-gradient(90deg, #C4956A, #4D5E49, #C4956A)" }} />
          <div className="p-5 md:p-10">
            <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.18em" }}>
              YOUR CHILDCARE FIT RESULT
            </p>
            <h1 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.7rem, 5vw, 2.6rem)", lineHeight: "1.15" }}>
              {primaryLabel}
            </h1>
            <p className="font-body leading-relaxed" style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.7" }}>
              {description}
            </p>
          </div>
        </div>

        {/* 2. Rich content sections */}
        {richContent && (
          <div className="flex flex-col gap-4 mb-5">

            {/* Why this pathway fits you */}
            <RichSection eyebrow="WHY THIS PATHWAY FITS YOU" text={richContent.why} accentColor="#C4956A" bgColor="rgba(196,149,106,0.05)" borderColor="rgba(196,149,106,0.16)" />

            {/* What this can become */}
            <RichSection eyebrow="WHAT THIS CAN BECOME" text={richContent.become} accentColor="#4D5E49" bgColor="rgba(77,94,73,0.04)" borderColor="rgba(77,94,73,0.14)" />

            {/* Your Phase 1 focus */}
            <RichSection eyebrow="YOUR PHASE 1 FOCUS" text={richContent.phase1} accentColor="#4D5E49" bgColor="rgba(77,94,73,0.06)" borderColor="rgba(77,94,73,0.16)" />

          </div>
        )}

        {/* 3. Before you open your doors — home-based only */}
        {isHomeBased && (
          <div
            className="rounded-2xl p-5 mb-5"
            style={{ backgroundColor: "rgba(77,94,73,0.06)", border: "1px solid rgba(77,94,73,0.14)", maxWidth: "100%", boxSizing: "border-box" }}
          >
            <p className="font-micro mb-2" style={{ color: "#4D5E49", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
              BEFORE YOU OPEN YOUR DOORS
            </p>
            <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.7" }}>
              Before accepting children into care, confirm your licensing pathway, home/business insurance needs, parent policies, emergency procedures, and local requirements. Mama Launch helps you organize this inside the <strong>Licensing + Business Protection</strong> setup path.
            </p>
          </div>
        )}

        {/* 4. Save result / waitlist card */}
        <div
          className="rounded-3xl p-5 md:p-10"
          style={{
            backgroundColor: "#FFFDF9",
            border: "1px solid rgba(196,149,106,0.14)",
            boxShadow: "0 4px 24px rgba(44,44,44,0.04)",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {saved ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(77,94,73,0.12)" }}>
                <span style={{ fontSize: "1.4rem" }}>✓</span>
              </div>
              <p className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "1.3rem" }}>Your result is saved!</p>
              <p className="font-body mb-1" style={{ color: "#5C5148", fontSize: "0.95rem", lineHeight: "1.6" }}>
                You're on the Mama Launch waitlist.
              </p>
              {displayEmail && (
                <p className="font-body mt-1" style={{ color: "#9a8f84", fontSize: "0.85rem" }}>
                  Check {displayEmail} soon for your saved pathway and next steps.
                </p>
              )}
            </div>
          ) : (
            <>
              <h2 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "clamp(1.25rem, 4vw, 1.5rem)", lineHeight: "1.2" }}>
                Ready to build this with support?
              </h2>
              <p className="font-body mb-5" style={{ color: "#7A6E65", fontSize: "0.95rem", lineHeight: "1.65" }}>
                Inside Mama Launch, you'll get the roadmap, setup guidance, licensing and insurance organization, parent policies, pricing support, and systems to turn this pathway into a real business.
                {displayEmail && <><br /><span style={{ color: "#9a8f84", fontSize: "0.85rem" }}>We'll send a copy of your result to <strong>{displayEmail}</strong>.</span></>}
              </p>

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
                style={{
                  backgroundColor: "#4D5E49",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  boxShadow: "0 6px 24px rgba(77,94,73,0.28)",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                  lineHeight: "1.3",
                  minHeight: "56px",
                  boxSizing: "border-box",
                }}
              >
                {submitting
                  ? <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  : <><span>SAVE MY RESULT + JOIN WAITLIST</span><ArrowRight className="w-4 h-4 flex-shrink-0" /></>
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

function RichSection({ eyebrow, text, accentColor, bgColor, borderColor }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, maxWidth: "100%", boxSizing: "border-box" }}
    >
      <p className="font-micro mb-2" style={{ color: accentColor, fontSize: "0.58rem", letterSpacing: "0.14em" }}>
        {eyebrow}
      </p>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="font-body" style={{ color: "#5C5148", fontSize: "0.92rem", lineHeight: "1.72", marginBottom: i < text.split("\n\n").length - 1 ? "0.75rem" : 0 }}>
          {para}
        </p>
      ))}
    </div>
  );
}