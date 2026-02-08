import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../component/Navbar';

const Skills = () => {
  const skills = [
    {
      name: 'Java',
      icon: '/icons/java.svg',
      level: 'Expert',
      description: 'Core Java, Java 8+, Collections, Multithreading'
    },
    {
      name: 'Spring Framework',
      icon: '/icons/spring.svg',
      level: 'Advanced',
      description: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA'
    },
    {
      name: 'MySQL',
      icon: '/icons/mysql.svg',
      level: 'Advanced',
      description: 'Database Design, Query Optimization, Stored Procedures'
    },
    {
      name: 'Git',
      icon: '/icons/git.svg',
      level: 'Advanced',
      description: 'Version Control, Branching, Merging, CI/CD'
    },
    {
      name: 'Docker',
      icon: '/icons/docker.svg',
      level: 'Intermediate',
      description: 'Containerization, Docker Compose, Deployment'
    },
    {
      name: 'REST API',
      level: 'Expert',
      description: 'RESTful Services, API Design, Microservices Architecture'
    },
    {
      name: 'Hibernate',
      level: 'Advanced',
      description: 'ORM, JPA, Entity Relationships, Query Language'
    },
    {
      name: 'Maven/Gradle',
      level: 'Advanced',
      description: 'Build Tools, Dependency Management, Project Configuration'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
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
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600 mb-4">
            My Skills
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              {/* Icon */}
              {skill.icon ? (
                <div className="mb-4 flex items-center justify-center">
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ) : (
                <div className="mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-2xl font-bold">
                    {skill.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Skill Name */}
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                {skill.name}
              </h3>

              {/* Level Badge */}
              <div className="flex justify-center mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  skill.level === 'Expert' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                  skill.level === 'Advanced' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' :
                  'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                }`}>
                  {skill.level}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-lg">
            Always learning and exploring new technologies to stay updated
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
