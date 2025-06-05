'use client';

import { useState, useEffect } from 'react';
import { Mic, PhoneOff, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCallFrame } from '@/hooks/useCallFrame';

interface Message {
  id: number;
  text: string;
  isAI?: boolean;
}

export default function VideoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { joinCall, leaveCall } = useCallFrame();

  useEffect(() => {
    let cancelled = false;

    async function createCall() {
      try {
        setError(null);
        const tavusResponse = await fetch('/api/tavus', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!tavusResponse.ok) {
          throw new Error(`API error: ${tavusResponse.statusText}`);
        }
        
        const data = await tavusResponse.json();
        if (!data.conversation_url) throw new Error('Missing conversation URL from API response');
        
        await joinCall(data.conversation_url, { containerId: 'video-container', userName: 'Food Safety Auditor' });
      } catch (err) {
        console.error('Error setting up call:', err);
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