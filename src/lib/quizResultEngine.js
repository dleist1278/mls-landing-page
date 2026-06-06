import { quizConfig } from "./quizConfig";

const ALL_MODEL_KEYS = [
  "home_daycare_nursery",
  "part_time_nursery",
  "drop_in_care",
  "kids_classes",
  "mommy_and_me",
  "playgroup_open_play",
  "homeschool_pod",
  "nanny_style_care",
  "hybrid_model"
];

export function calculateChildcareFit(answers) {
  const modelScores = {};
  ALL_MODEL_KEYS.forEach((k) => { modelScores[k] = 0; });

  Object.entries(answers).forEach(([questionId, selectedVal]) => {
    const question = quizConfig.questions.find((q) => q.id === questionId);
    if (!question) return;

    const valuesToScore = Array.isArray(selectedVal) ? selectedVal : [selectedVal];

    valuesToScore.forEach((val) => {
      const option = question.options.find((o) => o.value === val);
      if (option && option.scores) {
        Object.entries(option.scores).forEach(([key, score]) => {
          if (modelScores[key] !== undefined) modelScores[key] += score;
        });
      }
    });
  });

  // Find top model and second model
  const sorted = Object.entries(modelScores).sort((a, b) => b[1] - a[1]);
  const bestModel = sorted[0]?.[0] || "home_daycare_nursery";
  const secondModel = sorted[1]?.[0] || null;

  return { bestModel, secondModel, scores: modelScores };
}