'use client';

import { useState, useEffect } from 'react';
import { Mic, PhoneOff, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCallFrame } from '@/hooks/useCallFrame';
import { updateAuditScore, getCurrentScore, resetScore } from '@/ai-tools/update_audit_score'; 
import { logViolation, clearViolations } from '@/ai-tools/log_violation';
import { realTimeCoaching } from '@/ai-tools/real_time_coaching';
import { violations } from '@/lib/violations';

interface Message {
  id: number;
  text: string;
  isAI?: boolean;
}

interface PerceptionEvent {
  type: string;
  data: {
    query: string;
    confidence: number;
  };
}

export default function VideoChat() {
  const [auditScore, setAuditScore] = useState(getCurrentScore());
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { joinCall, leaveCall } = useCallFrame();

  const handlePerceptionEvent = (event: PerceptionEvent) => {
    if (event.type === 'perception_tool_call' && event.data.confidence > 0.8) {
      // Find matching violation
      const violation = violations.find(v => v.query === event.data.query);
      
      if (violation) {
        // Log the violation
        logViolation({
          name: violation.id,
          description: violation.description || violation.query,
          severity: violation.severity,
          timestamp: Date.now()
        });
        
        // Update score
        const newScore = updateAuditScore(violation.severity);
        setAuditScore(newScore);
        
        // Get coaching message
        const coaching = realTimeCoaching({
          violation: violation.id,
          description: violation.description || violation.query,
          severity: violation.severity
        });
        
        // Add coaching message
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: coaching,
          isAI: true
        }]);
      }
    }
  };

  useEffect(() => {
    return () => clearViolations();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function createCall() {
      resetScore();
      setAuditScore(getCurrentScore());
      
      try {
        setError(null);
        const tavusResponse = await fetch('/api/tavus', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!tavusResponse.ok) {
          const errorData = await tavusResponse.json().catch(() => null);
          throw new Error(
            errorData?.error || 
            `API error: ${tavusResponse.statusText}`
          );
        }
        
        const data = await tavusResponse.json();
        
        console.log('[VideoChat] Received conversation URL:', data.conversation_url);
        
        if (!data.conversation_url) throw new Error('Missing conversation URL from API response');
        
        console.log('[VideoChat] Attempting to join call with URL:', data.conversation_url);
        const callFrame = await joinCall(data.conversation_url, { 
          containerId: 'video-container', 
          userName: 'Food Safety Auditor' 
        });
        
        // Subscribe to perception events
        callFrame?.on('app-message', handlePerceptionEvent);
        console.log('[VideoChat] Successfully joined call');
      } catch (err) {
        console.error('[VideoChat] Error setting up call:', err);
        if (err instanceof Error) {
          console.error('[VideoChat] Error details:', {
            message: err.message,
            stack: err.stack,
            name: err.name
          });
        }
        setError(err instanceof Error ? err.message : 'Failed to setup video call');
      }
    }

    createCall();

    return () => {
      cancelled = true;
      leaveCall();
    };
  }, []);

  const handleEndCall = async () => {
    await leaveCall();
    router.push('/audit-overview');
  };

  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Video Container */}
      <div className="h-full w-full flex items-center justify-center">
        <div id="video-container" className="w-full h-full relative">
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <p className="text-white text-lg">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Messages Overlay */}
      <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-3 p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              "bg-black/50 backdrop-blur-sm px-6 py-3 rounded-2xl",
              "animate-fade-in"
            )}
          >
            <p className="text-white text-lg font-medium">
              {message.text}
            </p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-4">
        <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-4 backdrop-blur-sm transition-colors">
          <span className="sr-only">Mute</span>
          <Mic className="h-6 w-6" />
        </button>
        <button 
          onClick={handleEndCall}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 transition-colors"
        >
          <span className="sr-only">End Call</span>
          <PhoneOff className="h-6 w-6" />
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-4 backdrop-blur-sm transition-colors">
          <span className="sr-only">Switch Camera</span>
          <Camera className="h-6 w-6" />
        </button>
      </div>
    </main>
  );
}