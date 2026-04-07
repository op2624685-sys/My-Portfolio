import React, { useState, useEffect, useRef } from 'react';

/* --- Syntax Highlighter --------------------------------------- */
function highlight(code) {
  const parts = []; let i = 0;
  while (i < code.length) {
    const r = code.slice(i);
    if      (r.startsWith('public'))  { parts.push(<span key={i} style={{color:'#ff8a65',textShadow:'0 0 8px #ff6b6b'}}>public</span>);  i+=6; }
    else if (r.startsWith('class'))   { parts.push(<span key={i} style={{color:'#ff8a65',textShadow:'0 0 8px #ff6b6b'}}>class</span>);   i+=5; }
    else if (r.startsWith('static'))  { parts.push(<span key={i} style={{color:'#ff8a65',textShadow:'0 0 8px #ff6b6b'}}>static</span>);  i+=6; }
    else if (r.startsWith('void'))    { parts.push(<span key={i} style={{color:'#ff8a65',textShadow:'0 0 8px #ff6b6b'}}>void</span>);    i+=4; }
    else if (r.startsWith('String'))  { parts.push(<span key={i} style={{color:'#ff8a65',textShadow:'0 0 8px #ff6b6b'}}>String</span>);  i+=6; }
    else if (r.startsWith('Main'))    { parts.push(<span key={i} style={{color:'#ffb347',textShadow:'0 0 12px #ffb347'}}>Main</span>);    i+=4; }
    else if (r.startsWith('main'))    { parts.push(<span key={i} style={{color:'#ffb347',textShadow:'0 0 6px #ff9a3c'}}>main</span>);    i+=4; }
    else if (r.startsWith('System'))  { parts.push(<span key={i} style={{color:'#ffd6a0',textShadow:'0 0 6px #ff9a3c'}}>System</span>);  i+=6; }
    else if (r.startsWith('out'))     { parts.push(<span key={i} style={{color:'#ffd6a0',textShadow:'0 0 6px #ff9a3c'}}>out</span>);     i+=3; }
    else if (r.startsWith('println')) { parts.push(<span key={i} style={{color:'#ffb347',textShadow:'0 0 6px #ff9a3c'}}>println</span>); i+=7; }
    else if (r.startsWith('"')) {
      const end = r.indexOf('"',1);
      if (end!==-1) { const s=r.slice(0,end+1); parts.push(<span key={i} style={{color:'#9fd78a',textShadow:'0 0 8px #7fb069'}}>{s}</span>); i+=s.length; }
      else { parts.push(<span key={i} style={{color:'#9fd78a'}}>{r}</span>); i+=r.length; }
    }
    else if ('()[]{}.,;'.includes(code[i])) { parts.push(<span key={i} style={{color:'#ffd6a0',textShadow:'0 0 6px #ff9a3c'}}>{code[i]}</span>); i++; }
    else { parts.push(<span key={i} style={{color:'#f3e7db'}}>{code[i]}</span>); i++; }
  }
  return parts;
}

/* --- Matrix Rain Canvas --------------------------------------- */
function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const cols = Math.floor(canvas.width/16), drops = Array(cols).fill(1);
    const chars = 'OP?????????????01';
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

/* --- Scan Line (while typing) --------------------------------- */
const ScanLine = ({active}) => !active ? null : (
  <div style={{position:'absolute',left:0,right:0,height:2,zIndex:5,background:'linear-gradient(90deg,transparent,rgba(255,179,71,0.9),rgba(255,255,255,0.5),rgba(255,179,71,0.9),transparent)',boxShadow:'0 0 14px 4px rgba(255,179,71,0.5)',animation:'scanMove 2.2s linear infinite',pointerEvents:'none'}}/>
);

