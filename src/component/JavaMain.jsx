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

/* ─── Matrix Rain ────────────────────────────────────────────── */
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

/* ─── Sub-components ─────────────────────────────────────────── */
const ScanLine = ({active}) => !active ? null : (
  <div style={{position:'absolute',left:0,right:0,height:2,zIndex:5,background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.9),rgba(255,255,255,0.5),rgba(255,215,0,0.9),transparent)',boxShadow:'0 0 14px 4px rgba(255,215,0,0.5)',animation:'scanMove 2.2s linear infinite',pointerEvents:'none'}}/>
);

const OrbitalRunes = ({active}) => {
  const runes=['♛','✦','◆','❖','★','⬡','王','金'];
  return !active ? null : (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:6}}>
      {runes.map((r,i)=>(
        <div key={i} style={{position:'absolute',top:'50%',left:'50%',fontSize:'1rem',color:'rgba(255,215,0,0.75)',textShadow:'0 0 12px #FFD700',animation:`${i%2===0?'orbitCW':'orbitCCW'} ${6+i*0.6}s linear infinite`,animationDelay:`${i*-0.5}s`}}>{r}</div>
      ))}
    </div>
  );
};

const RoyalSeal = ({show}) => !show ? null : (
  <div style={{position:'absolute',top:-30,right:-30,zIndex:10,width:76,height:76,animation:'sealStamp 0.55s cubic-bezier(0.36,0.07,0.19,0.97) both',filter:'drop-shadow(0 0 10px rgba(255,215,0,0.8))'}}>
    <svg viewBox="0 0 100 100" style={{width:'100%',height:'100%'}}>
      <defs><radialGradient id="sg2"><stop offset="0%" stopColor="#FFD700"/><stop offset="100%" stopColor="#B8860B"/></radialGradient></defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#sg2)" strokeWidth="2"/>
      <circle cx="50" cy="50" r="41" fill="none" stroke="url(#sg2)" strokeWidth="0.7" strokeDasharray="4 3"/>
      {[0,45,90,135,180,225,270,315].map((deg,i)=>(
        <line key={i} x1={50+41*Math.cos(deg*Math.PI/180)} y1={50+41*Math.sin(deg*Math.PI/180)} x2={50+34*Math.cos(deg*Math.PI/180)} y2={50+34*Math.sin(deg*Math.PI/180)} stroke="#FFD700" strokeWidth="1.5"/>
      ))}
      <text x="50" y="60" textAnchor="middle" fontSize="30" fill="url(#sg2)" style={{filter:'drop-shadow(0 0 5px #FFD700)'}}>♛</text>
    </svg>
  </div>
);

