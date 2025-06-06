'use client';
import React from 'react';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { ArrowRight, Shield, Brain, BarChart3 as ChartBar, Clock } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7FAFC] via-white to-[#E9FAF6] flex items-center min-h-[90vh] py-16">
        {/* Animated background mesh and floating AI particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute w-[1200px] h-[800px] left-1/2 top-[-200px] -translate-x-1/2 rounded-full blur-3xl opacity-50 bg-gradient-to-br from-[#2563EB]/30 via-[#22D3A5]/40 to-[#2563EB]/10" />
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#2563EB]/40 rounded-full animate-float" />
          <div className="absolute top-[60%] right-1/3 w-4 h-4 bg-[#22D3A5]/30 rounded-full animate-float-delayed" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 max-w-7xl w-full mx-auto px-4 sm:px-8">
          {/* Left: Text and CTAs */}
          <div className="text-left">
            {/* Animated glass badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/70 border border-[#22D3A5]/20 backdrop-blur-md shadow px-5 py-2 rounded-full text-[#22D3A5] font-medium text-base mb-7 animate-badge-pop">
              <Shield className="w-4 h-4" />
              Next-Generation Food Safety
            </div>

            <h1 className={`text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-3 ${spaceGrotesk.className}`}>
              <span className="text-[#2563EB]">Tomorrow’s Food Safety,</span>
              <br />
              <span className="bg-gradient-to-r from-[#22D3A5] via-[#38BDF8] to-[#2563EB] bg-clip-text text-transparent drop-shadow-md">
                Available Today
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-700 max-w-xl mt-7 mb-10 leading-relaxed">
              Never fail an audit again. Instantly spot and fix risks, get real-time AI guidance, and unlock next-level kitchen performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2563EB] to-[#22D3A5] text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus-visible:ring-4 focus-visible:ring-[#2563EB]/40"
                asChild
              >
                <Link href="/audit-home">
                  Start Your First Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#2563EB]/20 text-[#2563EB] bg-white/80 backdrop-blur-md px-8 py-5 rounded-2xl font-bold text-lg shadow-lg hover:border-[#22D3A5]/50 hover:text-[#22D3A5] transition"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            {/* Social Proof */}
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <span>Trusted by top kitchens</span>
              <span className="flex -space-x-2">
                <Image src="/logo1.png" alt="Brand 1" width={32} height={32} className="rounded-full" />
                <Image src="/logo2.png" alt="Brand 2" width={32} height={32} className="rounded-full" />
              </span>
            </div>
          </div>

          {/* Right: Animated AI Avatar / App Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[540px] md:w-[320px] md:h-[580px] flex items-center justify-center">
              {/* AI Avatar animation, fallback to static if no animation */}
              <Image
                src="/AuditChat.png"
                alt="AI Food Safety Auditor"
                fill
                className="object-cover rounded-2xl border-6 border-white shadow-2xl z-10"
                priority
              />
              {/* Soft mesh glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 via-[#22D3A5]/15 to-[#38BDF8]/5 blur-2xl -z-10" />
              {/* Futuristic HUD Overlay */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-gradient-to-r from-[#22D3A5]/30 to-[#2563EB]/20 blur-md rounded-full opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        {/* Top mesh accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-40 bg-gradient-to-r from-[#22D3A5]/10 to-[#2563EB]/10 blur-2xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight ${spaceGrotesk.className}`}>
              AI for Food Safety You Can Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines AI vision, industry expertise, and actionable analytics to deliver real-time food safety like never before.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Brain,
                title: "AI-Powered Detection",
                description: "Instantly spot violations and risks using advanced computer vision—before they become problems."
              },
              {
                icon: Shield,
                title: "Compliance Assurance",
                description: "Always meet standards. Our AI keeps you audit-ready and stress-free, every shift."
              },
              {
                icon: ChartBar,
                title: "Growth Analytics",
                description: "Unlock insights and track improvement with simple, powerful analytics dashboards."
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock monitoring and AI guidance—so you’re never alone on your compliance journey."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#F7FAFC]/90 rounded-2xl p-8 border border-[#E5EAF1] hover:border-[#2563EB]/40 transition-all hover:scale-105 shadow-xl group relative"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#22D3A5] rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg transition">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-lg font-bold text-gray-900 mb-2 tracking-tight ${spaceGrotesk.className}`}>{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
                {/* Micro-interaction */}
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#22D3A5]/40 opacity-0 group-hover:opacity-100 animate-ping" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#F7FAFC] to-white relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/10 via-white/30 to-[#22D3A5]/10 blur-3xl -z-10"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center relative">
          <h2 className={`text-4xl md:text-5xl font-black text-gray-900 mb-6 ${spaceGrotesk.className}`}>
            Ready to Transform Your Food Safety?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join the future of compliance with real-time AI monitoring, instant feedback, and growth insights.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#2563EB] to-[#22D3A5] hover:from-[#22D3A5] hover:to-[#2563EB] text-white px-10 py-6 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition"
            asChild
          >
            <Link href="/audit-home">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
