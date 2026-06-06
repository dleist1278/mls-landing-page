import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { quizConfig, US_STATES_COMPACT } from "@/lib/quizConfig";
import { base44 } from "@/api/base44Client";

// Warm imagery for key emotional moments
const QUESTION_IMAGES = {
  q_startup_budget: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/634c9a42e_Untitleddesign2.png",
  q_season: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/db7fa380c_2.png",
  q_care_location: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/bed21046e_Untitleddesign1.png",
  q_income_goal: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/b0774a763_5.png",
  q_program_vibe: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/2db4a7b29_10.png",
  q_parent_presence: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/48469afbc_6.png",
  q_support_needed: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/1a9605b32_8.png",
  q_state: "https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/f0a7d893d_Untitleddesign.png",
};

const ENCOURAGEMENT = {
  4: "You're getting clearer.",
  9: "Now let's shape the kind of childcare experience that fits your life.",
  14: "Almost there — this part helps us personalize your result.",
  17: "You're doing great. Just a few more.",
};

const SHARED_STYLES = `
  * { box-sizing: border-box; }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-10px); }
  }
  @keyframes encourageFadeIn {
    0%   { opacity: 0; transform: translateY(8px) scale(0.98); }
    20%  { opacity: 1; transform: translateY(0) scale(1); }
    80%  { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-6px) scale(0.98); }
  }
  .quiz-card-enter { animation: fadeSlideIn 0.32s ease forwards; }
  .quiz-card-exit  { animation: fadeSlideOut 0.22s ease forwards; }

  .answer-card {
    transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease;
  }
  .answer-card:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(77,94,73,0.12);
  }
  .answer-card:active:not(:disabled) { transform: scale(0.985); }
  .answer-card.selected {
    background-color: #EEF0EB !important;
    border-color: #4D5E49 !important;
    box-shadow: 0 0 0 2px rgba(77,94,73,0.18), 0 4px 16px rgba(77,94,73,0.1) !important;
  }
  .answer-card.single-unselected {
    background-color: rgba(255,255,255,0.72);
    border-color: rgba(196,149,106,0.2);
  }
  .answer-card.single-unselected:hover {
    background-color: #FFFDF9;
    border-color: rgba(196,149,106,0.45);
  }
  .continue-btn {
    transition: box-shadow 0.2s ease, transform 0.15s ease, background-color 0.2s ease;
  }
  .continue-btn:hover:not(:disabled) {
    box-shadow: 0 8px 28px rgba(77,94,73,0.34);
    transform: translateY(-1px);
  }
  .continue-btn:active:not(:disabled) { transform: scale(0.98); }
`;

