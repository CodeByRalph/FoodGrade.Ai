'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Manrope, Space_Grotesk } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-40 bg-[#F7FAFC]/90 backdrop-blur-lg border-b border-gray-200/20 shadow-sm relative overflow-hidden ${manrope.className}`}>
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#2563EB]/5 via-transparent to-[#22D3A5]/5 animate-pulse" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #2563EB 0.5px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Enhanced */}
            <div className="flex-shrink-0">
              <Link href="/" className={`flex items-center gap-2 group ${spaceGrotesk.className}`}>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#22D3A5] rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:rotate-12 shadow-lg group-hover:shadow-xl">
                    <Zap className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-[#22D3A5] rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#2563EB] to-[#22D3A5] bg-clip-text text-transparent group-hover:from-[#22D3A5] group-hover:to-[#2563EB] transition-all duration-500">
                  FoodGrade.ai
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#2563EB] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-white/60 hover:scale-105 relative group hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#22D3A5]/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 to-[#22D3A5]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </Link>
              ))}
              
              {/* Auth Buttons */}
              <div className="flex items-center gap-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-[#2563EB] hover:bg-white/60 px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                
                <Button
                  size="sm"
                  className="relative bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group overflow-hidden"
                  asChild
                >
                  <Link href="/signup" className="flex items-center gap-2 relative z-10">
                    <span>Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-white/60 transition-colors duration-300"
              >
                <div className="relative w-6 h-6">
                  <Menu className={cn(
                    "h-6 w-6 absolute transition-all duration-300 ease-in-out text-gray-700",
                    isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  )} />
                  <X className={cn(
                    "h-6 w-6 absolute transition-all duration-300 ease-in-out text-gray-700",
                    isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  )} />
                </div>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden z-50 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-72 bg-[#F7FAFC]/95 backdrop-blur-lg shadow-2xl transition-transform duration-300 ease-out transform md:hidden z-50 border-l border-gray-200/20 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center gap-2 ${spaceGrotesk.className}`}>
              <div className="w-6 h-6 bg-gradient-to-br from-[#2563EB] to-[#22D3A5] rounded-md flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-[#2563EB] to-[#22D3A5] bg-clip-text text-transparent">
                FoodGrade.ai
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              className="hover:bg-white/60 transition-colors duration-300"
            >
              <X className="h-5 w-5 text-gray-700" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-[#2563EB] px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-white/60 hover:scale-105 relative group ${
                  isMenuOpen ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 to-[#22D3A5]/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-gray-200/30 space-y-3">
            <Button
              variant="ghost"
              className="w-full text-gray-700 hover:text-[#2563EB] hover:bg-white/60 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            
            <Button
              className="relative w-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
              asChild
            >
              <Link href="/signup" className="flex items-center justify-center gap-2 relative z-10">
                <span>Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}