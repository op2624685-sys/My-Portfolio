import React from 'react';
import { motion } from 'framer-motion';

const ProfileCard = ({ profileData }) => {
  const { image, name, role, focus, location, status, year, bio, stats } = profileData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto"
    >
      {/* Left Column: Profile Image Card */}
      <div className="lg:col-span-4 flex justify-center">
        <div className="relative w-full max-w-[340px] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl" style={{ background: 'var(--bg-elev-1)' }}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover grayscale-[15%] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex justify-start items-center z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[11.5px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80]" />
                {status}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between items-center py-3 border-b border-white/5 text-sm">
              <span className="font-mono text-[12px] uppercase" style={{ color: 'var(--text-tertiary)' }}>Role</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{role}</span>
            </div>
            <div className="flex justify-between items-center py-3 text-sm">
              <span className="font-mono text-[12px] uppercase" style={{ color: 'var(--text-tertiary)' }}>Focus</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{focus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Intro Content */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[12px] font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80]" />
            // SYSTEM PROFILE
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Hello, I'm <span className="text-emerald-400"> {name}</span>
          </h1>
          <div className="text-lg font-mono mb-6" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-emerald-500">&lt;</span>{role}<span className="text-emerald-500"> /&gt;</span>
          </div>
          <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            {bio}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[140px] p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1"
              style={{ background: 'var(--bg-elev-1)' }}
            >
              <div className="text-3xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                <span className="text-emerald-400">{stat.value}</span>{stat.suffix || ''}
              </div>
              <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