// ── Lead Capture Screen ──────────────────────────────────────────────────────
function LeadCaptureScreen({ onSubmit, loading, error }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", stateCode: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={{ backgroundColor: "#F2EDE5", minHeight: "100svh", width: "100%", maxWidth: "100vw", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
      <style>{SHARED_STYLES}</style>

      {/* Nav */}
      <div className="w-full px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(196,149,106,0.15)", backgroundColor: "#FAF7F2", position: "sticky", top: 0, zIndex: 20, boxShadow: "0 1px 8px rgba(44,44,44,0.04)", flexShrink: 0 }}>
        <Link to="/" className="font-display" style={{ fontSize: "1rem", letterSpacing: "-0.01em", textDecoration: "none", color: "#2C2C2C" }}>
          Mama Launch Studio
        </Link>
        <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.14em" }}>CHILDCARE FIT QUIZ</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div
          className="quiz-card-enter w-full"
          style={{ maxWidth: "520px", width: "100%", backgroundColor: "#FFFDF9", borderRadius: "24px", boxShadow: "0 4px 32px rgba(44,44,44,0.06), 0 1px 8px rgba(196,149,106,0.08)", border: "1px solid rgba(196,149,106,0.1)", overflow: "hidden", boxSizing: "border-box" }}
        >
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4D5E49, #C4956A)" }} />
          <div className="px-7 md:px-9 pt-8 pb-8">
            <p className="font-micro mb-2 text-center" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.18em" }}>FREE · 3 MINUTES</p>
            <h2 className="font-display text-center leading-snug mb-2" style={{ color: "#2C2C2C", fontSize: "clamp(1.3rem, 4vw, 1.75rem)", lineHeight: "1.25" }}>
              Discover your Childcare Fit
            </h2>
            <p className="font-body text-center mb-7" style={{ color: "#7A6E65", fontSize: "0.84rem", lineHeight: "1.6" }}>
              Enter your details to receive your personalized result.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text" placeholder="First Name" required
                  value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="font-body outline-none rounded-xl border p-4 text-sm"
                  style={{ backgroundColor: "#F5F0EA", borderColor: "rgba(196,149,106,0.2)", color: "#2C2C2C" }}
                />
                <input
                  type="text" placeholder="Last Name" required
                  value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="font-body outline-none rounded-xl border p-4 text-sm"
                  style={{ backgroundColor: "#F5F0EA", borderColor: "rgba(196,149,106,0.2)", color: "#2C2C2C" }}
                />
              </div>
              <input
                type="email" placeholder="your@email.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="font-body outline-none rounded-xl border p-4 text-sm w-full"
                style={{ backgroundColor: "#F5F0EA", borderColor: "rgba(196,149,106,0.2)", color: "#2C2C2C" }}
              />
              <div className="relative">
                <select
                  required value={form.stateCode} onChange={(e) => setForm({ ...form, stateCode: e.target.value })}
                  className="w-full font-body rounded-xl border outline-none"
                  style={{ backgroundColor: "#F5F0EA", borderColor: form.stateCode ? "#4D5E49" : "rgba(196,149,106,0.2)", color: form.stateCode ? "#2C2C2C" : "#9a8f84", fontSize: "0.875rem", appearance: "none", cursor: "pointer", padding: "14px 44px 14px 16px" }}
                >
                  <option value="">State *</option>
                  {US_STATES_COMPACT.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#C4956A", pointerEvents: "none", fontSize: "0.65rem" }}>▼</span>
              </div>

              {error && <p className="font-body text-center text-xs" style={{ color: "#b94a4a" }}>{error}</p>}

              <button
                type="submit" disabled={loading}
                className="continue-btn font-micro text-white py-4 rounded-xl mt-1"
                style={{ backgroundColor: loading ? "#7a9176" : "#4D5E49", fontSize: "0.7rem", letterSpacing: "0.12em", cursor: loading ? "not-allowed" : "pointer", border: "none", boxShadow: "0 6px 22px rgba(77,94,73,0.26)" }}
              >
                {loading ? "One moment..." : "START MY FREE CHILDCARE FIT QUIZ →"}
              </button>

              <p className="font-body text-center" style={{ color: "#9a8f84", fontSize: "0.68rem", lineHeight: "1.5" }}>
                By starting the quiz, you agree to receive Mama Launch Studio updates and resources. You can unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        <p className="font-micro mt-6 text-center" style={{ color: "rgba(196,149,106,0.45)", fontSize: "0.55rem", letterSpacing: "0.14em" }}>
          MAMA LAUNCH STUDIO · CHILDCARE FIT QUIZ
        </p>
      </div>
    </div>
  );
}

