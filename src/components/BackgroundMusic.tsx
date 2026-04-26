"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  musicUrl: string;
  forcePlay?: boolean;
}

export function BackgroundMusic({ musicUrl, forcePlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Helper to extract YouTube Video ID
  const getYTId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const hasInteracted = useRef(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);

  useEffect(() => {
    const interaction = () => { 
      hasInteracted.current = true; 
      // If we were waiting for an interaction to play, try now
      if (forcePlay && !isPlaying && !isManuallyPaused) {
        startPlayback();
      }
    };
    window.addEventListener('click', interaction);
    window.addEventListener('touchstart', interaction);
    return () => {
      window.removeEventListener('click', interaction);
      window.removeEventListener('touchstart', interaction);
    };
  }, [forcePlay, isPlaying, isManuallyPaused]);
  useEffect(() => {
    let url = musicUrl?.trim() || "";
    if (!url) return;

    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('.')) {
      url = `https://${url}`;
    }

    const ytId = getYTId(url);
    if (ytId) {
      setIsYoutube(true);
      
      if (!(window as any).YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const onPlayerReady = (event: any) => {
        console.log("YouTube Player Ready");
        setIsReady(true);
      };

      const onPlayerStateChange = (event: any) => {
        if (event.data === (window as any).YT.PlayerState.PLAYING) {
          setIsPlaying(true);
          setIsManuallyPaused(false);
        }
        if (event.data === (window as any).YT.PlayerState.PAUSED) {
          setIsPlaying(false);
        }
        if (event.data === (window as any).YT.PlayerState.ENDED) {
          event.target.playVideo(); 
        }
      };

      const initPlayer = () => {
        ytPlayerRef.current = new (window as any).YT.Player('yt-global-player', {
          height: '0',
          width: '0',
          videoId: ytId,
          playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: ytId,
            controls: 0,
            mute: 0,
            origin: typeof window !== 'undefined' ? window.location.origin : ''
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          }
        });
      };

      if (ytPlayerRef.current) return; // Prevent duplicate instances

      if ((window as any).YT && (window as any).YT.Player) {
        initPlayer();
      } else {
        (window as any).onYouTubeIframeAPIReady = initPlayer;
      }
    } else {
      setIsYoutube(false);
      setIsReady(true);
    }
  }, [musicUrl, isManuallyPaused]);

  const startPlayback = () => {
    if (isManuallyPaused) return; 

    if (isYoutube) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function' && isReady) {
        console.log("Starting YouTube Playback");
        ytPlayerRef.current.playVideo();
        setPendingPlay(false);
      } else {
        console.log("YouTube not ready, queuing playback");
        setPendingPlay(true);
      }
    } else if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay prevented or failed:", err);
      });
    }
  };

  useEffect(() => {
    if (isYoutube && isReady && pendingPlay && !isManuallyPaused) {
      startPlayback();
    }
  }, [isYoutube, isReady, pendingPlay, isManuallyPaused]);

  useEffect(() => {
    if (forcePlay && !isPlaying && !isManuallyPaused && (isReady || !isYoutube)) {
      startPlayback();
    }
  }, [forcePlay, isPlaying, isManuallyPaused, isReady, isYoutube]);

  // Heartbeat to ensure music is playing if it should be
  useEffect(() => {
    if (!forcePlay || isManuallyPaused || isPlaying) return;

    const interval = setInterval(() => {
      if (!isPlaying && hasInteracted.current) {
        startPlayback();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [forcePlay, isPlaying, isManuallyPaused]);

  useEffect(() => {
    const handleStartMusic = () => {
      // If we're already playing, don't do anything
      if (isPlaying) return;
      
      // Attempt playback - this is usually called from a direct user click handler
      startPlayback();
    };

    window.addEventListener('start-music', handleStartMusic);
    window.addEventListener('click', handleStartMusic, { once: true });
    window.addEventListener('touchstart', handleStartMusic, { once: true });

    return () => {
      window.removeEventListener('start-music', handleStartMusic);
      window.removeEventListener('click', handleStartMusic);
      window.removeEventListener('touchstart', handleStartMusic);
    };
  }, [forcePlay, isManuallyPaused]);

  const toggleMusic = () => {
    if (isYoutube && ytPlayerRef.current) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsManuallyPaused(true);
        setIsPlaying(false);
      } else {
        setIsManuallyPaused(false);
        ytPlayerRef.current.playVideo();
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsManuallyPaused(true);
      } else {
        setIsManuallyPaused(false);
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  if (!musicUrl) return null;

  return (
    <>
      <div 
        id="yt-global-player" 
        className={`fixed top-0 left-0 w-[1px] h-[1px] opacity-[0.01] pointer-events-none z-[-1] ${!isYoutube ? 'hidden' : ''}`} 
      />
      {!isYoutube && (
        <audio 
          ref={audioRef} 
          src={musicUrl} 
          loop 
          className="hidden"
          preload="auto"
        />
      )}
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 lg:top-auto lg:right-auto lg:bottom-10 lg:left-10 z-[100] w-12 h-12 rounded-full border-2 border-[#d4af37]/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-[#d4af37] shadow-lg shadow-[#d4af37]/20"
        whileHover={{ scale: 1.1, borderColor: '#d4af37' }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Music size={22} />
          </motion.div>
        ) : (
          <VolumeX size={22} className="opacity-60" />
        )}
      </motion.button>
    </>
  );
}
