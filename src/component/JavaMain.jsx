import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ─── Syntax Highlighter ─────────────────────────────────────── */
function highlight(code) {
  const parts = []; let i = 0;
  while (i < code.length) {
    const r = code.slice(i);
    if      (r.startsWith('public'))  { parts.push(<span key={i} style={{color:'#d8b4fe',textShadow:'0 0 8px #a855f7'}}>public</span>);  i+=6; }
    else if (r.startsWith('class'))   { parts.push(<span key={i} style={{color:'#d8b4fe',textShadow:'0 0 8px #a855f7'}}>class</span>);   i+=5; }
    else if (r.startsWith('static'))  { parts.push(<span key={i} style={{color:'#d8b4fe',textShadow:'0 0 8px #a855f7'}}>static</span>);  i+=6; }
    else if (r.startsWith('void'))    { parts.push(<span key={i} style={{color:'#d8b4fe',textShadow:'0 0 8px #a855f7'}}>void</span>);    i+=4; }
    else if (r.startsWith('String'))  { parts.push(<span key={i} style={{color:'#d8b4fe',textShadow:'0 0 8px #a855f7'}}>String</span>);  i+=6; }
    else if (r.startsWith('Main'))    { parts.push(<span key={i} style={{color:'#FFD700',textShadow:'0 0 12px #FFD700'}}>Main</span>);    i+=4; }
    else if (r.startsWith('main'))    { parts.push(<span key={i} style={{color:'#93c5fd',textShadow:'0 0 6px #3b82f6'}}>main</span>);    i+=4; }
    else if (r.startsWith('System'))  { parts.push(<span key={i} style={{color:'#67e8f9',textShadow:'0 0 6px #06b6d4'}}>System</span>);  i+=6; }
    else if (r.startsWith('out'))     { parts.push(<span key={i} style={{color:'#67e8f9',textShadow:'0 0 6px #06b6d4'}}>out</span>);     i+=3; }
    else if (r.startsWith('println')) { parts.push(<span key={i} style={{color:'#93c5fd',textShadow:'0 0 6px #3b82f6'}}>println</span>); i+=7; }
    else if (r.startsWith('"')) {
      const end = r.indexOf('"',1);
      if (end!==-1) { const s=r.slice(0,end+1); parts.push(<span key={i} style={{color:'#86efac',textShadow:'0 0 8px #22c55e'}}>{s}</span>); i+=s.length; }
      else { parts.push(<span key={i} style={{color:'#86efac'}}>{r}</span>); i+=r.length; }
    }
    else if ('()[]{}.,;'.includes(code[i])) { parts.push(<span key={i} style={{color:'#FDE68A',textShadow:'0 0 6px #F59E0B'}}>{code[i]}</span>); i++; }
    else { parts.push(<span key={i} style={{color:'#e2e8f0'}}>{code[i]}</span>); i++; }
  }
  return parts;
}

/* ─── Matrix Rain Canvas ─────────────────────────────────────── */
function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const cols = Math.floor(canvas.width/16), drops = Array(cols).fill(1);
    const chars = 'OP♛✦◆▲❖★彡王帝金ジャバ01';
    let id;
    const draw = () => {
      ctx.fillStyle='rgba(0,0,0,0.07)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      drops.forEach((y,x)=>{
        const ch=chars[Math.floor(Math.random()*chars.length)];
        const pct=y/(canvas.height/16);
        ctx.fillStyle=pct<0.15?`rgba(255,255,255,${0.9-pct*3})`:`rgba(${184+Math.floor(71*Math.random())},${Math.floor(134+81*Math.random())},0,0.85)`;
        ctx.font='14px monospace'; ctx.fillText(ch,x*16,y*16);
        if(y*16>canvas.height&&Math.random()>0.97) drops[x]=0; drops[x]++;
      });
      id=requestAnimationFrame(draw);
    };
    draw(); return ()=>cancelAnimationFrame(id);
  },[]);
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.4,pointerEvents:'none',zIndex:1,borderRadius:'inherit'}}/>;
}

