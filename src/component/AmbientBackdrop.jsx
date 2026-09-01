import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Eye, EyeOff } from 'lucide-react';

export default function AmbientBackdrop() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; // Slightly slower for smooth cinematic flow
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVisibility = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* 4K Aesthetic Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isVideoVisible && videoLoaded ? 0.85 : 0,
          transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'none',
          transform: 'scale(1.02)',
        }}
      >
        <source src="/bg-video.webm" type="video/webm" />
      </video>

      {/* Pure Neutral Dark Overlay (No Blue Tint) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0, 0, 0, 0.08) 0%, rgba(10, 10, 12, 0.50) 75%, #0a0a0c 100%),' +
            'linear-gradient(180deg, rgba(10, 10, 12, 0.55) 0%, transparent 15%, transparent 85%, #0a0a0c 100%)',
        }}
      />


      {/* Pure Neutral Silver/White Ambient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-5%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orbDrift 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orbDrift 24s ease-in-out infinite reverse',
        }}
      />

      {/* Sleek Floating Background Video Controls (Interactive) */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '9999px',
          background: 'rgba(16, 16, 20, 0.70)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hover:border-amber-500/40 opacity-70 hover:opacity-100"
      >
        <span className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-amber-200/90 uppercase mr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Live BG
        </span>

        <button
          onClick={togglePlay}
          title={isPlaying ? "Pause Background Video" : "Play Background Video"}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-amber-300 transition-colors"
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>

        <button
          onClick={toggleVisibility}
          title={isVideoVisible ? "Hide Video Background" : "Show Video Background"}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-amber-300 transition-colors"
        >
          {isVideoVisible ? <Eye size={13} /> : <EyeOff size={13} />}
        </button>
      </div>

      <style>{`
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(40px, -30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

