'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, PhoneOff, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import DailyIframe from '@daily-co/daily-js';

interface Message {
  id: number;
  text: string;
  isAI?: boolean;
}

export default function VideoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const callWrapperRef = useRef<HTMLDivElement>(null);
  const callFrameRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function createCall() {
      try {
        // Initialize Tavus conversation
        const tavusResponse = await fetch('https://api.tavus.io/v1/conversations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TAVUS_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            persona_id: "p589fe814765",
            conversation_name: "Food Safety Walkthrough"
          }),
        });

        const { url: conversationUrl } = await tavusResponse.json();

        if (!callWrapperRef.current) return;

        const dailyFrame = DailyIframe.createFrame(callWrapperRef.current, {
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
          },
        });

        callFrameRef.current = dailyFrame;

        await dailyFrame.join({
          url: conversationUrl,
        });
      } catch (err) {
        console.error('Error setting up call:', err);
      }
    }

    createCall();
  }, []);

  const handleEndCall = async () => {
    if (callFrameRef.current) {
      await callFrameRef.current.destroy();
    }
    router.push('/audit-overview');
  };

  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Video Container */}
      <div className="h-full w-full flex items-center justify-center">
        <div ref={callWrapperRef} className="w-full h-full" />
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
