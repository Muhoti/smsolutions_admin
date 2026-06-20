import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({
  service,
  variant = 'compact',
  inView = true,
  index = 0,
}) => {
  const {
    id,
    icon: Icon,
    title,
    subtitle,
    description,
    features = [],
    technologies = [],
  } = service;

  const displayFeatures = variant === 'compact' ? features.slice(0, 4) : features;

  return (
    <motion.div
      id={variant === 'detailed' ? id : undefined}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      {variant === 'detailed' ? (
        <>
          <div className="service-header">
            <div className="service-icon">
              <Icon size={40} />
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-subtitle">{subtitle}</p>
          </div>

          <p className="service-description">{description}</p>

          <div className="service-features">
            <h4>What We Deliver:</h4>
            <ul>
              {displayFeatures.map((feature) => (
                <li key={feature}>
                  <FiCheckCircle size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="service-technologies">
            <h4>Technologies:</h4>
            <div className="tech-tags">
              {technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="service-icon">
            <Icon size={40} />
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <ul className="service-features">
            {displayFeatures.map((feature) => (
              <li key={feature}>
                <FiCheckCircle size={16} />
                {feature}
              </li>
            ))}
          </ul>
          <Link to="/services" className="service-btn">
            Learn More
            <FiArrowRight size={16} />
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default ServiceCard;
