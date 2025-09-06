import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's work together to bring your app idea to life. I'm here to help you create 
              something amazing that will transform your business.
            </p>
          </div>
          
          <div className="cta-actions">
            <motion.button 
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <FiArrowRight size={20} />
            </motion.button>
            
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
