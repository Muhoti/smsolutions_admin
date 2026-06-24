import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { SERVICES } from '../../../data/services';
import { PROCESS_STEPS } from '../../../data/processSteps';
import { SERVICES_CONTENT } from '../../../data/pageContent';
import {
  M3Screen,
  M3Section,
  M3Card,
  M3Button,
  M3ExpansionTile,
  M3Stepper,
} from '../flutter/MobileUIKit';
import '../flutter/MobileUIKit.css';

const MobileServicesScreen = () => {
  const { hero, process, cta } = SERVICES_CONTENT;

  return (
    <M3Screen>
      <header className="m3-page-intro">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </header>

      <M3Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SERVICES.map((service) => (
            <M3ExpansionTile
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
            >
              <p style={{ margin: '0 0 8px' }}>{service.description}</p>
              <strong style={{ fontSize: '0.8125rem' }}>What we deliver</strong>
              <ul>
                {service.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="m3-tag-row">
                {service.technologies.map((tech) => (
                  <span key={tech} className="m3-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </M3ExpansionTile>
          ))}
        </div>
      </M3Section>

      <M3Section title={process.title} subtitle={process.subtitle}>
        <M3Card>
          <M3Stepper steps={PROCESS_STEPS} />
        </M3Card>
      </M3Section>

      <div className="m3-cta-banner">
        <h2>{cta.title}</h2>
        <p>{cta.subtitle}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <M3Button variant="filled" to="/contact" fullWidth>
            {cta.primary}
            <FiArrowRight size={16} />
          </M3Button>
          <M3Button variant="outlined" to="/portfolio" fullWidth>
            {cta.secondary}
          </M3Button>
        </div>
      </div>
    </M3Screen>
  );
};

export default MobileServicesScreen;
