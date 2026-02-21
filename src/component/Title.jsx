import React from 'react';
import { motion } from 'framer-motion';

const Title = () => {
  return (
    <div className='flex justify-center items-center py-8'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center px-4'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-xl md:text-2xl mb-4 font-light tracking-wide'
          style={{ color: '#d4af37', fontFamily: "'Cinzel', serif", letterSpacing: '0.2em' }}
        >
          Hey there, 👑
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className='text-white'>I'm </span>
          <span
            className='text-transparent bg-clip-text animate-float'
            style={{
              backgroundImage: 'linear-gradient(90deg, #B8860B, #FFD700, #FFF8DC, #FFD700, #B8860B)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'float 3s ease-in-out infinite, shimmer 5s linear infinite',
            }}
          >
            Om Prakash
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className='text-2xl md:text-3xl lg:text-4xl font-semibold'
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className='text-gray-300'>A </span>
          <span className='relative inline-block'>
            <span
              className='text-transparent bg-clip-text'
              style={{
                backgroundImage: 'linear-gradient(90deg, #B8860B, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              JAVA
            </span>
            <span
              className='absolute -bottom-1 left-0 w-full h-1 rounded-full'
              style={{ background: 'linear-gradient(90deg, #B8860B, #FFD700)' }}
            />
          </span>
          <span className='text-gray-300'> Backend Engineer</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className='mt-6 flex justify-center gap-3 flex-wrap'
        >
          {['Spring Boot', 'Microservices', 'REST API'].map((tech, idx) => (
            <span
              key={idx}
              className='px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg'
              style={{
                background: 'rgba(75,0,130,0.3)',
                border: '1px solid rgba(255,215,0,0.3)',
                color: '#d4af37',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Title;