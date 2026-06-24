import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../../constants/assets';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import './HeroPortal.css';

const EASE = [0.22, 1, 0.36, 1];

const TIMING = {
  logoInitial: 3200,
  logoReturn: 4200,
  showcaseHold: 6000,
  revealDuration: 1.35,
  closeDuration: 1.05,
};

const HeroPortal = () => {
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
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
        setSweepKey((k) => k + 1);
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
    if (!revealed) {
      cycleRef.current += 1;
      setSweepKey((k) => k + 1);
    }
    setRevealed((open) => !open);
  };

  const isOpen = !reducedMotion && revealed;

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
        {/* AI image — always full bleed behind */}
        <motion.div
          className="hero-portal-backdrop"
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0.55,
            scale: isOpen ? 1 : 1.06,
          }}
          transition={{
            duration: isOpen ? TIMING.revealDuration : TIMING.closeDuration,
            ease: EASE,
          }}
        >
          <motion.img
            src={ASSETS.aboutIllustration}
            alt={isOpen ? 'AI-enabled digital solutions' : ''}
            aria-hidden={!isOpen}
            className="hero-portal-backdrop-img"
            animate={{ scale: isOpen ? 1.06 : 1 }}
            transition={{
              duration: isOpen ? TIMING.showcaseHold / 1000 + 1.2 : TIMING.closeDuration,
              ease: 'linear',
            }}
          />
          <div className="hero-portal-backdrop-vignette" aria-hidden />
        </motion.div>

        {/* Silk veil — lifts away left to right */}
        {!reducedMotion && (
          <motion.div
            className="hero-veil"
            initial={false}
            animate={{
              clipPath: isOpen
                ? 'inset(0 0 0 100%)'
                : 'inset(0 0 0 0)',
            }}
            transition={{
              duration: isOpen ? TIMING.revealDuration : TIMING.closeDuration,
              ease: EASE,
            }}
            aria-hidden
          >
            <div className="hero-veil-silk" />
            <div className="hero-veil-edge" />
          </motion.div>
        )}

        {/* Light band — once per reveal */}
        {isOpen && (
          <motion.div
            key={sweepKey}
            className="hero-veil-shine"
            initial={{ x: '-110%' }}
            animate={{ x: '210%' }}
            transition={{ duration: 1.5, ease: EASE }}
            aria-hidden
          />
        )}

        {/* Large logo — dissolves as veil lifts */}
        {!reducedMotion && (
          <motion.div
            className="hero-veil-logo"
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.94 : 1,
              filter: isOpen ? 'blur(8px)' : 'blur(0px)',
            }}
            transition={{
              duration: isOpen ? 0.7 : TIMING.closeDuration,
              ease: EASE,
              delay: isOpen ? 0.15 : 0,
            }}
          >
            <motion.img
              src={ASSETS.logoHero}
              alt={isOpen ? '' : "Strong's Digital Labs"}
              aria-hidden={isOpen}
              className="hero-logo hero-logo--portal"
              animate={isOpen ? { y: 0 } : { y: [0, -6, 0] }}
              transition={
                isOpen
                  ? { duration: 0.3 }
                  : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </motion.div>
        )}

        {/* Watermark when revealed */}
        <motion.img
          src={ASSETS.logoHero}
          alt=""
          className="hero-portal-watermark"
          animate={{
            opacity: isOpen ? 0.88 : 0,
            scale: isOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.6, ease: EASE, delay: isOpen ? 0.55 : 0 }}
          aria-hidden
        />

        {reducedMotion && (
          <div className="hero-veil-logo hero-veil-logo--static">
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
