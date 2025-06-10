'use client'

import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Minimize2, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logViolation } from '@/ai-tools/log_violation';
import { realTimeCoaching } from '@/ai-tools/real_time_coaching';
import { updateAuditScore, getCurrentScore } from '@/ai-tools/update_audit_score';

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

interface CoachingMessage {
  id: string;
  text: string;
  timestamp: number;
  severity: 'high' | 'medium' | 'low';
}

interface CameraDevice {
  deviceId: string;
  label: string;
  facingMode?: string;
}

// Enhanced Camera Manager Class
class CameraManager {
  private currentStream: MediaStream | null = null;
  private availableCameras: CameraDevice[] = [];
  private currentCameraIndex = 0;
  private videoElement: HTMLVideoElement | null = null;
  private dailyCall: any = null;
  private isInitialized = false;

  async initialize(videoElement: HTMLVideoElement, dailyCall?: any) {
    this.videoElement = videoElement;
    this.dailyCall = dailyCall;
    
    // Request permissions first
    await this.requestPermissions();
    await this.enumerateDevices();
    await this.startCamera(0);
    this.isInitialized = true;
  }

  async requestPermissions() {
    try {
      // Request both video and audio permissions
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());
      console.log('[CameraManager] Permissions granted');
    } catch (error) {
      console.error('[CameraManager] Permission denied:', error);
      throw error;
    }
  }

  async enumerateDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableCameras = devices
        .filter(device => device.kind === 'videoinput' && device.deviceId)
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
          facingMode: this.guessFacingMode(device.label)
        }));
      
      console.log('[CameraManager] Available cameras:', this.availableCameras);
    } catch (error) {
      console.error('[CameraManager] Error enumerating devices:', error);
    }
  }

  private guessFacingMode(label: string): string {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('front') || lowerLabel.includes('user') || lowerLabel.includes('facetime')) return 'user';
    if (lowerLabel.includes('back') || lowerLabel.includes('rear') || lowerLabel.includes('environment')) return 'environment';
    return 'unknown';
  }

  async startCamera(cameraIndex: number) {
    try {
      const camera = this.availableCameras[cameraIndex];
      if (!camera) {
        console.error('[CameraManager] Camera not found at index:', cameraIndex);
        return false;
      }

      console.log('[CameraManager] Starting camera:', camera.label, camera.deviceId);

      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: { exact: camera.deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Stop previous stream
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(track => track.stop());
      }

      this.currentStream = stream;
      this.currentCameraIndex = cameraIndex;

      // Update PiP video element
      if (this.videoElement) {
        this.videoElement.srcObject = stream;
        await this.videoElement.play();
      }

      // Update Daily.co with new camera
      if (this.dailyCall && this.isInitialized) {
        await this.updateDailyCamera(camera.deviceId);
      }

      console.log('[CameraManager] Camera started successfully');
      return true;
    } catch (error) {
      console.error('[CameraManager] Error starting camera:', error);
      return false;
    }
  }

  private async updateDailyCamera(deviceId: string) {
    try {
      console.log('[CameraManager] Updating Daily.co camera to:', deviceId);
      
      // First, turn off video
      await this.dailyCall.setLocalVideo(false);
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Update input settings with new device
      await this.dailyCall.updateInputSettings({
        video: {
          deviceId: deviceId
        }
      });
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Turn video back on
      await this.dailyCall.setLocalVideo(true);
      
      console.log('[CameraManager] Daily.co camera updated successfully');
    } catch (error) {
      console.error('[CameraManager] Error updating Daily.co camera:', error);
    }
  }

  async flipCamera() {
    if (this.availableCameras.length < 2) {
      console.log('[CameraManager] Only one camera available, cannot flip');
      return false;
    }

    const nextIndex = (this.currentCameraIndex + 1) % this.availableCameras.length;
    console.log('[CameraManager] Flipping from camera', this.currentCameraIndex, 'to', nextIndex);
    
    return await this.startCamera(nextIndex);
  }

  setDailyCall(dailyCall: any) {
    this.dailyCall = dailyCall;
  }

  getCurrentCamera(): CameraDevice | null {
    return this.availableCameras[this.currentCameraIndex] || null;
  }

  getCurrentStream(): MediaStream | null {
    return this.currentStream;
  }

  getAvailableCameras(): CameraDevice[] {
    return this.availableCameras;
  }

  destroy() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }
    this.isInitialized = false;
  }
}

