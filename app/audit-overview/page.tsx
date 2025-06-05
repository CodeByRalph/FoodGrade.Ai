'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { getViolations } from '@/ai-tools/log_violation';
import { getCurrentScore } from '@/ai-tools/update_audit_score';
  
export default function AuditOverview() {
  const currentScore = getCurrentScore();
  
  const violations = getViolations();
  
  const criticalIssues = violations.filter(v => v.severity === 'high').length;
  const mediumIssues = violations.filter(v => v.severity === 'medium').length;
  const lowIssues = violations.filter(v => v.severity === 'low').length;
  
  const highViolations = violations.filter(v => v.severity === 'high').map(v => ({
    title: v.name,
    description: v.description,
    impact: "Critical Safety Risk",
    remediation: "Immediate correction required",
    timeline: "Immediate",
    icon: AlertCircle,
    iconClass: "text-red-500",
  }));
  
  const mediumViolations = violations.filter(v => v.severity === 'medium').map(v => ({
    title: v.name,
    description: v.description,
    impact: "Moderate Risk",
    remediation: "Correction needed within 24-48 hours",
    timeline: "24-48 hours",
    icon: AlertTriangle,
    iconClass: "text-yellow-500",
  }));
  
  const lowViolations = violations.filter(v => v.severity === 'low').map(v => ({
    title: v.name,
    description: v.description,
    impact: "Minor Risk",
    remediation: "Address during routine operations",
    timeline: "7 days",
    icon: AlertTriangle,
    iconClass: "text-blue-500",
  }));
  
  const executiveSummary = {
    criticalIssues,
    strengths: violations.length === 0 ? 'All Standards Met' : `${3 - criticalIssues} Areas Meeting Standards`,
    riskLevel: criticalIssues > 0 ? 'High' : mediumIssues > 0 ? 'Moderate' : 'Low',
    description: `Audit identified ${criticalIssues} critical, ${mediumIssues} medium, and ${lowIssues} low priority issues requiring attention.`
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Audit Results</h1>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-3">Executive Summary</h2>
            <p className="text-gray-600 mb-4">{executiveSummary.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-500 h-5 w-5" />
                <span>{executiveSummary.criticalIssues} Critical Issues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>{executiveSummary.strengths} Key Strengths</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-500 h-5 w-5" />
                <span>{executiveSummary.riskLevel} Risk Level</span>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="mb-8 p-6 relative">
          <h2 className="text-xl font-semibold mb-6">Score Analysis</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Current Score</h3>
              <div className="flex items-center gap-4">
                <Progress value={currentScore} className="flex-1" />
                <span className="text-2xl font-bold">{currentScore}%</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">High Priority Findings</h2>
            <div className="space-y-4">
              {highViolations.map((finding, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-4">
                    <finding.icon className={`h-6 w-6 mt-1 ${finding.iconClass}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{finding.title}</h3>
                        <span className="text-sm font-medium text-red-600">
                          Fix within: {finding.timeline}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{finding.description}</p>
                      <div className="text-sm">
                        <p className="text-red-600 mb-1">Impact: {finding.impact}</p>
                        <p className="text-green-600">Solution: {finding.remediation}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Medium Priority Findings</h2>
            <div className="space-y-4">
              {mediumViolations.map((finding, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-4">
                    <finding.icon className={`h-6 w-6 mt-1 ${finding.iconClass}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{finding.title}</h3>
                        <span className="text-sm font-medium text-yellow-600">
                          Fix within: {finding.timeline}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{finding.description}</p>
                      <div className="text-sm">
                        <p className="text-yellow-600 mb-1">Impact: {finding.impact}</p>
                        <p className="text-green-600">Solution: {finding.remediation}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Low Priority Findings</h2>
            <div className="space-y-4">
              {lowViolations.map((finding, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-4">
                    <finding.icon className={`h-6 w-6 mt-1 ${finding.iconClass}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{finding.title}</h3>
                        <span className="text-sm font-medium text-blue-600">
                          Fix within: {finding.timeline}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{finding.description}</p>
                      <div className="text-sm">
                        <p className="text-blue-600 mb-1">Impact: {finding.impact}</p>
                        <p className="text-green-600">Solution: {finding.remediation}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}