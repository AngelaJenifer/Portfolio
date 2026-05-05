import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { PERSONAL_DETAILS, EXPERIENCES, PROJECTS, SKILLS, EDUCATION } from './constants';
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
  AlertCircle
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

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400 relative ${
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

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex-1 text-center md:text-left space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-primary-600 dark:text-primary-300 font-medium rounded-full text-sm mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                Frontend Developer
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              Hi, I'm <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 animate-gradient-x bg-[length:200%_auto]">
                {PERSONAL_DETAILS.name}
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {PERSONAL_DETAILS.tagline}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-full hover:from-primary-500 hover:to-secondary-500 transition-all shadow-lg hover:shadow-primary-900/40 flex items-center justify-center gap-2"
              >
                Contact Me <Send size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-secondary-500/50 hover:text-primary-600 dark:hover:text-white transition-all flex items-center justify-center gap-2 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(192,38,211,0.2)]"
              >
                View Work <ChevronRight size={18} />
              </motion.button>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="pt-8 flex items-center justify-center md:justify-start gap-8 text-slate-500 dark:text-slate-500">
              <div className="flex items-center gap-2 group hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <MapPin size={18} className="group-hover:text-secondary-600 dark:group-hover:text-secondary-400" />
                <span className="text-sm">Chennai, India</span>
              </div>
              <div className="flex items-center gap-2 group hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Briefcase size={18} className="group-hover:text-secondary-600 dark:group-hover:text-secondary-400" />
                <span className="text-sm">2+ Years Tech Exp</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Animated Profile Image */}
          <div className="flex-1 relative w-full max-w-md md:max-w-lg mt-10 md:mt-0 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-80 h-80 md:w-[400px] md:h-[400px]"
            >
              {/* Background Blob Animation */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 -right-4 w-72 h-72 bg-secondary-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              
              {/* Glowing Pulse behind image */}
              <div className="absolute inset-4 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-full opacity-20 dark:opacity-30 blur-xl animate-pulse"></div>

              {/* Main Image Container */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-full h-full z-10"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-full overflow-hidden"
                >
                  <img 
                    src={isDark ? PERSONAL_DETAILS.profileImageDark : PERSONAL_DETAILS.profileImageLight}                    
                    alt={PERSONAL_DETAILS.name} 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
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
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <button className="text-secondary-600 dark:text-secondary-400 font-medium flex items-center hover:text-secondary-500 dark:hover:text-secondary-300 transition-colors">
                View GitHub <ExternalLink size={16} className="ml-1" />
              </button>
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
              { icon: Code2, title: "Modern Stack", desc: "Specialized in React ecosystem including Context API and Styled Components.", color: "text-primary-600 dark:text-primary-400" },
              { icon: Briefcase, title: "Domain Knowledge", desc: "Experience in Logistics, Fleet Management, and SaaS platforms.", color: "text-secondary-600 dark:text-secondary-400" }
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
    </div>
  );
};

export default App;