/* ─── Scan Line (while typing) ───────────────────────────────── */
const ScanLine = ({active}) => !active ? null : (
  <div style={{position:'absolute',left:0,right:0,height:2,zIndex:5,background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.9),rgba(255,255,255,0.5),rgba(255,215,0,0.9),transparent)',boxShadow:'0 0 14px 4px rgba(255,215,0,0.5)',animation:'scanMove 2.2s linear infinite',pointerEvents:'none'}}/>
);

/* ─── Royal Ripple — gold ripple rings that expand from center ── */
function RoyalRipple({ active }) {
  if (!active) return null;
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:4,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'0.75rem',overflow:'hidden'}}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          position:'absolute',
          width:60, height:60,
          borderRadius:'50%',
          border:'1.5px solid rgba(255,215,0,0.7)',
          animation:`rippleExpand 2.4s ${i*0.55}s ease-out infinite`,
          boxShadow:'0 0 12px rgba(255,215,0,0.3)',
        }}/>
      ))}
    </div>
  );
}

/* ─── Crown Reveal — SVG crown that draws itself stroke by stroke */
function CrownReveal({ active }) {
  if (!active) return null;
  return (
    <div style={{
      position:'absolute', top:8, right:12,
      zIndex:6, pointerEvents:'none',
      animation:'crownFadeIn 0.5s ease both',
    }}>
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700"/>
            <stop offset="50%" stopColor="#FFF8DC"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
        </defs>
        {/* Crown shape */}
        <path
          d="M2 24 L6 10 L12 16 L16 4 L20 16 L26 10 L30 24 Z"
          fill="url(#cg)"
          stroke="#B8860B"
          strokeWidth="0.5"
          style={{
            filter:'drop-shadow(0 0 6px rgba(255,215,0,0.8))',
            strokeDasharray:120,
            strokeDashoffset:120,
            animation:'drawCrown 0.8s 0.1s ease forwards',
          }}
        />
        {/* 3 jewels on crown */}
        {[{cx:16,cy:7},{cx:9,cy:17},{cx:23,cy:17}].map((j,i)=>(
          <circle key={i} cx={j.cx} cy={j.cy} r="2"
            fill={i===0?'#c084fc':i===1?'#67e8f9':'#86efac'}
            style={{filter:`drop-shadow(0 0 4px ${i===0?'#a855f7':i===1?'#06b6d4':'#22c55e'})`,animation:`jewelPop 0.3s ${0.5+i*0.12}s ease both`,opacity:0}}
          />
        ))}
        {/* Bottom band */}
        <rect x="2" y="23" width="28" height="3" rx="1.5" fill="url(#cg)" style={{filter:'drop-shadow(0 0 4px rgba(255,215,0,0.5))'}}/>
      </svg>
    </div>
  );
}

/* ─── Gold Pulse Wave — single radial gold wave on card bg ──────  */
function GoldWave({ active }) {
  if (!active) return null;
  return (
    <div style={{
      position:'absolute', inset:0, borderRadius:'0.75rem',
      pointerEvents:'none', zIndex:3, overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse at 50% 50%, rgba(255,215,0,0.12) 0%, rgba(255,215,0,0.04) 40%, transparent 70%)',
        animation:'goldWavePulse 2s ease-in-out infinite',
      }}/>
    </div>
  );
}

/* ─── Running light along the border ─────────────────────────── */
function BorderRunner({ active }) {
  if (!active) return null;
  return (
    <div style={{position:'absolute',inset:0,borderRadius:'0.75rem',pointerEvents:'none',zIndex:6,overflow:'hidden'}}>
      {/* top runner */}
      <div style={{position:'absolute',top:0,left:0,height:'2px',width:'40%',background:'linear-gradient(90deg,transparent,#FFD700,transparent)',animation:'runTop 3s linear infinite',boxShadow:'0 0 8px #FFD700'}}/>
      {/* right runner */}
      <div style={{position:'absolute',top:0,right:0,width:'2px',height:'40%',background:'linear-gradient(180deg,transparent,#FFD700,transparent)',animation:'runRight 3s 0.75s linear infinite',boxShadow:'0 0 8px #FFD700'}}/>
      {/* bottom runner */}
      <div style={{position:'absolute',bottom:0,right:0,height:'2px',width:'40%',background:'linear-gradient(270deg,transparent,#FFD700,transparent)',animation:'runBottom 3s 1.5s linear infinite',boxShadow:'0 0 8px #FFD700'}}/>
      {/* left runner */}
      <div style={{position:'absolute',bottom:0,left:0,width:'2px',height:'40%',background:'linear-gradient(0deg,transparent,#FFD700,transparent)',animation:'runLeft 3s 2.25s linear infinite',boxShadow:'0 0 8px #FFD700'}}/>
    </div>
  );
}

