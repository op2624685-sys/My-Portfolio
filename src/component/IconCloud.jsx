import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

export const IconCloud = ({ slugs = [] }) => {
  const containerRef = useRef(null);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const radius = isMobile ? 150 : 300;

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);

  const startAutoRotation = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      rotationY: '+=360',
      duration: 20,
      repeat: -1,
      ease: 'none',
    });
  };

  useEffect(() => {
    if (!isMobile) {
      startAutoRotation();
    }
    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, [isMobile, radius]);

  const handleStart = (clientX, clientY) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = clientX;
    startY.current = clientY;
    gsap.killTweensOf(containerRef.current);
    currentRotationX.current = gsap.getProperty(containerRef.current, 'rotationX') || 0;
    currentRotationY.current = gsap.getProperty(containerRef.current, 'rotationY') || 0;
  };

  const handleMove = (clientX, clientY) => {
    if (isMobile || !isDragging.current) return;
    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;
    currentRotationY.current += deltaX * 0.5;
    currentRotationX.current -= deltaY * 0.5;
    gsap.set(containerRef.current, {
      rotationY: currentRotationY.current,
      rotationX: currentRotationX.current,
    });
    startX.current = clientX;
    startY.current = clientY;
  };

  const handleEnd = () => {
    if (isMobile || !isDragging.current) return;
    isDragging.current = false;
    startAutoRotation();
  };

  const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
  const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const onMouseUp = () => handleEnd();
  const onTouchStart = (e) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

  // 3D Ball Layout
  const ballIcons = slugs.map((slug, i) => {
    const N = slugs.length;
    const phi = Math.acos(1 - 2 * (i / N));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      slug,
      x: Math.cos(theta) * Math.sin(phi) * radius,
      y: Math.cos(phi) * radius,
      z: Math.sin(theta) * Math.sin(phi) * radius,
    };
  });

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          maxWidth: '400px',
          margin: '0 auto',
          padding: '2rem',
          perspective: '1000px'
        }}
      >
        {slugs.map((slug, idx) => (
          <motion-div
            key={slug}
            style={{
              width: 56,
              height: 56,
              display: 'grid',
              placeItems: 'center',
              position: 'relative',
              animation: `float ${3 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${idx * 0.2}s`
            }}
          >
            <img
              src={`https://cdn.simpleicons.org/${slug}`}
              alt={slug}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(212, 175, 122, 0.4))',
              }}
            />
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}</style>
          </motion-div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'relative',
        width: radius * 2,
        height: radius * 2,
        transformStyle: 'preserve-3d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      {ballIcons.map((icon, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            width: 64,
            height: 64,
            transform: `translate3d(${icon.x}px, ${icon.y}px, ${icon.z}px)`,
            display: 'grid',
            placeItems: 'center',
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none',
          }}
        >
          <img
            src={`https://cdn.simpleicons.org/${icon.slug}`}
            alt={icon.slug}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(212, 175, 122, 0.4))',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default IconCloud;
