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
  FiArrowRight
} from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      icon: FiBriefcase,
      title: 'Systems Consultancy',
      description: 'We help you plan, architect, and modernize online systems that align with your business goals.',
      features: [
        'Requirements & discovery workshops',
        'Technical architecture planning',
        'Legacy system assessment',
        'Digital transformation roadmaps'
      ],
    },
    {
      icon: FiMonitor,
      title: 'Web Development',
      description: 'We build scalable web applications, portals, and dashboards tailored to how your business operates.',
      features: [
        'Business websites & landing pages',
        'Web applications & admin portals',
        'API development & integrations',
        'Cloud deployment & hosting'
      ],
    },
    {
      icon: FiSmartphone,
      title: 'Mobile App Development',
      description: 'We create mobile applications that extend your systems to customers and teams on the go.',
      features: [
        'Cross-platform mobile apps',
        'iOS & Android development',
        'Offline-first field applications',
        'App store deployment'
      ],
    },
    {
      icon: FiCpu,
      title: 'AI-Enabled Solutions',
      description: 'We integrate practical AI capabilities — automation, intelligence, and faster delivery where it matters.',
      features: [
        'AI-assisted development workflows',
        'Intelligent dashboards & reporting',
        'Process automation & chatbots',
        'Document processing & insights'
      ]
    }
  ];

  return (
    <section className="services-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Services</h2>
          <p>End-to-end technology consultancy for businesses building modern online systems</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="service-icon">
                <service.icon size={40} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <FiCheckCircle size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="service-btn">
                Learn More
                <FiArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
