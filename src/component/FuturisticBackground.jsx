import React from 'react';

const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, #2a1b16 0%, #1b1410 55%, #0a0706 100%)'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,179,71,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,179,71,0.05) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
          opacity: 0.6
        }} />

        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(255,179,71,0.22),rgba(196,106,43,0.05) 55%,transparent 70%)',
            filter: 'blur(2px)'
          }} />
        </div>

        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{
            width: 420,
            height: 420,
            borderRadius: '50%',
            border: '1px solid rgba(255,179,71,0.2)',
            boxShadow: '0 0 26px rgba(255,179,71,0.12)'
          }} />
          <div style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: '1px dashed rgba(196,106,43,0.3)'
          }} />
          <div style={{
            position: 'absolute',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'conic-gradient(from 90deg, rgba(255,179,71,0.0), rgba(255,179,71,0.45), rgba(196,106,43,0.0))',
            mask: 'radial-gradient(circle, transparent 58%, #000 60%)'
          }} />
        </div>

        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{ width: 520, height: 520, position: 'relative' }}>
            <span style={{
              position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)',
              width: 10, height: 10, borderRadius: '50%',
              background: '#ffb347', boxShadow: '0 0 12px #ffb347'
            }} />
            <span style={{
              position: 'absolute', bottom: '12px', right: '24px',
              width: 8, height: 8, borderRadius: '50%',
              background: '#9fd78a', boxShadow: '0 0 10px #9fd78a'
            }} />
          </div>
        </div>

        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '65%',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
          opacity: 0.45
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '25%',
            width: '50%',
            background: 'linear-gradient(90deg,transparent,rgba(255,179,71,0.18),transparent)',
            filter: 'blur(1px)'
          }} />
        </div>
    </div>
  );
};

export default FuturisticBackground;
