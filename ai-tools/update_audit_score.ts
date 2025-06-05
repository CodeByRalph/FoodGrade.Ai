interface ViolationScore {
  high: number;
  medium: number;
  low: number;
}

const DEFAULT_DEDUCTIONS: ViolationScore = {
  high: 10,
  medium: 5,
  low: 2
};

let currentScore = 100;

export function resetScore(): void {
  currentScore = 100;
}

export function getCurrentScore(): number {
  return currentScore;
}

export function updateAuditScore(
  severity: 'high' | 'medium' | 'low',
  deductionTable: ViolationScore = DEFAULT_DEDUCTIONS
): number {
  const deduction = deductionTable[severity];
  currentScore = Math.max(0, currentScore - deduction);
  return currentScore;
}