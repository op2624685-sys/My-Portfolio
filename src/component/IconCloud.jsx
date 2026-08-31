import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useWindowSize } from '@/hooks/useWindowSize'; // Assuming this hook exists or I should create it

// Helper to get window size if hook is not available
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
  const radius = width < 768 ? 180 : 300;

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
    startAutoRotation();
    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, [radius]); // Restart when radius changes

  const handleStart = (clientX, clientY) => {
    isDragging.current = true;
    startX.current = clientX;
    startY.current = clientY;
    gsap.killTweensOf(containerRef.current);
    currentRotationX.current = gsap.getProperty(containerRef.current, 'rotationX') || 0;
    currentRotationY.current = gsap.getProperty(containerRef.current, 'rotationY') || 0;
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging.current) return;
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
    if (!isDragging.current) return;
    isDragging.current = false;
    startAutoRotation();
  };

  // Mouse events
  const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
  const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
  const onMouseUp = () => handleEnd();

  // Touch events
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };
  const onTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  const onTouchEnd = () => handleEnd();

  const icons = slugs.map((slug, i) => {
    const N = slugs.length;
    const phi = Math.acos(1 - 2 * (i / N));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.cos(theta) * Math.sin(phi) * radius;
    const y = Math.cos(phi) * radius;
    const z = Math.sin(theta) * Math.sin(phi) * radius;
    return { slug, x, y, z };
  });

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
        touchAction: 'none', // Important for touch dragging
      }}
    >
      {icons.map((icon, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            width: width < 768 ? 48 : 64,
            height: width < 768 ? 48 : 64,
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
