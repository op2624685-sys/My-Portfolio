import React from 'react';
import { motion } from 'framer-motion';

const ValuesGrid = ({ values }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-6xl mx-auto">
      {values.map((val, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="p-8 transition-all duration-300"
          style={{ background: 'var(--bg-elev-1)' }}
        >
          <div className="font-mono text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{val.num}</div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{val.title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {val.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ValuesGrid;
