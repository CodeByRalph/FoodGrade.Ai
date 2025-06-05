import { useRef, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import EventEmitter from 'eventemitter3';

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

interface UseCallFrameOptions {
  containerId: string;
  userName?: string;
  onPerceptionEvent?: (event: PerceptionEvent) => void;
}

const eventEmitter = new EventEmitter();

export function useCallFrame() {
  const callFrameRef = useRef<any>(null);
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000;

  const setupEventListeners = (frame: any, options: UseCallFrameOptions) => {
    // Handle joining state
    frame.on('joining-meeting', () => {
      console.log('[Daily] Joining meeting...');
      eventEmitter.emit('call-joining');
    });

    // Handle perception events
    if (options.onPerceptionEvent) {
      frame.on('app-message', (event: any) => {
        if (event.event_type === 'conversation.perception_tool_call') {
          options.onPerceptionEvent?.(event);
        }
      });
    }

    // Handle connection state changes
    frame.on('joined-meeting', () => {
      console.log('[Daily] Successfully joined meeting');
      eventEmitter.emit('call-joined');
    });

    frame.on('left-meeting', () => {
      console.log('[Daily] Left meeting');
      eventEmitter.emit('call-left');
    });

    frame.on('error', (error: any) => {
      console.error('[Daily] Error:', error);
      eventEmitter.emit('call-error', error);
      
      // Attempt to reconnect on network errors
      if (error?.errorMsg?.includes('network')) {
        console.log('[Daily] Network error detected, attempting to reconnect...');
        eventEmitter.emit('call-reconnecting');
      }
    });

    // Handle network quality changes
    frame.on('network-quality-change', (quality: any) => {
      console.log('[Daily] Network quality changed:', quality);
      if (quality.threshold === 'none') {
        eventEmitter.emit('call-reconnecting');
      }
    });

    // Handle network connection changes
    frame.on('network-connection', ({ type, event }: any) => {
      console.log('[Daily] Network connection event:', type, event);
      if (type === 'interrupted') {
        eventEmitter.emit('call-reconnecting');
      }
    });
  };

  const createFrame = (container: HTMLElement) => {
    return DailyIframe.createFrame(container, {
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        background: '#000000',
      },
      showLeaveButton: false,
      showFullscreenButton: false,
      dailyConfig: {
        experimentalChromeVideoMutedUIFix: true,
        receiveSettings: {
          base: { maxQuality: 'high' },
        },
      }
    });
  };

  const joinCall = async (url: string, options: UseCallFrameOptions, retry = false) => {
    try {
      const container = document.getElementById(options.containerId);
      console.log('[useCallFrame] Joining call with URL:', url);
      
      if (!container) {
        throw new Error('Container element not found');
      }

      // Cleanup any existing call frame
      if (callFrameRef.current) {
        await callFrameRef.current.destroy();
        callFrameRef.current = null;
      }

      const dailyFrame = createFrame(container);
      callFrameRef.current = dailyFrame;

      // Set up event listeners
      setupEventListeners(dailyFrame, options);

      await dailyFrame.join({
        url,
        userName: options.userName || 'Guest',
        startVideoOff: true,
        startAudioOff: true,
        showLocalVideo: true,
        showParticipantsBar: false,
      });

      console.log('[useCallFrame] Successfully created Daily.co frame');
      return callFrameRef.current;

    } catch (error) {
      console.error('[useCallFrame] Error joining call:', error);
      
      // Implement retry logic
      if (retry && retryCount.current < MAX_RETRIES) {
        retryCount.current++;
        console.log(`[useCallFrame] Retrying... Attempt ${retryCount.current}`);
        eventEmitter.emit('call-retrying', retryCount.current);
        
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(joinCall(url, options, true));
          }, RETRY_DELAY);
        });
      }
      
      throw error;
    }
  };

  const leaveCall = async () => {
    if (callFrameRef.current) {
      try {
        eventEmitter.emit('call-leaving');
        await callFrameRef.current.leave();
      } catch (error) {
        console.error('[useCallFrame] Error leaving call:', error);
      }
      await callFrameRef.current.destroy();
      callFrameRef.current = null;
    }
  };

  useEffect(() => {
    // Reset retry count on component mount
    retryCount.current = 0;

    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
        callFrameRef.current = null;
      }
    };
  }, []);

  return {
    joinCall,
    leaveCall,
    callFrame: callFrameRef.current,
    eventEmitter,
  };
}