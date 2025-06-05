import { NextResponse } from 'next/server';
import { updateAuditScore } from '@/ai-tools/update_audit_score';
import { logViolation } from '@/ai-tools/log_violation';
import { realTimeCoaching } from '@/ai-tools/real_time_coaching';

export async function POST(req: Request) {
  try {
    const { tool, args } = await req.json();
    let result;

    switch (tool) {
      case 'update_audit_score':
        result = updateAuditScore(args.severity);
        break;
      case 'real_time_coaching':
        result = realTimeCoaching({
          violation: args.violation_name,
          description: args.recommendation,
          severity: args.severity
        });
        break;
      case 'log_violation':
        result = logViolation({
          name: args.violation_name,
          description: args.violation_name,
          severity: args.severity,
          timestamp: Date.now()
        });
        break;
      default:
        return NextResponse.json({ error: 'Unknown tool' }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('[AI Tools API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process tool call' },
      { status: 500 }
    );
  }
}