/* --- Crown Reveal — SVG crown that draws itself stroke by stroke */
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
            <stop offset="0%" stopColor="#ffb347"/>
            <stop offset="50%" stopColor="#fff1d6"/>
            <stop offset="100%" stopColor="#c46a2b"/>
          </linearGradient>
        </defs>
        {/* Crown shape */}
        <path
          d="M2 24 L6 10 L12 16 L16 4 L20 16 L26 10 L30 24 Z"
          fill="url(#cg)"
          stroke="#c46a2b"
          strokeWidth="0.5"
          style={{
            filter:'drop-shadow(0 0 6px rgba(255,179,71,0.8))',
            strokeDasharray:120,
            strokeDashoffset:120,
            animation:'drawCrown 0.8s 0.1s ease forwards',
          }}
        />
        {/* 3 jewels on crown */}
        {[{cx:16,cy:7},{cx:9,cy:17},{cx:23,cy:17}].map((j,i)=>(
          <circle key={i} cx={j.cx} cy={j.cy} r="2"
            fill={i===0?'#ff8a65':i===1?'#ffd6a0':'#9fd78a'}
            style={{filter:`drop-shadow(0 0 4px ${i===0?'#ff6b6b':i===1?'#ff9a3c':'#7fb069'})`,animation:`jewelPop 0.3s ${0.5+i*0.12}s ease both`,opacity:0}}
          />
        ))}
        {/* Bottom band */}
        <rect x="2" y="23" width="28" height="3" rx="1.5" fill="url(#cg)" style={{filter:'drop-shadow(0 0 4px rgba(255,179,71,0.5))'}}/>
      </svg>
    </div>
  );
}

/* --- Running light along the border --------------------------- */
function BorderRunner({ active, squared = false }) {
  if (!active) return null;
  return (
    <div style={{position:'absolute',inset:0,borderRadius: squared ? '0' : '0.75rem',pointerEvents:'none',zIndex:6,overflow:'hidden'}}>
      {/* top runner */}
      <div style={{position:'absolute',top:0,left:0,height:'2px',width:'40%',background:'linear-gradient(90deg,transparent,#ffb347,transparent)',animation:'runTop 3s linear infinite',boxShadow:'0 0 8px #ffb347'}}/>
      {/* right runner */}
      <div style={{position:'absolute',top:0,right:0,width:'2px',height:'40%',background:'linear-gradient(180deg,transparent,#ffb347,transparent)',animation:'runRight 3s 0.75s linear infinite',boxShadow:'0 0 8px #ffb347'}}/>
      {/* bottom runner */}
      <div style={{position:'absolute',bottom:0,right:0,height:'2px',width:'40%',background:'linear-gradient(270deg,transparent,#ffb347,transparent)',animation:'runBottom 3s 1.5s linear infinite',boxShadow:'0 0 8px #ffb347'}}/>
      {/* left runner */}
      <div style={{position:'absolute',bottom:0,left:0,width:'2px',height:'40%',background:'linear-gradient(0deg,transparent,#ffb347,transparent)',animation:'runLeft 3s 2.25s linear infinite',boxShadow:'0 0 8px #ffb347'}}/>
    </div>
  );
}

/* --- GlowOutput letters ----------------- */
const GlowOutput = ({ text }) => (
  <span style={{ fontFamily: 'monospace', fontSize: '1.05rem', color: '#ffb347', textShadow: '0 0 10px #ffb347,0 0 22px #c46a2b' }}>
    {text}
  </span>
);

/* --- Constants ------------------------------------------------ */
const JAVA_CODE=`public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to My Portfolio");
    }
}`;
const OUTPUT_TEXT='Welcome to My Portfolio';

