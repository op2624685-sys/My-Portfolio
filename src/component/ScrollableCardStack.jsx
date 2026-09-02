import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  ShoppingCart,
  CheckSquare,
  Cpu,
  MessageSquare,
  CreditCard,
  BarChart3,
  Layers,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

const ICON_MAP = {
  ShoppingCart,
  CheckSquare,
  Cpu,
  MessageSquare,
  CreditCard,
  BarChart3,
};

const ProjectCard = ({ project, index, totalCount, activeIndex }) => {
  const isPast = index < activeIndex;
  const isCurrent = index === activeIndex;
  const futureOffset = index - activeIndex;
  const cardRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isCurrent) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const IconComponent = (project.icon && ICON_MAP[project.icon]) || Layers;

  const cardY = isPast ? -180 : isCurrent ? 0 : futureOffset * 24;
  const cardScale = isPast ? 0.88 : isCurrent ? 1 : Math.max(0.82, 1 - futureOffset * 0.04);
  const cardOpacity = isPast ? 0 : isCurrent ? 1 : Math.max(0.3, 1 - futureOffset * 0.2);

  return (
    <motion.div
      initial={false}
      animate={{
        y: cardY,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: 100 - index,
      }}
      transition={{ type: 'spring', stiffness: 190, damping: 24 }}
      style={{
        position: 'absolute',
        width: '100%',
        maxWidth: '920px',
        left: '50%',
        x: '-50%',
        cursor: 'pointer',
        pointerEvents: isCurrent ? 'auto' : 'none',
        willChange: 'transform, opacity',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-project-card-emerald"
        style={{
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '420px',
          borderRadius: '32px',
          background: 'linear-gradient(135deg, rgba(14, 28, 23, 0.98) 0%, rgba(9, 18, 15, 0.99) 50%, rgba(5, 11, 9, 1.0) 100%)',
          backdropFilter: 'blur(28px) saturate(190%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%)',
          border: '1px solid rgba(52, 211, 153, 0.24)',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), inset 0 1px 1px 0 rgba(167, 243, 208, 0.35), inset 0 0 35px 0 rgba(52, 211, 153, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.4) 30%, rgba(167, 243, 208, 0.6) 50%, rgba(52, 211, 153, 0.4) 70%, transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, transparent 65%)',
            pointerEvents: 'none',
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            left: '-10%',
            width: '45%',
            height: '75%',
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
            filter: 'blur(24px)',
          }}
        />
        {isCurrent && mousePos.isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52, 211, 153, 0.14), transparent 75%)`,
              pointerEvents: 'none',
              transition: 'background 0.15s ease',
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.25) 0%, rgba(16, 185, 129, 0.08) 100%)',
                border: '1px solid rgba(52, 211, 153, 0.45)',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 8px 24px -4px rgba(52, 211, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(12px)',
                flexShrink: 0,
              }}
            >
              <IconComponent size={26} style={{ color: '#34d399' }} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.1,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <div
            className="project-counter-pill"
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: 999,
              background: 'rgba(52, 211, 153, 0.08)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#a7f3d0',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px -3px rgba(0,0,0,0.3)',
            }}
          >
            <span>0{index + 1}</span>
            <span style={{ opacity: 0.4, color: 'rgba(167, 243, 208, 0.5)' }}>/</span>
            <span style={{ opacity: 0.6 }}>0{totalCount}</span>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '2.5rem',
            position: 'relative',
            zIndex: 2,
            marginTop: 'auto',
          }}
          className="card-content-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p
              style={{
                fontSize: '1.12rem',
                color: 'rgba(226, 252, 243, 0.82)',
                lineHeight: 1.7,
                margin: 0,
                marginBottom: '2rem',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="tech-pill-emerald"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.48rem 0.95rem',
                    borderRadius: '12px',
                    background: 'rgba(52, 211, 153, 0.06)',
                    border: '1px solid rgba(52, 211, 153, 0.18)',
                    backdropFilter: 'blur(10px)',
                    color: '#d1fae5',
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <Sparkles size={12} style={{ color: '#34d399', opacity: 0.9 }} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '0.9rem',
              position: 'relative',
            }}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-action-btn-emerald-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.9rem 1.2rem',
                fontSize: '0.95rem',
                borderRadius: '16px',
                fontWeight: 500,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid rgba(52, 211, 153, 0.25)',
                background: 'rgba(52, 211, 153, 0.04)',
                color: '#ffffff',
                textDecoration: 'none',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Github size={18} /> View Source Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-action-btn-emerald-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.9rem 1.2rem',
                fontSize: '0.95rem',
                borderRadius: '16px',
                fontWeight: 600,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                color: '#022c22',
                background: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 50%, #059669 100%)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 8px 24px -4px rgba(52, 211, 153, 0.5)',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={18} /> Live Demo <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollableCardStack = ({ items, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
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
        height: `${items.length * 50}vh`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: '16vh',
          height: '68vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
        }}
        className="stack-viewport"
      >
        {items.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
            totalCount={items.length}
            activeIndex={index}
          />
        ))}
        {index === items.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              zIndex: 120,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {children}
          </motion.div>
        )}
      </div>
      <style>{`
        .glass-project-card-emerald:hover {
          border-color: rgba(52, 211, 153, 0.5) !important;
          box-shadow: 0 35px 85px -15px rgba(0, 0, 0, 0.85), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), 0 0 50px -5px rgba(52, 211, 153, 0.3) !important;
        }

        .tech-pill-emerald:hover {
          background: rgba(52, 211, 153, 0.18) !important;
          border-color: rgba(52, 211, 153, 0.5) !important;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px -4px rgba(52, 211, 153, 0.35);
        }

        .glass-action-btn-emerald-secondary:hover {
          background: rgba(52, 211, 153, 0.12) !important;
          border-color: rgba(52, 211, 153, 0.5) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(52, 211, 153, 0.25);
        }

        .glass-action-btn-emerald-primary:hover {
          transform: translateY(-2px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 12px 34px -4px rgba(52, 211, 153, 0.65) !important;
        }

        @media (max-width: 768px) {
          .stack-viewport {
            top: 10vh !important;
            height: 80vh !important;
          }
          .card-content-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            text-align: left;
          }
          .glass-project-card-emerald {
            padding: 1.25rem !important;
            min-height: auto !important;
            margin: 0 1rem !important;
            border-radius: 24px !important;
          }
          .glass-project-card-emerald h3 {
            font-size: 1.2rem !important;
            margin-bottom: 0.5rem !important;
          }
          .glass-project-card-emerald p {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
            margin-bottom: 1rem !important;
          }
          .glass-action-btn-emerald-primary,
          .glass-action-btn-emerald-secondary {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.75rem !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollableCardStack;
