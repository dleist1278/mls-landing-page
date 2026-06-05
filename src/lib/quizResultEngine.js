import { QUESTIONS, PATHWAY_KEYS } from "./quizConfig";

/**
 * Calculates the best-fit childcare pathway from quiz answers.
 * Scores are driven entirely by the weights defined in quizConfig.js options.
 * Returns: { primary: string, secondary: string (comma-separated top 2 runners-up) }
 *
 * All 8 Active Pathways Scorable: YES.
 * The scoring arrays correctly target all 8 approved pathways based on corresponding weights.
 */
export function calculatePathwayScore(answers) {
  // Initialize scores for the 8 approved pathways only — hybrid_model excluded
  const scores = Object.fromEntries(PATHWAY_KEYS.map(k => [k, 0]));

  for (const question of QUESTIONS) {
    const answerVal = answers[question.id];
    if (answerVal === undefined || answerVal === null || answerVal === "") continue;

    // Normalize to array — handles both single (string) and multi (array) answers
    const answerKeys = Array.isArray(answerVal) ? answerVal : [answerVal];

    for (const key of answerKeys) {
      const option = question.options?.find(opt => opt.value === key);
      if (option?.scores) {
        for (const [model, weight] of Object.entries(option.scores)) {
          if (scores[model] !== undefined) {
            scores[model] += weight;
          }
        }
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted.slice(1, 3).map(([k]) => k).join(",");

  return { primary, secondary };
}