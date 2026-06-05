import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const QUESTIONS = [
  {
    id: "providerIdentity",
    text: "Which best describes you?",
    options: [
      { label: "Stay-at-home parent looking to earn from home", value: "sahp" },
      { label: "Working parent wanting to transition to self-employment", value: "working_parent" },
      { label: "Early childhood educator or teacher", value: "ece" },
      { label: "Current childcare provider wanting to grow", value: "provider" },
      { label: "None of the above", value: "other" },
    ],
  },
  {
    id: "careLocation",
    text: "Where would you run your childcare program?",
    options: [
      { label: "In my own home", value: "in_home" },
      { label: "In a rented or community space", value: "center" },
      { label: "Online or hybrid", value: "online" },
      { label: "Combination of locations", value: "hybrid" },
    ],
  },
  {
    id: "parentPresence",
    text: "Do you want parents to stay during the program?",
    options: [
      { label: "No — traditional drop-off care", value: "no" },
      { label: "Yes — parent-child classes or playgroups", value: "yes" },
      { label: "Sometimes — flexible depending on program type", value: "sometimes" },
    ],
  },
  {
    id: "incomeGoal",
    text: "What is your monthly income goal for this business?",
    options: [
      { label: "Under $1,000 / month", value: "under_1k" },
      { label: "$1,000 – $3,000 / month", value: "1k_3k" },
      { label: "$3,000 – $5,000 / month", value: "3k_5k" },
      { label: "$5,000 – $10,000 / month", value: "5k_10k" },
      { label: "$10,000+ / month", value: "10k_plus" },
    ],
  },
  {
    id: "incomeStyle",
    text: "How do you prefer to earn?",
    options: [
      { label: "Active income (direct care, classes, sessions)", value: "active" },
      { label: "Passive or recurring income (subscriptions, memberships)", value: "passive" },
      { label: "Both active and recurring", value: "both" },
    ],
  },
  {
    id: "launchTimeline",
    text: "When are you hoping to start?",
    options: [
      { label: "As soon as possible", value: "asap" },
      { label: "Within 1–3 months", value: "1_3_months" },
      { label: "Within 3–6 months", value: "3_6_months" },
      { label: "Within 6–12 months", value: "6_12_months" },
      { label: "Just exploring for now", value: "exploring" },
    ],
  },
  {
    id: "biggestBlocker",
    text: "What feels like your biggest blocker right now?",
    options: [
      { label: "Licensing, regulations, and paperwork", value: "licensing_admin" },
      { label: "Finding families and marketing", value: "finding_families" },
      { label: "Confidence and knowing where to start", value: "confidence" },
      { label: "Money or startup costs", value: "money_startup_costs" },
      { label: "Time and energy", value: "time_energy" },
      { label: "Not enough knowledge or training", value: "knowledge" },
    ],
  },
  {
    id: "supportNeeded",
    text: "What kind of support would help you most?",
    options: [
      { label: "A community of mothers doing the same thing", value: "community" },
      { label: "Coaching and personalized guidance", value: "coaching" },
      { label: "Curriculum, templates, and resources", value: "curriculum" },
      { label: "Accountability and step-by-step action plans", value: "accountability" },
    ],
  },
  {
    id: "readinessLevel",
    text: "How would you describe your readiness?",
    options: [
      { label: "Just curious — exploring the idea", value: "just_curious" },
      { label: "Actively researching and planning", value: "actively_exploring" },
      { label: "Ready to plan and make moves", value: "ready_to_plan" },
      { label: "Ready to start very soon", value: "ready_to_start_soon" },
    ],
  },
];

// Simple pathway scoring based on answers
function calculatePathway(answers) {
  const scores = {
    home_daycare_nursery: 0,
    part_time_nursery: 0,
    drop_in_care: 0,
    kids_classes: 0,
    mommy_and_me: 0,
    playgroup_open_play: 0,
    homeschool_pod: 0,
    nanny_style_care: 0,
    hybrid_model: 0,
  };

  if (answers.careLocation === "in_home") {
    scores.home_daycare_nursery += 3;
    scores.nanny_style_care += 2;
    scores.part_time_nursery += 2;
  }
  if (answers.parentPresence === "no") {
    scores.home_daycare_nursery += 2;
    scores.drop_in_care += 2;
    scores.nanny_style_care += 2;
  }
  if (answers.parentPresence === "yes") {
    scores.mommy_and_me += 3;
    scores.playgroup_open_play += 3;
  }
  if (answers.parentPresence === "sometimes") {
    scores.kids_classes += 2;
    scores.hybrid_model += 2;
  }
  if (answers.incomeGoal === "5k_10k" || answers.incomeGoal === "10k_plus") {
    scores.home_daycare_nursery += 2;
    scores.homeschool_pod += 1;
  }
  if (answers.incomeGoal === "under_1k" || answers.incomeGoal === "1k_3k") {
    scores.kids_classes += 2;
    scores.playgroup_open_play += 2;
    scores.mommy_and_me += 2;
  }
  if (answers.incomeStyle === "passive") {
    scores.kids_classes += 2;
    scores.playgroup_open_play += 1;
  }
  if (answers.providerIdentity === "ece") {
    scores.homeschool_pod += 2;
    scores.kids_classes += 2;
  }
  if (answers.careLocation === "hybrid") {
    scores.hybrid_model += 3;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted.slice(1, 3).map(([k]) => k).join(",");
  return { primary, secondary };
}

const PATHWAY_LABELS = {
  home_daycare_nursery: "Home Daycare / Nursery",
  part_time_nursery: "Part-Time Nursery",
  drop_in_care: "Drop-In Care",
  kids_classes: "Kids Classes & Enrichment",
  mommy_and_me: "Mommy & Me / Caregiver & Me",
  playgroup_open_play: "Playgroup / Open Play",
  homeschool_pod: "Homeschool Pod",
  nanny_style_care: "Nanny-Style / Private Care",
  hybrid_model: "Hybrid Model",
};

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = QUESTIONS[step];
  const progress = Math.round(((step) / QUESTIONS.length) * 100);

  const handleSelect = (value) => {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const result = calculatePathway(updated);
      navigate("/quiz/result", { state: { answers: updated, result } });
    }
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
          <h2 className="font-display mb-7" style={{ color: "#2C2C2C", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: "1.2" }}>
            {current.text}
          </h2>

          <div className="flex flex-col gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="font-body text-left p-4 rounded-xl flex items-center justify-between group transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,253,249,0.85)",
                  border: "1px solid rgba(196,149,106,0.18)",
                }}
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
        </div>

        {/* Coming soon note */}
        <p className="text-center font-body text-xs mt-6" style={{ color: "#9a8f84" }}>
          The full Mama Launch Studio app is coming soon. Take the quiz to find your fit and get notified first.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}