const GlowOutput = ({text,done}) => (
  <span style={{fontFamily:'monospace',fontSize:'1.05rem'}}>
    {text.split('').map((ch,i)=>(
      <span key={i} style={{color:'#FFD700',textShadow:'0 0 10px #FFD700,0 0 22px #B8860B',animation:`letterPop 0.3s ${i*0.04}s ease both`,display:'inline-block'}}>{ch}</span>
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
  // phase: boot | matrix | typing | complete | shrinking | done
  const [phase,      setPhase]      = useState('boot');
  const [bootLines,  setBootLines]  = useState([]);
  const [code,       setCode]       = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [outputTxt,  setOutputTxt]  = useState('');
  const [outputDone, setOutputDone] = useState(false);
  const [showSeal,   setShowSeal]   = useState(false);
  const [scanActive, setScanActive] = useState(false);

  // The fixed fullscreen overlay element
  const overlayRef = useRef(null);
  // The real in-page target div (always rendered, invisible placeholder during intro)
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

  /* Step 3: Typing */
  useEffect(()=>{
    if(phase!=='typing') return;
    setScanActive(true);
    let idx=0;
    const iv=setInterval(()=>{
      if(idx<=JAVA_CODE.length){ setCode(JAVA_CODE.slice(0,idx)); setProgress(Math.floor((idx/JAVA_CODE.length)*100)); idx++; }
      else { clearInterval(iv); setTypingDone(true); setScanActive(false); setPhase('complete'); }
    },20);
    return()=>clearInterval(iv);
  },[phase]);

  /* Step 4: Complete → type output → shrink */
  useEffect(()=>{
    if(phase!=='complete') return;
    setShowSeal(true);
    let idx=0;
    const iv=setInterval(()=>{
      if(idx<=OUTPUT_TEXT.length){ setOutputTxt(OUTPUT_TEXT.slice(0,idx)); idx++; }
      else { clearInterval(iv); setOutputDone(true); }
    },40);

    // Wait for output to finish + 1.2s then shrink
    const shrinkDelay = OUTPUT_TEXT.length*40 + 1200;
    const shrinkTimer = setTimeout(()=>doShrink(), shrinkDelay);
    return()=>{ clearInterval(iv); clearTimeout(shrinkTimer); };
  },[phase]);

  /* GSAP: shrink overlay from fullscreen → exact position of targetRef */
  const doShrink = () => {
    const overlay = overlayRef.current;
    const target  = targetRef.current;
    if (!overlay || !target) return;

    setPhase('shrinking');
    const r = target.getBoundingClientRect();

    // Brief gold flash
    gsap.to(overlay, {
      backgroundColor: 'rgba(255,215,0,0.12)',
      duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => {
        gsap.to(overlay, {
          top:          r.top,
          left:         r.left,
          width:        r.width,
          height:       r.height,
          borderRadius: '0.75rem',
          duration:     0.9,
          ease:         'power4.inOut',
          onComplete:   () => {
            setPhase('done');
            if (onIntroComplete) onIntroComplete();
          }
        });
      }
    });
  };

  /* ── Shared card inner content ─────────────────────────────── */
  const isFullscreen = phase !== 'done';

  const CardInner = () => (
    <div style={{
      background:'linear-gradient(135deg,rgba(6,0,18,0.98),rgba(18,0,36,0.97))',
      borderRadius:'0.75rem',
      padding:'2rem',
      border:`1px solid ${typingDone?'rgba(255,215,0,0.45)':'rgba(255,215,0,0.2)'}`,
      position:'relative',
      overflow:'hidden',
      height:'100%',
      display:'flex',
      flexDirection:'column',
      animation:phase==='complete'||phase==='shrinking'?'glowPulse 3s ease-in-out infinite':'none',
    }}>
      <ScanLine active={scanActive}/>
      {isFullscreen && <OrbitalRunes active={phase==='complete'||phase==='shrinking'}/>}
      {isFullscreen && <RoyalSeal show={showSeal}/>}

      {/* Corner ornaments */}
      {isFullscreen && ['tl','tr','bl','br'].map((pos,i)=>(
        <div key={pos} style={{position:'absolute',zIndex:7,fontSize:'0.7rem',color:'rgba(255,215,0,0.6)',textShadow:'0 0 8px #FFD700',
          top:    pos.includes('t')?-10:'auto', bottom:pos.includes('b')?-10:'auto',
          left:   pos.includes('l')?-10:'auto', right: pos.includes('r')?-10:'auto',
          animation:(phase==='complete'||phase==='shrinking')?`cornerSpin ${7+i}s linear infinite`:'none',
        }}>◆</div>
      ))}

      {/* Dot grid */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'radial-gradient(rgba(255,215,0,0.07) 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>

      {/* Top bar */}
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem',position:'relative',zIndex:2,flexShrink:0}}>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57',boxShadow:'0 0 5px #ff5f57'}}/>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#febc2e',boxShadow:'0 0 5px #febc2e'}}/>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#28c840',boxShadow:'0 0 5px #28c840'}}/>
        <span style={{marginLeft:'0.75rem',color:'#B8860B',fontSize:'0.72rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.18em',textShadow:'0 0 8px rgba(184,134,11,0.6)'}}>♛ Main.java</span>
        {typingDone&&<span style={{marginLeft:'auto',background:'linear-gradient(135deg,#4B0082,#B8860B,#FFD700)',backgroundSize:'200% auto',animation:'shimmer 3s linear infinite',color:'#000',fontSize:'0.55rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.1em',padding:'0.2rem 0.75rem',borderRadius:'999px',fontWeight:'bold'}}>✓ Compiled</span>}
      </div>

      {/* Progress bar */}
      {!typingDone&&(
        <div style={{height:2,borderRadius:999,background:'rgba(255,215,0,0.08)',marginBottom:'1rem',overflow:'hidden',position:'relative',zIndex:2,flexShrink:0}}>
          <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,#4B0082,#6A0DAD,#FFD700)',borderRadius:999,boxShadow:'0 0 10px rgba(255,215,0,0.6)',transition:'width 0.05s linear'}}/>
        </div>
      )}

      {/* Divider */}
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,215,0,0.6),transparent)',marginBottom:'1.25rem',position:'relative',zIndex:2,flexShrink:0}}/>

      {/* Line numbers + code */}
      <div style={{display:'flex',gap:'1.5rem',position:'relative',zIndex:2,flex:1,overflow:'hidden'}}>
        <div style={{userSelect:'none',textAlign:'right',flexShrink:0}}>
          {JAVA_CODE.split('\n').map((_,i)=>(
            <div key={i} style={{color:i<code.split('\n').length?'rgba(255,215,0,0.35)':'rgba(255,255,255,0.08)',fontSize:'0.8rem',fontFamily:'monospace',lineHeight:1.7,transition:'color 0.4s',textShadow:i<code.split('\n').length?'0 0 4px rgba(255,215,0,0.3)':'none'}}>{i+1}</div>
          ))}
        </div>
        <pre style={{flex:1,textAlign:'left',overflow:'hidden',margin:0}}>
          <code style={{fontSize:'0.88rem',fontFamily:'monospace',whiteSpace:'pre-wrap',wordBreak:'break-word',lineHeight:1.7}}>
            {highlight(code)}
            {!typingDone&&<span style={{display:'inline-block',width:9,height:17,background:'#FFD700',boxShadow:'0 0 12px #FFD700,0 0 24px #B8860B',marginLeft:2,verticalAlign:'middle',animation:'cursorBlink 0.65s infinite'}}/>}
          </code>
        </pre>
      </div>

      {/* Output */}
      {(phase==='complete'||phase==='shrinking'||phase==='done')&&(
        <div style={{marginTop:'1rem',animation:'outputSlide 0.6s ease both',position:'relative',zIndex:2,flexShrink:0}}>
          <div style={{background:'linear-gradient(90deg,rgba(75,0,130,0.7),rgba(26,0,48,0.9))',borderTop:'1px solid rgba(255,215,0,0.35)',borderLeft:'1px solid rgba(255,215,0,0.2)',borderRight:'1px solid rgba(255,215,0,0.2)',borderRadius:'0.5rem 0.5rem 0 0',padding:'0.35rem 1rem',display:'flex',alignItems:'center',gap:'0.6rem'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 5px #22c55e'}}/>
            <span style={{color:'#B8860B',fontSize:'0.6rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.22em'}}>OUTPUT STREAM</span>
            <span style={{marginLeft:'auto',color:'rgba(255,215,0,0.4)',fontSize:'0.55rem',fontFamily:'monospace'}}>exit code 0</span>
          </div>
          <div style={{background:'rgba(0,0,0,0.6)',border:'1px solid rgba(255,215,0,0.2)',borderTop:'none',borderRadius:'0 0 0.5rem 0.5rem',padding:'0.85rem 1.25rem'}}>
            <GlowOutput text={outputTxt} done={outputDone}/>
          </div>
        </div>
      )}

      {/* Animated bottom border */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,borderRadius:'0 0 0.75rem 0.75rem',
        background:(phase==='complete'||phase==='shrinking'||phase==='done')
          ?'linear-gradient(90deg,#4B0082,#FFD700,#B8860B,#FFD700,#4B0082)'
          :`linear-gradient(90deg,#6A0DAD ${progress}%,rgba(75,0,130,0.1) ${progress}%)`,
        backgroundSize:(phase==='complete'||phase==='shrinking'||phase==='done')?'300% auto':'100%',
        animation:(phase==='complete'||phase==='shrinking'||phase==='done')?'shimmer 2.5s linear infinite':'none',
        boxShadow:(phase==='complete'||phase==='shrinking'||phase==='done')?'0 0 8px rgba(255,215,0,0.4)':'none',
      }}/>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes scanMove    { 0%{top:0%} 100%{top:100%} }
        @keyframes orbitCW     { from{transform:rotate(0deg) translateX(220px) rotate(0deg)} to{transform:rotate(360deg) translateX(220px) rotate(-360deg)} }
        @keyframes orbitCCW    { from{transform:rotate(0deg) translateX(240px) rotate(0deg)} to{transform:rotate(-360deg) translateX(240px) rotate(360deg)} }
        @keyframes sealStamp   { 0%{transform:scale(3) rotate(-20deg);opacity:0} 60%{transform:scale(0.85) rotate(4deg);opacity:1} 80%{transform:scale(1.1) rotate(-2deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes letterPop   { 0%{opacity:0;transform:translateY(-6px) scale(0.6)} 60%{transform:translateY(2px) scale(1.1)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bootLine    { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes glowPulse   { 0%,100%{box-shadow:0 0 40px rgba(255,215,0,0.3),0 0 80px rgba(106,13,173,0.3)} 50%{box-shadow:0 0 70px rgba(255,215,0,0.6),0 0 130px rgba(106,13,173,0.5)} }
        @keyframes outputSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cornerSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer     { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes centerPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes cardReveal  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ══ FULLSCREEN OVERLAY — fixed, covers everything during intro ══ */}
      {phase !== 'done' && (
        <div ref={overlayRef} style={{
          position:'fixed', top:0, left:0, width:'100vw', height:'100vh',
          zIndex:9999,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'radial-gradient(ellipse at 50% 40%,#1a0030 0%,#0d0020 55%,#000 100%)',
        }}>
          {/* Background grid */}
          <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,215,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.03) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none'}}/>
          {/* Ambient orbs */}
          <div style={{position:'absolute',top:'15%',left:'8%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(106,13,173,0.25),transparent)',filter:'blur(80px)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:'15%',right:'8%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(184,134,11,0.18),transparent)',filter:'blur(80px)',pointerEvents:'none'}}/>

          {/* ── Boot phase ── */}
          {phase==='boot' && (
            <div style={{background:'rgba(4,0,12,0.98)',border:'1px solid rgba(255,215,0,0.2)',borderRadius:'0.75rem',padding:'2rem',fontFamily:'monospace',width:'min(600px,88vw)',animation:'cardReveal 0.4s ease both'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem',paddingBottom:'0.75rem',borderBottom:'1px solid rgba(255,215,0,0.15)'}}>
                <span>♛</span>
                <span style={{color:'#B8860B',fontFamily:"'Cinzel',serif",fontSize:'0.68rem',letterSpacing:'0.25em'}}>ROYAL JVM TERMINAL v∞</span>
                <span style={{marginLeft:'auto',width:8,height:8,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e',display:'inline-block',animation:'cursorBlink 1s infinite'}}/>
              </div>
              {bootLines.map((line,i)=>(
                <div key={i} style={{color:i===bootLines.length-1?'#FFD700':'#86efac',fontSize:'0.78rem',marginBottom:'0.4rem',animation:'bootLine 0.3s ease both',textShadow:i===bootLines.length-1?'0 0 10px #FFD700':'0 0 5px #22c55e'}}>{line}</div>
              ))}
              <span style={{color:'#FFD700',animation:'cursorBlink 0.7s infinite',fontSize:'0.9rem'}}>█</span>
            </div>
          )}

          {/* ── Matrix phase ── */}
          {phase==='matrix' && (
            <div style={{position:'relative',borderRadius:'0.75rem',overflow:'hidden',width:'min(600px,88vw)',height:220,background:'#000'}}>
              <MatrixRain/>
              <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:2,flexDirection:'column',gap:'0.5rem'}}>
                <span style={{fontFamily:"'Cinzel',serif",fontSize:'2rem',color:'#FFD700',textShadow:'0 0 20px #FFD700,0 0 50px #B8860B',letterSpacing:'0.3em',animation:'centerPulse 0.8s ease-in-out infinite'}}>♛ LOADING ♛</span>
                <span style={{color:'rgba(255,215,0,0.5)',fontFamily:"'Cinzel',serif",fontSize:'0.6rem',letterSpacing:'0.4em'}}>COMPILING ROYAL CODE...</span>
              </div>
            </div>
          )}

          {/* ── Typing / Complete / Shrinking phases ── */}
          {(phase==='typing'||phase==='complete'||phase==='shrinking') && (
            <div style={{width:'min(640px,88vw)',height:'min(420px,70vh)',animation:'cardReveal 0.5s ease both'}}>
              <CardInner/>
            </div>
          )}
        </div>
      )}

      {/* ══ IN-PAGE SLOT — always in the DOM so we can measure its position ══ */}
      {/* This is what targetRef points to — it lives inside Index's flex layout */}
      {/* We expose it via a ref callback passed from Index */}
      <section
        ref={targetRef}
        className="flex-1 flex items-center justify-center px-4 py-4"
        style={{minHeight:0}}
      >
        {phase === 'done' && (
          <div style={{width:'100%',maxWidth:640,height:'100%',minHeight:260,animation:'cardReveal 0.5s ease both'}}>
            <CardInner/>
          </div>
        )}
      </section>
    </>
  );
}