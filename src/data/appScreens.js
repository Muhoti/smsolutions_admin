import {
  ABOUT_CONTENT,
  CONTACT_CONTENT,
  PORTFOLIO_CONTENT,
  SERVICES_CONTENT,
} from './pageContent';

export const APP_SCREEN_META = {
  '/': {
    id: 'home',
    navTitle: 'Home',
    largeTitle: "Strong's Digital Labs",
    subtitle: '',
    showFab: true,
  },
  '/services': {
    id: 'services',
    navTitle: 'Services',
    largeTitle: SERVICES_CONTENT.hero.title,
    subtitle: SERVICES_CONTENT.hero.subtitle,
    showFab: true,
  },
  '/portfolio': {
    id: 'portfolio',
    navTitle: 'Portfolio',
    largeTitle: PORTFOLIO_CONTENT.hero.title,
    subtitle: PORTFOLIO_CONTENT.hero.subtitle,
    showFab: true,
  },
  '/about': {
    id: 'about',
    navTitle: 'About',
    largeTitle: ABOUT_CONTENT.hero.title,
    subtitle: ABOUT_CONTENT.hero.subtitle,
    showFab: true,
  },
  '/contact': {
    id: 'contact',
    navTitle: 'Contact',
    largeTitle: CONTACT_CONTENT.hero.title,
    subtitle: CONTACT_CONTENT.hero.subtitle,
    showFab: false,
  },
};

export const getScreenMeta = (pathname) =>
  APP_SCREEN_META[pathname] || {
    id: 'page',
    navTitle: 'SDL',
    largeTitle: 'SDL',
    subtitle: '',
    showFab: true,
  };
