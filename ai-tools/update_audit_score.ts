interface ViolationScore {
  high: number;
  medium: number;
  low: number;
}

const SCORE_DEDUCTIONS: ViolationScore = {
  high: 11,
  medium: 3,
  low: 1
};

export function updateAuditScore(violations: { severity: 'high' | 'medium' | 'low' }[]): number {
  let currentScore = 100;

  violations.forEach(violation => {
    currentScore -= SCORE_DEDUCTIONS[violation.severity];
  });

  // Ensure score doesn't go below 0
  return Math.max(0, currentScore);
}