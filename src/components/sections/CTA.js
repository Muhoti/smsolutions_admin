import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiPhone } from 'react-icons/fi';
import './CTA.css';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="cta-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-text">
            <h2>Ready to Build Your Next System?</h2>
            <p>
              Tell us about your project. We will review your requirements and respond 
              with a clear path forward — whether you need consultancy, development, or both.
            </p>
          </div>
          
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Us
              <FiArrowRight size={20} />
            </Link>
            
            <div className="cta-contact">
              <div className="contact-item">
                <FiMail size={20} />
                <span>strongmuhoti@gmail.com</span>
              </div>
              <div className="contact-item">
                <FiPhone size={20} />
                <span>+254 707 809 592</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
