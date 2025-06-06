interface ViolationEvent {
  // Basic violation information
  id: string;
  name: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  
  // Timestamps and session info
  timestamp: number;
  sessionId?: string;
  conversationId?: string;
  
  // AI Detection metadata
  detectionSource: 'ai_perception' | 'manual' | 'system';
  confidenceScore?: number;
  detectionModel?: string;
  
  // Perception event data
  frames?: string[]; // Base64 encoded frames from AI
  eventType?: string;
  messageType?: string;
  
  // Location and context
  location?: string;
  area?: string;
  equipment?: string;
  personnel?: string[];
  
  // Violation specifics
  riskLevel: 'critical' | 'high' | 'moderate' | 'low' | 'minimal';
  complianceStandard?: string;
  regulatoryCode?: string;
  
  // Remediation information
  immediateAction?: string;
  correctiveAction?: string;
  timeline?: string;
  responsibleParty?: string;
  
  // Additional context
  environmentalFactors?: string[];
  precedingEvents?: string[];
  relatedViolations?: string[];
  
  // Reporting metadata
  reportPriority: number; // 1-5, 1 being highest priority
  tags?: string[];
  notes?: string;
  
  // Evidence and documentation
  evidenceType?: 'visual' | 'audio' | 'sensor' | 'observation';
  evidenceQuality?: 'high' | 'medium' | 'low';
  
  // Status tracking
  status: 'detected' | 'acknowledged' | 'in_progress' | 'resolved' | 'false_positive';
  resolvedAt?: number;
  resolvedBy?: string;
  
  // Impact assessment
  potentialConsequences?: string[];
  affectedAreas?: string[];
  businessImpact?: 'high' | 'medium' | 'low';
}

interface ViolationSummary {
  totalViolations: number;
  bySeverity: Record<string, number>;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  byRiskLevel: Record<string, number>;
  sessionDuration: number;
  detectionRate: number;
  avgConfidenceScore: number;
  criticalIssuesCount: number;
  resolvedCount: number;
  pendingCount: number;
}

interface ExportableReport {
  metadata: {
    generatedAt: string;
    sessionId: string;
    facilityName?: string;
    auditorName?: string;
    duration: number;
    totalScore: number;
  };
  summary: ViolationSummary;
  violations: ViolationEvent[];
  recommendations: string[];
  complianceStatus: 'compliant' | 'non_compliant' | 'needs_improvement';
}

// In-memory storage (in production, this would be a database)
let violations: ViolationEvent[] = [];
let sessionStartTime: number = Date.now();
let sessionId: string = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Violation categorization mapping
const VIOLATION_CATEGORIES = {
  'hand-washing': 'Personal Hygiene',
  'glove-usage': 'Personal Protective Equipment',
  'food-storage': 'Food Safety',
  'temperature-control': 'Food Safety',
  'cross-contamination': 'Food Safety',
  'cleaning-sanitizing': 'Sanitation',
  'equipment-maintenance': 'Equipment Safety',
  'dress-code': 'Personal Hygiene',
  'work-surface': 'Sanitation',
  'waste-management': 'Sanitation',
  'chemical-storage': 'Chemical Safety',
  'documentation': 'Record Keeping',
  'training': 'Personnel',
  'default': 'General Safety'
};

// Risk level mapping based on severity
const RISK_LEVEL_MAP = {
  'high': 'critical' as const,
  'medium': 'moderate' as const,
  'low': 'low' as const
};

// Priority mapping for reporting
const PRIORITY_MAP = {
  'high': 1,
  'medium': 3,
  'low': 5
};

