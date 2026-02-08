import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Navbar from '../component/Navbar';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Backend API',
      description: 'A comprehensive RESTful API for e-commerce platform with user authentication, product management, shopping cart, and order processing.',
      technologies: ['Spring Boot', 'MySQL', 'JWT', 'Spring Security'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Task Management System',
      description: 'Enterprise task management application with role-based access control, real-time notifications, and advanced filtering.',
      technologies: ['Java', 'Spring MVC', 'Hibernate', 'PostgreSQL'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Microservices Architecture',
      description: 'Scalable microservices-based application with service discovery, API gateway, and distributed tracing.',
      technologies: ['Spring Cloud', 'Docker', 'Kubernetes', 'Redis'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Real-time Chat Application',
      description: 'WebSocket-based real-time messaging platform with group chats, file sharing, and user presence indicators.',
      technologies: ['Spring Boot', 'WebSocket', 'MongoDB', 'RabbitMQ'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Payment Gateway Integration',
      description: 'Secure payment processing system with multiple payment providers, transaction management, and fraud detection.',
      technologies: ['Spring Boot', 'Stripe API', 'MySQL', 'Redis'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Analytics Dashboard API',
      description: 'High-performance backend for analytics dashboard with data aggregation, caching, and export functionality.',
      technologies: ['Java', 'Spring Boot', 'ElasticSearch', 'Kafka'],
      githubUrl: 'https://github.com/omprakash',
      liveUrl: 'https://demo-project.com',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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
            My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-linear-to-r ${project.gradient}`} />
              
              <div className="p-6">
                {/* Project Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium border border-gray-600"
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
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 bg-linear-to-r ${project.gradient} text-white rounded-lg transition-all duration-200 flex-1 justify-center hover:scale-105`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-lg mb-4">
            More projects available on my GitHub profile
          </p>
          <a
            href="https://github.com/omprakash"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
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
