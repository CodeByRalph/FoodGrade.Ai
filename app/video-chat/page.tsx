'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, PhoneOff, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
}

export default function VideoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageCounter, setMessageCounter] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }
    
    setupCamera();
    
    return () => {
      if (streamRef.current) {
        const stream = streamRef.current;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleEndCall = () => {
    // Stop all camera tracks before navigating
    if (streamRef.current) {
      // Clear video source first
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      // Then stop all tracks
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
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
