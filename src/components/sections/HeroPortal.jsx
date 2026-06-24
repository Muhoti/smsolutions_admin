import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../constants/assets';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import './HeroPortal.css';

const EASE = [0.22, 1, 0.36, 1];

const TIMING = {
  logoInitial: 3000,
  logoReturn: 4000,
  showcaseHold: 5800,
  openDuration: 1.2,
  closeDuration: 1,
};

const HeroPortal = () => {
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const cycleRef = useRef(0);

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

    if (!revealed) {
      const delay = cycleRef.current === 0 ? TIMING.logoInitial : TIMING.logoReturn;
      schedule(delay, () => {
        cycleRef.current += 1;
        setRevealed(true);
      });
    } else {
      schedule(TIMING.showcaseHold, () => setRevealed(false));
    }

    return clearTimer;
  }, [revealed, schedule, reducedMotion, isMobile, paused]);

  useEffect(() => clearTimer, []);

  const handleToggle = () => {
    if (!isMobile || reducedMotion) return;
    clearTimer();
    if (!revealed) cycleRef.current += 1;
    setRevealed((open) => !open);
  };

  const isOpen = !reducedMotion && revealed;
  const frostDuration = isOpen ? TIMING.openDuration : TIMING.closeDuration;

  return (
    <div
      className={[
        'hero-portal-card',
        isOpen ? 'hero-portal-card--open' : '',
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
      aria-label={isMobile ? 'Tap to reveal showcase' : undefined}
    >
      <div className="hero-portal-viewport">
        {/* AI image — full card when revealed */}
        <motion.div
          className="hero-portal-backdrop"
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0.35 }}
          transition={{ duration: frostDuration, ease: EASE }}
        >
          <motion.img
            src={ASSETS.aboutIllustration}
            alt={isOpen ? 'AI-enabled digital solutions' : ''}
            aria-hidden={!isOpen}
            className="hero-portal-backdrop-img"
            animate={{ scale: isOpen ? 1.05 : 1.12 }}
            transition={{
              duration: isOpen ? TIMING.showcaseHold / 1000 + 0.8 : frostDuration,
              ease: 'linear',
            }}
          />
          <div className="hero-portal-backdrop-vignette" aria-hidden />
        </motion.div>

        {/* Corner watermark when revealed */}
        <motion.img
          src={ASSETS.logoHero}
          alt=""
          className="hero-portal-watermark"
          animate={{
            opacity: isOpen ? 0.9 : 0,
            scale: isOpen ? 1 : 0.75,
            y: isOpen ? 0 : 8,
          }}
          transition={{ duration: 0.65, ease: EASE, delay: isOpen ? 0.45 : 0 }}
          aria-hidden
        />

        {/* Frosted glass — clears from center outward */}
        {!reducedMotion && (
          <motion.div
            className="hero-glass-pane"
            initial={false}
            animate={{
              clipPath: isOpen
                ? 'circle(0% at 50% 50%)'
                : 'circle(150% at 50% 50%)',
            }}
            transition={{ duration: frostDuration, ease: EASE }}
          >
            <motion.div
              className="hero-glass-frost"
              animate={{
                opacity: isOpen ? 0 : 1,
                backdropFilter: isOpen ? 'blur(0px)' : 'blur(22px)',
                WebkitBackdropFilter: isOpen ? 'blur(0px)' : 'blur(22px)',
              }}
              transition={{ duration: frostDuration, ease: EASE }}
              aria-hidden
            />
            <motion.div
              className="hero-glass-logo"
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0.88 : 1,
                filter: isOpen ? 'blur(6px)' : 'blur(0px)',
              }}
              transition={{
                duration: isOpen ? 0.55 : frostDuration,
                ease: EASE,
              }}
            >
              <motion.img
                src={ASSETS.logoHero}
                alt="Strong's Digital Labs"
                className="hero-logo hero-logo--portal"
                animate={isOpen ? { y: 0 } : { y: [0, -7, 0] }}
                transition={
                  isOpen
                    ? { duration: 0.3 }
                    : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
                }
              />
            </motion.div>
          </motion.div>
        )}

        {reducedMotion && (
          <div className="hero-glass-logo hero-glass-logo--static">
            <img
              src={ASSETS.logoHero}
              alt="Strong's Digital Labs"
              className="hero-logo hero-logo--portal"
            />
          </div>
        )}
      </div>

      <motion.p
        className="hero-portal-text"
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 8 : 0,
          height: isOpen ? 0 : 'auto',
          marginTop: isOpen ? 0 : undefined,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        Technology consultancy for organizations building modern digital systems.
      </motion.p>

      {isMobile && !reducedMotion && (
        <p className="hero-portal-hint">
          {revealed ? 'Tap to return to logo' : 'Tap to reveal showcase'}
        </p>
      )}
    </div>
  );
};

export default HeroPortal;
