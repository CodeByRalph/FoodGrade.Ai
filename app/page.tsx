'use client';
import React, { useState, useEffect } from 'react';
import { Manrope, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { ArrowRight, Shield, Brain, BarChart3, Clock, CheckCircle, Star, Zap, Users, TrendingUp } from 'lucide-react';

const manrope = Manrope({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// Custom CSS animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(3deg); }
    66% { transform: translateY(-5px) rotate(-3deg); }
  }
  
  @keyframes fadeInScale {
    from { 
      opacity: 0; 
      transform: scale(0.8); 
    }
    to { 
      opacity: 0.8; 
      transform: scale(1); 
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(34, 211, 165, 0.2);
    }
    50% { 
      box-shadow: 0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(34, 211, 165, 0.3);
    }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    25% { transform: translateX(0%); }
    75% { transform: translateX(300%); }
    100% { transform: translateX(400%); }
  }
  
  @keyframes backgroundShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes moveProgress {
    0% { transform: translateX(-100%); }
    25% { transform: translateX(0%); }
    75% { transform: translateX(300%); }
    100% { transform: translateX(400%); }
  }

  @keyframes triggerPulse {
    0% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.3); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.4; }
  }

  @keyframes progressTrigger {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1.4); opacity: 0; }
  }

  @keyframes pulseStep1 {
    0% { transform: scale(1); opacity: 0.5; }
    25% { transform: scale(1.3); opacity: 0.8; }
    35% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0.5; }
  }

  @keyframes pulseStep2 {
    0% { transform: scale(1); opacity: 0.5; }
    45% { transform: scale(1.3); opacity: 0.8; }
    55% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0.5; }
  }

  @keyframes pulseStep3 {
    0% { transform: scale(1); opacity: 0.5; }
    65% { transform: scale(1.3); opacity: 0.8; }
    75% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0.5; }
  }

  @keyframes pulseStep4 {
    0% { transform: scale(1); opacity: 0.5; }
    85% { transform: scale(1.3); opacity: 0.8; }
    95% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0.5; }
  }
  
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
  .animate-bg-shift { animation: backgroundShift 8s ease-in-out infinite; }
