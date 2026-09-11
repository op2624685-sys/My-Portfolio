import React, { useState, useEffect } from 'react';

const DEFAULT_WORDS = ['Java', 'Backend', 'Microservices', 'REST APIs'];

export default function GlitchTextRotation({
  words = DEFAULT_WORDS,
  size = 'lg',
  align = 'center'
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  const scrambleSpeed = 30;
  const pauseAfterReveal = 1800;

  useEffect(() => {
    let interval = null;
    let iteration = 0;
    const currentText = words[textIndex % words.length];

    interval = setInterval(() => {
      setDisplayText(
        currentText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return currentText[index];
            if (letter === " ") return " ";
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("")
      );

      if (iteration >= currentText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % words.length);
        }, pauseAfterReveal);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [textIndex]); // Removed 'words' to prevent reset on re-render


  const fontSize = size === 'sm' ? '0.78rem' : size === 'lg' ? '2.4rem' : '1rem';

  return (
    <span
      className="text-gradient-emerald"
      style={{
        display: align === 'center' ? 'inline-flex' : 'inline-block',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        alignItems: 'center',
        fontFamily: "'Courier New', 'JetBrains Mono', monospace",
        fontSize,
        fontWeight: 700,
        letterSpacing: '1px',
        minWidth: size === 'lg' ? '260px' : 'auto',
        display: 'inline-block',
      }}
    >
      {displayText || ' '}
    </span>
  );
}
