import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Calendar, Code } from 'lucide-react';
import Navbar from '../component/Navbar';

const About = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/omprakash',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/omprakash',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:omprakash@example.com',
      color: 'hover:text-red-400'
    }
  ];

  const stats = [
    { label: 'Years Experience', value: '3+', icon: Calendar },
    { label: 'Projects Completed', value: '25+', icon: Code },
    { label: 'Technologies', value: '15+', icon: MapPin }
  ];

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
            About Me
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate Java Backend Developer crafting scalable solutions
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 sticky top-8">
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-1">
                    <img
                      src="https://images.unsplash.com/photo-1768463852001-811ead5844fb?q=80&w=1974&auto=format&fit=crop"
                      alt="Om Prakash"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800"></div>
                </div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Om Prakash
              </h2>
              <p className="text-purple-400 text-center mb-6 font-medium">
                Java Backend Developer
              </p>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg"
                  >
                    <stat.icon className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`p-3 bg-gray-900 rounded-lg text-gray-400 ${link.color} transition-all duration-200 border border-gray-700 hover:border-purple-500`}
                  >
                    <link.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Bio */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-8 bg-linear-to-b from-purple-500 to-pink-500 rounded"></span>
                Overview
              </h3>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Hello! I'm Om Prakash, a passionate Java Backend Developer with over 3 years of experience 
                  in building robust and scalable server-side applications. I specialize in creating efficient 
                  RESTful APIs, microservices architectures, and enterprise-level solutions.
                </p>
                <p>
                  My journey in software development started with a fascination for solving complex problems 
                  and has evolved into a career focused on backend technologies. I have extensive experience 
                  with the Spring ecosystem, including Spring Boot, Spring Security, and Spring Data JPA.
                </p>
                <p>
                  I'm particularly interested in system design, performance optimization, and implementing 
                  best practices in software architecture. When I'm not coding, you can find me exploring 
                  new technologies, contributing to open-source projects, or sharing knowledge through 
                  technical blogs.
                </p>
              </div>
            </div>

            {/* What I Do */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-linear-to-b from-purple-500 to-pink-500 rounded"></span>
                What I Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Backend Development', desc: 'Building scalable server-side applications with Java and Spring' },
                  { title: 'API Design', desc: 'Creating RESTful APIs following best practices and standards' },
                  { title: 'Database Design', desc: 'Designing efficient database schemas and optimizing queries' },
                  { title: 'Microservices', desc: 'Developing distributed systems with microservices architecture' },
                  { title: 'Performance Tuning', desc: 'Optimizing application performance and resource utilization' },
                  { title: 'Code Review', desc: 'Ensuring code quality through comprehensive reviews' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-200"
                  >
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/50"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Let's Connect!</h3>
              <p className="text-gray-300 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:omprakash@example.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
                <a
                  href="https://linkedin.com/in/omprakash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
