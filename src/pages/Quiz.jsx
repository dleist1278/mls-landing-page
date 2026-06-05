import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { QUESTIONS, US_STATES } from "@/lib/quizConfig";
import { calculatePathwayScore } from "@/lib/quizResultEngine";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("");

  const current = QUESTIONS[step];
  const progress = Math.round((step / QUESTIONS.length) * 100);

  const advanceWith = (stepAnswers) => {
    const updated = { ...answers, ...stepAnswers };
    setAnswers(updated);
    setSelectedMulti([]);
    setSelectedDropdown("");

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const result = calculatePathwayScore(updated);
      navigate("/quiz/result", { state: { answers: updated, result } });
    }
  };

  // --- Single choice ---
  const handleSingleSelect = (value) => advanceWith({ [current.id]: value });

  // --- Multi-select ---
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
    advanceWith({ [current.id]: selectedMulti });
  };

  // --- Dropdown ---
  const submitDropdown = () => {
    if (!selectedDropdown && !current.optional) return;
    advanceWith({ [current.id]: selectedDropdown });
  };

  const renderOptions = () => {
    // DROPDOWN (q_state)
    if (current.type === "dropdown") {
      return (
        <div className="flex flex-col gap-4">
          <select
            value={selectedDropdown}
            onChange={e => setSelectedDropdown(e.target.value)}
            className="w-full rounded-xl px-4 py-4 font-body text-base outline-none"
            style={{ border: "1px solid #E0D1BF", backgroundColor: "rgba(255,253,249,0.9)", color: "#2C2C2C" }}
          >
            <option value="">Select your state...</option>
            {US_STATES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <div className="flex gap-3">
            {current.optional && (
              <button
                onClick={() => advanceWith({ [current.id]: "" })}
                className="flex-1 font-micro py-3.5 rounded-full border"
                style={{ color: "#7A6E65", borderColor: "#C4956A60" }}
              >
                Skip
              </button>
            )}
            <button
              onClick={submitDropdown}
              disabled={!selectedDropdown && !current.optional}
              className="flex-1 font-micro text-white py-3.5 rounded-full disabled:opacity-40"
              style={{ backgroundColor: "#4D5E49", boxShadow: "0 4px 16px rgba(77,94,73,0.18)" }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    // MULTI-SELECT
    if (current.type === "multi") {
      const limit = current.maxSelect || 3;
      const atLimit = selectedMulti.length >= limit;
      return (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-micro mb-1 text-right" style={{ color: "#7A6E65" }}>
            Select up to {limit}{current.optional ? " (optional)" : ""}
          </p>
          {current.options.map(opt => {
            const isSelected = selectedMulti.includes(opt.value);
            const isDisabled = !isSelected && atLimit;
            return (
              <button
                key={opt.value}
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
                onClick={() => advanceWith({ [current.id]: [] })}
                className="flex-1 font-micro py-3.5 rounded-full border"
                style={{ color: "#7A6E65", borderColor: "#C4956A60" }}
              >
                Skip
              </button>
            )}
            <button
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <SiteNav />
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-10 md:py-20">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="flex items-center gap-1 font-body text-sm disabled:opacity-30 transition-opacity"
              style={{ color: "#7A6E65" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="font-micro text-xs" style={{ color: "#C4956A", letterSpacing: "0.12em" }}>
              {step + 1} OF {QUESTIONS.length}
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
          key={step}
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