import React from 'react';
import { motion } from 'framer-motion';

const ExperienceTimeline = ({ experiences }) => {
  return (
    <div className="relative pl-8 max-w-3xl mx-auto">
      {/* Vertical Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 to-white/10" />

      <div className="flex flex-col gap-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="relative"
          >
            {/* Dot */}
            <div className={`absolute -left-[33px] top-1.5 w-3 h-3 rounded-full border-2 border-emerald-500 ${exp.isCurrent ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-[#0a0908]'}`} />

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-emerald-400">{exp.period}</span>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{exp.title}</h3>
              <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{exp.org}</div>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text-tertiary)' }}>
                {exp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
