import React from 'react';

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function AmbientBackdrop() {
  return (
    <>
      {/*
        Future background video: replace this static image layer with a muted,
        autoPlay, loop, and playsInline video element. Keep the same z-index so
        it stays behind all page content.
      */}
      <div
        aria-hidden="true"
        className="ambient-backdrop"
        style={{
          '--desktop-background': `url("${baseUrl}/desktop-bg.png")`,
          '--mobile-background': `url("${baseUrl}/mobile-bg.png")`,
        }}
      />

      <style>{`
        .ambient-backdrop {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(2, 8, 13, 0.58), rgba(2, 8, 13, 0.7)), var(--desktop-background);
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        @media (max-width: 820px) {
          .ambient-backdrop {
            background-image: linear-gradient(rgba(2, 8, 13, 0.46), rgba(2, 8, 13, 0.66)), var(--mobile-background);
            background-position: center top;
          }
        }
      `}</style>
    </>
  );
}