/* --- MAIN COMPONENT ------------------------------------------- */
export default function CodeAnimationIntro({ onIntroComplete }) {
  const [phase,       setPhase]       = useState('typing');
  const [code,        setCode]        = useState('');
  const [typingDone,  setTypingDone]  = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [outputTxt,   setOutputTxt]   = useState('');
  const [scanActive,  setScanActive]  = useState(false);
  const [showEffects, setShowEffects] = useState(false); // all completion effects
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFading, setOverlayFading] = useState(false);
  const targetRef  = useRef(null);

  
  useEffect(() => {
    if (phase === 'done' && onIntroComplete) {
      onIntroComplete();
    }
  }, [phase, onIntroComplete]);

  
  
  /* Step 2: Typing — 18ms per char */
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

  /* Step 3: Complete ? type output */
  useEffect(()=>{
    if(phase!=='complete') return;
    let idx=0;
    const iv=setInterval(()=>{
      if(idx<=OUTPUT_TEXT.length){ setOutputTxt(OUTPUT_TEXT.slice(0,idx)); idx++; }
      else { clearInterval(iv); }
    },55);
    const doneTimer=setTimeout(()=>{ setPhase('done'); setOverlayFading(true); }, OUTPUT_TEXT.length*55+300);
    const hideTimer=setTimeout(()=>setOverlayVisible(false), OUTPUT_TEXT.length*55+750);
    return()=>{ clearInterval(iv); clearTimeout(doneTimer); clearTimeout(hideTimer); };
  },[phase]);

  /* Completion state */
  const isComplete = phase==='complete'||phase==='done';

  /* -- Card content ------------------------------------------- */
  const CardInner = ({ full = false }) => (
    <div style={{
      background:'linear-gradient(135deg,rgba(20,14,10,0.98),rgba(27,20,16,0.97))',
      borderRadius: full ? '0' : '0.75rem',
      padding: full ? '3.5rem 4rem' : '1.5rem',
      width: full ? '100%' : 'auto',
      height: full ? '100%' : 'auto',
      border:`1px solid ${typingDone?'rgba(255,179,71,0.5)':'rgba(255,179,71,0.18)'}`,
      position:'relative',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
      transition:'border-color 0.6s ease, box-shadow 0.6s ease',
      boxShadow: isComplete
        ? '0 0 0 1px rgba(255,179,71,0.1), 0 0 40px rgba(255,179,71,0.15), 0 0 80px rgba(122,59,36,0.2)'
        : 'none',
    }}>

      {/* Typing scan line */}
      <ScanLine active={scanActive}/>

      {/* Completion effects ? all smooth, no glitch */}
      <BorderRunner active={showEffects} squared={full}/>
      <CrownReveal active={showEffects}/>

      {/* Subtle dot grid bg */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'radial-gradient(rgba(255,179,71,0.05) 1px,transparent 1px)',backgroundSize:'22px 22px'}}/>

      {/* -- Top bar -- */}
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem',position:'relative',zIndex:10,flexShrink:0}}>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57',boxShadow:'0 0 5px #ff5f57'}}/>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#febc2e',boxShadow:'0 0 5px #febc2e'}}/>
        <div style={{width:12,height:12,borderRadius:'50%',background:'#28c840',boxShadow:'0 0 5px #28c840'}}/>
        <span style={{marginLeft:'0.75rem',color:'#c46a2b',fontSize:'1.05rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.18em',textShadow:'0 0 8px rgba(196,106,43,0.5)'}}>
          ? Main.java
        </span>
        {typingDone && (
          <span style={{
            marginLeft:'auto',
            background:'linear-gradient(90deg,#c46a2b,#ffb347,#c46a2b)',
            backgroundSize:'200% auto',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            fontSize:'0.95rem',
            fontFamily:"'Cinzel',serif",
            letterSpacing:'0.12em',
            fontWeight:'bold',
            animation:'shimmerText 3s linear infinite',
          }}>? Compiled</span>
        )}
      </div>

      {/* Progress bar */}
      {!typingDone && (
        <div style={{height:2,borderRadius:999,background:'rgba(255,179,71,0.08)',marginBottom:'1rem',overflow:'hidden',position:'relative',zIndex:2,flexShrink:0}}>
          <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,#3b1f15,#7a3b24,#ffb347)',borderRadius:999,boxShadow:'0 0 10px rgba(255,179,71,0.6)',transition:'width 0.04s linear'}}/>
        </div>
      )}

      {/* Divider */}
      <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,179,71,0.5),transparent)',marginBottom:'1.25rem',position:'relative',zIndex:2,flexShrink:0}}/>

      {/* Line numbers + code */}
      <div style={{display:'flex',gap:'1.5rem',position:'relative',zIndex:2,overflow:'hidden'}}>
        <div style={{userSelect:'none',textAlign:'right',flexShrink:0}}>
          {JAVA_CODE.split('\n').map((_,i)=>(
            <div key={i} style={{
              color:i<code.split('\n').length?'rgba(255,179,71,0.4)':'rgba(255,255,255,0.08)',
              fontSize:'1.15rem',fontFamily:'monospace',lineHeight:1.7,
              transition:'color 0.3s, text-shadow 0.3s',
              textShadow:i<code.split('\n').length?'0 0 5px rgba(255,179,71,0.3)':'none',
            }}>{i+1}</div>
          ))}
        </div>
        <pre style={{flex:1,textAlign:'left',overflow:'hidden',margin:0}}>
          <code style={{fontSize:'1.2rem',fontFamily:'monospace',whiteSpace:'pre-wrap',wordBreak:'break-word',lineHeight:1.7}}>
            {highlight(code)}
            {!typingDone && (
              <span style={{display:'inline-block',width:9,height:17,background:'#ffb347',boxShadow:'0 0 12px #ffb347,0 0 24px #c46a2b',marginLeft:2,verticalAlign:'middle',animation:'cursorBlink 0.65s infinite'}}/>
            )}
          </code>
        </pre>
      </div>

      {/* Output panel */}
      {isComplete && (
        <div style={{marginTop:'1rem',position:'relative',zIndex:10,flexShrink:0}}>
          <div style={{background:'linear-gradient(90deg,rgba(58,31,21,0.7),rgba(27,20,16,0.9))',border:'1px solid rgba(255,179,71,0.3)',borderRadius:'0.5rem 0.5rem 0 0',padding:'0.35rem 1rem',display:'flex',alignItems:'center',gap:'0.6rem'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#7fb069',boxShadow:'0 0 6px #7fb069'}}/>
            <span style={{color:'#c46a2b',fontSize:'0.95rem',fontFamily:"'Cinzel',serif",letterSpacing:'0.22em'}}>OUTPUT STREAM</span>
            <span style={{marginLeft:'auto',color:'rgba(255,179,71,0.35)',fontSize:'0.85rem',fontFamily:'monospace'}}>exit code 0</span>
          </div>
          <div style={{background:'rgba(0,0,0,0.55)',border:'1px solid rgba(255,179,71,0.2)',borderTop:'none',borderRadius:'0 0 0.5rem 0.5rem',padding:'0.85rem 1.25rem'}}>
            <GlowOutput text={outputTxt}/>
          </div>
        </div>
      )}

      {/* Animated shimmer bottom border */}
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,height:2,borderRadius:'0 0 0.75rem 0.75rem',
        background: isComplete
          ? 'linear-gradient(90deg,#3b1f15,#ffb347,#c46a2b,#ffb347,#3b1f15)'
          : `linear-gradient(90deg,#7a3b24 ${progress}%,rgba(58,31,21,0.08) ${progress}%)`,
        backgroundSize: isComplete ? '300% auto' : '100%',
        animation: isComplete ? 'shimmer 2.5s linear infinite' : 'none',
        boxShadow: isComplete ? '0 0 10px rgba(255,179,71,0.4)' : 'none',
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

        /* Gold radial pulse on card background */

        /* Ripple rings expanding from center */

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

      {/* Fullscreen execution (no loader) */}
      {overlayVisible && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',background:'radial-gradient(ellipse at 50% 40%, rgba(27,20,16,0.9) 0%, rgba(10,7,6,0.92) 70%)', transform: overlayFading ? 'translateY(60px)' : 'translateY(0)', opacity: overlayFading ? 0 : 1, transition: 'transform 0.9s cubic-bezier(0.22,0.61,0.36,1), opacity 0.7s ease'}}>
          <div style={{width:'100vw', height:'100vh',animation: 'slideUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both'}}>
            <CardInner full />
          </div>
        </div>
      )}

      {/* -- In-page slot -- */}
      <section ref={targetRef} className="flex justify-center px-4 py-4" style={{flexShrink:0, paddingTop: '10rem'}}>
        {phase==='done' && (
          <div style={{width:'100%',maxWidth:640,animation: 'slideUp 0.8s cubic-bezier(0.22,0.61,0.36,1) both'}}>
            <div style={{transform:'scale(0.85)', transformOrigin:'top center'}}>
              <CardInner/>
            </div>
          </div>
        )}
      </section>
    </>
  );
}



