export function logViolation(eventData: Partial<ViolationEvent>): ViolationEvent {
  const violationId = `violation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine category from violation name
  const category = determineCategory(eventData.name || '');
  
  // Create comprehensive violation record
  const violation: ViolationEvent = {
    // Basic information
    id: violationId,
    name: eventData.name || 'Unknown Violation',
    description: eventData.description || 'No description provided',
    severity: eventData.severity || 'medium',
    category,
    
    // Timestamps
    timestamp: eventData.timestamp || Date.now(),
    sessionId,
    conversationId: eventData.conversationId,
    
    // AI Detection metadata
    detectionSource: eventData.detectionSource || 'ai_perception',
    confidenceScore: eventData.confidenceScore,
    detectionModel: eventData.detectionModel || 'tavus-ai-perception',
    
    // Perception data
    frames: eventData.frames || [],
    eventType: eventData.eventType,
    messageType: eventData.messageType,
    
    // Context
    location: eventData.location || 'Unknown Location',
    area: eventData.area,
    equipment: eventData.equipment,
    personnel: eventData.personnel || [],
    
    // Risk assessment
    riskLevel: RISK_LEVEL_MAP[eventData.severity || 'medium'],
    complianceStandard: eventData.complianceStandard,
    regulatoryCode: eventData.regulatoryCode,
    
    // Remediation
    immediateAction: generateImmediateAction(eventData.severity || 'medium', category),
    correctiveAction: generateCorrectiveAction(eventData.name || '', eventData.severity || 'medium'),
    timeline: generateTimeline(eventData.severity || 'medium'),
    responsibleParty: eventData.responsibleParty || 'Site Manager',
    
    // Additional context
    environmentalFactors: eventData.environmentalFactors || [],
    precedingEvents: eventData.precedingEvents || [],
    relatedViolations: findRelatedViolations(eventData.name || ''),
    
    // Reporting
    reportPriority: PRIORITY_MAP[eventData.severity || 'medium'],
    tags: generateTags(eventData.name || '', category),
    notes: eventData.notes,
    
    // Evidence
    evidenceType: eventData.evidenceType || 'visual',
    evidenceQuality: eventData.evidenceQuality || 'high',
    
    // Status
    status: eventData.status || 'detected',
    
    // Impact
    potentialConsequences: generateConsequences(eventData.severity || 'medium', category),
    affectedAreas: eventData.affectedAreas || [eventData.area || 'Unknown Area'],
    businessImpact: mapBusinessImpact(eventData.severity || 'medium')
  };
  
  violations.push(violation);
  console.log('[LogViolation] Comprehensive violation logged:', violation.id);
  
  return violation;
}

export function getViolations(): ViolationEvent[] {
  return [...violations].sort((a, b) => b.timestamp - a.timestamp);
}

export function getViolationById(id: string): ViolationEvent | undefined {
  return violations.find(v => v.id === id);
}

export function updateViolationStatus(id: string, status: ViolationEvent['status'], resolvedBy?: string): boolean {
  const violation = violations.find(v => v.id === id);
  if (violation) {
    violation.status = status;
    if (status === 'resolved') {
      violation.resolvedAt = Date.now();
      violation.resolvedBy = resolvedBy;
    }
    return true;
  }
  return false;
}

export function getViolationSummary(): ViolationSummary {
  const totalViolations = violations.length;
  const sessionDuration = Date.now() - sessionStartTime;
  
  const bySeverity = violations.reduce((acc, v) => {
    acc[v.severity] = (acc[v.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byCategory = violations.reduce((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byStatus = violations.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byRiskLevel = violations.reduce((acc, v) => {
    acc[v.riskLevel] = (acc[v.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const avgConfidenceScore = violations
    .filter(v => v.confidenceScore)
    .reduce((sum, v) => sum + (v.confidenceScore || 0), 0) / 
    violations.filter(v => v.confidenceScore).length || 0;
  
  return {
    totalViolations,
    bySeverity,
    byCategory,
    byStatus,
    byRiskLevel,
    sessionDuration,
    detectionRate: totalViolations / (sessionDuration / 60000), // violations per minute
    avgConfidenceScore,
    criticalIssuesCount: violations.filter(v => v.severity === 'high').length,
    resolvedCount: violations.filter(v => v.status === 'resolved').length,
    pendingCount: violations.filter(v => v.status === 'detected').length
  };
}

export function generateReport(facilityName?: string, auditorName?: string): ExportableReport {
  const summary = getViolationSummary();
  const currentScore = 100 - (summary.bySeverity.high || 0) * 10 - (summary.bySeverity.medium || 0) * 5 - (summary.bySeverity.low || 0) * 2;
  
  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      sessionId,
      facilityName,
      auditorName,
      duration: summary.sessionDuration,
      totalScore: Math.max(0, currentScore)
    },
    summary,
    violations: getViolations(),
    recommendations: generateRecommendations(),
    complianceStatus: determineComplianceStatus(summary)
  };
}

export function clearViolations(): void {
  violations = [];
  sessionStartTime = Date.now();
  sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function exportViolationsCSV(): string {
  const headers = [
    'ID', 'Name', 'Description', 'Severity', 'Category', 'Timestamp', 
    'Risk Level', 'Status', 'Location', 'Immediate Action', 'Timeline'
  ];
  
  const rows = violations.map(v => [
    v.id,
    v.name,
    v.description,
    v.severity,
    v.category,
    new Date(v.timestamp).toISOString(),
    v.riskLevel,
    v.status,
    v.location || '',
    v.immediateAction || '',
    v.timeline || ''
  ]);
  
  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}

// Helper functions
function determineCategory(violationName: string): string {
  const name = violationName.toLowerCase();
  for (const [key, category] of Object.entries(VIOLATION_CATEGORIES)) {
    if (name.includes(key)) {
      return category;
    }
  }
  return VIOLATION_CATEGORIES.default;
}

function generateImmediateAction(severity: string, category: string): string {
  const actions = {
    high: 'STOP OPERATIONS - Address immediately before continuing',
    medium: 'Correct within the next 30 minutes',
    low: 'Address during next break or shift change'
  };
  return actions[severity as keyof typeof actions] || actions.medium;
}

function generateCorrectiveAction(violationName: string, severity: string): string {
  // This could be enhanced with a more sophisticated mapping
  const name = violationName.toLowerCase();
  if (name.includes('hand')) return 'Ensure proper handwashing procedure is followed';
  if (name.includes('glove')) return 'Replace gloves and follow proper glove protocol';
  if (name.includes('temperature')) return 'Check and adjust temperature controls';
  if (name.includes('storage')) return 'Reorganize storage following FIFO principles';
  if (name.includes('cleaning')) return 'Complete cleaning and sanitization protocol';
  
  return 'Follow standard operating procedures for this violation type';
}

function generateTimeline(severity: string): string {
  const timelines = {
    high: 'Immediate (within 5 minutes)',
    medium: '24-48 hours',
    low: '7 days'
  };
  return timelines[severity as keyof typeof timelines] || timelines.medium;
}

function findRelatedViolations(violationName: string): string[] {
  // Find violations that occurred recently and might be related
  const recentViolations = violations
    .filter(v => Date.now() - v.timestamp < 300000) // Last 5 minutes
    .filter(v => v.name !== violationName)
    .map(v => v.id);
  
  return recentViolations;
}

function generateTags(violationName: string, category: string): string[] {
  const tags = [category.toLowerCase().replace(/\s+/g, '-')];
  
  if (violationName.toLowerCase().includes('critical')) tags.push('critical');
  if (violationName.toLowerCase().includes('repeat')) tags.push('repeat-offense');
  if (violationName.toLowerCase().includes('training')) tags.push('training-needed');
  
  return tags;
}

function generateConsequences(severity: string, category: string): string[] {
  const consequences = {
    high: [
      'Immediate health risk to consumers',
      'Potential foodborne illness outbreak',
      'Regulatory enforcement action',
      'Business closure risk'
    ],
    medium: [
      'Increased contamination risk',
      'Potential customer complaints',
      'Failed health inspection',
      'Staff retraining required'
    ],
    low: [
      'Minor compliance deviation',
      'Preventive measure needed',
      'Documentation update required'
    ]
  };
  
  return consequences[severity as keyof typeof consequences] || consequences.medium;
}

function mapBusinessImpact(severity: string): 'high' | 'medium' | 'low' {
  const impact = {
    high: 'high' as const,
    medium: 'medium' as const,
    low: 'low' as const
  };
  return impact[severity as keyof typeof impact] || 'medium';
}

function generateRecommendations(): string[] {
  const summary = getViolationSummary();
  const recommendations: string[] = [];
  
  if (summary.bySeverity.high > 0) {
    recommendations.push('Implement immediate corrective actions for all critical violations');
    recommendations.push('Conduct emergency staff training on critical safety procedures');
  }
  
  if (summary.byCategory['Personal Hygiene'] > 2) {
    recommendations.push('Enhance handwashing and personal hygiene training programs');
  }
  
  if (summary.byCategory['Food Safety'] > 1) {
    recommendations.push('Review and update food safety protocols');
  }
  
  if (summary.totalViolations > 5) {
    recommendations.push('Consider additional supervision during peak operation hours');
  }
  
  recommendations.push('Schedule follow-up audit within 30 days');
  
  return recommendations;
}

function determineComplianceStatus(summary: ViolationSummary): 'compliant' | 'non_compliant' | 'needs_improvement' {
  if (summary.bySeverity.high > 0) return 'non_compliant';
  if (summary.totalViolations > 3) return 'needs_improvement';
  return 'compliant';
}