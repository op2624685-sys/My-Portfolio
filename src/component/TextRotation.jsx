import React, { useState, useEffect, useMemo } from 'react';

export default function TextRotation({ size = 'md', words = ['Java', 'Backend', 'Microservices', 'REST APIs'] }) {
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
    ? 'linear-gradient(135deg, #fff2e0 0%, #f3c892 40%, #e6a756 75%, #c97f34 100%)'
    : 'linear-gradient(135deg, #f8e1bf 0%, #e6a756 100%)';

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 500,
        fontSize,
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        // Extra padding on the right so the blinking cursor never overflows
        // the reserved width of the longest word.
        paddingRight: '0.45ch',
      }}
    >
      {/* Ghost: invisible spacer that locks the span's width to the longest word */}
      <span style={{ visibility: 'hidden', whiteSpace: 'pre' }} aria-hidden="true">
        {longestText}
      </span>

      {/* Animated: absolutely positioned over the ghost so it can shrink/grow
          without affecting surrounding layout (navbar, hero, etc.). */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'pre',
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {displayText || ' '}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 1.5,
            height: isLarge ? '1em' : '0.95em',
            background: '#d4af7a',
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
