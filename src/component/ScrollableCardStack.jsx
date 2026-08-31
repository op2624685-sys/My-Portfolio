import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index, activeIndex }) => {
  const isPast = index < activeIndex;
  const isCurrent = index === activeIndex;

  return (
    <motion.div
      initial={false}
      animate={{
        y: isPast ? -150 : 0,
        scale: isPast ? 0.85 : isCurrent ? 1 : 1 - (index - activeIndex) * 0.03,
        opacity: isPast ? 0 : 1,
        zIndex: 100 - index,
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      style={{
        position: 'absolute',
        width: '100%',
        maxWidth: '900px', // Wider for large screens
        left: '50%',
        x: '-50%',
        cursor: 'pointer',
      }}
    >
      <div className="surface-card" style={{
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(212, 175, 122, 0.3)',
        minHeight: '400px',
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(212, 175, 122, 0.1)',
        borderRadius: '32px',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Glow Effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '40%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(212, 175, 122, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(212, 175, 122, 0.2) 0%, rgba(212, 175, 122, 0.05) 100%)',
              border: '1px solid rgba(212, 175, 122, 0.3)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 600 }}>
                {project.title.charAt(0)}
              </span>
            </div>
            <div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}>
                {project.title}
              </h3>
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--accent-soft)',
                marginTop: '0.4rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Featured Project
              </div>
            </div>
          </div>
          <ArrowUpRight size={32} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '3rem',
          position: 'relative',
          zIndex: 1
        }} className="card-content-grid">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              margin: 0,
              marginBottom: '2.5rem',
              fontWeight: 400
            }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {project.technologies.map((tech) => (
                <span key={tech} style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '1rem',
            position: 'relative'
          }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: '16px',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              border: '1px solid var(--border-default)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <Github size={20} /> View Code
            </a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: '16px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px rgba(212, 175, 122, 0.2)'
            }}>
              <ExternalLink size={20} /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollableCardStack = ({ items }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const calculatedIndex = Math.min(
        Math.floor(latest * items.length),
        items.length - 1
      );
      setIndex(calculatedIndex);
    });
  }, [scrollYProgress, items.length]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: `${items.length * 70}vh`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{
        position: 'sticky',
        top: '20vh',
        height: '60vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
      }}>
        {items.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
            activeIndex={index}
          />
        ))}
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .card-content-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          .card-content-grid > div:first-child {
            align-items: center;
          }
          .card-content-grid > div:last-child {
            justify-content: center !important;
          }
          .surface-card {
            padding: 1.5rem !important;
            min-height: auto !important;
            margin: 0 1rem;
          }
          .surface-card h3 {
            font-size: 1.4rem !important;
          }
          .surface-card p {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollableCardStack;
