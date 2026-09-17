import { motion } from 'framer-motion';

const ExpertiseGrid = ({ skills }) => {
  const accentColors = {
    emerald: {
      bg: 'rgba(16, 185, 129, 0.06)',
      border: 'rgba(16, 185, 129, 0.12)',
      hoverBorder: 'rgba(16, 185, 129, 0.35)',
      glow: 'rgba(16, 185, 129, 0.3)',
      text: 'text-emerald-400',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconBorder: 'rgba(16, 185, 129, 0.3)',
      accent: '#10b981'
    },
    cyan: {
      bg: 'rgba(6, 182, 212, 0.06)',
      border: 'rgba(6, 182, 212, 0.12)',
      hoverBorder: 'rgba(6, 182, 212, 0.35)',
      glow: 'rgba(6, 182, 212, 0.3)',
      text: 'text-cyan-400',
      iconBg: 'rgba(6, 182, 212, 0.12)',
      iconBorder: 'rgba(6, 182, 212, 0.3)',
      accent: '#06b6d4'
    },
    violet: {
      bg: 'rgba(139, 92, 246, 0.06)',
      border: 'rgba(139, 92, 246, 0.12)',
      hoverBorder: 'rgba(139, 92, 246, 0.35)',
      glow: 'rgba(139, 92, 246, 0.3)',
      text: 'text-violet-400',
      iconBg: 'rgba(139, 92, 246, 0.12)',
      iconBorder: 'rgba(139, 92, 246, 0.3)',
      accent: '#8b5cf6'
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.06)',
      border: 'rgba(245, 158, 11, 0.12)',
      hoverBorder: 'rgba(245, 158, 11, 0.35)',
      glow: 'rgba(245, 158, 11, 0.3)',
      text: 'text-amber-400',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconBorder: 'rgba(245, 158, 11, 0.3)',
      accent: '#f59e0b'
    },
    teal: {
      bg: 'rgba(17, 245, 158, 0.06)',
      border: 'rgba(17, 245, 158, 0.12)',
      hoverBorder: 'rgba(17, 245, 158, 0.35)',
      glow: 'rgba(17, 245, 158, 0.3)',
      text: 'text-teal-400',
      iconBg: 'rgba(17, 245, 158, 0.12)',
      iconBorder: 'rgba(17, 245, 158, 0.3)',
      accent: '#11f59e'
    },
    rose: {
      bg: 'rgba(244, 114, 182, 0.06)',
      border: 'rgba(244, 114, 182, 0.12)',
      hoverBorder: 'rgba(244, 114, 182, 0.35)',
      glow: 'rgba(244, 114, 182, 0.3)',
      text: 'text-rose-400',
      iconBg: 'rgba(244, 114, 182, 0.12)',
      iconBorder: 'rgba(244, 114, 182, 0.3)',
      accent: '#f472b6'
    },
    orange: {
      bg: 'rgba(249, 115, 22, 0.06)',
      border: 'rgba(249, 115, 22, 0.12)',
      hoverBorder: 'rgba(249, 115, 22, 0.35)',
      glow: 'rgba(249, 115, 22, 0.3)',
      text: 'text-orange-400',
      iconBg: 'rgba(249, 115, 22, 0.12)',
      iconBorder: 'rgba(249, 115, 22, 0.3)',
      accent: '#f97316'
    },
    indigo: {
      bg: 'rgba(99, 102, 241, 0.06)',
      border: 'rgba(99, 102, 241, 0.12)',
      hoverBorder: 'rgba(99, 102, 241, 0.35)',
      glow: 'rgba(99, 102, 241, 0.3)',
      text: 'text-indigo-400',
      iconBg: 'rgba(99, 102, 241, 0.12)',
      iconBorder: 'rgba(99, 102, 241, 0.3)',
      accent: '#6366f1'
    },
    pink: {
      bg: 'rgba(236, 72, 153, 0.06)',
      border: 'rgba(236, 72, 153, 0.12)',
      hoverBorder: 'rgba(236, 72, 153, 0.35)',
      glow: 'rgba(236, 72, 153, 0.3)',
      text: 'text-pink-400',
      iconBg: 'rgba(236, 72, 153, 0.12)',
      iconBorder: 'rgba(236, 72, 153, 0.3)',
      accent: '#ec4899'
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {skills.map((skill, idx) => {
        const accent = accentColors[skill.accent] || accentColors.emerald;
        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
            className="relative group overflow-hidden p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-lg"
            style={{
              borderColor: accent.border,
              background: `
                radial-gradient(circle at 20% 30%, ${accent.bg} 0%, transparent 22%),
                radial-gradient(circle at 80% 70%, ${accent.bg} 0%, transparent 22%),
                repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255, 255, 255, 0.01) 1px, rgba(255, 255, 255, 0.01) 5px)
              `,
              boxShadow: '0 10px 40px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: `linear-gradient(45deg, transparent 0%, transparent 30%, ${accent.bg} 50%, transparent 70%, transparent 100%)`,
                backgroundSize: '200% 200%',
                backgroundPosition: '0 0',
                opacity: 0,
                transition: 'opacity 0.6s ease, background-position 2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.backgroundPosition = '200% 200%';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0';
                e.currentTarget.style.backgroundPosition = '0 0';
              }}
            />

            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 opacity-60"
              style={{ background: `linear-gradient(90deg, ${accent.accent}, transparent 60%)` }} />

            <div className="relative z-10">
              {/* Icon with glow */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: accent.iconBg,
                    border: `1px solid ${accent.iconBorder}`,
                    boxShadow: `0 0 24px -6px ${accent.glow}`
                  }}
                >
                  <motion.span
                    whileHover={{ scale: [1, 1.2, 1] }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-2xl ${accent.text} transition-all duration-300`}
                  >
                    <skill.Icon />
                  </motion.span>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-1"
                    style={{ color: 'var(--text-primary)' }}>{skill.title}</h3>
                  <div className="w-12 h-0.5 rounded"
                    style={{ background: `linear-gradient(90deg, ${accent.accent}, transparent)`, marginBottom: '1rem' }}></div>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{skill.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {skill.tags.map((tag, tIdx) => (
                  <motion.span
                    key={tIdx}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: tIdx * 0.05 }}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 bg-black/20 border border-white/5 group-hover:bg-black/30 group-hover:border-white/10"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${accent.accent}33, transparent)` }} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ExpertiseGrid;