import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { QUESTIONS, US_STATES } from "@/lib/quizConfig";
import { calculatePathwayScore } from "@/lib/quizResultEngine";
import { base44 } from "@/api/base44Client";

// Filter out the state question — state is collected on lead capture
const QUIZ_QUESTIONS = QUESTIONS.filter(q => q.id !== "q_state");

export default function Quiz() {
  const navigate = useNavigate();

  // "lead_capture" | "quiz"
  const [currentStep, setCurrentStep] = useState("lead_capture");

  // Lead capture form state
  const [leadForm, setLeadForm] = useState({ firstName: "", lastName: "", email: "", stateCode: "" });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [savedContactId, setSavedContactId] = useState(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedMulti, setSelectedMulti] = useState([]);

  const current = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  // Scroll to top whenever question or step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestionIndex, currentStep]);

  // ── Lead Capture Submit ──
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.firstName.trim()) { setLeadError("Please enter your first name."); return; }
    if (!leadForm.lastName.trim())  { setLeadError("Please enter your last name."); return; }
    if (!leadForm.email.trim())     { setLeadError("Please enter your email address."); return; }
    if (!leadForm.stateCode)        { setLeadError("Please select your state."); return; }

    setLeadSubmitting(true);
    setLeadError("");

    try {
      const stateObj = US_STATES.find(s => s.value === leadForm.stateCode);
      const res = await base44.functions.invoke("hubspotLeadCapture", {
        email:       leadForm.email.trim().toLowerCase(),
        firstName:   leadForm.firstName.trim(),
        lastName:    leadForm.lastName.trim(),
        state:       leadForm.stateCode,
        stateLabel:  stateObj?.label || "",
        source:      "quiz",
        contactType: "Quiz Lead",
        quizTaken:   false,
      });
      setLeadSubmitting(false);
      if (res.data?.contactId) setSavedContactId(res.data.contactId);
      // Proceed to quiz regardless — don't block the user on HubSpot errors
      setCurrentStep("quiz");
    } catch (err) {
      console.error("Lead capture error:", err);
      setLeadSubmitting(false);
      // Still let them take the quiz — capture was best-effort
      setCurrentStep("quiz");
    }
  };

  // ── Quiz Navigation ──
  const advanceWith = (stepAnswers) => {
    const updated = { ...answers, ...stepAnswers };
    setAnswers(updated);
    setSelectedMulti([]);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const result = calculatePathwayScore(updated);
      navigate("/quiz/result", {
        state: {
          answers: updated,
          result,
          leadForm,
          savedContactId,
        },
      });
    }
  };

  const handleSingleSelect = (value) => advanceWith({ [current.id]: value });

  const toggleMulti = (value) => {
    const limit = current.maxSelect || 3;
    if (selectedMulti.includes(value)) {
      setSelectedMulti(selectedMulti.filter(v => v !== value));
    } else if (selectedMulti.length < limit) {
      setSelectedMulti([...selectedMulti, value]);
    }
  };

  const submitMulti = () => {
    if (selectedMulti.length === 0 && !current.optional) return;
    // Pre-populate from existing answers when going back-then-forward
    advanceWith({ [current.id]: selectedMulti });
  };

  // Restore previous multi selections when navigating to a question
  const goToQuestion = (idx) => {
    const existingAnswer = answers[QUIZ_QUESTIONS[idx]?.id];
    setSelectedMulti(Array.isArray(existingAnswer) ? existingAnswer : []);
    setCurrentQuestionIndex(idx);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentStep === "quiz" && currentQuestionIndex === 0) {
      setCurrentStep("lead_capture");
    } else if (currentStep === "quiz") {
      goToQuestion(currentQuestionIndex - 1);
    }
  };

  const renderOptions = () => {
    if (current.type === "multi") {
      const limit = current.maxSelect || 3;
      const atLimit = selectedMulti.length >= limit;
      return (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-micro mb-1 text-right" style={{ color: "#7A6E65" }}>
            {current.helperText || `SELECT UP TO ${limit}`}{current.optional ? " (OPTIONAL)" : ""}
          </p>
          {current.options.map(opt => {
            const isSelected = selectedMulti.includes(opt.value);
            const isDisabled = !isSelected && atLimit;
            return (
              <button
                key={opt.value}
                type="button"
                disabled={isDisabled}
                onClick={() => toggleMulti(opt.value)}
                className="font-body text-left p-4 rounded-xl flex items-center justify-between transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: isSelected ? "#FFFDF9" : "rgba(255,253,249,0.85)",
                  border: isSelected ? "2px solid #4D5E49" : "1px solid rgba(196,149,106,0.18)",
                  boxShadow: isSelected ? "0 4px 12px rgba(77,94,73,0.08)" : "none",
                }}
              >
                <span className="font-body text-sm md:text-base" style={{ color: "#2C2C2C", fontWeight: isSelected ? "500" : "normal" }}>
                  {opt.label}
                </span>
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center border flex-shrink-0 ml-3 transition-all"
                  style={{ borderColor: isSelected ? "#4D5E49" : "#C4956A80", backgroundColor: isSelected ? "#4D5E49" : "transparent" }}
                >
                  {isSelected && <span className="text-white text-xs">✓</span>}
                </div>
              </button>
            );
          })}
          <div className="flex gap-3 mt-2">
            {current.optional && (
              <button
                type="button"
                onClick={() => advanceWith({ [current.id]: [] })}
                className="flex-1 font-micro py-3.5 rounded-full border"
                style={{ color: "#7A6E65", borderColor: "#C4956A60" }}
              >
                Skip
              </button>
            )}
            <button
              type="button"
              onClick={submitMulti}
              disabled={selectedMulti.length === 0 && !current.optional}
              className="flex-1 font-micro text-white py-3.5 rounded-full disabled:opacity-40"
              style={{ backgroundColor: "#4D5E49", boxShadow: "0 4px 16px rgba(77,94,73,0.18)" }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // SINGLE CHOICE
    return (
      <div className="flex flex-col gap-3">
        {current.options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSingleSelect(opt.value)}
            className="font-body text-left p-4 rounded-xl flex items-center justify-between group transition-all duration-200"
            style={{ backgroundColor: "rgba(255,253,249,0.85)", border: "1px solid rgba(196,149,106,0.18)" }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#FFFDF9";
              e.currentTarget.style.borderColor = "rgba(77,94,73,0.35)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(77,94,73,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "rgba(255,253,249,0.85)";
              e.currentTarget.style.borderColor = "rgba(196,149,106,0.18)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="font-body text-sm md:text-base" style={{ color: "#2C2C2C", lineHeight: "1.5" }}>
              {opt.label}
            </span>
            <ChevronRight className="w-4 h-4 flex-shrink-0 ml-3" style={{ color: "#C4956A" }} />
          </button>
        ))}
      </div>
    );
  };

  // ── LEAD CAPTURE SCREEN ──
  if (currentStep === "lead_capture") {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
        <SiteNav />
        <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-10 md:py-20">
          <div
            className="rounded-3xl p-6 md:p-10"
            style={{
              background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
              border: "1px solid rgba(196,149,106,0.14)",
              boxShadow: "0 8px 40px rgba(44,44,44,0.05)",
            }}
          >
            <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.16em" }}>
              CHILDCARE FIT QUIZ
            </p>
            <h1 className="font-display mb-3" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: "1.2" }}>
              Find your best childcare business pathway
            </h1>
            <p className="font-body mb-7" style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.65" }}>
              Answer a few thoughtful questions and we'll help you see which Mama Launch pathway fits your season of life, your home, your schedule, and the kind of village you want to build.
            </p>

            {leadError && (
              <p className="font-body text-sm mb-4 p-3 rounded-xl" style={{ color: "#92400E", backgroundColor: "rgba(196,149,106,0.12)", border: "1px solid rgba(196,149,106,0.25)" }}>
                {leadError}
              </p>
            )}

            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                    FIRST NAME <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah"
                    value={leadForm.firstName}
                    onChange={e => setLeadForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                    style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.8)", color: "#2C2C2C" }}
                  />
                </div>
                <div>
                  <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                    LAST NAME <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Johnson"
                    value={leadForm.lastName}
                    onChange={e => setLeadForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                    style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.8)", color: "#2C2C2C" }}
                  />
                </div>
              </div>

              <div>
                <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                  EMAIL ADDRESS <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. sarah@email.com"
                  value={leadForm.email}
                  onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                  style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.8)", color: "#2C2C2C" }}
                />
              </div>

              <div>
                <label className="font-micro block mb-1" style={{ color: "#9a8f84", fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                  STATE <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <select
                  value={leadForm.stateCode}
                  onChange={e => setLeadForm(f => ({ ...f, stateCode: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none"
                  style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.8)", color: leadForm.stateCode ? "#2C2C2C" : "#9a8f84" }}
                >
                  <option value="">Select your state</option>
                  {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <p className="font-micro mt-1" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.06em" }}>
                  Your state helps us point you toward the right licensing, insurance, and setup resources.
                </p>
              </div>

              <button
                type="submit"
                disabled={leadSubmitting}
                className="font-micro text-white rounded-full py-4 flex items-center justify-center gap-2 transition-opacity disabled:opacity-60 mt-2"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.75rem", letterSpacing: "0.1em", boxShadow: "0 6px 24px rgba(77,94,73,0.28)" }}
              >
                {leadSubmitting
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : "START MY FREE CHILDCARE FIT QUIZ"
                }
              </button>

              <p className="font-micro text-center mt-1" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.04em", lineHeight: "1.6" }}>
                By starting the quiz, you agree to receive Mama Launch Studio updates and resources. You can unsubscribe anytime.
              </p>
            </form>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // ── QUIZ SCREEN ──
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <SiteNav />
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-10 md:py-20">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 font-body text-sm transition-opacity"
              style={{ color: "#7A6E65" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="font-micro text-xs" style={{ color: "#C4956A", letterSpacing: "0.12em" }}>
              {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div className="h-1 w-full rounded-full" style={{ backgroundColor: "#E8DDD0" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: "#4D5E49" }}
            />
          </div>
        </div>

        {/* Question card */}
        <div
          key={currentQuestionIndex}
          className="rounded-3xl p-6 md:p-10"
          style={{
            background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
            border: "1px solid rgba(196,149,106,0.14)",
            boxShadow: "0 8px 40px rgba(44,44,44,0.05)",
          }}
        >
          <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.16em" }}>
            CHILDCARE FIT QUIZ
          </p>
          <h2 className="font-display mb-2" style={{ color: "#2C2C2C", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: "1.2" }}>
            {current.text}
          </h2>
          {current.subtext && (
            <p className="font-body mb-6" style={{ color: "#7A6E65", fontSize: "0.9rem", lineHeight: "1.55" }}>
              {current.subtext}
            </p>
          )}
          {!current.subtext && <div className="mb-7" />}

          {renderOptions()}
        </div>

        <p className="text-center font-body text-xs mt-6" style={{ color: "#9a8f84" }}>
          The full Mama Launch Studio app is coming soon. Take the quiz to find your fit and get notified first.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}