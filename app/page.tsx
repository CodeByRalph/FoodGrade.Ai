'use client';
import React from 'react';

import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { ArrowRight, Shield, Brain, BarChart3 as ChartBar, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F7FAFC]">
        {/* Modern gradient mesh background */}
        <div className="absolute inset-0 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/30 via-[#22D3A5]/20 to-[#2563EB]/10" />
          <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(circle_at_0%_0%,_transparent_50%,_#22D3A5_100%)]" />
          <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(circle_at_100%_100%,_transparent_50%,_#2563EB_100%)]" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none h-full">
          {/* Animated mesh background */}
          <div className="absolute inset-0">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_800px_at_100%_200px,rgba(37,99,235,0.1),transparent)]" />
            <div className="absolute w-full h-full bg-[radial-gradient(circle_800px_at_0%_300px,rgba(34,211,165,0.1),transparent)]" />
            <div className="absolute w-full h-full bg-[radial-gradient(circle_600px_at_50%_0%,rgba(37,99,235,0.1),transparent)]" />
          </div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#2563EB]/30 rounded-full animate-float" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#22D3A5]/30 rounded-full animate-float-delayed" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#2563EB]/30 rounded-full animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-[#22D3A5]/30 rounded-full animate-float-delayed" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)]">
          {/* Left column - Text content */}
          <div className="text-left lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg px-4 py-2 rounded-full text-[#2563EB] text-sm mb-8">
            <Shield className="w-4 h-4" />
            Next-Generation Food Safety
            </div>
          
            <div className="space-y-4 mb-8">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 ${spaceGrotesk.className}`}>
                Tomorrow's Food Safety
              </h1>
              <p className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#2563EB] to-[#22D3A5] bg-clip-text text-transparent transform hover:-translate-y-1 transition-transform duration-300 ${spaceGrotesk.className}`}>
                Available Today
              </p>
            </div>
          
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
              Cut compliance costs by 60% while achieving perfect safety scores. Our AI-powered platform catches violations before they become problems.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2563EB] to-[#2563EB]/90 text-white px-8 py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-lg group transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                asChild
              >
                <Link href="/audit-home">
                  Start Your First Audit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-[#2563EB] hover:bg-[#2563EB]/5 px-8 py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right column - iPhone mockup */}
          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[420px] -mt-32">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/HeroMockup.png"
                alt="AI Food Safety Auditor"
                fill
                priority
                className="object-cover scale-125 hover:scale-[1.3] transition-transform duration-300"
              />
            </div>
          </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#2563EB]/20 to-[#22D3A5]/20 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-[#22D3A5]/20 to-[#2563EB]/20 rounded-full blur-xl" />
          </div>
       
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${spaceGrotesk.className}`}>
              AI for Food Safety You Can Trust
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge platform combines artificial intelligence with industry expertise to deliver unparalleled food safety monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Detection",
                description: "Real-time monitoring and instant violation detection using advanced computer vision"
              },
              {
                icon: Shield,
                title: "Compliance Assurance",
                description: "Stay compliant with food safety regulations through continuous monitoring"
              },
              {
                icon: ChartBar,
                title: "Detailed Analytics",
                description: "Comprehensive reports and insights to improve your safety practices"
              },
              {
                icon: Clock,
                title: "24/7 Monitoring",
                description: "Round-the-clock surveillance ensures nothing slips through the cracks"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-lg rounded-2xl p-6 border border-gray-100 hover:border-[#2563EB]/20 transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
              >
                <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${spaceGrotesk.className}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-[#F7FAFC]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#22D3A5]/10 rounded-3xl blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${spaceGrotesk.className}`}>
            Ready to Transform Your Food Safety?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the future of food safety monitoring with our AI-powered platform.
          </p>
          <Button
            size="lg"
            className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white px-8 py-6 rounded-xl text-lg shadow-lg"
            asChild
          >
            <Link href="/audit-home">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}