`;

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Inject Custom Styles */}
      <style jsx>{customStyles}</style>
      
      <div className={`min-h-screen bg-[#F7FAFC] ${manrope.className}`}>
        <Navigation />

      <a
  href="https://bolt.new"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed top-4 right-4 z-40 hover:scale-105 transition-transform duration-300"
  aria-label="Bolt.new Hackathon Badge"
>
  <Image
    src="/black_circle_360x360.png" // or "/bolt-badge.png" if renamed and placed in /public
    alt="Powered by Bolt.new"
    width={65}
    height={65}
    className="rounded-full drop-shadow-md hover:drop-shadow-xl"
    priority
  />
</a>


      {/* Hero Section - Enhanced with Animations */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7FAFC] via-white to-[#F7FAFC] min-h-screen">
        {/* Dynamic Animated Background System */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Continuously Moving Hex Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('2563EB').slice(1)}' fill-opacity='0.8'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translate(${mousePosition.x * 0.5 + Math.sin(Date.now() * 0.0005) * 10}px, ${mousePosition.y * 0.5 + Math.cos(Date.now() * 0.0007) * 8}px) translateY(${scrollY * 0.1}px)`,
              animation: 'backgroundShift 20s ease-in-out infinite'
            }} 
          />
          
          {/* Static Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 1.5px, transparent 0)`,
              backgroundSize: '36px 36px'
            }} 
          />

          {/* Breathing Gradient Orbs */}
          <div 
            className="absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              background: `radial-gradient(circle, rgba(37, 99, 235, ${0.1 + Math.sin(Date.now() * 0.002) * 0.05}) 0%, transparent 70%)`,
              transform: `translate(${mousePosition.x * 2 + Math.sin(Date.now() * 0.001) * 20}px, ${mousePosition.y * 2 + Math.cos(Date.now() * 0.0012) * 15}px) translateY(${scrollY * 0.2}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.2})`
            }}
          />
          <div 
            className="absolute bottom-20 right-10 w-24 h-24 sm:w-48 sm:h-48 lg:w-72 lg:h-72 rounded-full blur-2xl transition-all duration-1000 ease-out"
            style={{
              background: `radial-gradient(circle, rgba(34, 211, 165, ${0.08 + Math.sin(Date.now() * 0.0025 + 2) * 0.04}) 0%, transparent 70%)`,
              transform: `translate(${mousePosition.x * -1.5 + Math.cos(Date.now() * 0.0015) * 25}px, ${mousePosition.y * -1.5 + Math.sin(Date.now() * 0.0018) * 20}px) translateY(${scrollY * 0.15}px) scale(${1 + Math.sin(Date.now() * 0.0015 + 2) * 0.15})`
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-20 h-20 sm:w-40 sm:h-40 lg:w-60 lg:h-60 rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              background: `radial-gradient(circle, rgba(37, 99, 235, ${0.05 + Math.sin(Date.now() * 0.0012 + 1) * 0.03}) 0%, transparent 70%)`,
              transform: `translate(${mousePosition.x * 1 + Math.sin(Date.now() * 0.0008 + 3) * 18}px, ${mousePosition.y * 1 + Math.cos(Date.now() * 0.001 + 1) * 16}px) translate(-50%, -50%) translateY(${scrollY * 0.1}px) scale(${1 + Math.sin(Date.now() * 0.0012 + 1) * 0.18})`
            }}
          />

          {/* Enhanced Floating Particles with Varied Motion */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: `linear-gradient(45deg, rgba(37, 99, 235, ${0.3 + (i % 3) * 0.1}), rgba(34, 211, 165, ${0.2 + (i % 3) * 0.1}))`,
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
                transform: `translate(${mousePosition.x * (0.3 + i * 0.05) + Math.sin(Date.now() * 0.001 + i) * (10 + i * 2)}px, ${mousePosition.y * (0.3 + i * 0.05) + Math.cos(Date.now() * 0.0012 + i) * (8 + i * 1.5)}px)`,
                animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}

          {/* Sweeping Light Effects */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `conic-gradient(from ${Date.now() * 0.05}deg at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, transparent 0deg, rgba(37, 99, 235, 0.1) 45deg, transparent 90deg, rgba(34, 211, 165, 0.08) 180deg, transparent 270deg)`,
              animation: 'spin 25s linear infinite'
            }}
          />

          {/* Ripple Effects */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border opacity-20"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * 0.002 + i * 2) * 0.1})`,
                borderColor: i % 2 === 0 ? 'rgba(37, 99, 235, 0.1)' : 'rgba(34, 211, 165, 0.1)',
                borderWidth: '1px',
                animation: `pulse ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}

          {/* Dynamic Gradient Overlay */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              background: `radial-gradient(circle at ${50 + mousePosition.x * 2 + Math.sin(Date.now() * 0.001) * 10}% ${50 + mousePosition.y * 2 + Math.cos(Date.now() * 0.0012) * 8}%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)`
            }}
          />
        </div>

        <div className="relative z-10 w-full h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 sm:py-12 lg:py-16">
              
              {/* Left Content - Enhanced Animations */}
              <div className="text-left space-y-4 sm:space-y-6">
                
                {/* Innovation Badge - Animated Entry */}
                <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#22D3A5]/20 shadow-sm px-4 py-2 rounded-full text-[#2563EB] font-medium text-sm group hover:shadow-lg hover:scale-105 transition-all duration-500 hover:bg-white/90 ${isLoaded ? 'animate-in slide-in-from-left duration-700 delay-100' : 'opacity-0 -translate-x-8'}`}>
                  <div className="w-2 h-2 bg-[#22D3A5] rounded-full animate-pulse group-hover:animate-ping" />
                  <span className="group-hover:text-[#1d4ed8] transition-colors duration-300">Tomorrow's Food Safety, Today</span>
                  <Zap className="w-4 h-4 text-[#22D3A5] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                </div>

                {/* Main Headline - Dynamic Animation */}
                <div className="space-y-2 sm:space-y-3">
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 ${spaceGrotesk.className}`}>
                    <span 
                      className={`block transition-all duration-700 hover:scale-105 cursor-default ${isLoaded ? 'animate-in slide-in-from-left delay-300' : 'opacity-0 -translate-x-12'}`}
                      style={{
                        transform: `translateY(${Math.sin(Date.now() * 0.002) * 2}px)`
                      }}
                    >
                      AI-Powered
                    </span>
                    <span 
                      className={`block bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#22D3A5] bg-clip-text text-transparent transition-all duration-700 hover:from-[#22D3A5] hover:to-[#2563EB] hover:scale-105 cursor-default ${isLoaded ? 'animate-in slide-in-from-left delay-500' : 'opacity-0 -translate-x-12'}`}
                      style={{
                        backgroundSize: '200% 100%',
                        backgroundPosition: `${50 + Math.sin(Date.now() * 0.003) * 30}% 0%`,
                        transform: `translateY(${Math.sin(Date.now() * 0.0025 + 1) * 2}px)`
                      }}
                    >
                      Food Safety
                    </span>
                  </h1>
                </div>

                {/* Subheadline - Fade In Animation */}
                <p className={`text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed transition-all duration-700 ${isLoaded ? 'animate-in fade-in delay-700' : 'opacity-0'}`}>
                  Transform your kitchen with intelligent compliance monitoring that 
                  <span className="font-semibold text-[#2563EB] hover:text-[#22D3A5] transition-colors duration-300 cursor-default"> spots risks instantly</span> and guides your team to excellence.
                </p>

                {/* Trust Indicators - Dynamic Bounce */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {[
                    { icon: CheckCircle, text: "HACCP Compliant", color: "text-[#22D3A5]", delay: "delay-900" },
                    { icon: Shield, text: "FDA Standards", color: "text-[#2563EB]", delay: "delay-1000" },
                    { icon: Star, text: "Industry Trusted", color: "text-[#22D3A5] fill-current", delay: "delay-1100" }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-2 transition-all duration-500 hover:scale-110 cursor-default ${isLoaded ? `animate-in zoom-in ${item.delay}` : 'opacity-0 scale-0'}`}
                      style={{
                        transform: `translateY(${Math.sin(Date.now() * 0.002 + index * 2) * 1.5}px)`
                      }}
                    >
                      <item.icon 
                        className={`w-5 h-5 ${item.color} transition-transform duration-300 hover:rotate-12`} 
                        style={{
                          transform: `scale(${1 + Math.sin(Date.now() * 0.003 + index) * 0.1}) rotate(${Math.sin(Date.now() * 0.004 + index * 1.5) * 3}deg)`
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs - Dynamic Button Animations */}
                <div className={`flex flex-col sm:flex-row gap-4 pt-2 transition-all duration-700 ${isLoaded ? 'animate-in slide-in-from-bottom delay-1200' : 'opacity-0 translate-y-8'}`}>
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-gradient-to-r from-[#2563EB] to-[#2563EB] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 group transform-gpu animate-pulse-glow"
                    asChild
                    style={{
                      transform: `translateY(${Math.sin(Date.now() * 0.003) * 1}px)`,
                      boxShadow: `0 10px 25px rgba(37, 99, 235, ${0.3 + Math.sin(Date.now() * 0.004) * 0.1})`
                    }}
                  >
                    <Link href="/audit-home" className="inline-flex items-center gap-2">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/50 via-[#22D3A5]/20 to-[#2563EB]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          animation: 'shimmer 2s ease-in-out infinite'
                        }}
                      />
                      <span className="relative z-10">See How It Works</span>
                      <ArrowRight 
                        className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10" 
                        style={{
                          transform: `rotate(${Math.sin(Date.now() * 0.005) * 5}deg)`
                        }}
                      />
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="relative overflow-hidden border-2 border-[#2563EB]/20 text-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-500 hover:scale-105 group transform-gpu hover:shadow-lg"
                    asChild
                    style={{
                      transform: `translateY(${Math.sin(Date.now() * 0.0035 + 1) * 1}px)`,
                      borderColor: `rgba(37, 99, 235, ${0.2 + Math.sin(Date.now() * 0.004) * 0.1})`
                    }}
                  >
                    <Link href="#features" className="relative z-10">
                      <div className="absolute inset-0 bg-[#2563EB] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="relative z-10">Learn More</span>
                    </Link>
                  </Button>
                </div>
              </div>

                            {/* Right Content - Conversion-Focused Mockup */}
              <div className={`relative flex justify-center lg:justify-end h-full transition-all duration-1000 ${isLoaded ? 'animate-in slide-in-from-right delay-300' : 'opacity-0 translate-x-12'}`}>
                {/* Floating Gradient Glow Background */}
                <div 
                  className="absolute -inset-8 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${40 + Math.sin(Date.now() * 0.001) * 30}% ${35 + Math.cos(Date.now() * 0.0008) * 35}%, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.15) 40%, rgba(37, 99, 235, 0.05) 70%, transparent 90%)`,
                    transform: `translate(${Math.sin(Date.now() * 0.0007) * 40}px, ${Math.cos(Date.now() * 0.0009) * 30}px)`,
                    filter: 'blur(60px)',
                    opacity: 1
                  }}
                />
                <div 
                  className="absolute -inset-6 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${60 + Math.cos(Date.now() * 0.0012 + 2) * 25}% ${70 + Math.sin(Date.now() * 0.0015 + 1) * 20}%, rgba(34, 211, 165, 0.2) 0%, rgba(34, 211, 165, 0.12) 35%, rgba(34, 211, 165, 0.04) 65%, transparent 85%)`,
                    transform: `translate(${Math.cos(Date.now() * 0.0011 + 3) * 35}px, ${Math.sin(Date.now() * 0.0013 + 2) * 25}px)`,
                    filter: 'blur(50px)',
                    opacity: 1
                  }}
                />

                <div 
                  className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-fit transition-transform duration-300 hover:scale-[1.02] z-10"
                  style={{
                    transform: `translateY(${scrollY * 0.02}px)`,
                  }}
                >
                  
                  {/* Subtle Background Glow - Less Green */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#2563EB]/15 via-blue-50 to-[#2563EB]/5 rounded-3xl blur-2xl" />
                  
                  {/* Main Device Frame - Enhanced */}
                  <div className="relative bg-white rounded-3xl p-2 shadow-2xl border border-gray-100/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group">
                    <div className="relative aspect-[9/16] w-full max-h-[70vh] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        src="/HeroMockup.png"
                        alt="FoodGrade.ai Interface"
                        fill
                        className="object-cover rounded-2xl scale-110 transition-transform duration-700"
                        priority
                      />
                      
                      {/* Subtle Brand Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/3 via-transparent to-blue-50/30 rounded-2xl" />
                      
                      {/* Activity Indicators */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#22D3A5] rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse delay-300" />
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-600" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Value Propositions */}
                  <div 
                    className={`absolute -top-4 -left-4 bg-white shadow-xl rounded-2xl px-4 py-3 border border-blue-100 transition-all duration-500 hover:scale-110 group cursor-pointer ${isLoaded ? 'animate-in zoom-in delay-800' : 'opacity-0 scale-0'}`}
                    style={{
                      transform: `translateY(${Math.sin(Date.now() * 0.002) * 4}px)`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-blue-600 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">98% Accuracy</div>
                        <div className="text-xs text-gray-600">AI Detection</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`absolute -bottom-4 -right-4 bg-white shadow-xl rounded-2xl px-4 py-3 border border-green-100 transition-all duration-500 hover:scale-110 group cursor-pointer ${isLoaded ? 'animate-in zoom-in delay-1000' : 'opacity-0 scale-0'}`}
                    style={{
                      transform: `translateY(${Math.sin(Date.now() * 0.003 + 2) * 4}px)`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#22D3A5] to-green-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">5 Min Setup</div>
                        <div className="text-xs text-gray-600">Get Started</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`absolute top-1/2 -right-6 bg-white shadow-xl rounded-2xl px-4 py-3 border border-blue-100 transition-all duration-500 hover:scale-110 group cursor-pointer ${isLoaded ? 'animate-in zoom-in delay-1200' : 'opacity-0 scale-0'}`}
                    style={{
                      transform: `translateY(${Math.sin(Date.now() * 0.0025 + 1) * 4}px)`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-[#2563EB] rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Zero Training</div>
                        <div className="text-xs text-gray-600">Works Instantly</div>
                      </div>
                    </div>
                  </div>

                  {/* Conversion-Focused Success Metrics */}
                  <div 
                    className={`absolute -top-8 right-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg rounded-xl px-3 py-2 border border-green-200/50 transition-all duration-500 hover:scale-105 ${isLoaded ? 'animate-in slide-in-from-top delay-1400' : 'opacity-0 -translate-y-4'}`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-black text-green-700">$847</div>
                      <div className="text-xs font-semibold text-green-600">Avg Monthly Savings</div>
                    </div>
                  </div>

                  {/* Activity Pulse Animation */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div 
                      className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#2563EB]/40 rounded-full"
                      style={{
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        animationDelay: '0s'
                      }}
                    />
                    <div 
                      className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-[#22D3A5]/40 rounded-full"
                      style={{
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        animationDelay: '0.7s'
                      }}
                    />
                    <div 
                      className="absolute top-1/2 left-1/3 w-1 h-1 bg-blue-400/40 rounded-full"
                      style={{
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        animationDelay: '1.4s'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enterprise Bento Grid */}
      <section id="features" className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-[#F7FAFC] via-white to-[#F7FAFC] relative overflow-hidden">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#22D3A5" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* AI Connectivity Mesh */}
            <g stroke="url(#meshGradient)" strokeWidth="1" fill="none" className="opacity-40">
              {/* Horizontal lines */}
              <line x1="0" y1="200" x2="1200" y2="200" strokeDasharray="4,8" className="animate-pulse" />
              <line x1="0" y1="400" x2="1200" y2="400" strokeDasharray="6,6" />
              <line x1="0" y1="600" x2="1200" y2="600" strokeDasharray="4,8" className="animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Vertical lines */}
              <line x1="300" y1="0" x2="300" y2="800" strokeDasharray="5,10" />
              <line x1="600" y1="0" x2="600" y2="800" strokeDasharray="4,8" className="animate-pulse" style={{ animationDelay: '2s' }} />
              <line x1="900" y1="0" x2="900" y2="800" strokeDasharray="6,6" />
              
              {/* Connection nodes */}
              <circle cx="200" cy="200" r="3" fill="url(#meshGradient)" className="animate-pulse" />
              <circle cx="600" cy="300" r="3" fill="url(#meshGradient)" className="animate-pulse" style={{ animationDelay: '1s' }} />
              <circle cx="1000" cy="400" r="3" fill="url(#meshGradient)" className="animate-pulse" style={{ animationDelay: '2s' }} />
            </g>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-6 tracking-tight ${spaceGrotesk.className}`}>
            The Foundation of Enterprise-Grade Compliance
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Explore how FoodGrade’s values power real-time safety, accountability, and growth for your entire organization
            </p>
          </div>

          {/* Mobile Layout - Single Column */}
          <div className="lg:hidden space-y-6">
            {[
              { 
                icon: "M13 10V3L4 14h7v7l9-11h-7z", 
                title: "Innovation", 
                desc: "Cutting-edge AI and computer vision technology that transforms food safety compliance into an effortless, intelligent process." 
              },
              { 
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", 
                title: "Efficiency", 
                desc: "Streamlined automation that eliminates manual processes, saving hours of work while ensuring perfect compliance every day." 
              },
              { 
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", 
                title: "Intelligence", 
                desc: "Advanced machine learning that continuously adapts to your kitchen's unique patterns, delivering smarter insights over time." 
              },
              { 
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", 
                title: "Trust", 
                desc: "Transparent, regulatory-grade accuracy that builds customer confidence and maintains your reputation for excellence." 
              },
              { 
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", 
                title: "Support", 
                desc: "24/7 AI guidance combined with expert human assistance ensures you're never alone in maintaining perfect compliance." 
              },
              { 
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", 
                title: "Growth", 
                desc: "Transform compliance from a cost center into a competitive advantage with actionable insights that drive operational excellence." 
              }
            ].map((feature, i) => (
              <div key={i} className="group">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#2563EB]/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500 flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-black text-gray-900 mb-3 ${spaceGrotesk.className}`}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Unique Bento Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-8 relative z-10">
            
            {/* Innovation - Wide (2 columns) */}
            <div className="lg:col-span-2 group">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#2563EB]/40 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 flex-shrink-0">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-2xl lg:text-3xl font-black text-gray-900 mb-4 ${spaceGrotesk.className}`}>
                      Innovation
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Cutting-edge AI and computer vision technology that transforms food safety compliance into an effortless, intelligent process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust - Tall (2 rows) */}
            <div className="lg:row-span-2 group">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#22D3A5]/40 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#22D3A5]/5 via-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,165,0.4)] transition-all duration-500 mb-8">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  
                  <h3 className={`text-2xl lg:text-3xl font-black text-gray-900 mb-6 ${spaceGrotesk.className}`}>
                    Trust
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                    Transparent, regulatory-grade accuracy that builds customer confidence and maintains your reputation for excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Intelligence - Single */}
            <div className="group">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#2563EB]/40 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500 mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-3 ${spaceGrotesk.className}`}>
                    Intelligence
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Advanced machine learning that continuously adapts to your kitchen's unique patterns.
                  </p>
                </div>
              </div>
            </div>

            {/* Efficiency - Single */}
            <div className="group">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#2563EB]/40 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500 mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-3 ${spaceGrotesk.className}`}>
                    Efficiency
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Streamlined automation that eliminates manual processes, saving hours every day.
                  </p>
                </div>
              </div>
            </div>

            {/* Support - Single */}
            <div className="group">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#2563EB]/40 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500 mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-3 ${spaceGrotesk.className}`}>
                    Support
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    24/7 AI guidance combined with expert human assistance ensures perfect compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Growth - Wide (2 columns) */}
            <div className="lg:col-span-2 group">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90 hover:border-[#22D3A5]/40 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#22D3A5]/5 via-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,165,0.4)] transition-all duration-500 flex-shrink-0">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-2xl lg:text-3xl font-black text-gray-900 mb-4 ${spaceGrotesk.className}`}>
                      Growth
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Transform compliance from a cost center into a competitive advantage with actionable insights that drive operational excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* Enhanced Background with Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 165, 0.02) 0%, transparent 50%)`,
              filter: 'blur(40px)'
            }}
          />
          
          {/* Animated Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: `linear-gradient(45deg, rgba(37, 99, 235, ${0.2 + (i % 3) * 0.1}), rgba(34, 211, 165, ${0.1 + (i % 3) * 0.1}))`,
                left: `${15 + (i * 8) % 70}%`,
                top: `${20 + (i * 13) % 60}%`,
                transform: `translate(${Math.sin(Date.now() * 0.0008 + i) * (15 + i * 2)}px, ${Math.cos(Date.now() * 0.001 + i) * (10 + i * 1.5)}px)`,
                animation: `float ${4 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-6 tracking-tight ${spaceGrotesk.className}`}>
              How It Works
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              From setup to insights in minutes. Our AI-powered platform guides your team through every step of compliance excellence.
            </p>
          </div>

          {/* Enhanced Progress Bar with Animation - Desktop */}
          <div className="hidden xl:block mb-20">

          {/* Responsive Progress Bar for Tablet */}
          <div className="hidden lg:block xl:hidden mb-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="grid grid-cols-4 gap-0 relative">
                {/* Background Line */}
                <div 
                  className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 rounded-full"
                  style={{ zIndex: 1 }}
                />
                
                {/* Animated Progress Line */}
                <div 
                  className="absolute top-6 left-6 right-6 h-0.5 rounded-full overflow-hidden"
                  style={{ zIndex: 2 }}
                >
                  <div 
                    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-80 rounded-full animate-shimmer"
                    style={{
                      width: '25%',
                      animationDuration: '4s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      transform: 'translateX(-100%)'
                    }}
                  />
                </div>
                
                {/* Smaller circles for tablet */}
                {[
                  { num: 1, color: 'from-[#2563EB] to-[#1d4ed8]', animation: 'pulseStep1' },
                  { num: 2, color: 'from-[#22D3A5] to-[#16a085]', animation: 'pulseStep2' },
                  { num: 3, color: 'from-[#2563EB] to-[#1d4ed8]', animation: 'pulseStep3' },
                  { num: 4, color: 'from-[#22D3A5] to-[#16a085]', animation: 'pulseStep4' }
                ].map((step) => (
                  <div key={step.num} className="flex justify-center relative" style={{ zIndex: 3 }}>
                    <div 
                      className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-500 hover:scale-110 relative group`}
                    >
                      <span className="text-white font-bold text-lg relative z-10">{step.num}</span>
                      
                      {/* Triggered Pulse Effect - Every time wave passes */}
                      <div 
                        className={`absolute -inset-1 rounded-full bg-gradient-to-br ${step.color} opacity-50`}
                        style={{
                          animation: `${step.animation} 4s ease-out infinite`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-4 gap-0 relative">
                {/* Background Line - Goes through center of circles */}
                <div 
                  className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full"
                  style={{ zIndex: 1 }}
                />
                
                {/* Animated Progress Line with Moving Color Wave */}
                <div 
                  className="absolute top-8 left-8 right-8 h-1 rounded-full overflow-hidden"
                  style={{ zIndex: 2 }}
                >
                  <div 
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-80 rounded-full animate-shimmer"
                    style={{
                      width: '30%',
                      animationDuration: '4s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      transform: 'translateX(-100%)'
                    }}
                  />
                  <div 
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#22D3A5] to-transparent opacity-60 rounded-full animate-shimmer"
                    style={{
                      width: '25%',
                      animationDuration: '4s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: '0.5s',
                      transform: 'translateX(-100%)'
                    }}
                  />
                </div>
                
                {/* Step Numbers with Perfect Alignment */}
                {[
                  { num: 1, color: 'from-[#2563EB] to-[#1d4ed8]', delay: '0s', animation: 'pulseStep1' },
                  { num: 2, color: 'from-[#22D3A5] to-[#16a085]', delay: '0.2s', animation: 'pulseStep2' },
                  { num: 3, color: 'from-[#2563EB] to-[#1d4ed8]', delay: '0.4s', animation: 'pulseStep3' },
                  { num: 4, color: 'from-[#22D3A5] to-[#16a085]', delay: '0.6s', animation: 'pulseStep4' }
                ].map((step) => (
                  <div key={step.num} className="flex justify-center relative" style={{ zIndex: 3 }}>
                    <div 
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-500 hover:scale-125 hover:shadow-2xl relative group`}
                    >
                      <span className="text-white font-black text-xl relative z-10">{step.num}</span>
                      
                      {/* Triggered Pulse Effect - Every time wave passes */}
                      <div 
                        className={`absolute -inset-1 rounded-full bg-gradient-to-br ${step.color} opacity-50`}
                        style={{
                          animation: `${step.animation} 4s ease-out infinite`
                        }}
                      />
                      
                      {/* Ripple Effect on Hover */}
                      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                      
                      {/* Outer Glow Ring */}
                      <div 
                        className={`absolute -inset-2 rounded-full bg-gradient-to-br ${step.color} opacity-20 scale-110 group-hover:scale-125 transition-transform duration-500`}
                        style={{
                          animation: `spin 8s linear infinite`,
                          animationDelay: step.delay
                        }}
                      />
                      
                      {/* Progress Trigger Ring */}
                      <div 
                        className={`absolute -inset-4 rounded-full`}
                        style={{
                          animation: `${step.animation} 4s ease-out infinite`,
                          backgroundColor: step.num % 2 === 1 ? 'rgba(37, 99, 235, 0.3)' : 'rgba(34, 211, 165, 0.3)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps Grid with Staggered Animations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-6 mb-16">
            
            {/* Step 1: Onboarding & Setup */}
            <div 
              className="group relative"
              style={{
                animation: 'fadeInScale 0.8s ease-out forwards',
                animationDelay: '0.1s',
                opacity: 0
              }}
            >
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:bg-white overflow-hidden h-full">
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/8 via-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    animation: 'backgroundShift 6s ease-in-out infinite'
                  }}
                />
                
                {/* Connection Line to Next Card - Desktop */}
                <div className="hidden xl:block absolute top-20 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
                
                <div className="relative z-10 text-center">
                  {/* Mobile Step Number */}
                  <div className="xl:hidden w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 relative overflow-hidden">
                    <span className="text-white font-black relative z-10">1</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 mx-auto mb-8 relative overflow-hidden">
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-12" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#2563EB] ${spaceGrotesk.className}`}>
                    Onboarding & Setup
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-700">
                    Scan a QR code, invite your team, and connect existing systems. Our platform integrates seamlessly with your current workflow.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-[#2563EB] font-semibold group-hover:scale-105 transition-transform duration-300">
                    <Clock className="w-4 h-4 group-hover:animate-pulse" />
                    <span>5 minutes setup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Daily AI Walkthrough */}
            <div 
              className="group relative"
              style={{
                animation: 'fadeInScale 0.8s ease-out forwards',
                animationDelay: '0.3s',
                opacity: 0
              }}
            >
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:bg-white overflow-hidden h-full">
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#22D3A5]/8 via-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    animation: 'backgroundShift 6s ease-in-out infinite',
                    animationDelay: '1s'
                  }}
                />
                
                {/* Connection Lines - Desktop */}
                <div className="hidden xl:block absolute top-20 -left-3 w-6 h-0.5 bg-gradient-to-l from-[#22D3A5]/30 to-transparent" />
                <div className="hidden xl:block absolute top-20 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#22D3A5]/30 to-transparent" />
                
                <div className="relative z-10 text-center">
                  {/* Mobile Step Number */}
                  <div className="xl:hidden w-12 h-12 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 relative overflow-hidden">
                    <span className="text-white font-black relative z-10">2</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,165,0.4)] transition-all duration-500 mx-auto mb-8 relative overflow-hidden">
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#22D3A5] ${spaceGrotesk.className}`}>
                    Daily AI Walkthrough
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-700">
                    Staff follow AI-guided inspections using their mobile camera. Our virtual assistant provides real-time coaching and compliance checks.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-[#22D3A5] font-semibold group-hover:scale-105 transition-transform duration-300">
                    <Zap className="w-4 h-4 group-hover:animate-pulse" />
                    <span>AI-powered guidance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Real-Time Detection */}
            <div 
              className="group relative"
              style={{
                animation: 'fadeInScale 0.8s ease-out forwards',
                animationDelay: '0.5s',
                opacity: 0
              }}
            >
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:bg-white overflow-hidden h-full">
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/8 via-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    animation: 'backgroundShift 6s ease-in-out infinite',
                    animationDelay: '2s'
                  }}
                />
                
                {/* Connection Lines - Desktop */}
                <div className="hidden xl:block absolute top-20 -left-3 w-6 h-0.5 bg-gradient-to-l from-[#2563EB]/30 to-transparent" />
                <div className="hidden xl:block absolute top-20 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
                
                <div className="relative z-10 text-center">
                  {/* Mobile Step Number */}
                  <div className="xl:hidden w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 relative overflow-hidden">
                    <span className="text-white font-black relative z-10">3</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500 mx-auto mb-8 relative overflow-hidden">
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-500 group-hover:animate-pulse" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#2563EB] ${spaceGrotesk.className}`}>
                    Real-Time Detection
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-700">
                    AI instantly identifies violations and risks, providing immediate corrective actions. Prevent issues before they become costly problems.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-[#2563EB] font-semibold group-hover:scale-105 transition-transform duration-300">
                    <Shield className="w-4 h-4 group-hover:animate-pulse" />
                    <span>Instant alerts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Reports & Analytics */}
            <div 
              className="group relative"
              style={{
                animation: 'fadeInScale 0.8s ease-out forwards',
                animationDelay: '0.7s',
                opacity: 0
              }}
            >
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:bg-white overflow-hidden h-full">
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#22D3A5]/8 via-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    animation: 'backgroundShift 6s ease-in-out infinite',
                    animationDelay: '3s'
                  }}
                />
                
                {/* Connection Line from Previous Card - Desktop */}
                <div className="hidden xl:block absolute top-20 -left-3 w-6 h-0.5 bg-gradient-to-l from-[#22D3A5]/30 to-transparent" />
                
                <div className="relative z-10 text-center">
                  {/* Mobile Step Number */}
                  <div className="xl:hidden w-12 h-12 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 relative overflow-hidden">
                    <span className="text-white font-black relative z-10">4</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-[#22D3A5] to-[#16a085] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,165,0.4)] transition-all duration-500 mx-auto mb-8 relative overflow-hidden">
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <h3 className={`text-xl lg:text-2xl font-black text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#22D3A5] ${spaceGrotesk.className}`}>
                    Automated Analytics
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-700">
                    Comprehensive compliance reports and operational insights delivered automatically. Track trends, identify improvements, and demonstrate ROI.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-[#22D3A5] font-semibold group-hover:scale-105 transition-transform duration-300">
                    <BarChart3 className="w-4 h-4 group-hover:animate-pulse" />
                    <span>Executive dashboards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#F7FAFC] via-white to-[#F7FAFC] relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#22D3A5]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-gray-100">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-6 sm:mb-8 ${spaceGrotesk.className}`}>
              Ready to Transform Your Kitchen?
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of restaurants using AI to maintain perfect compliance and unlock operational excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1e40af] hover:to-[#1d4ed8] text-white px-8 py-5 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                asChild
              >
                <Link href="/audit-home" className="inline-flex items-center gap-2">
                  Get Smart Insights
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-[#22D3A5]" />
                <span>No credit card required</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2563EB]" />
                <span className="text-sm font-medium text-gray-700">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#22D3A5]" />
                <span className="text-sm font-medium text-gray-700">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2563EB]" />
                <span className="text-sm font-medium text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
