'use client';

import Link from 'next/link';
import { Home, Download, Share2, Calendar, Clock, Brain, Eye, AlertTriangle as Alert, TrendingUp, MapPin, Users, Settings, FileText, BarChart3, Zap } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, TrendingDown, AlertCircle, Shield, Target, Award, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { getViolations, getViolationSummary, generateReport } from '@/ai-tools/log_violation';
import { getCurrentScore } from '@/ai-tools/update_audit_score';
  
export default function AuditOverview() {
  const currentScore = getCurrentScore();
  const violations = getViolations();
  const summary = getViolationSummary();
  const report = generateReport('Restaurant Safety Audit', 'AI Safety Inspector');
  
  const criticalIssues = summary.bySeverity.high || 0;
  const mediumIssues = summary.bySeverity.medium || 0;
  const lowIssues = summary.bySeverity.low || 0;
  const totalIssues = summary.totalViolations;
  
  const getScoreGrade = (score: number) => {
    if (score >= 95) return { grade: 'A+', color: 'text-emerald-500', bg: 'bg-emerald-500' };
    if (score >= 90) return { grade: 'A', color: 'text-emerald-500', bg: 'bg-emerald-500' };
    if (score >= 80) return { grade: 'B', color: 'text-blue-500', bg: 'bg-blue-500' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-500', bg: 'bg-orange-500' };
    return { grade: 'F', color: 'text-red-500', bg: 'bg-red-500' };
  };

  const scoreGrade = getScoreGrade(currentScore);
  const auditDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'from-emerald-500/20 to-green-500/20 border-emerald-500/30';
      case 'needs_improvement': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'non_compliant': return 'from-red-500/20 to-red-600/20 border-red-500/30';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const getComplianceText = (status: string) => {
    switch (status) {
      case 'compliant': return 'Fully Compliant';
      case 'needs_improvement': return 'Needs Improvement';
      case 'non_compliant': return 'Non-Compliant';
      default: return 'Under Review';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 md:-top-40 md:-right-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-80 md:h-80 md:-bottom-40 md:-left-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-60 md:h-60 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Navigation />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8 pb-8">
        {/* Header Section */}
        <div className="text-center space-y-3 md:space-y-4 py-6 md:py-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white/70 text-xs md:text-sm">
            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
            {auditDate}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent px-4">
            AI Safety Audit Report
          </h1>
          <p className="text-base md:text-xl text-white/60 max-w-2xl mx-auto px-4">
            Advanced AI-powered safety assessment with real-time violation detection and intelligent coaching recommendations
          </p>
        </div>

        {/* Score Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl md:rounded-3xl blur-xl"></div>
          <Card className="relative bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Score Circle */}
              <div className="flex justify-center order-1 lg:order-1">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-slate-200/20 to-slate-300/20 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center">
                      <span className="text-2xl md:text-4xl font-bold text-white">{currentScore}</span>
                      <span className="text-xs md:text-sm text-white/60">/ 100</span>
                    </div>
                  </div>
                  <div className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 md:w-12 md:h-12 ${scoreGrade.bg} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-sm md:text-lg">{scoreGrade.grade}</span>
                  </div>
                </div>
              </div>

              {/* Score Analysis */}
              <div className="space-y-3 md:space-y-4 text-center lg:text-left order-3 lg:order-2">
                <h2 className="text-xl md:text-2xl font-bold text-white">Overall Safety Rating</h2>
                <div className="space-y-2">
                  <Progress value={currentScore} className="h-2 md:h-3 bg-white/10" />
                  <div className="flex justify-between text-xs md:text-sm text-white/60">
                    <span>Critical</span>
                    <span>Excellent</span>
                  </div>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getComplianceColor(report.complianceStatus)}`}>
                  <Shield className="w-4 h-4" />
                  {getComplianceText(report.complianceStatus)}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 order-2 lg:order-3">
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl backdrop-blur-sm">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <XCircle className="w-4 h-4 md:w-6 md:h-6 text-red-400" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-white">{criticalIssues}</div>
                  <div className="text-xs text-white/60">Critical</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl backdrop-blur-sm">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <AlertTriangle className="w-4 h-4 md:w-6 md:h-6 text-yellow-400" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-white">{mediumIssues}</div>
                  <div className="text-xs text-white/60">Medium</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl backdrop-blur-sm">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-white">{lowIssues}</div>
                  <div className="text-xs text-white/60">Low</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/60">AI Confidence</p>
                <p className="text-lg md:text-xl font-bold text-white">{Math.round(summary.avgConfidenceScore * 100) || 0}%</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/60">Detection Rate</p>
                <p className="text-lg md:text-xl font-bold text-white">{summary.detectionRate.toFixed(1)}/min</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/60">Session Duration</p>
                <p className="text-lg md:text-xl font-bold text-white">{formatDuration(summary.sessionDuration)}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/60">Resolved Issues</p>
                <p className="text-lg md:text-xl font-bold text-white">{summary.resolvedCount}/{totalIssues}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Analysis */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">Violation Categories</h2>
              <p className="text-sm md:text-base text-white/70">
                AI-detected safety violations categorized by area of concern
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(summary.byCategory).map(([category, count]) => (
              <div key={category} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium text-sm md:text-base">{category}</span>
                  <span className="text-white/60 text-sm">{count}</span>
                </div>
                <Progress value={(count / totalIssues) * 100} className="h-2 bg-white/10" />
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 md:p-6 rounded-xl md:rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">AI-Generated Recommendations</h2>
              <p className="text-sm md:text-base text-white/70">
                Intelligent suggestions to improve safety compliance and prevent future violations
              </p>
            </div>
          </div>
          
          <div className="grid gap-3">
            {report.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/5 rounded-lg p-4">
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-white/90 text-sm md:text-base">{recommendation}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Violations */}
        {totalIssues > 0 ? (
          <div className="space-y-6">
            {/* Critical Issues */}
            {criticalIssues > 0 && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-red-500 rounded-md md:rounded-lg flex items-center justify-center">
                      <XCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Critical Issues</h2>
                  </div>
                  <div className="bg-red-500/20 px-2.5 py-1 md:px-3 md:py-1 rounded-full sm:ml-auto">
                    <span className="text-red-300 text-xs md:text-sm font-medium">{criticalIssues} found</span>
                  </div>
                </div>
                <div className="grid gap-3 md:gap-4">
                  {violations.filter(v => v.severity === 'high').map((violation, index) => (
                    <Card key={index} className="bg-gradient-to-r from-red-500/10 to-red-600/5 backdrop-blur-md border-red-500/30 p-4 md:p-6 rounded-xl md:rounded-2xl hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-300">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 md:mb-3">
                              <h3 className="text-base md:text-lg font-semibold text-white">{violation.name}</h3>
                              <span className="bg-red-500/20 text-red-300 px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium flex-shrink-0">
                                {violation.timeline}
                              </span>
                            </div>
                            <p className="text-sm md:text-base text-white/70 mb-3">{violation.description}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                              <div className="bg-white/10 px-3 py-2 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <MapPin className="w-3 h-3 text-red-300" />
                                  <span className="text-red-300 text-xs font-medium">Location</span>
                                </div>
                                <span className="text-white text-sm">{violation.location || 'Not specified'}</span>
                              </div>
                              <div className="bg-white/10 px-3 py-2 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Eye className="w-3 h-3 text-blue-300" />
                                  <span className="text-blue-300 text-xs font-medium">AI Confidence</span>
                                </div>
                                <span className="text-white text-sm">{Math.round((violation.confidenceScore || 0) * 100)}%</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="bg-red-500/10 px-3 py-2 rounded-lg">
                                <span className="text-red-300 text-xs font-medium">Immediate Action: </span>
                                <span className="text-white text-sm">{violation.immediateAction}</span>
                              </div>
                              <div className="bg-orange-500/10 px-3 py-2 rounded-lg">
                                <span className="text-orange-300 text-xs font-medium">Corrective Action: </span>
                                <span className="text-white text-sm">{violation.correctiveAction}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Issues */}
            {mediumIssues > 0 && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-500 rounded-md md:rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Medium Priority Issues</h2>
                  </div>
                  <div className="bg-yellow-500/20 px-2.5 py-1 md:px-3 md:py-1 rounded-full sm:ml-auto">
                    <span className="text-yellow-300 text-xs md:text-sm font-medium">{mediumIssues} found</span>
                  </div>
                </div>
                <div className="grid gap-3 md:gap-4">
                  {violations.filter(v => v.severity === 'medium').map((violation, index) => (
                    <Card key={index} className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 backdrop-blur-md border-yellow-500/30 p-4 md:p-6 rounded-xl md:rounded-2xl hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 md:mb-3">
                            <h3 className="text-base md:text-lg font-semibold text-white">{violation.name}</h3>
                            <span className="bg-yellow-500/20 text-yellow-300 px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium flex-shrink-0">
                              {violation.timeline}
                            </span>
                          </div>
                          <p className="text-sm md:text-base text-white/70 mb-2 md:mb-3">{violation.description}</p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <div className="bg-white/10 px-2.5 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg">
                              <span className="text-yellow-300 text-xs md:text-sm">Category: {violation.category}</span>
                            </div>
                            <div className="bg-white/10 px-2.5 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg">
                              <span className="text-blue-300 text-xs md:text-sm">Risk: {violation.riskLevel}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Low Issues */}
            {lowIssues > 0 && (
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-md md:rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Low Priority Issues</h2>
                  </div>
                  <div className="bg-blue-500/20 px-2.5 py-1 md:px-3 md:py-1 rounded-full sm:ml-auto">
                    <span className="text-blue-300 text-xs md:text-sm font-medium">{lowIssues} found</span>
                  </div>
                </div>
                <div className="grid gap-3 md:gap-4">
                  {violations.filter(v => v.severity === 'low').map((violation, index) => (
                    <Card key={index} className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 backdrop-blur-md border-blue-500/30 p-4 md:p-6 rounded-xl md:rounded-2xl hover:scale-[1.01] md:hover:scale-[1.02] transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 md:mb-3">
                            <h3 className="text-base md:text-lg font-semibold text-white">{violation.name}</h3>
                            <span className="bg-blue-500/20 text-blue-300 px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium flex-shrink-0">
                              {violation.timeline}
                            </span>
                          </div>
                          <p className="text-sm md:text-base text-white/70 mb-2 md:mb-3">{violation.description}</p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <div className="bg-white/10 px-2.5 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg">
                              <span className="text-blue-300 text-xs md:text-sm">Category: {violation.category}</span>
                            </div>
                            <div className="bg-white/10 px-2.5 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg">
                              <span className="text-green-300 text-xs md:text-sm">Action: {violation.correctiveAction}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Perfect Score Celebration */
          <Card className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-md border-emerald-500/30 p-6 md:p-8 rounded-2xl md:rounded-3xl text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Perfect Safety Score!</h2>
              <p className="text-base md:text-lg text-emerald-100 max-w-2xl mx-auto">
                Outstanding! Your facility achieved a perfect safety score with zero violations detected during this {formatDuration(summary.sessionDuration)} AI-powered audit session. 
                This demonstrates exceptional adherence to safety protocols and best practices.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mt-6">
                <div className="bg-white/10 px-3 py-2 md:px-4 md:py-2 rounded-lg">
                  <span className="text-emerald-300 font-medium text-sm md:text-base">🏆 Excellence Award</span>
                </div>
                <div className="bg-white/10 px-3 py-2 md:px-4 md:py-2 rounded-lg">
                  <span className="text-emerald-300 font-medium text-sm md:text-base">✨ Zero Violations</span>
                </div>
                <div className="bg-white/10 px-3 py-2 md:px-4 md:py-2 rounded-lg">
                  <span className="text-emerald-300 font-medium text-sm md:text-base">🎯 {Math.round(summary.avgConfidenceScore * 100)}% AI Confidence</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-6 md:pt-8">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-2 shadow-lg text-sm md:text-base">
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            Download Report
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-3 md:px-8 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-2 text-sm md:text-base">
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            Share Results
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-3 md:px-8 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}