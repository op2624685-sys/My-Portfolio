import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Calendar, Code } from 'lucide-react';
import Navbar from '../component/Navbar';

const About = () => {
  const socialLinks = [
    { name: 'GitHub',   icon: Github,   url: 'https://github.com/omprakash',   color: 'hover:text-yellow-300' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/omprakash', color: 'hover:text-yellow-400' },
    { name: 'Email',    icon: Mail,     url: 'mailto:omprakash@example.com',   color: 'hover:text-yellow-200' }
  ];

  const stats = [
    { label: 'Years Experience',    value: '3+',  icon: Calendar },
    { label: 'Projects Completed',  value: '25+', icon: Code },
    { label: 'Technologies',        value: '15+', icon: MapPin }
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
            About Me
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(212,175,55,0.7)' }}>
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
            <div
              className="backdrop-blur-sm rounded-xl p-8 sticky top-8"
              style={{ background: 'rgba(26,0,48,0.7)', border: '1px solid rgba(255,215,0,0.2)' }}
            >
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full p-1" style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)' }}>
                    <img
                      src="https://images.unsplash.com/photo-1768463852001-811ead5844fb?q=80&w=1974&auto=format&fit=crop"
                      alt="Om Prakash"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4" style={{ borderColor: '#0d0020' }}></div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Om Prakash
              </h2>
              <p className="text-center mb-6 font-medium" style={{ color: '#d4af37', fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '0.1em' }}>
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
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(75,0,130,0.3)' }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: '#FFD700' }} />
                    <div>
                      <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>{stat.value}</div>
                      <div className="text-xs" style={{ color: 'rgba(212,175,55,0.7)' }}>{stat.label}</div>
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
                    className={`p-3 rounded-lg transition-all duration-200 ${link.color}`}
                    style={{
                      background: 'rgba(75,0,130,0.4)',
                      border: '1px solid rgba(255,215,0,0.2)',
                      color: 'rgba(212,175,55,0.8)',
                    }}
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
            <div className="backdrop-blur-sm rounded-xl p-8" style={{ background: 'rgba(26,0,48,0.7)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                <span className="w-1 h-8 rounded" style={{ background: 'linear-gradient(180deg, #B8860B, #FFD700)' }}></span>
                Overview
              </h3>
              <div className="space-y-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
            <div className="backdrop-blur-sm rounded-xl p-8" style={{ background: 'rgba(26,0,48,0.7)', border: '1px solid rgba(255,215,0,0.2)' }}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                <span className="w-1 h-8 rounded" style={{ background: 'linear-gradient(180deg, #B8860B, #FFD700)' }}></span>
                What I Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Backend Development', desc: 'Building scalable server-side applications with Java and Spring' },
                  { title: 'API Design',          desc: 'Creating RESTful APIs following best practices and standards' },
                  { title: 'Database Design',     desc: 'Designing efficient database schemas and optimizing queries' },
                  { title: 'Microservices',       desc: 'Developing distributed systems with microservices architecture' },
                  { title: 'Performance Tuning',  desc: 'Optimizing application performance and resource utilization' },
                  { title: 'Code Review',         desc: 'Ensuring code quality through comprehensive reviews' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="p-4 rounded-lg transition-colors duration-200"
                    style={{ background: 'rgba(75,0,130,0.25)', border: '1px solid rgba(255,215,0,0.15)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,215,0,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,215,0,0.15)'}
                  >
                    <h4 className="text-white font-semibold mb-1" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem' }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: 'rgba(212,175,55,0.65)' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="backdrop-blur-sm rounded-xl p-8"
              style={{ background: 'rgba(75,0,130,0.2)', border: '1px solid rgba(255,215,0,0.35)' }}
            >
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Let's Connect!</h3>
              <p className="mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:omprakash@example.com"
                  className="inline-flex items-center gap-2 px-6 py-3 text-black rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
                  style={{ background: 'linear-gradient(135deg, #B8860B, #FFD700)', fontFamily: "'Cinzel', serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
                <a
                  href="https://linkedin.com/in/omprakash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  style={{ background: 'rgba(75,0,130,0.4)', border: '1px solid rgba(255,215,0,0.3)', color: '#d4af37', fontFamily: "'Cinzel', serif", fontSize: '0.75rem', letterSpacing: '0.1em' }}
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