/* ─── GlowOutput letters ─────────────────────────────────────── */
const GlowOutput = ({text,done}) => (
  <span style={{fontFamily:'monospace',fontSize:'1.05rem'}}>
    {text.split('').map((ch,i)=>(
      <span key={i} style={{color:'#FFD700',textShadow:'0 0 10px #FFD700,0 0 22px #B8860B',animation:`letterPop 0.25s ${i*0.035}s ease both`,display:'inline-block',opacity:0}}>{ch}</span>
    ))}
    {!done&&<span style={{display:'inline-block',width:9,height:18,background:'#FFD700',boxShadow:'0 0 10px #FFD700',verticalAlign:'middle',marginLeft:2,animation:'cursorBlink 0.65s infinite'}}/>}
  </span>
);

/* ─── Constants ──────────────────────────────────────────────── */
const BOOT=[
  {t:'[♛] ROYAL JVM v∞ — Awakening the Throne...',ms:0},
  {t:'[✦] Mounting the Spring of Infinite Power...',ms:500},
  {t:'[◆] Forging Gold Compilation Flags...',ms:950},
  {t:'[❖] Weaving Dependency Enchantments...',ms:1350},
  {t:'[★] All Systems Royal — Executing >>>',ms:1750},
];
const JAVA_CODE=`public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to My Portfolio");
    }
}`;
const OUTPUT_TEXT='Welcome to My Portfolio';

