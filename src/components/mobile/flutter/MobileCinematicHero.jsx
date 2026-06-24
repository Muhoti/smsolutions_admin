import React from 'react';
import { ASSETS } from '../../../constants/assets';
import './MobileCinematicHero.css';

const MobileCinematicHero = ({
  eyebrow,
  title,
  titleAccent,
  lead,
  children,
  className = '',
  showLogo = true,
  panel = true,
  centered = false,
  layout = 'default',
  copyChildren,
  variant = 'default',
}) => {
  const Tag = panel ? 'section' : 'div';

  if (variant === 'background') {
    return (
      <Tag
        className={[
          'm3-cinematic-hero',
          'm3-cinematic-hero--background',
          panel ? 'm3-home-panel' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="m3-cinematic-bg" aria-hidden="true">
          <img
            className="m3-cinematic-bg-img"
            src={ASSETS.aboutIllustration}
            alt=""
          />
          <div className="m3-cinematic-bg-pattern" />
          <div className="m3-cinematic-scrim" />
        </div>
        <div className="m3-cinematic-content m3-cinematic-content--overlay">
          {children}
        </div>
      </Tag>
    );
  }

  const heroClass = [
    'm3-cinematic-hero',
    panel ? 'm3-home-panel' : '',
    layout === 'split' ? 'm3-cinematic-hero--split' : '',
    centered && layout !== 'split' ? 'm3-cinematic-hero--center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClass = [
    'm3-cinematic-content',
    layout === 'split' ? 'm3-cinematic-content--split' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const copy = (
    <>
      {showLogo && (
        <img src={ASSETS.logoHero} alt="" className="m3-cinematic-logo" />
      )}
      {eyebrow && <p className="m3-cinematic-eyebrow">{eyebrow}</p>}
      <h1>
        {title}
        {titleAccent && (
          <span className="m3-cinematic-title-accent"> {titleAccent}</span>
        )}
      </h1>
      {lead && <p className="m3-cinematic-lead">{lead}</p>}
    </>
  );

  return (
    <Tag className={heroClass}>
      <div className="m3-cinematic-bg" aria-hidden="true">
        <img
          className="m3-cinematic-bg-img"
          src={ASSETS.aboutIllustration}
          alt=""
        />
        <div className="m3-cinematic-bg-pattern" />
        <div className="m3-cinematic-scrim" />
      </div>
      <div className={contentClass}>
        {layout === 'split' ? (
          <>
            <div className="m3-cinematic-copy">
              {copy}
              {copyChildren}
            </div>
            {children && <div className="m3-cinematic-footer">{children}</div>}
          </>
        ) : (
          <>
            {copy}
            {copyChildren}
            {children}
          </>
        )}
      </div>
    </Tag>
  );
};

export default MobileCinematicHero;