// ── Main Quiz ────────────────────────────────────────────────────────────────
export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [leadData, setLeadData] = useState(null);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir] = useState("forward");
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementText, setEncouragementText] = useState("");
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const currentQuestion = quizConfig.questions[currentIdx];
  const totalQuestions = quizConfig.questions.length;
  const progressPercent = Math.round((currentIdx / totalQuestions) * 100);
  const multiSelected = answers[currentQuestion?.id] || [];

  const handleLeadSubmit = async (form) => {
    setLeadLoading(true);
    setLeadError(null);
    try {
      const res = await base44.functions.invoke("hubspotLeadCapture", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        state: form.stateCode,
        source: "quiz",
        contactType: "Quiz Lead",
      });
      const data = res.data;
      if (!data.success) throw new Error(data.error);
      setLeadData({ ...form, contactId: data.contactId });
      setQuizStarted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setLeadError("Something went wrong. Please try again.");
    } finally {
      setLeadLoading(false);
    }
  };

  const advanceWithAnimation = (updatedAnswers, direction = "forward") => {
    const encouragement = ENCOURAGEMENT[currentIdx + 1];
    if (direction === "forward" && encouragement) {
      setEncouragementText(encouragement);
      setShowEncouragement(true);
      setTimeout(() => {
        setShowEncouragement(false);
        doAdvance(updatedAnswers, direction);
      }, 1400);
    } else {
      doAdvance(updatedAnswers, direction);
    }
  };

  const doAdvance = (updatedAnswers, direction) => {
    setAnimDir(direction);
    setAnimating(true);
    setTimeout(() => {
      if (direction === "forward") {
        if (currentIdx === totalQuestions - 1) {
          localStorage.setItem("mama_launch_quiz_answers", JSON.stringify(updatedAnswers));
          navigate("/quiz/result", { state: { answers: updatedAnswers, leadData } });
          return;
        }
        setCurrentIdx((i) => i + 1);
      } else {
        setCurrentIdx((i) => i - 1);
      }
      setAnimating(false);
    }, 260);
  };

  const saveAndAdvance = (updatedAnswers) => advanceWithAnimation(updatedAnswers, "forward");

  const handleSingleChoice = (optValue) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: optValue };
    setAnswers(updatedAnswers);
    saveAndAdvance(updatedAnswers);
  };

  const handleMultiSelectToggle = (optValue) => {
    const current = answers[currentQuestion.id] || [];
    let updated;
    if (current.includes(optValue)) {
      updated = current.filter((v) => v !== optValue);
    } else {
      const max = currentQuestion.max_select || 99;
      updated = current.length >= max ? [...current.slice(1), optValue] : [...current, optValue];
    }
    setAnswers({ ...answers, [currentQuestion.id]: updated });
  };

  const handleMultiSelectContinue = () => {
    const updatedAnswers = { ...answers };
    if (!updatedAnswers[currentQuestion.id]) updatedAnswers[currentQuestion.id] = [];
    setAnswers(updatedAnswers);
    saveAndAdvance(updatedAnswers);
  };

  const handleStateSelect = (val) => {
    if (!val) return;
    const updatedAnswers = { ...answers, [currentQuestion.id]: val };
    setAnswers(updatedAnswers);
    saveAndAdvance(updatedAnswers);
  };

  const handleBack = () => advanceWithAnimation(answers, "back");

  if (!quizStarted) {
    return <LeadCaptureScreen onSubmit={handleLeadSubmit} loading={leadLoading} error={leadError} />;
  }

  const hasImage = !!QUESTION_IMAGES[currentQuestion.id];
  const imageUrl = QUESTION_IMAGES[currentQuestion.id];

  return (
    <div style={{ backgroundColor: "#F2EDE5", minHeight: "100svh", width: "100%", maxWidth: "100vw", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
      <style>{SHARED_STYLES}</style>

      {/* Nav */}
      <div className="w-full px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(196,149,106,0.15)", backgroundColor: "#FAF7F2", position: "sticky", top: 0, zIndex: 20, boxShadow: "0 1px 8px rgba(44,44,44,0.04)", flexShrink: 0 }}>
        <Link to="/" className="font-display" style={{ fontSize: "1rem", letterSpacing: "-0.01em", textDecoration: "none", color: "#2C2C2C" }}>
          Mama Launch Studio
        </Link>
        <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.14em" }}>CHILDCARE FIT QUIZ</span>
      </div>

      {/* Progress */}
      <div style={{ backgroundColor: "#FAF7F2", paddingBottom: "2px" }}>
        <div className="max-w-xl mx-auto px-5 pt-3 pb-2 flex items-center gap-3">
          <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.58rem", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>
            {currentIdx + 1} / {totalQuestions}
          </span>
          <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "#E0D1BF" }}>
            <div className="h-full rounded-full" style={{ width: `${progressPercent}%`, backgroundColor: "#4D5E49", transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
          <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.1em" }}>{progressPercent}%</span>
        </div>
      </div>

      {/* Encouragement overlay */}
      {showEncouragement && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", backgroundColor: "rgba(242,237,229,0.88)", backdropFilter: "blur(4px)" }}>
          <div style={{ animation: "encourageFadeIn 1.4s ease forwards", textAlign: "center", padding: "0 32px" }}>
            <p className="font-display" style={{ color: "#4D5E49", fontSize: "clamp(1.4rem, 5vw, 2rem)", letterSpacing: "-0.01em", lineHeight: "1.3" }}>
              {encouragementText}
            </p>
            <div className="mx-auto mt-3" style={{ width: "32px", height: "1px", backgroundColor: "#C4956A" }} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px 40px", width: "100%", maxWidth: "100vw", boxSizing: "border-box" }}>
        <div
          ref={cardRef}
          className={animating ? "quiz-card-exit" : "quiz-card-enter"}
          style={{ width: "100%", maxWidth: "580px", backgroundColor: "#FFFDF9", borderRadius: "24px", boxShadow: "0 4px 32px rgba(44,44,44,0.06), 0 1px 8px rgba(196,149,106,0.08)", border: "1px solid rgba(196,149,106,0.1)", overflow: "hidden", boxSizing: "border-box" }}
        >
          {hasImage && (
            <div style={{ width: "100%", height: "160px", overflow: "hidden", position: "relative" }}>
              <img src={imageUrl} alt="" role="presentation" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(255,253,249,0) 40%, rgba(255,253,249,0.95) 100%)" }} />
            </div>
          )}

          <div className="px-6 md:px-8 pt-7 pb-7">
            <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.58rem", letterSpacing: "0.16em" }}>QUESTION {currentIdx + 1}</p>
            <h2 className="font-display leading-snug mb-2" style={{ color: "#2C2C2C", fontSize: "clamp(1.2rem, 3.5vw, 1.65rem)", lineHeight: "1.25", letterSpacing: "-0.01em" }}>
              {currentQuestion.text}
            </h2>

            {currentQuestion.type === "multi_select" && (
              <p className="font-body mb-5" style={{ color: "#9a8f84", fontSize: "0.74rem", lineHeight: "1.5" }}>Choose up to {currentQuestion.max_select}</p>
            )}
            {currentQuestion.type !== "multi_select" && <div className="mb-5" />}

            {/* State select */}
            {currentQuestion.type === "state_select" && (
              <div className="relative">
                <select
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleStateSelect(e.target.value)}
                  className="w-full font-body rounded-xl border outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", borderColor: answers[currentQuestion.id] ? "#4D5E49" : "rgba(196,149,106,0.25)", color: answers[currentQuestion.id] ? "#2C2C2C" : "#9a8f84", fontSize: "0.92rem", appearance: "none", cursor: "pointer", padding: "14px 44px 14px 16px", boxShadow: "0 1px 4px rgba(44,44,44,0.05)" }}
                >
                  <option value="">Select your state</option>
                  {currentQuestion.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#C4956A", pointerEvents: "none", fontSize: "0.65rem" }}>▼</span>
              </div>
            )}

            {/* Multi-select */}
            {currentQuestion.type === "multi_select" && (
              <div className="flex flex-col gap-2.5">
                {currentQuestion.options.map((opt) => {
                  const isSelected = multiSelected.includes(opt.value);
                  return (
                    <button key={opt.value} onClick={() => handleMultiSelectToggle(opt.value)}
                      className={`answer-card w-full text-left rounded-xl border px-4 py-3.5 flex items-center gap-3 ${isSelected ? "selected" : ""}`}
                      style={{ minHeight: "52px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "5px", flexShrink: 0, border: `1.5px solid ${isSelected ? "#4D5E49" : "rgba(196,149,106,0.35)"}`, backgroundColor: isSelected ? "#4D5E49" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}>
                        {isSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </span>
                      <span className="font-body" style={{ color: isSelected ? "#2C2C2C" : "#5C5148", fontSize: "0.88rem", lineHeight: "1.4", fontWeight: isSelected ? "500" : "400" }}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
                <button onClick={handleMultiSelectContinue} disabled={multiSelected.length === 0}
                  className="continue-btn mt-2 font-micro w-full py-4 rounded-xl text-center"
                  style={{ backgroundColor: multiSelected.length > 0 ? "#4D5E49" : "#C8BFB5", color: "#fff", fontSize: "0.7rem", letterSpacing: "0.12em", border: "none", cursor: multiSelected.length > 0 ? "pointer" : "not-allowed", boxShadow: multiSelected.length > 0 ? "0 6px 22px rgba(77,94,73,0.26)" : "none", transition: "all 0.2s ease" }}>
                  {multiSelected.length > 0 ? "Continue →" : "Select at least one to continue"}
                </button>
              </div>
            )}

            {/* Single choice */}
            {currentQuestion.type === "single_choice" && (
              <div className="flex flex-col gap-2.5">
                {currentQuestion.options.map((opt) => (
                  <button key={opt.value} onClick={() => handleSingleChoice(opt.value)}
                    className="answer-card single-unselected w-full text-left rounded-xl border px-4 py-3.5 flex items-center gap-3"
                    style={{ minHeight: "52px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0, backgroundColor: "#C4956A", opacity: 0.4 }} />
                    <span className="font-body" style={{ color: "#5C5148", fontSize: "0.88rem", lineHeight: "1.4" }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Back button */}
            {currentIdx > 0 && (
              <div className="mt-6 text-center">
                <button onClick={handleBack} className="font-micro"
                  style={{ color: "#B5A99E", fontSize: "0.63rem", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer", padding: "8px 16px" }}>
                  ← Back
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="font-micro mt-6 text-center" style={{ color: "rgba(196,149,106,0.45)", fontSize: "0.55rem", letterSpacing: "0.14em" }}>
          MAMA LAUNCH STUDIO · CHILDCARE FIT QUIZ
        </p>
      </div>
    </div>
  );
}