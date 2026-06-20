import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiSmartphone,
  FiMonitor,
  FiCpu,
  FiUsers,
  FiGlobe,
  FiCheckCircle,
  FiTarget,
} from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROCESS_STEPS } from '../data/processSteps';
import { COMPANY_VALUES } from '../data/company';
import { ASSETS } from '../constants/assets';
import PageHero from '../components/ui/PageHero';
import ValuesGrid from '../components/ui/ValuesGrid';
import './About.css';

const CAPABILITIES = [
  { name: 'React & Node.js', level: 95, icon: FiCode },
  { name: 'Web Applications', level: 95, icon: FiMonitor },
  { name: 'Mobile Development', level: 90, icon: FiSmartphone },
  { name: 'PostgreSQL & APIs', level: 92, icon: FiCode },
  { name: 'AI Integration', level: 88, icon: FiCpu },
  { name: 'Systems Architecture', level: 90, icon: FiTarget },
];

const HIGHLIGHTS = [
  {
    icon: FiUsers,
    number: 'Consultancy',
    title: 'Client-First Approach',
    description: 'We start with your business problem, not a technology trend',
  },
  {
    icon: FiGlobe,
    number: 'Full-Stack',
    title: 'End-to-End Delivery',
    description: 'From strategy and design through to deployment and support',
  },
  {
    icon: FiCpu,
    number: 'AI-Ready',
    title: 'Practical Intelligence',
    description: 'We apply AI where it saves time, reduces cost, or improves decisions',
  },
  {
    icon: FiCheckCircle,
    number: 'Nairobi',
    title: 'Local & Remote',
    description: 'Based in Kenya, serving clients locally and internationally',
  },
];

const PROCESS_VALUES = PROCESS_STEPS.map((step) => ({
  title: `${step.step}. ${step.title}`,
  description: step.description,
}));

const About = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <div className="about-page">
      <PageHero
        heroClass="about-hero"
        titleClass="about-title"
        subtitleClass="about-subtitle"
        contentClass="about-hero-content"
        title="About Strong's Digital Labs"
        subtitle="A technology consultancy helping businesses build intelligent online systems"
      />

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
              <div className="about-visual-wrap">
                <img
                  src={ASSETS.aboutIllustration}
                  alt="AI-powered technology — data pipelines, web, mobile, and intelligent systems"
                  className="about-visual-img"
                />
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
            {CAPABILITIES.map((skill, index) => (
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
                  <div className="skill-progress" style={{ width: `${skill.level}%` }} />
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
            transition={{ duration: 0.8 }}
          >
            {HIGHLIGHTS.map((item, index) => (
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

      <ValuesGrid title="How We Work" values={PROCESS_VALUES} inView={inView} />
      <ValuesGrid title="Our Values" values={COMPANY_VALUES} inView={inView} />
    </div>
  );
};

export default About;
