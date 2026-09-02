import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Calendar,
  Code2,
  Layers,
  ExternalLink,
} from 'lucide-react';
import Navbar from '../component/Navbar';
import JavaMain from '../component/JavaMain';
import AmbientBackdrop from '../component/AmbientBackdrop';
import TextRotation from '../component/TextRotation';
import { IconCloud } from '../component/IconCloud';
import ScrollableCardStack from '../component/ScrollableCardStack';
import ViewAllProjectsButton from '../component/ViewAllProjectsButton';
import { useLocation, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const SECTION_ROUTES = {
  '/':          '#hero',
  '/skills':    '#skills',
  '/projects':  '#projects',
  '/about':     '#about',
  '/contact':   '#contact',
};

const BASE_URL = import.meta.env.BASE_URL;


// Remove HOME_PATH as we now use basename in App.jsx

/* ─── Ambient Particle Field ─────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.4 + Math.random() * 1.1,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.12 + Math.random() * 0.35,
      pulse: Math.random() * Math.PI * 2,
    }));
    let mx = -9999, my = -9999;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.pulse += 0.014;
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) { p.vx += (dx / d) * 0.01; p.vy += (dy / d) * 0.01; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 122, ${(1 - d / 110) * 0.14})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 122, ${a})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(212, 175, 122, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

/* ─── Reusable section primitives ────────────────────────────── */
const SectionHeader = ({ kicker, lead, accent, tag: Tag = 'h2' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3 }}
    transition={{ duration: 0.6 }}
    style={{ textAlign: 'center', marginBottom: '4rem' }}
  >
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.78rem',
        color: 'var(--text-tertiary)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontWeight: 500,
        marginBottom: '1rem',
      }}
    >
      {kicker}
    </span>
    <Tag
      className="font-display"
      style={{
        fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
        fontWeight: 500,
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
        margin: 0,
        marginBottom: '1rem',
      }}
    >
      <span className="text-gradient">{lead} </span>
      <span className="text-gradient-gold">{accent}</span>
    </Tag>
  </motion.div>
);

/* ─── Section data (reused from dedicated pages) ─────────────── */
const skills = [
  { name: 'Java',             icon: `${BASE_URL.replace(/\/$/, '')}/icons/java.svg`,   level: 'Expert',       description: 'Core Java, Java 8+, Collections, Multithreading, Streams' },
  { name: 'Spring Framework', icon: `${BASE_URL.replace(/\/$/, '')}/icons/spring.svg`, level: 'Advanced',     description: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA' },
  { name: 'MySQL',            icon: `${BASE_URL.replace(/\/$/, '')}/icons/mysql.svg`,  level: 'Advanced',     description: 'Database design, query optimization, stored procedures' },
  { name: 'PostgreSQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', level: 'Advanced',     description: 'Relational data modeling, complex queries, performance tuning' },
  { name: 'Git',              icon: `${BASE_URL.replace(/\/$/, '')}/icons/git.svg`,    level: 'Advanced',     description: 'Version control, branching, merging, CI/CD pipelines' },
  { name: 'Docker',           icon: `${BASE_URL.replace(/\/$/, '')}/icons/docker.svg`, level: 'Intermediate', description: 'Containerization, Docker Compose, deployment workflows' },
  { name: 'AWS',              icon: 'https://zonalogo.com/assets/aws-logo-png-svg.webp?asset=1862',    level: 'Intermediate', description: 'Cloud infrastructure, EC2, S3, Lambda, IAM' },
  { name: 'Linux',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',   level: 'Advanced',     description: 'Shell scripting, system administration, SSH, kernel basics' },
  { name: 'Redis',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',   level: 'Intermediate', description: 'In-memory caching, pub/sub, distributed locking' },
  { name: 'Kafka',            icon: 'https://cdn.freebiesupply.com/logos/thumbs/2x/kafka-logo.png',    level: 'Intermediate', description: 'Event streaming, producers/consumers, topic management', customStyle: { background: '#fff' } },
  { name: 'JUnit / Mockito',  level: 'Expert',       description: 'TDD, unit testing, mock objects, integration testing' },
  { name: 'Observability',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg', level: 'Intermediate', description: 'Monitoring with Grafana & Prometheus, alerting, metrics' },
  { name: 'Postman',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',   level: 'Expert',       description: 'API testing, automated collections, environment variables' },
  { name: 'REST API',                                       level: 'Expert',       description: 'RESTful services, API design, microservices architecture' },
  { name: 'Hibernate',                                      level: 'Advanced',     description: 'ORM, JPA, entity relationships, query language' },
  { name: 'Maven / Gradle',                                level: 'Advanced',     description: 'Build tools, dependency management, project configuration' },
];

const levelStyle = (level) => {
  if (level === 'Expert')   return { background: 'rgba(212, 175, 122, 0.12)',  color: '#f0d4a8', border: '1px solid rgba(212, 175, 122, 0.4)' };
  if (level === 'Advanced') return { background: 'rgba(74, 222, 128, 0.10)',   color: '#86efac', border: '1px solid rgba(74, 222, 128, 0.35)' };
  return                            { background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-tertiary)', border: '1px solid var(--border-default)' };
};

const projects = [
  {
    title: 'E-Commerce Backend API',
    category: 'E-Commerce Backend',
    icon: 'ShoppingCart',
    description: 'A comprehensive RESTful API for an e-commerce platform with user authentication, product management, shopping cart, and order processing.',
    technologies: ['Spring Boot', 'MySQL', 'JWT', 'Spring Security'],
    githubUrl: 'https://github.com/op2624685-sys',
    liveUrl: 'https://demo-project.com'
  },
  {
    title: 'Task Management System',
    category: 'Enterprise Solution',
    icon: 'CheckSquare',
    description: 'Enterprise task management application with role-based access control, real-time notifications, and advanced filtering.',
    technologies: ['Java', 'Spring MVC', 'Hibernate', 'PostgreSQL'],
    githubUrl: 'https://github.com/op2624685-sys',
    liveUrl: 'https://demo-project.com'
  },
  {
    title: 'Microservices Architecture',
    category: 'Cloud Infrastructure',
    icon: 'Cpu',
    description: 'Scalable microservices-based application with service discovery, API gateway, and distributed tracing.',
    technologies: ['Spring Cloud', 'Docker', 'Kubernetes', 'Redis'],
    githubUrl: 'https://github.com/op2624685-sys',
    liveUrl: 'https://demo-project.com'
  },
  {
    title: 'Real-time Chat Application',
    category: 'Communication System',
    icon: 'MessageSquare',
    description: 'WebSocket-based real-time messaging platform with group chats, file sharing, and user presence indicators.',
    technologies: ['Spring Boot', 'WebSocket', 'MongoDB', 'RabbitMQ'],
    githubUrl: 'https://github.com/op2624685-sys',
    liveUrl: 'https://demo-project.com'
  },
  {
    title: 'Payment Gateway Integration',
    category: 'Fintech Platform',
    icon: 'CreditCard',
    description: 'Secure payment processing system with multiple providers, transaction management, and fraud detection.',
    technologies: ['Spring Boot', 'Stripe API', 'MySQL', 'Redis'],
    githubUrl: 'https://github.com/op2624685-sys',
    liveUrl: 'https://demo-project.com'
  },
  {
    title: 'Analytics Dashboard API',
    category: 'Big Data & Analytics',
    icon: 'BarChart3',
    description: 'High-performance backend for analytics dashboard with data aggregation, caching, and export functionality.',
    technologies: ['Java', 'Spring Boot', 'ElasticSearch', 'Kafka'],
    githubUrl: 'https://github.com/op2624685-sys',
    liveUrl: 'https://demo-project.com'
  },
];

const stats = [
  { label: 'Years Experience',   value: '3+',  icon: Calendar },
  { label: 'Projects Completed', value: '25+', icon: Code2 },
  { label: 'Technologies',       value: '15+', icon: Layers },
];

const services = [
  { title: 'Backend Development', desc: 'Building scalable server-side applications with Java and Spring' },
  { title: 'API Design',          desc: 'Creating RESTful APIs following best practices and standards' },
  { title: 'Database Design',     desc: 'Designing efficient database schemas and optimizing queries' },
  { title: 'Microservices',       desc: 'Developing distributed systems with microservices architecture' },
  { title: 'Performance Tuning',  desc: 'Optimizing application performance and resource utilization' },
  { title: 'Code Review',         desc: 'Ensuring code quality through comprehensive reviews' },
];

const socialLinks = [
  { name: 'GitHub',   icon: Github,   url: 'https://github.com/op2624685-sys' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/omprakash' },
  { name: 'Email',    icon: Mail,     url: 'mailto:op2624685@gmail.com' },
];

/* ─── Framer variants ────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 18 } },
};

/* ═══ HERO INDEX PAGE (single-page with sections) ════════════════ */
const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const heroRef = useRef(null);
  const scrollHintRef = useRef(null);
  const ballRef = useRef(null);
  const [hideScrollHint, setHideScrollHint] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isManualNavigating = useRef(false);
  const mountTime = useRef(null);

  const skillSlugs = [
    "java", "springboot", "mysql", "postgresql", "git", "docker", "aws", "linux", "redis", "apachekafka",
    "grafana", "prometheus", "postman", "hibernate", "apachemaven", "gradle", "github", "gitlab",
    "visualstudiocode", "intellijidea", "apachetomcat", "kubernetes", "jenkins", "sonarqube", "mongodb",
    "rabbitmq", "microsoftazure", "googlecloud", "openai"
  ];

  const handleIntroComplete = () => setIntroComplete(true);

  /* GSAP intro animation for the hero */
  useEffect(() => {
    if (!introComplete) return;
    requestAnimationFrame(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(heroRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo(
        heroRef.current?.querySelectorAll('.gs') || [],
        { y: 28, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.1 },
        '-=0.4'
      );
    });
  }, [introComplete]);

  /* Hide the "Scroll" hint once the user scrolls past the hero. */
  useEffect(() => {
    const onScroll = () => {
      // If user is no longer in the first ~85% of the viewport, hide the hint.
      setHideScrollHint(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Skills Ball Scroll Animation */
  useEffect(() => {
    if (!ballRef.current) return;

    const ball = ballRef.current;

    // Initial position - completely off-screen to the right
    gsap.set(ball, { x: '120vw', y: '50vh', xPercent: -50, yPercent: -50, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top center',
        endTrigger: '#skills',
        end: 'bottom center',
        scrub: 1.5,
      }
    });

    tl.to(ball, {
      opacity: 1,
      duration: 0.3
    }, 0)
    // 1. Slow, cinematic entry from far right
    .to(ball, {
      x: '85vw',
      y: '60vh',
      ease: 'power1.inOut',
      duration: 2
    }, 0.3)
    // 2. First Jump: Arc to Center-Bottom (right -> center-bottom)
    .to(ball, {
      x: '50vw',
      y: '85vh',
      ease: 'back.out(2)',
      duration: 2.5
    }, 2.3)
    // 3. Smooth glide to Middle-Center (The a-ha moment)
    .to(ball, {
      x: '50vw',
      y: '60vh',
      ease: 'power2.inOut',
      duration: 3
    }, 4.8)
    // 4. Pause/Settle feel (Hold position)
    .to(ball, {
      x: '50vw',
      y: '60vh',
      duration: 3
    }, 7.8)
    // 5. Second Jump: Center-Bottom again before exit
    .to(ball, {
      x: '50vw',
      y: '85vh',
      ease: 'back.in(2)',
      duration: 2.5
    }, 10.8)
    // 6. Final Dramatic Jump exit to Left (Horizontal)
    .to(ball, {
      x: '-120vw',
      y: '40vh',
      rotation: 720,
      ease: 'power2.in',
      duration: 3
    }, 13.3);

  }, [introComplete]);

  useEffect(() => {
    const handleManualNav = () => {
      isManualNavigating.current = true;
      setTimeout(() => {
        isManualNavigating.current = false;
      }, 1500);
    };

    window.addEventListener('manual-nav', handleManualNav);
    return () => window.removeEventListener('manual-nav', handleManualNav);
  }, []);

  /* Scroll-spy: as the user scrolls through sections, update the URL
     (and therefore the navbar's active link) to reflect the section
     currently in view. Uses IntersectionObserver on a thin band at
     viewport center, so the active link only flips when the user has
     actually moved past the middle of a section. */
  useEffect(() => {
    const sectionEntries = Object.entries(SECTION_ROUTES); // [['/', '#hero'], ...]
    const sectionEls = sectionEntries
      .map(([, anchor]) => document.querySelector(anchor))
      .filter(Boolean);
    if (!sectionEls.length) return;

    // Track which sections currently intersect the "decision line" at the
    // vertical center of the viewport. The active one is whichever has the
    // smallest absolute distance between its top and the viewport mid-line.
    const intersecting = new Set();

    const pickActive = () => {
      const midY = window.innerHeight / 2;
      let best = null;
      let bestDist = Infinity;

      sectionEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (intersecting.has(el)) {
          const dist = Math.abs(rect.top - midY);
          if (dist < bestDist) { bestDist = dist; best = el; }
        } else if (rect.top < midY && rect.bottom > 0) {
          const dist = midY - rect.top;
          if (dist < bestDist) { bestDist = dist; best = el; }
        }
      });

      if (!best) best = sectionEls[0];

      const match = sectionEntries.find(([, anchor]) =>
        document.querySelector(anchor) === best
      );
      const newPath = match?.[0];

      // FIX: Absolute lock to prevent "Landing Redirect"
      // 1. Don't redirect if we just mounted (first 3 seconds)
      if (Date.now() - mountTime.current < 3000) {
        return;
      }

      // 2. Don't redirect if we are currently navigating manually
      if (isManualNavigating.current) {
        return;
      }

      if (newPath && newPath !== location.pathname) {
        navigate(newPath, { replace: true });
      }
    };

    // A thin band at the vertical center of the viewport. Only sections
    // whose body crosses this band are considered "currently active".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        });
        pickActive();
      },
      {
        // Top edge of the band sits at viewport center (50% from top, minus the
        // band's own half-height), bottom edge same — making a 1px line.
        // A few px tall so it actually fires.
        rootMargin: '-50% 0px -49.9% 0px',
        threshold: 0,
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    // Run once on mount so the initial state is correct.
    pickActive();

    return () => observer.disconnect();
  }, [location.pathname, navigate]);

  /* Scroll-to-section when the URL changes (via click or back/forward). */
  // Removed automatic scrollIntoView to prevent "page pulling" effect.
  // Manual navigation is now handled in the Navbar component.
  useEffect(() => {
    // This effect is now disabled to prevent automatic snapping during scroll-spy updates.
  }, [location.pathname]);

  const techs = [{ label: 'Spring Boot' }, { label: 'Microservices' }, { label: 'REST APIs' }, { label: 'Java' }];

  return (
    <>
      <AmbientBackdrop />
      <ParticleField />

      <Navbar />

      <main>
        <div
          ref={ballRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 'auto',
            height: 'auto',
            zIndex: 10,
            pointerEvents: 'auto',
            perspective: '1000px',
          }}
        >
          <IconCloud slugs={skillSlugs} />
        </div>

        {/* ── #hero ────────────────────────────────────────────── */}
      <section
        id="hero"
        className="portfolio-hero"
        style={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2.5rem 1.5rem 4rem',
          position: 'relative',
          zIndex: 2,
          maxWidth: '100%',
          margin: 0,
        }}
      >
        <div
          ref={heroRef}
          className="hero-content"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          {/* 1. Left-Aligned Role & Name Header (just below navbar) */}
          <div className="hero-head" style={{ textAlign: 'left', width: '100%', paddingLeft: 0, marginLeft: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={introComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="gs hero-role"
              style={{
                fontSize: '0.84rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--text-tertiary)',
                marginBottom: '0.4rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              &lt; JAVA BACKEND ENGINEER &amp; FULL STACK DEVELOPER /&gt;
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={introComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="gs font-syne text-gradient hero-name"
              style={{
                fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                margin: 0,
                paddingLeft: 0,
              }}
            >
              OM PRAKASH.
            </motion.h1>
          </div>

          {/* 2. Centered "Building Scalable" + Typing Text Animation & Links */}
          <div className="hero-main" style={{ textAlign: 'center', width: '100%', margin: '0 auto', maxWidth: 850 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="gs"
            >
              <h2
                className="font-display text-gradient-gold hero-title"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  margin: '0 0 1.25rem 0',
                }}
              >
                BUILDING SCALABLE <br />
                <span className="inline-block mt-2">
                  <TextRotation size="lg" />
                </span>
              </h2>
            </motion.div>

            {/* 2 Links directly below Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="gs hero-actions"
              style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.75rem' }}
            >
              <a
                href="/projects"
                className="btn-primary"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/projects');
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Projects
                <ArrowUpRight size={17} strokeWidth={2.25} />
              </a>
              <a
                href="/contact"
                className="btn-ghost"
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Tech Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="gs hero-tech-list"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}
            >
              {techs.map((tech) => (
                <span
                  key={tech.label}
                  className="hero-tech-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 1.05rem',
                    background: '#000000',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 999,
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    transition: 'all 0.3s var(--ease-out)',
                    cursor: 'default',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(230, 167, 86, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(230, 167, 86, 0.5)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(230, 167, 86, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  <Sparkles size={13} style={{ color: 'var(--accent)' }} />
                  {tech.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* 3. Overview Bio Box (Translucent Glassmorphism, pushed lower down) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="gs hero-bio"
            style={{
              maxWidth: 820,
              width: '100%',
              margin: '3rem auto 0',
              padding: '1.6rem 2.2rem',
              borderRadius: '24px',
              border: '1px solid rgba(230, 167, 86, 0.30)',
              background: 'rgba(16, 16, 22, 0.35)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.98rem, 2vw, 1.12rem)',
                color: 'var(--text-secondary)',
                fontWeight: 450,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              I build scalable <span style={{ color: '#ffffff', fontWeight: 600 }}>Spring Boot microservices</span>, REST APIs, and cloud-ready backend systems with performance, security, and clean architecture in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── #skills ──────────────────────────────────────────── */}
      <section id="skills" style={{ position: 'relative', zIndex: 2, padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader kicker="Skills & Technologies" lead="Tools I use" accent="every day." />

          {/* Increased height to give the ball more space to be centered and rotate */}
          <div style={{ height: '100vh' }} />
        </div>
      </section>

      {/* ── #projects ────────────────────────────────────────── */}
      <section id="projects" style={{ position: 'relative', zIndex: 2, padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader kicker="Selected Work" lead="Recent" accent="projects." />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <ScrollableCardStack items={projects} perspective={1200} />
            <ViewAllProjectsButton />
          </div>
        </div>
      </section>

      {/* ── #about ───────────────────────────────────────────── */}
      <section id="about" style={{ position: 'relative', zIndex: 2, padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader kicker="About Me" lead="Crafting reliable" accent="backend systems." />
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-tertiary)',
              maxWidth: 540,
              margin: '-2.5rem auto 4rem',
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            A passionate Java backend developer focused on scalable architecture and clean engineering.
          </p>

          <div
            className="about-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 320px) minmax(0, 1fr)',
              gap: '1.5rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="surface-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      padding: 3,
                      background: 'linear-gradient(135deg, #f0d4a8 0%, #d4af7a 50%, #a87c4b 100%)',
                    }}
                  >
                    <img
                      src={`${BASE_URL.replace(/\/$/, '')}/profile/om-photo.jpg`}
                      alt="Om Prakash"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid var(--bg-base)',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#4ade80',
                      border: '3px solid var(--bg-elev-1)',
                      boxShadow: '0 0 12px rgba(74, 222, 128, 0.4)',
                    }}
                  />
                </div>

                <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 500, color: 'var(--text-primary)', margin: 0, marginBottom: '0.3rem', letterSpacing: '-0.015em' }}>
                  Om Prakash
                </h2>
                <p style={{ color: 'var(--accent-soft)', fontSize: '0.85rem', fontWeight: 450, margin: 0, marginBottom: '1.5rem' }}>
                  Java Backend Developer
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.75rem 0.95rem',
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid var(--border-subtle)',
                        textAlign: 'left',
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: 'rgba(212, 175, 122, 0.1)',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        <stat.icon size={15} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                          {stat.value}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      aria-label={link.name}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-default)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                      }}
                    >
                      <link.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <div className="surface-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 550, color: 'var(--text-primary)', margin: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', letterSpacing: '-0.01em' }}>
                  <span style={{ width: 3, height: 16, borderRadius: 2, background: 'linear-gradient(180deg, #f0d4a8, #d4af7a)' }} />
                  Overview
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                  <p style={{ margin: 0 }}>Hello! I'm Om Prakash, a passionate Java backend developer with over 3 years of experience building robust and scalable server-side applications. I specialize in crafting efficient RESTful APIs, microservices architectures, and enterprise-level solutions.</p>
                  <p style={{ margin: 0 }}>My journey started with a fascination for solving complex problems, and has grown into a career focused on backend technologies. I work extensively across the Spring ecosystem — Spring Boot, Spring Security, and Spring Data JPA.</p>
                  <p style={{ margin: 0 }}>I'm particularly interested in system design, performance optimization, and applying best practices in software architecture.</p>
                </div>
              </div>

              <div className="surface-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 550, color: 'var(--text-primary)', margin: 0, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', letterSpacing: '-0.01em' }}>
                  <span style={{ width: 3, height: 16, borderRadius: 2, background: 'linear-gradient(180deg, #f0d4a8, #d4af7a)' }} />
                  What I Do
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {services.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.3 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      style={{
                        padding: '1rem',
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'default',
                      }}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(212, 175, 122, 0.1)', display: 'grid', placeItems: 'center', marginBottom: '0.6rem' }}>
                        <Sparkles size={13} style={{ color: 'var(--accent)' }} />
                      </div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 550, color: 'var(--text-primary)', margin: 0, marginBottom: '0.25rem', letterSpacing: '-0.005em' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── #contact ─────────────────────────────────────────── */}
      <section id="contact" style={{
        position: 'relative',
        zIndex: 2,
        padding: '8rem 1.5rem 6rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ textAlign: 'left' }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: 0,
                marginBottom: '1.5rem',
              }}
            >
              <span className="text-gradient">Let's build </span>
              <span className="text-gradient-gold">something together.</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              maxWidth: 500,
              marginBottom: '2.5rem',
              fontWeight: 400
            }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '999px',
              background: 'rgba(212, 175, 122, 0.05)',
              border: '1px solid rgba(212, 175, 122, 0.2)',
              width: 'fit-content'
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80'
              }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
            {[
              {
                label: 'Email Me',
                desc: 'The best way to reach me',
                link: 'mailto:op2624685@gmail.com',
                icon: Mail,
                color: 'var(--accent)'
              },
              {
                label: 'GitHub',
                desc: 'Check out my open source work',
                link: 'https://github.com/op2624685-sys',
                icon: Github,
                color: 'var(--text-primary)'
              },
              {
                label: 'LinkedIn',
                desc: 'Connect for professional networking',
                link: 'https://linkedin.com/in/omprakash',
                icon: Linkedin,
                color: 'var(--accent-soft)'
              }
            ].map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="surface-card"
                style={{
                  padding: '2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid var(--border-default)',
                  transition: 'border-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-default)'}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(212, 175, 122, 0.1)',
                  display: 'grid',
                  placeItems: 'center',
                  color: item.color
                }}>
                  <item.icon size={24} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 550, color: 'var(--text-primary)', margin: 0, marginBottom: '0.4rem' }}>
                    {item.label}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', margin: 0, lineHeight: 1.4 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      </main>

      {/* Unique Futuristic Animated Scroll Down Indicator */}
      <div
        ref={scrollHintRef}
        onClick={() => {
          const nextSection = document.querySelector('#skills') || document.querySelector('#projects');
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: hideScrollHint ? 0 : 1,
          pointerEvents: hideScrollHint ? 'none' : 'auto',
          zIndex: 40,
          cursor: 'pointer',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group"
      >
        {/* Glass Mouse Capsule with animated sliding dot */}
        <div
          style={{
            width: 22,
            height: 38,
            borderRadius: 18,
            border: '1.5px solid rgba(230, 167, 86, 0.45)',
            background: 'rgba(17, 19, 28, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 5,
            boxShadow: '0 0 20px rgba(230, 167, 86, 0.15)',
            transition: 'all 0.3s ease',
          }}
          className="group-hover:border-amber-400 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(230,167,86,0.35)]"
        >
          <div
            style={{
              width: 3.5,
              height: 7,
              borderRadius: 2,
              background: 'linear-gradient(180deg, #f8e1bf, #e6a756)',
              animation: 'scrollMouseDot 1.8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Cascading Dual Chevron Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -2 }}>
          <ChevronDown
            size={13}
            style={{
              color: 'var(--accent)',
              opacity: 0.9,
              animation: 'chevronPulse 1.8s ease-in-out infinite',
            }}
          />
          <ChevronDown
            size={13}
            style={{
              color: 'var(--accent)',
              opacity: 0.4,
              marginTop: -8,
              animation: 'chevronPulse 1.8s ease-in-out 0.3s infinite',
            }}
          />
        </div>

        {/* Glowing Monospaced Caption */}
        <span
          style={{
            fontSize: '0.62rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 600,
            transition: 'color 0.3s ease',
          }}
          className="group-hover:text-amber-300"
        >
          SCROLL
        </span>
      </div>

      <JavaMain onIntroComplete={handleIntroComplete} />

      <style>{`
        @media (max-width: 820px) {
          .portfolio-hero {
            min-height: 100svh !important;
            padding: 1rem 1rem 3.5rem !important;
            justify-content: center !important;
          }

          .hero-content {
            gap: 2rem !important;
          }

          .hero-head {
            text-align: left !important;
          }

          .hero-status {
            padding: 0.38rem 0.7rem !important;
            gap: 0.45rem !important;
            margin-bottom: 1rem !important;
          }

          .hero-status span:first-child {
            width: 6px !important;
            height: 6px !important;
          }

          .hero-status span:last-child {
            font-size: 0.63rem !important;
            letter-spacing: 0.025em !important;
            line-height: 1.3 !important;
          }

          .hero-role {
            font-size: 0.62rem !important;
            letter-spacing: 0.07em !important;
            line-height: 1.45 !important;
            margin-bottom: 0.65rem !important;
          }

          .hero-name {
            font-size: clamp(2.3rem, 11vw, 3.35rem) !important;
            letter-spacing: 0 !important;
            line-height: 1 !important;
          }

          .hero-title {
            font-size: clamp(1.55rem, 7.8vw, 2.25rem) !important;
            letter-spacing: 0 !important;
            line-height: 1.12 !important;
            margin-bottom: 1.1rem !important;
          }

          .hero-actions {
            display: flex !important;
            gap: 0.55rem !important;
            margin-bottom: 1.15rem !important;
          }

          .hero-actions a {
            min-height: 38px !important;
            padding: 0.5rem 0.82rem !important;
            font-size: 0.74rem !important;
            gap: 0.4rem !important;
          }

          .hero-actions svg {
            width: 13px !important;
            height: 13px !important;
          }

          .hero-tech-list {
            gap: 0.4rem !important;
            max-width: 310px !important;
            margin: 0 auto !important;
          }

          .hero-tech-pill {
            padding: 0.36rem 0.5rem !important;
            gap: 0.28rem !important;
            font-size: 0.66rem !important;
          }

          .hero-tech-pill svg {
            width: 10px !important;
            height: 10px !important;
          }

          .hero-bio {
            max-width: 92% !important;
            margin: 0 auto !important;
            padding: 0.8rem 0.9rem !important;
            border-radius: 14px !important;
            text-align: left !important;
          }

          .hero-bio p {
            font-size: 0.8rem !important;
            line-height: 1.5 !important;
            font-weight: 420 !important;
          }

          .about-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 420px) {
          .hero-content {
            gap: 2rem !important;
          }

          .hero-head {
            text-align: left !important;
          }

          .hero-name {
            font-size: clamp(2.1rem, 10.5vw, 2.8rem) !important;
          }

          .hero-title {
            font-size: clamp(1.42rem, 7.3vw, 1.95rem) !important;
          }

          .hero-actions {
            flex-wrap: nowrap !important;
          }

          .hero-actions a {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            white-space: nowrap !important;
          }
        }
      `}</style>
    </>
  );
};

export default Index;
