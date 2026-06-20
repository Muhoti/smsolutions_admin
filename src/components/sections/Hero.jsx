import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiCpu, FiMonitor } from 'react-icons/fi';
import { ASSETS } from '../../constants/assets';
import Button from '../ui/Button';

const Hero = () => {
  const highlights = [
    { icon: FiCode, label: 'Systems Consultancy' },
    { icon: FiMonitor, label: 'Web & Mobile' },
    { icon: FiCpu, label: 'AI-Enabled' },
  ];

  return (
    <section className="hero ai-surface-light">
      <div className="container">
        <div className="hero-layout">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-eyebrow">WE CODE. WE DESIGN. WE EMPOWER.</span>

            <h1 className="hero-title">
              We build intelligent
              <span className="hero-title-accent"> online systems</span>
            </h1>

            <p className="hero-subtitle">
              Strong&apos;s Digital Labs helps businesses design and deliver websites,
              web applications, and mobile apps — with practical AI where it adds real value.
            </p>

            <div className="hero-cta">
              <Button to="/contact" variant="primary" size="lg">
                Contact Us
                <FiArrowRight size={18} />
              </Button>
              <Button to="/portfolio" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>

            <div className="hero-highlights">
              {highlights.map((item) => (
                <div key={item.label} className="hero-highlight">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="hero-card">
              <img src={ASSETS.logoHero} alt="Strong's Digital Labs" className="hero-logo" />
              <p className="hero-card-text">
                Technology consultancy for organizations building modern digital systems.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
