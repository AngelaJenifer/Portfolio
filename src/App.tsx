import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PERSONAL_DETAILS, EXPERIENCES, PROJECTS, SKILLS, EDUCATION } from './constants';
import { Project } from './types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  Award, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  User, 
  Send,
  ExternalLink,
  Sun,
  Moon,
  Loader2,
  CheckCircle,
  AlertCircle,
  Star,
  Users,
  Clock,
  Layers,
  Linkedin,
  ArrowDown
} from 'lucide-react';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const slideInLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Typing Effect Hook
function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIdx(i => i + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const typedRole = useTypingEffect(PERSONAL_DETAILS.roleVariants);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Handle Theme Toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Handle scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '9b9da151-c202-4077-b36d-1d9706ebc61b';

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset success status after 10 seconds
        setTimeout(() => setStatus('idle'), 10000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      // Reset error status after 10 seconds
      setTimeout(() => setStatus('idle'), 10000);
    }
  };
const isDark = theme === "dark";
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-secondary-500 selection:text-white overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer group gap-3" onClick={() => scrollToSection('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white font-serif font-bold text-xl shadow-lg group-hover:shadow-primary-500/30 group-hover:scale-105 transition-all duration-300">
                AJ
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              </div>
             

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`cursor-pointer text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 relative ${
                    activeSection === item.toLowerCase() 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 font-bold' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div 
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400"
                    />
                  )}
                </button>
              ))}
              
              {/* Theme Toggle Button Desktop */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg absolute w-full overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ── Hero Section ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

        {/* Dot-grid animated background */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ambient gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary-600/20 dark:bg-primary-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-secondary-600/20 dark:bg-secondary-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* ── Left: Text Content ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex-1 text-center lg:text-left space-y-7 order-2 lg:order-1"
            >
              {/* Availability badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-400 text-xs font-semibold tracking-wide shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for Opportunities
              </motion.div>

              {/* Name */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                Hi, I'm{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-500 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 animate-gradient-x bg-[length:200%_auto]">
                  Angela Jenifer
                </span>
              </motion.h1>

              {/* Typing role */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-lg sm:text-xl md:text-2xl font-mono font-medium text-slate-600 dark:text-slate-300">
                  {typedRole}
                  <span className="inline-block w-0.5 h-6 bg-primary-500 ml-0.5 align-middle animate-pulse" />
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {PERSONAL_DETAILS.tagline}
              </motion.p>

              {/* Stat counters */}
              <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start gap-6 pt-1">
                {PERSONAL_DETAILS.stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">{stat.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-7 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-900/30 hover:shadow-primary-900/50 hover:from-primary-500 hover:to-secondary-500 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Mail size={16} /> Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToSection('projects')}
                  className="px-7 py-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-white hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Code2 size={16} /> View Projects
                </motion.button>
              </motion.div>

              {/* Social Links + Location */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4 justify-center lg:justify-start pt-2 flex-wrap">
                <a
                  href={PERSONAL_DETAILS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 border border-slate-200 dark:border-slate-700 group-hover:border-primary-400/50 transition-all">
                    <Linkedin size={15} />
                  </span>
                  LinkedIn
                </a>

                <a
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-secondary-50 dark:group-hover:bg-secondary-900/30 border border-slate-200 dark:border-slate-700 group-hover:border-secondary-400/50 transition-all">
                    <Mail size={15} />
                  </span>
                  Email
                </a>
                <span className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                  <MapPin size={14} /> Chennai, India
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right: Profile Photo ── */}
            <div className="flex-shrink-0 order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="relative"
              >
                {/* Outer spinning gradient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary-500 via-secondary-500 to-primary-400 opacity-70 blur-sm"
                />

                {/* Static ring frame */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 opacity-80" />

                {/* Glowing backdrop */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-600/40 to-secondary-600/40 blur-2xl scale-110 pointer-events-none" />

                {/* Floating animation wrapper */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl"
                >
                  <img
                    src={isDark ? PERSONAL_DETAILS.profileImageDark : PERSONAL_DETAILS.profileImageLight}
                    alt={PERSONAL_DETAILS.name}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>

                {/* Decorative floating badge — Experience */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -right-6 top-8 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
                >
                  <Briefcase size={14} className="text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">Experience</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">2+ Years</p>
                  </div>
                </motion.div>

                {/* Decorative floating badge — React */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute -left-8 bottom-10 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
                >
                  <Code2 size={14} className="text-secondary-600 dark:text-secondary-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">Speciality</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">React.js</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>

          {/* ── Scroll Down Indicator ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-600 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group"
              aria-label="Scroll to About"
            >
              <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={18} className="group-hover:text-primary-500 transition-colors" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
        {/* Background gradient splash */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="md:w-1/2"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="text-secondary-600 dark:text-secondary-400" size={24} />
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">About Me</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-lg">
                {PERSONAL_DETAILS.about}
              </p>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
              >
                {EDUCATION.map((edu, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                    className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-primary-900/10 group"
                  >
                    <GraduationCap className="text-primary-600 dark:text-primary-400 mb-3 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors" size={24} />
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1 leading-snug">{edu.degree}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{edu.institution}</p>
                    <p className="text-xs text-primary-600/70 dark:text-primary-300/70">{edu.period}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="md:w-1/2"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                Technical Expertise
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800 ml-4"></span>
              </h3>
              <div className="space-y-6">
                {SKILLS.filter(s => s.category === 'Frontend' || s.category === 'Backend').map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-300">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 dark:from-primary-600 dark:to-secondary-500 rounded-full relative"
                      >
                         <div className="absolute right-0 top-0 bottom-0 w-full bg-gradient-to-b from-white/20 to-transparent"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4"
            >
              Professional Experience
            </motion.h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-600 via-slate-300 to-slate-200 dark:from-primary-900 dark:via-slate-800 dark:to-slate-900"
            ></motion.div>

            <div className="space-y-12">
              {EXPERIENCES.map((exp, index) => (
                <motion.div 
                  key={exp.id} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 bg-gradient-to-r from-primary-500 to-secondary-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10 mt-6 md:mt-0"></div>

                  {/* Content */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="ml-8 md:ml-0 md:w-1/2 p-1 rounded-xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/40 dark:hover:to-secondary-900/40 transition-all duration-300 group shadow-md dark:shadow-none"
                  >
                    <div className="bg-white dark:bg-slate-950 h-full w-full rounded-lg p-6 relative overflow-hidden transition-colors">
                      {/* Hover glow effect */}
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl group-hover:bg-primary-600/20 transition-all"></div>
                      
                      <div className="flex flex-col gap-1 mb-4 relative z-10">
                        <span className="text-xs font-bold text-secondary-600 dark:text-secondary-400 tracking-wider uppercase bg-slate-100 dark:bg-slate-900/50 self-start px-2 py-1 rounded border border-slate-200 dark:border-slate-800">{exp.period}</span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 group-hover:text-primary-700 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-white dark:group-hover:to-primary-200">{exp.role}</h3>
                        <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                          <span className="font-medium text-primary-600 dark:text-primary-300">{exp.company}</span>
                          <span className="mx-2">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <ul className="space-y-2 relative z-10">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-secondary-500 rounded-full flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                  
                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-900 relative transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                A selection of key projects where I contributed to architectural decisions and frontend development.
              </p>
            </motion.div>

          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-primary-900/20 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-primary-500/50 dark:hover:border-primary-500/30 flex flex-col h-full relative"
              >
                <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden group-hover:bg-slate-200 dark:group-hover:bg-slate-800/80 transition-colors">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code2 size={48} className="text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent z-10"></div>
                  
                  <div className="absolute bottom-4 left-4 z-20">
                     <h3 className="text-slate-900 dark:text-white font-bold text-xl group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow relative">
                   {/* Gradient line top */}
                   <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent group-hover:via-primary-500/50 transition-all"></div>
                   
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-secondary-600 dark:text-secondary-300 rounded-md group-hover:border-secondary-500/30 transition-colors shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => project.details && setSelectedProject(project)}
                    className="w-full py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/50 dark:hover:to-secondary-900/50 hover:border-primary-500/50 hover:text-primary-700 dark:hover:text-white transition-all text-sm group-hover:shadow-lg"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards & Soft Skills Mini Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { icon: Award, title: "Star Performer", desc: "Awarded 10+ times for excellence in customer service and delivery.", color: "text-yellow-500 dark:text-yellow-400" },
              { icon: Code2, title: "Tech Stack", desc: "React, TypeScript, Redux, MUI, Tailwind CSS, Vite, PWA, REST APIs, Chart.js & Styled Components.", color: "text-primary-600 dark:text-primary-400" },
              { icon: Briefcase, title: "Domain Knowledge", desc: "Experience in Dock & Warehouse Logistics, Sports-Tech SaaS, and Last-Mile Route Optimization platforms.", color: "text-secondary-600 dark:text-secondary-400" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 hover:border-primary-500/30 transition-all shadow-md dark:shadow-none"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-inner">
                   <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-900 relative transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-black/50 overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-800 relative z-10"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 p-10 md:w-2/5 text-white flex flex-col justify-start gap-12 relative overflow-hidden">
               {/* Pattern overlay */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-secondary-500 rounded-full mix-blend-overlay filter blur-3xl opacity-40 -mr-10 -mt-10"></div>
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-400 rounded-full mix-blend-overlay filter blur-3xl opacity-40 -ml-10 -mb-10"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-6">Let's Connect</h2>
                <p className="text-primary-50 dark:text-primary-100 mb-8 leading-relaxed">
                  I'm currently available for freelance work or full-time opportunities. Let's discuss how I can contribute to your team.
                </p>
              </div>
              
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="space-y-6 relative z-10">
                {[
                  { icon: Mail, label: "Email Me", val: PERSONAL_DETAILS.email, href: `mailto:${PERSONAL_DETAILS.email}` },
                  { icon: Phone, label: "Call Me", val: PERSONAL_DETAILS.phone, href: `tel:${PERSONAL_DETAILS.phone}` },
                  { icon: MapPin, label: "Location", val: "Chennai, 600078", href: null }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex items-center gap-4 group">
                    <div className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-primary-100 dark:text-primary-200">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium hover:underline">{item.val}</a>
                      ) : (
                        <p className="font-medium">{item.val}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="p-10 md:w-3/5 bg-slate-50 dark:bg-slate-900">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]" 
                    placeholder="Job Opportunity" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Message *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4} 
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none placeholder-slate-400 dark:placeholder-slate-600 focus:shadow-[0_0_10px_rgba(139,92,246,0.2)]" 
                    placeholder="Hello, I'd like to discuss..."
                  ></textarea>
                </div>

                <div className="space-y-4">
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3 text-green-700 dark:text-green-400 overflow-hidden"
                    >
                      <CheckCircle size={20} className="flex-shrink-0" />
                      <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400 overflow-hidden"
                    >
                      <AlertCircle size={20} className="flex-shrink-0" />
                      <span className="text-sm font-medium">{errorMessage}</span>
                    </motion.div>
                  )}

                  <motion.button 
                    whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    type="submit" 
                    disabled={status === 'sending'}
                    className={`w-full py-3.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-lg hover:from-primary-500 hover:to-secondary-500 transition-all shadow-lg shadow-primary-900/20 hover:shadow-secondary-900/40 flex items-center justify-center gap-2 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 py-8 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-600 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} {PERSONAL_DETAILS.name}. All rights reserved.
          </p>
          <p className="text-slate-500 dark:text-slate-600 text-xs mt-2">
            Built with React, Tailwind CSS & Lucide Icons
          </p>
        </div>
      </footer>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && selectedProject.details && (
          <motion.div
            key="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            onKeyDown={(e) => e.key === 'Escape' && setSelectedProject(null)}
          >
            <motion.div
              key="project-modal-panel"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Header */}
              {selectedProject.image && (
                <div className="h-52 w-full overflow-hidden rounded-t-2xl relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <h2 className="absolute bottom-4 left-6 text-white font-bold text-2xl drop-shadow-lg">
                    {selectedProject.title}
                  </h2>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="p-6 space-y-6">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700/50 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Meta: Role / Team / Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <User size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Role</p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug mt-0.5">{selectedProject.details.role}</p>
                    </div>
                  </div>
                  {selectedProject.details.teamSize && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <Users size={16} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Team</p>
                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mt-0.5">{selectedProject.details.teamSize}</p>
                      </div>
                    </div>
                  )}
                  {selectedProject.details.duration && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <Clock size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Duration</p>
                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mt-0.5">{selectedProject.details.duration}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Layers size={16} className="text-primary-500" /> Overview
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedProject.details.overview}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Code2 size={16} className="text-secondary-500" /> Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.details.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <ChevronRight size={15} className="text-primary-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" /> Technical Highlights
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.details.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

  );
};

export default App;
