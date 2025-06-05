'use client';

import { useState, useEffect } from 'react';
import { Mic, PhoneOff, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCallFrame } from '@/hooks/useCallFrame';
import { getCurrentScore, resetScore, updateAuditScore } from '@/ai-tools/update_audit_score';
import { clearViolations, getViolations, logViolation } from '@/ai-tools/log_violation';
import { realTimeCoaching } from '@/ai-tools/real_time_coaching';
import { violations } from '@/lib/violations';
import { handleViolation } from '@/lib/handle-violation';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  text: string;
  isAI?: boolean;
}

interface PerceptionEvent {
  message_type: string;
  event_type: string;
  conversation_id: string;
  properties: {
    name: string;
    arguments: Record<string, any>;
    frames: string[];
  };
}

export default function VideoChat() {
  const [auditScore, setAuditScore] = useState(getCurrentScore());
  
  const [showDebug, setShowDebug] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<'idle' | 'connecting' | 'connected' | 'error' | 'rate-limited'>('idle');
  const router = useRouter();
  const { joinCall, leaveCall, eventEmitter } = useCallFrame();

  useEffect(() => {
    let cancelled = false;
    
    // Don't create multiple calls
    if (connectionState !== 'idle') return;
    
    // Reset state at start
    resetScore();
    clearViolations();
    setConnectionState('connecting');
    setAuditScore(getCurrentScore());
    
    // Set up event listeners
    const handleCallJoined = () => {
      if (cancelled) return;
      setConnectionState('connected');
      setError(null);
    };

    const handleCallError = (err: Error) => {
      if (cancelled) return;
      setConnectionState('error');
      setError(err.message);
    };

    eventEmitter.on('call-joined', handleCallJoined);
    eventEmitter.on('call-error', handleCallError);

    async function createCall() {
      try {
        setError(null);
        const tavusResponse = await fetch('/api/tavus', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!tavusResponse.ok) {
          if (tavusResponse.status === 429) {
            setConnectionState('rate-limited');
            throw new Error('Maximum concurrent conversations reached. Please try again later.');
          }
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
        
        await joinCall(data.conversation_url, { 
          containerId: 'video-container', 
          userName: 'Food Safety Auditor',
          onPerceptionEvent: async (event: PerceptionEvent) => {
            if (event.event_type === 'conversation.perception_tool_call') {
              try {
                const { name: tool, arguments: args } = event.properties;
                const response = await fetch('/api/ai-tools', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ tool, args })
                });

                if (!response.ok) {
                  throw new Error('Failed to process tool call');
                }

                const { result } = await response.json();
                if (!result) return;

                // Update UI based on tool type
                if (tool === 'update_audit_score') {
                  setAuditScore(result);
                } else if (tool === 'real_time_coaching') {
                  setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: result,
                    isAI: true
                  }]);
                }
              } catch (error) {
                console.error('[VideoChat] Tool call error:', error);
                setError('Failed to process AI feedback');
              }
            }
          },
        }, true); // Enable retry
        
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
        setConnectionState('error');
      }
    }

    createCall();

    return () => {
      // Clean up all resources
      cancelled = true;
      clearViolations();
      eventEmitter.off('call-joined', handleCallJoined);
      eventEmitter.off('call-error', handleCallError);
      leaveCall();
    };
  }, [eventEmitter, joinCall, leaveCall, connectionState]);

  const handleEndCall = async () => {
    await leaveCall();
    router.push('/audit-overview');
  };

  const simulateViolation = (violationType: 'high' | 'medium' | 'low') => {
    // Find a random violation of the specified severity
    const possibleViolations = violations.filter(v => v.severity === violationType);
    const randomViolation = possibleViolations[Math.floor(Math.random() * possibleViolations.length)];
    
    if (randomViolation) {
      console.log(`[Debug] Simulating ${violationType} severity violation:`, randomViolation);
      
      const { score, message } = handleViolation(randomViolation);
      console.log(`[Debug] New score: ${score}, Message: ${message}`);
      
      setAuditScore(score);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: message,
        isAI: true
      }]);
    }
  };

  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Debug Panel */}
      <div className={cn(
        "absolute top-0 right-0 bg-black/80 backdrop-blur-sm p-4 text-white transition-transform duration-300",
        showDebug ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Current Score: {auditScore}</h3>
          <div className="space-y-2">
            <Button 
              onClick={() => simulateViolation('high')}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Simulate High Severity
            </Button>
            <Button 
              onClick={() => simulateViolation('medium')}
              className="w-full bg-yellow-500 hover:bg-yellow-600"
            >
              Simulate Medium Severity
            </Button>
            <Button 
              onClick={() => simulateViolation('low')}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Simulate Low Severity
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Recent Violations:</h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {getViolations().map((v, i) => (
              <div key={i} className="text-sm">
                <span className={cn(
                  "inline-block px-2 py-0.5 rounded mr-2",
                  v.severity === 'high' ? "bg-red-500" :
                  v.severity === 'medium' ? "bg-yellow-500" : "bg-blue-500"
                )}>
                  {v.severity}
                </span>
                {v.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Debug Toggle Button */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
      >
        {showDebug ? 'Hide Debug' : 'Show Debug'}
      </button>

      {/* Video Container */}
      <div className="h-full w-full flex items-center justify-center">
        <div id="video-container" className="w-full h-full relative">
          {connectionState !== 'connected' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <p className="text-white text-lg">
                {connectionState === 'connecting' ? 'Connecting to video call...' : 
                 connectionState === 'rate-limited' ? 'Maximum conversations reached. Please try again later.' :
                 connectionState === 'error' ? error : 
                 'Initializing...'}
              </p>
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
          <div className="absolute bottom-0 right-0 p-4">
            <p className="text-white/80 text-sm">Score: {auditScore}</p>
          </div>
        </div>
      </div>
    </main>
  );
}