import React from 'react';

export default function AmbientBackdrop() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212, 175, 122, 0.08) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 100%, rgba(212, 175, 122, 0.04) 0%, transparent 60%),' +
            'linear-gradient(180deg, #0a0a0b 0%, #0c0c0e 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 122, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'orbDrift 18s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 124, 75, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'orbDrift 22s ease-in-out infinite reverse',
        }}
      />
      <style>{`
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(40px, -30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
