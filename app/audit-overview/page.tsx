'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';

export default function AuditOverview() {
  const score = 85;
  const findings = [
    {
      type: "success",
      title: "Temperature Control",
      description: "All refrigerated items maintained at proper temperatures",
      icon: CheckCircle2,
      iconClass: "text-green-500",
    },
    {
      type: "warning",
      title: "Storage Organization",
      description: "Some raw meats stored above ready-to-eat foods",
      icon: AlertTriangle,
      iconClass: "text-yellow-500",
    },
    {
      type: "error",
      title: "Date Labeling",
      description: "Missing date labels on prepared foods",
      icon: XCircle,
      iconClass: "text-red-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Audit Results</h1>
        </div>
        
        {/* Score Card */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
          <div className="flex items-center gap-4 mb-2">
            <Progress value={score} className="flex-1" />
            <span className="text-2xl font-bold">{score}%</span>
          </div>
          <p className="text-sm text-gray-500">
            Based on 15 inspection points
          </p>
        </Card>

        {/* Findings */}
        <h2 className="text-xl font-semibold mb-4">Key Findings</h2>
        <div className="space-y-4">
          {findings.map((finding, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <finding.icon className={`h-6 w-6 mt-1 ${finding.iconClass}`} />
                <div>
                  <h3 className="font-semibold">{finding.title}</h3>
                  <p className="text-gray-600">{finding.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Back to Home Button */}
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