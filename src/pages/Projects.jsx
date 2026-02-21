import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github} from 'lucide-react';
import Navbar from '../component/Navbar';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Backend API',
      description: 'A comprehensive RESTful API for e-commerce platform with user authentication, product management, shopping cart, and order processing.',
      technologies: ['Spring Boot', 'MySQL', 'JWT', 'Spring Security'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'linear-gradient(135deg, #4B0082, #6A0DAD)'
    },
    {
      title: 'Task Management System',
      description: 'Enterprise task management application with role-based access control, real-time notifications, and advanced filtering.',
      technologies: ['Java', 'Spring MVC', 'Hibernate', 'PostgreSQL'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'linear-gradient(135deg, #B8860B, #FFD700)'
    },
    {
      title: 'Microservices Architecture',
      description: 'Scalable microservices-based application with service discovery, API gateway, and distributed tracing.',
      technologies: ['Spring Cloud', 'Docker', 'Kubernetes', 'Redis'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'linear-gradient(135deg, #1a0030, #4B0082)'
    },
    {
      title: 'Real-time Chat Application',
      description: 'WebSocket-based real-time messaging platform with group chats, file sharing, and user presence indicators.',
      technologies: ['Spring Boot', 'WebSocket', 'MongoDB', 'RabbitMQ'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'linear-gradient(135deg, #7B0D1E, #B8860B)'
    },
    {
      title: 'Payment Gateway Integration',
      description: 'Secure payment processing system with multiple payment providers, transaction management, and fraud detection.',
      technologies: ['Spring Boot', 'Stripe API', 'MySQL', 'Redis'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'linear-gradient(135deg, #6A0DAD, #B8860B)'
    },
    {
      title: 'Analytics Dashboard API',
      description: 'High-performance backend for analytics dashboard with data aggregation, caching, and export functionality.',
      technologies: ['Java', 'Spring Boot', 'ElasticSearch', 'Kafka'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'linear-gradient(135deg, #4B0082, #B8860B)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
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
            My Projects
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(212,175,55,0.7)' }}>
            Showcasing my work in backend development and system architecture
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 shadow-lg"
              style={{
                background: 'rgba(26,0,48,0.7)',
                border: '1px solid rgba(255,215,0,0.18)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.55)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(75,0,130,0.4), 0 0 20px rgba(255,215,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.18)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Gradient top bar */}
              <div className="h-1" style={{ background: project.gradient }} />

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                  {project.title}
                </h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(75,0,130,0.35)',
                        border: '1px solid rgba(255,215,0,0.25)',
                        color: '#d4af37',
                        fontFamily: "'Cinzel', serif",
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 flex-1 justify-center"
                    style={{ background: 'rgba(75,0,130,0.4)', border: '1px solid rgba(255,215,0,0.2)', color: '#d4af37' }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem' }}>Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 flex-1 justify-center hover:scale-105 text-black font-semibold"
                    style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)' }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem' }}>Live</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg mb-4" style={{ color: 'rgba(212,175,55,0.5)' }}>
            More projects available on my GitHub profile
          </p>
          <a
            href="https://github.com/omprakash"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-black rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
            style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)', fontFamily: "'Cinzel', serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            <Github className="w-5 h-5" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;