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
          className='text-xl md:text-2xl text-purple-300 mb-4 font-light tracking-wide'
        >
          Hey there, 👋
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'
        >
          <span className='text-white'>I'm </span>
          <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-purple-600 animate-float'>
            Om Prakash
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className='text-2xl md:text-3xl lg:text-4xl font-semibold'
        >
          <span className='text-gray-300'>A </span>
          <span className='relative inline-block'>
            <span className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500'>
              JAVA
            </span>
            <span className='absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full' />
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
              className='px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-purple-300 font-medium shadow-lg'
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
