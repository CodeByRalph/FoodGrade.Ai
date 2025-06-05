'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, PhoneOff, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import DailyIframe from '@daily-co/daily-js';

const TAVUS_API_KEY = process.env.NEXT_PUBLIC_TAVUS_API_KEY;

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
        // Create a Daily.js room
        const response = await fetch('https://api.daily.co/v1/rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,
          },
          body: JSON.stringify({
            properties: {
              exp: Math.round(Date.now() / 1000) + 3600, // Expire in 1 hour
            },
          }),
        });

        const { url: roomUrl } = await response.json();

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
          url: roomUrl,
          token: TAVUS_API_KEY,
        });

        // Initialize Tavus conversation
        const tavusResponse = await fetch('https://api.tavus.io/v1/conversations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TAVUS_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initialPrompt: 'Begin food safety audit inspection',
          }),
        });

        const { conversationId } = await tavusResponse.json();
        startConversation(conversationId);

      } catch (err) {
        console.error('Error setting up call:', err);
      }
    }

    createCall();

    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
      }
    };
  }, []);

  const startConversation = useCallback(async (conversationId: string) => {
    const eventSource = new EventSource(
      `https://api.tavus.io/v1/conversations/${conversationId}/stream`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: data.transcript,
        isAI: true,
      }]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
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
