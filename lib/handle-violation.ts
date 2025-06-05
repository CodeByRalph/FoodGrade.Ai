import { type Violation } from './violations';
import { updateAuditScore } from '@/ai-tools/update_audit_score';
import { logViolation } from '@/ai-tools/log_violation';
import { realTimeCoaching } from '@/ai-tools/real_time_coaching';

interface ViolationHandlerResult {
  score: number;
  message: string;
}

export function handleViolation(violation: Violation): ViolationHandlerResult {
  // Log the violation
  logViolation({
    name: violation.id,
    description: violation.description || violation.query,
    severity: violation.severity,
    timestamp: Date.now()
  });

  // Update the score based on severity
  const newScore = updateAuditScore(violation.severity);

  // Get coaching message
  const message = realTimeCoaching({
    violation: violation.id,
    description: violation.description || violation.query,
    severity: violation.severity
  });

  return {
    score: newScore,
    message
  };
}