import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  FiSmartphone, 
  FiMonitor, 
  FiCpu,
  FiBriefcase,
  FiCheckCircle,
  FiArrowRight,
  FiSearch,
  FiFileText,
  FiCode,
  FiZap,
  FiHeadphones
} from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      id: 'consultancy',
      icon: FiBriefcase,
      title: 'Systems Consultancy',
      subtitle: 'Strategy & Architecture',
      description: 'We help organizations plan, assess, and modernize their technology — before a single line of code is written.',
      features: [
        'Requirements discovery & workshops',
        'Technical architecture & roadmaps',
        'Legacy system assessment',
        'Vendor & technology selection',
        'Digital transformation planning',
        'Ongoing technical advisory'
      ],
      technologies: ['Architecture', 'System Design', 'APIs', 'Cloud', 'PostgreSQL']
    },
    {
      id: 'web',
      icon: FiMonitor,
      title: 'Web Development',
      subtitle: 'Websites, Apps & Portals',
      description: 'We build web applications, business websites, and admin portals that scale with your organization.',
      features: [
        'Corporate & business websites',
        'Web applications & dashboards',
        'Admin portals & CMS systems',
        'API development & integrations',
        'Cloud deployment',
        'Performance optimization'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'AWS']
    },
    {
      id: 'mobile',
      icon: FiSmartphone,
      title: 'Mobile App Development',
      subtitle: 'iOS, Android & Cross-Platform',
      description: 'We create mobile applications that connect your team and customers to your systems anywhere.',
      features: [
        'Cross-platform mobile apps',
        'Native iOS & Android',
        'Field & offline-first apps',
        'Push notifications',
        'App store deployment',
        'Mobile-backend integration'
      ],
      technologies: ['React Native', 'iOS', 'Android', 'Firebase', 'REST APIs']
    },
    {
      id: 'ai',
      icon: FiCpu,
      title: 'AI-Enabled Solutions',
      subtitle: 'Practical Intelligence',
      description: 'We integrate AI capabilities that improve efficiency, automate workflows, and unlock insights from your data.',
      features: [
        'AI-assisted development (faster delivery)',
        'Intelligent dashboards & reporting',
        'Chatbots & customer support automation',
        'Document processing & extraction',
        'Workflow automation',
        'AI-ready system architecture'
      ],
      technologies: ['LLM APIs', 'Automation', 'NLP', 'Data Pipelines', 'Integrations']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We understand your business goals, users, existing systems, and constraints.',
      icon: FiSearch
    },
    {
      step: '02',
      title: 'Proposal',
      description: 'We deliver a clear scope, timeline, and technical approach tailored to your budget.',
      icon: FiFileText
    },
    {
      step: '03',
      title: 'Build',
      description: 'We design and develop your solution with regular updates and quality assurance.',
      icon: FiCode
    },
    {
      step: '04',
      title: 'Launch',
      description: 'We deploy, test, and ensure your system is ready for real-world use.',
      icon: FiZap
    },
    {
      step: '05',
      title: 'Support',
      description: 'We provide ongoing maintenance, improvements, and technical guidance.',
      icon: FiHeadphones
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <motion.div 
            className="services-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="services-title">Our Services</h1>
            <p className="services-subtitle">
              Technology consultancy and development for businesses building modern online systems
            </p>
          </motion.div>
        </div>
      </section>

      <section className="services-grid-section" ref={ref}>
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                id={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div className="service-header">
                  <div className="service-icon">
                    <service.icon size={40} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  <h4>What We Deliver:</h4>
                  <ul>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <FiCheckCircle size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-technologies">
                  <h4>Technologies:</h4>
                  <div className="tech-tags">
                    {service.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <motion.div 
            className="process-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Process</h2>
            <p>A proven consultancy methodology from first conversation to long-term support</p>
          </motion.div>

          <div className="process-timeline">
            {process.map((step, index) => (
              <motion.div 
                key={step.step}
                className="process-step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <div className="step-icon">
                    <step.icon size={32} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Let's Discuss Your Project</h2>
            <p>Tell us what you are building. We will respond with a clear recommendation.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Us
                <FiArrowRight size={20} />
              </Link>
              <Link to="/portfolio" className="btn btn-secondary btn-lg">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
