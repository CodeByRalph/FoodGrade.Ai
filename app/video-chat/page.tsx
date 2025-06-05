'use client'

import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

// Extend Window interface to include _dailyCallObject
declare global {
  interface Window {
    _dailyCallObject?: any;
  }
}

// Define types for Daily.co participants
interface DailyTrack {
  state: string;
  persistentTrack?: MediaStreamTrack;
}

interface DailyParticipant {
  user_name?: string;
  tracks: {
    video?: DailyTrack;
    audio?: DailyTrack;
  };
}

interface RemoteParticipants {
  [participantId: string]: DailyParticipant;
}

const getOrCreateCallObject = () => {
  // Use a property on window to store the singleton
  if (!window._dailyCallObject) {
    window._dailyCallObject = DailyIframe.createCallObject();
  }
  return window._dailyCallObject;
};

const MeetingRoom = () => {
  const callRef = useRef(null);
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipants>({});

  useEffect(() => {
    const get_conversation_url = async () => {
      const response = await fetch('/api/tavus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.conversation_url;
    }

    const join_meeting = async () => {
      const conversation_url = await get_conversation_url();
      console.log('[VideoChat] Conversation URL:', conversation_url);
      // Only create or get one call object per page
      const call = getOrCreateCallObject();
      callRef.current = call;

      // Join meeting
      call.join({ url: conversation_url});

      // Handle remote participants
      const updateRemoteParticipants = () => {
        const participants = call.participants();
        const remotes: RemoteParticipants = {};
        Object.entries(participants).forEach(([id, p]) => {
          if (id !== 'local') remotes[id] = p as DailyParticipant;
        });
        setRemoteParticipants(remotes);
    };

    call.on('participant-joined', updateRemoteParticipants);
    call.on('participant-updated', updateRemoteParticipants);
    call.on('participant-left', updateRemoteParticipants);

    // Cleanup
    return () => {
      call.leave();
    };
    }

    join_meeting();

  }, []);

  // Attach remote video and audio tracks
  useEffect(() => {
    Object.entries(remoteParticipants).forEach(([id, p]) => {
      // Video
      const videoEl = document.getElementById(`remote-video-${id}`) as HTMLVideoElement;
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack
      ) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      // Audio
      const audioEl = document.getElementById(`remote-audio-${id}`) as HTMLAudioElement;
      if (
        audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack
      ) {
        audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
      }
    });
  }, [remoteParticipants]);

  // Custom UI
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <span className="font-semibold">Meeting Room (daily-js custom UI)</span>
      </header>
      <main className="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
      {Object.entries(remoteParticipants).map(([id, p]) => (
        <div
          key={id}
          className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video w-48"
        >
          <video
            id={`remote-video-${id}`}
            autoPlay
            playsInline
            className="w-1/3 h-1/3 object-contain mx-auto"
          />
          <audio id={`remote-audio-${id}`} autoPlay playsInline />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
            {p.user_name || id.slice(-4)}
          </div>
        </div>
      ))}
    </main>
    </div>
  );
};

export default MeetingRoom;