/* ═══ MAIN COMPONENT ═══════════════════════════════════════════ */
export default function CodeAnimationIntro({ onIntroComplete }) {
  const [phase,       setPhase]       = useState('boot');
  const [bootLines,   setBootLines]   = useState([]);
  const [code,        setCode]        = useState('');
  const [typingDone,  setTypingDone]  = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [outputTxt,   setOutputTxt]   = useState('');
  const [outputDone,  setOutputDone]  = useState(false);
  const [scanActive,  setScanActive]  = useState(false);
  const [showEffects, setShowEffects] = useState(false); // all completion effects

  const overlayRef = useRef(null);
  const targetRef  = useRef(null);

  /* Step 1: Boot */
  useEffect(()=>{
    BOOT.forEach(({t,ms})=>setTimeout(()=>setBootLines(p=>[...p,t]),ms));
    setTimeout(()=>setPhase('matrix'),2200);
  },[]);

  /* Step 2: Matrix */
  useEffect(()=>{
    if(phase!=='matrix') return;
    const t=setTimeout(()=>setPhase('typing'),1500);
    return()=>clearTimeout(t);
  },[phase]);

  /* Step 3: Typing — 18ms per char */
  useEffect(()=>{
    if(phase!=='typing') return;
    setScanActive(true);
    let idx=0;
    const iv=setInterval(()=>{
      if(idx<=JAVA_CODE.length){
        setCode(JAVA_CODE.slice(0,idx));
        setProgress(Math.floor((idx/JAVA_CODE.length)*100));
        idx++;
      } else {
        clearInterval(iv);
        setTypingDone(true);
        setScanActive(false);
        // Small pause then fire effects cleanly
        setTimeout(()=>setShowEffects(true), 150);
        setTimeout(()=>setPhase('complete'), 600);
      }
    },18);
    return()=>clearInterval(iv);
  },[phase]);

  /* Step 4: Complete → type output → shrink */
  useEffect(()=>{
    if(phase!=='complete') return;
    let idx=0;
    const iv=setInterval(()=>{
      if(idx<=OUTPUT_TEXT.length){ setOutputTxt(OUTPUT_TEXT.slice(0,idx)); idx++; }
      else { clearInterval(iv); setOutputDone(true); }
    },55);
    const shrinkTimer=setTimeout(()=>doShrink(), OUTPUT_TEXT.length*55+1400);
    return()=>{ clearInterval(iv); clearTimeout(shrinkTimer); };
  },[phase]);

  /* GSAP shrink overlay to in-page position */
  const doShrink = () => {
    const overlay=overlayRef.current, target=targetRef.current;
    if(!overlay||!target) return;
    setPhase('shrinking');
    const r=target.getBoundingClientRect();
    gsap.to(overlay,{
      backgroundColor:'rgba(255,215,0,0.06)',
      duration:0.1, yoyo:true, repeat:1,
      onComplete:()=>{
        gsap.to(overlay,{
          top:r.top, left:r.left, width:r.width, height:r.height,
          borderRadius:'0.75rem', duration:0.9, ease:'power4.inOut',
          onComplete:()=>{ setPhase('done'); if(onIntroComplete) onIntroComplete(); }
        });
      }
    });
  };

  const isComplete = phase==='complete'||phase==='shrinking'||phase==='done';

  /* ── Card content ─────────────────────────────────────────── */
  const CardInner = () => (
    <div style={{
      background:'linear-gradient(135deg,rgba(6,0,18,0.98),rgba(18,0,36,0.97))',
      borderRadius:'0.75rem',
      padding:'1.5rem',
      border:`1px solid ${typingDone?'rgba(255,215,0,0.5)':'rgba(255,215,0,0.18)'}`,
      position:'relative',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
      transition:'border-color 0.6s ease, box-shadow 0.6s ease',
      boxShadow: isComplete
        ? '0 0 0 1px rgba(255,215,0,0.1), 0 0 40px rgba(255,215,0,0.15), 0 0 80px rgba(106,13,173,0.2)'
        : 'none',
    }}>

      {/* Typing scan line */}
      <ScanLine active={scanActive}/>

      {/* Completion effects — all smooth, no glitch */}
      <GoldWave    active={showEffects}/>
      <RoyalRipple active={showEffects}/>
      <BorderRunner active={showEffects}/>
      <CrownReveal active={showEffects}/>

      {/* Subtle dot grid bg */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'radial-gradient(rgba(255,215,0,0.05) 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>

      {/* ── Top bar ── */}
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem',position:'relative',zIndex:10,flexShrink:0}}>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57',boxShadow:'0 0 5px #ff5f57'}}/>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#febc2e',boxShadow:'0 0 5px #febc2e'}}/>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#28c840',boxShadow:'0 0 5px #28c840'}}/>
        <span style={{marginLeft:'0.75rem',color:'#B8860B',fontSize:'0.72rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.18em',textShadow:'0 0 8px rgba(184,134,11,0.5)'}}>
          ♛ Main.java
        </span>
        {typingDone && (
          <span style={{
            marginLeft:'auto',
            background:'linear-gradient(90deg,#B8860B,#FFD700,#B8860B)',
            backgroundSize:'200% auto',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            fontSize:'0.65rem',
            fontFamily:"'Cinzel',serif",
            letterSpacing:'0.12em',
            fontWeight:'bold',
            animation:'shimmerText 3s linear infinite',
          }}>✦ Compiled</span>
        )}
      </div>

      {/* Progress bar */}
      {!typingDone && (
        <div style={{height:2,borderRadius:999,background:'rgba(255,215,0,0.08)',marginBottom:'1rem',overflow:'hidden',position:'relative',zIndex:2,flexShrink:0}}>
          <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,#4B0082,#6A0DAD,#FFD700)',borderRadius:999,boxShadow:'0 0 10px rgba(255,215,0,0.6)',transition:'width 0.04s linear'}}/>
        </div>
      )}

      {/* Divider */}
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.5),transparent)',marginBottom:'1.25rem',position:'relative',zIndex:2,flexShrink:0}}/>

      {/* Line numbers + code */}
      <div style={{display:'flex',gap:'1.5rem',position:'relative',zIndex:2,overflow:'hidden'}}>
        <div style={{userSelect:'none',textAlign:'right',flexShrink:0}}>
          {JAVA_CODE.split('\n').map((_,i)=>(
            <div key={i} style={{
              color:i<code.split('\n').length?'rgba(255,215,0,0.4)':'rgba(255,255,255,0.08)',
              fontSize:'0.8rem',fontFamily:'monospace',lineHeight:1.7,
              transition:'color 0.3s, text-shadow 0.3s',
              textShadow:i<code.split('\n').length?'0 0 5px rgba(255,215,0,0.3)':'none',
            }}>{i+1}</div>
          ))}
        </div>
        <pre style={{flex:1,textAlign:'left',overflow:'hidden',margin:0}}>
          <code style={{fontSize:'0.88rem',fontFamily:'monospace',whiteSpace:'pre-wrap',wordBreak:'break-word',lineHeight:1.7}}>
            {highlight(code)}
            {!typingDone && (
              <span style={{display:'inline-block',width:9,height:17,background:'#FFD700',boxShadow:'0 0 12px #FFD700,0 0 24px #B8860B',marginLeft:2,verticalAlign:'middle',animation:'cursorBlink 0.65s infinite'}}/>
            )}
          </code>
        </pre>
      </div>

      {/* Output panel */}
      {isComplete && (
        <div style={{marginTop:'1rem',animation:'outputSlide 0.7s cubic-bezier(0.34,1.56,0.64,1) both',position:'relative',zIndex:10,flexShrink:0}}>
          <div style={{background:'linear-gradient(90deg,rgba(75,0,130,0.7),rgba(26,0,48,0.9))',border:'1px solid rgba(255,215,0,0.3)',borderRadius:'0.5rem 0.5rem 0 0',padding:'0.35rem 1rem',display:'flex',alignItems:'center',gap:'0.6rem'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e'}}/>
            <span style={{color:'#B8860B',fontSize:'0.6rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.22em'}}>OUTPUT STREAM</span>
            <span style={{marginLeft:'auto',color:'rgba(255,215,0,0.35)',fontSize:'0.55rem',fontFamily:'monospace'}}>exit code 0</span>
          </div>
          <div style={{background:'rgba(0,0,0,0.55)',border:'1px solid rgba(255,215,0,0.2)',borderTop:'none',borderRadius:'0 0 0.5rem 0.5rem',padding:'0.85rem 1.25rem'}}>
            <GlowOutput text={outputTxt} done={outputDone}/>
          </div>
        </div>
      )}

      {/* Animated shimmer bottom border */}
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,height:2,borderRadius:'0 0 0.75rem 0.75rem',
        background: isComplete
          ? 'linear-gradient(90deg,#4B0082,#FFD700,#B8860B,#FFD700,#4B0082)'
          : `linear-gradient(90deg,#6A0DAD ${progress}%,rgba(75,0,130,0.08) ${progress}%)`,
        backgroundSize: isComplete ? '300% auto' : '100%',
        animation: isComplete ? 'shimmer 2.5s linear infinite' : 'none',
        boxShadow: isComplete ? '0 0 10px rgba(255,215,0,0.4)' : 'none',
        transition: 'box-shadow 0.5s ease',
      }}/>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes scanMove      { 0%{top:0%}   100%{top:100%} }
        @keyframes cursorBlink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmer       { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes shimmerText   { 0%{filter:brightness(1)}  50%{filter:brightness(1.4)} 100%{filter:brightness(1)} }
        @keyframes letterPop     { 0%{opacity:0;transform:translateY(-5px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes bootLine      { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes centerPulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes cardReveal    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes outputSlide   { 0%{opacity:0;transform:translateY(14px) scale(0.98)} 100%{opacity:1;transform:translateY(0) scale(1)} }

        /* Gold radial pulse on card background */
        @keyframes goldWavePulse { 0%,100%{opacity:0.4;transform:scale(0.95)} 50%{opacity:1;transform:scale(1.05)} }

        /* Ripple rings expanding from center */
        @keyframes rippleExpand  { 0%{transform:scale(0.2);opacity:0.8} 100%{transform:scale(6);opacity:0} }

        /* Running light on border edges */
        @keyframes runTop    { 0%{left:-40%}  100%{left:100%}  }
        @keyframes runRight  { 0%{top:-40%}   100%{top:100%}   }
        @keyframes runBottom { 0%{right:-40%} 100%{right:100%} }
        @keyframes runLeft   { 0%{bottom:-40%} 100%{bottom:100%} }

        /* Crown SVG draw-in */
        @keyframes crownFadeIn { from{opacity:0;transform:translateY(-8px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes drawCrown   { to{stroke-dashoffset:0} }
        @keyframes jewelPop    { 0%{opacity:0;transform:scale(0)} 70%{transform:scale(1.3)} 100%{opacity:1;transform:scale(1)} }
      `}</style>

      {/* ── Fullscreen overlay (intro) ── */}
      {phase !== 'done' && (
        <div ref={overlayRef} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',background:'radial-gradient(ellipse at 50% 40%,#1a0030 0%,#0d0020 55%,#000 100%)'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,215,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.03) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:'15%',left:'8%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(106,13,173,0.25),transparent)',filter:'blur(80px)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:'15%',right:'8%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(184,134,11,0.18),transparent)',filter:'blur(80px)',pointerEvents:'none'}}/>

          {/* Boot */}
          {phase==='boot' && (
            <div style={{background:'rgba(4,0,12,0.98)',border:'1px solid rgba(255,215,0,0.2)',borderRadius:'0.75rem',padding:'2rem',fontFamily:'monospace',width:'min(600px,88vw)',animation:'cardReveal 0.4s ease both'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem',paddingBottom:'0.75rem',borderBottom:'1px solid rgba(255,215,0,0.12)'}}>
                <span style={{color:'#FFD700'}}>♛</span>
                <span style={{color:'#B8860B',fontFamily:"'Cinzel',serif",fontSize:'0.68rem',letterSpacing:'0.25em'}}>ROYAL JVM TERMINAL v∞</span>
                <span style={{marginLeft:'auto',width:8,height:8,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e',display:'inline-block',animation:'cursorBlink 1s infinite'}}/>
              </div>
              {bootLines.map((line,i)=>(
                <div key={i} style={{color:i===bootLines.length-1?'#FFD700':'#86efac',fontSize:'0.78rem',marginBottom:'0.4rem',animation:'bootLine 0.3s ease both',textShadow:i===bootLines.length-1?'0 0 10px #FFD700':'0 0 5px #22c55e'}}>{line}</div>
              ))}
              <span style={{color:'#FFD700',animation:'cursorBlink 0.7s infinite',fontSize:'0.9rem'}}>█</span>
            </div>
          )}

          {/* Matrix */}
          {phase==='matrix' && (
            <div style={{position:'relative',borderRadius:'0.75rem',overflow:'hidden',width:'min(600px,88vw)',height:220,background:'#000'}}>
              <MatrixRain/>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:2,flexDirection:'column',gap:'0.5rem'}}>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:'2rem',color:'#FFD700',textShadow:'0 0 20px #FFD700,0 0 50px #B8860B',letterSpacing:'0.3em',animation:'centerPulse 0.8s ease-in-out infinite'}}>♛ LOADING ♛</span>
                <span style={{color:'rgba(255,215,0,0.5)',fontFamily:"'Cinzel',serif",fontSize:'0.6rem',letterSpacing:'0.4em'}}>COMPILING ROYAL CODE...</span>
              </div>
            </div>
          )}

          {/* Typing / Complete / Shrinking */}
          {(phase==='typing'||phase==='complete'||phase==='shrinking') && (
            <div style={{width:'min(640px,88vw)',animation:'cardReveal 0.5s ease both'}}>
              <CardInner/>
            </div>
          )}
        </div>
      )}

      {/* ── In-page slot ── */}
      <section ref={targetRef} className="flex justify-center px-4 py-4" style={{flexShrink:0}}>
        {phase==='done' && (
          <div style={{width:'100%',maxWidth:640,animation:'cardReveal 0.5s ease both'}}>
            <CardInner/>
          </div>
        )}
      </section>
    </>
  );
}