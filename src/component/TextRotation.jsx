import React, { useState, useEffect, useMemo } from 'react';

export default function TextRotation({ size = 'md', words = ['Java', 'Backend', 'Microservices', 'REST APIs'], align = 'left' }) {
  const texts = useMemo(() => words, [words]);
  // Longest word reserves the width so the surrounding layout never shifts
  // while the typed text cycles between shorter/longer strings.
  const longestText = useMemo(
    () => texts.reduce((a, b) => (a.length >= b.length ? a : b), ''),
    [texts]
  );

  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex % texts.length];
    const typingSpeed = isDeleting ? 40 : 90;
    const pauseAfterType = 1400;
    const pauseAfterDelete = 250;

    let timeoutId;
    if (!isDeleting && displayText === current) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseAfterType);
    } else if (isDeleting && displayText === '') {
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

  const fontSize = size === 'sm' ? '0.78rem' : size === 'lg' ? '2.4rem' : '1rem';
  const isLarge = size === 'lg';
  const gradient = isLarge
    ? 'linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 40%, #0ea5e9 75%, #0369a1 100%)'
    : 'linear-gradient(135deg, #bae6fd 0%, #0ea5e9 100%)';

  return (
    <span
      style={{
        position: 'relative',
        display: align === 'center' ? 'inline-flex' : 'inline-block',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        alignItems: 'center',
        fontFamily: "'Bebas Neue', sans-serif",
        fontWeight: 400,
        fontSize,
        letterSpacing: '0.05em',
        lineHeight: 1.1,
        minWidth: `${longestText.length + 0.5}ch`,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'pre',
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: isLarge ? 'drop-shadow(0 0 12px rgba(14, 165, 233, 0.4))' : 'none',
        }}
      >
        {displayText || ' '}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 1.5,
            height: isLarge ? '1em' : '0.95em',
            background: '#0ea5e9',
            marginLeft: 2,
            animation: 'rbCursor 0.85s steps(2) infinite',
            flexShrink: 0,
          }}
        />
      </span>

      <style>{`
        @keyframes rbCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </span>
  );
}
