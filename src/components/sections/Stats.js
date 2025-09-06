import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiAward, FiClock, FiTrendingUp } from 'react-icons/fi';

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    {
      icon: FiUsers,
      number: '50+',
      label: 'Happy Clients',
      description: 'Satisfied customers worldwide'
    },
    {
      icon: FiAward,
      number: '100+',
      label: 'Projects Completed',
      description: 'Successful app deliveries'
    },
    {
      icon: FiClock,
      number: '5+',
      label: 'Years Experience',
      description: 'In app development'
    },
    {
      icon: FiTrendingUp,
      number: '300%',
      label: 'Average ROI',
      description: 'For our clients'
    }
  ];

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="stat-icon">
                <stat.icon size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
