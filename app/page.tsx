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
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#22D3A5]/5" />
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 md:-top-40 md:-right-40 bg-[#22D3A5]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-80 md:h-80 md:-bottom-40 md:-left-40 bg-[#2563EB]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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