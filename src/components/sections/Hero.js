import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSmartphone, FiMonitor, FiCode } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="hero">
      {/* Floating Background Elements */}
      <div className="hero-floating" style={{ top: '20%', left: '10%' }}>
        <FiSmartphone size={60} color="white" />
      </div>
      <div className="hero-floating" style={{ top: '30%', right: '15%' }}>
        <FiMonitor size={80} color="white" />
      </div>
      <div className="hero-floating" style={{ bottom: '20%', left: '20%' }}>
        <FiCode size={70} color="white" />
      </div>

      <div className="container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FiCode size={16} />
            Professional App Development Services
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform Your Business With
            <br />
            <span className="text-gradient">Custom Mobile & Web Apps</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I create stunning mobile applications and web platforms that drive business growth. 
            From concept to deployment, I deliver enterprise-grade solutions that exceed expectations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link to="/contact" className="hero-btn hero-btn-primary">
              Start Your Project
              <FiArrowRight size={20} />
            </Link>
            <Link to="/portfolio" className="hero-btn hero-btn-secondary">
              View My Work
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="hero-stat">
              <span className="hero-stat-number">50+</span>
              <span className="hero-stat-label">Happy Clients</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">100+</span>
              <span className="hero-stat-label">Projects Completed</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">5+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">300%</span>
              <span className="hero-stat-label">Average ROI</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
