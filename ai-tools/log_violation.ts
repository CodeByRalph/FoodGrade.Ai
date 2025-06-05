interface ViolationEvent {
  name: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: number;
}

let violations: ViolationEvent[] = [];

export function logViolation(event: ViolationEvent) {
  violations.push({
    ...event,
    timestamp: Date.now()
  });
  
  return violations;
}

export function getViolations() {
  return violations;
}

export function clearViolations() {
  violations = [];
}