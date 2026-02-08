import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Mail } from 'lucide-react';
import TextRotation from './TextRotation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/My-Portfolio' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className='navbar flex justify-between items-center px-6 py-4 w-full relative z-50'>
      {/* Left-side of the navbar - Logo & Name */}
      <div className='flex items-center gap-4'>
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-75 animate-pulse" />
          <div className="relative h-14 w-14 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-2 ring-purple-400/50">
            OP
          </div>
        </div>
        <h1 className='text-white text-xl hidden lg:block'>
          <TextRotation />
        </h1>
      </div>

      {/* Center - Desktop Navigation Links */}
      <div className='hidden md:flex items-center absolute left-1/2 -translate-x-1/2'>
        <ul className='flex gap-8'>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-lg font-medium transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-purple-400 to-pink-600 transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right-side - Action Buttons */}
      <div className='hidden md:flex gap-3'>
        <a
          href="https://drive.google.com/your-resume-link"
          target="_blank"
          rel="noopener noreferrer"
          className='flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105'
        >
          <FileText className="w-4 h-4" />
          <span>Resume</span>
        </a>
        <a
          href="mailto:omprakash@example.com"
          className='flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105'
        >
          <Mail className="w-4 h-4" />
          <span>Send Email</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors'
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-lg border-t border-gray-700 md:hidden shadow-xl'>
          <ul className='flex flex-col p-4 gap-2'>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='flex flex-col gap-3 p-4 border-t border-gray-700'>
            <a
              href="https://drive.google.com/your-resume-link"
              target="_blank"
              rel="noopener noreferrer"
              className='flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg'
            >
              <FileText className="w-5 h-5" />
              <span>Resume</span>
            </a>
            <a
              href="mailto:omprakash@example.com"
              className='flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg'
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
