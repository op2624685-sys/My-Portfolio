import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Check, Terminal, Sparkles } from 'lucide-react';

/* --- Syntax Highlighter (premium palette) ------------------- */
function highlight(code) {
  const parts = [];
  let i = 0;
  const KW = '#e8c9a1';   // keywords
  const TY = '#f0d4a8';   // types
  const FN = '#d4af7a';   // function/main
  const CL = '#86efac';   // classes (green)
  const ST = '#9ca3af';   // strings
  const PU = '#9ca3af';   // punctuation
  const TX = '#f5f5f7';   // text
  while (i < code.length) {
    const r = code.slice(i);
    let matched = false;
    const keywords = ['public', 'class', 'static', 'void', 'new', 'return', 'if', 'else'];
    for (const kw of keywords) {
      if (r.startsWith(kw) && !/[a-zA-Z0-9_]/.test(r[kw.length] || '')) {
        parts.push(<span key={i} style={{ color: KW, fontWeight: 500 }}>{kw}</span>);
        i += kw.length; matched = true; break;
      }
    }
    if (matched) continue;
    if (r.startsWith('String')) { parts.push(<span key={i} style={{ color: TY }}>String</span>); i += 6; continue; }
    if (r.startsWith('System')) { parts.push(<span key={i} style={{ color: TY }}>System</span>); i += 6; continue; }
    if (r.startsWith('out'))    { parts.push(<span key={i} style={{ color: TX }}>out</span>); i += 3; continue; }
    if (r.startsWith('println')){ parts.push(<span key={i} style={{ color: FN }}>println</span>); i += 7; continue; }
    if (r.startsWith('Main'))   { parts.push(<span key={i} style={{ color: CL, fontWeight: 500 }}>Main</span>); i += 4; continue; }
    if (r.startsWith('main'))   { parts.push(<span key={i} style={{ color: FN }}>main</span>); i += 4; continue; }
    if (r.startsWith('"')) {
      const end = r.indexOf('"', 1);
      if (end !== -1) {
        const s = r.slice(0, end + 1);
        parts.push(<span key={i} style={{ color: ST }}>{s}</span>);
        i += s.length;
        continue;
      }
    }
    if ('()[]{}.,;'.includes(code[i])) { parts.push(<span key={i} style={{ color: PU }}>{code[i]}</span>); i++; continue; }
    if (code[i] === ' ' || code[i] === '\t') { parts.push(<span key={i}>{code[i]}</span>); i++; continue; }
    if (code[i] === '\n') { parts.push(<br key={i} />); i++; continue; }
    parts.push(<span key={i} style={{ color: TX }}>{code[i]}</span>); i++;
  }
  return parts;
}

