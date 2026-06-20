import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiFileText, FiCode, FiZap, FiHeadphones } from 'react-icons/fi';
import './HowWeWork.css';

const HowWeWork = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const steps = [
    {
      step: '01',
      icon: FiSearch,
      title: 'Discovery',
      description: 'We learn about your business, goals, users, and technical landscape to define the right solution.'
    },
    {
      step: '02',
      icon: FiFileText,
      title: 'Proposal',
      description: 'We deliver a clear scope, timeline, and approach — including where AI can add real value.'
    },
    {
      step: '03',
      icon: FiCode,
      title: 'Build',
      description: 'We design and develop your system using modern full-stack practices with regular progress updates.'
    },
    {
      step: '04',
      icon: FiZap,
      title: 'Launch',
      description: 'We deploy, test, and hand over a production-ready solution your team can rely on.'
    },
    {
      step: '05',
      icon: FiHeadphones,
      title: 'Support',
      description: 'We stay available for improvements, maintenance, and ongoing technical guidance.'
    }
  ];

  return (
    <section className="how-we-work-section" ref={ref}>
      <div className="container">
        <motion.div
          className="how-we-work-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>How We Work</h2>
          <p>A structured consultancy process designed to reduce risk and deliver results</p>
        </motion.div>

        <div className="how-we-work-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="how-we-work-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="step-number">{step.step}</div>
              <div className="step-icon">
                <step.icon size={28} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
