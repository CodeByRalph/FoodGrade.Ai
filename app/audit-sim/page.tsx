'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuditSim() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-semibold">FoodGradeAI</h1>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-green-800">2/3</span>
            </div>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="pt-14 pb-16">
        <div className="max-w-2xl mx-auto p-4">
          {/* AI Message */}
          <div className="flex gap-4 mb-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl p-4 max-w-[85%]">
                <p className="text-gray-900">
                  Can you show me the temperatures of all of your raw meats using the thermometer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Button variant="outline" className="flex-1">
            Take Photo
          </Button>
          <Button variant="outline" className="flex-1">
            Record Video
          </Button>
        </div>
      </div>
    </main>
  );
}