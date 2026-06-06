import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { quizConfig } from "@/lib/quizConfig";
import { calculateChildcareFit } from "@/lib/quizResultEngine";


export default function QuizResult() {
  const location = useLocation();
  const { answers = {}, leadData } = location.state ?? {};

  const [bestModelKey, setBestModelKey] = useState("home_daycare_nursery");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Fallback: also read from localStorage if no route state (e.g. page refresh)
    const raw = answers && Object.keys(answers).length > 0
      ? answers
      : (() => {
          try { return JSON.parse(localStorage.getItem("mama_launch_quiz_answers") || "{}"); }
          catch { return {}; }
        })();

    if (raw && Object.keys(raw).length > 0) {
      const { bestModel } = calculateChildcareFit(raw);
      setBestModelKey(bestModel);
    }
  }, []);

  const model = quizConfig.models[bestModelKey];

  useEffect(() => {
    if (!model || !leadData) return;

    const parsedAnswers = answers && Object.keys(answers).length > 0
      ? answers
      : (() => {
          try { return JSON.parse(localStorage.getItem("mama_launch_quiz_answers") || "{}"); }
          catch { return {}; }
        })();

    const FUNCTIONS_BASE = "https://superagent-40f97e01.base44.app/functions";

    // 1. Patch HubSpot with completed quiz answers
    fetch(`${FUNCTIONS_BASE}/hubspotLeadCapture`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactId:         leadData.contactId,
        email:             leadData.email,
        state:             leadData.stateCode,
        contactType:       "Quiz Lead",
        quizTaken:         true,
        quizCompletedDate: new Date().toISOString(),
        primaryPathway:    bestModelKey,
        secondaryPathways: model.alternatives.join(","),
        incomeGoal:        parsedAnswers.q_income_goal,
        incomeStyle:       parsedAnswers.q_income_style,
        launchTimeline:    parsedAnswers.q_launch_timeline,
        biggestBlocker:    parsedAnswers.q_biggest_blocker,
        supportNeeded:     parsedAnswers.q_support_needed,
        localParentNeed:   parsedAnswers.q_local_parent_need,
        readinessLevel:    parsedAnswers.q_readiness_level,
        providerIdentity:  parsedAnswers.q_provider_identity,
        parentPresence:    parsedAnswers.q_parent_presence,
        careLocation:      parsedAnswers.q_care_location,
      }),
    }).catch((err) => console.error("HubSpot patch error:", err));

    // 2. Send result email
    fetch(`${FUNCTIONS_BASE}/sendQuizResultEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email:             leadData.email,
        firstName:         leadData.firstName,
        lastName:          leadData.lastName,
        primaryPathway:    bestModelKey,
        secondaryPathways: model.alternatives.join(","),
        whySurfaced:       model.surfaceReason,
        incomeRange:       model.incomeRange,
        lightestStart:     model.lightestStartingVersion,
      }),
    })
      .then((r) => r.json())
      .then((d) => { if (d.success) setEmailSent(true); })
      .catch((err) => {
        console.error("Result email error:", err);
        setEmailSent(true);
      });
  }, [model, leadData]);

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
        <div className="rounded-3xl mb-8 overflow-hidden"
          style={{ background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)", border: "1px solid rgba(196,149,106,0.14)" }}>
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4D5E49, #C4956A)" }} />
          <div className="p-7 md:p-8 space-y-5">
            <div>
              <p className="font-body leading-relaxed" style={{ color: "#3a3228", fontSize: "1rem", lineHeight: "1.72" }}>{model.description}</p>
            </div>
            <div className="w-full h-px" style={{ backgroundColor: "rgba(196,149,106,0.18)" }} />
            <div>
              <p className="font-micro mb-1.5" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>WHY THIS SURFACED</p>
              <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>{model.surfaceReason}</p>
            </div>
            <div>
              <p className="font-micro mb-1.5" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>TYPICAL GROSS INCOME RANGE</p>
              <p className="font-display" style={{ color: "#2C2C2C", fontSize: "1.1rem" }}>{model.incomeRange}</p>
              <p className="font-body mt-1" style={{ color: "#9a8f84", fontSize: "0.74rem", fontStyle: "italic" }}>Gross revenue before expenses. Actual results vary.</p>
            </div>
            <div>
              <p className="font-micro mb-1.5" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>LIGHTEST STARTING VERSION</p>
              <p className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.65" }}>{model.lightestStartingVersion}</p>
            </div>
            <div>
              <p className="font-micro mb-2" style={{ color: "#4D5E49", fontSize: "0.58rem", letterSpacing: "0.16em" }}>OTHER PATHWAYS TO CONSIDER</p>
              <div className="flex flex-wrap gap-2">
                {model.alternatives.map((alt) => (
                  <span key={alt} className="font-body"
                    style={{ backgroundColor: "#FDFAF6", border: "1px solid rgba(196,149,106,0.22)", borderRadius: "999px", padding: "4px 12px", fontSize: "0.78rem", color: "#6B6156" }}>
                    {alt}
                  </span>
                ))}
              </div>
            </div>

            {/* Email confirmation line */}
            {leadData?.email && (
              <div className="w-full h-px" style={{ backgroundColor: "rgba(196,149,106,0.18)" }} />
            )}
            {leadData?.email && (
              <p className="font-body text-center" style={{ color: "#9a8f84", fontSize: "0.78rem", fontStyle: "italic" }}>
                {emailSent
                  ? <>A copy of your result is on its way to <strong style={{ color: "#5C5148" }}>{leadData.email}</strong>.</>
                  : "Sending your results to your inbox…"}
              </p>
            )}
          </div>
        </div>

        {/* Return home */}
        <div className="text-center">
          <Link to="/" className="font-micro inline-block text-white py-3.5 px-8 rounded-full"
            style={{ backgroundColor: "#C4956A", fontSize: "0.7rem", letterSpacing: "0.08em", textDecoration: "none" }}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}