import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '../component/Navbar';
import JavaMain from '../component/JavaMain';

/* ─── Ambient Particle Field ─────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      alpha: 0.15 + Math.random() * 0.45, pulse: Math.random() * Math.PI * 2,
    }));
    let mx = -999, my = -999;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.pulse += 0.018;
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) { p.vx += dx / d * 0.015; p.vy += dy / d * 0.015; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196,106,43,${(1 - d / 130) * 0.22})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,179,71,${a})`;
        ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(255,179,71,0.4)';
        ctx.fill(); ctx.shadowBlur = 0;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); };
}, []);
return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

function GoldWaveBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,179,71,0.12) 0%, rgba(255,179,71,0.04) 40%, transparent 70%)',
          animation: 'goldWavePulse 2s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function GoldRippleBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '24vmax',
            height: '24vmax',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,179,71,0.7)',
            animation: `rippleExpand 4s ${i * 0.95}s ease-out infinite`,
            boxShadow: '0 0 12px rgba(255,179,71,0.3)',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Royal Geometric Decorations ───────────────────────────── */
function RoyalGeometry({ visible }) {
  if (!visible) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', top: -60, left: -60, opacity: 0.07, animation: 'geoRotate 25s linear infinite' }} width="280" height="280" viewBox="0 0 280 280">
        <polygon points="140,10 270,140 140,270 10,140" fill="none" stroke="#ffb347" strokeWidth="1" />
        <polygon points="140,40 240,140 140,240 40,140" fill="none" stroke="#c46a2b" strokeWidth="0.5" />
        <polygon points="140,70 210,140 140,210 70,140" fill="none" stroke="#ffb347" strokeWidth="0.3" />
      </svg>
      <svg style={{ position: 'absolute', bottom: -80, right: -80, opacity: 0.06, animation: 'geoRotate 30s linear infinite reverse' }} width="320" height="320" viewBox="0 0 320 320">
        <polygon points="160,10 310,160 160,310 10,160" fill="none" stroke="#ffb347" strokeWidth="1" />
        <polygon points="160,45 275,160 160,275 45,160" fill="none" stroke="#c46a2b" strokeWidth="0.5" />
      </svg>
      <svg style={{ position: 'absolute', top: 50, right: 40, opacity: 0.08, animation: 'geoRotate 20s linear infinite' }} width="110" height="110" viewBox="0 0 110 110">
        <polygon points="55,5 100,30 100,80 55,105 10,80 10,30" fill="none" stroke="#ffb347" strokeWidth="1" />
        <polygon points="55,22 83,38 83,72 55,88 27,72 27,38" fill="none" stroke="#c46a2b" strokeWidth="0.5" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 50, left: 40, opacity: 0.07, animation: 'geoRotate 18s linear infinite reverse' }} width="90" height="90" viewBox="0 0 90 90">
        <polygon points="45,5 80,25 80,65 45,85 10,65 10,25" fill="none" stroke="#ffb347" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ─── Magnetic Cursor ────────────────────────────────────────── */
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const rPos = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const dot = dotRef.current, ring = ringRef.current;
    if (!dot || !ring) return;
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);
    let id;
    const loop = () => {
      gsap.set(dot, { x: pos.current.x - 4, y: pos.current.y - 4 });
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.1;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.1;
      gsap.set(ring, { x: rPos.current.x - 18, y: rPos.current.y - 18 });
      id = requestAnimationFrame(loop);
    };
    loop();
    const onIn = () => gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.25 });
    const onOut = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 });
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', onIn);
      el.addEventListener('mouseleave', onOut);
    });
    return () => { cancelAnimationFrame(id); window.removeEventListener('mousemove', move); };
  }, []);
  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 8, height: 8, borderRadius: '50%', background: '#ffb347', boxShadow: '0 0 8px #ffb347', pointerEvents: 'none', zIndex: 99999, mixBlendMode: 'difference' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(255,179,71,0.7)', pointerEvents: 'none', zIndex: 99998 }} />
    </>
  );
}

