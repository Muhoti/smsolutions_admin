import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../constants/assets';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import './HeroPortal.css';

const EASE = [0.22, 1, 0.36, 1];

const TIMING = {
  logoInitial: 2800,
  logoReturn: 3800,
  showcaseHold: 5600,
  openDuration: 1.15,
  closeDuration: 0.95,
};

const HeroPortal = () => {
  const [portalOpen, setPortalOpen] = useState(false);
  const [shineKey, setShineKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 640px)');

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const schedule = useCallback(
    (delay, fn) => {
      clearTimer();
      if (paused || reducedMotion) return;
      timerRef.current = setTimeout(fn, delay);
    },
    [paused, reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion || isMobile) return undefined;

    if (!portalOpen) {
      const delay = shineKey === 0 ? TIMING.logoInitial : TIMING.logoReturn;
      schedule(delay, () => {
        setShineKey((k) => k + 1);
        setPortalOpen(true);
      });
    } else {
      schedule(TIMING.showcaseHold, () => setPortalOpen(false));
    }

    return clearTimer;
  }, [portalOpen, schedule, reducedMotion, isMobile, shineKey, paused]);

  useEffect(() => clearTimer, []);

  const handleToggle = () => {
    if (!isMobile || reducedMotion) return;
    clearTimer();
    if (!portalOpen) setShineKey((k) => k + 1);
    setPortalOpen((open) => !open);
  };

  const openMotion = reducedMotion ? false : portalOpen;

  return (
    <div
      className={[
        'hero-portal-card',
        openMotion ? 'hero-portal-card--open' : '',
        isMobile && !reducedMotion ? 'hero-portal-card--interactive' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => !isMobile && setPaused(true)}
      onMouseLeave={() => !isMobile && setPaused(false)}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleToggle();
        }
      }}
      role={isMobile && !reducedMotion ? 'button' : undefined}
      tabIndex={isMobile && !reducedMotion ? 0 : undefined}
      aria-label={isMobile ? 'Tap to reveal AI showcase' : undefined}
    >
      <motion.div
        className="hero-portal-ambient"
        animate={{ opacity: openMotion ? 0.9 : 0.35 }}
        transition={{ duration: 0.8, ease: EASE }}
        aria-hidden
      />

      <div className="hero-portal-viewport">
        <motion.div
          className="hero-portal-backdrop"
          initial={false}
          animate={{
            opacity: openMotion ? 1 : 0,
            scale: openMotion ? 1 : 1.12,
          }}
          transition={{ duration: TIMING.openDuration, ease: EASE }}
        >
          <motion.img
            src={ASSETS.aboutIllustration}
            alt=""
            aria-hidden={!openMotion}
            className="hero-portal-backdrop-img"
            animate={{ scale: openMotion ? 1.04 : 1.14 }}
            transition={{
              duration: openMotion ? TIMING.showcaseHold / 1000 + 1 : 0.5,
              ease: 'linear',
            }}
          />
          <div className="hero-portal-backdrop-vignette" aria-hidden />
          {openMotion && (
            <motion.div
              key={shineKey}
              className="hero-portal-shine"
              initial={{ x: '-130%' }}
              animate={{ x: '240%' }}
              transition={{ duration: 1.35, ease: EASE }}
              aria-hidden
            />
          )}
        </motion.div>

        <motion.img
          src={ASSETS.logoHero}
          alt=""
          className="hero-portal-watermark"
          animate={{ opacity: openMotion ? 0.88 : 0, scale: openMotion ? 1 : 0.8 }}
          transition={{ duration: 0.5, ease: EASE, delay: openMotion ? 0.35 : 0 }}
          aria-hidden
        />

        {!reducedMotion && (
          <motion.div
            className="hero-portal-ring-wrap"
            animate={{
              opacity: openMotion ? 0 : 1,
              scale: openMotion ? 2.8 : 1,
            }}
            transition={{ duration: TIMING.openDuration, ease: EASE }}
            aria-hidden
          >
            <svg className="hero-portal-ring" viewBox="0 0 200 200" aria-hidden>
              <defs>
                <linearGradient id="heroPortalRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 174, 239, 0.15)" />
                  <stop offset="45%" stopColor="rgba(0, 174, 239, 0.95)" />
                  <stop offset="100%" stopColor="rgba(100, 220, 255, 0.35)" />
                </linearGradient>
              </defs>
              <circle className="hero-portal-ring-track" cx="100" cy="100" r="86" />
              <circle className="hero-portal-ring-glow" cx="100" cy="100" r="86" />
              <circle className="hero-portal-ring-dash" cx="100" cy="100" r="92" />
            </svg>
          </motion.div>
        )}

        <motion.div
          className="hero-portal-logo-layer"
          animate={{
            opacity: openMotion ? 0 : 1,
            scale: openMotion ? 0.72 : 1,
            z: openMotion ? -120 : 0,
            filter: openMotion ? 'blur(10px)' : 'blur(0px)',
            y: openMotion ? -18 : 0,
          }}
          transition={{
            duration: openMotion ? TIMING.openDuration : TIMING.closeDuration,
            ease: EASE,
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.img
            src={ASSETS.logoHero}
            alt="Strong's Digital Labs"
            className="hero-logo hero-logo--portal"
            animate={openMotion || reducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
            transition={
              openMotion || reducedMotion
                ? { duration: 0.3 }
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        </motion.div>
      </div>

      <motion.p
        className="hero-portal-text"
        animate={{
          opacity: openMotion ? 0 : 1,
          y: openMotion ? 10 : 0,
          height: openMotion ? 0 : 'auto',
          marginTop: openMotion ? 0 : undefined,
        }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        Technology consultancy for organizations building modern digital systems.
      </motion.p>

      {isMobile && !reducedMotion && (
        <p className="hero-portal-hint">
          {portalOpen ? 'Tap to return to logo' : 'Tap to open the portal'}
        </p>
      )}
    </div>
  );
};

export default HeroPortal;
