interface CoachingEvent {
  violation: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export function realTimeCoaching(event: CoachingEvent): string {
  const severityMessages = {
    high: 'Critical Issue - Immediate Action Required:',
    medium: 'Important Issue - Please Address Soon:',
    low: 'Minor Issue - Please Note:'
  };

  const prefix = severityMessages[event.severity];
  const coaching = `${prefix} ${event.description}. To resolve this ${event.violation.toLowerCase()} violation, please take corrective action immediately.`;

  return coaching;
}