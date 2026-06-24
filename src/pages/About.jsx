import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROCESS_STEPS } from '../data/processSteps';
import { COMPANY_VALUES } from '../data/company';
import { ABOUT_CONTENT } from '../data/pageContent';
import { ABOUT_CAPABILITIES, ABOUT_HIGHLIGHTS } from '../data/aboutPage';
import { ASSETS } from '../constants/assets';
import PageHero from '../components/ui/PageHero';
import ValuesGrid from '../components/ui/ValuesGrid';
import MobileScreenGate from '../components/mobile/MobileScreenGate';
import MobileAboutScreen from '../components/mobile/screens/MobileAboutScreen';
import './About.css';

const PROCESS_VALUES = PROCESS_STEPS.map((step) => ({
  title: `${step.step}. ${step.title}`,
  description: step.description,
}));

const AboutDesktop = ({ inView, sectionRef }) => {
  const { hero, story, capabilities, howWeWork, values } = ABOUT_CONTENT;

  return (
  <>
    <PageHero
      heroClass="about-hero"
      titleClass="about-title"
      subtitleClass="about-subtitle"
      contentClass="about-hero-content"
      title={hero.title}
      subtitle={hero.subtitle}
    />

    <section className="about-story">
      <div className="container">
        <div className="story-content">
          <motion.div
            className="story-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>{story.title}</h2>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </motion.div>
          <motion.div
            className="story-image"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-visual-wrap">
              <img
                src={ASSETS.aboutIllustration}
                alt="AI-powered technology — data pipelines, web, mobile, and intelligent systems"
                className="about-visual-img"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="about-skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>{capabilities.title}</h2>
          <p>{capabilities.subtitle}</p>
        </motion.div>

        <div className="skills-grid">
          {ABOUT_CAPABILITIES.map((skill, index) => (
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
                <div className="skill-progress" style={{ width: `${skill.level}%` }} />
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="about-achievements">
      <div className="container">
        <motion.div
          className="achievements-grid"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {ABOUT_HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item.title}
              className="achievement-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="achievement-icon">
                <item.icon size={40} />
              </div>
              <div className="achievement-number">{item.number}</div>
              <div className="achievement-title">{item.title}</div>
              <div className="achievement-description">{item.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <ValuesGrid title={howWeWork.title} values={PROCESS_VALUES} inView={inView} />
    <ValuesGrid title={values.title} values={COMPANY_VALUES} inView={inView} />
  </>
  );
};

const About = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <div className="about-page">
      <MobileScreenGate
        mobile={<MobileAboutScreen />}
        desktop={<AboutDesktop inView={inView} sectionRef={ref} />}
      />
    </div>
  );
};

export default About;