const getOrCreateCallObject = () => {
  // Use a property on window to store the singleton
  if (!window._dailyCallObject) {
    window._dailyCallObject = DailyIframe.createCallObject();
  }
  return window._dailyCallObject;
};

const MeetingRoom = () => {
  const callRef = useRef<any>(null);
  const cameraManagerRef = useRef<CameraManager | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipants>({});
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [auditScore, setAuditScore] = useState(100);
  const [coachingMessages, setCoachingMessages] = useState<CoachingMessage[]>([]);
  const [currentCamera, setCurrentCamera] = useState<CameraDevice | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCallJoined, setIsCallJoined] = useState(false);
  const router = useRouter();

  // Enhanced camera flip function
  const flipCamera = async () => {
    if (!cameraManagerRef.current || isFlipping || !isCallJoined) return;

    setIsFlipping(true);
    try {
      console.log('[VideoChat] Starting camera flip...');
      const success = await cameraManagerRef.current.flipCamera();
      if (success) {
        const newCamera = cameraManagerRef.current.getCurrentCamera();
        setCurrentCamera(newCamera);
        console.log('[VideoChat] Camera flipped successfully to:', newCamera?.label);
      } else {
        console.error('[VideoChat] Camera flip failed');
      }
    } catch (error) {
      console.error('[VideoChat] Error flipping camera:', error);
    } finally {
      setTimeout(() => setIsFlipping(false), 1000); // Prevent rapid clicking
    }
  };

  // Handle perception tool call events
  const handlePerceptionEvent = async (event: PerceptionEvent) => {
    console.log('[VideoChat] Perception event received:', event);
    
    try {
      const { name: toolName, arguments: toolArgs } = event.properties;
      
      // Check if this is a violation detection
      if (toolName === 'log_violation' || toolArgs.violation_type || toolArgs.violation_name) {
        console.log('[VideoChat] Violation detected:', toolArgs);
        
        // Determine severity and score deduction
        const severity = (toolArgs.severity || 'medium') as 'high' | 'medium' | 'low';
        
        // 1. Log the violation
        const violationResult = logViolation({
          name: toolArgs.violation_name || toolArgs.violation_type || 'Unknown Violation',
          severity: severity,
          description: toolArgs.description || `${severity} severity violation detected`,
          timestamp: Date.now()
        });
        
        console.log('[VideoChat] Violation logged:', violationResult);
        
        // 2. Update audit score
        const newScore = updateAuditScore(severity);
        
        // Update UI score
        setAuditScore(newScore);
        console.log('[VideoChat] Score updated to:', newScore);
        
        // 3. Get real-time coaching
        const coachingMessage = realTimeCoaching({
          violation: toolArgs.violation_name || toolArgs.violation_type || 'Unknown Violation',
          severity: severity,
          description: toolArgs.description || `${severity} severity violation detected`
        });
        
        // Add coaching message to UI
        if (coachingMessage) {
          const newCoachingMessage: CoachingMessage = {
            id: `coaching_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            text: coachingMessage,
            timestamp: Date.now(),
            severity: severity
          };
          
          setCoachingMessages(prev => [...prev.slice(-2), newCoachingMessage]); // Keep last 3 messages
          
          // Auto-remove message after 10 seconds
          setTimeout(() => {
            setCoachingMessages(prev => prev.filter(msg => msg.id !== newCoachingMessage.id));
          }, 10000);
        }
        
        console.log('[VideoChat] Real-time coaching:', coachingMessage);
      }
    } catch (error) {
      console.error('[VideoChat] Error handling perception event:', error);
    }
  };

  useEffect(() => {
    const get_conversation_url = async () => {
      const response = await fetch('/api/tavus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setConversationId(data.conversation_id);
      return data.conversation_url;
    }

    const join_meeting = async () => {
      const conversation_url = await get_conversation_url();
      console.log('[VideoChat] Conversation URL:', conversation_url);
      
      // Only create or get one call object per page
      const call = getOrCreateCallObject();
      callRef.current = call;

      // Handle remote participants
      const updateRemoteParticipants = () => {
        const participants = call.participants();
        const remotes: RemoteParticipants = {};
        Object.entries(participants).forEach(([id, p]) => {
          if (id !== 'local') remotes[id] = p as DailyParticipant;
        });
        setRemoteParticipants(remotes);
      };

      // Add perception event listener
      call.on('app-message', (event: any) => {
        console.log('[VideoChat] App message received:', event);
        
        // Handle perception tool calls from Tavus AI
        if (event.event_type === 'conversation.perception_tool_call') {
          handlePerceptionEvent(event as PerceptionEvent);
        }
      });

      // Handle call events
      call.on('joined-meeting', async () => {
        console.log('[VideoChat] Joined meeting successfully');
        setIsCallJoined(true);
        
        // Initialize camera manager after joining
        if (localVideoRef.current && !cameraManagerRef.current) {
          cameraManagerRef.current = new CameraManager();
          await cameraManagerRef.current.initialize(localVideoRef.current, call);
          setCurrentCamera(cameraManagerRef.current.getCurrentCamera());
        }
      });

      call.on('participant-joined', updateRemoteParticipants);
      call.on('participant-updated', updateRemoteParticipants);
      call.on('participant-left', updateRemoteParticipants);

      call.on('error', (error: any) => {
        console.error('[VideoChat] Daily.co error:', error);
      });

      // Join meeting with specific settings
      await call.join({ 
        url: conversation_url,
        startVideoOff: false,
        startAudioOff: false
      });

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
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      // Audio
      const audioEl = document.getElementById(`remote-audio-${id}`) as HTMLAudioElement;
      if (audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack) {
        audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
      }
    });
  }, [remoteParticipants]);

  // Get current score on mount
  useEffect(() => {
    setAuditScore(getCurrentScore());
  }, []);

  const toggleMute = () => {
    const call = callRef.current;
    if (call) {
      call.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    const call = callRef.current;
    if (call) {
      call.setLocalVideo(!isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = async () => {
    const call = callRef.current;
    if (call) {
      try {
        // End the call on Daily
        call.leave();
        
        // Stop camera manager
        if (cameraManagerRef.current) {
          cameraManagerRef.current.destroy();
        }

        // End the conversation on Tavus dashboard
        if (conversationId) {
          try {
            await fetch('/api/tavus', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ conversation_id: conversationId })
            });
            console.log('[VideoChat] Tavus conversation ended');
          } catch (error) {
            console.error('[VideoChat] Error ending Tavus conversation:', error);
          }
        }

        setIsCallActive(false);
        // Navigate to audit overview page
        router.push('/audit-overview');
      } catch (error) {
        console.error('[VideoChat] Error ending call:', error);
      }
    }
  };

  if (!isCallActive) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneOff className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-white text-2xl font-light mb-2">Call Ended</h2>
          <p className="text-gray-400">Thank you for using our service</p>
        </div>
      </div>
    );
  }

  // Get the first remote participant for main view
  const remoteParticipantEntries = Object.entries(remoteParticipants);
  const mainParticipant = remoteParticipantEntries[0];

  // Determine if current camera is front-facing for mirroring
  const isFrontCamera = currentCamera?.facingMode === 'user' || 
                       currentCamera?.label.toLowerCase().includes('front') ||
                       currentCamera?.label.toLowerCase().includes('user') ||
                       currentCamera?.label.toLowerCase().includes('facetime');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl"></div>
      
      {/* Main video container */}
      <div className="relative h-screen w-full flex items-center justify-center">
        {mainParticipant ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              id={`remote-video-${mainParticipant[0]}`}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <audio id={`remote-audio-${mainParticipant[0]}`} autoPlay playsInline />
            
            {/* Participant name overlay */}
            <div className="absolute top-8 left-8 bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl">
              <p className="text-white font-medium text-lg">
                {mainParticipant[1].user_name || 'AI Safety Inspector'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-white text-2xl font-light mb-2">Connecting to AI Inspector...</h2>
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Picture-in-Picture local video */}
      <div className="absolute top-6 right-6 w-24 h-32 bg-gray-800 rounded-xl overflow-hidden shadow-xl border-2 border-white/20">
        {!isVideoOff ? (
          <div className="relative w-full h-full">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isFrontCamera ? 'transform scale-x-[-1]' : ''}`}
            />
            
            {/* Camera flip button */}
            <button 
              onClick={flipCamera}
              disabled={isFlipping || !isCallJoined}
              className={`absolute bottom-1 left-1 w-6 h-6 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-all duration-200 group hover:scale-110 ${isFlipping || !isCallJoined ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={!isCallJoined ? 'Connecting...' : 'Flip camera'}
            >
              <RotateCcw className={`w-3 h-3 text-white transition-transform duration-500 ${isFlipping ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            </button>
            
            {/* Camera mode indicator */}
            <div className="absolute top-1 left-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
              <span className="text-white text-xs font-medium">
                {currentCamera?.facingMode === 'user' ? 'Front' : 
                 currentCamera?.facingMode === 'environment' ? 'Rear' : 
                 currentCamera?.label.includes('front') || currentCamera?.label.includes('facetime') ? 'Front' :
                 currentCamera?.label.includes('back') || currentCamera?.label.includes('rear') ? 'Rear' : 'Cam'}
              </span>
            </div>
            
            {/* Connection status indicator */}
            {!isCallJoined && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <VideoOff className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-2xl px-4 py-3 rounded-xl border border-white/10">
          {/* Mute button */}
          <button
            onClick={toggleMute}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25' 
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4 text-white" />
            )}
          </button>

          {/* End call button */}
          <button 
            onClick={endCall}
            className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl shadow-red-500/30 hover:scale-105"
          >
            <PhoneOff className="w-5 h-5 text-white" />
          </button>

          {/* Video toggle button */}
          <button
            onClick={toggleVideo}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isVideoOff 
                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25' 
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-4 h-4 text-white" />
            ) : (
              <Video className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Additional participants (if more than one) */}
      {remoteParticipantEntries.length > 1 && (
        <div className="absolute bottom-28 left-6 flex flex-col space-y-2">
          {remoteParticipantEntries.slice(1).map(([id, participant]) => (
            <div key={id} className="w-16 h-22 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
              <video
                id={`remote-video-small-${id}`}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Call status and score */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl">
        <p className="text-white font-medium">
          {!isCallJoined ? 'Connecting...' : `Score: ${auditScore}/100`}
        </p>
      </div>

      {/* Real-time coaching messages */}
      <div className="absolute bottom-24 left-6 right-6 flex flex-col gap-3 pointer-events-none">
        {coachingMessages.map(message => (
          <div
            key={message.id}
            className={`bg-black/70 backdrop-blur-md px-4 py-3 rounded-xl max-w-md animate-fade-in ${
              message.severity === 'high' ? 'border-l-4 border-red-500' :
              message.severity === 'medium' ? 'border-l-4 border-yellow-500' :
              'border-l-4 border-blue-500'
            }`}
          >
            <p className="text-white text-sm font-medium leading-relaxed">
              {message.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingRoom;