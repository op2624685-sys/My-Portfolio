import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Calendar,
  Code2,
  Layers,
  Cloud,
  GitBranch,
  Activity,
  FlaskConical,
  Database,
  Server,
  Cpu,
  Wrench,
  MoveDiagonal,
  Shield,
  ListChecks,
  BarChart3,
  MessageSquare,
  Search,
  Layout,
  CheckCircle2,
  RefreshCw,
  Leaf,
  Boxes,
  Coffee,
} from 'lucide-react';
import Navbar from '../component/Navbar';
import JavaMain from '../component/JavaMain';
import AmbientBackdrop from '../component/AmbientBackdrop';
import SkillsMarquee from '../component/SkillsMarquee';
import ProjectsSection from '../component/ProjectsSection';
import ViewAllProjectsButton from '../component/ViewAllProjectsButton';
import ProfileCard from '../component/ProfileCard';
import ExpertiseGrid from '../component/ExpertiseGrid';
import ExperienceTimeline from '../component/ExperienceTimeline';
import ValuesGrid from '../component/ValuesGrid';
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
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - d / 110) * 0.14})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${a})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(16, 185, 129, 0.3)';
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
const SectionHeader = ({ kicker, lead, accent, subtitle, tag: Tag = 'h2', fontSize = 'clamp(2.8rem, 6vw, 4.5rem)' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3 }}
    transition={{ duration: 0.6 }}
    style={{ textAlign: 'center', marginBottom: '5rem' }}
  >
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      borderRadius: '100px',
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      marginBottom: '1.5rem'
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 8px var(--accent)'
      }} />
      <span
        style={{
          fontSize: '0.7rem',
          color: 'var(--accent)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {kicker}
      </span>
    </div>
    <Tag
      className="font-display"
      style={{
        fontSize: fontSize,
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1.1,
        margin: '0 0 1rem 0',
      }}
    >
      <span className="text-gradient">{lead} </span>
      <span className="text-gradient-emerald">{accent}</span>
    </Tag>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

/* ─── Section data (reused from dedicated pages) ─────────────── */

const projects = [
  {
    title: 'Dadi Bulsara Ashihara Karate Foundation',
    category: 'Enterprise Management Ecosystem',
    icon: 'Layers',
    description: 'A full-scale enterprise system for martial arts administration. Featuring a hierarchical RBAC model (Admin, Sub-Admin, Teacher, Student), Redis-backed performance optimization, and specialized modules for managing global championships, tournaments, and training camps, including a dedicated teacher panel for student attendance and progress tracking.',
    technologies: ['Java 21', 'Spring Boot 4.1', 'PostgreSQL', 'Redis', 'React 19', 'JWT', 'Nimbus JOSE', 'Tailwind CSS 4', 'Vercel'],
    githubUrl: 'https://github.com/op2624685-sys/Dadi-Bulsara-Ashihara-Karate-Backend',
    liveUrl: 'https://karate.omprakashjavadev.in'
  },
  {
    title: 'MediCore: Enterprise Healthcare Ecosystem',
    category: 'Distributed Systems',
    icon: 'CheckSquare',
    description: 'An enterprise-scale distributed healthcare ecosystem engineered with a decoupled event-driven architecture via Apache Kafka. Featuring real-time notifications via WebSockets, automated prescription generation, secure JWT-based authentication, and a high-concurrency appointment booking system.',
    technologies: ['Java 21', 'Spring Boot 3.5', 'PostgreSQL', 'Apache Kafka', 'Redis', 'React 19', 'JWT', 'Spring Security', 'WebSockets', 'Cloudinary', 'SMTP'],
    githubUrl: 'https://github.com/op2624685-sys/Hospital-Management-System',
    liveUrl: 'https://hms.omprakashjavadev.in'
  },
  {
    title: 'Docs-UI: Modern Documentation Interface',
    category: 'Frontend Engineering',
    icon: 'Layers',
    description: 'A sleek, developer-centric documentation UI engineered for rapid content delivery and optimal readability. Focused on minimalist design principles, high-performance rendering via Vite, and an intuitive information architecture for technical documentation.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/op2624685-sys/Doc-App',
    liveUrl: 'https://op2624685-sys.github.io/Doc-App/'
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
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/op2624685-sys/' },
  { name: 'Email',    icon: Mail,     url: 'mailto:op2624685@gmail.com' },
];

const PROFILE_DATA = {
  image: '/profile/profilePic.jpeg',
  name: 'Om Prakash',
  role: 'Java Developer',
  focus: 'Backend Systems',
  location: 'India',
  status: 'Open to opportunities',
  year: '2026',
  bio: 'I build reliable, well-structured backend systems with Java — from clean object-oriented architecture to REST APIs that hold up under real-world load. I care about code that\'s easy to read a year later, not just code that works today, and I enjoy the discipline of getting the fundamentals right: solid data structures, sensible design patterns, and systems that scale without surprises.',
  stats: [
    { label: 'Projects Built', value: '10', suffix: '+' },
    { label: 'Core Language', value: 'Java', suffix: '.' },
    { label: 'Years Coding', value: '3', suffix: '+' },
    { label: 'Commitment', value: '100', suffix: '%' },
  ],
  socialLinks: socialLinks,
};

const TECHNICAL_EXPERTISE = [
  {
    id: 'core-java',
    title: 'Core Java',
    icon: 'J',
    description: 'Strong grip on OOP principles, collections, multithreading, and exception handling.',
    tags: ['OOP', 'Collections', 'Multithreading'],
    accent: 'emerald',
    Icon: Cpu,
  },
  {
    id: 'backend-frameworks',
    title: 'Backend Frameworks',
    icon: 'SB',
    description: 'Building REST APIs and services with Spring Boot, following clean layered architecture.',
    tags: ['Spring Boot', 'REST APIs', 'Hibernate'],
    accent: 'cyan',
    Icon: Server,
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'DB',
    description: 'Designing schemas and writing efficient queries across relational & document databases.',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'JDBC'],
    accent: 'violet',
    Icon: Database,
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    icon: 'DS',
    description: 'Solid problem-solving fundamentals — the backbone of writing performant Java code.',
    tags: ['DSA', 'Problem Solving'],
    accent: 'amber',
    Icon: Wrench,
  },
  {
    id: 'tools-workflow',
    title: 'Tools & Workflow',
    icon: 'GT',
    description: 'Comfortable across the everyday developer toolchain and version control.',
    tags: ['Git', 'Maven', 'Postman'],
    accent: 'teal',
    Icon: GitBranch,
  },
  {
    id: 'system-design',
    title: 'System Design',
    icon: 'CS',
    description: 'Understanding how to structure applications that stay maintainable as they grow.',
    tags: ['Design Patterns', 'Scalability'],
    accent: 'rose',
    Icon: MoveDiagonal,
  },
  {
    id: 'cloud-deployment',
    title: 'Cloud Deployment',
    icon: 'AWS',
    description: 'Deploying and managing scalable applications on AWS with infrastructure as code.',
    tags: ['AWS EC2', 'AWS S3', 'AWS IAM', 'VPC'],
    accent: 'orange',
    Icon: Cloud,
  },
  {
    id: 'ci-cd',
    title: 'CI/CD',
    icon: 'CI',
    description: 'Automating build, test, and deployment pipelines for reliable software delivery.',
    tags: ['GitHub Actions', 'Workflows', 'Secrets Mgmt'],
    accent: 'indigo',
    Icon: GitBranch,
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    icon: 'MON',
    description: 'Full-stack observability with metrics, logs, traces, and alerting.',
    tags: ['Grafana', 'Prometheus', 'Micrometer', 'OpenTelemetry', 'Spring Boot Actuator', 'Loki'],
    accent: 'emerald',
    Icon: Activity,
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: 'TST',
    description: 'Comprehensive testing strategies ensuring code quality and reliability.',
    tags: ['Unit Testing', 'Integration Testing', 'JUnit 5', 'Mockito', 'Postman'],
    accent: 'pink',
    Icon: FlaskConical,
  },
];

const EXPERIENCE_DATA = [
  {
    period: '2025 — Present',
    title: 'Java Developer',
    org: 'Building backend systems & REST APIs',
    desc: 'Working on server-side applications with Java and Spring Boot, focused on writing clean, testable, and scalable code for real production use cases.',
    isCurrent: true,
  },
  {
    period: '2022 — 2025',
    title: "Bachelor's Degree",
    org: 'Computer Science / IT',
    desc: 'Built a strong foundation in programming, data structures, algorithms, and core computer science concepts.',
    isCurrent: false,
  },
  {
    period: '2022',
    title: 'Started with Java',
    org: 'Self-driven learning',
    desc: 'Began learning Java from the ground up — syntax, OOP, and steadily moved toward building real backend projects.',
    isCurrent: false,
  },
];

const WORK_VALUES = [
  {
    id: 'requirement-analysis',
    title: 'Understand the Problem',
    Icon: MessageSquare,
    accent: 'emerald',
    badge: 'Step 1',
    tags: ['Stakeholder Talk', 'User Stories', 'Scope'],
    desc: 'Pehle problem ko properly samajhna — stakeholders se requirements collect karna, user needs ko understand karna, aur clear acceptance criteria define karna. Bina sahi problem ke solution impossible hai.'
  },
  {
    id: 'edge-case-analysis',
    title: 'Edge Case Discovery',
    Icon: Search,
    accent: 'cyan',
    badge: 'Step 2',
    tags: ['Corner Cases', 'Failure Scenarios', 'Risk Assessment'],
    desc: 'Normal flow ke alawa sabhi edge cases, invalid inputs, network failures, aur rare scenarios ko identify karna. Har possible failure point ko pehle hi map karna.'
  },
  {
    id: 'solution-design',
    title: 'Solution Architecture',
    Icon: Layout,
    accent: 'violet',
    badge: 'Step 3',
    tags: ['Data Modeling', 'API Design', 'Trade-offs'],
    desc: 'Sabse efficient solution ka design banana — database schema, API endpoints, system architecture, aur multiple approaches ka trade-off analysis karna. Simple aur scalable design choose karna.'
  },
  {
    id: 'implementation',
    title: 'Clean Implementation',
    Icon: Code2,
    accent: 'amber',
    badge: 'Step 4',
    tags: ['Modular Code', 'DRY', 'Clean Code'],
    desc: 'Design ko clean, modular aur maintainable code mein implement karna — reusable components, clear naming, proper error handling, aur no duplicated logic.'
  },
  {
    id: 'testing-validation',
    title: 'Test & Validate',
    Icon: CheckCircle2,
    accent: 'rose',
    badge: 'Step 5',
    tags: ['Unit Tests', 'Edge Cases', 'E2E Scenarios'],
    desc: 'Implementation ko test karna — unit tests, edge case scenarios, aur real-world usage simulate karna. Har scenario verify karna ki solution actually kaam kar raha hai.'
  },
  {
    id: 'code-review',
    title: 'Review & Optimize',
    Icon: Layers,
    accent: 'orange',
    badge: 'Step 6',
    tags: ['Code Review', 'Refactoring', 'Performance'],
    desc: 'Code ko self-review aur peer review se pass karna — performance bottlenecks identify karna, unnecessary complexity remove karna, aur code quality continuously improve karna.'
  },
  {
    id: 'deployment-monitoring',
    title: 'Deploy & Monitor',
    Icon: Cloud,
    accent: 'indigo',
    badge: 'Step 7',
    tags: ['CI/CD', 'Logs', 'Metrics'],
    desc: 'Solution ko production mein deploy karna aur usko monitor karna — build pipelines, automated testing, error tracking, aur performance metrics ke through real-time validation.'
  },
  {
    id: 'maintenance-iteration',
    title: 'Maintain & Iterate',
    Icon: RefreshCw,
    accent: 'teal',
    badge: 'Step 8',
    tags: ['Feedback', 'Tech Debt', 'Continuous Improvement'],
    desc: 'Deployment ke baad bhi kaam nahi rukta — user feedback collect karna, bugs fix karna, tech debt manage karna, aur solution ko continuously improve karna.'
  },
];


/* ═══ HERO INDEX PAGE (single-page with sections) ════════════════ */
const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const heroRef = useRef(null);
  const scrollHintRef = useRef(null);
  const [hideScrollHint, setHideScrollHint] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isManualNavigating = useRef(false);
  const mountTime = useRef(null);

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

  const techs = [
    { label: 'Spring Boot', icon: Leaf },
    { label: 'Microservices', icon: Boxes },
    { label: 'REST APIs', icon: Cloud },
    { label: 'Java', icon: Coffee },
  ];

  return (
    <>
      <AmbientBackdrop />
      <ParticleField />

      <Navbar />

      <main>
        {/* ── #hero ────────────────────────────────────────────── */}
      <section
        id="hero"
        className="portfolio-hero"
      >
        <div
          ref={heroRef}
          className="hero-content"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gs hero-role"
          >
            &lt; JAVA BACKEND ENGINEER &amp; FULL STACK DEVELOPER /&gt;
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="gs hero-name"
          >
            <span>OM</span>
            <span>PRAKASH<span className="hero-name-dot">.</span></span>
          </motion.h1>

          <div className="hero-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="gs"
            >
              <h2 className="hero-title">
                <span>I BUILD SCALABLE</span>
                <strong>BACKEND SYSTEMS</strong>
              </h2>
              <p className="hero-description">
                I build scalable Spring Boot microservices, REST APIs, and cloud-ready backend systems with performance, security, and clean architecture in mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="gs hero-actions"
            >
              <a
                href="/projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/projects');
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ExternalLink size={16} strokeWidth={2} />
                Explore Projects
                <ArrowRight size={16} strokeWidth={2.25} />
              </a>
              <a
                href="/contact"
                className="btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Mail size={16} strokeWidth={2} />
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="gs hero-tech-list"
            >
              {techs.map((tech) => (
                <span key={tech.label} className="hero-tech-pill">
                  <tech.icon size={14} strokeWidth={1.8} />
                  {tech.label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── #skills ──────────────────────────────────────────── */}
      <section id="skills" style={{ position: 'relative', zIndex: 2, padding: '5rem 0 6rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <SectionHeader
            kicker="Technical Stack"
            lead="Tools I use"
            accent="every day."
            subtitle="A curated collection of technologies and frameworks I leverage to build scalable, high-performance enterprise systems."
          />
        </div>
        <SkillsMarquee />
      </section>

      {/* ── #projects ────────────────────────────────────────── */}
      <section id="projects" style={{ position: 'relative', zIndex: 2, padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader kicker="Selected Work" lead="Recent" accent="projects." />
        </div>

        <ProjectsSection projects={projects} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <ViewAllProjectsButton />
        </div>
      </section>

      {/* ── #about ───────────────────────────────────────────── */}
      <section id="about" style={{ position: 'relative', zIndex: 2, padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader
            kicker="The Engineer"
            lead="About"
            accent="Me."
            fontSize="clamp(2rem, 4vw, 3rem)"
            subtitle="Building robust, scalable foundations through clean code and a disciplined approach to Java engineering."
          />

          <div className="flex flex-col gap-24">
            <ProfileCard profileData={PROFILE_DATA} />

            <div className="flex flex-col gap-12">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-3xl font-bold text-gray-100 tracking-tight">Technical Expertise</h2>
                <span className="font-mono text-xs text-gray-500 uppercase whitespace-nowrap">01 / core stack</span>
              </div>
              <ExpertiseGrid skills={TECHNICAL_EXPERTISE} />
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-3xl font-bold text-gray-100 tracking-tight">Experience & Education</h2>
                <span className="font-mono text-xs text-gray-500 uppercase whitespace-nowrap">02 / timeline</span>
              </div>
              <ExperienceTimeline experiences={EXPERIENCE_DATA} />
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-3xl font-bold text-gray-100 tracking-tight">How I Work</h2>
                <span className="font-mono text-xs text-gray-500 uppercase whitespace-nowrap">03 / principles</span>
              </div>
              <ValuesGrid values={WORK_VALUES} />
            </div>
          </div>
        </div>
      </section>

      {/* ── #contact ─────────────────────────────────────────── */}
      <section id="contact" style={{
        position: 'relative',
        zIndex: 2,
        padding: '8rem 1.5rem 4rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 900, width: '100%' }}
        >
          <h2
            className="font-display contact-headline"
            style={{
              fontSize: 'clamp(52px, 10vw, 130px)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              margin: '0 0 44px 0',
            }}
          >
            <span>Let's Build</span><br />
            <span>Something Amazing</span>
          </h2>

          <a
            href="mailto:op2624685@gmail.com"
            className="btn-touch"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '28px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            Get in Touch
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
            <a
              href="mailto:op2624685@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff',
                fontSize: '13px',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'color 0.2s',
                marginBottom: '28px',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a7f3d0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
            >
              <Mail size={14} style={{ opacity: 0.8, color: '#a7f3d0' }} />
              op2624685@gmail.com
            </a>

            <div className="socials" style={{ display: 'flex', gap: '14px' }}>
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.color = '#a7f3d0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <link.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '22px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        zIndex: 2,
        position: 'relative',
        marginBottom: '2rem'
      }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          © 2026 Om. All rights reserved.
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          Designed & Developed by Om
        </span>
      </footer>
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
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            background: 'rgba(17, 19, 28, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 5,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
            transition: 'all 0.3s ease',
          }}
          className="group-hover:border-emerald-400 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]"
        >
          <div
            style={{
              width: 3.5,
              height: 7,
              borderRadius: 2,
              background: 'linear-gradient(180deg, #ecfdf5, #10b981)',
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
          className="group-hover:text-emerald-300"
        >
          SCROLL
        </span>
      </div>

      <JavaMain onIntroComplete={handleIntroComplete} />

      <style>{`
        .hero-name {
          font-size: clamp(4rem, 18vw, 12rem);
        }
        .contact-headline {
          background: linear-gradient(

            180deg,
            #c8c8c8 0%,
            #ffffff 35%,
            #d0d0d0 60%,
            #888 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 820px) {
          #contact {
            padding: '4rem 1.5rem 3rem' !important;
          }
          .contact-headline {
            font-size: clamp(40px, 8vw, 80px) !important;
            margin-bottom: 30px !important;
          }
          .portfolio-hero {
            min-height: 100svh !important;
            padding: 5rem 1rem 3.5rem !important;
            justify-content: flex-start !important;
          }

          .hero-content {
            gap: 2rem !important;
          }

          .hero-head {
            text-align: left !important;
            padding-left: 1rem !important;
            margin-bottom: 1rem !important;
          }
          .hero-main {
            margin-top: 6rem !important;
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
            position: relative !important;
            zIndex: 10 !important;
          }

          .hero-name {
            font-size: clamp(2rem, 10vw, 4rem) !important;
            letter-spacing: -0.02em !important;
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
            margin: 1rem auto 0 !important;
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
          #contact {
            padding: '3rem 1rem 2rem' !important;
          }
          .contact-headline {
            font-size: clamp(32px, 12vw, 52px) !important;
            margin-bottom: 20px !important;
          }
          .portfolio-hero {
            padding: 5rem 0.5rem 3.5rem !important;
          }
          .hero-content {
            gap: 2rem !important;
          }

          .hero-head {
            text-align: left !important;
            padding-left: 1rem !important;
            margin-bottom: 1rem !important;
          }
          .hero-main {
            margin-top: 6rem !important;
          }

          .hero-name {
            font-size: 9.5vw !important;
            letter-spacing: -0.05em !important;
            line-height: 1 !important;
            text-align: center;
          }

          .hero-title {
            font-size: clamp(1.42rem, 7.3vw, 1.95rem) !important;
          }

          .hero-actions {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }

          .hero-actions a {
            white-space: nowrap !important;
          }
        }

        .portfolio-hero {
          position: relative;
          z-index: 2;
          isolation: isolate;
          min-height: 100svh;
          display: flex;
          align-items: flex-start;
          padding: clamp(7.5rem, 15vh, 10.5rem) clamp(2.5rem, 5vw, 5.5rem) 3rem;
        }

        .hero-content {
          width: min(100%, 610px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-role {
          margin: 0 0 1.6rem;
          color: rgba(220, 231, 244, 0.78);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          line-height: 1.45;
        }

        .hero-name {
          display: flex;
          flex-direction: column;
          margin: 0 0 2.6rem;
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.8rem, 6.6vw, 6.6rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.78;
          text-transform: uppercase;
          background: linear-gradient(180deg, #c8c8c8 0%, #ffffff 35%, #d0d0d0 60%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.38));
        }

        .hero-name-dot {
          color: #14e1ce;
          -webkit-text-fill-color: #14e1ce;
        }

        .hero-main {
          width: 100%;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          margin: 0;
          color: #e4eaf4;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 3vw, 2.85rem);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.02;
        }

        .hero-title strong {
          color: #14dfcf;
          font-size: 1.26em;
          font-weight: 700;
          text-shadow: 0 0 24px rgba(20, 223, 207, 0.2);
        }

        .hero-description {
          max-width: 480px;
          margin: 1.25rem 0 1.8rem;
          color: rgba(226, 234, 244, 0.82);
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.55;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.6rem;
        }

        .hero-actions a {
          min-height: 44px;
          padding: 0.7rem 1.35rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 600;
        }

        .hero-actions .btn-primary {
          color: #ecfffc;
          background: linear-gradient(135deg, #12dfca 0%, #00ac9d 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32), 0 8px 24px rgba(0, 217, 194, 0.26);
        }

        .hero-actions .btn-ghost {
          color: #e7edf5;
          background: rgba(4, 12, 19, 0.3);
          border-color: rgba(197, 217, 233, 0.52);
        }

        .hero-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .hero-tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 34px;
          padding: 0.42rem 0.95rem;
          color: rgba(235, 242, 249, 0.88);
          background: rgba(3, 12, 18, 0.42);
          border: 1px solid rgba(163, 192, 214, 0.28);
          border-radius: 999px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-size: 0.68rem;
          font-weight: 500;
          line-height: 1;
        }

        .hero-tech-pill svg {
          color: #12ddcb;
        }

        @media (min-width: 821px) {
          .hero-role {
            margin-bottom: 2rem;
            font-size: 0.82rem;
            line-height: 1.55;
          }

          .hero-name {
            margin-bottom: 3rem;
            font-size: clamp(4.3rem, 6.9vw, 6.9rem);
            line-height: 0.9;
          }

          .hero-title {
            gap: 0.28rem;
            font-size: clamp(2.15rem, 3.65vw, 3.5rem);
            line-height: 1.08;
          }

          .hero-title strong {
            white-space: nowrap;
          }

          .hero-description {
            max-width: 525px;
            margin: 1.4rem 0 2rem;
            font-size: 0.92rem;
            line-height: 1.65;
          }

          .hero-actions {
            gap: 1.1rem;
            margin-bottom: 1.8rem;
          }

          .hero-actions a {
            min-height: 48px;
            padding: 0.78rem 1.5rem;
            font-size: 0.84rem;
          }

          .hero-tech-list {
            gap: 0.72rem;
          }

          .hero-tech-pill {
            min-height: 38px;
            padding: 0.48rem 1.05rem;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 820px) {
          .portfolio-hero {
            min-height: 100svh !important;
            padding: 6.65rem 1.2rem 2.6rem !important;
          }

          .hero-content {
            width: min(100%, 390px) !important;
            gap: 0 !important;
          }

          .hero-role {
            margin-bottom: 1.15rem !important;
            font-size: 0.68rem !important;
            letter-spacing: 0.095em !important;
            line-height: 1.5 !important;
          }

          .hero-name {
            margin-bottom: 1.55rem !important;
            font-size: clamp(3rem, 14.5vw, 4.4rem) !important;
            letter-spacing: -0.04em !important;
            line-height: 0.88 !important;
            text-align: left !important;
          }

          .hero-main {
            margin-top: 0 !important;
          }

          .hero-title {
            gap: 0.2rem;
            font-size: clamp(1.5rem, 7.3vw, 2.2rem) !important;
            line-height: 1.08 !important;
            letter-spacing: 0 !important;
            margin-bottom: 0 !important;
          }

          .hero-description {
            max-width: 340px;
            margin: 1.05rem 0 1.45rem !important;
            font-size: 0.78rem !important;
            line-height: 1.58 !important;
          }

          .hero-actions {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            gap: 0.72rem !important;
            margin-bottom: 1.3rem !important;
          }

          .hero-actions a {
            min-height: 42px !important;
            padding: 0.6rem 0.92rem !important;
            font-size: 0.72rem !important;
            gap: 0.45rem !important;
            white-space: nowrap !important;
          }

          .hero-actions svg {
            width: 14px !important;
            height: 14px !important;
          }

          .hero-tech-list {
            width: calc(100vw - 1rem) !important;
            max-width: none !important;
            flex-wrap: nowrap !important;
            gap: 0.35rem !important;
            margin: 0 0 0 -0.25rem !important;
          }

          .hero-tech-pill {
            min-height: 32px;
            flex-shrink: 0;
            padding: 0.4rem 0.64rem !important;
            gap: 0.35rem !important;
            font-size: 0.64rem !important;
            white-space: nowrap;
          }

          .hero-tech-pill svg {
            width: 12px !important;
            height: 12px !important;
            flex-shrink: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Index;
