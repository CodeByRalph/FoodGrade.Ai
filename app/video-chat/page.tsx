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

const TAVUS_API_KEY = '483ca82d99f948e88d3a238c9d194b19';

export default function VideoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const callWrapperRef = useRef<HTMLDivElement>(null);
  const callFrameRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function createCall() {
      try {
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
          url: 'https://foodgradeai.daily.co/audit-room',
          token: TAVUS_API_KEY,
        });

        // Initialize Tavus conversation
        const tavusResponse = await fetch('https://api.tavus.io/v1/conversations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${TAVUS_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            persona: 'food-safety-auditor',
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
      });
      
      // Clear the stream reference
      streamRef.current = null;
    }
    
    // Explicitly revoke any persistent permissions
    if (navigator.permissions && navigator.permissions.revoke) {
      navigator.permissions.query({ name: 'camera' as PermissionName })
        .then(permission => {
          if (permission.state !== 'denied') {
            // @ts-ignore - Types don't include revoke yet
            navigator.permissions.revoke({ name: 'camera' });
          }
        })
        .catch(console.error);
    }

    router.push('/audit-overview');
  };

  useEffect(() => {
    const demoMessages = [
      "Hi there! How can I help you today?",
      "I understand you're interested in food safety practices.",
      "Let's start by reviewing your current procedures.",
      "Could you show me your food storage area?",
    ];

    const interval = setInterval(() => {
      setMessageCounter(prev => {
        if (prev >= demoMessages.length) return prev;
        const newMessage = {
          id: prev,
          text: demoMessages[prev]
        };
        setMessages([newMessage]);
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Video Container */}
      <div className="h-full w-full flex items-center justify-center">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        />
        {/* Camera Preview */}
        <div className="absolute top-4 right-4 w-32 h-48 rounded-lg overflow-hidden shadow-lg border border-white/20">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
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
