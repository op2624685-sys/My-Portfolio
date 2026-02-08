import React from 'react';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Darker Animated gradient orbs */}
      <div className="absolute top-0 -left-40 w-150 h-150 bg-purple-900 rounded-full mix-blend-normal filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-900 rounded-full mix-blend-normal filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-20 w-137.5 h-137.5 bg-violet-900 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      <div className="absolute bottom-0 right-40 w-112.5 h-112.5 bg-purple-950 rounded-full mix-blend-normal filter blur-3xl opacity-15 animate-blob animation-delay-3000" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(211,45,70, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(182,12,28, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/70" />
    </div>
  );
};

export default GridBackground;
