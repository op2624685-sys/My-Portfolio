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
    const nextVisibility = !isVideoVisible;
    setIsVideoVisible(nextVisibility);

    if (videoRef.current) {
      if (!nextVisibility) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
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

        {/* Pure Neutral Dark Overlay (Enhanced for better content contrast) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(10, 10, 12, 0.70) 75%, #0a0a0c 100%),' +
              'linear-gradient(180deg, rgba(10, 10, 12, 0.70) 0%, transparent 15%, transparent 85%, #0a0a0c 100%)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
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
      </div>

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
          gap: '12px',
          padding: '8px 16px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, rgba(20, 20, 26, 0.8) 0%, rgba(10, 10, 12, 0.9) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hover:scale-105 hover:border-emerald-500/50 opacity-60 hover:opacity-100 group"
      >
        <span className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-emerald-200/80 uppercase mr-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          Live BG
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause Background Video" : "Play Background Video"}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-emerald-400 transition-all duration-300 active:scale-90"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <button
            onClick={toggleVisibility}
            title={isVideoVisible ? "Hide Video Background" : "Show Video Background"}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-emerald-400 transition-all duration-300 active:scale-90"
          >
            {isVideoVisible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(40px, -30px) scale(1.05); }
        }
      `}</style>
    </>
  );
}
