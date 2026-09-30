import { motion } from 'framer-motion';

const ValuesGrid = ({ values }) => {
  const accentColors = {
    emerald: {
      bg: 'rgba(16, 185, 129, 0.06)',
      border: 'rgba(16, 185, 129, 0.12)',
      hoverBorder: 'rgba(16, 185, 129, 0.35)',
      glow: 'rgba(16, 185, 129, 0.25)',
      text: 'text-emerald-400',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconBorder: 'rgba(16, 185, 129, 0.3)',
      accent: '#10b981',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    cyan: {
      bg: 'rgba(6, 182, 212, 0.06)',
      border: 'rgba(6, 182, 212, 0.12)',
      hoverBorder: 'rgba(6, 182, 212, 0.35)',
      glow: 'rgba(6, 182, 212, 0.25)',
      text: 'text-cyan-400',
      iconBg: 'rgba(6, 182, 212, 0.12)',
      iconBorder: 'rgba(6, 182, 212, 0.3)',
      accent: '#06b6d4',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    violet: {
      bg: 'rgba(139, 92, 246, 0.06)',
      border: 'rgba(139, 92, 246, 0.12)',
      hoverBorder: 'rgba(139, 92, 246, 0.35)',
      glow: 'rgba(139, 92, 246, 0.25)',
      text: 'text-violet-400',
      iconBg: 'rgba(139, 92, 246, 0.12)',
      iconBorder: 'rgba(139, 92, 246, 0.3)',
      accent: '#8b5cf6',
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.06)',
      border: 'rgba(245, 158, 11, 0.12)',
      hoverBorder: 'rgba(245, 158, 11, 0.35)',
      glow: 'rgba(245, 158, 11, 0.25)',
      text: 'text-amber-400',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconBorder: 'rgba(245, 158, 11, 0.3)',
      accent: '#f59e0b',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    teal: {
      bg: 'rgba(17, 245, 158, 0.06)',
      border: 'rgba(17, 245, 158, 0.12)',
      hoverBorder: 'rgba(17, 245, 158, 0.35)',
      glow: 'rgba(17, 245, 158, 0.25)',
      text: 'text-teal-400',
      iconBg: 'rgba(17, 245, 158, 0.12)',
      iconBorder: 'rgba(17, 245, 158, 0.3)',
      accent: '#11f59e',
      badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
    },
    rose: {
      bg: 'rgba(244, 114, 182, 0.06)',
      border: 'rgba(244, 114, 182, 0.12)',
      hoverBorder: 'rgba(244, 114, 182, 0.35)',
      glow: 'rgba(244, 114, 182, 0.25)',
      text: 'text-rose-400',
      iconBg: 'rgba(244, 114, 182, 0.12)',
      iconBorder: 'rgba(244, 114, 182, 0.3)',
      accent: '#f472b6',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    },
    orange: {
      bg: 'rgba(249, 115, 22, 0.06)',
      border: 'rgba(249, 115, 22, 0.12)',
      hoverBorder: 'rgba(249, 115, 22, 0.35)',
      glow: 'rgba(249, 115, 22, 0.25)',
      text: 'text-orange-400',
      iconBg: 'rgba(249, 115, 22, 0.12)',
      iconBorder: 'rgba(249, 115, 22, 0.3)',
      accent: '#f97316',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
    indigo: {
      bg: 'rgba(99, 102, 241, 0.06)',
      border: 'rgba(99, 102, 241, 0.12)',
      hoverBorder: 'rgba(99, 102, 241, 0.35)',
      glow: 'rgba(99, 102, 241, 0.25)',
      text: 'text-indigo-400',
      iconBg: 'rgba(99, 102, 241, 0.12)',
      iconBorder: 'rgba(99, 102, 241, 0.3)',
      accent: '#6366f1',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    pink: {
      bg: 'rgba(236, 72, 153, 0.06)',
      border: 'rgba(236, 72, 153, 0.12)',
      hoverBorder: 'rgba(236, 72, 153, 0.35)',
      glow: 'rgba(236, 72, 153, 0.25)',
      text: 'text-pink-400',
      iconBg: 'rgba(236, 72, 153, 0.12)',
      iconBorder: 'rgba(236, 72, 153, 0.3)',
      accent: '#ec4899',
      badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
    },
    sky: {
      bg: 'rgba(56, 189, 248, 0.06)',
      border: 'rgba(56, 189, 248, 0.12)',
      hoverBorder: 'rgba(56, 189, 248, 0.35)',
      glow: 'rgba(56, 189, 248, 0.25)',
      text: 'text-sky-400',
      iconBg: 'rgba(56, 189, 248, 0.12)',
      iconBorder: 'rgba(56, 189, 248, 0.3)',
      accent: '#38bdf8',
      badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl mx-auto">
      {values.map((val, idx) => {
        const accent = accentColors[val.accent] || accentColors.emerald;
        const isLast = idx === values.length - 1;
        return (
          <motion.div
            key={val.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
            className="relative group overflow-hidden p-7 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-lg cursor-default"
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

            {/* Step number indicator */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold"
              style={{
                background: accent.iconBg,
                border: `1px solid ${accent.iconBorder}`,
                color: accent.text
              }}
            >
              {idx + 1}
            </div>

            <div className="relative z-10">
              {/* Icon + Badge row */}
              <div className="flex items-center justify-between mb-5">
                <div className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: accent.iconBg,
                    border: `1px solid ${accent.iconBorder}`,
                    boxShadow: `0 0 20px -6px ${accent.glow}`
                  }}
                >
                  <val.Icon />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border ${accent.badge}`}>
                  {val.badge}
                </span>
              </div>

              <h3 className="text-base font-bold tracking-tight mb-2"
                style={{ color: 'var(--text-primary)' }}>{val.title}</h3>

              <p className="text-xs leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{val.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {val.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/20 border border-white/5"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${accent.accent}33, transparent)` }} />
            </div>

            {/* Connector arrow between steps (hidden on last card) */}
            {!isLast && (
              <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 items-center justify-center w-8 text-center"
                style={{ color: accent.accent, opacity: 0.6 }}
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6H21M21 6L16 1M21 6L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ValuesGrid;