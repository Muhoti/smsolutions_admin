import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiSmartphone, 
  FiMonitor, 
  FiPenTool,
  FiCode,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiShield,
  FiTrendingUp
} from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      id: 'mobile',
      icon: FiSmartphone,
      title: 'Mobile App Development',
      subtitle: 'Native iOS & Android Apps',
      description: 'Create powerful mobile applications that deliver exceptional user experiences across all devices.',
      features: [
        'Native iOS & Android Development',
        'React Native Cross-Platform Apps',
        'App Store & Play Store Deployment',
        'Push Notifications & Analytics',
        'Offline Functionality',
        'Performance Optimization'
      ],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase'],
      color: 'blue'
    },
    {
      id: 'web',
      icon: FiMonitor,
      title: 'Web Development',
      subtitle: 'Modern Web Applications',
      description: 'Build scalable web applications that provide seamless experiences across all browsers and devices.',
      features: [
        'Progressive Web Apps (PWA)',
        'E-Commerce Platforms',
        'Admin Dashboards & CMS',
        'API Development & Integration',
        'Cloud Hosting & Deployment',
        'Performance Optimization'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS'],
      color: 'green'
    },
    {
      id: 'design',
      icon: FiPenTool,
      title: 'UI/UX Design',
      subtitle: 'Beautiful & Intuitive Design',
      description: 'Design stunning user interfaces that not only look great but provide exceptional user experiences.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Modern UI/UX Design',
        'Brand Identity & Guidelines',
        'Usability Testing',
        'Design System Creation'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision'],
      color: 'purple'
    },
    {
      id: 'consultation',
      icon: FiCode,
      title: 'Technical Consultation',
      subtitle: 'Expert Guidance & Strategy',
      description: 'Get expert advice on technology choices, architecture decisions, and development strategies.',
      features: [
        'Technology Stack Selection',
        'Architecture Planning',
        'Code Review & Optimization',
        'Performance Audits',
        'Security Assessments',
        'Team Training & Mentoring'
      ],
      technologies: ['Architecture', 'Best Practices', 'Code Review', 'Training'],
      color: 'orange'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, target audience, and technical requirements.',
      icon: FiZap
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Create wireframes, mockups, and interactive prototypes to visualize your app.',
      icon: FiPenTool
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Build your app using best practices, with continuous testing and quality assurance.',
      icon: FiCode
    },
    {
      step: '04',
      title: 'Deployment & Launch',
      description: 'Deploy your app to app stores or web servers, with ongoing support and maintenance.',
      icon: FiShield
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div 
            className="services-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="services-title">My Services</h1>
            <p className="services-subtitle">
              Comprehensive app development solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section" ref={ref}>
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                className={`service-card service-card-${service.color}`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
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
                  <h4>What's Included:</h4>
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
                
                <div className="service-cta">
                  <button className="btn btn-outline">
                    Learn More
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <motion.div 
            className="process-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2>My Development Process</h2>
            <p>A proven methodology that ensures successful project delivery</p>
          </motion.div>

          <div className="process-timeline">
            {process.map((step, index) => (
              <motion.div 
                key={step.step}
                className="process-step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
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

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how I can help bring your app idea to life</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                Start Your Project
                <FiArrowRight size={20} />
              </button>
              <button className="btn btn-secondary btn-lg">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
