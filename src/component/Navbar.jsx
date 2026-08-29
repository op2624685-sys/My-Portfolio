import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Mail, Download } from 'lucide-react';
import TextRotation from './TextRotation';

const HOME_PATH = '/';

const navLinks = [
  { name: 'Home',     path: HOME_PATH               },
  { name: 'Skills',   path: `${HOME_PATH}skills`   },
  { name: 'Projects', path: `${HOME_PATH}projects` },
  { name: 'About',    path: `${HOME_PATH}about`    },
  { name: 'Contact',  path: `${HOME_PATH}contact`  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Active path follows the route. The Index page updates this on scroll
  // (via history.replaceState + popstate), so clicking OR scrolling will
  // both keep the navbar in sync.
  const activePath = location.pathname;

  /* Track scroll for the "scrolled" pill style. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Click handler: push the route. The page-level effect scrolls. */
  const handleNavClick = useCallback(
    (e, path) => {
      e.preventDefault();
      setIsMenuOpen(false);

      // Signal to Index page that manual navigation is happening
      window.dispatchEvent(new CustomEvent('manual-nav', { detail: { path } }));

      navigate(path);
    },
    [navigate]
  );

  return (
    <>
      <style>{`
        .nb-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 14px 16px;
          pointer-events: none;
          transition: padding 0.4s var(--ease-out);
        }
        .nb-root.scrolled { padding: 10px 16px; }

        .nb-pill {
          pointer-events: auto;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.55rem 0.7rem 0.55rem 1.1rem;
          background: rgba(17, 17, 20, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--border-default);
          border-radius: 999px;
          box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
          transition: all 0.4s var(--ease-out);
        }
        .nb-root.scrolled .nb-pill {
          background: rgba(17, 17, 20, 0.85);
          border-color: var(--border-strong);
          box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .nb-segment {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nb-segment.center { flex: 1; justify-content: center; gap: 0.4rem; }
        .nb-segment.right  { gap: 0.5rem; }

        .nb-link {
          position: relative;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 450;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.5rem 0.95rem;
          transition: color 0.3s var(--ease-out);
          letter-spacing: -0.005em;
          display: inline-block;
          white-space: nowrap;
          cursor: pointer;
        }
        .nb-link:hover { color: var(--text-primary); }
        .nb-link.active { color: var(--text-primary); font-weight: 500; }

        .nb-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 4px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          transform: translate(-50%, 8px) scale(0);
          transition: transform 0.4s var(--ease-out), opacity 0.4s var(--ease-out);
          opacity: 0;
          box-shadow: 0 0 8px var(--accent);
        }
        .nb-link.active::after {
          transform: translate(-50%, 0) scale(1);
          opacity: 1;
        }

        .nb-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          text-decoration: none;
          cursor: pointer;
        }
        .nb-logo-glyph {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, #f0d4a8 0%, #d4af7a 60%, #a87c4b 100%);
          display: grid;
          place-items: center;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 0.92rem;
          color: #0a0a0b;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 1px 2px rgba(0, 0, 0, 0.4),
            0 6px 16px -6px var(--accent-glow);
          transition: transform 0.5s var(--ease-out);
          flex-shrink: 0;
          object-fit: cover;
        }
        .nb-logo:hover .nb-logo-glyph { transform: scale(1.1); }

        .nb-logo-name {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.92rem;
          color: var(--text-primary);
          letter-spacing: '-0.01em';
        }
        .nb-logo-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-muted);
          margin: 0 0.1rem;
        }
        .nb-logo-meta {
          display: inline-flex;
          align-items: center;
        }

        .nb-menu-btn {
          display: none;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-default);
          color: var(--text-primary);
          width: 38px;
          height: 38px;
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s var(--ease-out);
        }
        .nb-menu-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--border-strong);
        }

        .nb-mobile-panel {
          pointer-events: auto;
          margin: 12px auto 0;
          width: 90%;
          max-width: 400px;
          padding: 1.5rem;
          background: rgba(17, 17, 20, 0.95);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--border-default);
          border-radius: 24px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: fadeInUp 0.4s var(--ease-out) both;
        }

        .nb-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 450;
          border-radius: 16px;
          transition: all 0.3s var(--ease-out);
          cursor: pointer;
        }
        .nb-mobile-link:hover, .nb-mobile-link.active {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          transform: translateX(5px);
        }
        .nb-mobile-link.active {
          background: rgba(212, 175, 122, 0.12);
          color: var(--accent-soft);
          font-weight: 500;
        }

        @media (max-width: 880px) {
          .nb-desktop { display: none !important; }
          .nb-mobile  { display: inline-flex !important; }
          .nb-menu-btn { display: inline-flex !important; }
          .nb-logo-name { font-size: 0.85rem; }
        }
        @media (min-width: 881px) {
          .nb-desktop { display: inline-flex !important; }
          .nb-mobile  { display: none !important; }
        }
      `}</style>

      <div className={`nb-root${scrolled ? ' scrolled' : ''}`}>
        <div className="nb-pill">
          {/* ── LEFT: Logo ── */}
          <div className="nb-segment">
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => handleNavClick(e, HOME_PATH)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNavClick(e, HOME_PATH); }}
              className="nb-logo"
            >
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/profile/om-photo.jpg`}
                alt="Profile"
                className="nb-logo-glyph"
              />
              <span className="nb-logo-name">Om Prakash</span>
              <span className="nb-desktop nb-logo-dot" />
              <span className="nb-logo-meta">
                <TextRotation size="sm" />
              </span>
            </span>
          </div>

          {/* ── CENTER: Nav Links ── */}
          <div className="nb-segment center nb-desktop">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`nb-link${activePath === link.path ? ' active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* ── RIGHT: CTAs + mobile toggle ── */}
          <div className="nb-segment right">
            <a
              href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/resume.pdf`}
              download="Om_Prakash_Resume.pdf"
              className="btn-ghost nb-desktop"
              aria-label="Download Resume"
            >
              <Download size={14} strokeWidth={2} />
            </a>
            <a
              href="mailto:op2624685@gmail.com"
              className="btn-ghost nb-desktop"
              aria-label="Email"
            >
              <Mail size={14} strokeWidth={2} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nb-menu-btn nb-mobile"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {isMenuOpen && (
          <div className="nb-mobile-panel nb-mobile">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`nb-mobile-link${activePath === link.path ? ' active' : ''}`}
              >
                <span>{link.name}</span>
                <ArrowUpRight size={16} strokeWidth={1.75} style={{ opacity: 0.5 }} />
              </a>
            ))}
            <a
              href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/resume.pdf`}
              download="Om_Prakash_Resume.pdf"
              onClick={() => setIsMenuOpen(false)}
              className="nb-mobile-link"
              style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.4rem', paddingTop: '0.85rem' }}
            >
              <span>Resume</span>
              <Download size={16} strokeWidth={1.75} style={{ opacity: 0.5 }} />
            </a>
            <a
              href="mailto:op2624685@gmail.com"
              onClick={() => setIsMenuOpen(false)}
              className="nb-mobile-link"
              style={{ borderTop: 'none', marginTop: '0', paddingTop: '0' }}
            >
              <span>Email</span>
              <Mail size={16} strokeWidth={1.75} style={{ opacity: 0.5 }} />
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
