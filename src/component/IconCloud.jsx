import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const IconCloud = ({ slugs = [] }) => {
  const containerRef = useRef(null);
  const radius = 200;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);

  const startAutoRotation = () => {
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
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    // Stop auto-rotation while dragging
    gsap.killTweensOf(containerRef.current);

    // Capture the current actual rotation to prevent snapping
    currentRotationX.current = gsap.getProperty(containerRef.current, 'rotationX') || 0;
    currentRotationY.current = gsap.getProperty(containerRef.current, 'rotationY') || 0;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    // Update rotation values based on drag distance
    // sensitivity: 0.5deg per pixel
    currentRotationY.current += deltaX * 0.5;
    currentRotationX.current -= deltaY * 0.5;

    gsap.set(containerRef.current, {
      rotationY: currentRotationY.current,
      rotationX: currentRotationX.current,
    });

    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Resume auto-rotation from the current position
    startAutoRotation();
  };

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'relative',
        width: radius * 2,
        height: radius * 2,
        transformStyle: 'preserve-3d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    >
      {icons.map((icon, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            width: 48,
            height: 48,
            transform: `translate3d(${icon.x}px, ${icon.y}px, ${icon.z}px)`,
            display: 'grid',
            placeItems: 'center',
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none',
          }}
        >
          <img
            src={`https://cdn.simpleicons.org/${icon.slug}/${icon.slug}`}
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
