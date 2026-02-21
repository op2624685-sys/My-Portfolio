import React, { useState, useEffect } from 'react';

export default function TextRotation() {
  const texts = ["Om Prakash", "Java Developer"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-4xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
        Hey, I'm{' '}
        <span className="inline-block relative">
          <span
            className={`transition-all duration-500 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            } text-transparent bg-clip-text`}
            style={{
              backgroundImage: 'linear-gradient(90deg, #B8860B, #FFD700, #FFF8DC, #FFD700, #B8860B)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
              fontFamily: "'Cinzel', serif",
            }}
          >
            {texts[currentIndex]}
          </span>
        </span>
      </div>
    </div>
  );
}