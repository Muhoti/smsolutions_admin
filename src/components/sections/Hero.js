import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiSmartphone, 
  FiMonitor, 
  FiCode, 
  FiZap, 
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiShield,
  FiGlobe,
  FiActivity
} from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <div className="hero-circle hero-circle-1"></div>
        <div className="hero-circle hero-circle-2"></div>
        <div className="hero-circle hero-circle-3"></div>
        <div className="hero-grid"></div>
      </div>

      {/* Floating Icons */}
      <div className="hero-floating-icons">
        <motion.div 
          className="floating-icon floating-icon-1"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiSmartphone size={40} />
        </motion.div>
        <motion.div 
          className="floating-icon floating-icon-2"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <FiMonitor size={50} />
        </motion.div>
        <motion.div 
          className="floating-icon floating-icon-3"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FiCode size={45} />
        </motion.div>
      </div>

      <div className="container">y
                <div className="hero-layout">
          {/* Left Content */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FiZap size={16} />
              <span>Innovative Digital Solutions</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Build the Future with
              <br />
              <span className="hero-title-highlight">Cutting-Edge Apps</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Transform your ideas into powerful mobile and web applications. 
              I specialize in creating scalable, user-friendly solutions that drive real business results.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link to="/contact" className="hero-btn hero-btn-primary">
                <span>Get Started</span>
                <FiArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className="hero-btn hero-btn-secondary">
                <FiCode size={18} />
                <span>View Portfolio</span>
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
                <div className="stat-icon">
                  <FiUsers size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
              <div className="hero-stat">
                <div className="stat-icon">
                  <FiAward size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
              <div className="hero-stat">
                <div className="stat-icon">
                  <FiTrendingUp size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="hero-visual-container">
              {/* Code Screen Background */}
              <div className="code-screen-bg">
                <div className="code-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="Code Editor Screen"
                    className="code-editor-image"
                  />
                  <div className="code-image-overlay">
                    <div className="code-glow-effect"></div>
                    <div className="code-screen-frame">
                      <div className="screen-header">
                        <div className="screen-tabs">
                          <div className="screen-tab active">Hero.jsx</div>
                          <div className="screen-tab">Home.css</div>
                          <div className="screen-tab">api.js</div>
                        </div>
                        <div className="screen-controls">
                          <div className="control-dot red"></div>
                          <div className="control-dot yellow"></div>
                          <div className="control-dot green"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Code Elements */}
                <div className="code-floating-elements">
                  <motion.div 
                    className="code-element code-element-1"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FiCode size={24} />
                  </motion.div>
                  <motion.div 
                    className="code-element code-element-2"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, -3, 0],
                      scale: [1, 1.08, 1]
                    }}
                    transition={{ 
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <FiCpu size={28} />
                  </motion.div>
                  <motion.div 
                    className="code-element code-element-3"
                    animate={{ 
                      y: [0, -12, 0],
                      rotate: [0, 8, 0],
                      scale: [1, 1.06, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  >
                    <FiDatabase size={26} />
                  </motion.div>
                </div>
              </div>
              
              {/* Floating AI Elements */}
              <div className="ai-elements">
                <motion.div 
                  className="ai-element ai-element-1"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 360, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiCpu size={32} />
                </motion.div>
                <motion.div 
                  className="ai-element ai-element-2"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -180, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <FiDatabase size={28} />
                </motion.div>
                <motion.div 
                  className="ai-element ai-element-3"
                  animate={{ 
                    y: [0, -25, 0],
                    rotate: [0, 90, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <FiLayers size={30} />
                </motion.div>
                <motion.div 
                  className="ai-element ai-element-4"
                  animate={{ 
                    y: [0, -18, 0],
                    rotate: [0, -90, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ 
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <FiShield size={26} />
                </motion.div>
                <motion.div 
                  className="ai-element ai-element-5"
                  animate={{ 
                    y: [0, -22, 0],
                    rotate: [0, 180, 0],
                    scale: [1, 1.12, 1]
                  }}
                  transition={{ 
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <FiGlobe size={24} />
                </motion.div>
                <motion.div 
                  className="ai-element ai-element-6"
                  animate={{ 
                    y: [0, -16, 0],
                    rotate: [0, -270, 0],
                    scale: [1, 1.06, 1]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                  }}
                >
                  <FiActivity size={22} />
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
