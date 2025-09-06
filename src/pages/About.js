import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, 
  FiSmartphone, 
  FiMonitor, 
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle
} from 'react-icons/fi';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = [
    { name: 'React Native', level: 95, icon: FiSmartphone },
    { name: 'React.js', level: 98, icon: FiMonitor },
    { name: 'Node.js', level: 92, icon: FiCode },
    { name: 'UI/UX Design', level: 88, icon: FiAward },
    { name: 'MongoDB', level: 90, icon: FiCode },
    { name: 'Firebase', level: 85, icon: FiCode }
  ];

  const achievements = [
    {
      icon: FiUsers,
      number: '50+',
      title: 'Happy Clients',
      description: 'Satisfied customers worldwide'
    },
    {
      icon: FiAward,
      number: '100+',
      title: 'Projects Completed',
      description: 'Successful app deliveries'
    },
    {
      icon: FiTrendingUp,
      number: '5+',
      title: 'Years Experience',
      description: 'In app development'
    },
    {
      icon: FiCheckCircle,
      number: '100%',
      title: 'Success Rate',
      description: 'Project completion rate'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="about-title">About Strong Muhoti</h1>
            <p className="about-subtitle">
              Passionate app developer transforming ideas into digital reality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <motion.div 
              className="story-text"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2>My Story</h2>
              <p>
                I'm Strong Muhoti, a passionate app developer with over 5 years of experience 
                creating mobile and web applications that drive business growth. My journey 
                began with a simple belief: technology should solve real problems and make 
                people's lives better.
              </p>
              <p>
                Over the years, I've had the privilege of working with startups, enterprises, 
                and government organizations, helping them transform their ideas into powerful 
                digital solutions. From emergency response systems to agricultural management 
                platforms, each project has taught me something new and reinforced my commitment 
                to excellence.
              </p>
              <p>
                Today, I specialize in React Native mobile development, React web applications, 
                and full-stack solutions. My approach combines technical expertise with a deep 
                understanding of user needs, ensuring every app I build delivers real value.
              </p>
            </motion.div>
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="image-placeholder">
                <FiCode size={80} />
                <p>Your Photo Here</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="about-skills" ref={ref}>
        <div className="container">
          <motion.div 
            className="skills-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Technical Skills</h2>
            <p>Expertise in modern technologies and frameworks</p>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="skill-icon">
                  <skill.icon size={32} />
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="about-achievements">
        <div className="container">
          <motion.div 
            className="achievements-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.title}
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="achievement-icon">
                  <achievement.icon size={40} />
                </div>
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-description">{achievement.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <motion.div 
            className="values-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>My Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Quality First</h3>
                <p>Every line of code is written with attention to detail and best practices.</p>
              </div>
              <div className="value-item">
                <h3>Client Success</h3>
                <p>Your success is my success. I'm committed to delivering solutions that drive results.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>I stay updated with the latest technologies to provide cutting-edge solutions.</p>
              </div>
              <div className="value-item">
                <h3>Transparency</h3>
                <p>Clear communication and regular updates throughout the development process.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