/* --- Constants ----------------------------------------------- */
const JAVA_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, I'm Om Prakash");
    }
}`;
const OUTPUT_TEXT = "Hello, I'm Om Prakash";
const LINES = JAVA_CODE.split('\n');

/* --- MAIN COMPONENT ------------------------------------------ */
export default function CodeAnimationIntro({ onIntroComplete }) {
  const [phase, setPhase] = useState('typing');     // typing → complete → done
  const [code, setCode] = useState('');
  const [progress, setProgress] = useState(0);
  const [outputTxt, setOutputTxt] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFading, setOverlayFading] = useState(false);

  useEffect(() => {
    if (phase === 'done' && onIntroComplete) onIntroComplete();
  }, [phase, onIntroComplete]);

  /* Step 1: Typing animation */
  useEffect(() => {
    if (phase !== 'typing') return;
    let idx = 0;
    const iv = setInterval(() => {
      if (idx <= JAVA_CODE.length) {
        setCode(JAVA_CODE.slice(0, idx));
        setProgress(Math.floor((idx / JAVA_CODE.length) * 100));
        idx++;
      } else {
        clearInterval(iv);
        setTimeout(() => setPhase('complete'), 250);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [phase]);

  /* Step 2: Output typing */
  useEffect(() => {
    if (phase !== 'complete') return;
    let idx = 0;
    const iv = setInterval(() => {
      if (idx <= OUTPUT_TEXT.length) { setOutputTxt(OUTPUT_TEXT.slice(0, idx)); idx++; }
      else { clearInterval(iv); }
    }, 45);
    const totalMs = OUTPUT_TEXT.length * 45 + 700;
    const doneTimer = setTimeout(() => setPhase('done'), totalMs);
    return () => { clearInterval(iv); clearTimeout(doneTimer); };
  }, [phase]);

  /* Step 3: Fade out and unmount the overlay.
     Kept in its own effect so the hide timer isn't cancelled when
     `phase` flips from 'complete' → 'done' (which was the previous bug). */
  useEffect(() => {
    if (phase !== 'done') return;
    setOverlayFading(true);
    const hideTimer = setTimeout(() => setOverlayVisible(false), 600);
    return () => clearTimeout(hideTimer);
  }, [phase]);

  const isComplete = phase === 'complete' || phase === 'done';
  const typedLines = code.split('\n').length;

  /* GSAP: gentle scale-in on mount */
  const cardRef = React.useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes shimmerS    { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes slideUp     { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progressFill{ 0% { width: 0; } 100% { width: var(--p, 0%); } }
        @keyframes glowRing    { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes borderRun   { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      {overlayVisible && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212, 175, 122, 0.06) 0%, transparent 60%),' +
              'rgba(10, 10, 11, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            opacity: overlayFading ? 0 : 1,
            transition: 'opacity 0.6s var(--ease-out)',
          }}
        >
          <div
            ref={cardRef}
            style={{
              position: 'relative',
              width: 'min(720px, 100%)',
              background:
                'linear-gradient(180deg, rgba(22, 22, 26, 0.95) 0%, rgba(17, 17, 20, 0.95) 100%)',
              border: `1px solid ${isComplete ? 'rgba(212, 175, 122, 0.35)' : 'var(--border-default)'}`,
              borderRadius: 16,
              padding: 0,
              boxShadow: isComplete
                ? '0 0 0 1px rgba(212, 175, 122, 0.1), 0 30px 80px -20px rgba(0, 0, 0, 0.7), 0 0 60px -10px rgba(212, 175, 122, 0.25)'
                : '0 30px 80px -20px rgba(0, 0, 0, 0.7)',
              transition: 'border-color 0.5s, box-shadow 0.5s',
              overflow: 'hidden',
            }}
          >
            {/* Glow accent in corner */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 175, 122, 0.18) 0%, transparent 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                opacity: isComplete ? 1 : 0.4,
                transition: 'opacity 0.6s',
              }}
            />

            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                marginBottom: '0',
                background: 'rgba(0, 0, 0, 0.2)',
                borderBottom: '1px solid var(--border-default)',
                borderRadius: '16px 16px 0 0',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  opacity: 0.8,
                }}
              >
                <Terminal size={12} style={{ color: 'var(--accent)' }} />
                <span>Main.java</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {isComplete && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 4,
                      background: 'rgba(74, 222, 128, 0.1)',
                      border: '1px solid rgba(74, 222, 128, 0.3)',
                      color: '#86efac',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      animation: 'slideUp 0.4s var(--ease-out) both',
                    }}
                  >
                    <Check size={10} strokeWidth={2.5} />
                    Compiled
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {progress}%
                </span>
              </div>
            </div>
            <div style={{ padding: '1.25rem' }}>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, var(--border-default), transparent)',
                marginBottom: '1rem',
              }}
            />

            {/* Code editor */}
            <div
              style={{
                display: 'flex',
                gap: '0.85rem',
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 'clamp(0.82rem, 1.6vw, 0.95rem)',
                lineHeight: 1.7,
                minHeight: '8rem',
              }}
            >
              {/* Line numbers */}
              <div
                style={{
                  userSelect: 'none',
                  textAlign: 'right',
                  flexShrink: 0,
                  color: 'var(--text-muted)',
                  opacity: 0.6,
                }}
              >
                {LINES.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      color: i < typedLines ? 'var(--accent)' : 'var(--text-muted)',
                      opacity: i < typedLines ? 0.8 : 0.4,
                      transition: 'color 0.3s, opacity 0.3s',
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              {/* Code */}
              <pre
                style={{
                  flex: 1,
                  margin: 0,
                  textAlign: 'left',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: 'var(--text-primary)',
                }}
              >
                {highlight(code)}
                {!isComplete && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1em',
                      background: 'var(--accent)',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                      animation: 'cursorBlink 0.8s infinite',
                      boxShadow: '0 0 8px var(--accent)',
                    }}
                  />
                )}
              </pre>
            </div>

            {/* Output panel */}
            {isComplete && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.85rem 1rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  animation: 'slideUp 0.4s var(--ease-out) both',
                }}
              >
                <Sparkles size={13} style={{ color: 'var(--accent)' }} />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.88rem',
                    color: 'var(--accent-soft)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {outputTxt}
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1em',
                      background: 'var(--accent)',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                      animation: 'cursorBlink 0.8s infinite',
                    }}
                  />
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  exit 0
                </span>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