/* ═══ INDEX PAGE ════════════════════════════════════════════════ */
const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const navbarWrapRef = useRef(null);
  const titleWrapRef = useRef(null);

  const handleIntroComplete = () => setIntroComplete(true);

  useEffect(() => {
    if (!introComplete) return;
    requestAnimationFrame(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      // Reveal navbar wrapper
      tl.fromTo(navbarWrapRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );
      // Reveal title wrapper
      tl.fromTo(titleWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.3'
      );
      // Stagger each .gs child
      tl.fromTo(
        titleWrapRef.current?.querySelectorAll('.gs') || [],
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.13 },
        '-=0.2'
      );
    });
  }, [introComplete]);

  return (
    <>
      <style>{`
        @keyframes shimmer      { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes geoRotate    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes goldWavePulse { 0%,100%{opacity:0.4;transform:scale(0.95)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes rippleExpand  { 0%{transform:scale(0.2);opacity:0.8} 100%{transform:scale(6);opacity:0} }
        @keyframes floatBadge   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes namePulse    { 0%,100%{filter:drop-shadow(0 0 10px rgba(255,179,71,0.2))} 50%{filter:drop-shadow(0 0 26px rgba(255,179,71,0.5))} }
        @keyframes underlineIn  { from{width:0;opacity:0} to{width:100%;opacity:1} }
        @keyframes dotPulse     { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.6)} 70%{box-shadow:0 0 0 7px rgba(34,197,94,0)} }
        @keyframes dividerIn    { from{opacity:0;transform:scaleX(0)} to{opacity:1;transform:scaleX(1)} }
      `}</style>

      {/* ── Always-on layers ── */}
      <ParticleField />
      <GoldWaveBackground />
      <GoldRippleBackground />
      <RoyalGeometry visible={introComplete} />
      <MagneticCursor />

      {/*
        ─────────────────────────────────────────────────────────────
        LAYOUT STRATEGY
        ─────────────────────────────────────────────────────────────
        The whole page is a normal flex column. Nothing has opacity:0
        as a wrapper — instead we hide individual sections (navbar,
        title) and reveal them with GSAP after intro.

        JavaMain renders TWO things:
          1. position:fixed fullscreen overlay (zIndex 9999) — intro animation
             This is ALWAYS visible because it's fixed to the viewport.
          2. A <section> in the normal flow — the final code card slot.
             The GSAP shrink animates the overlay down to this slot's position.

        Key insight: we never wrap JavaMain in opacity:0. The overlay
        is fixed so it doesn't need a visible parent to show.
        ─────────────────────────────────────────────────────────────
      */}
      <div className="h-screen flex flex-col overflow-hidden">

        {/* Navbar — hidden until intro done, revealed by GSAP */}
        <div ref={navbarWrapRef} style={{ opacity: 0, flexShrink: 0 }}>
          <Navbar />
        </div>

        {/* Title — hidden until intro done, revealed by GSAP */}
        <div ref={titleWrapRef} style={{ opacity: 0, flexShrink: 0 }}>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            paddingTop: '1.2rem', paddingBottom: '0.4rem'
          }}>
            <div style={{ textAlign: 'center', padding: '0 1rem', maxWidth: 720 }}>

              {/* Available pill */}
              <div className="gs" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                marginBottom: '0.9rem', padding: '0.25rem 0.9rem',
                border: '1px solid rgba(255,179,71,0.14)', borderRadius: '999px',
                background: 'rgba(58,31,21,0.16)', backdropFilter: 'blur(8px)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#7fb069',
                  display: 'inline-block', animation: 'dotPulse 2s ease-in-out infinite'
                }} />
                <span style={{
                  color: 'rgba(255,179,71,0.5)', fontSize: '0.56rem',
                  fontFamily: "'Cinzel',serif", letterSpacing: '0.3em'
                }}>
                  AVAILABLE FOR WORK
                </span>
              </div>

              {/* Greeting */}
              <div className="gs" style={{
                color: 'rgba(255,185,128,0.65)', fontFamily: "'Cinzel',serif",
                fontSize: '0.75rem', letterSpacing: '0.5em', marginBottom: '0.8rem',
              }}>
                HEY THERE · WELCOME
              </div>

              {/* Name */}
              <div className="gs" style={{ marginBottom: '0.55rem', animation: 'namePulse 3.5s ease-in-out infinite' }}>
                <span style={{
                  fontFamily: "'Cinzel',serif", fontSize: 'clamp(2rem,5.5vw,3.8rem)',
                  fontWeight: 700, color: '#fff', marginRight: '0.3rem'
                }}>I'm</span>
                <span style={{
                  fontFamily: "'Cinzel',serif", fontSize: 'clamp(2rem,5.5vw,3.8rem)', fontWeight: 700,
                  backgroundImage: 'linear-gradient(90deg,#c46a2b,#ffb347,#fff1d6,#ffb347,#c46a2b)',
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer 4s linear infinite',
                }}>Om Prakash</span>
              </div>

              {/* Role */}
              <div className="gs" style={{
                fontFamily: "'Cinzel',serif", fontSize: 'clamp(0.9rem,2.6vw,1.45rem)',
                fontWeight: 600, marginBottom: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.4rem', flexWrap: 'wrap',
              }}>
                <span style={{ color: 'rgba(200,200,200,0.7)' }}>A</span>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{
                    backgroundImage: 'linear-gradient(90deg,#c46a2b,#ffb347)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>JAVA</span>
                  <span style={{
                    position: 'absolute', bottom: -3, left: 0, height: 2, borderRadius: 999,
                    background: 'linear-gradient(90deg,#c46a2b,#ffb347)',
                    animation: 'underlineIn 1s 0.8s ease both', width: 0
                  }} />
                </span>
                <span style={{ color: 'rgba(200,200,200,0.7)' }}>Backend Engineer</span>
              </div>

              {/* Tech badges */}
              <div className="gs" style={{ display: 'flex', justifyContent: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Spring Boot', icon: '⚡' },
                  { label: 'Microservices', icon: '⬡' },
                  { label: 'REST API', icon: '◆' },
                  { label: 'Java', icon: '♛' },
                ].map((tech, idx) => (
                  <span key={idx}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(58,31,21,0.5)';
                      e.currentTarget.style.borderColor = 'rgba(255,179,71,0.5)';
                      e.currentTarget.style.boxShadow = '0 0 18px rgba(255,179,71,0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(58,31,21,0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255,179,71,0.18)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.28rem 0.8rem',
                      background: 'rgba(58,31,21,0.2)',
                      border: '1px solid rgba(255,179,71,0.18)',
                      borderRadius: '999px',
                      color: 'rgba(255,185,128,0.85)',
                      fontFamily: "'Cinzel',serif", fontSize: '0.58rem', letterSpacing: '0.12em',
                      backdropFilter: 'blur(8px)',
                      animation: `floatBadge ${3.5 + idx * 0.5}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.25}s`,
                      cursor: 'default', transition: 'all 0.3s ease',
                    }}>
                    <span>{tech.icon}</span><span>{tech.label}</span>
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* Rune divider */}
          {introComplete && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.35rem 2rem',
              animation: 'dividerIn 0.8s 0.2s ease both',
              transformOrigin: 'center',
            }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,179,71,0.18))' }} />
              <span style={{ color: 'rgba(255,179,71,0.3)', fontSize: '0.62rem', fontFamily: "'Cinzel',serif", letterSpacing: '0.5em' }}>
                ✦ ♛ ✦
              </span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(255,179,71,0.18),transparent)' }} />
            </div>
          )}
        </div>

        {/*
          JavaMain sits here in the normal flex column.
          Its <section ref={targetRef}> is the GSAP shrink destination —
          it must be in the normal document flow so getBoundingClientRect()
          returns the correct in-page position for the shrink animation.
          Its position:fixed overlay (zIndex 9999) is unaffected by any
          parent styling because this wrapper has NO transform, NO filter,
          and NO will-change — so no stacking context is created and the
          fixed overlay correctly covers the full viewport.
        */}
        <JavaMain onIntroComplete={handleIntroComplete} />

      </div>
    </>
  );
};

export default Index;



