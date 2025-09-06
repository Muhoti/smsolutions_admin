import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiSmartphone, 
  FiMonitor, 
  FiPenTool,
  FiCode,
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
      icon: FiSmartphone,
      title: 'Mobile App Development',
      description: 'Create powerful mobile applications for iOS and Android that deliver exceptional user experiences.',
      features: [
        'Native iOS & Android Development',
        'React Native Cross-Platform Apps',
        'App Store & Play Store Deployment',
        'Push Notifications & Analytics'
      ],
      color: 'blue'
    },
    {
      icon: FiMonitor,
      title: 'Web Development',
      description: 'Build scalable web applications that provide seamless experiences across all browsers and devices.',
      features: [
        'Progressive Web Apps (PWA)',
        'E-Commerce Platforms',
        'Admin Dashboards & CMS',
        'API Development & Integration'
      ],
      color: 'green'
    },
    {
      icon: FiPenTool,
      title: 'UI/UX Design',
      description: 'Design stunning user interfaces that not only look great but provide exceptional user experiences.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Modern UI/UX Design',
        'Usability Testing'
      ],
      color: 'purple'
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
          <h2>My Services</h2>
          <p>Comprehensive app development solutions tailored to your business needs</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              className={`service-card service-card-${service.color}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
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
              <button className="service-btn">
                Learn More
                <FiArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
