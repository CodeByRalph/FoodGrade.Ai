import { useRef, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface UseCallFrameOptions {
  containerId: string;
  userName?: string;
}

export function useCallFrame() {
  const callFrameRef = useRef<any>(null);

  const joinCall = async (url: string, options: UseCallFrameOptions) => {
    try {
      const container = document.getElementById(options.containerId);
      console.log('[useCallFrame] Joining call with URL:', url);
      if (!container) {
        throw new Error('Container element not found');
      }

      // Cleanup existing call frame if it exists
      if (callFrameRef.current) {
        await callFrameRef.current.destroy();
        callFrameRef.current = null;
      }

      const dailyFrame = DailyIframe.createFrame(container, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
          background: '#000000',
        },
        dailyConfig: {
          experimentalChromeVideoTrackContentHint: 'detail',
        },
        showLeaveButton: false,
        showFullscreenButton: false,
      });

      callFrameRef.current = dailyFrame;

      await dailyFrame.join({
        url,
        userName: options.userName || 'Guest',
        startVideoOff: false,
        startAudioOff: false,
      });

      console.log('[useCallFrame] Successfully created Daily.co frame');
      return dailyFrame;
    } catch (error) {
      console.error('[useCallFrame] Error joining call:', error);
      if (error instanceof Error) {
        console.error('[useCallFrame] Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      throw error;
    }
  };

  const leaveCall = async () => {
    if (callFrameRef.current) {
      await callFrameRef.current.destroy();
      callFrameRef.current = null;
    }
  };

  useEffect(() => {
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
  };
}