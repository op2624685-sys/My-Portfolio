import React, { useState, useEffect } from 'react';

export default function TextRotation() {
  const texts = ["Om Prakash", "Java Developer"];
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex % texts.length];
    const typingSpeed = isDeleting ? 45 : 85;
    const pauseAfterType = 1100;
    const pauseAfterDelete = 250;

    let timeoutId;
    if (!isDeleting && displayText === current) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseAfterType);
    } else if (isDeleting && displayText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, pauseAfterDelete);
    } else {
      timeoutId = setTimeout(() => {
        const nextText = isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1);
        setDisplayText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, textIndex, texts]);

  return (
    <div className="flex items-center justify-center">
      <div className="text-4xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
        Hey, I'm{' '}
        <span className="inline-block relative">
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #c46a2b, #ffb347, #fff1d6, #ffb347, #c46a2b)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
              fontFamily: "'Cinzel', serif",
              whiteSpace: 'pre',
            }}
          >
            {displayText}
          </span>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 2,
              height: '1.1em',
              background: '#ffb347',
              marginLeft: 3,
              transform: 'translateY(2px)',
              animation: 'cursorBlink 0.8s infinite',
            }}
          />
        </span>
      </div>
      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

