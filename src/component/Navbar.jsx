import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Mail } from 'lucide-react';
import TextRotation from './TextRotation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const location = useLocation();
  const navRef   = useRef(null);

  const navLinks = [
    { name:'Home',     path:'/My-Portfolio' },
    { name:'Skills',   path:'/My-Portfolio/skills'},
    { name:'Projects', path:'/My-Portfolio/projects'},
    { name:'About',    path:'/My-Portfolio/about'},
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-link-royal {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: rgba(255,185,128,0.7);
          text-decoration: none;
          transition: color 0.3s ease;
          padding-bottom: 4px;
        }
        .nav-link-royal::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: linear-gradient(90deg, #c46a2b, #ffb347);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 0 6px rgba(255,179,71,0.4);
        }
        .nav-link-royal:hover { color: #ffb347; }
        .nav-link-royal:hover::after { width: 100%; }
        .nav-link-royal.active { color: #ffb347; }
        .nav-link-royal.active::after { width: 100%; }

        .btn-resume {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 1.1rem;
          background: linear-gradient(135deg, #c46a2b, #ffb347, #c46a2b);
          background-size: 200% auto;
          color: #0a0010;
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.35s ease;
          box-shadow: 0 0 12px rgba(255,179,71,0.2);
        }
        .btn-resume:hover {
          background-position: right center;
          box-shadow: 0 0 24px rgba(255,179,71,0.45);
          transform: translateY(-1px);
        }

        .btn-email {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.43rem 1.1rem;
          background: transparent;
          color: rgba(255,185,128,0.85);
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          border-radius: 4px;
          border: 1px solid rgba(255,179,71,0.3);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-email:hover {
          background: rgba(58,31,21,0.3);
          border-color: rgba(255,179,71,0.6);
          color: #ffb347;
          box-shadow: 0 0 16px rgba(255,179,71,0.15);
          transform: translateY(-1px);
        }

        @keyframes logoGlow {
          0%,100%{ box-shadow: 0 0 10px rgba(255,179,71,0.2), inset 0 0 10px rgba(58,31,21,0.3); }
          50%    { box-shadow: 0 0 22px rgba(255,179,71,0.45), inset 0 0 16px rgba(122,59,36,0.4); }
        }
        @keyframes navReveal {
          from { opacity:0; transform: translateY(-4px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      <nav ref={navRef} style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'0.9rem 1.75rem',
        width:'100%',
        position:'relative', zIndex:50,
        background: scrolled ? 'rgba(20,14,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,179,71,0.08)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>

        {/* ── Logo ── */}
        <div style={{display:'flex',alignItems:'center',gap:'0.9rem'}}>
          <div style={{
            width:48, height:48, borderRadius:'50%',
            background:'linear-gradient(135deg,#1b1410,#2a1b16)',
            border:'1.5px solid rgba(255,179,71,0.35)',
            display:'flex', alignItems:'center', justifyContent:'center',
            animation:'logoGlow 3s ease-in-out infinite',
            flexShrink:0,
          }}>
            <span style={{
              fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:'1rem',
              backgroundImage:'linear-gradient(135deg,#c46a2b,#ffb347)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              letterSpacing:'0.05em',
            }}>OP</span>
          </div>
          <div style={{display:'none'}} className="lg-show">
            <TextRotation />
          </div>
        </div>

        {/* ── Center Nav Links ── */}
        <ul style={{
          display:'flex', gap:'2.5rem', listStyle:'none', margin:0, padding:0,
          position:'absolute', left:'50%', transform:'translateX(-50%)',
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.path} style={{animation:`navReveal 0.4s ease both`}}>
              <Link
                to={link.path}
                className={`nav-link-royal${isActive(link.path) ? ' active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right Buttons ── */}
        <div style={{display:'flex',gap:'0.6rem',alignItems:'center'}} className="desktop-btns">
          <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener noreferrer"
            className="btn-resume">
            <FileText size={13}/>
            <span>Resume</span>
          </a>
          <a href="mailto:omprakash@example.com" className="btn-email">
            <Mail size={13}/>
            <span>Contact</span>
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background:'transparent', border:'1px solid rgba(255,179,71,0.2)',
            borderRadius:6, padding:'0.4rem', color:'rgba(255,179,71,0.7)',
            cursor:'pointer', display:'none', transition:'all 0.3s',
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>

        {/* ── Mobile dropdown ── */}
        {isMenuOpen && (
          <div style={{
            position:'absolute', top:'100%', left:0, right:0,
            background:'rgba(20,14,10,0.97)', backdropFilter:'blur(20px)',
            borderTop:'1px solid rgba(255,179,71,0.1)',
            borderBottom:'1px solid rgba(255,179,71,0.1)',
            padding:'1rem 1.5rem',
            zIndex:100,
          }}>
            <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'0.5rem',marginBottom:'1rem'}}>
              {navLinks.map(link=>(
                <li key={link.path}>
                  <Link to={link.path} onClick={()=>setIsMenuOpen(false)}
                    className={`nav-link-royal${isActive(link.path)?' active':''}`}
                    style={{display:'block',padding:'0.6rem 0'}}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',borderTop:'1px solid rgba(255,179,71,0.08)',paddingTop:'1rem'}}>
              <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener noreferrer" className="btn-resume" style={{justifyContent:'center'}}>
                <FileText size={13}/><span>Resume</span>
              </a>
              <a href="mailto:omprakash@example.com" className="btn-email" style={{justifyContent:'center'}}>
                <Mail size={13}/><span>Contact</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav  { display: flex !important; }
          .desktop-btns { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .lg-show { display: block !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav  { display: none !important; }
          .desktop-btns { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

