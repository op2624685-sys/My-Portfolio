import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Mail } from 'lucide-react';
import TextRotation from './TextRotation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home',     path: '/My-Portfolio' },
    { name: 'Skills',   path: '/My-Portfolio/skills' },
    { name: 'Projects', path: '/My-Portfolio/projects' },
    { name: 'About',    path: '/My-Portfolio/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className='navbar flex justify-between items-center px-6 py-4 w-full relative z-50'>
      {/* Logo */}
      <div className='flex items-center gap-4'>
        <div className="relative">
          {/* gold glow ring */}
          <div className="absolute inset-0 rounded-full blur-md opacity-75 animate-pulse"
            style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)' }} />
          <div className="relative h-14 w-14 rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-lg ring-2"
            style={{
              background: 'linear-gradient(135deg, #B8860B, #FFD700)',
              ringColor: 'rgba(255,215,0,0.5)',
              fontFamily: "'Cinzel', serif",
            }}>
            OP
          </div>
        </div>
        <h1 className='text-white text-xl hidden lg:block'>
          <TextRotation />
        </h1>
      </div>

      {/* Desktop Nav Links */}
      <div className='hidden md:flex items-center absolute left-1/2 -translate-x-1/2'>
        <ul className='flex gap-8'>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-lg font-medium transition-all duration-300 relative group ${
                  isActive(link.path) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                }`}
                style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', letterSpacing: '0.1em' }}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ background: 'linear-gradient(90deg, #B8860B, #FFD700)' }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Buttons */}
      <div className='hidden md:flex gap-3'>
        <a
          href="https://drive.google.com/your-resume-link"
          target="_blank"
          rel="noopener noreferrer"
          className='flex items-center gap-2 px-5 py-2.5 text-black rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105'
          style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)', fontFamily: "'Cinzel', serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
        >
          <FileText className="w-4 h-4" />
          <span>Resume</span>
        </a>
        <a
          href="mailto:omprakash@example.com"
          className='flex items-center gap-2 px-5 py-2.5 text-yellow-300 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 border'
          style={{ borderColor: 'rgba(255,215,0,0.4)', background: 'rgba(75,0,130,0.3)', fontFamily: "'Cinzel', serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
        >
          <Mail className="w-4 h-4" />
          <span>Send Email</span>
        </a>
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='md:hidden text-yellow-400 p-2 rounded-lg transition-colors'
        style={{ background: 'rgba(75,0,130,0.3)' }}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 backdrop-blur-lg border-t md:hidden shadow-xl'
          style={{ background: 'rgba(10,0,30,0.98)', borderColor: 'rgba(255,215,0,0.15)' }}>
          <ul className='flex flex-col p-4 gap-2'>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.path) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                  }`}
                  style={isActive(link.path)
                    ? { background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', fontFamily: "'Cinzel', serif" }
                    : { fontFamily: "'Cinzel', serif" }
                  }
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='flex flex-col gap-3 p-4 border-t' style={{ borderColor: 'rgba(255,215,0,0.15)' }}>
            <a
              href="https://drive.google.com/your-resume-link"
              target="_blank"
              rel="noopener noreferrer"
              className='flex items-center justify-center gap-2 px-5 py-3 text-black rounded-lg font-semibold shadow-lg'
              style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)' }}
            >
              <FileText className="w-5 h-5" />
              <span>Resume</span>
            </a>
            <a
              href="mailto:omprakash@example.com"
              className='flex items-center justify-center gap-2 px-5 py-3 text-yellow-300 rounded-lg font-semibold border'
              style={{ borderColor: 'rgba(255,215,0,0.4)', background: 'rgba(75,0,130,0.3)' }}
            >
              <Mail className="w-5 h-5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;