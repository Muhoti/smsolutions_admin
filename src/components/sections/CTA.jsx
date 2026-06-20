import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone } from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CONTACT } from '../../data/company';
import Button from '../ui/Button';
import './CTA.css';

const CTA = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <section className="cta-section ai-surface" ref={ref}>
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
            <Button to="/contact" variant="primary" size="lg">
              Contact Us
              <FiArrowRight size={20} />
            </Button>

            <div className="cta-contact">
              <div className="contact-item">
                <FiMail size={20} />
                <span>{CONTACT.email}</span>
              </div>
              <div className="contact-item">
                <FiPhone size={20} />
                <span>{CONTACT.phone}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
