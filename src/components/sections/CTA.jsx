import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone } from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CONTACT } from '../../data/company';
import { HOME_CONTENT } from '../../data/pageContent';
import Button from '../ui/Button';
import './CTA.css';

const CTA = () => {
  const [ref, inView] = useScrollReveal();
  const { cta } = HOME_CONTENT;

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
            <h2>{cta.title}</h2>
            <p>{cta.subtitle}</p>
          </div>

          <div className="cta-actions">
            <Button to="/contact" variant="primary" size="lg">
              {cta.button}
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
