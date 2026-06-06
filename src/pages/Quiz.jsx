import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { quizConfig } from "@/lib/quizConfig";

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const currentQuestion = quizConfig.questions[currentIdx];
  const totalQuestions = quizConfig.questions.length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const saveAndAdvance = (updatedAnswers) => {
    if (currentIdx === totalQuestions - 1) {
      localStorage.setItem("mama_launch_quiz_answers", JSON.stringify(updatedAnswers));
      navigate("/quiz/result");
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

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

  const multiSelected = answers[currentQuestion.id] || [];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Nav bar */}
      <div className="w-full px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(196,149,106,0.15)" }}>
        <Link to="/" className="font-display text-charcoal" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em", textDecoration: "none" }}>
          Mama Launch Studio
        </Link>
        <span className="font-micro" style={{ color: "#C4956A", fontSize: "0.6rem", letterSpacing: "0.14em" }}>
          CHILDCARE FIT QUIZ
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1" style={{ backgroundColor: "#E8D5C0" }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progressPercent}%`, backgroundColor: "#4D5E49" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-5 py-10 max-w-xl mx-auto w-full">
        <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.14em" }}>
          Question {currentIdx + 1} of {totalQuestions}
        </p>

        <h2
          className="font-display leading-tight mb-8"
          style={{ color: "#2C2C2C", fontSize: "clamp(1.4rem, 4vw, 2rem)", lineHeight: "1.25" }}
        >
          {currentQuestion.text}
        </h2>

        {/* State select */}
        {currentQuestion.type === "state_select" && (
          <div className="relative">
            <select
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleStateSelect(e.target.value)}
              className="w-full font-body p-4 rounded-2xl border outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                borderColor: "rgba(196,149,106,0.2)",
                color: answers[currentQuestion.id] ? "#2C2C2C" : "#9a8f84",
                fontSize: "0.95rem",
                appearance: "none",
                cursor: "pointer"
              }}
            >
              <option value="">Select your state</option>
              {currentQuestion.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#C4956A", pointerEvents: "none", fontSize: "0.7rem" }}>▼</span>
          </div>
        )}

        {/* Multi-select */}
        {currentQuestion.type === "multi_select" && (
          <div className="flex flex-col gap-3">
            <p className="font-body" style={{ color: "#7A6E65", fontSize: "0.78rem", marginBottom: "4px" }}>
              Select up to {currentQuestion.max_select}:
            </p>
            {currentQuestion.options.map((opt) => {
              const isSelected = multiSelected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => handleMultiSelectToggle(opt.value)}
                  className="w-full text-left font-body p-4 rounded-2xl border transition-all duration-150"
                  style={{
                    backgroundColor: isSelected ? "#F0EBE1" : "rgba(255,255,255,0.55)",
                    borderColor: isSelected ? "#C4956A" : "rgba(196,149,106,0.18)",
                    color: "#2C2C2C",
                    fontSize: "0.92rem"
                  }}
                >
                  <span className="mr-3" style={{ color: isSelected ? "#C4956A" : "#9a8f84" }}>
                    {isSelected ? "◼" : "◻"}
                  </span>
                  {opt.label}
                </button>
              );
            })}
            <button
              onClick={handleMultiSelectContinue}
              className="mt-3 font-micro text-white py-4 rounded-2xl text-center transition-colors"
              style={{
                backgroundColor: multiSelected.length > 0 ? "#4D5E49" : "#9a8f84",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                cursor: multiSelected.length > 0 ? "pointer" : "not-allowed"
              }}
            >
              {multiSelected.length > 0 ? "Continue →" : "Select at least one to continue"}
            </button>
          </div>
        )}

        {/* Single choice */}
        {currentQuestion.type === "single_choice" && (
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSingleChoice(opt.value)}
                className="w-full text-left font-body p-4 rounded-2xl border transition-all duration-150"
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  borderColor: "rgba(196,149,106,0.18)",
                  color: "#2C2C2C",
                  fontSize: "0.92rem"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFFDF9"; e.currentTarget.style.borderColor = "rgba(196,149,106,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(196,149,106,0.18)"; }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Back */}
        {currentIdx > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentIdx((i) => i - 1)}
              className="font-micro"
              style={{ color: "#9a8f84", fontSize: "0.66rem", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}