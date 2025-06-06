import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

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
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/40 via-[#22D3A5]/20 to-[#2563EB]/10" />
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_0%_0%,_transparent_50%,_#22D3A5_100%)]" />
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_100%_100%,_transparent_50%,_#2563EB_100%)]" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Abstract AI circuit pattern */}
          <div className="absolute top-1/4 right-[10%] w-64 h-64 border-2 border-[#2563EB]/20 rounded-full" />
          <div className="absolute top-1/4 right-[10%] w-64 h-64 border border-[#22D3A5]/20 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-1/4 left-[10%] w-48 h-48 border-2 border-[#22D3A5]/20 rounded-full" />
          <div className="absolute bottom-1/4 left-[10%] w-48 h-48 border border-[#2563EB]/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          
          {/* Floating elements */}
          <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-[#2563EB]/20 to-[#22D3A5]/20 rounded-lg rotate-12 animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gradient-to-bl from-[#22D3A5]/20 to-[#2563EB]/20 rounded-lg -rotate-12 animate-float-delayed" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-[#2563EB] text-sm mb-8">
            <Shield className="w-4 h-4" />
            Next-Generation Food Safety
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 ${spaceGrotesk.className}`}>
            Tomorrow's Food Safety,
            <br />
            Available Today
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionize your food safety compliance with real-time AI monitoring, instant feedback, and comprehensive reporting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white px-8 py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg text-lg group"
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
              className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/5 px-8 py-6 rounded-xl text-lg"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
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