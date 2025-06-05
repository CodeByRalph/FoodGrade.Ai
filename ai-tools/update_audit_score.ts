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

let currentScore = 100;

export function resetScore() {
  currentScore = 100;
}

export function getCurrentScore() {
  return currentScore;
}

export function updateAuditScore(violations: { severity: 'high' | 'medium' | 'low' }[]): number {
  violations.forEach(violation => {
    currentScore -= SCORE_DEDUCTIONS[violation.severity];
  });

  // Ensure score doesn't go below 0
  currentScore = Math.max(0, currentScore);
  return currentScore;
}