import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ViewAllProjectsButton = () => {
  const profileImg = "/profile/om-photo.jpg";

  return (
    <motion.a
      href="https://github.com/op2624685-sys"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        textDecoration: 'none',
        width: 'fit-content',
        margin: '4rem auto',
        padding: '0.6rem 1.2rem',
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-default)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        zIndex: 100,
        position: 'relative'
      }}
      className="view-all-btn"
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid var(--accent)',
          boxShadow: '0 0 10px rgba(212, 175, 122, 0.4)',
        }}
      >
        <img
          src={profileImg}
          alt="Om Prakash"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingRight: '0.4rem' }}>
        <span style={{
          fontSize: '0.95rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em'
        }}>
          View All Projects
        </span>
        <ArrowUpRight size={16} style={{ color: 'var(--accent)' }} />
      </div>
      <style>{`
        .view-all-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent);
          box-shadow: 0 0 20px rgba(212, 175, 122, 0.2);
        }
      `}</style>
    </motion.a>
  );
};

export default ViewAllProjectsButton;
