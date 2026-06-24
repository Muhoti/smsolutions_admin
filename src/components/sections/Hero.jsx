import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiMonitor } from 'react-icons/fi';
import { HOME_CONTENT } from '../../data/pageContent';
import Button from '../ui/Button';
import HeroPortal from './HeroPortal';

const Hero = () => {
  const { hero } = HOME_CONTENT;
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
            <h1 className="hero-title">
              {hero.title}
              <span className="hero-title-accent"> {hero.titleAccent}</span>
            </h1>

            <p className="hero-subtitle">{hero.subtitle}</p>

            <div className="hero-cta">
              <Button to={hero.ctaPrimary.to} variant="primary" size="lg">
                {hero.ctaPrimary.label}
              </Button>
              <Button to={hero.ctaSecondary.to} variant="secondary" size="lg">
                {hero.ctaSecondary.label}
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
            <HeroPortal />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
