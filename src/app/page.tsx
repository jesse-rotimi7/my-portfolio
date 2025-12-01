'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { 
  SiHtml5, 
  SiCss3, 
  SiSass, 
  SiJavascript, 
  SiReact, 
  SiGithub, 
  SiLinkedin,
  SiNodedotjs,  
  SiExpress,
  SiMongodb, 
  SiTypescript,
  SiNextdotjs,
  SiPython,
  SiGit,
  SiTailwindcss,
  SiPostgresql,
} from 'react-icons/si';
import { FiExternalLink, FiGithub, FiDownload } from 'react-icons/fi';

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // EmailJS configuration from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'YOUR_SERVICE_ID' || 
        templateId === 'YOUR_TEMPLATE_ID' || 
        publicKey === 'YOUR_PUBLIC_KEY') {
      setFormStatus('error');
      setFormMessage('Email service is not configured. Please set up EmailJS environment variables. See EMAILJS_SETUP.md for instructions.');
      return;
    }

    const templateParams = {
      from_name: formData.get('name') as string,
      from_email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setFormStatus('success');
      setFormMessage('Thank you for your message! I\'ll get back to you soon.');
      form.reset();
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormMessage('');
      }, 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus('error');
      setFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: SiGithub, href: 'https://github.com/jesse-rotimi7' },
    { name: 'LinkedIn', icon: SiLinkedin, href: 'https://www.linkedin.com/in/jesse-rotimi-a30695248/' },
  ];

  const timelineSteps = [
    { label: 'Plan', icon: '📋' },
    { label: 'Design', icon: '🎨' },
    { label: 'Develop', icon: '💻' },
    { label: 'Test', icon: '🧪' },
    { label: 'Deploy', icon: '🚀' },
  ];

  const experiences = [
    {
      year: '2025',
      title: 'Frontend Developer',
      company: 'Immibuddy',
      location: 'Canada',
      period: 'May 2025 - Present',
      responsibilities: [
        'Collaborated with backend developers to integrate APIs for core features (Messaging, Community Management, dynamic content feeds)',
        'Developed responsive front-ends using React and Tailwind CSS for a seamless user experience across devices',
        'Managed application state and data fetching with Redux Toolkit Query (RTK Query) for real-time data optimization',
      ],
      side: 'right',
    },
    {
      year: '2024',
      title: 'Frontend Developer Intern',
      company: 'LexTech Ecosystem Limited',
      location: 'Lagos, Nigeria',
      period: 'Nov 2024 - Sept 2025',
      responsibilities: [
        'Built responsive React and Tailwind UI components based on LexTech\'s design system',
        'Developed clean form flows for e-Affidavit, Multi-Door Court, and NIC solutions',
        'Integrated frontend with backend APIs for legal-tech workflows',
      ],
      side: 'left',
    },
    {
      year: '2023',
      title: 'Frontend Developer Intern',
      company: 'The Content Place',
      location: 'Lagos, Nigeria',
      period: 'March 2023 - Sept 2023',
      responsibilities: [
        'Spearheaded the successful launch of a new company website using full-stack development (HTML, CSS, JavaScript, Python Flask), collaborating with a supervisor',
        'Optimized mobile responsiveness of the company\'s React e-commerce site for selling artworks, enhancing user experience and performance',
      ],
      side: 'right',
    },
  ];

  const skills = [
    { name: 'JAVASCRIPT', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'PYTHON', icon: SiPython, color: '#3776AB' },
    { name: 'TYPESCRIPT', icon: SiTypescript, color: '#3178C6' },
    { name: 'REACT JS', icon: SiReact, color: '#61DAFB' },
    { name: 'NEXT.JS', icon: SiNextdotjs, color: '#000000' },
    { name: 'TAILWIND', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'NODE JS', icon: SiNodedotjs, color: '#339933' },
    { name: 'EXPRESS', icon: SiExpress, color: '#ffffff' },
    { name: 'GITHUB', icon: SiGithub, color: '#ffffff' },
    { name: 'MONGODB', icon: SiMongodb, color: '#47A248' },
    { name: 'GIT', icon: SiGit, color: '#F05032' },
      { name: 'POSTGRESQL', icon: SiPostgresql, color: '#4169E1' },
  ];

  const projects = [
    {
      title: 'Chat Application',
      description: 'Soro Chat — Real-time chat application with user authentication, direct messaging. Features Socket.io for instant messaging, avatar uploads, and online status indicators. Deployed on Vercel (frontend) and Render (backend) with MongoDB Atlas.',
      image: '/projects/chat.png',
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Express', 'Socket.io', 'Cloudinary'],
      github: 'https://github.com/jesse-rotimi7/Soro-repo',
      live: 'https://soro-one.vercel.app/chat',
      featured: false,
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, shopping cart, order management, favorites, and product reviews. Features a modern UI with smooth animations, responsive design, and session-based guest checkout support.',
      image: '/projects/oja.png',
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind'],
      github: 'https://github.com/jesse-rotimi7/oja',
      live: 'https://oja-ruddy.vercel.app/',
      featured: true,
    },
    {
      title: 'ITScope Solutions Corporate Website',
      description: 'A modern corporate website showcasing IT consulting services with an interactive product catalog, payment integration, and dynamic content sections. Built with responsive design and smooth animations.',
      image: '/projects/Its.png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'EmailJS'],
      live: 'https://www.itscopesolutions.com/',
      featured: true,
    },
    // {
    //   title: 'Weather Dashboard',
    //   description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    //   image: '/api/placeholder/600/400',
    //   technologies: ['React', 'JavaScript', 'API Integration'],
    //   github: 'https://github.com',
    //   live: 'https://example.com',
    //   featured: false,
    // },
 
  ];

  const navLinks = [
    { label: 'Home', href: '#hero', onClick: scrollToTop },
    { label: 'Skills', href: '#skills', onClick: () => document.querySelector('.skills-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Projects', href: '#projects', onClick: scrollToProjects },
    { label: 'Experience', href: '#journey', onClick: () => document.querySelector('.journey-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Contact', href: '#contact', onClick: scrollToContact },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (onClick: () => void) => {
    onClick();
    setIsMenuOpen(false);
  };

  return (
    <>
    <div className="portfolio-container">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <button className="navbar-logo" onClick={scrollToTop} aria-label="Home">
            <div className="navbar-logo-glow"></div>
            <span className="navbar-logo-text">JR</span>
          </button>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.onClick);
                  }}
                  className="navbar-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Social Links */}
          <div className="navbar-social">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-social-link"
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-mobile-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.onClick);
                  }}
                  className="navbar-mobile-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar-mobile-social">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-mobile-social-link"
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-greeting">
              Hey, I&apos;m <span className="hero-name">Jesse Rotimi</span>
              {/* <span className="sparkle">⭐</span>
              <span className="sparkle sparkle-2">⭐</span> */}
            </h1>
            <p className="hero-role">A Software Developer</p>
            <p className="hero-description">
           I focus on turning ideas into fast, scalable, and beautifully crafted digital experiences.
            </p>
            
            <div className="hero-actions">
              <div className="cta-buttons">
                <button className="cta-button" onClick={scrollToContact}>
                  <span className="cta-icon">@</span>
                  Contact Me
                </button>
                {/* <button className="cta-button" onClick={scrollToProjects}>
                  <span className="cta-icon">☰</span>
                  View Projects
                </button> */}
              <a 
                href="/Jesse_Rotimi's Resume.pdf" 
                download="Jesse_Rotimi_Resume.pdf"
                className="cta-button cta-button-download"
              >
                <FiDownload className="cta-icon" />
                Download Resume
              </a>
              </div>
              
              <div className="social-divider"></div>
              
              <div className="hero-social-icons">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-icon"
                      aria-label={social.name}
                    >
                      <IconComponent className="hero-social-icon-text" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-image-glow"></div>
            <Image
              src="/hero/headshot.png"
              alt="Jesse Rotimi"
              width={400}
              height={400}
              className="hero-image"
              priority
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section className="timeline-section">
        <div className="timeline-container">
          {timelineSteps.map((step, index) => (
            <div key={step.label} className="timeline-item">
              <div className="timeline-box">
                <span className="timeline-icon">{step.icon}</span>
                <span className="timeline-label">{step.label}</span>
              </div>
              {index < timelineSteps.length - 1 && (
                <div className="timeline-connector">
                  <div className="timeline-line"></div>
                  <div className="timeline-node"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section> */}

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <h2 className="skills-title">SKILLS</h2>
        <p className="skills-intro">
          A fullstack developer with solid foundations in design. Passionate about crafting 
          seamless user experiences, I thrive at the intersection of creativity and functionality. 
         
        </p>
        <div className="skills-grid">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="skill-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="skill-icon-wrapper" style={{ '--skill-color': skill.color } as React.CSSProperties}>
                  <IconComponent className="skill-icon" />
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="projects-title">PROJECTS</h2>
        <p className="projects-intro">
          Here are some of my recent projects that showcase my skills in full-stack development,
          modern frameworks, and creative problem-solving. Each project represents a unique challenge
          and learning opportunity.
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image-wrapper">
                {project.image && project.image !== '/api/placeholder/600/400' ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="project-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="project-image-placeholder">
                    <div className="project-image-content">
                      <span className="project-image-icon">💻</span>
                      <span className="project-image-text">{project.title}</span>
                    </div>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View on GitHub"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View live site"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey/Experience Section */}
      <section id="journey" className="journey-section">
        <h2 className="journey-title">My Journey</h2>
        <p className="journey-intro">
          A timeline of my professional growth and experiences in software development. 
          Each milestone represents learning, challenges overcome, and contributions made to innovative projects.
        </p>
        <div className="journey-timeline">
          {experiences.map((experience, index) => (
            <div key={index} className={`journey-item journey-item-${experience.side}`}>
              <div className="journey-year"></div>
              <div className="journey-card">
                <div className="journey-card-header">
                  <h3 className="journey-job-title">{experience.title}</h3>
                  <span className="journey-period">{experience.period}</span>
                </div>
                <p className="journey-company">
                  <em>{experience.company} ({experience.location})</em>
                </p>
                <ul className="journey-responsibilities">
                  {experience.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="contact-title">GET IN TOUCH</h2>
        <p className="contact-intro">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
          Send me a message and I&apos;ll respond as soon as possible.
        </p>
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="form-input"
                  disabled={formStatus === 'loading'}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="form-input"
                  disabled={formStatus === 'loading'}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="What's this about?"
                className="form-input"
                disabled={formStatus === 'loading'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about your project or just say hello..."
                className="form-input form-textarea"
                disabled={formStatus === 'loading'}
              ></textarea>
            </div>
            {formMessage && (
              <div className={`form-message form-message-${formStatus}`}>
                {formMessage}
              </div>
            )}
            <button 
              type="submit" 
              className="contact-submit"
              disabled={formStatus === 'loading'}
            >
              {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Jesse Rotimi</h3>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); document.querySelector('.skills-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Skills</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToProjects(); }}>Projects</a>
              <a href="#journey" onClick={(e) => { e.preventDefault(); document.querySelector('.journey-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Experience</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }}>Contact</a>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Jesse Rotimi
          </p>
          {/* <p className="footer-built">
            Built with Next.js & React
          </p> */}
        </div>
      </footer>
    </>
  );
}
