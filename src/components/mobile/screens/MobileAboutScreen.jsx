import React from 'react';
import { PROCESS_STEPS } from '../../../data/processSteps';
import { COMPANY_VALUES } from '../../../data/company';
import { ABOUT_CONTENT } from '../../../data/pageContent';
import { ABOUT_CAPABILITIES, ABOUT_HIGHLIGHTS } from '../../../data/aboutPage';
import MobileCinematicHero from '../flutter/MobileCinematicHero';
import {
  M3Screen,
  M3Section,
  M3Card,
  M3Progress,
  M3Stepper,
} from '../flutter/MobileUIKit';
import '../flutter/MobileCinematicHero.css';
import '../flutter/MobileUIKit.css';
import './MobileAboutScreen.css';

const MobileAboutScreen = () => {
  const { story, capabilities, howWeWork, values } = ABOUT_CONTENT;

  return (
    <M3Screen className="m3-about">
      <MobileCinematicHero
        className="m3-about-hero m3-about-hero--story"
        layout="split"
        title={story.title}
        showLogo
        copyChildren={
          <div className="m3-about-hero-story">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        }
      />

      <M3Section title={capabilities.title} subtitle={capabilities.subtitle}>
        <div className="m3-about-skills">
          {ABOUT_CAPABILITIES.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className="m3-skill-card">
                <div className="m3-skill-card-head">
                  <span className="m3-list-tile-leading">
                    <Icon size={20} />
                  </span>
                  <h3>{skill.name}</h3>
                  <span>{skill.level}%</span>
                </div>
                <M3Progress value={skill.level} />
              </div>
            );
          })}
        </div>
      </M3Section>

      <section className="m3-about-highlights">
        <div className="m3-grid-2">
          {ABOUT_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="m3-grid-card">
                <div className="m3-grid-card-icon">
                  <Icon size={18} />
                </div>
                <div className="m3-project-category">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <M3Section title={howWeWork.title}>
        <M3Card>
          <M3Stepper steps={PROCESS_STEPS} />
        </M3Card>
      </M3Section>

      <M3Section title={values.title}>
        <div className="m3-about-values">
          {COMPANY_VALUES.map((value) => (
            <M3Card key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </M3Card>
          ))}
        </div>
      </M3Section>
    </M3Screen>
  );
};

export default MobileAboutScreen;
