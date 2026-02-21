import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../component/Navbar';

const Skills = () => {
  const skills = [
    { name: 'Java',            icon: '/icons/java.svg',   level: 'Expert',       description: 'Core Java, Java 8+, Collections, Multithreading' },
    { name: 'Spring Framework',icon: '/icons/spring.svg', level: 'Advanced',     description: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA' },
    { name: 'MySQL',           icon: '/icons/mysql.svg',  level: 'Advanced',     description: 'Database Design, Query Optimization, Stored Procedures' },
    { name: 'Git',             icon: '/icons/git.svg',    level: 'Advanced',     description: 'Version Control, Branching, Merging, CI/CD' },
    { name: 'Docker',          icon: '/icons/docker.svg', level: 'Intermediate', description: 'Containerization, Docker Compose, Deployment' },
    { name: 'REST API',                                   level: 'Expert',       description: 'RESTful Services, API Design, Microservices Architecture' },
    { name: 'Hibernate',                                  level: 'Advanced',     description: 'ORM, JPA, Entity Relationships, Query Language' },
    { name: 'Maven/Gradle',                               level: 'Advanced',     description: 'Build Tools, Dependency Management, Project Configuration' }
  ];

  const levelStyle = (level) => {
    if (level === 'Expert')       return { background: 'rgba(255,215,0,0.15)',   color: '#FFD700',  border: '1px solid rgba(255,215,0,0.45)' };
    if (level === 'Advanced')     return { background: 'rgba(106,13,173,0.25)', color: '#c4a4ff', border: '1px solid rgba(106,13,173,0.6)' };
    return                               { background: 'rgba(184,134,11,0.15)',  color: '#d4af37', border: '1px solid rgba(184,134,11,0.45)' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text mb-4"
            style={{
              backgroundImage: 'linear-gradient(90deg, #B8860B, #FFD700, #FFF8DC, #FFD700, #B8860B)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 5s linear infinite',
              fontFamily: "'Cinzel', serif",
            }}
          >
            My Skills
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(212,175,55,0.7)' }}>
            Technologies and tools I work with to build robust backend solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="backdrop-blur-sm rounded-xl p-6 transition-all duration-300 shadow-lg"
              style={{ background: 'rgba(26,0,48,0.7)', border: '1px solid rgba(255,215,0,0.18)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.55)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(75,0,130,0.4), 0 0 20px rgba(255,215,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.18)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Icon */}
              {skill.icon ? (
                <div className="mb-4 flex items-center justify-center">
                  <img src={skill.icon} alt={skill.name} className="w-16 h-16 object-contain" />
                </div>
              ) : (
                <div className="mb-4 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)', fontFamily: "'Cinzel', serif" }}
                  >
                    {skill.name.charAt(0)}
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem' }}>
                {skill.name}
              </h3>

              {/* Level Badge */}
              <div className="flex justify-center mb-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em', ...levelStyle(skill.level) }}
                >
                  {skill.level}
                </span>
              </div>

              <p className="text-sm text-center leading-relaxed" style={{ color: 'rgba(212,175,55,0.65)' }}>
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg" style={{ color: 'rgba(212,175,55,0.45)' }}>
            Always learning and exploring new technologies to stay updated
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;