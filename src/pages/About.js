import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, 
  FiSmartphone, 
  FiMonitor, 
  FiCpu,
  FiUsers,
  FiGlobe,
  FiCheckCircle,
  FiTarget
} from 'react-icons/fi';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const capabilities = [
    { name: 'React & Node.js', level: 95, icon: FiCode },
    { name: 'Web Applications', level: 95, icon: FiMonitor },
    { name: 'Mobile Development', level: 90, icon: FiSmartphone },
    { name: 'PostgreSQL & APIs', level: 92, icon: FiCode },
    { name: 'AI Integration', level: 88, icon: FiCpu },
    { name: 'Systems Architecture', level: 90, icon: FiTarget }
  ];

  const highlights = [
    {
      icon: FiUsers,
      number: 'Consultancy',
      title: 'Client-First Approach',
      description: 'We start with your business problem, not a technology trend'
    },
    {
      icon: FiGlobe,
      number: 'Full-Stack',
      title: 'End-to-End Delivery',
      description: 'From strategy and design through to deployment and support'
    },
    {
      icon: FiCpu,
      number: 'AI-Ready',
      title: 'Practical Intelligence',
      description: 'We apply AI where it saves time, reduces cost, or improves decisions'
    },
    {
      icon: FiCheckCircle,
      number: 'Nairobi',
      title: 'Local & Remote',
      description: 'Based in Kenya, serving clients locally and internationally'
    }
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'We understand your goals, users, and constraints.' },
    { step: '02', title: 'Proposal', description: 'We define scope, timeline, and the right technical approach.' },
    { step: '03', title: 'Build', description: 'We develop with modern engineering practices and clear communication.' },
    { step: '04', title: 'Launch', description: 'We deploy, test, and ensure your system is production-ready.' },
    { step: '05', title: 'Support', description: 'We remain available for improvements and ongoing guidance.' }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-title">About Strong&apos;s Digital Labs</h1>
            <p className="about-subtitle">
              A technology consultancy helping businesses build intelligent online systems
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <motion.div 
              className="story-text"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Who We Are</h2>
              <p>
                Strong&apos;s Digital Labs is a software development consultancy focused on helping businesses 
                design, build, and maintain online systems — websites, web applications, and 
                mobile apps that solve real operational challenges.
              </p>
              <p>
                We work with startups, SMEs, NGOs, and public-sector organizations that need 
                reliable technology partners. From emergency response platforms to agricultural 
                management systems, we bring full-stack engineering expertise to every engagement.
              </p>
              <p>
                What sets us apart is our practical approach to AI. We do not sell buzzwords — 
                we integrate intelligent automation, faster development workflows, and 
                data-driven features where they genuinely improve outcomes for your business.
              </p>
            </motion.div>
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="image-placeholder about-logo-wrap">
                <img src="/logo.png" alt="Strong's Digital Labs" className="about-logo" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="about-skills" ref={ref}>
        <div className="container">
          <motion.div 
            className="skills-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Capabilities</h2>
            <p>Modern full-stack engineering with a focus on maintainable, scalable systems</p>
          </motion.div>

          <div className="skills-grid">
            {capabilities.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="skill-icon">
                  <skill.icon size={32} />
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-achievements">
        <div className="container">
          <motion.div 
            className="achievements-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {highlights.map((item, index) => (
              <motion.div 
                key={item.title}
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="achievement-icon">
                  <item.icon size={40} />
                </div>
                <div className="achievement-number">{item.number}</div>
                <div className="achievement-title">{item.title}</div>
                <div className="achievement-description">{item.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <motion.div 
            className="values-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>How We Work</h2>
            <div className="values-grid">
              {process.map((step) => (
                <div key={step.step} className="value-item">
                  <h3>{step.step}. {step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <motion.div 
            className="values-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Quality Engineering</h3>
                <p>We write maintainable code and build systems designed to last.</p>
              </div>
              <div className="value-item">
                <h3>Client Success</h3>
                <p>Your outcomes drive our work. We measure success by the value we deliver.</p>
              </div>
              <div className="value-item">
                <h3>Practical Innovation</h3>
                <p>We adopt new technology — including AI — only when it serves your business.</p>
              </div>
              <div className="value-item">
                <h3>Transparency</h3>
                <p>Clear communication, honest timelines, and no surprises along the way.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
